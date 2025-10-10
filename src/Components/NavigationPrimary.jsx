import { useState, useEffect } from "react";
import { HelpCircle, User, Heart, ShoppingBag, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import SearchQuery from "./SearchQuery";

export const NavigationPrimary = () => {
  const { getCartCount, clearCartOnLogout } = useCart();
  const navigate = useNavigate();
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [user, setUser] = useState(null);

  // Search data for the SearchQuery component
  const searchData = [
    // Products
    {
      id: 'product-1',
      type: 'product',
      title: 'Korean Skincare Set',
      category: 'skincare',
      tags: ['korean', 'skincare', 'beauty', 'routine'],
      author: 'LunaGlow',
      date: '2024-01-15',
      content: 'Complete Korean skincare routine with cleanser, toner, and moisturizer',
      url: '/product/korean-skincare-set'
    },
    {
      id: 'product-2',
      type: 'product',
      title: 'Japanese Streetwear Hoodie',
      category: 'fashion',
      tags: ['japanese', 'streetwear', 'hoodie', 'fashion'],
      author: 'TokyoVibe',
      date: '2024-01-10',
      content: 'Premium Japanese streetwear hoodie with unique design',
      url: '/product/japanese-hoodie'
    },
    {
      id: 'product-3',
      type: 'product',
      title: 'Chinese Ceramic Tea Set',
      category: 'lifestyle',
      tags: ['chinese', 'ceramic', 'tea', 'lifestyle'],
      author: 'ZenLifestyle',
      date: '2024-01-05',
      content: 'Traditional Chinese ceramic tea set for authentic tea experience',
      url: '/product/chinese-tea-set'
    },
    // Blog Posts
    {
      id: 'blog-1',
      type: 'blog',
      title: 'Welcome to MOOSTYLE - Your New Modding Destination',
      category: 'announcement',
      tags: ['welcome', 'modding', 'inzoi', 'community'],
      author: 'MooCalf',
      date: '2024-01-15',
      content: 'I\'m excited to announce the launch of MOOSTYLE, your premier destination for high-quality InZoi mods.',
      url: '/blog'
    },
    {
      id: 'blog-2',
      type: 'blog',
      title: 'Top 10 InZoi Mods You Need to Try',
      category: 'guide',
      tags: ['inzoi', 'mods', 'guide', 'top-10'],
      author: 'MooCalf',
      date: '2024-01-12',
      content: 'Discover the most popular and essential InZoi mods that will enhance your gaming experience.',
      url: '/blog'
    },
    {
      id: 'blog-3',
      type: 'blog',
      title: 'How to Install InZoi Mods Safely',
      category: 'tutorial',
      tags: ['inzoi', 'mods', 'tutorial', 'installation'],
      author: 'MooCalf',
      date: '2024-01-08',
      content: 'Step-by-step guide on how to safely install InZoi mods without breaking your game.',
      url: '/blog'
    },
    // Pages
    {
      id: 'page-1',
      type: 'page',
      title: 'About MOOSTYLE',
      category: 'about',
      tags: ['about', 'moostyle', 'company', 'story'],
      author: 'MooCalf',
      date: '2024-01-01',
      content: 'Learn about MOOSTYLE\'s mission to provide high-quality InZoi mods to the community.',
      url: '/about-me'
    },
    {
      id: 'page-2',
      type: 'page',
      title: 'Common Questions',
      category: 'help',
      tags: ['faq', 'help', 'questions', 'support'],
      author: 'MooCalf',
      date: '2024-01-01',
      content: 'Find answers to frequently asked questions about MOOSTYLE and InZoi modding.',
      url: '/common-questions'
    }
  ];

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    clearCartOnLogout(); // Clear cart when logging out
    setUser(null);
    navigate('/');
  };

  // Handle search selection
  const handleSearchSelect = (result) => {
    if (result.url) {
      navigate(result.url);
    } else {
      // Fallback navigation based on type
      switch (result.type) {
        case 'product':
          navigate('/shopping');
          break;
        case 'blog':
          navigate('/blog');
          break;
        case 'page':
          navigate(result.url || '/');
          break;
        default:
          navigate('/');
      }
    }
  };


  return (
    <div className="bg-white border-b border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section - Help and Search */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Help Dropdown */}
            <div className="relative">
                <button
                  onClick={() => setShowHelpDropdown(!showHelpDropdown)}
                  className="nav-primary-icon"
                  aria-label="Help"
                >
                <HelpCircle size={18} className="sm:w-5 sm:h-5" />
              </button>
              <AnimatePresence>
                {showHelpDropdown && (
                  <motion.div 
                    className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="py-1">
                      <Link
                        to="/common-questions"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors duration-200"
                        onClick={() => setShowHelpDropdown(false)}
                      >
                        Common Questions
                      </Link>
                      <Link
                        to="/about-me"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors duration-200"
                        onClick={() => setShowHelpDropdown(false)}
                      >
                        About Me
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Component */}
            <SearchQuery
              searchData={searchData}
              onSearchSelect={handleSearchSelect}
              placeholder="Search products, blog posts, pages..."
              showFilters={true}
              className="nav-search"
              searchFields={['title', 'content', 'tags', 'category', 'author']}
              resultLimit={8}
              iconOnly={true}
            />
          </div>

          {/* Middle Section - Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="brand-logo-link flex items-center space-x-2 sm:space-x-3 focus:outline-none focus:ring-0 hover:opacity-80 transition-opacity duration-200">
              <img
                src="/projects/Brand Medias/Logos/MOOSTYLES LOGO - TEAL COLOR.png"
                alt="MOOSTYLE Logo"
                className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
              />
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-600">MOOSTYLE</span>
            </Link>
          </div>

          {/* Right Section - User, Heart, Shopping Bag */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* User Dropdown */}
            <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="nav-primary-icon"
                  aria-label="User Account"
                >
                <User size={18} className="sm:w-5 sm:h-5" />
              </button>
              <AnimatePresence>
                {showUserDropdown && (
                  <motion.div 
                    className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="py-1">
                      {user ? (
                        <>
                          <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            <p className="font-medium">{user.username}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                          <Link
                            to="/my-account"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors duration-200"
                            onClick={() => setShowUserDropdown(false)}
                          >
                            My Account
                          </Link>
                          {user.role === 'admin' && (
                            <Link
                              to="/admin/dashboard"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors duration-200"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              Admin Dashboard
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 flex items-center gap-2"
                          >
                            <LogOut size={16} />
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors duration-200"
                            onClick={() => setShowUserDropdown(false)}
                          >
                            Sign In
                          </Link>
                          <Link
                            to="/register"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors duration-200"
                            onClick={() => setShowUserDropdown(false)}
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Patreon Support Button */}
              <a
                href="https://www.patreon.com/MOOSTYLES"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-primary-icon hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transition-all duration-200"
                aria-label="Support on Patreon"
              >
              <Heart size={18} className="sm:w-5 sm:h-5" />
            </a>

                {/* Shopping Bag Icon */}
                  <Link
                    to="/cart"
                    className="nav-primary-icon relative"
                    aria-label="Shopping Cart"
                  >
                  <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
          </div>
        </div>
      </div>
    </div>
  );
};