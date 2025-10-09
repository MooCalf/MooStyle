# MooStyle Backend API

A comprehensive e-commerce backend API built with Node.js, Express, and MongoDB for the MooStyle Asian fashion and beauty platform.

## 🚀 Features

- **User Authentication & Management**
  - JWT-based authentication
  - User registration and login
  - Password reset functionality
  - User profile management
  - Address management

- **Product Management**
  - Product CRUD operations
  - Advanced search and filtering
  - Category and subcategory support
  - Product variants (sizes, colors)
  - Image management

- **Shopping Cart**
  - Persistent cart storage
  - Add/remove/update items
  - Size and color selection
  - Cart persistence across sessions

- **Wishlist**
  - Save favorite products
  - Wishlist management
  - Quick add/remove functionality

- **Order Management**
  - Order creation and tracking
  - Order status updates
  - Shipping information
  - Order history

- **Review System**
  - Product reviews and ratings
  - Verified purchase reviews
  - Helpful/not helpful voting
  - Review moderation

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
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moostyle
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
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
3. Update `MONGODB_URI=mongodb://localhost:27017/moostyle`

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
- `MONGODB_URI=<production-mongodb-uri>`
- `JWT_SECRET=<strong-secret-key>`
- `FRONTEND_URL=<production-frontend-url>`

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
