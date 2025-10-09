import { useState, useRef, useEffect } from "react";
import { HelpCircle, Search, User, Heart, ShoppingBag, Filter, Star, TrendingUp, Clock, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export const NavigationPrimary = () => {
  const { getCartCount, clearCartOnLogout } = useCart();
  const navigate = useNavigate();
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    category: "",
    priceRange: "",
    brand: "",
    rating: ""
  });
  const [user, setUser] = useState(null);

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

  // Mock search suggestions
  const searchSuggestions = [
    { type: "trending", text: "Korean skincare", icon: TrendingUp },
    { type: "trending", text: "Japanese streetwear", icon: TrendingUp },
    { type: "recent", text: "Chinese ceramics", icon: Clock },
    { type: "recent", text: "Asian beauty", icon: Clock },
    { type: "popular", text: "LunaGlow products", icon: Star },
    { type: "popular", text: "TokyoVibe collection", icon: Star }
  ];

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false);
        setShowAdvancedFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery, "with filters:", searchFilters);
    setShowSearchSuggestions(false);
    setShowAdvancedFilters(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchSuggestions(e.target.value.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSearchSuggestions(false);
  };

  const handleFilterChange = (filterType, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setSearchFilters({
      category: "",
      priceRange: "",
      brand: "",
      rating: ""
    });
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
              {showHelpDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
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
                </div>
              )}
            </div>

            {/* Search Icon */}
              <button
                onClick={() => setShowSearchBar(!showSearchBar)}
                className="nav-primary-icon"
                aria-label="Search"
              >
              <Search size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Middle Section - Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="brand-logo-link flex items-center space-x-2 sm:space-x-3">
              <img
                src="/projects/MooCalf_Main Logo.png"
                alt="MooStyle Logo"
                className="h-6 w-6 sm:h-8 sm:w-8 rounded-full"
              />
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">MooStyle</span>
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
              {showUserDropdown && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
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
                </div>
              )}
            </div>

            {/* Heart Icon */}
              <a
                href="#wishlist"
                className="nav-primary-icon"
                aria-label="Wishlist"
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

        {/* Search Bar - Appears when search icon is clicked */}
        {showSearchBar && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40" ref={searchRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                    onChange={handleSearchInputChange}
                    onFocus={() => setShowSearchSuggestions(searchQuery.length > 0)}
                    placeholder="Search for products, brands, categories..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-20 sm:pr-24 pl-10 sm:pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  autoFocus
                />
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size={16} className='sm:w-5 sm:h-5'" />
                  <button
                    type="button"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="absolute right-8 sm:right-12 top-1/2 transform -translate-y-1/2 p-1 sm:p-2 text-gray-400 hover:text-teal-600 transition-colors"
                  >
                    <Filter size={16} className="sm:w-5 sm:h-5" />
                  </button>
                <button
                  type="submit"
                    className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 p-1 sm:p-2 text-gray-600 hover:text-teal-600 transition-colors duration-200"
                  >
                    <Search size={16} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
                
                {/* Search Suggestions Dropdown */}
                {showSearchSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    <div className="p-2">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Suggestions</div>
                      {searchSuggestions
                        .filter(suggestion => 
                          suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((suggestion, index) => {
                          const IconComponent = suggestion.icon;
                          return (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                            >
                              <IconComponent size={16} className="text-gray-400 mr-3" />
                              <span className="text-gray-700">{suggestion.text}</span>
                              <span className="ml-auto text-xs text-gray-400 capitalize">{suggestion.type}</span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}
                
                {/* Advanced Filters Dropdown */}
                {showAdvancedFilters && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
                      <button
                        onClick={() => setShowAdvancedFilters(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          value={searchFilters.category}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="">All Categories</option>
                          <option value="skincare">Skincare</option>
                          <option value="fashion">Fashion</option>
                          <option value="beauty">Beauty</option>
                          <option value="lifestyle">Lifestyle</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                        <select
                          value={searchFilters.priceRange}
                          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="">Any Price</option>
                          <option value="0-25">$0 - $25</option>
                          <option value="25-50">$25 - $50</option>
                          <option value="50-100">$50 - $100</option>
                          <option value="100+">$100+</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                        <select
                          value={searchFilters.brand}
                          onChange={(e) => handleFilterChange('brand', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="">All Brands</option>
                          <option value="lunaglow">LunaGlow</option>
                          <option value="tokyovibe">TokyoVibe</option>
                          <option value="celestialbeauty">CelestialBeauty</option>
                          <option value="zenlifestyle">ZenLifestyle</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <select
                          value={searchFilters.rating}
                          onChange={(e) => handleFilterChange('rating', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="">Any Rating</option>
                          <option value="5">5 Stars</option>
                          <option value="4">4+ Stars</option>
                          <option value="3">3+ Stars</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={clearFilters}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={() => setShowAdvancedFilters(false)}
                        className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
                      >
                        Apply Filters
                </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(showHelpDropdown || showUserDropdown || showSearchBar || showSearchSuggestions || showAdvancedFilters) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowHelpDropdown(false);
            setShowUserDropdown(false);
            setShowSearchBar(false);
            setShowSearchSuggestions(false);
            setShowAdvancedFilters(false);
          }}
        />
      )}
    </div>
  );
};