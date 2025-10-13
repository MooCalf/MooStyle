const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
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
    required: true,
    ref: 'User'
  },
  items: [cartItemSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  totalItems: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Update lastUpdated when items change
cartSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
  next();
});

// Static method to get cart by user
cartSchema.statics.findByUser = function(userId) {
  return this.findOne({ user: userId, isActive: true });
};

// Instance method to add item to cart
cartSchema.methods.addItem = function(productId, quantity = 1) {
  const existingItem = this.items.find(item => 
    item.productId.toString() === productId.toString()
  );
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({ productId, quantity });
  }
  
  return this.save();
};

// Instance method to remove item from cart
cartSchema.methods.removeItem = function(productId) {
  this.items = this.items.filter(item => 
    item.productId.toString() !== productId.toString()
  );
  return this.save();
};

// Instance method to update item quantity
cartSchema.methods.updateItemQuantity = function(productId, quantity) {
  const item = this.items.find(item => 
    item.productId.toString() === productId.toString()
  );
  
  if (item) {
    if (quantity <= 0) {
      return this.removeItem(productId);
    } else {
      item.quantity = quantity;
    }
  }
  
  return this.save();
};

// Instance method to clear cart
cartSchema.methods.clearCart = function() {
  this.items = [];
  return this.save();
};

// Instance method to deactivate cart
cartSchema.methods.deactivate = function() {
  this.isActive = false;
  return this.save();
};

module.exports = mongoose.model('Cart', cartSchema);
