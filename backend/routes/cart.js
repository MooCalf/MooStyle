const express = require('express');
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');
const User = require('../models/User');
const fs = require('fs').promises;
const path = require('path');

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

// Path validation function to prevent directory traversal
const validateFolderPath = (folderPath) => {
  // Remove any path traversal attempts
  const cleanPath = folderPath.replace(/\.\./g, '').replace(/\/\//g, '/');
  
  // Only allow alphanumeric, hyphens, underscores, and forward slashes
  if (!/^[a-zA-Z0-9\/\-_]+$/.test(cleanPath)) {
    throw new Error('Invalid folder path');
  }
  
  // Ensure path starts with Products/
  if (!cleanPath.startsWith('Products/')) {
    throw new Error('Path must start with Products/');
  }
  
  return cleanPath;
};

// Get product folder contents for bulk download by folder path
router.get('/product-files-by-path/:folderPath', authenticateToken, async (req, res) => {
  try {
    const folderPath = validateFolderPath(req.params.folderPath);
    const productPath = path.join(process.cwd(), 'public', 'projects', folderPath);
    
    const files = [];
    
    try {
      // Read the main product folder
      const items = await fs.readdir(productPath, { withFileTypes: true });
      
      for (const item of items) {
        const itemPath = path.join(productPath, item.name);
        
        if (item.isFile()) {
          // It's a file
          const stats = await fs.stat(itemPath);
          files.push({
            name: item.name,
            type: 'file',
            size: stats.size,
            path: `/projects/${folderPath}/${item.name}`,
            relativePath: item.name
          });
        } else if (item.isDirectory()) {
          // It's a directory - read its contents
          try {
            const subItems = await fs.readdir(itemPath, { withFileTypes: true });
            for (const subItem of subItems) {
              if (subItem.isFile()) {
                const subItemPath = path.join(itemPath, subItem.name);
                const stats = await fs.stat(subItemPath);
                files.push({
                  name: subItem.name,
                  type: 'file',
                  size: stats.size,
                  path: `/projects/${folderPath}/${item.name}/${subItem.name}`,
                  relativePath: `${item.name}/${subItem.name}`,
                  folder: item.name
                });
              }
            }
          } catch (subError) {
            console.warn(`Could not read subdirectory ${item.name}:`, subError);
          }
        }
      }
    } catch (error) {
      console.warn(`Could not read product folder ${folderPath}:`, error);
    }
    
    res.json({
      success: true,
      folderPath,
      files,
      count: files.length
    });
    
  } catch (error) {
    console.error('Get product files by path error:', error);
    
    // Handle validation errors differently
    if (error.message.includes('Invalid folder path') || error.message.includes('Path must start with Products/')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid folder path',
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to get product files',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get product folder contents for bulk download
router.get('/product-files/:brand/:product', authenticateToken, async (req, res) => {
  try {
    const { brand, product } = req.params;
    const productPath = path.join(process.cwd(), 'public', 'projects', 'Products', brand, product);
    
    const files = [];
    
    try {
      // Read the main product folder
      const items = await fs.readdir(productPath, { withFileTypes: true });
      
      for (const item of items) {
        const itemPath = path.join(productPath, item.name);
        
        if (item.isFile()) {
          // It's a file
          const stats = await fs.stat(itemPath);
          files.push({
            name: item.name,
            type: 'file',
            size: stats.size,
            path: `/projects/Products/${brand}/${product}/${item.name}`,
            relativePath: item.name
          });
        } else if (item.isDirectory()) {
          // It's a directory - read its contents
          try {
            const subItems = await fs.readdir(itemPath, { withFileTypes: true });
            for (const subItem of subItems) {
              if (subItem.isFile()) {
                const subItemPath = path.join(itemPath, subItem.name);
                const stats = await fs.stat(subItemPath);
                files.push({
                  name: subItem.name,
                  type: 'file',
                  size: stats.size,
                  path: `/projects/Products/${brand}/${product}/${item.name}/${subItem.name}`,
                  relativePath: `${item.name}/${subItem.name}`,
                  folder: item.name
                });
              }
            }
          } catch (subError) {
            console.warn(`Could not read subdirectory ${item.name}:`, subError);
          }
        }
      }
    } catch (error) {
      console.warn(`Could not read product folder ${brand}/${product}:`, error);
    }
    
    res.json({
      success: true,
      brand,
      product,
      files,
      count: files.length
    });
    
  } catch (error) {
    console.error('Get product files error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get product files',
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
