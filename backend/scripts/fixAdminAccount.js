require('dotenv').config();
const { MongoClient } = require('mongodb');

async function fixAdminAccount() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    
    console.log('=== FIXING ADMIN ACCOUNT ===');
    
    // Find the admin account
    const adminUser = await db.collection('user').findOne({ 
      email: 'moocalf.obj@gmail.com' 
    });
    
    if (!adminUser) {
      console.log('Admin account not found!');
      return;
    }
    
    console.log('Current admin user:', {
      id: adminUser.id,
      email: adminUser.email,
      username: adminUser.username,
      role: adminUser.role,
      isActive: adminUser.isActive
    });
    
    // Ensure the admin account has the correct role and is active
    const updateResult = await db.collection('user').updateOne(
      { email: 'moocalf.obj@gmail.com' },
      { 
        $set: {
          role: 'admin',
          isActive: true,
          username: 'Administrator',
          updatedAt: new Date()
        }
      }
    );
    
    if (updateResult.modifiedCount > 0) {
      console.log('✅ Admin account updated successfully');
    } else {
      console.log('ℹ️ Admin account was already correctly configured');
    }
    
    // Verify the update
    const updatedAdmin = await db.collection('user').findOne({ 
      email: 'moocalf.obj@gmail.com' 
    });
    
    console.log('Updated admin user:', {
      id: updatedAdmin.id,
      email: updatedAdmin.email,
      username: updatedAdmin.username,
      role: updatedAdmin.role,
      isActive: updatedAdmin.isActive
    });
    
    // Also check if there are any duplicate accounts
    const allUsers = await db.collection('user').find({}).toArray();
    console.log('\n=== ALL USERS ===');
    allUsers.forEach(user => {
      console.log(`Email: ${user.email}, Username: ${user.username}, Role: ${user.role}, Active: ${user.isActive}`);
    });
    
    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

fixAdminAccount();