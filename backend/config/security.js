// Security Configuration
const securityConfig = {
  // Password requirements
  password: {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    specialChars: '@$!%*?&',
    maxAge: 90, // days
    historyCount: 5 // remember last 5 passwords
  },

  // Account lockout
  lockout: {
    maxAttempts: 5,
    lockoutDuration: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
    resetAttemptsAfter: 15 * 60 * 1000 // 15 minutes
  },

  // JWT settings
  jwt: {
    expiresIn: '24h',
    refreshExpiresIn: '7d',
    issuer: 'MooStyle',
    audience: 'MooStyle-Users'
  },

  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    authWindowMs: 15 * 60 * 1000, // 15 minutes
    maxAuthAttempts: 5
  },

  // Session management
  session: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict'
  },

  // CORS settings
  cors: {
    allowedOrigins: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175'
    ],
    credentials: true
  },

  // Security headers
  headers: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
      }
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true
    }
  },

  // Data encryption
  encryption: {
    algorithm: 'aes-256-gcm',
    keyLength: 32,
    ivLength: 16
  },

  // File upload security
  fileUpload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    scanForMalware: true
  },

  // Database security
  database: {
    connectionTimeout: 30000,
    queryTimeout: 10000,
    maxConnections: 10,
    enableSSL: true
  },

  // Logging
  logging: {
    logFailedLogins: true,
    logSuspiciousActivity: true,
    logAdminActions: true,
    retentionDays: 90
  }
};

module.exports = securityConfig;
