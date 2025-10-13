import React, { createContext, useContext } from 'react';
import { useSession } from '@/lib/betterAuthClient';
import { BanNotice } from '@/Components/BanNotice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session, isPending } = useSession();

  const value = {
    user: session?.user || null,
    isAuthenticated: !!session?.user,
    isLoading: isPending,
    isAdmin: session?.user?.role === 'admin',
    isBanned: session?.user && !session?.user?.isActive,
  };

  // If user is banned, show ban notice instead of the app
  // BUT allow access to support page
  if (value.isAuthenticated && value.isBanned) {
    // Check if user is trying to access support page
    const currentPath = window.location.pathname;
    if (currentPath === '/support') {
      // Allow access to support page
      return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      );
    }
    
    // For all other pages, show ban notice
    return (
      <AuthContext.Provider value={value}>
        <BanNotice 
          banReason={session?.user?.banReason} 
          bannedAt={session?.user?.bannedAt} 
        />
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};


