const rateLimit = require('express-rate-limit');

// Download rate limiter - more restrictive for downloads
const downloadRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // Limit each IP to 3 download requests per windowMs
  message: {
    success: false,
    message: 'Too many download requests, please try again later.',
    retryAfter: '5 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API rate limiter
const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth rate limiter - more restrictive for authentication
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  downloadRateLimit,
  apiRateLimit,
  authRateLimit
};


// Download rate limiter - more restrictive for downloads
const downloadRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // Limit each IP to 3 download requests per windowMs
  message: {
    success: false,
    message: 'Too many download requests, please try again later.',
    retryAfter: '5 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API rate limiter
const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth rate limiter - more restrictive for authentication
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  downloadRateLimit,
  apiRateLimit,
  authRateLimit
};


