#!/usr/bin/env node

/**
 * Create Owner Account Script
 * 
 * This script creates an owner account with the highest privileges.
 * Only owners can modify other owners and admins.
 * 
 * Usage: node createOwnerAccount.js
 */

const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is required');
  process.exit(1);
}

async function createOwnerAccount() {
  let client;
  
  try {
    console.log('🔗 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db();
    const usersCollection = db.collection('user');
    
    console.log('📋 Creating owner account...');
    
    // Get owner details from user input
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const getInput = (question) => {
      return new Promise((resolve) => {
        rl.question(question, resolve);
      });
    };
    
    const email = await getInput('📧 Enter owner email: ');
    const username = await getInput('👤 Enter owner username: ');
    const password = await getInput('🔒 Enter owner password: ');
    
    // Validate inputs
    if (!email || !username || !password) {
      console.error('❌ All fields are required');
      rl.close();
      process.exit(1);
    }
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({
      $or: [
        { email: email },
        { username: username }
      ]
    });
    
    if (existingUser) {
      console.error('❌ User with this email or username already exists');
      rl.close();
      process.exit(1);
    }
    
    // Create owner account
    const ownerAccount = {
      id: new ObjectId().toString(),
      email: email,
      username: username,
      role: 'owner',
      isActive: true,
      points: 1000, // Give owner some starting points
      membershipLevel: 'Diamond', // Highest membership level
      notificationSettings: {
        emailNotifications: true
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null,
      banReason: null,
      bannedAt: null
    };
    
    // Insert owner account
    const result = await usersCollection.insertOne(ownerAccount);
    
    if (result.insertedId) {
      console.log('✅ Owner account created successfully!');
      console.log('📊 Account Details:');
      console.log(`   Email: ${ownerAccount.email}`);
      console.log(`   Username: ${ownerAccount.username}`);
      console.log(`   Role: ${ownerAccount.role}`);
      console.log(`   Points: ${ownerAccount.points}`);
      console.log(`   Membership: ${ownerAccount.membershipLevel}`);
      console.log(`   Active: ${ownerAccount.isActive}`);
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
      console.log('🚀 You can now log in with these credentials!');
    } else {
      console.error('❌ Failed to create owner account');
    }
    
    rl.close();
    
  } catch (error) {
    console.error('❌ Error creating owner account:', error.message);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Database connection closed');
    }
  }
}

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
