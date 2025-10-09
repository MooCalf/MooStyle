# MooStyle E-Commerce Platform

Welcome to MooStyle! 🌸 This is a comprehensive Asian fashion and beauty e-commerce platform built with React frontend and Node.js backend. The platform features user authentication, product management, shopping cart functionality, and admin dashboard capabilities. This project evolved from a portfolio showcase into a full-featured e-commerce solution.

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
└── SECURITY_REPORT.md                  # Security analysis and recommendations
```

### 🚀 Quick Start Documentation

- **New to the project?** → Start with `Guides and More/STARTUP_GUIDE.md`
- **Need to upload products?** → Check `Guides and More/AI_MOD_UPLOAD_README.md`
- **Having network issues?** → See `Guides and More/NETWORK_ERROR_TROUBLESHOOTING.md`
- **Want to understand the system?** → Read `Guides and More/PRODUCT_MANAGEMENT_SYSTEM.md`

### 📖 Additional Documentation

- **`backend/DATABASE_MIGRATION_GUIDE.md`** - Database migration procedures
- **`backend/README.md`** - Backend-specific documentation

## 🌟 Key Features

### Frontend Features
- **Responsive Design**: Works perfectly on phones, tablets, and desktops
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **User Authentication**: Secure login/logout with persistent sessions
- **Shopping Cart**: Persistent cart with real-time updates
- **Product Management**: Advanced product catalog with search and filtering
- **Admin Dashboard**: Complete admin panel for managing users and products
- **Smooth Animations**: Beautiful transitions using Framer Motion
- **Fast Performance**: Optimized loading with lazy loading and code splitting

### Backend Features
- **JWT Authentication**: Secure token-based authentication system
- **MongoDB Database**: Scalable NoSQL database with Mongoose ODM
- **RESTful API**: Well-structured API endpoints for all operations
- **File Upload**: Image compression and optimization with Sharp.js
- **Email Services**: Automated notifications and account management
- **Cron Jobs**: Automated cleanup and maintenance tasks
- **Security**: Password hashing, rate limiting, and data validation

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

## 🔐 Authentication & Storage System Guide

### How Login Persistence Works

When you log into MooStyle, your session persists across browser sessions thanks to a sophisticated authentication system:

#### 1. **JWT Token Storage**
- **Location**: Browser's `localStorage`
- **Duration**: **7 days** from login
- **Storage Key**: `token`
- **Content**: Encrypted JWT containing user ID, username, email, and role

#### 2. **User Data Storage**
- **Location**: Browser's `localStorage`
- **Storage Key**: `user`
- **Content**: JSON string containing user profile information
- **Includes**: Username, email, role, membership level, points, notification settings

#### 3. **Session Persistence Mechanism**
```javascript
// What gets stored when you log in:
localStorage.setItem('token', data.token);        // JWT token (7-day expiry)
localStorage.setItem('user', JSON.stringify(data.user)); // User profile data
```

#### 4. **Authentication Checks**
The system checks authentication status in multiple components:
- **NavigationPrimary.jsx**: Checks for user data on page load
- **AdminDashboard.jsx**: Validates token and user role
- **MyAccount.jsx**: Verifies user data integrity
- **CartContext.jsx**: Checks token existence for API calls

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

   **⚠️ SECURITY WARNING**: Never commit your `.env` file to version control. It contains sensitive information like database credentials and secret keys.

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

