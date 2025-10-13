const express = require('express');
const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const PointTransaction = require('../models/PointTransaction');
const { MongoClient } = require('mongodb');

const router = express.Router();

// MongoDB connection for health checks
let db;
const initializeDB = async () => {
  try {
    if (!db) {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      db = client.db();
    }
  } catch (error) {
    console.error('Health check DB connection error:', error);
  }
};

// Basic health check
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'Server is running properly',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

// Database health check
router.get('/health/database', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Initialize DB connection
    await initializeDB();
    
    // Test database connection
    const connectionState = mongoose.connection.readyState;
    const connectionStates = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    if (connectionState !== 1) {
      return res.status(503).json({
        status: 'error',
        message: `Database is ${connectionStates[connectionState]}`,
        connectionState: connectionStates[connectionState]
      });
    }

    // Test database operations using Better Auth collections
    const userCount = await db.collection('user').countDocuments();
    const cartCount = await Cart.countDocuments();
    const accountCount = await db.collection('account').countDocuments();
    
    const responseTime = Date.now() - startTime;
    
    res.json({
      status: 'healthy',
      message: 'Database connection is working properly',
      responseTime: `${responseTime}ms`,
      stats: {
        users: userCount,
        accounts: accountCount,
        carts: cartCount,
        connectionState: connectionStates[connectionState]
      },
      warnings: responseTime > 1000 ? ['Database response time is slow'] : []
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Database health check failed',
      error: error.message
    });
  }
});

// Authentication health check
router.get('/auth/health', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Initialize DB connection
    await initializeDB();
    
    // Test Better Auth configuration
    if (!process.env.BETTER_AUTH_SECRET) {
      return res.status(503).json({
        status: 'error',
        message: 'BETTER_AUTH_SECRET is not configured'
      });
    }

    // Test Better Auth collections
    const userCount = await db.collection('user').countDocuments();
    const accountCount = await db.collection('account').countDocuments();
    const sessionCount = await db.collection('session').countDocuments();
    
    const responseTime = Date.now() - startTime;
    
    res.json({
      status: 'healthy',
      message: 'Better Auth system is working properly',
      responseTime: `${responseTime}ms`,
      stats: {
        betterAuthConfigured: true,
        userCount: userCount,
        accountCount: accountCount,
        sessionCount: sessionCount,
        secretConfigured: !!process.env.BETTER_AUTH_SECRET
      },
      warnings: responseTime > 500 ? ['Authentication response time is slow'] : []
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Authentication health check failed',
      error: error.message
    });
  }
});

// Cart health check
router.get('/cart/health', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Test cart model and operations
    const cartCount = await Cart.countDocuments();
    const activeCarts = await Cart.countDocuments({ isActive: true });
    
    // Test cart creation (without saving)
    const testCart = new Cart({
      user: new mongoose.Types.ObjectId(),
      items: [],
      lastUpdated: new Date(),
      isActive: true
    });
    
    // Validate cart methods
    const isValidCart = testCart.validateSync();
    if (isValidCart) {
      throw new Error('Cart model validation failed');
    }

    const responseTime = Date.now() - startTime;
    
    res.json({
      status: 'healthy',
      message: 'Cart system is working properly',
      responseTime: `${responseTime}ms`,
      stats: {
        totalCarts: cartCount,
        activeCarts: activeCarts,
        cartModelValid: true
      },
      warnings: responseTime > 500 ? ['Cart operations are slow'] : []
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Cart health check failed',
      error: error.message
    });
  }
});

// User management health check
router.get('/users/health', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Initialize DB connection
    await initializeDB();
    
    // Test Better Auth user collections
    const userCount = await db.collection('user').countDocuments();
    const adminCount = await db.collection('user').countDocuments({ role: 'admin' });
    const activeUsers = await db.collection('user').countDocuments({ isActive: true });
    
    const responseTime = Date.now() - startTime;
    
    res.json({
      status: 'healthy',
      message: 'User management system is working properly',
      responseTime: `${responseTime}ms`,
      stats: {
        totalUsers: userCount,
        adminUsers: adminCount,
        activeUsers: activeUsers,
        betterAuthEnabled: true
      },
      warnings: responseTime > 500 ? ['User operations are slow'] : []
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'User management health check failed',
      error: error.message
    });
  }
});

// Better Auth health check
router.get('/better-auth/health', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Initialize DB connection
    await initializeDB();
    
    // Test Better Auth configuration
    const config = {
      secret: !!process.env.BETTER_AUTH_SECRET,
      url: !!process.env.BETTER_AUTH_URL,
      googleClientId: !!process.env.GOOGLE_CLIENT_ID,
      googleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET
    };

    // Test Better Auth collections
    const userCount = await db.collection('user').countDocuments();
    const accountCount = await db.collection('account').countDocuments();
    const sessionCount = await db.collection('session').countDocuments();
    
    const responseTime = Date.now() - startTime;
    
    res.json({
      status: 'healthy',
      message: 'Better Auth system is working properly',
      responseTime: `${responseTime}ms`,
      stats: {
        users: userCount,
        accounts: accountCount,
        sessions: sessionCount,
        configuration: config
      },
      warnings: responseTime > 500 ? ['Better Auth response time is slow'] : []
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Better Auth health check failed',
      error: error.message
    });
  }
});

// Email service health check (Better Auth integrated)
router.get('/email/health', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Check Better Auth email configuration
    const betterAuthEmailConfig = {
      betterAuthSecret: !!process.env.BETTER_AUTH_SECRET,
      betterAuthUrl: !!process.env.BETTER_AUTH_URL,
      frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
    };

    // Check if Better Auth email functions are available
    let betterAuthEmailAvailable = false;
    let emailServiceAvailable = false;
    try {
      const { auth } = require('../auth');
      // Check if Better Auth instance has email configuration
      betterAuthEmailAvailable = auth && typeof auth === 'object';
      
      // Check if email service is available
      const { testEmailConfiguration } = require('../services/emailService');
      emailServiceAvailable = await testEmailConfiguration();
    } catch (requireError) {
      betterAuthEmailAvailable = false;
      emailServiceAvailable = false;
    }

    // Check optional SMTP configuration for actual email sending
    const smtpConfig = {
      service: process.env.EMAIL_SERVICE,
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ? '***configured***' : 'not configured'
    };

    const warnings = [];
    if (!process.env.BETTER_AUTH_SECRET) warnings.push('BETTER_AUTH_SECRET not configured');
    if (!process.env.BETTER_AUTH_URL) warnings.push('BETTER_AUTH_URL not configured');
    
    // Check email service availability
    if (!emailServiceAvailable) {
      if (!process.env.EMAIL_SERVICE) warnings.push('EMAIL_SERVICE not configured');
      if (!process.env.EMAIL_USER) warnings.push('EMAIL_USER not configured');
      if (!process.env.EMAIL_PASS) warnings.push('EMAIL_PASS not configured');
    }

    const responseTime = Date.now() - startTime;
    
    res.json({
      status: warnings.length > 0 ? 'warning' : 'healthy',
      message: warnings.length > 0 ? 'Email service has configuration issues' : 'Better Auth email service is properly configured',
      responseTime: `${responseTime}ms`,
      stats: {
        betterAuthEmailAvailable: betterAuthEmailAvailable,
        emailServiceAvailable: emailServiceAvailable,
        betterAuthSecretConfigured: !!process.env.BETTER_AUTH_SECRET,
        betterAuthUrlConfigured: !!process.env.BETTER_AUTH_URL,
        smtpServiceConfigured: !!process.env.EMAIL_SERVICE,
        smtpUserConfigured: !!process.env.EMAIL_USER,
        smtpPasswordConfigured: !!process.env.EMAIL_PASS,
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
        emailProvider: emailServiceAvailable ? 'Better Auth + SMTP' : 'Better Auth (Log Only)'
      },
      config: {
        betterAuth: betterAuthEmailConfig,
        smtp: smtpConfig
      },
      warnings: warnings
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Email service health check failed',
      error: error.message
    });
  }
});

module.exports = router;
