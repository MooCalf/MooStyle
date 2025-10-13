const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();

// MongoDB connection
let db;
const initializeDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db();
    console.log('✅ MongoDB connected for user routes');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

// Middleware to verify Better Auth session
const verifySession = async (req, res, next) => {
  try {
    const { auth } = require('../auth');
    const session = await auth.api.getSession({
      headers: req.headers
    });

    if (!session || !session.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in.'
      });
    }

    req.user = session.user;
    next();
  } catch (error) {
    console.error('Session verification error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid session. Please log in again.'
    });
  }
};

// Get user profile
router.get('/profile', verifySession, async (req, res) => {
  try {
    // Ensure db is connected
    if (!db) {
      await initializeDB();
    }

    const user = req.user;
    
    // Get additional user stats from database using email
    const userDoc = await db.collection('user').findOne({ email: user.email });
    
    if (!userDoc) {
      return res.status(404).json({
        success: false,
        message: 'User not found in database'
      });
    }

    res.json({
      success: true,
      user: {
        ...user,
        ...userDoc,
        // Ensure we don't expose sensitive fields
        password: undefined,
        emailVerificationToken: undefined,
        passwordResetToken: undefined
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile'
    });
  }
});

// Update user profile
router.put('/profile', verifySession, async (req, res) => {
  try {
    // Ensure db is connected
    if (!db) {
      await initializeDB();
    }

    const user = req.user;
    const updates = req.body;
    
    console.log('=== USER PROFILE UPDATE REQUEST ===');
    console.log('User Email:', user.email);
    console.log('Updates:', updates);

    // Validate allowed fields - only allow username updates
    const allowedFields = ['username'];
    const filteredUpdates = {};
    
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field];
      }
    }

    // Add timestamp
    filteredUpdates.updatedAt = new Date();

    // Update user in database using email as the lookup key
    const result = await db.collection('user').updateOne(
      { email: user.email },
      { $set: filteredUpdates }
    );
    
    console.log('Update result:', result);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found in database'
      });
    }

    // Get updated user
    const updatedUser = await db.collection('user').findOne({ email: user.email });
    console.log('Updated user found:', updatedUser);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        ...updatedUser,
        // Ensure we don't expose sensitive fields
        password: undefined,
        emailVerificationToken: undefined,
        passwordResetToken: undefined
      }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update profile'
    });
  }
});

// Get user stats
router.get('/stats', verifySession, async (req, res) => {
  try {
    // Ensure db is connected
    if (!db) {
      await initializeDB();
    }

    const user = req.user;
    
    // Get user stats from database using email
    const userDoc = await db.collection('user').findOne({ email: user.email });
    
    if (!userDoc) {
      return res.status(404).json({
        success: false,
        message: 'User not found in database'
      });
    }

    // Calculate stats
    const stats = {
      totalDownloads: userDoc.totalDownloads || 0,
      totalPoints: userDoc.points || 0,
      membershipLevel: userDoc.membershipLevel || 'Bronze',
      joinDate: userDoc.createdAt || userDoc.created_at,
      lastActive: userDoc.lastLogin || userDoc.last_login || new Date()
    };

    res.json({
      success: true,
      ...stats
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user stats'
    });
  }
});

module.exports = router;
