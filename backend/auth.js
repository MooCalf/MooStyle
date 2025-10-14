const { betterAuth } = require("better-auth");
const { MongoClient } = require("mongodb");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
const { admin, emailOTP } = require("better-auth/plugins");
const { sendPasswordResetEmail, sendEmailVerificationEmail } = require("./services/emailService");

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
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),

  // Base URL for the auth server - MUST match frontend
  baseURL: "https://moostyle-production.up.railway.app",

  // Secret for signing tokens
  secret: process.env.BETTER_AUTH_SECRET || process.env.JWT_SECRET || "fallback-secret-change-in-production",
});

module.exports = { auth };

