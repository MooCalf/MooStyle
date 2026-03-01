import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchQuery from '@/Components/SearchQuery';
import { getGlobalSearchData } from '@/lib/globalSearchData';
import { getSavedProductsCount } from '@/lib/savedProducts';

export const NavigationBar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [savedProductsCount, setSavedProductsCount] = useState(0);
  const mobileMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({ right: 0, top: '100%' });

  // Check active routes
  const isHomeActive = location.pathname === "/" || location.pathname.startsWith("/home");
  const isArchiveActive = location.pathname.startsWith("/archive");
  const isInZOIActive = location.pathname.startsWith("/brands");

  // Update saved products count
  useEffect(() => {
    const updateSavedCount = () => {
      setSavedProductsCount(getSavedProductsCount());
    };

    updateSavedCount();

    const handleStorageChange = (e) => {
      if (e.key === 'moostyle_saved_products') {
        updateSavedCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutsideDropdown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
    };
  }, [isDropdownOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Reposition dropdown if it would overflow viewport
  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const overflow = rect.right - window.innerWidth;
      if (overflow > 0) {
        setDropdownStyle({ right: 'auto', left: 0, top: '100%' });
      } else {
        setDropdownStyle({ right: 0, left: 'auto', top: '100%' });
      }
    }
  }, [isDropdownOpen]);

  const getIconColor = (iconName) => {
    return hoveredIcon === iconName ? '#111827' : '#374151';
  };

  const getHeartColor = () => {
    return hoveredIcon === 'heart' ? '#ffffff' : '#374151';
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-flex">
          
          {/* LEFT SECTION - Nav Items */}
          <div className="navbar-left-section">
            {/* Mobile menu button */}
            <motion.button
              onClick={toggleMenu}
              className="navbar-mobile-button navbar-mobile-only"
              onMouseEnter={() => setHoveredIcon('menu')}
              onMouseLeave={() => setHoveredIcon(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {isMenuOpen ? <X size={24} color={getIconColor('menu')} /> : <Menu size={24} color={getIconColor('menu')} />}
            </motion.button>

            {/* Desktop Nav Links */}
            <div className="navbar-desktop-only">
              <Link
                to="/home"
                className={`navbar-link ${isHomeActive ? 'navbar-link-active' : 'navbar-link-inactive'}`}
              >
                Home
              </Link>

              <Link
                to="/brands"
                className={`navbar-link ${isInZOIActive ? 'navbar-link-active' : 'navbar-link-inactive'}`}
              >
                InZOI
              </Link>

              <Link
                to="/archive"
                className={`navbar-link ${isArchiveActive ? 'navbar-link-active' : 'navbar-link-inactive'}`}
              >
                Archive
              </Link>

              <motion.a
                href="https://www.patreon.com/MOOSTYLES"
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-patreon-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="navbar-patreon-icon" />
                Patreon
              </motion.a>
            </div>
          </div>

          {/* CENTER SECTION - Logo */}
          <div className="navbar-logo-container">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/home"
                className="navbar-logo-link"
                title="Home"
                onMouseEnter={() => setHoveredIcon('logo')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <img
                  src="/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png"
                  alt="MooStyle Logo"
                  className="navbar-logo-image"
                />
                <span className="navbar-logo-text hidden sm:inline">MOOSTYLE</span>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT SECTION - Icons */}
          <div className="navbar-right-section">
            {/* Search Icon */}
            <div className="navbar-desktop-only">
              <SearchQuery
                iconOnly={true}
                placeholder="Search products, brands, blog posts..."
                searchData={getGlobalSearchData()}
                onSearchSelect={(result) => {
                  if (result.url) {
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
                    window.location.href = `/brands`;
                  } else if (result.type === 'page') {
                    window.location.href = result.url || '/';
                  } else {
                    window.location.href = '/';
                  }
                }}
                showFilters={true}
                searchFields={['title', 'description', 'content', 'tags', 'category', 'subcategory', 'author', 'brand']}
                resultLimit={20}
              />
            </div>

            {/* Heart Icon - Saved Products */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/saved-products"
                className="navbar-heart-button"
                title="Saved Products"
                onMouseEnter={() => setHoveredIcon('heart')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Heart size={20} color={getHeartColor()} />
              </Link>
            </motion.div>

            {/* Dropdown menu trigger */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <button
                onClick={() => setIsDropdownOpen((open) => !open)}
                className="navbar-icon-button"
                title="More"
                onMouseEnter={() => setHoveredIcon('dropdown')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Menu size={20} color={getIconColor('dropdown')} />
              </button>
            </motion.div>

            {/* Dropdown panel */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                style={dropdownStyle}
                className="navbar-dropdown"
              >
                <Link
                  to="/common-questions"
                  className="navbar-dropdown-link"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  General Information
                </Link>
                <Link
                  to="/support"
                  className="navbar-dropdown-link"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Support
                </Link>
                <Link
                  to="/about"
                  className="navbar-dropdown-link"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  About Me
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div ref={mobileMenuRef} className="navbar-mobile-menu navbar-mobile-only">
            <div className="navbar-mobile-menu-content">
              {/* Mobile Nav Links */}
              <Link
                to="/home"
                className={`navbar-mobile-link ${isHomeActive ? 'navbar-mobile-link-active' : 'navbar-mobile-link-inactive'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link
                to="/brands"
                className={`navbar-mobile-link ${isInZOIActive ? 'navbar-mobile-link-active' : 'navbar-mobile-link-inactive'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                InZOI
              </Link>
              
              <Link
                to="/archive"
                className={`navbar-mobile-link ${isArchiveActive ? 'navbar-mobile-link-active' : 'navbar-mobile-link-inactive'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Archive
              </Link>

              <a
                href="https://www.patreon.com/MOOSTYLES"
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-patreon-button"
              >
                <Heart className="navbar-patreon-icon" />
                Patreon
              </a>

              <div className="navbar-mobile-divider">
                <SearchQuery
                  iconOnly={false}
                  placeholder="Search products, brands, blog posts..."
                  searchData={getGlobalSearchData()}
                  onSearchSelect={(result) => {
                    if (result.url) {
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
                      window.location.href = `/brands`;
                    } else if (result.type === 'page') {
                      window.location.href = result.url || '/';
                    } else {
                      window.location.href = '/';
                    }
                    setIsMenuOpen(false);
                  }}
                  showFilters={true}
                  searchFields={['title', 'description', 'content', 'tags', 'category', 'subcategory', 'author', 'brand']}
                  resultLimit={20}
                />
              </div>

              <Link
                to="/common-questions"
                className="navbar-mobile-link navbar-mobile-link-inactive"
                onClick={() => setIsMenuOpen(false)}
              >
                General Information
              </Link>

              <Link
                to="/support"
                className="navbar-mobile-link navbar-mobile-link-inactive"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>

              <Link
                to="/about"
                className="navbar-mobile-link navbar-mobile-link-inactive"
                onClick={() => setIsMenuOpen(false)}
              >
                About Me
              </Link>

              <Link
                to="/saved-products"
                className="navbar-mobile-link navbar-mobile-link-inactive"
                onClick={() => setIsMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span>Saved Products</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
