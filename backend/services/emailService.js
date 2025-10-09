const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Send account expiry notification
const sendExpiryNotification = async (user) => {
  try {
    const daysUntilExpiry = Math.ceil((user.dataRetention.accountExpiresAt - new Date()) / (1000 * 60 * 60 * 24));
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'hello@moocalf.com',
      to: user.email,
      subject: 'Your MooStyle Account Will Expire Soon',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d9488;">MooStyle Account Expiry Notice</h2>
          
          <p>Dear ${user.firstName},</p>
          
          <p>We hope you've been enjoying your experience with MooStyle! We wanted to let you know that your account will expire in <strong>${daysUntilExpiry} days</strong>.</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Why is this happening?</h3>
            <p>Due to data storage limitations and our commitment to privacy, we automatically remove inactive accounts after 4 weeks to ensure optimal performance and data security.</p>
          </div>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #166534; margin-top: 0;">How to keep your account active:</h3>
            <p>Simply <strong>log in to your account</strong> within the next ${daysUntilExpiry} days, and your account will be automatically renewed for another 4 weeks!</p>
            <p>No action needed - just visit our website and log in as usual.</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login" 
               style="background-color: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Log In Now
            </a>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #92400e; margin-top: 0;">Important Information:</h4>
            <ul style="color: #92400e;">
              <li>Your account data will be permanently deleted after expiry</li>
              <li>This includes your profile, preferences, and any saved information</li>
              <li>You can always create a new account if needed</li>
              <li>This policy helps us maintain fast performance and data security</li>
            </ul>
          </div>
          
          <p>If you have any questions, please don't hesitate to contact our support team.</p>
          
          <p>Best regards,<br>The MooStyle Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Expiry notification sent to ${user.email}`);
    
    // Mark notification as sent
    user['dataRetention.emailNotificationSent'] = true;
    await user.save();
    
    return true;
  } catch (error) {
    console.error('Error sending expiry notification:', error);
    return false;
  }
};

// Send account deleted notification
const sendDeletionNotification = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'hello@moocalf.com',
      to: user.email,
      subject: 'Your MooStyle Account Has Been Removed',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">MooStyle Account Removal Notice</h2>
          
          <p>Dear ${user.firstName},</p>
          
          <p>We wanted to inform you that your MooStyle account has been automatically removed due to inactivity.</p>
          
          <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #dc2626; margin-top: 0;">What happened?</h3>
            <p>Your account expired after 4 weeks of inactivity, and all associated data has been permanently deleted from our systems.</p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Want to continue using MooStyle?</h3>
            <p>No problem! You can create a new account anytime by visiting our website and registering again.</p>
            <p>All your previous data has been securely removed, so you'll start fresh.</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/register" 
               style="background-color: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Create New Account
            </a>
          </div>
          
          <p>Thank you for being part of the MooStyle community!</p>
          
          <p>Best regards,<br>The MooStyle Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Deletion notification sent to ${user.email}`);
    return true;
  } catch (error) {
    console.error('Error sending deletion notification:', error);
    return false;
  }
};

// Check and send notifications for users expiring soon
const checkAndSendNotifications = async () => {
  try {
    const fiveDaysFromNow = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    
    const usersExpiringSoon = await User.find({
      role: 'customer',
      'dataRetention.accountExpiresAt': { 
        $gte: new Date(),
        $lte: fiveDaysFromNow
      },
      'dataRetention.emailNotificationSent': false,
      'dataRetention.isPermanent': false
    });

    console.log(`Found ${usersExpiringSoon.length} users expiring soon`);

    for (const user of usersExpiringSoon) {
      await sendExpiryNotification(user);
      // Add a small delay between emails to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return usersExpiringSoon.length;
  } catch (error) {
    console.error('Error checking notifications:', error);
    return 0;
  }
};

// Clean up expired users
const cleanupExpiredUsers = async () => {
  try {
    const expiredUsers = await User.find({
      role: 'customer',
      'dataRetention.accountExpiresAt': { $lt: new Date() },
      'dataRetention.isPermanent': false
    });

    console.log(`Found ${expiredUsers.length} expired users to clean up`);

    for (const user of expiredUsers) {
      // Send deletion notification before removing
      await sendDeletionNotification(user);
      
      // Add a small delay between emails
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Delete expired users
    const result = await User.deleteMany({
      role: 'customer',
      'dataRetention.accountExpiresAt': { $lt: new Date() },
      'dataRetention.isPermanent': false
    });

    console.log(`Cleaned up ${result.deletedCount} expired users`);
    return result.deletedCount;
  } catch (error) {
    console.error('Error cleaning up expired users:', error);
    return 0;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (user, resetToken) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
    
    // For development/testing, log the email instead of sending it
    if (false && (process.env.NODE_ENV === 'development' || !process.env.EMAIL_USER || process.env.EMAIL_USER === 'your-email@gmail.com')) {
      console.log('\n📧 PASSWORD RESET EMAIL (Development Mode):');
      console.log('==========================================');
      console.log(`To: ${user.email}`);
      console.log(`Subject: Reset Your MooStyle Password`);
      console.log(`Reset URL: ${resetUrl}`);
      console.log(`Token: ${resetToken}`);
      console.log('==========================================\n');
      return true;
    }
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'hello@moocalf.com', // Custom sender address
      to: user.email,
      subject: '🔐 Reset Your MooStyle Password - Secure Account Recovery',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset - MooStyle</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header with Logo -->
            <div style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 30px 20px; text-align: center;">
              <div style="background-color: rgba(255, 255, 255, 0.1); border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 36px; color: white;">🌸</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">MooStyle</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 5px 0 0; font-size: 16px;">Asian Fashion & Beauty</p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              
              <!-- Security Icon -->
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="background-color: #fef3c7; border-radius: 50%; width: 60px; height: 60px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 24px;">🔐</span>
                </div>
              </div>
              
              <h2 style="color: #1f2937; text-align: center; margin: 0 0 20px; font-size: 24px; font-weight: 600;">Password Reset Request</h2>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Hello <strong style="color: #0d9488;">${user.username}</strong>,</p>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">We received a request to reset your password for your MooStyle account. This is a secure process that will help you regain access to your account and continue enjoying our Asian fashion and beauty collection.</p>
              
              <!-- Reset Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="${resetUrl}" 
                   style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; display: inline-block; font-size: 18px; font-weight: 600; box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3); transition: all 0.3s ease;">
                  🔑 Reset My Password
                </a>
              </div>
              
              <!-- Security Information -->
              <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 30px 0; border-radius: 8px;">
                <h3 style="color: #166534; margin: 0 0 15px; font-size: 18px; display: flex; align-items: center;">
                  <span style="margin-right: 8px;">⏰</span> Important Security Information
                </h3>
                <ul style="color: #166534; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li><strong>Expires in 15 minutes</strong> - For your security, this link will automatically expire</li>
                  <li><strong>One-time use only</strong> - The link can only be used once for security purposes</li>
                  <li><strong>Secure connection</strong> - All password reset operations use encrypted connections</li>
                  <li><strong>Account protection</strong> - Your account remains secure throughout this process</li>
                </ul>
              </div>
              
              <!-- What to Expect -->
              <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0; border-radius: 8px;">
                <h3 style="color: #1e40af; margin: 0 0 15px; font-size: 18px; display: flex; align-items: center;">
                  <span style="margin-right: 8px;">📋</span> What Happens Next?
                </h3>
                <ol style="color: #1e40af; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>Click the "Reset My Password" button above</li>
                  <li>You'll be taken to our secure password reset page</li>
                  <li>Create a new, strong password for your account</li>
                  <li>Log in with your new password and continue shopping</li>
                </ol>
              </div>
              
              <!-- Password Requirements -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0; border-radius: 8px;">
                <h3 style="color: #92400e; margin: 0 0 15px; font-size: 18px; display: flex; align-items: center;">
                  <span style="margin-right: 8px;">🛡️</span> Password Requirements
                </h3>
                <p style="color: #92400e; margin: 0 0 10px; font-weight: 600;">Your new password must include:</p>
                <ul style="color: #92400e; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>At least 8 characters long</li>
                  <li>One uppercase letter (A-Z)</li>
                  <li>One lowercase letter (a-z)</li>
                  <li>One number (0-9)</li>
                  <li>One special character (@$!%*?&)</li>
                </ul>
              </div>
              
              <!-- Didn't Request This? -->
              <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin: 30px 0; border-radius: 8px;">
                <h3 style="color: #dc2626; margin: 0 0 15px; font-size: 18px; display: flex; align-items: center;">
                  <span style="margin-right: 8px;">⚠️</span> Didn't Request This Reset?
                </h3>
                <p style="color: #dc2626; margin: 0; line-height: 1.6;">If you didn't request a password reset, please:</p>
                <ul style="color: #dc2626; margin: 10px 0 0; padding-left: 20px; line-height: 1.6;">
                  <li>Ignore this email - your account remains secure</li>
                  <li>Consider changing your password if you're concerned about security</li>
                  <li>Contact our support team if you notice any suspicious activity</li>
                </ul>
              </div>
              
              <!-- Support Information -->
              <div style="text-align: center; margin: 40px 0 20px;">
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px;">Need help? Our support team is here for you!</p>
                <a href="mailto:support@moocalf.com" style="color: #0d9488; text-decoration: none; font-weight: 600;">📧 support@moocalf.com</a>
              </div>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 30px 0 0; text-align: center;">
                Best regards,<br>
                <strong style="color: #0d9488;">The MooStyle Team</strong><br>
                <span style="color: #9ca3af; font-size: 14px;">Bringing you the finest Asian fashion and beauty</span>
              </p>
              
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <div style="margin-bottom: 20px;">
                <span style="font-size: 24px; margin: 0 10px;">🌸</span>
                <span style="font-size: 24px; margin: 0 10px;">💄</span>
                <span style="font-size: 24px; margin: 0 10px;">👗</span>
                <span style="font-size: 24px; margin: 0 10px;">✨</span>
              </div>
              <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px; line-height: 1.5;">
                This is an automated security message from MooStyle.<br>
                Please do not reply to this email address.
              </p>
              <p style="color: #9ca3af; font-size: 11px; margin: 0;">
                © 2024 MooStyle. All rights reserved. | 
                <a href="#" style="color: #9ca3af; text-decoration: none;">Privacy Policy</a> | 
                <a href="#" style="color: #9ca3af; text-decoration: none;">Terms of Service</a>
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${user.email}`);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

module.exports = {
  sendExpiryNotification,
  sendDeletionNotification,
  checkAndSendNotifications,
  cleanupExpiredUsers,
  sendPasswordResetEmail
};
