import { createAuthClient } from "better-auth/react";
import { adminClient, emailOTPClient } from "better-auth/client/plugins";

// Create Better Auth client with admin and emailOTP plugins
import { envConfig } from './envConfig.js';

const backendUrl = envConfig.apiBaseUrl;
console.log('🔧 Better Auth Client Base URL:', backendUrl);
console.log('🔧 Environment:', import.meta.env.MODE);
console.log('🔧 All env vars:', import.meta.env);
console.log('🔧 VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('🔧 EnvConfig API Base URL:', envConfig.apiBaseUrl);

export const authClient = createAuthClient({
  baseURL: backendUrl,
  plugins: [
    adminClient(),
    emailOTPClient()
  ],
  // Production configuration for cross-domain
  fetchOptions: {
    credentials: 'include',
    mode: 'cors',
  },
  // Session configuration
  session: {
    updateAge: 60 * 60 * 24, // Update session every 24h
  },
  // Cookie configuration
  cookieOptions: {
    secure: true,
    sameSite: 'none', // Allow cross-origin requests
    httpOnly: false, // Allow client-side access for debugging
    // Set domain to Railway domain for cross-origin
    domain: 'moostyle-production.up.railway.app',
  }
});

// Export auth methods for easy use
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;

// Add debugging wrappers
export const debugSignIn = async (email, password) => {
  console.log('🔐 Debug SignIn - Starting with:', { email });
  try {
    const result = await signIn.email({ email, password });
    console.log('🔐 Debug SignIn - Result:', result);
    console.log('🔐 Debug SignIn - Cookies after signin:', document.cookie);
    console.log('🔐 Debug SignIn - BetterAuth cookies:', authClient.getCookie());
    return result;
  } catch (error) {
    console.error('🔐 Debug SignIn - Error:', error);
    throw error;
  }
};

export const debugSignUp = async (email, password, name) => {
  console.log('🔐 Debug SignUp - Starting with:', { email, name });
  try {
    const result = await signUp.email({ email, password, name });
    console.log('🔐 Debug SignUp - Result:', result);
    console.log('🔐 Debug SignUp - Cookies after signup:', document.cookie);
    console.log('🔐 Debug SignUp - BetterAuth cookies:', authClient.getCookie());
    return result;
  } catch (error) {
    console.error('🔐 Debug SignUp - Error:', error);
    throw error;
  }
};

// Test function to check BetterAuth connectivity
export const testBetterAuth = async () => {
  console.log('🧪 Testing BetterAuth connectivity...');
  try {
    // Test 1: Check if authClient is working
    console.log('🧪 AuthClient:', authClient);
    
    // Test 2: Check current session
    const session = authClient.getSession();
    console.log('🧪 Current session:', session);
    
    // Test 3: Check cookies
    const cookies = authClient.getCookie();
    console.log('🧪 BetterAuth cookies:', cookies);
    console.log('🧪 Document cookies:', document.cookie);
    
    // Test 4: Test API call
    const response = await fetch('https://moostyle-production.up.railway.app/api/debug/cookies', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log('🧪 API test response:', data);
    
    return {
      authClient: !!authClient,
      session: session,
      cookies: cookies,
      documentCookies: document.cookie,
      apiTest: data
    };
  } catch (error) {
    console.error('🧪 BetterAuth test error:', error);
    return { error: error.message };
  }
};

// Helper functions for common auth operations
export const authHelpers = {
  // Get properly formatted cookies for API requests
  getCookieHeaders: () => {
    try {
      const cookies = authClient.getCookie();
      console.log('🍪 getCookieHeaders - Raw cookies:', cookies);
      console.log('🍪 getCookieHeaders - Document cookies:', document.cookie);
      return cookies ? { 'Cookie': cookies } : {};
    } catch (error) {
      console.error('🍪 Error getting auth cookies:', error);
      return {};
    }
  },

  // Make authenticated API request with proper cookies
  makeAuthenticatedRequest: async (url, options = {}) => {
    const cookieHeaders = authHelpers.getCookieHeaders();
    console.log('🌐 Making authenticated request to:', url);
    console.log('🌐 Cookie headers:', cookieHeaders);
    
    return fetch(url, {
      ...options,
      credentials: 'include', // Always include cookies
      headers: {
        'Content-Type': 'application/json',
        ...cookieHeaders,
        ...options.headers,
      },
    });
  },
  // Check if user is authenticated
  isAuthenticated: () => {
    const session = getSession();
    console.log('🔍 isAuthenticated check:', { session, hasUser: !!session?.user });
    return !!session?.user;
  },

  // Get current user
  getCurrentUser: () => {
    const session = getSession();
    console.log('🔍 getCurrentUser:', { session, user: session?.user });
    return session?.user || null;
  },

  // Check if user is admin or owner
  isAdmin: () => {
    const user = authHelpers.getCurrentUser();
    return ['admin', 'owner'].includes(user?.role);
  },

  // Get user points
  getUserPoints: () => {
    const user = authHelpers.getCurrentUser();
    return user?.points || 0;
  },

  // Get membership level
  getMembershipLevel: () => {
    const user = authHelpers.getCurrentUser();
    return user?.membershipLevel || 'Bronze';
  },

  // Check if user has notification enabled
  hasEmailNotifications: () => {
    const user = authHelpers.getCurrentUser();
    return user?.notificationSettings?.emailNotifications || false;
  },

  // Update user points (for cart operations)
  updateUserPoints: async (newPoints) => {
    try {
      const result = await authClient.updateUser({
        points: newPoints
      });
      
      if (result.error) {
        console.error('Failed to update user points:', result.error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error updating user points:', error);
      return false;
    }
  },

  // Update membership level based on points
  updateMembershipLevel: async (points) => {
    let membershipLevel = 'Bronze';
    
    if (points >= 200) {
      membershipLevel = 'Diamond';
    } else if (points >= 80) {
      membershipLevel = 'Gold';
    } else if (points >= 30) {
      membershipLevel = 'Silver';
    }

    try {
      const result = await authClient.updateUser({
        membershipLevel: membershipLevel
      });
      
      if (result.error) {
        console.error('Failed to update membership level:', result.error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error updating membership level:', error);
      return false;
    }
  }
};

// Export default client
export default authClient;

// Make test function available globally for console testing
if (typeof window !== 'undefined') {
  window.testBetterAuth = testBetterAuth;
  window.debugSignIn = debugSignIn;
  window.debugSignUp = debugSignUp;
  window.authClient = authClient;
}

