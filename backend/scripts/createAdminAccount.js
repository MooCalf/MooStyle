require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const createAdminAccount = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    
    console.log('Creating admin account...\n');
    
    // Get admin email from user input
    const adminEmail = process.argv[2];
    if (!adminEmail) {
      console.log('❌ Please provide an admin email as an argument');
      console.log('Usage: node scripts/createAdminAccount.js your-email@example.com');
      process.exit(1);
    }
    
    const adminPassword = 'Admin123!'; // Default password - should be changed
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
    
    // Create admin user
    const adminUser = {
      id: new Date().getTime().toString(),
      email: adminEmail.toLowerCase(),
      emailVerified: true,
      name: 'Admin',
      image: null,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: hashedPassword,
      
      // Custom fields
      username: 'admin',
      isActive: true,
      points: 0,
      membershipLevel: 'Diamond',
      notificationSettings: { emailNotifications: true },
      lastDownloaded: null,
      lastLogin: null,
    };
    
    // Insert admin user
    await db.collection('user').insertOne(adminUser);
    console.log(`✅ Admin user created: ${adminEmail}`);
    
    // Create account record for email/password auth
    const adminAccount = {
      id: `account_${adminUser.id}`,
      userId: adminUser.id,
      accountId: adminEmail.toLowerCase(),
      providerId: 'credential',
      accessToken: null,
      refreshToken: null,
      idToken: null,
      accessTokenExpiresAt: null,
      refreshTokenExpiresAt: null,
      scope: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await db.collection('account').insertOne(adminAccount);
    console.log(`✅ Admin account record created`);
    
    console.log('\n🎉 Admin account created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    console.log('\n🚀 You can now:');
    console.log('1. Login with these credentials');
    console.log('2. Create other users via admin panel');
    console.log('3. Manage user roles and permissions');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
};

createAdminAccount();

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const createAdminAccount = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    
    console.log('Creating admin account...\n');
    
    // Get admin email from user input
    const adminEmail = process.argv[2];
    if (!adminEmail) {
      console.log('❌ Please provide an admin email as an argument');
      console.log('Usage: node scripts/createAdminAccount.js your-email@example.com');
      process.exit(1);
    }
    
    const adminPassword = 'Admin123!'; // Default password - should be changed
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
    
    // Create admin user
    const adminUser = {
      id: new Date().getTime().toString(),
      email: adminEmail.toLowerCase(),
      emailVerified: true,
      name: 'Admin',
      image: null,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: hashedPassword,
      
      // Custom fields
      username: 'admin',
      isActive: true,
      points: 0,
      membershipLevel: 'Diamond',
      notificationSettings: { emailNotifications: true },
      lastDownloaded: null,
      lastLogin: null,
    };
    
    // Insert admin user
    await db.collection('user').insertOne(adminUser);
    console.log(`✅ Admin user created: ${adminEmail}`);
    
    // Create account record for email/password auth
    const adminAccount = {
      id: `account_${adminUser.id}`,
      userId: adminUser.id,
      accountId: adminEmail.toLowerCase(),
      providerId: 'credential',
      accessToken: null,
      refreshToken: null,
      idToken: null,
      accessTokenExpiresAt: null,
      refreshTokenExpiresAt: null,
      scope: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await db.collection('account').insertOne(adminAccount);
    console.log(`✅ Admin account record created`);
    
    console.log('\n🎉 Admin account created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    console.log('\n🚀 You can now:');
    console.log('1. Login with these credentials');
    console.log('2. Create other users via admin panel');
    console.log('3. Manage user roles and permissions');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
};

createAdminAccount();


