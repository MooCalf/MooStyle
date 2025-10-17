import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X, HelpCircle, Info, MessageCircle, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchQuery from '@/Components/SearchQuery';
import { getGlobalSearchData } from '@/lib/globalSearchData';
import { getSavedProductsCount } from '@/lib/savedProducts';

export const NavigationPrimary = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [savedProductsCount, setSavedProductsCount] = useState(0);
  const mobileMenuRef = useRef(null);

  // Update saved products count
  useEffect(() => {
    const updateSavedCount = () => {
      setSavedProductsCount(getSavedProductsCount());
    };

    // Initial load
    updateSavedCount();

    // Listen for storage changes (when products are saved/unsaved)
    const handleStorageChange = (e) => {
      if (e.key === 'moostyle_saved_products') {
        updateSavedCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    window.addEventListener('savedProductsChanged', updateSavedCount);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('savedProductsChanged', updateSavedCount);
    };
  }, []);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper function to get icon color based on hover state
  const getIconColor = (iconName) => {
    return hoveredIcon === iconName ? '#111827' : '#374151'; // Darker gray on hover
  };

  // Helper function to get heart icon color (special case for Patreon)
  const getHeartColor = () => {
    return hoveredIcon === 'heart' ? '#ffffff' : '#374151'; // White on hover for Patreon
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button - visible only on mobile */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors flex-shrink-0 px-4"
            onMouseEnter={() => setHoveredIcon('menu')}
            onMouseLeave={() => setHoveredIcon(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {isMenuOpen ? <X size={24} color={getIconColor('menu')} /> : <Menu size={24} color={getIconColor('menu')} />}
          </motion.button>

          {/* Left side - Desktop icons (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0 px-4">
            {/* Question Mark Icon - General Information */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/common-questions"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                title="General Information"
                onMouseEnter={() => setHoveredIcon('help')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <HelpCircle size={20} color={getIconColor('help')} />
              </Link>
            </motion.div>

            {/* Support Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/support"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                title="Support"
                onMouseEnter={() => setHoveredIcon('support')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <MessageCircle size={20} color={getIconColor('support')} />
              </Link>
            </motion.div>

            {/* About Me Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/about"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                title="About Me"
                onMouseEnter={() => setHoveredIcon('about')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Info size={20} color={getIconColor('about')} />
              </Link>
            </motion.div>

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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/projects/Brand Medias/Logos/MOOSTYLES LOGO - TEAL COLOR.png"
                  alt="MooStyle Logo"
                  className="h-8 w-8 flex-shrink-0"
                />
                <span className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap">MOOSTYLE</span>
              </Link>
            </motion.div>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 px-4">
            {/* Saved Products Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative"
            >
              <Link
                to="/saved-products"
                className="text-gray-700 hover:text-gray-900 transition-colors p-2"
                title="Saved Products"
                onMouseEnter={() => setHoveredIcon('saved')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Bookmark size={20} color={getIconColor('saved')} />
                {savedProductsCount > 0 && (
                  <motion.span 
                    className="absolute top-4 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {savedProductsCount > 99 ? '99+' : savedProductsCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* Heart Icon - Patreon Link */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <a
                href="https://www.patreon.com/MOOSTYLES"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200 rounded-lg p-2 block"
                title="Support us on Patreon"
                onMouseEnter={() => setHoveredIcon('heart')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Heart size={20} color={getHeartColor()} />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-3 px-4">
              {/* Mobile navigation links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to="/common-questions"
                  className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HelpCircle size={18} className="mr-3" />
                  General Information
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/support"
                  className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageCircle size={18} className="mr-3" />
                  Support
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/about"
                  className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Info size={18} className="mr-3" />
                  About Me
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/saved-products"
                  className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bookmark size={18} className="mr-3" />
                  Saved Products
                  {savedProductsCount > 0 && (
                    <motion.span 
                      className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {savedProductsCount > 99 ? '99+' : savedProductsCount}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
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
              
              {/* Patreon Link */}
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};