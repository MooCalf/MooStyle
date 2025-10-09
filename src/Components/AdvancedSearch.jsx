import { useState, useEffect } from "react";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { getFilterOptions, searchProducts } from "@/lib/shoppingData";

export const AdvancedSearch = ({ category, onSearchResults, onFiltersChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    subcategory: "",
    priceRange: "",
    brand: "",
    rating: ""
  });
  const [expandedSections, setExpandedSections] = useState({
    subcategory: true,
    priceRange: true,
    brand: true,
    rating: true
  });

  const filterOptions = getFilterOptions(category);

  useEffect(() => {
    performSearch();
  }, [searchQuery, filters, category]);

  const performSearch = () => {
    const results = searchProducts(searchQuery, { ...filters, category });
    onSearchResults(results);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      subcategory: "",
      priceRange: "",
      brand: "",
      rating: ""
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "");

  return (
    <div className="advanced-search-container bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0">
      <div className="p-6">
        {/* Search Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Search & Filter</h2>
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-700">Advanced Filters</span>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
                  {Object.values(filters).filter(v => v !== "").length}
                </span>
              )}
              {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-6">
            {/* Subcategory Filter */}
            <div className="filter-section">
              <button
                onClick={() => toggleSection('subcategory')}
                className="w-full flex items-center justify-between mb-3"
              >
                <h3 className="font-medium text-gray-900">Category</h3>
                {expandedSections.subcategory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {expandedSections.subcategory && (
                <div className="space-y-2">
                  {filterOptions.subcategories.map((subcategory) => (
                    <label key={subcategory} className="flex items-center">
                      <input
                        type="radio"
                        name="subcategory"
                        value={subcategory}
                        checked={filters.subcategory === subcategory}
                        onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                        className="mr-3 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700">{subcategory}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="filter-section">
              <button
                onClick={() => toggleSection('priceRange')}
                className="w-full flex items-center justify-between mb-3"
              >
                <h3 className="font-medium text-gray-900">Price Range</h3>
                {expandedSections.priceRange ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {expandedSections.priceRange && (
                <div className="space-y-2">
                  {filterOptions.priceRanges.map((range) => (
                    <label key={range.value} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range.value}
                        checked={filters.priceRange === range.value}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                        className="mr-3 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Brand Filter */}
            <div className="filter-section">
              <button
                onClick={() => toggleSection('brand')}
                className="w-full flex items-center justify-between mb-3"
              >
                <h3 className="font-medium text-gray-900">Brand</h3>
                {expandedSections.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {expandedSections.brand && (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filterOptions.brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={filters.brand === brand}
                        onChange={(e) => handleFilterChange('brand', e.target.value)}
                        className="mr-3 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Rating Filter */}
            <div className="filter-section">
              <button
                onClick={() => toggleSection('rating')}
                className="w-full flex items-center justify-between mb-3"
              >
                <h3 className="font-medium text-gray-900">Rating</h3>
                {expandedSections.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {expandedSections.rating && (
                <div className="space-y-2">
                  {filterOptions.ratings.map((rating) => (
                    <label key={rating.value} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating.value}
                        checked={filters.rating === rating.value}
                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                        className="mr-3 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700">{rating.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <X size={16} />
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
