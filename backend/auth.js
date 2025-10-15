const { betterAuth } = require("better-auth");
const { MongoClient } = require("mongodb");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
const { admin, emailOTP } = require("better-auth/plugins");
const { sendPasswordResetEmail, sendEmailVerificationEmail } = require("./services/emailService");

// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

// Better Auth configuration
const auth = betterAuth({
  // Database configuration with MongoDB adapter
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),

  // Plugins
  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin", "owner"],
      adminUserIds: [], // We'll add your admin email here
    }),
    emailOTP({
      otpLength: 6,
      expiresIn: 300, // 5 minutes
      allowedAttempts: 3,
      async sendVerificationOTP({ email, otp, type }) {
        console.log(`Sending OTP to ${email}: ${otp} (type: ${type})`);
        
        try {
          if (type === "sign-in") {
            // Send OTP for sign in
            await sendPasswordResetEmail(email, `Your sign-in code is: ${otp}`, `Sign-in Code: ${otp}`);
          } else if (type === "email-verification") {
            // Send OTP for email verification
            await sendEmailVerificationEmail(email, `Your verification code is: ${otp}`, `Verification Code: ${otp}`);
          } else if (type === "forget-password") {
            // Send OTP for password reset
            await sendPasswordResetEmail(email, `Your password reset code is: ${otp}`, `Password Reset Code: ${otp}`);
          }
          
          return {
            success: true,
            message: `OTP sent to ${email}`
          };
        } catch (error) {
          console.error('Error sending OTP:', error);
          return {
            success: false,
            message: 'Failed to send OTP'
          };
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
      // Use Better Auth's built-in email functionality
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const resetLink = url || `${frontendUrl}/reset-password?token=${token}`;
      
      console.log(`Password reset link for ${user.email}: ${resetLink}`);
      
      // Send actual email using our email service
      const emailSent = await sendPasswordResetEmail(user.email, resetLink, user.username || user.name);
      
      return {
        success: emailSent,
        message: emailSent ? `Password reset email sent to ${user.email}` : `Failed to send email to ${user.email}`
      };
    },
  },

  // Email verification configuration
  emailVerification: {
    sendOnSignUp: false, // Don't require verification on signup for now
    autoSignInAfterVerification: true, // Auto sign in after verification
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const verificationLink = url || `${frontendUrl}/verify-email?token=${token}`;
      
      console.log(`Email verification link for ${user.email}: ${verificationLink}`);
      
      // Send actual email using our email service
      const emailSent = await sendEmailVerificationEmail(user.email, verificationLink, user.username || user.name);
      
      return {
        success: emailSent,
        message: emailSent ? `Verification email sent to ${user.email}` : `Failed to send email to ${user.email}`
      };
    },
    afterEmailVerification: async (user, request) => {
      console.log(`Email verified for user: ${user.email}`);
      // You can add custom logic here, like:
      // - Grant access to premium features
      // - Send welcome email
      // - Update user status
    }
  },

  // Social providers
  socialProviders: {
    // Google OAuth - only enable if credentials are provided
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }
    } : {}),
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every 24h
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
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
    // Enable user management features
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }, request) => {
        console.log(`Email change verification for ${user.email} to ${newEmail}: ${url}`);
        return {
          success: true,
          message: `Email change verification sent to ${user.email}`
        };
      }
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url, token }, request) => {
        console.log(`Account deletion verification for ${user.email}: ${url}`);
        return {
          success: true,
          message: `Account deletion verification sent to ${user.email}`
        };
      },
      beforeDelete: async (user, request) => {
        // Prevent deletion of admin accounts
        if (user.role === 'admin') {
          throw new Error("Admin accounts cannot be deleted");
        }
        console.log(`User ${user.email} is being deleted`);
      },
      afterDelete: async (user, request) => {
        console.log(`User ${user.email} has been deleted`);
      }
    }
  },

  // Trusted origins for CORS
  trustedOrigins: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:3001"
  ],

  // Secret for signing tokens
  secret: process.env.BETTER_AUTH_SECRET || process.env.JWT_SECRET || "fallback-secret-change-in-production",

  // Base URL for the auth server
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
});

module.exports = { auth };

