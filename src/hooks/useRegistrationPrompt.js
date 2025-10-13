import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useRegistrationPrompt = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showCartPrompt, setShowCartPrompt] = useState(false);

  // Check if user should see registration prompts
  const shouldShowPrompts = !isAuthenticated || !user;

  // Handle download attempts for non-authenticated users
  const handleDownloadAttempt = (callback) => {
    if (shouldShowPrompts) {
      setShowDownloadModal(true);
      return false; // Block the download
    }
    return callback?.(); // Allow the download
  };

  // Handle cart operations for non-authenticated users
  const handleCartOperation = (operation, callback) => {
    if (shouldShowPrompts) {
      setShowCartPrompt(true);
      return false; // Block the operation
    }
    return callback?.(); // Allow the operation
  };

  // Navigation handlers
  const handleSignUp = () => {
    navigate('/register');
    setShowDownloadModal(false);
    setShowCartPrompt(false);
  };

  const handleSignIn = () => {
    navigate('/login');
    setShowDownloadModal(false);
    setShowCartPrompt(false);
  };

  const handleCloseModal = () => {
    setShowDownloadModal(false);
    setShowCartPrompt(false);
  };

  // Auto-hide cart prompt after a delay
  useEffect(() => {
    if (showCartPrompt) {
      const timer = setTimeout(() => {
        setShowCartPrompt(false);
      }, 10000); // Hide after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [showCartPrompt]);

  return {
    shouldShowPrompts,
    showDownloadModal,
    showCartPrompt,
    handleDownloadAttempt,
    handleCartOperation,
    handleSignUp,
    handleSignIn,
    handleCloseModal,
    setShowCartPrompt
  };
};
