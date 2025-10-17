import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X, HelpCircle, Info, MessageCircle } from 'lucide-react';
import SearchQuery from '@/Components/SearchQuery';
import { getGlobalSearchData } from '@/lib/globalSearchData';

export const NavigationPrimary = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

          {/* Right side - Heart Icon */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 px-4">
            {/* Heart Icon - Patreon Link */}
            <a
              href="https://www.patreon.com/MOOSTYLES"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200 rounded-lg p-2"
              title="Support us on Patreon"
              onMouseEnter={() => setHoveredIcon('heart')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Heart size={20} color={getHeartColor()} />
            </a>
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