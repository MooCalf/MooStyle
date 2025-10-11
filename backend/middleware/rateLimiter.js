const rateLimit = require('express-rate-limit');

// Rate limiter for download endpoints
const downloadRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // Increased to 10 downloads per 5 minutes for testing
  message: {
    success: false,
    message: 'Too many download attempts. Please wait 5 minutes before trying again.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for admin users
    return req.user && req.user.role === 'admin';
  }
});

// Rate limiter for general API endpoints
const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Maximum 100 requests per 15 minutes per IP
  message: {
    success: false,
    message: 'Too many requests. Please wait before trying again.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter for authentication endpoints
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 login attempts per 15 minutes per IP
  message: {
    success: false,
    message: 'Too many authentication attempts. Please wait 15 minutes before trying again.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  downloadRateLimit,
  apiRateLimit,
  authRateLimit
};
