import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavigationPrimary } from "@/Components/NavigationPrimary";
import { NavigationSecondary } from "@/Components/NavigationSecondary";
import { AdvancedSearch } from "@/Components/AdvancedSearch";
import SearchQuery from "@/Components/SearchQuery";
import { ProductDisplay, ProductResultsHeader, LoadMoreButton } from "@/Components/ShoppingProducts";
import { useProductData } from "@/hooks/useProductData";
import { getGlobalSearchData } from "@/lib/globalSearchData";
import { Metadata } from "@/Components/Metadata.jsx";
import { Heart, Filter, X } from "lucide-react";

export const Shopping = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);

  // Use custom hook for product data management
  const {
    products,
    filteredProducts,
    loading,
    hasMore,
    isSearchActive,
    categoryData,
    setSearchResults,
    loadMoreProducts,
    clearFilters
  } = useProductData(category, searchQuery, filters);

  // Prepare search data for SearchQuery component - use global search data
  const searchData = getGlobalSearchData();

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const closeMobileFilters = () => {
    setShowMobileFilters(false);
  };

  const toggleDesktopFilters = () => {
    setShowDesktopFilters(!showDesktopFilters);
  };

  // Handle SearchQuery selection
  const handleSearchSelect = (result) => {
    // Handle search result selection with proper navigation
    if (result.url) {
      // Use the URL from the search result
      window.location.href = result.url;
    } else if (result.path) {
      window.location.href = result.path;
    } else if (result.type === 'product') {
      window.location.href = `/product/${result.id}`;
    } else if (result.type === 'category') {
      window.location.href = `/shopping/${result.subcategory || result.category}`;
    } else if (result.type === 'blog') {
      window.location.href = '/blog';
    } else if (result.type === 'page') {
      window.location.href = result.url || '/';
    } else {
      // Fallback to home page
      window.location.href = '/';
    }
  };

  // Handle SearchQuery search - this should trigger the search in useProductData
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleToggleFavorite = (productId) => {
    console.log("Toggling favorite for:", productId);
    // Implement favorite functionality
  };

  const handleQuickView = (product) => {
    console.log("Quick view for:", product.name);
    // Implement quick view modal
  };

  if (!categoryData && category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/home")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Skip Links for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <a href="#navigation" className="skip-link">
        Skip to navigation
      </a>
      
      <Metadata 
        pageTitle={category ? `${categoryData?.name} - MooStyle` : "All Products - MooStyle"}
        pageDescription={category ? categoryData?.description : "Discover all our premium Asian fashion, beauty products, and lifestyle items at MooStyle."}
        ogTitle={category ? `Shop ${categoryData?.name} - Premium Asian Fashion & Beauty | MooStyle` : "Shop All Products - Premium Asian Fashion & Beauty | MooStyle"}
        ogDescription={category ? `Discover the latest ${categoryData?.name.toLowerCase()} products at MooStyle. ${categoryData?.description} Premium quality, authentic Asian style.` : "Discover all our premium Asian fashion, beauty products, and lifestyle items at MooStyle. Premium quality, authentic Asian style."}
        ogImage={category ? (categoryData?.image || "/projects/Brand Medias/Promotional Content/Promo Poster.png") : "/projects/Brand Medias/Promotional Content/Promo Poster.png"}
        ogType="website"
        keywords={category ? `${categoryData?.name}, Asian fashion, Korean beauty, Japanese streetwear, ${categoryData?.subcategories?.join(', ') || ''}, MooStyle` : "Asian fashion, Korean beauty, Japanese streetwear, lifestyle, health, MooStyle"}
        category={categoryData}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bars */}
        <div id="navigation">
          <NavigationPrimary />
          <NavigationSecondary />
        </div>

        {/* Main Content */}
        <main id="main-content">
          <div className="flex flex-col lg:flex-row">

          {/* Mobile Filter Overlay */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50" onClick={closeMobileFilters}>
              <div className="absolute left-0 top-0 h-full w-64 max-w-[80vw] bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <button
                    onClick={closeMobileFilters}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="h-[calc(100vh-80px)] overflow-y-auto">
                  <AdvancedSearch
                    category={category}
                    onSearchResults={handleSearchResults}
                    onFiltersChange={handleFiltersChange}
                    isMobile={true}
                    onClose={closeMobileFilters}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Desktop Filter Overlay */}
          {showDesktopFilters && (
            <div className="hidden lg:block fixed inset-0 z-50" onClick={() => setShowDesktopFilters(false)}>
              <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setShowDesktopFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="h-[calc(100vh-80px)] overflow-y-auto">
                  <AdvancedSearch
                    category={category}
                    onSearchResults={handleSearchResults}
                    onFiltersChange={handleFiltersChange}
                    isMobile={false}
                    onClose={() => setShowDesktopFilters(false)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Products Section */}
          <div className="flex-1 p-4 lg:p-6">
            {/* Header */}
            <ProductResultsHeader
              categoryData={categoryData}
              category={category}
              filteredProducts={filteredProducts}
              products={products}
              isSearchActive={isSearchActive}
              searchQuery={searchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              showAllProducts={!category}
            />

            {/* SearchQuery Component with Filters Button */}
            <div className="mb-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <SearchQuery
                    searchData={category ? searchData.filter(item => 
                      item.type === 'product' && item.category === category ||
                      item.type === 'category' && item.subcategory === category
                    ) : searchData}
                    onSearchSelect={handleSearchSelect}
                    placeholder={category ? `Search ${categoryData?.name}...` : "Search all products..."}
                    showFilters={true}
                    className="w-full"
                    searchFields={['title', 'description', 'content', 'tags', 'category', 'subcategory', 'author', 'brand']}
                    resultLimit={20}
                  />
                </div>
                <button
                  onClick={window.innerWidth >= 1024 ? toggleDesktopFilters : toggleMobileFilters}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <Filter size={20} />
                  <span className="hidden sm:inline">Filters</span>
                </button>
              </div>
            </div>

            {/* Products Display */}
            <ProductDisplay
              products={filteredProducts}
              viewMode={viewMode}
              onToggleFavorite={handleToggleFavorite}
              onQuickView={handleQuickView}
              loading={loading}
              enableVirtualization={true}
              virtualizationThreshold={50}
            />

            {/* Load More Button */}
            <LoadMoreButton
              hasMore={hasMore}
              loading={loading}
              onLoadMore={loadMoreProducts}
            />

            {/* Clear Filters Button */}
            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-12">
                <button
                  onClick={clearFilters}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
            
            {/* Patreon Support Section */}
            <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-8 border border-orange-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-orange-500 mr-2" />
                  Love Our Mods?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  All our mods are completely free! If you enjoy our work and want to support us in creating more amazing InZoi mods, 
                  consider becoming a patron. Your support helps us continue providing high-quality mods to the community.
                </p>
                <a
                  href="https://www.patreon.com/MOOSTYLES"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-semibold text-lg"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Support on Patreon
                </a>
              </div>
            </div>
          </div>
          </div>
        </main>
      </div>

    </>
  );
};
