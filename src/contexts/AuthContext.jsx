import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession, getSessionWithoutCache, getSessionDirect } from '@/lib/betterAuthClient';
import { BanNotice } from '@/Components/BanNotice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session, isPending } = useSession();
  const [fallbackSession, setFallbackSession] = useState(null);
  const [isLoadingFallback, setIsLoadingFallback] = useState(false);

  // Try fallback session if main session is null
  useEffect(() => {
    if (!session && !isPending && !isLoadingFallback) {
      setIsLoadingFallback(true);
      
      // Try multiple approaches
      Promise.allSettled([
        getSessionWithoutCache(),
        getSessionDirect()
      ]).then(results => {
        console.log('🔍 All session attempts:', results);
        
        // Use the first successful result
        for (const result of results) {
          if (result.status === 'fulfilled' && result.value) {
            console.log('🔍 Found valid session:', result.value);
            setFallbackSession(result.value);
            break;
          }
        }
        
        setIsLoadingFallback(false);
      }).catch(error => {
        console.error('🔍 All session attempts failed:', error);
        setIsLoadingFallback(false);
      });
    }
  }, [session, isPending, isLoadingFallback]);

  // Use fallback session if main session is null
  const effectiveSession = session || fallbackSession;
  const effectiveIsPending = isPending || isLoadingFallback;

  console.log('🔍 Auth Session Debug:', {
    session: session,
    fallbackSession: fallbackSession,
    effectiveSession: effectiveSession,
    isPending: isPending,
    isLoadingFallback: isLoadingFallback,
    effectiveIsPending: effectiveIsPending,
    user: effectiveSession?.user,
    isAuthenticated: !!effectiveSession?.user
  });

  const value = {
    user: effectiveSession?.user || null,
    isAuthenticated: !!effectiveSession?.user,
    isLoading: effectiveIsPending,
    isAdmin: ['admin', 'owner'].includes(effectiveSession?.user?.role),
    isOwner: effectiveSession?.user?.role === 'owner',
    isBanned: effectiveSession?.user && !effectiveSession?.user?.isActive,
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


