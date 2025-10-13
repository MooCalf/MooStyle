const mongoose = require('mongoose');

const pointTransactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  points: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['earn', 'spend', 'bonus', 'penalty'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  source: {
    type: String,
    enum: ['download', 'registration', 'referral', 'admin', 'purchase', 'refund'],
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
pointTransactionSchema.index({ userId: 1, createdAt: -1 });
pointTransactionSchema.index({ type: 1, createdAt: -1 });
pointTransactionSchema.index({ source: 1, createdAt: -1 });

// Virtual for formatted date
pointTransactionSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString();
});

// Static method to get user's total points
pointTransactionSchema.statics.getUserTotalPoints = async function(userId) {
  const result = await this.aggregate([
    { $match: { userId: userId } },
    {
      $group: {
        _id: null,
        totalEarned: {
          $sum: {
            $cond: [
              { $in: ['$type', ['earn', 'bonus']] },
              '$points',
              0
            ]
          }
        },
        totalSpent: {
          $sum: {
            $cond: [
              { $in: ['$type', ['spend', 'penalty']] },
              '$points',
              0
            ]
          }
        }
      }
    }
  ]);

  if (result.length === 0) {
    return { totalEarned: 0, totalSpent: 0, balance: 0 };
  }

  const { totalEarned, totalSpent } = result[0];
  const balance = totalEarned - totalSpent;

  return { totalEarned, totalSpent, balance };
};

// Static method to get user's transaction history
pointTransactionSchema.statics.getUserHistory = async function(userId, limit = 50, skip = 0) {
  return await this.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .lean();
};

// Static method to award points
pointTransactionSchema.statics.awardPoints = async function(userId, points, description, source = 'admin', metadata = {}) {
  const transaction = new this({
    userId,
    points: Math.abs(points), // Ensure positive
    type: 'earn',
    description,
    source,
    metadata
  });

  await transaction.save();
  return transaction;
};

// Static method to spend points
pointTransactionSchema.statics.spendPoints = async function(userId, points, description, source = 'purchase', metadata = {}) {
  const transaction = new this({
    userId,
    points: Math.abs(points), // Ensure positive
    type: 'spend',
    description,
    source,
    metadata
  });

  await transaction.save();
  return transaction;
};

// Static method to get system statistics
pointTransactionSchema.statics.getSystemStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalTransactions: { $sum: 1 },
        totalPointsEarned: {
          $sum: {
            $cond: [
              { $in: ['$type', ['earn', 'bonus']] },
              '$points',
              0
            ]
          }
        },
        totalPointsSpent: {
          $sum: {
            $cond: [
              { $in: ['$type', ['spend', 'penalty']] },
              '$points',
              0
            ]
          }
        },
        uniqueUsers: { $addToSet: '$userId' }
      }
    },
    {
      $project: {
        totalTransactions: 1,
        totalPointsEarned: 1,
        totalPointsSpent: 1,
        uniqueUserCount: { $size: '$uniqueUsers' },
        netPoints: { $subtract: ['$totalPointsEarned', '$totalPointsSpent'] }
      }
    }
  ]);

  return stats[0] || {
    totalTransactions: 0,
    totalPointsEarned: 0,
    totalPointsSpent: 0,
    uniqueUserCount: 0,
    netPoints: 0
  };
};

// Instance method to get formatted transaction
pointTransactionSchema.methods.getFormatted = function() {
  return {
    id: this._id,
    userId: this.userId,
    points: this.points,
    type: this.type,
    description: this.description,
    source: this.source,
    metadata: this.metadata,
    createdAt: this.createdAt,
    formattedDate: this.formattedDate,
    isEarned: ['earn', 'bonus'].includes(this.type),
    isSpent: ['spend', 'penalty'].includes(this.type)
  };
};

module.exports = mongoose.model('PointTransaction', pointTransactionSchema);
