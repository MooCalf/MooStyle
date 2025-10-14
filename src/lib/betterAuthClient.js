import { createAuthClient } from "better-auth/react";
import { adminClient, emailOTPClient } from "better-auth/client/plugins";

// Create Better Auth client with admin and emailOTP plugins
const backendUrl = "https://moostyle-production.up.railway.app"; // Hardcoded for testing
console.log('🔧 Better Auth Client Base URL:', backendUrl);
console.log('🔧 Environment:', import.meta.env.MODE);
console.log('🔧 All env vars:', import.meta.env);
console.log('🔧 VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);

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
    sameSite: 'lax',
    // Remove domain restriction for Railway deployment
    // domain: '.moostyles.com',
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

// Helper functions for common auth operations
export const authHelpers = {
  // Get properly formatted cookies for API requests
  getCookieHeaders: () => {
    try {
      const cookies = authClient.getCookie();
      return cookies ? { 'Cookie': cookies } : {};
    } catch (error) {
      console.error('Error getting auth cookies:', error);
      return {};
    }
  },

  // Make authenticated API request with proper cookies
  makeAuthenticatedRequest: async (url, options = {}) => {
    const cookieHeaders = authHelpers.getCookieHeaders();
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

