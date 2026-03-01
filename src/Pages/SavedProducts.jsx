import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "@/Components/NavigationBar";
import { ProductCard } from "@/Components/ProductCard";
import { Metadata } from "@/Components/Metadata.jsx";
import { 
  Heart, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Trash2, 
  Calendar,
  Package,
  AlertCircle,
  Loader2
} from "lucide-react";
import { 
  getSavedProducts, 
  getSavedProductsByCategory, 
  searchSavedProducts, 
  clearAllSavedProducts,
  getStorageStats 
} from "@/lib/savedProducts";
import { WebsiteBackground } from "@/Components/WebsiteBackground";

export const SavedProducts = () => {
  const navigate = useNavigate();
  const [savedProducts, setSavedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [storageStats, setStorageStats] = useState(null);

  // Load saved products on component mount
  useEffect(() => {
    loadSavedProducts();
  }, []);

  // Filter products when search query or category changes
  useEffect(() => {
    filterProducts();
  }, [savedProducts, searchQuery, selectedCategory]);

  const loadSavedProducts = () => {
    setLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const products = getSavedProducts();
      const stats = getStorageStats();
      
      setSavedProducts(products);
      setStorageStats(stats);
      setLoading(false);
    }, 500);
  };

  const filterProducts = () => {
    let filtered = [...savedProducts];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = searchSavedProducts(searchQuery);
      if (selectedCategory !== "all") {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
    }

    setFilteredProducts(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleClearAll = () => {
    clearAllSavedProducts();
    setSavedProducts([]);
    setFilteredProducts([]);
    setStorageStats(getStorageStats());
    setShowClearConfirm(false);
    
    // Show success message
    showToast('All saved products cleared', 'success');
  };

  const handleProductUnsave = (productId) => {
    // Remove from local state
    setSavedProducts(prev => prev.filter(p => p.id !== productId));
    setFilteredProducts(prev => prev.filter(p => p.id !== productId));
    
    // Update storage stats
    setStorageStats(getStorageStats());
  };

  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    toast.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300`;
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const getCategories = () => {
    const categories = getSavedProductsByCategory();
    return Object.keys(categories).map(key => ({
      key,
      name: key.charAt(0).toUpperCase() + key.slice(1),
      count: categories[key].length
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatStorageSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <WebsiteBackground />
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading saved products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Metadata 
        pageTitle="Saved Products - MooStyle"
        pageDescription="View and manage your saved products"
        ogTitle="Saved Products - MooStyle"
        ogDescription="Access your saved products and manage your favorites"
        ogImage="/projects/Brand Medias/Promotional Content/Promo Poster.png"
        ogType="website"
        keywords="saved products, favorites, MooStyle"
      />
      
      <div className="min-h-screen">
        <WebsiteBackground />
        {/* Navigation Bars */}
        <NavigationBar />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
                  Saved Products
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  {savedProducts.length} saved product{savedProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                {/* Clear All Button */}
                {savedProducts.length > 0 && (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    <Trash2 size={16} className="sm:w-4.5 sm:h-4.5" />
                    <span className="hidden sm:inline">Clear All</span>
                    <span className="sm:hidden">Clear</span>
                  </button>
                )}
                
                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                    }`}
                  >
                    <Grid size={16} className="sm:w-4.5 sm:h-4.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                    }`}
                  >
                    <List size={16} className="sm:w-4.5 sm:h-4.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search saved products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg whitespace-nowrap transition-colors text-sm sm:text-base ${
                    selectedCategory === "all" 
                      ? "bg-teal-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  All ({savedProducts.length})
                </button>
                {getCategories().map(category => (
                  <button
                    key={category.key}
                    onClick={() => handleCategoryChange(category.key)}
                    className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg whitespace-nowrap transition-colors text-sm sm:text-base ${
                      selectedCategory === category.key 
                        ? "bg-teal-600 text-white" 
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-gray-400 mb-4">
                <Heart size={40} className="mx-auto sm:w-12 sm:h-12" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                {searchQuery || selectedCategory !== "all" ? "No products found" : "No saved products yet"}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {searchQuery || selectedCategory !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Start saving products you love by clicking the heart icon"
                }
              </p>
              {!searchQuery && selectedCategory === "all" && (
                <button
                  onClick={() => navigate("/brands")}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                >
                  Browse Mods
                </button>
              )}
            </div>
          ) : (
            <div className={`${
              viewMode === "grid" 
                ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6" 
                : "space-y-3 sm:space-y-4"
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onToggleFavorite={handleProductUnsave}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <Trash2 size={20} className="text-red-600 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Clear All Saved Products</h3>
                <p className="text-xs sm:text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Are you sure you want to remove all {savedProducts.length} saved products? 
              This will permanently delete them from your saved list.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm sm:text-base order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm sm:text-base order-1 sm:order-2"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
