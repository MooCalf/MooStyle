import React, { createContext, useContext } from 'react';
import { useSession, authClient } from '@/lib/betterAuthClient';
import { BanNotice } from '@/Components/BanNotice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session, isPending } = useSession();

  console.log('🔍 Auth Session Debug:', {
    session: session,
    isPending: isPending,
    user: session?.user,
    isAuthenticated: !!session?.user
  });

  // Add debugging for session loading
  React.useEffect(() => {
    console.log('🔍 Auth Session Effect - isPending changed:', isPending);
    console.log('🔍 Auth Session Effect - session changed:', session);
    
    if (!isPending && !session) {
      console.log('🔍 Auth Session Effect - No session found, checking cookies...');
      console.log('🔍 Document cookies:', document.cookie);
      
      // Check if BetterAuth client is working
      try {
        console.log('🔍 AuthClient available:', !!authClient);
        console.log('🔍 AuthClient getCookie():', authClient?.getCookie?.());
      } catch (error) {
        console.error('🔍 Error accessing authClient:', error);
      }
    }
  }, [session, isPending]);

  const value = {
    user: session?.user || null,
    isAuthenticated: !!session?.user,
    isLoading: isPending,
    isAdmin: ['admin', 'owner'].includes(session?.user?.role),
    isOwner: session?.user?.role === 'owner',
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


