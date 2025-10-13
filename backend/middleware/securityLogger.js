const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Security event logging middleware
const securityLogger = (req, res, next) => {
  const logData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.user?.id || 'anonymous',
    sessionId: req.sessionID || 'no-session',
    referer: req.get('Referer') || 'direct',
    statusCode: res.statusCode
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Security Log:', JSON.stringify(logData, null, 2));
  }

  // Log to file in production
  if (process.env.NODE_ENV === 'production') {
    const logFile = path.join(logsDir, 'security.log');
    fs.appendFileSync(logFile, JSON.stringify(logData) + '\n');
  }

  next();
};

// Suspicious activity detection middleware
const detectSuspiciousActivity = (req, res, next) => {
  const ip = req.ip;
  const userAgent = req.get('User-Agent');
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /sqlmap/i,
    /nikto/i,
    /nmap/i,
    /bot/i,
    /crawler/i,
    /scanner/i,
    /scanner/i,
    /exploit/i,
    /injection/i,
    /xss/i,
    /csrf/i
  ];

  const isSuspicious = suspiciousPatterns.some(pattern => 
    pattern.test(userAgent) || pattern.test(req.url)
  );

  if (isSuspicious) {
    const alertData = {
      timestamp: new Date().toISOString(),
      type: 'SUSPICIOUS_ACTIVITY',
      ip,
      userAgent,
      url: req.url,
      method: req.method,
      severity: 'HIGH'
    };

    console.warn('🚨 Suspicious Activity Detected:', alertData);
    
    // Log to security alert file
    const alertFile = path.join(logsDir, 'security-alerts.log');
    fs.appendFileSync(alertFile, JSON.stringify(alertData) + '\n');
    
    // In production, you might want to send alerts to monitoring systems
    if (process.env.NODE_ENV === 'production') {
      // TODO: Integrate with monitoring service (e.g., Sentry, DataDog)
    }
  }

  next();
};

// Request monitoring middleware
const requestMonitor = (req, res, next) => {
  const startTime = Date.now();
  
  // Override res.end to capture response time
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const responseTime = Date.now() - startTime;
    
    // Log slow requests
    if (responseTime > 5000) { // 5 seconds
      const slowRequestData = {
        timestamp: new Date().toISOString(),
        type: 'SLOW_REQUEST',
        method: req.method,
        url: req.url,
        responseTime: responseTime,
        statusCode: res.statusCode,
        ip: req.ip,
        userId: req.user?.id || 'anonymous'
      };
      
      console.warn('🐌 Slow Request Detected:', slowRequestData);
      
      if (process.env.NODE_ENV === 'production') {
        const slowRequestFile = path.join(logsDir, 'slow-requests.log');
        fs.appendFileSync(slowRequestFile, JSON.stringify(slowRequestData) + '\n');
      }
    }
    
    originalEnd.call(this, chunk, encoding);
  };
  
  next();
};

// Error logging middleware
const errorLogger = (error, req, res, next) => {
  const errorData = {
    timestamp: new Date().toISOString(),
    type: 'ERROR',
    message: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.user?.id || 'anonymous',
    statusCode: res.statusCode || 500
  };

  console.error('❌ Error Logged:', errorData);
  
  if (process.env.NODE_ENV === 'production') {
    const errorFile = path.join(logsDir, 'errors.log');
    fs.appendFileSync(errorFile, JSON.stringify(errorData) + '\n');
  }
  
  next(error);
};

module.exports = {
  securityLogger,
  detectSuspiciousActivity,
  requestMonitor,
  errorLogger
};
