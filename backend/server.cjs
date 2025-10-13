const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

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

// Security middleware - simplified
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for development
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  hsts: false // Disable HSTS for development
}));

// Rate limiting - simplified
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Increased limit for testing
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In production, be more restrictive
    if (process.env.NODE_ENV === 'production') {
      const allowedOrigins = [
        'https://yourdomain.com',
        'https://www.yourdomain.com'
      ];
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    }
    
    // In development, allow localhost
    if (origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    
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

// Mount Better Auth handler
app.use('/api/auth', toNodeHandler(auth));

// Google OAuth callback route
app.get('/api/auth/callback/google', (req, res) => {
  // This will be handled by Better Auth, but we need to ensure it exists
  res.redirect('/');
});

// Root route handler for OAuth redirects
app.get('/', (req, res) => {
  res.json({ 
    message: 'MooStyle API Server',
    status: 'running',
    timestamp: new Date().toISOString()
  });
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

// Global error handler
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