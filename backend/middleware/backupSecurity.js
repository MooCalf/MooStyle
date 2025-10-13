const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Ensure backup directory exists
const backupDir = path.join(__dirname, '../backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Backup security system
class BackupSecurity {
  constructor() {
    this.backupKey = process.env.BACKUP_ENCRYPTION_KEY || this.generateBackupKey();
    this.backupHistory = [];
  }

  // Generate encryption key for backups
  generateBackupKey() {
    return crypto.randomBytes(32).toString('hex');
  }

  // Encrypt sensitive data
  encryptData(data, key = this.backupKey) {
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      algorithm
    };
  }

  // Decrypt sensitive data
  decryptData(encryptedData, key = this.backupKey) {
    const algorithm = encryptedData.algorithm;
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(encryptedData.iv, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  }

  // Create secure backup of user data
  async createUserDataBackup() {
    try {
      const { MongoClient } = require('mongodb');
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      
      const db = client.db();
      const users = await db.collection('user').find({}).toArray();
      
      // Sanitize sensitive data
      const sanitizedUsers = users.map(user => ({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        points: user.points,
        membershipLevel: user.membershipLevel,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin,
        // Remove sensitive fields
        password: '[ENCRYPTED]',
        emailVerificationToken: '[REMOVED]',
        passwordResetToken: '[REMOVED]'
      }));
      
      const backupData = {
        timestamp: new Date().toISOString(),
        type: 'USER_DATA',
        version: '1.0',
        recordCount: sanitizedUsers.length,
        data: sanitizedUsers
      };
      
      // Encrypt the backup
      const encryptedBackup = this.encryptData(backupData);
      
      // Save encrypted backup
      const backupFile = path.join(backupDir, `user-backup-${Date.now()}.encrypted`);
      fs.writeFileSync(backupFile, JSON.stringify(encryptedBackup, null, 2));
      
      // Create backup metadata
      const metadata = {
        filename: path.basename(backupFile),
        timestamp: new Date().toISOString(),
        type: 'USER_DATA',
        recordCount: sanitizedUsers.length,
        size: fs.statSync(backupFile).size,
        checksum: this.calculateChecksum(backupFile)
      };
      
      this.backupHistory.push(metadata);
      this.saveBackupHistory();
      
      await client.close();
      
      return {
        success: true,
        backupFile: path.basename(backupFile),
        recordCount: sanitizedUsers.length,
        metadata
      };
      
    } catch (error) {
      console.error('Error creating user data backup:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create secure backup of system configuration
  async createSystemConfigBackup() {
    try {
      const configData = {
        timestamp: new Date().toISOString(),
        type: 'SYSTEM_CONFIG',
        version: '1.0',
        environment: process.env.NODE_ENV,
        database: {
          uri: '[REDACTED]', // Don't store actual URI
          connected: true
        },
        security: {
          rateLimiting: true,
          csp: true,
          helmet: true,
          auditLogging: true
        },
        features: {
          betterAuth: true,
          emailOTP: true,
          adminDashboard: true,
          securityMetrics: true
        }
      };
      
      // Encrypt the config backup
      const encryptedBackup = this.encryptData(configData);
      
      // Save encrypted backup
      const backupFile = path.join(backupDir, `config-backup-${Date.now()}.encrypted`);
      fs.writeFileSync(backupFile, JSON.stringify(encryptedBackup, null, 2));
      
      // Create backup metadata
      const metadata = {
        filename: path.basename(backupFile),
        timestamp: new Date().toISOString(),
        type: 'SYSTEM_CONFIG',
        size: fs.statSync(backupFile).size,
        checksum: this.calculateChecksum(backupFile)
      };
      
      this.backupHistory.push(metadata);
      this.saveBackupHistory();
      
      return {
        success: true,
        backupFile: path.basename(backupFile),
        metadata
      };
      
    } catch (error) {
      console.error('Error creating system config backup:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create backup of security logs
  async createSecurityLogsBackup() {
    try {
      const logsDir = path.join(__dirname, '../logs');
      const logFiles = fs.readdirSync(logsDir).filter(file => file.endsWith('.log'));
      
      const logsData = {
        timestamp: new Date().toISOString(),
        type: 'SECURITY_LOGS',
        version: '1.0',
        logFiles: []
      };
      
      for (const logFile of logFiles) {
        const logPath = path.join(logsDir, logFile);
        const logContent = fs.readFileSync(logPath, 'utf8');
        
        logsData.logFiles.push({
          filename: logFile,
          size: logContent.length,
          lines: logContent.split('\n').length - 1,
          content: logContent
        });
      }
      
      // Encrypt the logs backup
      const encryptedBackup = this.encryptData(logsData);
      
      // Save encrypted backup
      const backupFile = path.join(backupDir, `logs-backup-${Date.now()}.encrypted`);
      fs.writeFileSync(backupFile, JSON.stringify(encryptedBackup, null, 2));
      
      // Create backup metadata
      const metadata = {
        filename: path.basename(backupFile),
        timestamp: new Date().toISOString(),
        type: 'SECURITY_LOGS',
        logFileCount: logFiles.length,
        size: fs.statSync(backupFile).size,
        checksum: this.calculateChecksum(backupFile)
      };
      
      this.backupHistory.push(metadata);
      this.saveBackupHistory();
      
      return {
        success: true,
        backupFile: path.basename(backupFile),
        logFileCount: logFiles.length,
        metadata
      };
      
    } catch (error) {
      console.error('Error creating security logs backup:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Calculate file checksum
  calculateChecksum(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
  }

  // Verify backup integrity
  verifyBackup(backupFile) {
    try {
      const filePath = path.join(backupDir, backupFile);
      const metadata = this.backupHistory.find(backup => backup.filename === backupFile);
      
      if (!metadata) {
        return { valid: false, error: 'Backup metadata not found' };
      }
      
      const currentChecksum = this.calculateChecksum(filePath);
      const isValid = currentChecksum === metadata.checksum;
      
      return {
        valid: isValid,
        expectedChecksum: metadata.checksum,
        actualChecksum: currentChecksum,
        size: fs.statSync(filePath).size,
        expectedSize: metadata.size
      };
      
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  // Save backup history
  saveBackupHistory() {
    const historyFile = path.join(backupDir, 'backup-history.json');
    fs.writeFileSync(historyFile, JSON.stringify(this.backupHistory, null, 2));
  }

  // Load backup history
  loadBackupHistory() {
    try {
      const historyFile = path.join(backupDir, 'backup-history.json');
      if (fs.existsSync(historyFile)) {
        const historyData = fs.readFileSync(historyFile, 'utf8');
        this.backupHistory = JSON.parse(historyData);
      }
    } catch (error) {
      console.error('Error loading backup history:', error);
    }
  }

  // Get backup status
  getBackupStatus() {
    return {
      totalBackups: this.backupHistory.length,
      lastBackup: this.backupHistory[this.backupHistory.length - 1]?.timestamp || 'Never',
      backupTypes: [...new Set(this.backupHistory.map(b => b.type))],
      totalSize: this.backupHistory.reduce((sum, b) => sum + (b.size || 0), 0)
    };
  }
}

// Create singleton instance
const backupSecurity = new BackupSecurity();

module.exports = backupSecurity;
