const express = require('express');
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
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

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Get user's cart
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.getUserCart(req.user._id);
    
    if (!cart) {
      return res.json({
        success: true,
        cart: {
          items: [],
          count: 0,
          totalSize: 0
        }
      });
    }

    res.json({
      success: true,
      cart: {
        items: cart.items,
        count: cart.getCartCount(),
        totalSize: cart.getCartTotalSize(),
        lastUpdated: cart.lastUpdated
      }
    });

  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Add item to cart
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { product, quantity = 1 } = req.body;

    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Product data is required'
      });
    }

    if (!product.id) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    if (!product.name) {
      return res.status(400).json({
        success: false,
        message: 'Product name is required'
      });
    }

    const cart = await Cart.getOrCreateUserCart(req.user._id);
    await cart.addItem(product, quantity);

    console.log(`Added ${product.name} to cart for user ${req.user.username}`);

    res.json({
      success: true,
      message: `Added ${product.name} to cart`,
      cart: {
        items: cart.items,
        count: cart.getCartCount(),
        totalSize: cart.getCartTotalSize()
      }
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update cart item quantity
router.put('/update/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid quantity is required'
      });
    }

    const cart = await Cart.getUserCart(req.user._id);
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    await cart.updateItemQuantity(productId, quantity);

    res.json({
      success: true,
      message: 'Cart item updated',
      cart: {
        items: cart.items,
        count: cart.getCartCount(),
        totalSize: cart.getCartTotalSize()
      }
    });

  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart item',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Remove item from cart
router.delete('/remove/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.getUserCart(req.user._id);
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    await cart.removeItem(productId);

    res.json({
      success: true,
      message: 'Item removed from cart',
      cart: {
        items: cart.items,
        count: cart.getCartCount(),
        totalSize: cart.getCartTotalSize()
      }
    });

  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Clear entire cart
router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.getUserCart(req.user._id);
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    await cart.clearCart();

    res.json({
      success: true,
      message: 'Cart cleared',
      cart: {
        items: [],
        count: 0,
        totalSize: 0
      }
    });

  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get cart count
router.get('/count', authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.getUserCart(req.user._id);
    const count = cart ? cart.getCartCount() : 0;

    res.json({
      success: true,
      count: count
    });

  } catch (error) {
    console.error('Get cart count error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get cart count',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Download cart items and award points
router.post('/download', authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.getUserCart(req.user._id);
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    const modCount = cart.getCartCount();
    
    // Award points for downloads (2 points per mod)
    const pointsToAdd = modCount * 2;
    req.user.points += pointsToAdd;
    await req.user.save();

    console.log(`Awarded ${pointsToAdd} points to user ${req.user.username} for downloading ${modCount} mods`);

    // Clear cart after successful download
    await cart.clearCart();

    res.json({
      success: true,
      message: `Download initiated for ${modCount} mods`,
      pointsAwarded: pointsToAdd,
      totalPoints: req.user.points,
      membershipLevel: req.user.membershipLevel,
      downloadData: {
        modCount: modCount,
        totalSize: cart.getCartTotalSize(),
        items: cart.items.map(item => ({
          name: item.productData.name,
          author: item.productData.author,
          downloadUrl: item.productData.downloadUrl
        }))
      }
    });

  } catch (error) {
    console.error('Download cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process download',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Check if product is in cart
router.get('/check/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.getUserCart(req.user._id);
    
    const isInCart = cart ? cart.isInCart(productId) : false;
    const cartItem = cart ? cart.getCartItem(productId) : null;

    res.json({
      success: true,
      isInCart: isInCart,
      cartItem: cartItem
    });

  } catch (error) {
    console.error('Check cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check cart item',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
