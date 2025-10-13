const express = require('express');
const Cart = require('../models/Cart');
const PointTransaction = require('../models/PointTransaction');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();

// MongoDB connection for direct database access
let db;
let client;

const initializeDB = async () => {
  try {
    if (!client) {
      client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      db = client.db();
      console.log('Admin routes: MongoDB connected');
    }
  } catch (error) {
    console.error('Admin routes: MongoDB connection error:', error);
  }
};

// Initialize DB connection
initializeDB();

// Middleware to verify Better Auth admin session
const verifyAdminSession = async (req, res, next) => {
  try {
    // Get session from Better Auth
    const sessionResponse = await fetch(`${process.env.BETTER_AUTH_URL || 'http://localhost:5000'}/api/auth/get-session`, {
      headers: {
        'Cookie': req.headers.cookie || '',
        'Authorization': req.headers.authorization || ''
      }
    });

    if (!sessionResponse.ok) {
      return res.status(401).json({
        success: false,
        message: 'No valid session found'
      });
    }

    const sessionData = await sessionResponse.json();
    
    if (!sessionData?.user || sessionData.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    req.user = sessionData.user;
    next();
  } catch (error) {
    console.error('Admin session verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Session verification failed'
    });
  }
};

// Get admin dashboard stats
router.get('/stats', verifyAdminSession, async (req, res) => {
  try {
    // Ensure db is connected
    if (!db) {
      await initializeDB();
    }

    // Get users directly from MongoDB with Better Auth structure
    const users = await db.collection('user').find({}).toArray();
    
    // Get carts count
    const totalCarts = await Cart.countDocuments({ isActive: true });
    
    // Get transactions count
    const totalTransactions = await PointTransaction.countDocuments();

    // Get recent users (last 5) with proper sorting by createdAt
    const recentUsers = await db.collection('user')
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    // Get recent carts (last 5) with user information
    const recentCarts = await Cart.find({ isActive: true })
      .sort({ lastUpdated: -1 })
      .limit(5)
      .lean();

    // Populate user information for carts
    const cartsWithUsers = await Promise.all(
      recentCarts.map(async (cart) => {
        try {
          // Handle both ObjectId and string user IDs
          let user = null;
          
          if (cart.user) {
            // Try multiple lookup strategies
            const queries = [
              { _id: cart.user },           // MongoDB ObjectId
              { id: cart.user.toString() }, // Custom string ID
              { _id: new ObjectId(cart.user) } // Convert string to ObjectId
            ];
            
            for (const query of queries) {
              try {
                user = await db.collection('user').findOne(query);
                if (user) {
                  console.log('Cart user found with query:', query);
                  break;
                }
              } catch (error) {
                // Continue to next query if this one fails
                continue;
              }
            }
            
            console.log('Cart user lookup:', { 
              cartUserId: cart.user, 
              cartUserIdType: typeof cart.user,
              foundUser: user ? { username: user.username, email: user.email } : null 
            });
          } else {
            console.log('Cart has no user field:', cart);
          }
          
          return {
            ...cart,
            userInfo: user ? {
              username: user.username,
              email: user.email,
              name: user.name
            } : null
          };
        } catch (error) {
          console.error('Error fetching user for cart:', error);
          return {
            ...cart,
            userInfo: null
          };
        }
      })
    );

    // Get recent transactions (last 5)
    const recentTransactions = await PointTransaction.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Calculate comprehensive stats
    const stats = {
      totalUsers: users.length,
      adminUsers: users.filter(u => u.role === 'admin').length,
      regularUsers: users.filter(u => u.role === 'user').length,
      activeUsers: users.filter(u => u.isActive).length,
      bannedUsers: users.filter(u => !u.isActive).length,
      totalCarts: totalCarts,
      totalPoints: users.reduce((sum, u) => sum + (u.points || 0), 0),
      totalTransactions: totalTransactions,
      membershipLevels: {
        Bronze: users.filter(u => u.membershipLevel === 'Bronze').length,
        Silver: users.filter(u => u.membershipLevel === 'Silver').length,
        Gold: users.filter(u => u.membershipLevel === 'Gold').length,
        Diamond: users.filter(u => u.membershipLevel === 'Diamond').length,
      },
      recentUsers: recentUsers,
      recentCarts: cartsWithUsers,
      recentTransactions: recentTransactions
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats'
    });
  }
});

// Get all users
router.get('/users', verifyAdminSession, async (req, res) => {
  try {
    // Ensure db is connected
    if (!db) {
      await initializeDB();
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';

    // Get users directly from MongoDB
    let users = await db.collection('user').find({}).toArray();

    // Filter by search term if provided
    if (search) {
      users = users.filter(user => 
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        (user.username && user.username.toLowerCase().includes(search.toLowerCase())) ||
        (user.name && user.name.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply pagination
    const skip = (page - 1) * limit;
    const paginatedUsers = users.slice(skip, skip + limit);

    res.json({
      success: true,
      users: paginatedUsers,
      pagination: {
        page,
        limit,
        total: users.length,
        pages: Math.ceil(users.length / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

// Get all carts
router.get('/carts', verifyAdminSession, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const carts = await Cart.find({ isActive: true })
      .sort({ lastUpdated: -1 })
      .skip(skip)
      .limit(limit);

    const totalCarts = await Cart.countDocuments({ isActive: true });

    res.json({
      success: true,
      carts,
      pagination: {
        page,
        limit,
        total: totalCarts,
        pages: Math.ceil(totalCarts / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching carts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch carts'
    });
  }
});

// Get point transactions
router.get('/point-transactions', verifyAdminSession, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const transactions = await PointTransaction.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalTransactions = await PointTransaction.countDocuments();

    res.json({
      success: true,
      transactions,
      pagination: {
        page,
        limit,
        total: totalTransactions,
        pages: Math.ceil(totalTransactions / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching point transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch point transactions'
    });
  }
});

// Update user using Better Auth API
router.put('/users/:userId', verifyAdminSession, async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    
    console.log('=== USER UPDATE REQUEST ===');
    console.log('User ID:', userId);
    console.log('Updates:', updates);

    // Ensure db is connected
    if (!db) {
      await initializeDB();
    }

    // Handle both _id (MongoDB ObjectId) and id (custom field) for user lookup
    let query = {};
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      // If it's a MongoDB ObjectId, search by _id
      query = { _id: new ObjectId(userId) };
      console.log('Using MongoDB ObjectId query:', query);
    } else {
      // Otherwise, search by custom id field
      query = { id: userId };
      console.log('Using custom ID query:', query);
    }

    // First, get the user to find their Better Auth ID
    const user = await db.collection('user').findOne(query);
    console.log('Found user:', user);
    
    if (!user) {
      console.log('User not found with query:', query);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user directly in MongoDB (safer approach)
    const result = await db.collection('user').updateOne(
      query,
      { 
        $set: {
          ...updates,
          updatedAt: new Date()
        }
      }
    );
    
    console.log('Update result:', result);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get updated user using the same query logic
    const updatedUser = await db.collection('user').findOne(query);
    console.log('Updated user found:', updatedUser);

    res.json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update user'
    });
  }
});

// Set user role
router.put('/users/:userId/role', verifyAdminSession, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Ensure db is connected
    if (!db) {
      await initializeDB();
    }

    // Handle both _id (MongoDB ObjectId) and id (custom field) for user lookup
    let query = {};
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      // If it's a MongoDB ObjectId, search by _id
      query = { _id: new ObjectId(userId) };
    } else {
      // Otherwise, search by custom id field
      query = { id: userId };
    }

    // Update role directly in MongoDB
    const result = await db.collection('user').updateOne(
      query,
      { 
        $set: {
          role: role,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get updated user using the same query logic
    const updatedUser = await db.collection('user').findOne(query);

    res.json({
      success: true,
      message: `User role updated to ${role}`,
      user: updatedUser
    });
  } catch (error) {
    console.error('Error setting user role:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to set user role'
    });
  }
});

// Ban/Unban user
router.put('/users/:userId/ban', verifyAdminSession, async (req, res) => {
  try {
    const { userId } = req.params;
    const { ban, banReason } = req.body;

    // Ensure db is connected
    if (!db) {
      await initializeDB();
    }

    // Handle both _id (MongoDB ObjectId) and id (custom field) for user lookup
    let query = {};
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      // If it's a MongoDB ObjectId, search by _id
      query = { _id: new ObjectId(userId) };
    } else {
      // Otherwise, search by custom id field
      query = { id: userId };
    }

    // Get user before updating for email notification
    const userBeforeUpdate = await db.collection('user').findOne(query);
    if (!userBeforeUpdate) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prepare update data
    const updateData = {
      isActive: !ban, // ban=true means isActive=false
      updatedAt: new Date()
    };

    // Add ban-specific fields
    if (ban) {
      updateData.banReason = banReason || 'No reason provided';
      updateData.bannedAt = new Date();
    } else {
      // Clear ban fields when unbanning
      updateData.banReason = null;
      updateData.bannedAt = null;
    }

    // Update user status in MongoDB
    const result = await db.collection('user').updateOne(
      query,
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get updated user
    const updatedUser = await db.collection('user').findOne(query);

    // Send email notification
    try {
      const { sendBanNotificationEmail, sendUnbanNotificationEmail } = require('../services/emailService');
      
      if (ban) {
        // Send ban notification
        await sendBanNotificationEmail(
          userBeforeUpdate.email, 
          userBeforeUpdate.username || userBeforeUpdate.name, 
          banReason || 'No reason provided'
        );
        console.log(`Ban notification sent to ${userBeforeUpdate.email}`);
      } else {
        // Send unban notification
        await sendUnbanNotificationEmail(
          userBeforeUpdate.email, 
          userBeforeUpdate.username || userBeforeUpdate.name
        );
        console.log(`Unban notification sent to ${userBeforeUpdate.email}`);
      }
    } catch (emailError) {
      console.error('Error sending ban/unban notification:', emailError);
      // Don't fail the request if email fails
    }

    // Invalidate user sessions by updating session data
    try {
      // Find and invalidate all sessions for this user
      const sessions = await db.collection('session').find({ userId: userBeforeUpdate.id }).toArray();
      if (sessions.length > 0) {
        await db.collection('session').updateMany(
          { userId: userBeforeUpdate.id },
          { 
            $set: { 
              expiresAt: new Date(), // Expire immediately
              invalidated: true 
            } 
          }
        );
        console.log(`Invalidated ${sessions.length} sessions for user ${userBeforeUpdate.username}`);
      }
    } catch (sessionError) {
      console.error('Error invalidating sessions:', sessionError);
      // Don't fail the request if session invalidation fails
    }

    res.json({
      success: true,
      message: `User ${ban ? 'banned' : 'unbanned'} successfully`,
      user: updatedUser
    });
  } catch (error) {
    console.error('Error banning/unbanning user:', error);
    res.status(500).json({
      success: false,
      message: error.message || `Failed to ${ban ? 'ban' : 'unban'} user`
    });
  }
});

// Delete user
router.delete('/users/:userId', verifyAdminSession, async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure db is connected
    if (!db) {
      await initializeDB();
    }

    // Handle both _id (MongoDB ObjectId) and id (custom field) for user lookup
    let query = {};
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      // If it's a MongoDB ObjectId, search by _id
      query = { _id: new ObjectId(userId) };
    } else {
      // Otherwise, search by custom id field
      query = { id: userId };
    }

    // Delete user and related data directly from MongoDB
    const session = await db.client.startSession();
    
    try {
      await session.withTransaction(async () => {
        // Delete user
        const userResult = await db.collection('user').deleteOne(query, { session });
        
        if (userResult.deletedCount === 0) {
          throw new Error('User not found');
        }

        // Delete related account records
        await db.collection('account').deleteMany({ userId: userId }, { session });
        
        // Delete user's cart
        await Cart.deleteMany({ user: userId }, { session });
        
        // Delete user's point transactions
        await PointTransaction.deleteMany({ userId: userId }, { session });
      });
    } finally {
      await session.endSession();
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete user'
    });
  }
});

// Health check endpoints for admin
router.get('/health', verifyAdminSession, async (req, res) => {
  try {
    // Ensure db is connected
    if (!db) {
      await initializeDB();
    }

    const healthChecks = {
      database: {
        status: 'healthy',
        message: 'MongoDB connection active',
        timestamp: new Date().toISOString()
      },
      betterAuth: {
        status: 'healthy',
        message: 'Better Auth session verified',
        timestamp: new Date().toISOString()
      },
      server: {
        status: 'healthy',
        message: 'Server running properly',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      }
    };

    res.json({
      success: true,
      health: healthChecks,
      overallStatus: 'healthy'
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      error: error.message
    });
  }
});

// Database health check
router.get('/health/database', verifyAdminSession, async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Ensure db is connected
    if (!db) {
      await initializeDB();
    }
    
    // Test database connection with a simple query
    await db.collection('user').findOne({});
    
    const responseTime = Date.now() - startTime;
    
    res.json({
      status: 'healthy',
      message: 'Database connection successful',
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database health check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Better Auth health check
router.get('/health/better-auth', verifyAdminSession, async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Test Better Auth session
    const sessionResponse = await fetch(`${process.env.BETTER_AUTH_URL || 'http://localhost:5000'}/api/auth/get-session`, {
      headers: {
        'Cookie': req.headers.cookie || '',
        'Authorization': req.headers.authorization || ''
      }
    });
    
    const responseTime = Date.now() - startTime;
    
    if (sessionResponse.ok) {
      res.json({
        status: 'healthy',
        message: 'Better Auth session valid',
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Better Auth session invalid',
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Better Auth health check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Better Auth health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;