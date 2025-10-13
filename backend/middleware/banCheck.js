const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection
let db = null;
const initializeDB = async () => {
  if (!db) {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db();
  }
  return db;
};

/**
 * Middleware to check if user is banned
 * This should be used on protected routes to prevent banned users from accessing them
 */
const checkBanStatus = async (req, res, next) => {
  try {
    // Get user ID from session or token
    const userId = req.user?.id || req.session?.user?.id;
    
    if (!userId) {
      return next(); // No user ID, let other middleware handle authentication
    }

    // Ensure db is connected
    if (!db) {
      await initializeDB();
    }

    // Look up user in database
    let query = {};
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      query = { _id: new ObjectId(userId) };
    } else {
      query = { id: userId };
    }

    const user = await db.collection('user').findOne(query);
    
    if (user && !user.isActive) {
      // User is banned
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact support for assistance.',
        banReason: user.banReason || 'No reason provided',
        bannedAt: user.bannedAt
      });
    }

    next();
  } catch (error) {
    console.error('Error checking ban status:', error);
    next(); // Continue on error to avoid breaking the app
  }
};

/**
 * Middleware to check ban status for API routes
 * This is a simpler version that works with the existing auth system
 */
const checkBanStatusAPI = async (req, res, next) => {
  try {
    // This middleware assumes the user is already authenticated
    // and user info is available in req.user or similar
    
    if (req.user && !req.user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact support for assistance.',
        banReason: req.user.banReason || 'No reason provided',
        bannedAt: req.user.bannedAt
      });
    }

    next();
  } catch (error) {
    console.error('Error checking ban status:', error);
    next();
  }
};

module.exports = {
  checkBanStatus,
  checkBanStatusAPI
};
