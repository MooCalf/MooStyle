require('dotenv').config();
const { betterAuth } = require("better-auth");

console.log('Testing Better Auth configuration...');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET');
console.log('BETTER_AUTH_SECRET:', process.env.BETTER_AUTH_SECRET ? 'SET' : 'NOT SET');

try {
  const auth = betterAuth({
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }
    },
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: "http://localhost:5000",
  });
  
  console.log('✅ Better Auth initialized successfully');
  console.log('Auth instance:', !!auth);
  console.log('Auth API:', !!auth.api);
  
  // Test if we can get the handler
  const { toNodeHandler } = require('better-auth/node');
  const handler = toNodeHandler(auth);
  console.log('✅ Handler created successfully');
  
} catch (error) {
  console.error('❌ Better Auth initialization failed:', error);
}

const { betterAuth } = require("better-auth");

console.log('Testing Better Auth configuration...');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET');
console.log('BETTER_AUTH_SECRET:', process.env.BETTER_AUTH_SECRET ? 'SET' : 'NOT SET');

try {
  const auth = betterAuth({
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }
    },
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: "http://localhost:5000",
  });
  
  console.log('✅ Better Auth initialized successfully');
  console.log('Auth instance:', !!auth);
  console.log('Auth API:', !!auth.api);
  
  // Test if we can get the handler
  const { toNodeHandler } = require('better-auth/node');
  const handler = toNodeHandler(auth);
  console.log('✅ Handler created successfully');
  
} catch (error) {
  console.error('❌ Better Auth initialization failed:', error);
}


