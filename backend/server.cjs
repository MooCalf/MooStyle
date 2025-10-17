const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { securityLogger, detectSuspiciousActivity, requestMonitor, errorLogger } = require('./middleware/securityLogger');
const securityMetrics = require('./middleware/securityMetrics');
const { auditTrail, auditCriticalOperation } = require('./middleware/auditTrail');
const backupSecurity = require('./middleware/backupSecurity');
const disasterRecovery = require('./middleware/disasterRecovery');

// Load environment variables
dotenv.config();

// Environment variable validation
const requiredEnvVars = ['MONGODB_URI'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  console.error('Please check your .env file and ensure all required variables are set.');
  process.exit(1);
}

console.log('✅ Environment variables validated successfully');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Caching middleware for API responses
app.use((req, res, next) => {
  // Set cache headers for GET requests to profile endpoint
  if (req.method === 'GET' && req.path === '/api/auth/profile') {
    res.set('Cache-Control', 'private, max-age=300'); // 5 minutes cache
    res.set('ETag', `"${Date.now()}"`); // Simple ETag for cache validation
  }
  next();
});

// Enhanced Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://accounts.google.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "https://accounts.google.com"],
      frameSrc: ["'self'", "https://accounts.google.com"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  xFrameOptions: { action: 'deny' },
  xContentTypeOptions: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  hsts: process.env.NODE_ENV === 'production' ? {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  } : false
}));

// Enhanced Rate Limiting - Tiered approach
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Reduced from 200 for better security
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Very strict for auth attempts
  message: {
    error: 'Too many authentication attempts, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Moderate rate limiting for admin operations
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Moderate for admin operations
  message: {
    error: 'Too many admin requests, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply general rate limiting to all routes
app.use(generalLimiter);

// Apply security logging and monitoring middleware
app.use(securityLogger);
app.use(detectSuspiciousActivity);
app.use(requestMonitor);

// Security metrics collection middleware
app.use((req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    // Record request metrics
    securityMetrics.recordRequest(req, res);
    
    // Record suspicious activity if detected
    if (res.statusCode >= 400) {
      securityMetrics.recordSuspiciousActivity('HTTP_ERROR', {
        statusCode: res.statusCode,
        url: req.url,
        method: req.method
      });
    }
    
    originalSend.call(this, data);
  };
  
  next();
});

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Always allow these origins
    const allowedOrigins = [
      'https://moostyles.com',
      'https://www.moostyles.com',
      'https://moostyles.pages.dev',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:3001'
    ];
    
    // Add environment variable if it exists
    if (process.env.FRONTEND_URL) {
      allowedOrigins.push(process.env.FRONTEND_URL);
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Log the blocked origin for debugging
    console.log('🚫 CORS blocked origin:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Basic health check endpoint (legacy)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Better Auth integration
const { auth } = require('./auth');
const { toNodeHandler } = require('better-auth/node');

// Add logging middleware for OAuth callbacks BEFORE Better Auth handler
app.use('/api/auth/callback/google', (req, res, next) => {
  console.log('🔍 OAuth Callback Received:');
  console.log('  - URL:', req.url);
  console.log('  - Method:', req.method);
  console.log('  - Query:', req.query);
  console.log('  - Headers:', req.headers);
  next();
});

// Mount Better Auth handler
app.use('/api/auth', toNodeHandler(auth));

// Custom error route for Better Auth
app.get('/auth-error', (req, res) => {
  const error = req.query.error || 'unknown_error';
  console.log('🔍 Better Auth Error Route Hit:', error);
  console.log('🔍 Query Parameters:', req.query);
  console.log('🔍 Full URL:', req.url);
  console.log('🔍 Headers:', req.headers);
  
  // Redirect to frontend with error
  const frontendUrl = process.env.FRONTEND_URL || 'https://moostyles.pages.dev';
  console.log('🔍 Redirecting to:', `${frontendUrl}/login?error=${error}`);
  res.redirect(`${frontendUrl}/login?error=${error}`);
});

// Root route handler for OAuth redirects
app.get('/', (req, res) => {
  res.json({ 
    message: 'MooStyle API Server',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Apply specific rate limiters to routes
app.use('/api/auth', authLimiter);
app.use('/api/admin', adminLimiter);

// Security admin routes
app.get('/api/admin/security/metrics', (req, res) => {
  try {
    const metrics = securityMetrics.getSecurityMetrics();
    res.json({
      success: true,
      metrics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve security metrics',
      error: error.message
    });
  }
});

app.get('/api/admin/security/report', (req, res) => {
  try {
    const report = securityMetrics.generateSecurityReport('daily');
    res.json({
      success: true,
      report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate security report',
      error: error.message
    });
  }
});

app.get('/api/admin/backup/status', (req, res) => {
  try {
    const status = backupSecurity.getBackupStatus();
    res.json({
      success: true,
      status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve backup status',
      error: error.message
    });
  }
});

app.post('/api/admin/backup/create', async (req, res) => {
  try {
    const { type } = req.body;
    let result;
    
    switch (type) {
      case 'user-data':
        result = await backupSecurity.createUserDataBackup();
        break;
      case 'system-config':
        result = await backupSecurity.createSystemConfigBackup();
        break;
      case 'security-logs':
        result = await backupSecurity.createSecurityLogsBackup();
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid backup type. Use: user-data, system-config, or security-logs'
        });
    }
    
    res.json({
      success: true,
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create backup',
      error: error.message
    });
  }
});

app.get('/api/admin/recovery/procedures', (req, res) => {
  try {
    const procedures = disasterRecovery.getRecoveryProcedures();
    res.json({
      success: true,
      procedures
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve recovery procedures',
      error: error.message
    });
  }
});

app.post('/api/admin/recovery/test', async (req, res) => {
  try {
    const testResults = await disasterRecovery.testRecoveryProcedures();
    res.json({
      success: true,
      testResults
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to test recovery procedures',
      error: error.message
    });
  }
});

// Legacy routes (keep for backward compatibility during migration)
app.use('/api/admin', require('./routes/admin'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/user', require('./routes/user'));
app.use('/api', require('./routes/health')); // Re-enabled with Better Auth support

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found',
    error: 'The requested endpoint does not exist',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Global error handler with security logging
app.use(errorLogger);
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.message);
  
  // CORS error
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      success: false,
      message: 'CORS policy violation',
      error: 'Request not allowed from this origin',
      timestamp: new Date().toISOString()
    });
  }
  
  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: 'Internal server error',
    error: err.message || 'An unexpected error occurred',
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`🗄️  Database: MongoDB Atlas`);
});

module.exports = app;