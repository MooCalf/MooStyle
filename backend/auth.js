const { betterAuth } = require("better-auth");
const { MongoClient } = require("mongodb");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
const { admin, emailOTP } = require("better-auth/plugins");
const { sendPasswordResetEmail, sendEmailVerificationEmail, sendOtpEmail } = require("./services/emailService");

// MongoDB connection (ensure proper lifecycle management)
const client = new MongoClient(process.env.MONGODB_URI, {
  maxPoolSize: 10,
});
const db = client.db();

// Connect once at startup
client.connect()
  .then(() => console.log("✅ MongoDB client connected for Better Auth"))
  .catch((err) => {
    console.error("❌ Failed to connect MongoDB client for Better Auth:", err);
  });

process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('🔌 MongoDB client closed (SIGINT)');
  } finally {
    process.exit(0);
  }
});

// Environment safety checks
const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  const required = [
    'BETTER_AUTH_SECRET',
    'BETTER_AUTH_URL',
    'FRONTEND_URL',
    'MONGODB_URI',
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`❌ Missing required env vars in production: ${missing.join(', ')}`);
  }
}

// Better Auth configuration
const auth = betterAuth({
  // Database configuration with MongoDB adapter
  database: mongodbAdapter(db, {
    // Passing the connected client enables transactions (if MongoDB supports it)
    client,
  }),

  // Plugins
  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin", "owner"],
      adminUserIds: process.env.ADMIN_USER_IDS
        ? process.env.ADMIN_USER_IDS.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
    }),
    emailOTP({
      otpLength: 6,
      expiresIn: 300, // 5 minutes
      allowedAttempts: 3,
      async sendVerificationOTP({ email, otp, type }) {
        try {
          if (type === "sign-in") {
            await sendOtpEmail(email, otp, 'sign-in');
          } else if (type === "email-verification") {
            await sendOtpEmail(email, otp, 'email-verification');
          } else if (type === "forget-password") {
            await sendOtpEmail(email, otp, 'password-reset');
          }
          return true;
        } catch (error) {
          console.error('Error sending OTP:', error);
          throw new Error('Failed to send OTP');
        }
      }
    })
  ],

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Keep current behavior for now
    minPasswordLength: 8, // Match current system
    maxPasswordLength: 128,
    autoSignIn: true, // Auto sign in after registration
    beforeSignIn: async (user, request) => {
      // Check if user is banned/inactive
      if (!user.isActive) {
        throw new Error("Your account has been suspended. Please contact support for assistance.");
      }
      return user;
    },
    sendResetPassword: async ({ user, url, token }, request) => {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const resetLink = url || `${frontendUrl}/reset-password?token=${token}`;

      const emailSent = await sendPasswordResetEmail(
        user.email,
        resetLink,
        user.username || user.name
      );

      if (!emailSent) {
        throw new Error(`Failed to send password reset email to ${user.email}`);
      }

      return true;
    },
  },

  // Email verification configuration
  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const verificationLink = url || `${frontendUrl}/verify-email?token=${token}`;

      const emailSent = await sendEmailVerificationEmail(
        user.email,
        verificationLink,
        user.username || user.name
      );

      if (!emailSent) {
        throw new Error(`Failed to send verification email to ${user.email}`);
      }

      return true;
    },
    afterEmailVerification: async (user, request) => {
      // Optional post-verification logic
    }
  },

  // Social providers
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        scope: ["openid", "email", "profile"],
      }
    } : {}),
  },

  // Debug logging
  onAPIError: {
    onError: (error, ctx) => {
      console.log('🔍 Better Auth Error:', error);
      console.log('🔍 Error Message:', error.message);
      console.log('🔍 Error Code:', error.code);
      console.log('🔍 Better Auth URL:', process.env.BETTER_AUTH_URL);
      console.log('🔍 Generated Callback URL:', `${process.env.BETTER_AUTH_URL || 'http://localhost:5000'}/api/auth/callback/google`);
      console.log('🔍 Request Context:', ctx);
      console.log('🔍 Request URL:', ctx?.request?.url);
      console.log('🔍 Request Method:', ctx?.request?.method);
    },
    errorURL: "/auth-error", // Custom error page
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every 24h
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7,
    },
    cookie: {
      secure: isProd,
      sameSite: process.env.AUTH_COOKIE_SAMESITE || (isProd ? (process.env.AUTH_COOKIE_DOMAIN ? 'lax' : 'none') : 'lax'),
      domain: process.env.AUTH_COOKIE_DOMAIN || undefined,
      path: '/',
    },
  },

  // OAuth state configuration
  oauth: {
    stateExpirationTime: 10 * 60 * 1000, // 10 minutes (increased from default)
  },

  // User configuration with custom fields and validation
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        unique: true,
        validate: (v) => typeof v === 'string' && /^[a-zA-Z0-9_]{3,20}$/.test(v),
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        validate: (v) => ['user', 'admin', 'owner'].includes(v),
      },
      isActive: {
        type: "boolean",
        required: true,
        defaultValue: true,
      },
      points: {
        type: "number",
        required: true,
        defaultValue: 0,
        validate: (v) => Number.isFinite(v) && v >= 0,
      },
      membershipLevel: {
        type: "string",
        required: true,
        defaultValue: "Bronze",
        validate: (v) => ['Bronze', 'Silver', 'Gold', 'Diamond'].includes(v),
      },
      notificationSettings: {
        type: "object",
        required: true,
        defaultValue: { emailNotifications: false },
        validate: (v) => v && typeof v === 'object' && typeof v.emailNotifications === 'boolean',
      },
      lastDownloaded: {
        type: "date",
        required: false,
      },
      lastLogin: {
        type: "date",
        required: false,
      },
      banReason: {
        type: "string",
        required: false,
      },
      bannedAt: {
        type: "date",
        required: false,
      }
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }, request) => {
        return true;
      }
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url, token }, request) => {
        return true;
      },
      beforeDelete: async (user, request) => {
        if (user.role === 'admin') {
          throw new Error("Admin accounts cannot be deleted");
        }
      },
      afterDelete: async (user, request) => {}
    }
  },

  // Trusted origins for CORS
  trustedOrigins: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "https://moostyles.pages.dev",
    "https://moostyles.com",
    "https://www.moostyles.com",
    "http://localhost:3000",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:3001"
  ],

  // Secret for signing tokens
  secret: process.env.BETTER_AUTH_SECRET || (!isProd ? (process.env.JWT_SECRET || 'dev-only-insecure-secret') : undefined),

  // Base URL for the auth server
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
});

// Initialize database tables on startup
async function initializeDatabase() {
  try {
    console.log('🔄 Initializing Better Auth database tables...');
    console.log('🔍 Environment Variables:');
    console.log('  - BETTER_AUTH_URL:', process.env.BETTER_AUTH_URL);
    console.log('  - BETTER_AUTH_SECRET:', process.env.BETTER_AUTH_SECRET ? 'SET' : 'NOT SET');
    console.log('  - GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET');
    console.log('  - GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET');
    console.log('  - MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
    console.log('✅ Better Auth database initialization complete');
  } catch (error) {
    console.error('❌ Error initializing Better Auth database:', error);
  }
}

// Initialize on startup
initializeDatabase();

module.exports = { auth };
