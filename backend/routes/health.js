const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');

const router = express.Router();

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

    // Test database operations
    const userCount = await User.countDocuments();
    const cartCount = await Cart.countDocuments();
    
    const responseTime = Date.now() - startTime;
    
    res.json({
      status: 'healthy',
      message: 'Database connection is working properly',
      responseTime: `${responseTime}ms`,
      stats: {
        users: userCount,
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
    
    // Test JWT secret
    if (!process.env.JWT_SECRET) {
      return res.status(503).json({
        status: 'error',
        message: 'JWT_SECRET is not configured'
      });
    }

    // Test JWT token creation and validation
    const testPayload = { userId: 'test', username: 'test' };
    const testToken = jwt.sign(testPayload, process.env.JWT_SECRET, { expiresIn: '1m' });
    const decoded = jwt.verify(testToken, process.env.JWT_SECRET);

    if (!decoded.userId) {
      throw new Error('JWT verification failed');
    }

    // Test user model
    const userCount = await User.countDocuments();
    
    const responseTime = Date.now() - startTime;
    
    res.json({
      status: 'healthy',
      message: 'Authentication system is working properly',
      responseTime: `${responseTime}ms`,
      stats: {
        jwtConfigured: true,
        userCount: userCount,
        tokenExpiry: process.env.JWT_EXPIRE || '7d'
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
    
    // Test user model and operations
    const userCount = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: 'admin' });
    const activeUsers = await User.countDocuments({ isActive: true });
    
    // Test user creation (without saving)
    const testUser = new User({
      username: 'test_user',
      email: 'test@example.com',
      password: 'TestPassword123!',
      role: 'user'
    });
    
    // Validate user methods
    const isValidUser = testUser.validateSync();
    if (isValidUser) {
      throw new Error('User model validation failed');
    }

    const responseTime = Date.now() - startTime;
    
    res.json({
      status: 'healthy',
      message: 'User management system is working properly',
      responseTime: `${responseTime}ms`,
      stats: {
        totalUsers: userCount,
        adminUsers: adminCount,
        activeUsers: activeUsers,
        userModelValid: true
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

// Email service health check
router.get('/email/health', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Check email configuration
    const emailConfig = {
      service: process.env.EMAIL_SERVICE,
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ? '***configured***' : 'not configured'
    };

    // Check password reset email functionality
    const { sendPasswordResetEmail } = require('../services/emailService');
    const hasPasswordResetFunction = typeof sendPasswordResetEmail === 'function';

    const warnings = [];
    if (!process.env.EMAIL_SERVICE) warnings.push('EMAIL_SERVICE not configured');
    if (!process.env.EMAIL_USER) warnings.push('EMAIL_USER not configured');
    if (!process.env.EMAIL_PASS) warnings.push('EMAIL_PASS not configured');
    if (!hasPasswordResetFunction) warnings.push('Password reset email function not available');

    const responseTime = Date.now() - startTime;
    
    res.json({
      status: warnings.length > 0 ? 'warning' : 'healthy',
      message: warnings.length > 0 ? 'Email service has configuration issues' : 'Email service is properly configured',
      responseTime: `${responseTime}ms`,
      stats: {
        serviceConfigured: !!process.env.EMAIL_SERVICE,
        userConfigured: !!process.env.EMAIL_USER,
        passwordConfigured: !!process.env.EMAIL_PASS,
        passwordResetAvailable: hasPasswordResetFunction,
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
      },
      config: emailConfig,
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
