require('dotenv').config();
const { MongoClient } = require('mongodb');

async function checkUsers() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    
    console.log('=== USER COLLECTION ===');
    const users = await db.collection('user').find({}).toArray();
    users.forEach(user => {
      console.log('MongoDB ID:', user._id);
      console.log('Custom ID:', user.id);
      console.log('Email:', user.email);
      console.log('Username:', user.username);
      console.log('Role:', user.role);
      console.log('IsActive:', user.isActive);
      console.log('---');
    });
    
    console.log('=== ACCOUNT COLLECTION ===');
    const accounts = await db.collection('account').find({}).toArray();
    accounts.forEach(account => {
      console.log('Account ID:', account._id);
      console.log('User ID:', account.userId);
      console.log('Provider:', account.providerId);
      console.log('---');
    });
    
    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUsers();