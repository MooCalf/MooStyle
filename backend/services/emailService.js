const nodemailer = require('nodemailer');
const User = require('../models/User');

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your preferred email service
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Send account expiry notification
const sendExpiryNotification = async (user) => {
  try {
    const daysUntilExpiry = Math.ceil((user.dataRetention.accountExpiresAt - new Date()) / (1000 * 60 * 60 * 24));
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@moostyle.com',
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
      from: process.env.EMAIL_USER || 'noreply@moostyle.com',
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

module.exports = {
  sendExpiryNotification,
  sendDeletionNotification,
  checkAndSendNotifications,
  cleanupExpiredUsers
};
