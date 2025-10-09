const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { sendPasswordResetEmail } = require('../services/emailService');
const router = express.Router();

// Test endpoint to check if auth routes are working
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Auth routes are working!' });
});

// Input validation middleware
const validateRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Register new user
router.post('/register', validateRegistration, async (req, res) => {
  try {
    console.log('Registration request received:', {
      username: req.body.username,
      email: req.body.email,
      password: '***' // Don't log actual password
    });

    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      console.log('User already exists:', existingUser.email === email ? 'email' : 'username');
      return res.status(400).json({
        success: false,
        message: existingUser.email === email 
          ? 'Email already registered' 
          : 'Username already taken'
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    console.log('User registered successfully:', user.username);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username, 
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Login user
router.post('/login', validateLogin, async (req, res) => {
  try {
    console.log('Login request received:', {
      email: req.body.email,
      password: '***'
    });

    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      console.log('Inactive user attempted login:', email);
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('Invalid password for:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    console.log('User logged in successfully:', user.username);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username, 
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Update notification settings
router.put('/notification-settings', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { emailNotifications } = req.body;

    // Update notification settings
    const notificationSettings = {
      emailNotifications: emailNotifications !== undefined ? emailNotifications : user.notificationSettings?.emailNotifications || false
    };

    user.notificationSettings = notificationSettings;
    await user.save();

    console.log('Notification settings updated for user:', user.username, notificationSettings);

    res.json({
      success: true,
      message: 'Notification settings updated successfully',
      notificationSettings: user.notificationSettings
    });

  } catch (error) {
    console.error('Notification settings update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update notification settings',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Add points to user account (for mod downloads)
router.post('/add-points', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { modCount } = req.body;
    
    if (!modCount || modCount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mod count'
      });
    }

    // Add 2 points per mod downloaded
    const pointsToAdd = modCount * 2;
    user.points += pointsToAdd;
    await user.save();

    console.log(`Added ${pointsToAdd} points to user ${user.username} for downloading ${modCount} mods`);

    res.json({
      success: true,
      message: `Added ${pointsToAdd} points for downloading ${modCount} mods`,
      points: user.points,
      membershipLevel: user.membershipLevel
    });

  } catch (error) {
    console.error('Add points error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add points',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Forgot password - send reset email
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if email exists or not for security
      return res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // Send email
    await sendPasswordResetEmail(user, resetToken);

    res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process password reset request'
    });
  }
});

// Reset password with token
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    console.log('Reset password request:', { token: token ? token.substring(0, 10) + '...' : 'none', newPassword: newPassword ? 'provided' : 'none' });

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required'
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    console.log('User found:', user ? 'YES' : 'NO');
    if (user) {
      console.log('Token expires:', new Date(user.resetPasswordExpires).toLocaleString());
      console.log('Current time:', new Date().toLocaleString());
      console.log('Token valid:', user.resetPasswordExpires > Date.now());
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password'
    });
  }
});

// Change password (for logged-in users)
router.post('/change-password', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('+password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password'
    });
  }
});

// Password reset health check
router.get('/password-reset-health', async (req, res) => {
  try {
    const startTime = Date.now();

    // Check if password reset functionality is properly configured
    const hasEmailConfig = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);
    const hasCrypto = typeof require('crypto').randomBytes === 'function';
    
    // Test token generation
    const testToken = require('crypto').randomBytes(32).toString('hex');
    const tokenValid = testToken && testToken.length === 64;

    const responseTime = Date.now() - startTime;

    if (hasEmailConfig && hasCrypto && tokenValid) {
      res.json({
        status: 'healthy',
        message: 'Password reset system is operational',
        responseTime: `${responseTime}ms`,
        stats: {
          emailConfigured: hasEmailConfig,
          cryptoAvailable: hasCrypto,
          tokenGeneration: tokenValid,
          tokenLength: testToken.length
        },
        warnings: []
      });
    } else {
      res.status(503).json({
        status: 'warning',
        message: 'Password reset system has configuration issues',
        responseTime: `${responseTime}ms`,
        stats: {
          emailConfigured: hasEmailConfig,
          cryptoAvailable: hasCrypto,
          tokenGeneration: tokenValid
        },
        warnings: [
          !hasEmailConfig ? 'Email configuration missing' : null,
          !hasCrypto ? 'Crypto module unavailable' : null,
          !tokenValid ? 'Token generation failed' : null
        ].filter(Boolean)
      });
    }
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Password reset health check failed',
      error: error.message
    });
  }
});

// Security health check
router.get('/security-health', async (req, res) => {
  try {
    const startTime = Date.now();

    // Check security configurations
    const hasJwtSecret = !!process.env.JWT_SECRET;
    const jwtSecretLength = process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0;
    const hasBcryptRounds = !!process.env.BCRYPT_ROUNDS;
    const bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    
    // Check password reset security
    const resetTokenExpiry = 15 * 60 * 1000; // 15 minutes in ms
    const hasRateLimit = !!process.env.RATE_LIMIT_MAX_REQUESTS;

    const responseTime = Date.now() - startTime;

    const warnings = [];
    if (jwtSecretLength < 32) warnings.push('JWT secret should be at least 32 characters');
    if (bcryptRounds < 12) warnings.push('BCrypt rounds should be at least 12 for security');
    if (!hasRateLimit) warnings.push('Rate limiting not configured');

    if (hasJwtSecret && hasBcryptRounds) {
      res.json({
        status: warnings.length > 0 ? 'warning' : 'healthy',
        message: warnings.length > 0 ? 'Security configured with warnings' : 'Security system is properly configured',
        responseTime: `${responseTime}ms`,
        stats: {
          jwtConfigured: hasJwtSecret,
          jwtSecretLength: jwtSecretLength,
          bcryptRounds: bcryptRounds,
          resetTokenExpiry: `${resetTokenExpiry / 1000 / 60} minutes`,
          rateLimitConfigured: hasRateLimit
        },
        warnings: warnings
      });
    } else {
      res.status(503).json({
        status: 'error',
        message: 'Critical security configuration missing',
        responseTime: `${responseTime}ms`,
        stats: {
          jwtConfigured: hasJwtSecret,
          bcryptConfigured: hasBcryptRounds
        },
        warnings: [
          !hasJwtSecret ? 'JWT_SECRET not configured' : null,
          !hasBcryptRounds ? 'BCRYPT_ROUNDS not configured' : null
        ].filter(Boolean)
      });
    }
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Security health check failed',
      error: error.message
    });
  }
});

module.exports = router;