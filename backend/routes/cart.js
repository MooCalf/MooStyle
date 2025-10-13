const express = require('express');
const Cart = require('../models/Cart');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();

// MongoDB connection for ban checking
let db = null;
const initializeDB = async () => {
  if (!db) {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db();
  }
  return db;
};

// Middleware to check if user is banned
const checkUserBanStatus = async (req, res, next) => {
  try {
    const { userId } = req.query || req.body;
    
    if (!userId) {
      return next(); // Let the route handle missing userId
    }

    // Ensure db is connected
    if (!db) {
      await initializeDB();
    }

    // Look up user in database
    let query = {};
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      query = { _id: new ObjectId(userId) };
    } else {
      query = { id: userId };
    }

    const user = await db.collection('user').findOne(query);
    
    if (user && !user.isActive) {
      // User is banned
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. You cannot access cart features.',
        banReason: user.banReason || 'No reason provided',
        bannedAt: user.bannedAt
      });
    }

    next();
  } catch (error) {
    console.error('Error checking ban status:', error);
    next(); // Continue on error to avoid breaking the app
  }
};

// Get user's cart
router.get('/', checkUserBanStatus, async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Convert userId to ObjectId if it's a string
    const mongoose = require('mongoose');
    const userObjectId = mongoose.Types.ObjectId.isValid(userId) ? userId : new mongoose.Types.ObjectId(userId);

    let cart = await Cart.findOne({ user: userObjectId, isActive: true });
    
    if (!cart) {
      // Create new cart if none exists
      cart = new Cart({
        user: userObjectId,
        items: [],
        lastUpdated: new Date(),
        isActive: true
      });
      await cart.save();
    }

    res.json({
      success: true,
      cart: cart
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart'
    });
  }
});

// Add item to cart
router.post('/add', checkUserBanStatus, async (req, res) => {
  try {
    const { userId, item } = req.body;
    
    if (!userId || !item) {
      return res.status(400).json({
        success: false,
        message: 'User ID and item are required'
      });
    }

    // Convert userId to ObjectId if it's a string
    const mongoose = require('mongoose');
    const userObjectId = mongoose.Types.ObjectId.isValid(userId) ? userId : new mongoose.Types.ObjectId(userId);

    let cart = await Cart.findOne({ user: userObjectId, isActive: true });
    
    if (!cart) {
      cart = new Cart({
        user: userObjectId,
        items: [],
        lastUpdated: new Date(),
        isActive: true
      });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(cartItem => 
      cartItem.productId.toString() === item.productId
    );

    if (existingItemIndex >= 0) {
      // Update quantity
      cart.items[existingItemIndex].quantity += item.quantity || 1;
    } else {
      // Add new item
      cart.items.push({
        ...item,
        quantity: item.quantity || 1,
        addedAt: new Date()
      });
    }

    cart.lastUpdated = new Date();
    await cart.save();

    res.json({
      success: true,
      message: 'Item added to cart',
      cart: cart
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart'
    });
  }
});

// Remove item from cart
router.delete('/remove', checkUserBanStatus, async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'User ID and product ID are required'
      });
    }

    const cart = await Cart.findOne({ user: userId, isActive: true });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.lastUpdated = new Date();
    await cart.save();

    res.json({
      success: true,
      message: 'Item removed from cart',
      cart: cart
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart'
    });
  }
});

// Update item quantity
router.put('/update', checkUserBanStatus, async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    if (!userId || !productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'User ID, product ID, and quantity are required'
      });
    }

    const cart = await Cart.findOne({ user: userId, isActive: true });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    cart.lastUpdated = new Date();
    await cart.save();

    res.json({
      success: true,
      message: 'Cart updated',
      cart: cart
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart'
    });
  }
});

// Clear cart
router.delete('/clear', checkUserBanStatus, async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const cart = await Cart.findOne({ user: userId, isActive: true });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = [];
    cart.lastUpdated = new Date();
    await cart.save();

    res.json({
      success: true,
      message: 'Cart cleared',
      cart: cart
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart'
    });
  }
});

// Sync cart with database
router.post('/sync', checkUserBanStatus, async (req, res) => {
  try {
    const { userId, items } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Convert userId to ObjectId if it's a string
    const mongoose = require('mongoose');
    const userObjectId = mongoose.Types.ObjectId.isValid(userId) ? userId : new mongoose.Types.ObjectId(userId);

    let cart = await Cart.findOne({ user: userObjectId, isActive: true });
    
    if (!cart) {
      cart = new Cart({ 
        user: userObjectId, 
        items: items || [],
        isActive: true,
        lastUpdated: new Date()
      });
    } else {
      cart.items = items || [];
      cart.lastUpdated = new Date();
    }
    
    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    console.error('Error syncing cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Download cart items and award points
router.post('/download', checkUserBanStatus, async (req, res) => {
  try {
    // Ensure db is connected
    if (!db) {
      await initializeDB();
    }

    // Get user from Better Auth session via cookies
    const { auth } = require('../auth');
    const session = await auth.api.getSession({
      headers: req.headers
    });

    if (!session || !session.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in to download mods.'
      });
    }

    const user = session.user;
    console.log('Download request from user:', user.id, user.email);

    // Award points for download (1 point per item)
    const pointsToAward = 1; // Simple: 1 point per download
    const newPoints = (user.points || 0) + pointsToAward;
    
    // Determine membership level based on points
    let membershipLevel = 'Bronze';
    if (newPoints >= 1000) membershipLevel = 'Diamond';
    else if (newPoints >= 500) membershipLevel = 'Gold';
    else if (newPoints >= 100) membershipLevel = 'Silver';

    // Update user points in database
    const updateResult = await db.collection('user').updateOne(
      { id: user.id },
      { 
        $set: { 
          points: newPoints,
          membershipLevel: membershipLevel,
          lastDownloadAt: new Date()
        }
      }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found in database'
      });
    }

    res.json({
      success: true,
      message: 'Download authorized',
      pointsAwarded: pointsToAward,
      totalPoints: newPoints,
      membershipLevel: membershipLevel
    });

  } catch (error) {
    console.error('Error processing download:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process download'
    });
  }
});

module.exports = router;
