#!/usr/bin/env node

/**
 * Create Owner Account Script (Better Auth Compatible)
 * 
 * This script creates an owner account using Better Auth structure.
 * Only owners can modify other owners and admins.
 * 
 * Usage: node createOwnerAccountBetterAuth.js your-email@example.com
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');

const createOwnerAccount = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    
    console.log('🔗 Connected to MongoDB');
    console.log('👑 Creating owner account...\n');
    
    // Get owner email from command line argument
    const ownerEmail = process.argv[2];
    if (!ownerEmail) {
      console.log('❌ Please provide an owner email as an argument');
      console.log('Usage: node scripts/createOwnerAccountBetterAuth.js your-email@example.com');
      process.exit(1);
    }
    
    // Check if user already exists
    const existingUser = await db.collection('user').findOne({
      email: ownerEmail.toLowerCase()
    });
    
    if (existingUser) {
      console.log('❌ User with this email already exists');
      console.log(`   Current role: ${existingUser.role}`);
      console.log('   To promote to owner, use the admin dashboard or update the role directly in the database');
      process.exit(1);
    }
    
    // Create owner user with Better Auth structure
    const ownerUser = {
      id: new Date().getTime().toString(),
      email: ownerEmail.toLowerCase(),
      emailVerified: true,
      name: 'Owner',
      image: null,
      role: 'owner',
      createdAt: new Date(),
      updatedAt: new Date(),
      
      // Custom fields
      username: 'owner',
      isActive: true,
      points: 1000, // Give owner some starting points
      membershipLevel: 'Diamond', // Highest membership level
      notificationSettings: { 
        emailNotifications: true 
      },
      lastDownloaded: null,
      lastLogin: null,
      banReason: null,
      bannedAt: null
    };
    
    // Insert owner user
    const result = await db.collection('user').insertOne(ownerUser);
    
    if (result.insertedId) {
      console.log('✅ Owner account created successfully!');
      console.log('📊 Account Details:');
      console.log(`   Email: ${ownerUser.email}`);
      console.log(`   Username: ${ownerUser.username}`);
      console.log(`   Role: ${ownerUser.role}`);
      console.log(`   Points: ${ownerUser.points}`);
      console.log(`   Membership: ${ownerUser.membershipLevel}`);
      console.log(`   Active: ${ownerUser.isActive}`);
      console.log('');
      console.log('🔐 Owner Privileges:');
      console.log('   • Can edit all users (including admins and other owners)');
      console.log('   • Can ban/unban any user');
      console.log('   • Can delete any user');
      console.log('   • Can change roles of any user');
      console.log('   • Full access to admin dashboard');
      console.log('   • Cannot demote themselves from owner role');
      console.log('   • Cannot delete their own account');
      console.log('');
      console.log('⚠️  Important Security Notes:');
      console.log('   • Keep owner credentials secure');
      console.log('   • Only create owner accounts for trusted individuals');
      console.log('   • Monitor owner account activity');
      console.log('   • Consider using 2FA for owner accounts');
      console.log('');
      console.log('🚀 You can now log in with this email address!');
      console.log('   Use the password reset feature to set your password.');
    } else {
      console.error('❌ Failed to create owner account');
    }
    
  } catch (error) {
    console.error('❌ Error creating owner account:', error.message);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Database connection closed');
    }
  }
};

// Run the script
if (require.main === module) {
  createOwnerAccount()
    .then(() => {
      console.log('✅ Script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { createOwnerAccount };
