const mongoose = require('mongoose');
const User = require('../models/User');
const Cart = require('../models/Cart');

// Database Migration Script for MooStyle
// This script handles updates to existing user accounts when schema changes

const runMigrations = async () => {
  try {
    console.log('🔄 Starting database migrations...');
    
    // Migration 1: Ensure all users have points and membershipLevel fields
    console.log('📊 Migrating user accounts...');
    
    const usersWithoutPoints = await User.find({
      $or: [
        { points: { $exists: false } },
        { membershipLevel: { $exists: false } },
        { notificationSettings: { $exists: false } }
      ]
    });
    
    console.log(`Found ${usersWithoutPoints.length} users needing migration`);
    
    for (const user of usersWithoutPoints) {
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
    
    console.log('✅ All migrations completed successfully!');
    
    // Show final user data
    console.log('\n📋 Final user data:');
    const finalUsers = await User.find({});
    for (const user of finalUsers) {
      console.log(`Username: ${user.username}`);
      console.log(`Email: ${user.email}`);
      console.log(`Points: ${user.points}`);
      console.log(`Membership Level: ${user.membershipLevel}`);
      console.log(`Notification Settings: ${JSON.stringify(user.notificationSettings)}`);
      console.log('---');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run migrations if called directly
if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://MooCalf:MooCalf101!@moostyles.ilo9smk.mongodb.net/moostyle?retryWrites=true&w=majority&appName=MooStyles')
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
