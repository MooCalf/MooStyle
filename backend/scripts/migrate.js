const mongoose = require('mongoose');
const User = require('../models/User');
const Cart = require('../models/Cart');
const PointTransaction = require('../models/PointTransaction');

// Database Migration Script for MooStyle
// This script handles updates to existing user accounts when schema changes

const runMigrations = async () => {
  try {
    console.log('🔄 Starting database migrations...');
    
    // Migration 1: Ensure all users have points, membershipLevel, and lastDownloaded fields
    console.log('📊 Migrating user accounts...');
    
    const usersWithoutFields = await User.find({
      $or: [
        { points: { $exists: false } },
        { membershipLevel: { $exists: false } },
        { notificationSettings: { $exists: false } },
        { lastDownloaded: { $exists: false } }
      ]
    });
    
    console.log(`Found ${usersWithoutFields.length} users needing migration`);
    
    for (const user of usersWithoutFields) {
      const updates = {};
      
      // Add points if missing
      if (user.points === undefined) {
        updates.points = 0;
        console.log(`Adding points field to user: ${user.username}`);
      }
      
      // Add membershipLevel if missing
      if (user.membershipLevel === undefined) {
        updates.membershipLevel = 'Bronze';
        console.log(`Adding membershipLevel field to user: ${user.username}`);
      }
      
      // Add notificationSettings if missing
      if (user.notificationSettings === undefined) {
        updates.notificationSettings = {
          emailNotifications: false
        };
        console.log(`Adding notificationSettings field to user: ${user.username}`);
      }
      
      // Add lastDownloaded if missing
      if (user.lastDownloaded === undefined) {
        updates.lastDownloaded = null;
        console.log(`Adding lastDownloaded field to user: ${user.username}`);
      }
      
      // Update user with missing fields
      if (Object.keys(updates).length > 0) {
        await User.findByIdAndUpdate(user._id, updates);
        console.log(`✅ Updated user: ${user.username}`);
      }
    }
    
    // Migration 2: Update membership levels based on existing points
    console.log('🏆 Updating membership levels based on points...');
    
    const allUsers = await User.find({});
    for (const user of allUsers) {
      let newMembershipLevel = 'Bronze';
      
      if (user.points >= 200) {
        newMembershipLevel = 'Diamond';
      } else if (user.points >= 80) {
        newMembershipLevel = 'Gold';
      } else if (user.points >= 30) {
        newMembershipLevel = 'Silver';
      }
      
      if (user.membershipLevel !== newMembershipLevel) {
        await User.findByIdAndUpdate(user._id, { membershipLevel: newMembershipLevel });
        console.log(`✅ Updated ${user.username} membership level: ${user.membershipLevel} → ${newMembershipLevel}`);
      }
    }
    
    // Migration 3: Create cart collections for existing users (optional)
    console.log('🛒 Creating cart collections for existing users...');
    
    for (const user of allUsers) {
      const existingCart = await Cart.findOne({ user: user._id });
      if (!existingCart) {
        const newCart = new Cart({ user: user._id });
        await newCart.save();
        console.log(`✅ Created cart for user: ${user.username}`);
      }
    }
    
    // Migration 4: Create PointTransaction collection and indexes
    console.log('📊 Setting up PointTransaction collection...');
    
    try {
      // Create the collection by inserting a dummy document and then removing it
      const dummyTransaction = new PointTransaction({
        userId: allUsers[0]?._id || new mongoose.Types.ObjectId(),
        username: 'migration_test',
        transactionType: 'admin_adjustment',
        pointsAwarded: 0,
        pointsBefore: 0,
        pointsAfter: 0,
        membershipLevelBefore: 'Bronze',
        membershipLevelAfter: 'Bronze',
        modCount: 0,
        downloadData: {},
        ipAddress: '127.0.0.1',
        userAgent: 'Migration Script',
        adminNote: 'Migration test - will be deleted',
        metadata: {}
      });
      
      await dummyTransaction.save();
      await PointTransaction.deleteOne({ username: 'migration_test' });
      
      console.log('✅ PointTransaction collection created successfully');
    } catch (error) {
      console.log('ℹ️ PointTransaction collection already exists or error:', error.message);
    }
    
    console.log('✅ All migrations completed successfully!');
    
    // Show final user data
    console.log('\n📋 Final user data:');
    const finalUsers = await User.find({});
    for (const user of finalUsers) {
      console.log(`Username: ${user.username}`);
      console.log(`Email: ${user.email}`);
      console.log(`Points: ${user.points}`);
      console.log(`Membership Level: ${user.membershipLevel}`);
      console.log(`Last Downloaded: ${user.lastDownloaded || 'Never'}`);
      console.log(`Notification Settings: ${JSON.stringify(user.notificationSettings)}`);
      console.log('---');
    }
    
    // Show PointTransaction collection status
    console.log('\n📊 PointTransaction collection status:');
    const transactionCount = await PointTransaction.countDocuments();
    console.log(`Total transactions logged: ${transactionCount}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run migrations if called directly
if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/moostyle')
    .then(() => {
      console.log('🔗 Connected to database');
      return runMigrations();
    })
    .catch(error => {
      console.error('❌ Database connection failed:', error);
      process.exit(1);
    });
}

module.exports = { runMigrations };
