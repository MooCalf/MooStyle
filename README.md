# MooStyle E-Commerce Platform

Welcome to MooStyle! 🌸 This comprehensive Asian fashion and beauty e-commerce platform represents a complete digital marketplace solution built with modern web technologies. Originally conceived as a portfolio showcase, MooStyle has evolved into a full-featured e-commerce platform that demonstrates professional-grade development practices, security implementations, and user experience design.

The platform combines a sophisticated React frontend with a robust Node.js backend to deliver a seamless shopping experience. Users can browse an extensive catalog of Asian fashion and beauty products, manage their accounts with advanced security features, and enjoy personalized shopping experiences through our intelligent recommendation system. The platform also includes comprehensive administrative tools for managing users, products, and system health.

## 📚 Documentation

This project includes comprehensive documentation for setup, deployment, and maintenance. All guides and documentation are organized in the **`Guides and More`** folder for easy access.

### 📁 Documentation Structure

All documentation is centralized in the **`Guides and More`** folder:

```
Guides and More/
├── README.md                           # Documentation index and overview
├── QUICK_REFERENCE.md                  # Quick access reference card
├── STARTUP_GUIDE.md                    # Complete project setup guide
├── PRODUCT_MANAGEMENT_SYSTEM.md        # File-system-based product management
├── AI_MOD_UPLOAD_README.md             # AI assistant mod upload process
├── PRODUCT_MANAGEMENT_COMPLETE.md      # Product management implementation
├── NETWORK_ERROR_TROUBLESHOOTING.md    # Network issue debugging guide
├── NETWORK_ERROR_FIXED.md              # Known network fixes
├── SECURITY_REPORT.md                  # Security analysis and recommendations
├── PASSWORD_RESET_SYSTEM.md            # Comprehensive password reset guide
└── ADMIN_DASHBOARD_GUIDE.md            # Complete admin dashboard documentation
```

### 🚀 Quick Start Documentation

- **New to the project?** → Start with `Guides and More/STARTUP_GUIDE.md`
- **Need to upload products?** → Check `Guides and More/AI_MOD_UPLOAD_README.md`
- **Having network issues?** → See `Guides and More/NETWORK_ERROR_TROUBLESHOOTING.md`
- **Want to understand the system?** → Read `Guides and More/PRODUCT_MANAGEMENT_SYSTEM.md`
- **Need admin dashboard help?** → Check `Guides and More/ADMIN_DASHBOARD_GUIDE.md`
- **Password reset issues?** → See `Guides and More/PASSWORD_RESET_SYSTEM.md`

### 📖 Additional Documentation

- **`backend/DATABASE_MIGRATION_GUIDE.md`** - Database migration procedures
- **`backend/README.md`** - Backend-specific documentation

## 🌟 Core Platform Features

### Advanced User Authentication & Security

MooStyle implements a comprehensive authentication system that prioritizes both security and user experience. The platform utilizes JWT (JSON Web Token) authentication with secure token storage and automatic session management. Users benefit from persistent login sessions that maintain their authentication state across browser sessions for up to seven days, eliminating the need for frequent re-authentication while maintaining security standards.

The platform includes sophisticated password management capabilities, including secure password reset functionality through email-based token verification. When users forget their passwords, the system generates cryptographically secure 64-character tokens that expire within 15 minutes, ensuring both security and usability. The password reset process includes comprehensive validation to ensure new passwords meet strict security requirements, including uppercase letters, lowercase letters, numbers, and special characters.

User accounts are protected by advanced security measures including bcrypt password hashing with 12 rounds of salt, rate limiting to prevent brute force attacks, and comprehensive input validation. The system also implements an intelligent account lifecycle management system that automatically handles inactive accounts through a 4-week inactivity policy, sending email notifications before account cleanup and maintaining database hygiene.

### Comprehensive Admin Dashboard & System Monitoring

The administrative interface provides complete oversight of the platform's operations through an intuitive dashboard that includes real-time system monitoring capabilities. Administrators can monitor API health across all services including database connectivity, authentication systems, email services, and security configurations. The dashboard features color-coded status indicators that provide immediate visual feedback about system health, with green indicating optimal performance, yellow signaling warnings, and red highlighting critical issues.

The admin panel includes comprehensive user management tools that allow administrators to view user statistics, manage account statuses, and monitor user activity patterns. The system provides detailed analytics including user registration trends, login patterns, and membership level distributions. Administrators can also manage shopping cart data, view system logs, and access detailed performance metrics that help maintain optimal platform performance.

### Intelligent Product Management System

MooStyle features a sophisticated product management system that combines file-system-based organization with database integration for optimal performance and scalability. Products are organized using a hierarchical structure that supports multiple categories, subcategories, and brand-specific collections. The system includes advanced search and filtering capabilities that allow users to find products based on various criteria including price ranges, brand preferences, category specifications, and availability status.

The platform implements intelligent product recommendation algorithms that analyze user behavior patterns to suggest relevant products. This personalization system considers factors such as browsing history, cart contents, purchase patterns, and user preferences to deliver tailored product suggestions that enhance the shopping experience and increase user engagement.

### Advanced Shopping Cart & User Experience

The shopping cart system provides a seamless and persistent shopping experience that maintains user selections across browser sessions and devices. Cart data is synchronized in real-time, ensuring that users never lose their selected items regardless of how they access the platform. The system includes comprehensive cart management features such as quantity adjustments, item removal, and automatic price calculations with tax considerations.

The platform delivers an exceptional user experience through responsive design that adapts perfectly to various screen sizes and devices. Users can enjoy smooth theme transitions between dark and light modes, with their preferences being saved and maintained across sessions. The interface includes beautiful animations powered by Framer Motion that provide visual feedback and enhance user interactions without compromising performance.

### Robust Email Communication System

MooStyle implements a comprehensive email communication system that handles various user interactions including password reset notifications, account status updates, and promotional communications. The system utilizes Gmail SMTP integration with App Password authentication to ensure reliable email delivery while maintaining security standards. Email templates are professionally designed with responsive HTML layouts that provide consistent branding and user experience across different email clients.

The email system includes intelligent routing capabilities that allow for custom sender addresses, enabling the platform to maintain professional branding while utilizing reliable email infrastructure. The system handles email delivery failures gracefully with automatic retry mechanisms and comprehensive error logging that helps maintain communication reliability.

### Automated Maintenance & Data Management

The platform includes sophisticated automated maintenance systems that ensure optimal performance and data integrity. Cron jobs handle various maintenance tasks including user account cleanup, database optimization, and system health monitoring. The automated cleanup system manages inactive accounts according to the 4-week inactivity policy, sending email notifications to users before account deletion and maintaining database hygiene.

Database management includes comprehensive migration capabilities that handle schema updates and data transformations seamlessly. The system maintains detailed audit logs of all administrative actions and system changes, providing administrators with complete visibility into platform operations and enabling effective troubleshooting and maintenance procedures.

## 📱 Application Structure

### Frontend Pages
- **Home**: Main landing page with featured products and categories
- **Shopping**: Product catalog with advanced search and filtering
- **Product Detail**: Individual product pages with reviews and recommendations
- **Cart**: Shopping cart with persistent storage
- **User Account**: Profile management and order history
- **Admin Dashboard**: Complete admin panel for managing the platform
- **Authentication**: Login and registration pages

### Backend API
- **Authentication Routes**: User registration, login, password management
- **Product Routes**: CRUD operations for product management
- **Cart Routes**: Shopping cart functionality
- **Admin Routes**: User management and platform administration
- **File Upload**: Image processing and optimization

## 🔐 Comprehensive Authentication & Security Architecture

### Advanced Session Management & Persistence

MooStyle implements a sophisticated authentication system that ensures seamless user experience while maintaining the highest security standards. The platform utilizes a dual-layer authentication approach that combines JWT token-based authentication with comprehensive user data management to provide persistent sessions that survive browser restarts and device changes.

When users successfully authenticate, the system generates a cryptographically secure JWT token that contains essential user information including user ID, username, email address, and role permissions. This token is stored securely in the browser's localStorage with a seven-day expiration period, ensuring that users remain authenticated across multiple sessions without compromising security. The token includes built-in security features such as signature verification and automatic expiration handling that prevent unauthorized access and token manipulation.

The platform also maintains comprehensive user profile data in localStorage, including membership levels, loyalty points, notification preferences, and account status information. This dual-storage approach ensures that users can access their personalized experience immediately upon returning to the platform, while the JWT token handles authentication verification and the user data provides personalized content and preferences.

### Password Security & Reset System

The platform implements industry-leading password security measures that protect user accounts from various attack vectors. All passwords are hashed using bcrypt with 12 rounds of salt, ensuring that even if the database is compromised, user passwords remain protected. The system enforces strict password complexity requirements including minimum length, character diversity, and special character inclusion to prevent weak password usage.

The password reset system represents a sophisticated implementation of secure account recovery that balances security with usability. When users request a password reset, the system generates a cryptographically secure 64-character token using Node.js's crypto module, ensuring that reset tokens cannot be predicted or manipulated. These tokens are stored in the database with a 15-minute expiration window, providing sufficient time for users to complete the reset process while minimizing the security window for potential attacks.

The password reset process includes comprehensive email notifications with professionally designed HTML templates that maintain brand consistency while providing clear instructions for users. The system handles various edge cases including expired tokens, invalid requests, and network failures gracefully, ensuring that users receive appropriate feedback and guidance throughout the process. All password reset attempts are logged for security monitoring and audit purposes.

### Account Lifecycle & Data Management

MooStyle implements an intelligent account lifecycle management system that balances user convenience with system performance and security. The platform maintains detailed user activity tracking that monitors login patterns, account usage, and engagement metrics to provide personalized experiences while maintaining system efficiency.

The system includes an automated account cleanup process that manages inactive accounts according to a comprehensive 4-week inactivity policy. This process includes multiple notification stages that inform users of impending account deletion, providing opportunities for account reactivation and data preservation. The cleanup system is designed to be respectful of user data while maintaining database hygiene and system performance.

User accounts include sophisticated membership level management that automatically adjusts based on user activity and engagement. The platform tracks user points and achievements to determine appropriate membership levels, providing users with clear progression paths and benefits. This gamification system encourages user engagement while providing administrators with valuable insights into user behavior and platform usage patterns.

### Database Structure & Account Management

#### **User Account Lifecycle**

##### **Account Creation**
- New users start with **Bronze** membership level
- Default **0 points**
- Email notifications **disabled** by default
- Account marked as **active**

##### **4-Week Inactivity Policy**
- **Inactive accounts** expire after **4 weeks** of no login activity
- **Automated cleanup** runs weekly (Sundays at 2 AM)
- **Email notifications** sent before account deletion
- **Permanent deletion** of all user data after expiration

##### **Account Cleanup Process**
```javascript
// Automated cron job schedule:
- Daily notifications: 9:00 AM (users expiring soon)
- Weekly cleanup: Sunday 2:00 AM (delete expired accounts)
- 6-hourly checks: Every 6 hours (immediate expirations)
```

#### **Database Collections**

##### **Users Collection**
```javascript
{
  username: String,           // Unique username (3-30 chars)
  email: String,             // Unique email address
  password: String,           // Hashed with bcrypt (12 rounds)
  role: ['user', 'admin'],    // User role
  isActive: Boolean,          // Account status
  lastLogin: Date,            // Last login timestamp
  points: Number,             // Loyalty points (0+)
  membershipLevel: String,    // Bronze/Silver/Gold/Diamond
  notificationSettings: {     // Email preferences
    emailNotifications: Boolean
  },
  createdAt: Date,           // Account creation date
  updatedAt: Date            // Last modification date
}
```

##### **Cart Collection**
```javascript
{
  user: ObjectId,            // Reference to User
  items: [{                  // Cart items array
    product: ObjectId,       // Product reference
    productData: {           // Snapshot of product data
      id: String,
      name: String,
      author: String,
      description: String,
      image: String,
      category: String,
      tags: [String],
      downloadUrl: String,
      fileSize: Number
    },
    quantity: Number,        // Item quantity (min: 1)
    addedAt: Date           // When item was added
  }],
  lastUpdated: Date,         // Last cart modification
  isActive: Boolean          // Cart status
}
```

#### **Membership System**
- **Bronze**: 0-29 points
- **Silver**: 30-79 points  
- **Gold**: 80-199 points
- **Diamond**: 200+ points

#### **Security Features**
- **Password Requirements**: 8+ characters, uppercase, lowercase, number, special character
- **Account Lockout**: 5 failed attempts = 2-hour lockout
- **Rate Limiting**: 100 requests per 15 minutes
- **JWT Security**: Signed tokens with secret key
- **Data Encryption**: AES-256-GCM for sensitive data

### Storage Expiration Timeline

| Storage Type | Duration | What Happens |
|-------------|----------|--------------|
| **JWT Token** | 7 days | Token expires, user must re-login |
| **User Data** | Until logout | Persists until manual logout or token expiry |
| **Cart Data** | Until logout | Synced with database, persists across sessions |
| **Account** | 4 weeks inactive | Account automatically deleted |

### Manual Session Management

#### **Logout Process**
```javascript
// What happens when you logout:
localStorage.removeItem('token');  // Remove JWT token
localStorage.removeItem('user');   // Remove user data
// Redirect to home page
```

#### **Session Validation**
- **Client-side**: Checks localStorage for token existence
- **Server-side**: Validates JWT signature and expiration
- **API calls**: Include `Authorization: Bearer <token>` header

### Troubleshooting Authentication

#### **Common Issues**
1. **"Still logged in after closing browser"**: Normal behavior - localStorage persists
2. **"Logged out unexpectedly"**: JWT token expired (7 days) or account deleted (4 weeks inactive)
3. **"Can't access admin features"**: User role is 'user', not 'admin'

#### **Solutions**
- **Force logout**: Clear browser localStorage manually
- **Check account status**: Verify account hasn't expired
- **Re-login**: Generate new JWT token

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons
- **Radix UI Toast** - Accessible notification system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Sharp.js** - Image processing and optimization
- **Node-cron** - Task scheduling
- **Nodemailer** - Email services

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MooStyle
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Setup**

   **✅ SECURITY**: The `.env` files are properly excluded from version control via `.gitignore` to protect sensitive credentials.

   **For Windows (PowerShell):**
   ```powershell
   # Navigate to backend directory
   cd backend
   
   # Copy environment template
   copy env.example .env
   
   # Update backend/.env with your configuration:
   # Edit the .env file and set these values:
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your-unique-secure-jwt-secret-key-here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

   **For macOS/Linux:**
   ```bash
   # Copy environment template
   cp backend/env.example backend/.env
   
   # Update backend/.env with your configuration:
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your-unique-secure-jwt-secret-key-here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start MongoDB**
   
   **Local MongoDB:**
   ```bash
   # Make sure MongoDB is running on your system
   # Windows: Start MongoDB service or run mongod
   # macOS: brew services start mongodb-community
   # Linux: sudo systemctl start mongod
   ```

6. **Start the development servers**

   **Important**: You need to open **TWO separate terminal windows/tabs** - one for the backend and one for the frontend.
   
   **For Windows (PowerShell):**
   
   **Terminal 1 - Backend:**
   ```powershell
   # Navigate to backend directory
   cd backend
   
   # Start backend server
   npm run dev
   # OR alternatively:
   # node server.cjs
   ```
   
   **Terminal 2 - Frontend:**
   ```powershell
   # Make sure you're in the root MooStyle directory
   # (NOT in the backend folder)
   
   # Start frontend development server
   npm run dev
   ```
   
   **For macOS/Linux:**
   
   **Terminal 1 - Backend:**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Start backend server
   npm run dev
   # OR alternatively:
   # node server.cjs
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   # Make sure you're in the root MooStyle directory
   # (NOT in the backend folder)
   
   # Start frontend development server
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🔒 Security Best Practices

### Environment Variables
- **Never commit `.env` files** to version control
- **Use strong, unique JWT secrets** (minimum 32 characters)
- **Use different secrets** for development and production
- **Rotate secrets regularly** in production
- **Use environment-specific database names**

### Database Security
- **Use strong passwords** for database access
- **Enable authentication** on MongoDB instances
- **Use connection strings** with proper credentials
- **Limit database access** to necessary IPs only

### API Security
- **Validate all inputs** on the server side
- **Use HTTPS** in production
- **Implement rate limiting** to prevent abuse
- **Keep dependencies updated** for security patches

### Admin Account Security
- **⚠️ NEVER use default admin credentials in production**
- **⚠️ Change admin passwords immediately after setup**
- **⚠️ Use strong, unique passwords for admin accounts**
- **⚠️ Consider using environment variables for admin credentials**
- **⚠️ Remove admin creation scripts from production deployments**

## 🔧 Troubleshooting Setup Issues

### Common Issues and Solutions

**1. MongoDB Connection Error**
```bash
# Check if MongoDB is running
# Windows: Check Services or run mongod
# macOS: brew services list | grep mongodb
# Linux: sudo systemctl status mongod
```

**2. Port Already in Use**
```bash
# Kill process using port 5000
# Windows: netstat -ano | findstr :5000
# macOS/Linux: lsof -ti:5000 | xargs kill -9
```

**3. Environment File Issues**
```bash
# Make sure .env file exists in backend directory
# Check file permissions and content
```

**4. Node Modules Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Production Build
   ```bash
# Build frontend for production
   npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
MooStyle/
├── src/                          # Frontend React application
│   ├── Components/               # Reusable React components
│   │   ├── ui/                  # Basic UI components
│   │   ├── NavigationPrimary.jsx # Main navigation
│   │   ├── NavigationSecondary.jsx # Secondary navigation
│   │   ├── ProductCard.jsx      # Product display component
│   │   ├── ProductManagement.jsx # Admin product management
│   │   └── ...                  # Other components
│   ├── Pages/                   # Page components
│   │   ├── Home.jsx            # Landing page
│   │   ├── Shopping.jsx        # Product catalog
│   │   ├── ProductDetail.jsx   # Individual product page
│   │   ├── Cart.jsx            # Shopping cart
│   │   ├── Login.jsx           # User login
│   │   ├── Register.jsx        # User registration
│   │   ├── MyAccount.jsx       # User profile
│   │   ├── AdminDashboard.jsx  # Admin panel
│   │   └── ...                 # Other pages
│   ├── contexts/               # React contexts
│   │   └── CartContext.jsx     # Shopping cart state
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   └── styles/                 # CSS styles
├── backend/                     # Backend Node.js application
│   ├── models/                 # Database models
│   │   ├── User.js             # User schema
│   │   └── Cart.js             # Cart schema
│   ├── routes/                 # API routes
│   │   ├── auth.js             # Authentication routes
│   │   ├── cart.js             # Cart routes
│   │   └── admin.js            # Admin routes
│   ├── middleware/             # Custom middleware
│   ├── services/               # Business logic
│   │   ├── emailService.js     # Email functionality
│   │   └── cronService.js      # Scheduled tasks
│   ├── config/                 # Configuration files
│   │   └── security.js         # Security settings
│   ├── scripts/                # Utility scripts
│   └── server.cjs              # Main server file
├── public/                      # Static assets
│   └── projects/               # Product images
├── dist/                       # Production build
└── package.json                # Dependencies and scripts
```

## 🔧 Development Features

### Frontend Development
- **Hot Module Replacement**: Instant updates during development
- **Component-based Architecture**: Reusable and maintainable code
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: React Context for global state
- **Form Validation**: Client-side validation with error handling
- **Loading States**: Smooth loading indicators and skeleton screens

### Backend Development
- **RESTful API**: Well-structured API endpoints
- **Middleware Pipeline**: Request processing pipeline
- **Database Migrations**: Safe schema updates
- **Error Handling**: Comprehensive error management
- **Logging**: Detailed logging for debugging
- **Testing**: API endpoint testing capabilities

### Security Features
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevent abuse and DDoS
- **Input Validation**: Server-side validation
- **CORS Configuration**: Cross-origin request handling
- **Environment Variables**: Secure configuration management

## 📊 Database Management

### MongoDB Collections
- **users**: User accounts and profiles
- **carts**: Shopping cart data
- **products**: Product catalog (when implemented)
- **orders**: Order history (when implemented)

### Data Retention Policy
- **Active Users**: Data retained indefinitely
- **Inactive Users**: Accounts deleted after 4 weeks
- **Automated Cleanup**: Weekly cron job removes expired accounts
- **Email Notifications**: Users notified before deletion

### Migration System
- **Automatic Updates**: New fields added with defaults
- **Backward Compatibility**: Existing data preserved
- **Migration Scripts**: Safe database updates
- **Rollback Support**: Ability to revert changes

## 🚀 Deployment

### Environment Variables
```env
# Production Environment
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/your-database-name
JWT_SECRET=your-production-secret-key-change-this
JWT_EXPIRE=7d
FRONTEND_URL=https://yourdomain.com
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-app-specific-password
```

### Deployment Options
- **Vercel**: Frontend deployment
- **Railway**: Backend deployment
- **MongoDB Atlas**: Database hosting
- **Cloudflare**: CDN and security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation sections above
- Review the authentication guide for login issues

---

**MooStyle E-Commerce Platform** - Built with ❤️ using modern web technologies! 🌸

