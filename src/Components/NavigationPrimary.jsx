import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { signOut } from '@/lib/betterAuthClient';
import { User, LogOut, Settings, ShoppingCart, Menu, X, Heart, HelpCircle, Info, MessageCircle } from 'lucide-react';
import SearchQuery from '@/Components/SearchQuery';
import { getGlobalSearchData } from '@/lib/globalSearchData';

export const NavigationPrimary = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const mobileMenuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Helper function to get icon color based on hover state
  const getIconColor = (iconName) => {
    return hoveredIcon === iconName ? '#111827' : '#374151'; // Darker gray on hover
  };

  // Helper function to get heart icon color (special case for Patreon)
  const getHeartColor = () => {
    return hoveredIcon === 'heart' ? '#ffffff' : '#374151'; // White on hover for Patreon
  };

  // Get cart count
  const getCartCount = () => {
    return cartItems ? cartItems.length : 0;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button - visible only on mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors flex-shrink-0 px-4"
            onMouseEnter={() => setHoveredIcon('menu')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            {isMenuOpen ? <X size={24} color={getIconColor('menu')} /> : <Menu size={24} color={getIconColor('menu')} />}
          </button>

          {/* Left side - Desktop icons (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0 px-4">
            {/* Question Mark Icon - Common Questions */}
            <Link
              to="/common-questions"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              title="Common Questions"
              onMouseEnter={() => setHoveredIcon('help')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <HelpCircle size={20} color={getIconColor('help')} />
            </Link>

            {/* Support Icon */}
            <Link
              to="/support"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              title="Support"
              onMouseEnter={() => setHoveredIcon('support')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <MessageCircle size={20} color={getIconColor('support')} />
            </Link>

            {/* About Me Icon */}
            <Link
              to="/about"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              title="About Me"
              onMouseEnter={() => setHoveredIcon('about')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Info size={20} color={getIconColor('about')} />
            </Link>

                  {/* Search Icon */}
                  <SearchQuery
                    iconOnly={true}
                    placeholder="Search products, brands, blog posts..."
                    searchData={getGlobalSearchData()}
                    onSearchSelect={(result) => {
                      // Handle search result selection with proper navigation
                      if (result.url) {
                        // Use the URL from the search result
                        window.location.href = result.url;
                      } else if (result.path) {
                        window.location.href = result.path;
                      } else if (result.type === 'blog') {
                        window.location.href = '/blog';
                      } else if (result.type === 'product') {
                        window.location.href = `/product/${result.id}`;
                      } else if (result.type === 'brand') {
                        window.location.href = `/brand/${result.id}`;
                      } else if (result.type === 'category') {
                        window.location.href = `/shopping/${result.subcategory || result.category}`;
                      } else if (result.type === 'page') {
                        window.location.href = result.url || '/';
                      } else {
                        // Fallback to home page
                        window.location.href = '/';
                      }
                    }}
                    showFilters={true}
                    searchFields={['title', 'description', 'content', 'tags', 'category', 'subcategory', 'author', 'brand']}
                    resultLimit={20}
                  />
          </div>

          {/* Center - Logo */}
          <div className="flex items-center justify-center flex-1 min-w-0">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/projects/Brand Medias/Logos/MOOSTYLES LOGO - TEAL COLOR.png"
                alt="MooStyle Logo"
                className="h-8 w-8 flex-shrink-0"
              />
              <span className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap">MOOSTYLE</span>
            </Link>
          </div>

          {/* Right side - User menu, Heart, Cart */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 px-4">
            {/* Heart Icon - Patreon Link (hidden on mobile) */}
            <a
              href="https://www.patreon.com/MOOSTYLES"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200 rounded-lg p-2"
              title="Support us on Patreon"
              onMouseEnter={() => setHoveredIcon('heart')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Heart size={20} color={getHeartColor()} />
            </a>

            {/* Cart Icon with Badge */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-gray-900 transition-colors"
              title="Shopping Cart"
              onMouseEnter={() => setHoveredIcon('cart')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <ShoppingCart size={20} color={getIconColor('cart')} />
              {/* Cart Count Badge */}
              {isAuthenticated && getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                  {getCartCount() > 99 ? '99+' : getCartCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                  onMouseEnter={() => setHoveredIcon('user')}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <User size={20} color={getIconColor('user')} />
                  <span className="hidden sm:inline">{user?.username || user?.name || 'User'}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      to="/my-account"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings size={16} color="#374151" className="mr-2" />
                      My Account
                    </Link>
                    
                    {/* Admin Dashboard Link - Only show for admins */}
                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings size={16} color="#374151" className="mr-2" />
                        Admin Dashboard
                      </Link>
                    )}
                    
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} color="#374151" className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Link
                  to="/login"
                  className="text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors px-2 py-1 sm:px-0"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors px-2 py-1 sm:px-4 sm:py-2 rounded-md border border-gray-300 hover:border-gray-400"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-3 px-4">
              {/* Mobile navigation links */}
              <Link
                to="/common-questions"
                className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <HelpCircle size={18} className="mr-3" />
                Common Questions
              </Link>
              <Link
                to="/support"
                className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle size={18} className="mr-3" />
                Support
              </Link>
              <Link
                to="/about"
                className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info size={18} className="mr-3" />
                About Me
              </Link>
              <div className="block px-3 py-2">
                <SearchQuery
                  iconOnly={false} // Full search bar in mobile menu
                  placeholder="Search products, brands, blog posts..."
                  searchData={getGlobalSearchData()}
                  onSearchSelect={(result) => {
                    // Handle search result selection with proper navigation
                    if (result.url) {
                      // Use the URL from the search result
                      window.location.href = result.url;
                    } else if (result.path) {
                      window.location.href = result.path;
                    } else if (result.type === 'blog') {
                      window.location.href = '/blog';
                    } else if (result.type === 'product') {
                      window.location.href = `/product/${result.id}`;
                    } else if (result.type === 'brand') {
                      window.location.href = `/brand/${result.id}`;
                    } else if (result.type === 'category') {
                      window.location.href = `/shopping/${result.subcategory || result.category}`;
                    } else if (result.type === 'page') {
                      window.location.href = result.url || '/';
                    } else {
                      // Fallback to home page
                      window.location.href = '/';
                    }
                    setIsMenuOpen(false);
                  }}
                  showFilters={true}
                  searchFields={['title', 'description', 'content', 'tags', 'category', 'subcategory', 'author', 'brand']}
                  resultLimit={20}
                />
              </div>
            </div>

            {/* Mobile User Menu */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="px-3 py-2 text-sm text-gray-500 bg-gray-50 rounded-lg text-center">
                    Signed in as {user?.username || user?.name || 'User'}
                  </div>
                  <Link
                    to="/my-account"
                    className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings size={18} className="mr-3" />
                    My Account
                  </Link>
                  
                  {/* Admin Dashboard Link - Mobile - Only show for admins */}
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings size={18} className="mr-3" />
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <Link
                    to="/cart"
                    className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="relative mr-3">
                      <ShoppingCart size={18} />
                      {/* Mobile Cart Count Badge */}
                      {getCartCount() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center min-w-[16px]">
                          {getCartCount() > 99 ? '99+' : getCartCount()}
                        </span>
                      )}
                    </div>
                    Cart ({getCartCount()})
                  </Link>
                  
                  <a
                    href="https://www.patreon.com/MOOSTYLES"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart size={18} className="mr-3" />
                    Support on Patreon
                  </a>
                  
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <LogOut size={18} className="mr-3" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="flex items-center justify-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center px-3 py-3 text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};