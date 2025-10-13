import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/lib/betterAuthClient';
import { User, LogOut, Settings, ShoppingCart, Menu, X, Heart, HelpCircle, Info, MessageCircle } from 'lucide-react';
import SearchQuery from '@/Components/SearchQuery';
import { getGlobalSearchData } from '@/lib/globalSearchData';

export const NavigationPrimary = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - 3 icons */}
          <div className="flex items-center space-x-4">
            {/* Question Mark Icon - Common Questions */}
            <Link
              to="/common-questions"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              title="Common Questions"
            >
              <HelpCircle className="h-5 w-5" />
            </Link>

            {/* Support Icon */}
            <Link
              to="/support"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              title="Support"
            >
              <MessageCircle className="h-5 w-5" />
            </Link>

            {/* About Me Icon */}
            <Link
              to="/about"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              title="About Me"
            >
              <Info className="h-5 w-5" />
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
                <div className="flex items-center space-x-2">
                  <Link to="/" className="flex items-center space-x-2">
                    <img
                      src="/projects/Brand Medias/Logos/MOOSTYLES LOGO - TEAL COLOR.png"
                      alt="MooStyle Logo"
                      className="h-8 w-8"
                    />
                    <span className="text-xl font-bold text-gray-900">MOOSTYLE</span>
                  </Link>
                </div>

          {/* Right side - User menu, Heart, Cart */}
          <div className="flex items-center space-x-4">
            {/* Heart Icon - Patreon Link */}
            <a
              href="https://www.patreon.com/MOOSTYLES"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200 rounded-lg p-2"
              title="Support us on Patreon"
            >
              <Heart className="h-5 w-5" />
            </a>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>{user?.username || user?.name || 'User'}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      to="/my-account"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      My Account
                    </Link>
                    
                    {/* Admin Dashboard Link - Only show for admins */}
                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    )}
                    
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-gray-900 transition-colors px-4 py-2 rounded-md border border-gray-300 hover:border-gray-400"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {/* Mobile navigation links */}
              <Link
                to="/common-questions"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Common Questions
              </Link>
              <Link
                to="/support"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
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
            <div className="mt-4 pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Signed in as {user?.username || user?.name || 'User'}
                  </div>
                  <Link
                    to="/my-account"
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    My Account
                  </Link>
                  
                  {/* Admin Dashboard Link - Mobile - Only show for admins */}
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <Link
                    to="/cart"
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart
                  </Link>
                  
                  <a
                    href="https://www.patreon.com/MOOSTYLES"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Support on Patreon
                  </a>
                  
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900 rounded-md border border-gray-300 hover:border-gray-400"
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