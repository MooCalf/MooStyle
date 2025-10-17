import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { NavigationPrimary } from "@/Components/NavigationPrimary";
import { NavigationSecondary } from "@/Components/NavigationSecondary";
import { AdvancedSearch } from "@/Components/AdvancedSearch";
import SearchQuery from "@/Components/SearchQuery";
import { ProductCard } from "@/Components/ProductCard";
import { getCategoryData, getProductsByCategory, searchProducts, getAllProducts } from "@/lib/shoppingData";
import { getGlobalSearchData } from "@/lib/globalSearchData";
import { Metadata } from "@/Components/Metadata.jsx";
import { Loader2, Grid, List, Star, Heart } from "lucide-react";

export const Shopping = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const itemsPerPage = 12;
  const categoryData = getCategoryData(category);

  // Prepare search data for SearchQuery component - use global search data
  const searchData = getGlobalSearchData();

  useEffect(() => {
    if (category && categoryData) {
      setLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        const categoryProducts = getProductsByCategory(category);
        setProducts(categoryProducts);
        setFilteredProducts(categoryProducts.slice(0, itemsPerPage));
        setCurrentPage(1);
        setHasMore(categoryProducts.length > itemsPerPage);
        setLoading(false);
      }, 500);
    } else if (!category) {
      // Handle case when no category is provided (e.g., /shopping)
      setLoading(true);
      setTimeout(() => {
        const allProducts = getAllProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts.slice(0, itemsPerPage));
        setCurrentPage(1);
        setHasMore(allProducts.length > itemsPerPage);
        setLoading(false);
      }, 500);
    } else {
      navigate("/");
    }
  }, [category, navigate]);

  const handleSearchResults = (results) => {
    setFilteredProducts(results.slice(0, itemsPerPage));
    setCurrentPage(1);
    setHasMore(results.length > itemsPerPage);
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

  // Handle SearchQuery search
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearchActive(true);
      // Use the existing searchProducts function
      const results = searchProducts(query, { ...filters, category });
      setSearchResults(results);
      setFilteredProducts(results.slice(0, itemsPerPage));
      setCurrentPage(1);
      setHasMore(results.length > itemsPerPage);
    } else {
      setIsSearchActive(false);
      setSearchResults([]);
      // Reset to original products
      const originalProducts = category ? getProductsByCategory(category) : getAllProducts();
      setFilteredProducts(originalProducts.slice(0, itemsPerPage));
      setCurrentPage(1);
      setHasMore(originalProducts.length > itemsPerPage);
    }
  };

  const loadMoreProducts = () => {
    if (!hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newProducts = products.slice(startIndex, endIndex);
      
      setFilteredProducts(prev => [...prev, ...newProducts]);
      setCurrentPage(prev => prev + 1);
      setHasMore(endIndex < products.length);
      setLoading(false);
    }, 300);
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
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="page-title capitalize">
                    {category ? categoryData.name : "All Products"}
                  </h1>
                  <p className="page-description">
                    {category ? categoryData.description : "Discover amazing products from all categories"}
                  </p>
                </div>
                
                {/* View Mode Toggle */}
                <div className="view-toggle">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`view-toggle-button ${viewMode === "grid" ? "active" : ""}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`view-toggle-button ${viewMode === "list" ? "active" : ""}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

              {/* SearchQuery Component */}
              <div className="mb-4">
                <SearchQuery
                  searchData={searchData}
                  onSearchSelect={handleSearchSelect}
                  placeholder={`Search ${category ? categoryData.name : 'all products'}...`}
                  showFilters={true}
                  className="w-full"
                  searchFields={['title', 'description', 'content', 'tags', 'category', 'subcategory', 'author', 'brand']}
                  resultLimit={20}
                />
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600">
                {isSearchActive ? (
                  <>Showing {filteredProducts.length} search results for "{searchQuery}"</>
                ) : (
                  <>Showing {filteredProducts.length} of {products.length} products</>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {loading && filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={32} className="animate-spin text-teal-600" />
                <span className="ml-3 text-gray-600">Loading products...</span>
              </div>
            ) : (
              <>
                <div className={`${
                  viewMode === "grid" 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                    : "space-y-3"
                }`}>
                  {filteredProducts.map((product) => (
                    viewMode === "grid" ? (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onToggleFavorite={handleToggleFavorite}
                        onQuickView={handleQuickView}
                      />
            ) : (
              <div key={product.id} className="list-item">
                <div className="flex items-center gap-4">
                  {/* Small Product Image */}
                  <div className="list-item-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZTwvdGV4dD48L3N2Zz4=";
                      }}
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="list-item-content">
                    <h3 className="list-item-title">{product.name}</h3>
                    <p className="list-item-description">{product.description}</p>
                    <div className="list-item-meta">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span>({product.reviewCount})</span>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-semibold text-gray-900">${product.price}</div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="list-item-actions">
                    <button
                      onClick={() => handleToggleFavorite(product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Heart size={16} />
                    </button>
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="btn-primary text-sm"
                    >
                      View Details
                    </button>
                  </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-8">
                    <button
                      onClick={loadMoreProducts}
                      disabled={loading}
                      className="bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Load More Products"
                      )}
                    </button>
                  </div>
                )}

                {/* No Results */}
                {filteredProducts.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Grid size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search criteria or filters
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setFilters({});
                        setFilteredProducts(products.slice(0, itemsPerPage));
                      }}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
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
