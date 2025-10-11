const mongoose = require('mongoose');

const pointTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  transactionType: {
    type: String,
    enum: ['download', 'admin_adjustment', 'bonus', 'penalty'],
    required: true
  },
  pointsAwarded: {
    type: Number,
    required: true
  },
  pointsBefore: {
    type: Number,
    required: true
  },
  pointsAfter: {
    type: Number,
    required: true
  },
  membershipLevelBefore: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Diamond'],
    required: true
  },
  membershipLevelAfter: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Diamond'],
    required: true
  },
  modCount: {
    type: Number,
    default: 0
  },
  downloadData: {
    modCount: Number,
    totalSize: Number,
    items: [{
      name: String,
      author: String,
      downloadUrl: String
    }]
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    default: ''
  },
  adminNote: {
    type: String,
    default: ''
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Indexes for better query performance
pointTransactionSchema.index({ userId: 1, createdAt: -1 });
pointTransactionSchema.index({ transactionType: 1 });
pointTransactionSchema.index({ createdAt: -1 });
pointTransactionSchema.index({ ipAddress: 1 });

// Static method to log a point transaction
pointTransactionSchema.statics.logTransaction = async function(transactionData) {
  try {
    const transaction = new this({
      userId: transactionData.userId,
      username: transactionData.username,
      transactionType: transactionData.transactionType,
      pointsAwarded: transactionData.pointsAwarded,
      pointsBefore: transactionData.pointsBefore,
      pointsAfter: transactionData.pointsAfter,
      membershipLevelBefore: transactionData.membershipLevelBefore,
      membershipLevelAfter: transactionData.membershipLevelAfter,
      modCount: transactionData.modCount || 0,
      downloadData: transactionData.downloadData || {},
      ipAddress: transactionData.ipAddress,
      userAgent: transactionData.userAgent || '',
      adminNote: transactionData.adminNote || '',
      metadata: transactionData.metadata || {}
    });

    await transaction.save();
    console.log(`📊 AUDIT: Point transaction logged for user ${transactionData.username}: ${transactionData.pointsAwarded} points`);
    return transaction;
  } catch (error) {
    console.error('Failed to log point transaction:', error);
    throw error;
  }
};

// Instance method to get transaction summary
pointTransactionSchema.methods.getSummary = function() {
  return {
    id: this._id,
    username: this.username,
    type: this.transactionType,
    pointsAwarded: this.pointsAwarded,
    pointsBefore: this.pointsBefore,
    pointsAfter: this.pointsAfter,
    membershipLevelChange: `${this.membershipLevelBefore} → ${this.membershipLevelAfter}`,
    modCount: this.modCount,
    timestamp: this.createdAt,
    ipAddress: this.ipAddress
  };
};

module.exports = mongoose.model('PointTransaction', pointTransactionSchema);
