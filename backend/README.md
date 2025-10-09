# MooStyle Backend API

The MooStyle backend represents a sophisticated, production-ready API architecture that powers a comprehensive e-commerce platform specializing in Asian fashion and beauty products. Built with modern Node.js technologies and following industry best practices, this backend provides a robust foundation for scalable e-commerce operations while maintaining security, performance, and maintainability standards.

The API architecture is designed around RESTful principles with comprehensive error handling, input validation, and security measures that ensure reliable operation in production environments. The system implements advanced features including real-time system monitoring, automated maintenance procedures, and comprehensive logging that provide administrators with complete visibility into platform operations.

## 🚀 Comprehensive API Features

### Advanced Authentication & Security Architecture

The MooStyle backend implements a sophisticated authentication system that combines JWT token-based authentication with comprehensive security measures to ensure both user convenience and platform security. The system utilizes industry-standard bcrypt password hashing with 12 rounds of salt, ensuring that user credentials remain protected even in the event of database compromise. The platform includes advanced rate limiting mechanisms that prevent brute force attacks while maintaining legitimate user access.

The authentication system features a comprehensive password reset mechanism that generates cryptographically secure tokens with 15-minute expiration windows. This system includes professional email notifications with responsive HTML templates that maintain brand consistency while providing clear user guidance. The platform implements comprehensive input validation using express-validator middleware that sanitizes and validates all user inputs, preventing injection attacks and ensuring data integrity.

User management includes sophisticated account lifecycle management with automated cleanup procedures for inactive accounts. The system maintains detailed audit logs of all authentication events, providing administrators with complete visibility into user activity patterns and security events. The platform also implements role-based access control that ensures appropriate permissions for different user types while maintaining security boundaries.

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
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **File Upload**: Multer + Cloudinary
- **Environment**: dotenv

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
   JWT_SECRET=your-unique-secure-jwt-secret-key-here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

   **For macOS/Linux:**
   ```bash
   # Copy environment template
   cp env.example .env
   
   # Edit the .env file with your configuration:
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your-unique-secure-jwt-secret-key-here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
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

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/preferences` - Update preferences
- `POST /api/users/addresses` - Add address
- `PUT /api/users/addresses/:id` - Update address
- `DELETE /api/users/addresses/:id` - Delete address
- `PUT /api/users/password` - Change password
- `POST /api/users/avatar` - Upload avatar
- `DELETE /api/users/account` - Delete account

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/slug/:slug` - Get product by slug
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search` - Search products
- `GET /api/products/related/:id` - Get related products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/bestsellers` - Get bestseller products
- `GET /api/products/new` - Get new products

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item
- `DELETE /api/cart/remove/:itemId` - Remove cart item
- `DELETE /api/cart/clear` - Clear cart
- `GET /api/cart/count` - Get cart count

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist/add` - Add to wishlist
- `DELETE /api/wishlist/remove/:productId` - Remove from wishlist
- `DELETE /api/wishlist/clear` - Clear wishlist
- `GET /api/wishlist/check/:productId` - Check if in wishlist
- `GET /api/wishlist/count` - Get wishlist count

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:orderId` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:orderId/cancel` - Cancel order
- `PUT /api/orders/:orderId/tracking` - Add tracking (Admin)
- `GET /api/orders/stats/overview` - Get order stats (Admin)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:reviewId` - Update review
- `DELETE /api/reviews/:reviewId` - Delete review
- `POST /api/reviews/:reviewId/helpful` - Mark helpful
- `POST /api/reviews/:reviewId/not-helpful` - Mark not helpful
- `GET /api/reviews/user` - Get user's reviews
- `GET /api/reviews/stats/:productId` - Get review stats

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

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
- `JWT_SECRET=<your-strong-secret-key>`
- `FRONTEND_URL=<your-production-frontend-url>`

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
├── routes/          # API routes
├── middleware/      # Custom middleware
├── utils/           # Utility functions
├── server.js        # Main server file
├── package.json     # Dependencies
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

**MooStyle Backend API** - Powering the future of Asian fashion and beauty e-commerce! 🌸
