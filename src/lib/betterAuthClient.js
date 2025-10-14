import { createAuthClient } from "better-auth/react";
import { adminClient, emailOTPClient } from "better-auth/client/plugins";

// Create Better Auth client with admin and emailOTP plugins
export const authClient = createAuthClient({
  baseURL: "http://localhost:5000",
  plugins: [
    adminClient(),
    emailOTPClient()
  ]
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
  // Check if user is authenticated
  isAuthenticated: () => {
    const session = getSession();
    return !!session?.user;
  },

  // Get current user
  getCurrentUser: () => {
    const session = getSession();
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

