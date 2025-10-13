const fs = require('fs');
const path = require('path');

// Ensure metrics directory exists
const metricsDir = path.join(__dirname, '../logs/metrics');
if (!fs.existsSync(metricsDir)) {
  fs.mkdirSync(metricsDir, { recursive: true });
}

// Security metrics collection
class SecurityMetrics {
  constructor() {
    this.metrics = {
      totalRequests: 0,
      failedRequests: 0,
      suspiciousActivities: 0,
      blockedIPs: new Set(),
      userLogins: 0,
      adminActions: 0,
      securityEvents: 0,
      errorCounts: {},
      hourlyStats: {},
      dailyStats: {}
    };
    
    // Initialize hourly stats
    this.initializeHourlyStats();
  }

  initializeHourlyStats() {
    const now = new Date();
    const hour = now.getHours();
    const date = now.toISOString().split('T')[0];
    
    if (!this.metrics.hourlyStats[date]) {
      this.metrics.hourlyStats[date] = {};
    }
    
    if (!this.metrics.hourlyStats[date][hour]) {
      this.metrics.hourlyStats[date][hour] = {
        requests: 0,
        errors: 0,
        suspicious: 0,
        logins: 0,
        adminActions: 0
      };
    }
  }

  // Record a request
  recordRequest(req, res) {
    this.metrics.totalRequests++;
    
    const now = new Date();
    const hour = now.getHours();
    const date = now.toISOString().split('T')[0];
    
    this.initializeHourlyStats();
    this.metrics.hourlyStats[date][hour].requests++;
    
    if (res.statusCode >= 400) {
      this.metrics.failedRequests++;
      this.metrics.hourlyStats[date][hour].errors++;
      
      // Track error types
      const errorType = this.getErrorType(res.statusCode);
      this.metrics.errorCounts[errorType] = (this.metrics.errorCounts[errorType] || 0) + 1;
    }
  }

  // Record suspicious activity
  recordSuspiciousActivity(activityType, details) {
    this.metrics.suspiciousActivities++;
    this.metrics.securityEvents++;
    
    const now = new Date();
    const hour = now.getHours();
    const date = now.toISOString().split('T')[0];
    
    this.initializeHourlyStats();
    this.metrics.hourlyStats[date][hour].suspicious++;
    
    // Log detailed suspicious activity
    const suspiciousData = {
      timestamp: new Date().toISOString(),
      type: activityType,
      details,
      severity: this.getSeverityLevel(activityType)
    };
    
    const suspiciousFile = path.join(metricsDir, 'suspicious-activities.log');
    fs.appendFileSync(suspiciousFile, JSON.stringify(suspiciousData) + '\n');
  }

  // Record user login
  recordUserLogin(userId, success, ip) {
    this.metrics.userLogins++;
    
    const now = new Date();
    const hour = now.getHours();
    const date = now.toISOString().split('T')[0];
    
    this.initializeHourlyStats();
    this.metrics.hourlyStats[date][hour].logins++;
    
    const loginData = {
      timestamp: new Date().toISOString(),
      userId,
      success,
      ip,
      type: 'USER_LOGIN'
    };
    
    const loginFile = path.join(metricsDir, 'user-logins.log');
    fs.appendFileSync(loginFile, JSON.stringify(loginData) + '\n');
  }

  // Record admin action
  recordAdminAction(action, userId, details) {
    this.metrics.adminActions++;
    
    const now = new Date();
    const hour = now.getHours();
    const date = now.toISOString().split('T')[0];
    
    this.initializeHourlyStats();
    this.metrics.hourlyStats[date][hour].adminActions++;
    
    const adminData = {
      timestamp: new Date().toISOString(),
      action,
      userId,
      details,
      type: 'ADMIN_ACTION'
    };
    
    const adminFile = path.join(metricsDir, 'admin-actions.log');
    fs.appendFileSync(adminFile, JSON.stringify(adminData) + '\n');
  }

  // Block IP address
  blockIP(ip, reason) {
    this.metrics.blockedIPs.add(ip);
    
    const blockData = {
      timestamp: new Date().toISOString(),
      ip,
      reason,
      type: 'IP_BLOCKED'
    };
    
    const blockFile = path.join(metricsDir, 'blocked-ips.log');
    fs.appendFileSync(blockFile, JSON.stringify(blockData) + '\n');
  }

  // Get security metrics for admin dashboard
  getSecurityMetrics() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    return {
      overview: {
        totalRequests: this.metrics.totalRequests,
        failedRequests: this.metrics.failedRequests,
        suspiciousActivities: this.metrics.suspiciousActivities,
        blockedIPs: this.metrics.blockedIPs.size,
        userLogins: this.metrics.userLogins,
        adminActions: this.metrics.adminActions,
        securityEvents: this.metrics.securityEvents
      },
      errorBreakdown: this.metrics.errorCounts,
      todayStats: this.metrics.hourlyStats[today] || {},
      yesterdayStats: this.metrics.hourlyStats[yesterday] || {},
      successRate: this.calculateSuccessRate(),
      threatLevel: this.calculateThreatLevel()
    };
  }

  // Calculate success rate
  calculateSuccessRate() {
    if (this.metrics.totalRequests === 0) return 100;
    return ((this.metrics.totalRequests - this.metrics.failedRequests) / this.metrics.totalRequests * 100).toFixed(2);
  }

  // Calculate threat level
  calculateThreatLevel() {
    const suspiciousRate = this.metrics.suspiciousActivities / Math.max(this.metrics.totalRequests, 1) * 100;
    
    if (suspiciousRate > 5) return 'HIGH';
    if (suspiciousRate > 2) return 'MEDIUM';
    if (suspiciousRate > 0.5) return 'LOW';
    return 'MINIMAL';
  }

  // Get error type from status code
  getErrorType(statusCode) {
    if (statusCode >= 500) return 'SERVER_ERROR';
    if (statusCode >= 400) return 'CLIENT_ERROR';
    if (statusCode >= 300) return 'REDIRECT';
    return 'SUCCESS';
  }

  // Get severity level for activity type
  getSeverityLevel(activityType) {
    const highSeverity = ['SQL_INJECTION', 'XSS_ATTEMPT', 'CSRF_ATTACK', 'BRUTE_FORCE'];
    const mediumSeverity = ['SUSPICIOUS_USER_AGENT', 'RAPID_REQUESTS', 'UNUSUAL_PATTERN'];
    
    if (highSeverity.includes(activityType)) return 'HIGH';
    if (mediumSeverity.includes(activityType)) return 'MEDIUM';
    return 'LOW';
  }

  // Generate security report
  generateSecurityReport(period = 'daily') {
    const report = {
      period,
      generatedAt: new Date().toISOString(),
      metrics: this.getSecurityMetrics(),
      recommendations: this.generateRecommendations()
    };
    
    // Save report to file
    const reportFile = path.join(metricsDir, `security-report-${period}-${Date.now()}.json`);
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
    
    return report;
  }

  // Generate security recommendations
  generateRecommendations() {
    const recommendations = [];
    
    if (this.metrics.suspiciousActivities > 10) {
      recommendations.push('High suspicious activity detected. Consider implementing additional rate limiting.');
    }
    
    if (this.metrics.failedRequests / this.metrics.totalRequests > 0.1) {
      recommendations.push('High error rate detected. Review error logs and system health.');
    }
    
    if (this.metrics.blockedIPs.size > 5) {
      recommendations.push('Multiple IP blocks detected. Consider implementing IP whitelisting for trusted sources.');
    }
    
    return recommendations;
  }
}

// Create singleton instance
const securityMetrics = new SecurityMetrics();

module.exports = securityMetrics;
