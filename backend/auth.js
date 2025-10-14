const { betterAuth } = require("better-auth");
const { MongoClient } = require("mongodb");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
const { admin, emailOTP } = require("better-auth/plugins");

// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

// Test database connection
client.connect().then(() => {
  console.log('✅ Better Auth MongoDB connected successfully');
}).catch((error) => {
  console.error('❌ Better Auth MongoDB connection failed:', error);
});

// Better Auth configuration
const auth = betterAuth({
  // Database configuration with MongoDB adapter
  database: mongodbAdapter(db, {
    client
  }),

  // Plugins
  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin", "owner"],
      adminUserIds: [],
    }),
    emailOTP({
      otpLength: 6,
      expiresIn: 300,
      allowedAttempts: 3,
      async sendVerificationOTP({ email, otp, type }) {
        console.log(`Sending OTP to ${email}: ${otp} (type: ${type})`);
        return {
          success: true,
          message: `OTP sent to ${email}`
        };
      }
    })
  ],

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
  },

  // Social providers
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectURI: "https://moostyle-production.up.railway.app/api/auth/callback/google"
      }
    } : {}),
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every 24h
    cookieName: "better-auth.session_token",
    cookieOptions: {
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
      path: '/',
    },
  },

  // User configuration with custom fields
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        unique: true,
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
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
      },
      membershipLevel: {
        type: "string",
        required: true,
        defaultValue: "Bronze",
      },
      notificationSettings: {
        type: "object",
        required: true,
        defaultValue: { emailNotifications: false },
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
  },

  // Trusted origins for CORS
  trustedOrigins: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "https://moostyles.com",
    "https://www.moostyles.com"
  ],

  // Secret for signing tokens
  secret: process.env.BETTER_AUTH_SECRET || process.env.JWT_SECRET || "fallback-secret-change-in-production",

  // Base URL for the auth server
  baseURL: "https://moostyle-production.up.railway.app",
});

module.exports = { auth };