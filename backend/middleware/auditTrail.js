const fs = require('fs');
const path = require('path');

// Ensure audit logs directory exists
const auditDir = path.join(__dirname, '../logs/audit');
if (!fs.existsSync(auditDir)) {
  fs.mkdirSync(auditDir, { recursive: true });
}

// Security audit trail middleware
const auditTrail = (operation, details = {}) => {
  return (req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      // Only log successful operations (2xx status codes)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const auditData = {
          timestamp: new Date().toISOString(),
          operation,
          userId: req.user?.id || 'anonymous',
          userEmail: req.user?.email || 'anonymous',
          userRole: req.user?.role || 'anonymous',
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          method: req.method,
          url: req.url,
          requestData: {
            body: sanitizeRequestData(req.body),
            query: req.query,
            params: req.params
          },
          responseStatus: res.statusCode,
          success: true,
          details: {
            ...details,
            sessionId: req.sessionID || 'no-session'
          }
        };

        // Log to audit file
        const auditFile = path.join(auditDir, `${operation.toLowerCase().replace(/\s+/g, '-')}.log`);
        fs.appendFileSync(auditFile, JSON.stringify(auditData) + '\n');
        
        // Also log to general audit file
        const generalAuditFile = path.join(auditDir, 'general-audit.log');
        fs.appendFileSync(generalAuditFile, JSON.stringify(auditData) + '\n');
      }
      
      originalSend.call(this, data);
    };
    
    next();
  };
};

// Sanitize sensitive data from request logging
const sanitizeRequestData = (data) => {
  if (!data || typeof data !== 'object') return data;
  
  const sanitized = { ...data };
  const sensitiveFields = ['password', 'token', 'secret', 'key', 'auth', 'credential'];
  
  Object.keys(sanitized).forEach(key => {
    if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
      sanitized[key] = '[REDACTED]';
    }
  });
  
  return sanitized;
};

// Failed operation audit trail
const auditFailedOperation = (operation, error, req) => {
  const auditData = {
    timestamp: new Date().toISOString(),
    operation,
    userId: req.user?.id || 'anonymous',
    userEmail: req.user?.email || 'anonymous',
    userRole: req.user?.role || 'anonymous',
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    method: req.method,
    url: req.url,
    requestData: {
      body: sanitizeRequestData(req.body),
      query: req.query,
      params: req.params
    },
    success: false,
    error: {
      message: error.message,
      type: error.name,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    },
    details: {
      sessionId: req.sessionID || 'no-session'
    }
  };

  // Log failed operations to separate file
  const failedAuditFile = path.join(auditDir, 'failed-operations.log');
  fs.appendFileSync(failedAuditFile, JSON.stringify(auditData) + '\n');
};

// Critical operation audit (for admin actions)
const auditCriticalOperation = (operation, details = {}) => {
  return (req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const auditData = {
          timestamp: new Date().toISOString(),
          operation,
          severity: 'CRITICAL',
          userId: req.user?.id || 'anonymous',
          userEmail: req.user?.email || 'anonymous',
          userRole: req.user?.role || 'anonymous',
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          method: req.method,
          url: req.url,
          requestData: {
            body: sanitizeRequestData(req.body),
            query: req.query,
            params: req.params
          },
          responseStatus: res.statusCode,
          success: true,
          details: {
            ...details,
            sessionId: req.sessionID || 'no-session',
            adminAction: true
          }
        };

        // Log to critical operations file
        const criticalAuditFile = path.join(auditDir, 'critical-operations.log');
        fs.appendFileSync(criticalAuditFile, JSON.stringify(auditData) + '\n');
        
        // Also log to general audit
        const generalAuditFile = path.join(auditDir, 'general-audit.log');
        fs.appendFileSync(generalAuditFile, JSON.stringify(auditData) + '\n');
      }
      
      originalSend.call(this, data);
    };
    
    next();
  };
};

module.exports = {
  auditTrail,
  auditFailedOperation,
  auditCriticalOperation,
  sanitizeRequestData
};
