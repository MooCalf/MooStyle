const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: String, // Changed to String to handle both ObjectId and string IDs
    required: true
  },
  productData: {
    // Store product data at time of adding to cart
    id: String,
    name: String,
    author: String,
    description: String,
    image: String,
    category: String,
    tags: [String],
    downloadUrl: String,
    fileSize: Number,
    // Additional fields for regular products
    price: Number,
    brand: String,
    originalPrice: Number,
    sizes: [Object],
    colors: [Object],
    features: [String],
    detailedDescription: String
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One cart per user
  },
  items: [cartItemSchema],
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
cartSchema.index({ user: 1 });
cartSchema.index({ lastUpdated: -1 });
cartSchema.index({ 'items.product': 1 });

// Pre-save middleware to update lastUpdated
cartSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Instance method to add item to cart
cartSchema.methods.addItem = async function(productData, quantity = 1) {
  const existingItem = this.items.find(item => 
    item.productData.id === productData.id
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({
      product: productData.id, // Use the string ID directly
      productData: {
        id: productData.id,
        name: productData.name,
        author: productData.author || productData.brand || 'Unknown',
        description: productData.description,
        image: productData.image,
        category: productData.category,
        tags: productData.tags || [],
        downloadUrl: productData.downloadUrl || '',
        fileSize: productData.fileSize || 0,
        // Additional fields for regular products
        price: productData.price || 0,
        brand: productData.brand || '',
        originalPrice: productData.originalPrice || productData.price || 0,
        sizes: productData.sizes || [],
        colors: productData.colors || [],
        features: productData.features || [],
        detailedDescription: productData.detailedDescription || productData.description || ''
      },
      quantity: quantity
    });
  }

  return await this.save();
};

// Instance method to remove item from cart
cartSchema.methods.removeItem = async function(productId) {
  this.items = this.items.filter(item => item.productData.id !== productId);
  return await this.save();
};

// Instance method to update item quantity
cartSchema.methods.updateItemQuantity = async function(productId, quantity) {
  const item = this.items.find(item => item.productData.id === productId);
  
  if (item) {
    if (quantity <= 0) {
      return await this.removeItem(productId);
    } else {
      item.quantity = quantity;
      return await this.save();
    }
  }
  
  return this;
};

// Instance method to clear cart
cartSchema.methods.clearCart = async function() {
  this.items = [];
  return await this.save();
};

// Instance method to get cart count
cartSchema.methods.getCartCount = function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
};

// Instance method to get cart total size
cartSchema.methods.getCartTotalSize = function() {
  return this.items.reduce((total, item) => {
    return total + ((item.productData.fileSize || 0) * item.quantity);
  }, 0);
};

// Instance method to check if product is in cart
cartSchema.methods.isInCart = function(productId) {
  return this.items.some(item => item.productData.id === productId);
};

// Instance method to get cart item
cartSchema.methods.getCartItem = function(productId) {
  return this.items.find(item => item.productData.id === productId);
};

// Static method to get or create user cart
cartSchema.statics.getOrCreateUserCart = async function(userId) {
  let cart = await this.findOne({ user: userId, isActive: true });
  
  if (!cart) {
    cart = new this({ user: userId });
    await cart.save();
  }
  
  return cart;
};

// Static method to get user cart with populated data
cartSchema.statics.getUserCart = async function(userId) {
  const cart = await this.findOne({ user: userId, isActive: true });
  return cart;
};

module.exports = mongoose.model('Cart', cartSchema);
