import { createAuthClient } from "better-auth/react";
import { adminClient, emailOTPClient } from "better-auth/client/plugins";

const envBase = typeof window !== 'undefined' && window.__AUTH_BASE_URL__
  ? window.__AUTH_BASE_URL__
  : (import.meta?.env?.VITE_AUTH_BASE_URL || import.meta?.env?.VITE_BACKEND_URL || 'https://moostyle-production.up.railway.app');

// Debug logging for base URL
console.log('🔍 Better Auth Client Base URL:', envBase);
console.log('🔍 Environment Variables:', {
  VITE_AUTH_BASE_URL: import.meta?.env?.VITE_AUTH_BASE_URL,
  VITE_BACKEND_URL: import.meta?.env?.VITE_BACKEND_URL,
  windowAuthBase: typeof window !== 'undefined' ? window.__AUTH_BASE_URL__ : 'undefined'
});

// Create Better Auth client with admin and emailOTP plugins
export const authClient = createAuthClient({
  baseURL: envBase,
  plugins: [
    adminClient(),
    emailOTPClient()
  ],
  fetchOptions: {
    credentials: 'include',
  },
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
  isAuthenticated: () => {
    const session = getSession();
    return !!session?.user;
  },
  getCurrentUser: () => {
    const session = getSession();
    return session?.user || null;
  },
  isAdmin: () => {
    const user = authHelpers.getCurrentUser();
    return ['admin', 'owner'].includes(user?.role);
  },
  getUserPoints: () => {
    const user = authHelpers.getCurrentUser();
    return user?.points || 0;
  },
  getMembershipLevel: () => {
    const user = authHelpers.getCurrentUser();
    return user?.membershipLevel || 'Bronze';
  },
  hasEmailNotifications: () => {
    const user = authHelpers.getCurrentUser();
    return user?.notificationSettings?.emailNotifications || false;
  },
  updateUserPoints: async (newPoints) => {
    try {
      const result = await authClient.updateUser({ points: newPoints });
      if (result.error) return false;
      return true;
    } catch (error) {
      console.error('Error updating user points:', error);
      return false;
    }
  },
  updateMembershipLevel: async (points) => {
    let membershipLevel = 'Bronze';
    if (points >= 200) membershipLevel = 'Diamond';
    else if (points >= 80) membershipLevel = 'Gold';
    else if (points >= 30) membershipLevel = 'Silver';
    try {
      const result = await authClient.updateUser({ membershipLevel });
      if (result.error) return false;
      return true;
    } catch (error) {
      console.error('Error updating membership level:', error);
      return false;
    }
  }
};

export default authClient;
