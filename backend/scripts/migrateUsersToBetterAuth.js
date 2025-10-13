require('dotenv').config();
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for migration');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const migrateUsersToBetterAuth = async () => {
  await connectDB();
  
  try {
    // Get MongoDB client for direct database access
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    
    console.log('Starting user migration to Better Auth format...');
    
    // Get existing users from the old 'users' collection
    const oldUsers = await db.collection('users').find({}).toArray();
    console.log(`Found ${oldUsers.length} users in old 'users' collection`);
    
    // Get existing users from Better Auth 'user' collection
    const betterAuthUsers = await db.collection('user').find({}).toArray();
    console.log(`Found ${betterAuthUsers.length} users in Better Auth 'user' collection`);
    
    // Create a set of existing emails in Better Auth to avoid duplicates
    const existingEmails = new Set(betterAuthUsers.map(user => user.email));
    
    let migratedCount = 0;
    let skippedCount = 0;
    
    for (const oldUser of oldUsers) {
      // Skip if user already exists in Better Auth
      if (existingEmails.has(oldUser.email)) {
        console.log(`⏭️  Skipping ${oldUser.email} - already exists in Better Auth`);
        skippedCount++;
        continue;
      }
      
      // Convert old user format to Better Auth format
      const betterAuthUser = {
        id: oldUser._id.toString(), // Use existing MongoDB _id as Better Auth id
        email: oldUser.email,
        emailVerified: false, // Better Auth default
        name: oldUser.username || oldUser.name || oldUser.email.split('@')[0],
        image: null, // No image in old system
        createdAt: oldUser.createdAt || new Date(),
        updatedAt: new Date(),
        
        // Custom fields from your old system
        username: oldUser.username,
        role: oldUser.role || 'user',
        isActive: oldUser.isActive !== undefined ? oldUser.isActive : true,
        points: oldUser.points || 0,
        membershipLevel: oldUser.membershipLevel || 'Bronze',
        notificationSettings: oldUser.notificationSettings || { emailNotifications: false },
        lastDownloaded: oldUser.lastDownloaded || null,
        lastLogin: oldUser.lastLogin || null,
      };
      
      // Insert into Better Auth user collection
      await db.collection('user').insertOne(betterAuthUser);
      console.log(`✅ Migrated user: ${oldUser.email} (${oldUser.username})`);
      migratedCount++;
    }
    
    console.log('\n📊 Migration Summary:');
    console.log(`✅ Migrated: ${migratedCount} users`);
    console.log(`⏭️  Skipped: ${skippedCount} users (already exist)`);
    console.log(`📝 Total in Better Auth: ${migratedCount + betterAuthUsers.length} users`);
    
    // Optional: Create accounts for migrated users (for email/password auth)
    console.log('\n🔐 Creating account records for migrated users...');
    
    for (const oldUser of oldUsers) {
      if (!existingEmails.has(oldUser.email)) {
        // Create account record for email/password authentication
        const account = {
          id: `account_${oldUser._id}`,
          userId: oldUser._id.toString(),
          accountId: oldUser.email,
          providerId: 'credential',
          accessToken: null,
          refreshToken: null,
          idToken: null,
          accessTokenExpiresAt: null,
          refreshTokenExpiresAt: null,
          scope: null,
          password: oldUser.password, // Keep existing password hash
          createdAt: oldUser.createdAt || new Date(),
          updatedAt: new Date(),
        };
        
        await db.collection('account').insertOne(account);
        console.log(`🔐 Created account record for: ${oldUser.email}`);
      }
    }
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Test login with migrated users');
    console.log('2. Verify all user data is correct');
    console.log('3. Consider removing old "users" collection after verification');
    
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

migrateUsersToBetterAuth();

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for migration');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const migrateUsersToBetterAuth = async () => {
  await connectDB();
  
  try {
    // Get MongoDB client for direct database access
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    
    console.log('Starting user migration to Better Auth format...');
    
    // Get existing users from the old 'users' collection
    const oldUsers = await db.collection('users').find({}).toArray();
    console.log(`Found ${oldUsers.length} users in old 'users' collection`);
    
    // Get existing users from Better Auth 'user' collection
    const betterAuthUsers = await db.collection('user').find({}).toArray();
    console.log(`Found ${betterAuthUsers.length} users in Better Auth 'user' collection`);
    
    // Create a set of existing emails in Better Auth to avoid duplicates
    const existingEmails = new Set(betterAuthUsers.map(user => user.email));
    
    let migratedCount = 0;
    let skippedCount = 0;
    
    for (const oldUser of oldUsers) {
      // Skip if user already exists in Better Auth
      if (existingEmails.has(oldUser.email)) {
        console.log(`⏭️  Skipping ${oldUser.email} - already exists in Better Auth`);
        skippedCount++;
        continue;
      }
      
      // Convert old user format to Better Auth format
      const betterAuthUser = {
        id: oldUser._id.toString(), // Use existing MongoDB _id as Better Auth id
        email: oldUser.email,
        emailVerified: false, // Better Auth default
        name: oldUser.username || oldUser.name || oldUser.email.split('@')[0],
        image: null, // No image in old system
        createdAt: oldUser.createdAt || new Date(),
        updatedAt: new Date(),
        
        // Custom fields from your old system
        username: oldUser.username,
        role: oldUser.role || 'user',
        isActive: oldUser.isActive !== undefined ? oldUser.isActive : true,
        points: oldUser.points || 0,
        membershipLevel: oldUser.membershipLevel || 'Bronze',
        notificationSettings: oldUser.notificationSettings || { emailNotifications: false },
        lastDownloaded: oldUser.lastDownloaded || null,
        lastLogin: oldUser.lastLogin || null,
      };
      
      // Insert into Better Auth user collection
      await db.collection('user').insertOne(betterAuthUser);
      console.log(`✅ Migrated user: ${oldUser.email} (${oldUser.username})`);
      migratedCount++;
    }
    
    console.log('\n📊 Migration Summary:');
    console.log(`✅ Migrated: ${migratedCount} users`);
    console.log(`⏭️  Skipped: ${skippedCount} users (already exist)`);
    console.log(`📝 Total in Better Auth: ${migratedCount + betterAuthUsers.length} users`);
    
    // Optional: Create accounts for migrated users (for email/password auth)
    console.log('\n🔐 Creating account records for migrated users...');
    
    for (const oldUser of oldUsers) {
      if (!existingEmails.has(oldUser.email)) {
        // Create account record for email/password authentication
        const account = {
          id: `account_${oldUser._id}`,
          userId: oldUser._id.toString(),
          accountId: oldUser.email,
          providerId: 'credential',
          accessToken: null,
          refreshToken: null,
          idToken: null,
          accessTokenExpiresAt: null,
          refreshTokenExpiresAt: null,
          scope: null,
          password: oldUser.password, // Keep existing password hash
          createdAt: oldUser.createdAt || new Date(),
          updatedAt: new Date(),
        };
        
        await db.collection('account').insertOne(account);
        console.log(`🔐 Created account record for: ${oldUser.email}`);
      }
    }
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Test login with migrated users');
    console.log('2. Verify all user data is correct');
    console.log('3. Consider removing old "users" collection after verification');
    
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

migrateUsersToBetterAuth();


