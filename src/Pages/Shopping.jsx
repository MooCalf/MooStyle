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
import { Heart } from "lucide-react";

export const Shopping = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

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

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/")}
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
      <Metadata 
        pageTitle={`${categoryData.name} - MooStyle`}
        pageDescription={categoryData.description}
        ogTitle={`Shop ${categoryData.name} - Premium Asian Fashion & Beauty | MooStyle`}
        ogDescription={`Discover the latest ${categoryData.name.toLowerCase()} products at MooStyle. ${categoryData.description} Premium quality, authentic Asian style.`}
        ogImage={categoryData.image || "/projects/Brand Medias/Promotional Content/Promo Poster.png"}
        ogType="website"
        keywords={`${categoryData.name}, Asian fashion, Korean beauty, Japanese streetwear, ${categoryData.subcategories?.join(', ') || ''}, MooStyle`}
        category={categoryData}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bars */}
        <NavigationPrimary />
        <NavigationSecondary />

        {/* Main Content */}
        <div className="flex">
          {/* Advanced Search Sidebar */}
          <div className="w-80 flex-shrink-0">
            <AdvancedSearch
              category={category}
              onSearchResults={handleSearchResults}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Products Section */}
          <div className="flex-1 p-6">
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
            />

            {/* SearchQuery Component */}
            <div className="mb-4">
              <SearchQuery
                searchData={searchData.filter(item => 
                  !category || 
                  item.type === 'product' && item.category === category ||
                  item.type === 'category' && item.subcategory === category
                )}
                onSearchSelect={handleSearchSelect}
                placeholder={`Search ${category ? categoryData?.name : 'all products'}...`}
                showFilters={true}
                className="w-full"
                searchFields={['title', 'description', 'content', 'tags', 'category', 'subcategory', 'author', 'brand']}
                resultLimit={20}
              />
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
      </div>

    </>
  );
};
