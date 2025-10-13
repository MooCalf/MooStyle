const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  if (!process.env.EMAIL_SERVICE || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email configuration missing. Email functionality will be disabled.');
    return null;
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    // Add additional options for better delivery
    tls: {
      rejectUnauthorized: false
    },
    debug: true, // Enable debug logging
    logger: true // Enable logging
  });
};

/**
 * Send email using nodemailer
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content
 * @returns {Promise<boolean>} - Success status
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.log(`[EMAIL DISABLED] Would send to ${to}: ${subject}`);
      return true; // Return true for development when email is disabled
    }

    const mailOptions = {
      from: `"MooStyle" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
      // Add headers to prevent spam filtering
      headers: {
        'X-Mailer': 'MooStyle',
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'Normal',
        'X-Report-Abuse': 'Please report abuse to support@moostyle.com',
        'List-Unsubscribe': '<mailto:unsubscribe@moostyle.com>',
        'Return-Path': process.env.EMAIL_USER
      },
      // Add message ID for better tracking
      messageId: `<${Date.now()}.${Math.random().toString(36).substr(2, 9)}@moostyle.com>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

/**
 * Send password reset email
 * @param {string} email - User's email address
 * @param {string} resetUrl - Password reset URL
 * @param {string} username - User's username
 * @returns {Promise<boolean>} - Success status
 */
const sendPasswordResetEmail = async (email, resetUrl, username = 'User') => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">MooStyle</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Password Reset Code</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2 style="color: #333; margin-top: 0;">Hello ${username}!</h2>
        
        <p style="color: #666; line-height: 1.6; font-size: 16px;">
          We received a request to reset your password for your MooStyle account. 
          If you made this request, use the code below to reset your password:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <div style="background: #fff; border: 2px solid #667eea; border-radius: 8px; padding: 20px; display: inline-block;">
            <p style="color: #333; font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">Your Reset Code:</p>
            <p style="color: #667eea; font-size: 32px; font-weight: bold; margin: 0; letter-spacing: 4px; font-family: monospace;">${resetUrl}</p>
          </div>
        </div>
        
        <p style="color: #666; line-height: 1.6; font-size: 14px;">
          Copy and paste this code into the password reset form to complete the process.
        </p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            <strong>Important:</strong> This code will expire in 1 hour for security reasons.
          </p>
          <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
            If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
          </p>
        </div>
      </div>
      
      <div style="background: #333; padding: 20px; text-align: center;">
        <p style="color: #999; margin: 0; font-size: 12px;">
          © 2024 MooStyle. All rights reserved.
        </p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: email,
    subject: 'Your MooStyle Password Reset Code',
    text: `Your password reset code is: ${resetUrl}`,
    html
  });
};

/**
 * Send email verification email
 * @param {string} email - User's email address
 * @param {string} verificationUrl - Email verification URL
 * @param {string} username - User's username
 * @returns {Promise<boolean>} - Success status
 */
const sendEmailVerificationEmail = async (email, verificationUrl, username = 'User') => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">MooStyle</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Verify Your Email</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2 style="color: #333; margin-top: 0;">Hello ${username}!</h2>
        
        <p style="color: #666; line-height: 1.6; font-size: 16px;">
          Thank you for signing up with MooStyle! To complete your registration, 
          please verify your email address by clicking the button below:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; 
                    padding: 15px 30px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    font-weight: bold; 
                    font-size: 16px;
                    display: inline-block;">
            Verify My Email
          </a>
        </div>
        
        <p style="color: #666; line-height: 1.6; font-size: 14px;">
          If the button doesn't work, you can copy and paste this link into your browser:
        </p>
        <p style="color: #667eea; word-break: break-all; font-size: 14px; background: #f0f0f0; padding: 10px; border-radius: 4px;">
          ${verificationUrl}
        </p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            <strong>Important:</strong> This verification link will expire in 24 hours.
          </p>
          <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
            If you didn't create an account with MooStyle, please ignore this email.
          </p>
        </div>
      </div>
      
      <div style="background: #333; padding: 20px; text-align: center;">
        <p style="color: #999; margin: 0; font-size: 12px;">
          © 2024 MooStyle. All rights reserved.
        </p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: email,
    subject: 'Verify your email address - MooStyle',
    text: `Click the link to verify your email: ${verificationUrl}`,
    html
  });
};

/**
 * Test email configuration
 * @returns {Promise<boolean>} - Success status
 */
const testEmailConfiguration = async () => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      return false;
    }
    await transporter.verify();
    console.log('Email configuration is valid');
    return true;
  } catch (error) {
    console.error('Email configuration test failed:', error);
    return false;
  }
};

/**
 * Send ban notification email
 * @param {string} email - User's email address
 * @param {string} username - User's username
 * @param {string} banReason - Reason for the ban
 * @returns {Promise<boolean>} - Success status
 */
const sendBanNotificationEmail = async (email, username, banReason = 'No reason provided') => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">MooStyle</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Account Suspension Notice</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2 style="color: #333; margin-top: 0;">Hello ${username}!</h2>
        
        <p style="color: #666; line-height: 1.6; font-size: 16px;">
          We regret to inform you that your MooStyle account has been suspended due to a violation of our terms of service.
        </p>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #856404; margin-top: 0;">Reason for Suspension:</h3>
          <p style="color: #856404; margin: 0; font-style: italic;">"${banReason}"</p>
        </div>
        
        <p style="color: #666; line-height: 1.6; font-size: 16px;">
          Your account access has been temporarily restricted. If you believe this action was taken in error, 
          or if you would like to discuss the possibility of account reinstatement, please contact our support team.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="mailto:support@moostyle.com" 
             style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; 
                    padding: 15px 30px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    font-weight: bold; 
                    font-size: 16px;
                    display: inline-block;">
            Contact Support
          </a>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            <strong>Important:</strong> This suspension is temporary and can be reviewed upon request.
          </p>
          <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
            If you have any questions or concerns, please don't hesitate to reach out to our support team.
          </p>
        </div>
      </div>
      
      <div style="background: #333; padding: 20px; text-align: center;">
        <p style="color: #999; margin: 0; font-size: 12px;">
          © 2024 MooStyle. All rights reserved.
        </p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: email,
    subject: 'Account Suspension Notice - MooStyle',
    text: `Your MooStyle account has been suspended. Reason: ${banReason}. Please contact support for assistance.`,
    html
  });
};

/**
 * Send unban notification email
 * @param {string} email - User's email address
 * @param {string} username - User's username
 * @returns {Promise<boolean>} - Success status
 */
const sendUnbanNotificationEmail = async (email, username) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">MooStyle</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Account Reinstated</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <h2 style="color: #333; margin-top: 0;">Hello ${username}!</h2>
        
        <p style="color: #666; line-height: 1.6; font-size: 16px;">
          Great news! Your MooStyle account has been reinstated and you can now access all features again.
        </p>
        
        <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #155724; margin-top: 0;">✅ Account Status: Active</h3>
          <p style="color: #155724; margin: 0;">Your account is now fully functional and you can log in normally.</p>
        </div>
        
        <p style="color: #666; line-height: 1.6; font-size: 16px;">
          We appreciate your patience during the review process. If you have any questions or need assistance, 
          please don't hesitate to contact our support team.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login" 
             style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; 
                    padding: 15px 30px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    font-weight: bold; 
                    font-size: 16px;
                    display: inline-block;">
            Log In to Your Account
          </a>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            <strong>Welcome back!</strong> We're glad to have you back in the MooStyle community.
          </p>
        </div>
      </div>
      
      <div style="background: #333; padding: 20px; text-align: center;">
        <p style="color: #999; margin: 0; font-size: 12px;">
          © 2024 MooStyle. All rights reserved.
        </p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: email,
    subject: 'Account Reinstated - MooStyle',
    text: `Your MooStyle account has been reinstated. You can now log in normally.`,
    html
  });
};

module.exports = {
  sendEmail,
  sendPasswordResetEmail,
  sendEmailVerificationEmail,
  sendBanNotificationEmail,
  sendUnbanNotificationEmail,
  testEmailConfiguration,
  createTransporter
};