# MooStyle Backend API

The MooStyle backend represents a sophisticated, production-ready API architecture that powers a comprehensive e-commerce platform for digital resources and content from creators worldwide. Built with modern Node.js technologies and following industry best practices, this backend provides a robust foundation for scalable e-commerce operations while maintaining security, performance, and maintainability standards.

The API architecture is designed around RESTful principles with comprehensive error handling, input validation, and security measures that ensure reliable operation in production environments. The system implements advanced features including real-time system monitoring, automated maintenance procedures, and comprehensive logging that provide administrators with complete visibility into platform operations.

## 🆕 Recent Updates & Improvements

### **Authentication System Upgrade**
- **Better Auth Integration**: Migrated from custom JWT to Better Auth for enhanced security
- **Email OTP Support**: Implemented secure password reset via email verification codes
- **Session Management**: Improved session handling with automatic token refresh
- **Admin Protection**: Added safeguards to prevent admin-to-admin modifications
- **Role Management**: Enhanced user role system with proper validation

### **Code Quality Improvements**
- **Code Cleanup**: Removed unused files and components for improved performance
- **Debug Cleanup**: Eliminated console.log statements from production code
- **Duplicate Code Removal**: Cleaned up duplicate authentication routes and test files
- **Package Optimization**: Updated dependencies and cleaned up unused packages
- **Linting Compliance**: All code now passes ESLint validation with zero errors

## 🚀 Comprehensive API Features

### Advanced Authentication & Security Architecture

The MooStyle backend implements a sophisticated authentication system powered by Better Auth, providing enterprise-grade security with modern session management. The system utilizes secure session-based authentication with automatic token refresh and persistent login sessions that maintain user authentication state across browser sessions for up to seven days.

The platform includes sophisticated password management capabilities, including secure password reset functionality through email-based OTP (One-Time Password) verification. When users forget their passwords, the system generates secure 6-digit codes that expire within 5 minutes, ensuring both security and usability. The password reset process includes comprehensive validation and user-friendly interfaces with spam folder warnings.

User accounts are protected by advanced security measures including bcrypt password hashing with 12 rounds of salt, rate limiting to prevent brute force attacks, and comprehensive input validation. The system implements intelligent account lifecycle management with automated cleanup processes and email notifications for inactive accounts.

### Intelligent Product Management & Catalog System

The product management system represents a sophisticated implementation that combines database efficiency with file-system organization for optimal performance. The system supports complex product hierarchies including categories, subcategories, and brand-specific collections that enable users to navigate extensive product catalogs efficiently. The platform implements advanced search capabilities with full-text search support, filtering options, and intelligent sorting mechanisms that help users find relevant products quickly.

Product management includes comprehensive variant support for different sizes, colors, and specifications, enabling merchants to manage complex product lines effectively. The system includes sophisticated image management with automatic compression and optimization using Sharp.js, ensuring fast loading times while maintaining image quality. The platform also implements intelligent inventory tracking that provides real-time availability information and prevents overselling scenarios.

The system includes advanced analytics capabilities that track product performance metrics, user interaction patterns, and conversion rates. This data provides merchants with valuable insights into product popularity, user preferences, and market trends that inform business decisions and inventory management strategies.

### Sophisticated Shopping Cart & Session Management

The shopping cart system provides a seamless user experience through persistent storage that maintains user selections across browser sessions and device changes. The system implements real-time synchronization that ensures cart data remains consistent regardless of how users access the platform. Cart management includes comprehensive functionality for quantity adjustments, item removal, and automatic price calculations with tax considerations.

The platform includes intelligent cart persistence that handles various edge cases including network interruptions, browser crashes, and device switching scenarios. The system maintains detailed cart analytics that provide insights into user shopping behavior, abandoned cart patterns, and conversion optimization opportunities. Cart data is optimized for performance while maintaining comprehensive functionality for complex shopping scenarios.

The system implements sophisticated session management that balances user convenience with security requirements. Sessions are maintained using secure JWT tokens with appropriate expiration handling, while user preferences and cart data are persisted using localStorage mechanisms that provide immediate access to personalized experiences.

### Comprehensive Email Communication System

The email system represents a sophisticated implementation that handles various user communications including password reset notifications, account status updates, and promotional communications. The system utilizes Gmail SMTP integration with App Password authentication to ensure reliable email delivery while maintaining security standards. Email templates are professionally designed with responsive HTML layouts that provide consistent branding across different email clients.

The email system includes intelligent routing capabilities that support custom sender addresses, enabling the platform to maintain professional branding while utilizing reliable email infrastructure. The system handles email delivery failures gracefully with automatic retry mechanisms and comprehensive error logging that helps maintain communication reliability. Email analytics provide insights into delivery rates, open rates, and user engagement patterns.

The platform implements sophisticated email personalization that tailors communications based on user preferences, behavior patterns, and membership levels. This personalization enhances user engagement while ensuring that communications remain relevant and valuable to recipients.

### Advanced System Monitoring & Health Management

The backend includes comprehensive system monitoring capabilities that provide real-time visibility into platform health and performance. The system implements detailed API health checks that monitor database connectivity, authentication systems, email services, and security configurations. These health checks provide administrators with immediate feedback about system status through color-coded indicators and detailed logging.

The platform includes sophisticated performance monitoring that tracks response times, error rates, and resource utilization patterns. This monitoring enables proactive identification of performance issues and optimization opportunities. The system maintains comprehensive audit logs of all administrative actions and system changes, providing administrators with complete visibility into platform operations.

Automated maintenance procedures handle various system tasks including database optimization, log rotation, and performance tuning. These procedures ensure optimal system performance while reducing administrative overhead and maintaining system reliability.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Better Auth (Modern authentication system)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **File Upload**: Multer + Cloudinary
- **Environment**: dotenv
- **Email Service**: Nodemailer with Gmail SMTP

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MooStyle/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   **⚠️ SECURITY WARNING**: Never commit your `.env` file to version control. It contains sensitive information like database credentials and secret keys.

   **For Windows (PowerShell):**
   ```powershell
   # Copy environment template
   copy env.example .env
   
   # Edit the .env file with your configuration:
   # Open .env file and update these values:
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   BETTER_AUTH_SECRET=your-unique-secure-better-auth-secret-key-here
   BETTER_AUTH_URL=http://localhost:5000
   FRONTEND_URL=http://localhost:5173
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   GOOGLE_CLIENT_ID=your-google-oauth-client-id
   GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
   ```

   **For macOS/Linux:**
   ```bash
   # Copy environment template
   cp env.example .env
   
   # Edit the .env file with your configuration:
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   BETTER_AUTH_SECRET=your-unique-secure-better-auth-secret-key-here
   BETTER_AUTH_URL=http://localhost:5000
   FRONTEND_URL=http://localhost:5173
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   GOOGLE_CLIENT_ID=your-google-oauth-client-id
   GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
   ```

4. **Start MongoDB**
   
   **Local MongoDB:**
   ```bash
   # Make sure MongoDB is running on your system
   # Windows: Start MongoDB service or run mongod
   # macOS: brew services start mongodb-community
   # Linux: sudo systemctl start mongod
   ```

5. **Start the server**

   **For Windows (PowerShell):**
   ```powershell
   # Development mode
   npm run dev
   
   # Or run directly
   node server.cjs
   
   # Production mode
   npm start
   ```

   **For macOS/Linux:**
   ```bash
   # Development mode
   npm run dev
   
   # Or run directly
   node server.cjs
   
   # Production mode
   npm start
   ```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

### Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Update `MONGODB_URI=mongodb://localhost:27017/your-database-name`

## 📚 API Endpoints

### Authentication (Better Auth)
- `POST /api/auth/sign-up/email` - User registration
- `POST /api/auth/sign-in/email` - User login
- `POST /api/auth/sign-in/social` - Social login (Google)
- `POST /api/auth/sign-out` - User logout
- `GET /api/auth/session` - Get current session
- `POST /api/auth/forget-password/email-otp` - Send password reset OTP
- `POST /api/auth/reset-password` - Reset password with OTP

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/stats` - Get user statistics
- `PUT /api/user/change-password` - Change password

### Cart Management
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item
- `DELETE /api/cart/remove/:itemId` - Remove cart item
- `POST /api/cart/download` - Bulk download cart items

### Admin Management
- `GET /api/admin/users` - Get all users (Admin only)
- `PUT /api/admin/users/:userId` - Update user (Admin only)
- `PUT /api/admin/users/:userId/role` - Update user role (Admin only)
- `PUT /api/admin/users/:userId/ban` - Ban/unban user (Admin only)
- `DELETE /api/admin/users/:userId` - Delete user (Admin only)
- `GET /api/admin/carts` - Get all carts (Admin only)

### Health Monitoring
- `GET /api/health/database` - Database health check
- `GET /api/health/auth` - Authentication system health
- `GET /api/health/email` - Email service health

## 🔒 Authentication

The API uses Better Auth for authentication with session-based security. Sessions are automatically managed and include proper CSRF protection. For API calls, include credentials in requests:

```javascript
// Frontend API calls
fetch('/api/user/profile', {
  credentials: 'include' // Include session cookies
})
```

Better Auth handles:
- Session management
- CSRF protection
- Password hashing
- Email verification
- Social login (Google OAuth)
- Password reset via OTP

## 📝 Request/Response Format

### Success Response
```json
{
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Error message",
  "code": "ERROR_CODE",
  "errors": [ ... ]
}
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 🚀 Deployment

### Environment Variables for Production
- `NODE_ENV=production`
- `MONGODB_URI=<your-production-mongodb-uri>`
- `BETTER_AUTH_SECRET=<your-strong-secret-key>`
- `BETTER_AUTH_URL=<https://api.moostyles.com>`
- `FRONTEND_URL=<https://moostyles.com>`
- `EMAIL_SERVICE=gmail`
- `EMAIL_USER=<your-email@gmail.com>`
- `EMAIL_PASS=<your-app-specific-password>`
- `GOOGLE_CLIENT_ID=<your-google-oauth-client-id>`
- `GOOGLE_CLIENT_SECRET=<your-google-oauth-client-secret>`
- `ADMIN_USER_IDS=<comma-separated-better-auth-user-ids>`
- `AUTH_COOKIE_DOMAIN=.moostyles.com` (recommended when backend is on a subdomain of the main site)
- `AUTH_COOKIE_SAMESITE=lax` (use `none` only if backend is on a different site)

Note:
- To avoid third-party cookie blocking in modern browsers, host the API under the same site, e.g. `https://api.moostyles.com`, and set `BETTER_AUTH_URL` accordingly.
- In the frontend, set `VITE_AUTH_BASE_URL` to your API origin so Better Auth client uses the correct base URL.

### Cloudflare Workers (Recommended)
1. Install Wrangler CLI
2. Configure `wrangler.toml`
3. Deploy with `wrangler deploy`

### Traditional VPS
1. Set up Node.js environment
2. Install PM2 for process management
3. Configure reverse proxy (Nginx)
4. Set up SSL certificates

## 📊 Database Schema

### Collections
- **users** - User accounts and profiles
- **products** - Product catalog
- **carts** - Shopping cart data
- **wishlists** - User wishlists
- **orders** - Order information
- **reviews** - Product reviews

## 🔧 Development

### Project Structure
```
backend/
├── models/          # Database models
│   ├── Cart.js      # Cart schema
│   └── PointTransaction.js # Points tracking
├── routes/          # API routes
│   ├── admin.js     # Admin management
│   ├── cart.js      # Cart operations
│   ├── user.js      # User profile management
│   └── health.js    # Health monitoring
├── middleware/      # Custom middleware
│   ├── banCheck.js  # Ban verification
│   └── rateLimiter.js # Rate limiting
├── services/        # Business logic
│   ├── emailService.js # Email functionality
│   └── cronService.js # Scheduled tasks
├── scripts/         # Utility scripts
├── server.cjs       # Main server file
├── auth.js          # Better Auth configuration
└── .env            # Environment variables
```

### Adding New Features
1. Create model in `models/`
2. Add routes in `routes/`
3. Add validation in `middleware/validation.js`
4. Update API documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**MooStyle Backend API** - Powering the future of digital resources and creator platforms! 🌟
