// Advanced Search Filters Component
// Industry-standard faceted search with multiple filter types

import React, { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Star, Calendar, User, Tag, Folder } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedSearchFilters = ({ 
  searchData = [], 
  onFiltersChange, 
  className = "",
  showFilters = true 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    category: true,
    tags: true,
    author: true,
    dateRange: true,
    rating: true
  });

  const [selectedFilters, setSelectedFilters] = useState({
    type: 'all',
    category: 'all',
    tags: [],
    author: 'all',
    dateRange: 'all',
    rating: 'all'
  });

  // Extract filter options from search data
  const filterOptions = React.useMemo(() => {
    const types = [...new Set(searchData.map(item => item.type))].filter(Boolean);
    const categories = [...new Set(searchData.map(item => item.category))].filter(Boolean);
    const authors = [...new Set(searchData.map(item => item.author))].filter(Boolean);
    const tags = [...new Set(searchData.flatMap(item => item.tags || []))].filter(Boolean);
    
    // Get rating distribution
    const ratings = searchData
      .filter(item => item.rating)
      .map(item => Math.floor(item.rating))
      .reduce((acc, rating) => {
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
      }, {});

    return { types, categories, authors, tags, ratings };
  }, [searchData]);

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...selectedFilters };
    
    if (filterType === 'tags') {
      // Handle multi-select for tags
      if (selectedFilters.tags.includes(value)) {
        newFilters.tags = selectedFilters.tags.filter(tag => tag !== value);
      } else {
        newFilters.tags = [...selectedFilters.tags, value];
      }
    } else {
      newFilters[filterType] = value;
    }
    
    setSelectedFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    const clearedFilters = {
      type: 'all',
      category: 'all',
      tags: [],
      author: 'all',
      dateRange: 'all',
      rating: 'all'
    };
    setSelectedFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return selectedFilters.type !== 'all' ||
           selectedFilters.category !== 'all' ||
           selectedFilters.tags.length > 0 ||
           selectedFilters.author !== 'all' ||
           selectedFilters.dateRange !== 'all' ||
           selectedFilters.rating !== 'all';
  };

  // Get filter count for a section
  const getFilterCount = (filterType) => {
    switch (filterType) {
      case 'tags':
        return selectedFilters.tags.length;
      default:
        return selectedFilters[filterType] !== 'all' ? 1 : 0;
    }
  };

  if (!showFilters) return null;

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Filter className="w-5 h-5 mr-2 text-teal-600" />
            Filters
          </h3>
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>
        {hasActiveFilters() && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedFilters.type !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-teal-100 text-teal-800">
                Type: {selectedFilters.type}
                <button
                  onClick={() => handleFilterChange('type', 'all')}
                  className="ml-1 hover:text-teal-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedFilters.category !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                Category: {selectedFilters.category}
                <button
                  onClick={() => handleFilterChange('category', 'all')}
                  className="ml-1 hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedFilters.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                Tag: {tag}
                <button
                  onClick={() => handleFilterChange('tags', tag)}
                  className="ml-1 hover:text-purple-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedFilters.author !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Author: {selectedFilters.author}
                <button
                  onClick={() => handleFilterChange('author', 'all')}
                  className="ml-1 hover:text-green-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedFilters.dateRange !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                Date: {selectedFilters.dateRange}
                <button
                  onClick={() => handleFilterChange('dateRange', 'all')}
                  className="ml-1 hover:text-orange-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedFilters.rating !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                Rating: {selectedFilters.rating}+ stars
                <button
                  onClick={() => handleFilterChange('rating', 'all')}
                  className="ml-1 hover:text-yellow-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Filter Sections */}
      <div className="p-4 space-y-4">
        {/* Type Filter */}
        <div className="filter-section">
          <button
            onClick={() => toggleSection('type')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-teal-600"
          >
            <div className="flex items-center">
              <Folder className="w-4 h-4 mr-2 text-gray-500" />
              Content Type
              {getFilterCount('type') > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-teal-100 text-teal-800 rounded-full">
                  {getFilterCount('type')}
                </span>
              )}
            </div>
            {expandedSections.type ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.type && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 space-y-1"
              >
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="all"
                    checked={selectedFilters.type === 'all'}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="mr-2 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">All Types</span>
                </label>
                {filterOptions.types.map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={selectedFilters.type === type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      className="mr-2 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{type}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category Filter */}
        <div className="filter-section">
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-teal-600"
          >
            <div className="flex items-center">
              <Folder className="w-4 h-4 mr-2 text-gray-500" />
              Category
              {getFilterCount('category') > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {getFilterCount('category')}
                </span>
              )}
            </div>
            {expandedSections.category ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.category && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 space-y-1"
              >
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedFilters.category === 'all'}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="mr-2 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">All Categories</span>
                </label>
                {filterOptions.categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedFilters.category === category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="mr-2 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{category}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tags Filter */}
        <div className="filter-section">
          <button
            onClick={() => toggleSection('tags')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-teal-600"
          >
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-gray-500" />
              Tags
              {getFilterCount('tags') > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                  {getFilterCount('tags')}
                </span>
              )}
            </div>
            {expandedSections.tags ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.tags && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 space-y-1 max-h-32 overflow-y-auto"
              >
                {filterOptions.tags.map(tag => (
                  <label key={tag} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters.tags.includes(tag)}
                      onChange={() => handleFilterChange('tags', tag)}
                      className="mr-2 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700">{tag}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Author Filter */}
        <div className="filter-section">
          <button
            onClick={() => toggleSection('author')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-teal-600"
          >
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2 text-gray-500" />
              Author
              {getFilterCount('author') > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  {getFilterCount('author')}
                </span>
              )}
            </div>
            {expandedSections.author ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.author && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 space-y-1"
              >
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="author"
                    value="all"
                    checked={selectedFilters.author === 'all'}
                    onChange={(e) => handleFilterChange('author', e.target.value)}
                    className="mr-2 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">All Authors</span>
                </label>
                {filterOptions.authors.map(author => (
                  <label key={author} className="flex items-center">
                    <input
                      type="radio"
                      name="author"
                      value={author}
                      checked={selectedFilters.author === author}
                      onChange={(e) => handleFilterChange('author', e.target.value)}
                      className="mr-2 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700">{author}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Date Range Filter */}
        <div className="filter-section">
          <button
            onClick={() => toggleSection('dateRange')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-teal-600"
          >
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              Date Range
              {getFilterCount('dateRange') > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                  {getFilterCount('dateRange')}
                </span>
              )}
            </div>
            {expandedSections.dateRange ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.dateRange && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 space-y-1"
              >
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="dateRange"
                    value="all"
                    checked={selectedFilters.dateRange === 'all'}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className="mr-2 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">All Time</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="dateRange"
                    value="week"
                    checked={selectedFilters.dateRange === 'week'}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className="mr-2 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">Past Week</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="dateRange"
                    value="month"
                    checked={selectedFilters.dateRange === 'month'}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className="mr-2 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">Past Month</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="dateRange"
                    value="year"
                    checked={selectedFilters.dateRange === 'year'}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className="mr-2 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">Past Year</span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Rating Filter */}
        <div className="filter-section">
          <button
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-teal-600"
          >
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-gray-500" />
              Rating
              {getFilterCount('rating') > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                  {getFilterCount('rating')}
                </span>
              )}
            </div>
            {expandedSections.rating ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.rating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 space-y-1"
              >
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value="all"
                    checked={selectedFilters.rating === 'all'}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="mr-2 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">All Ratings</span>
                </label>
                {[5, 4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={selectedFilters.rating === rating.toString()}
                      onChange={(e) => handleFilterChange('rating', e.target.value)}
                      className="mr-2 text-teal-600 focus:ring-teal-500"
                    />
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                        />
                      ))}
                      <span className="text-sm text-gray-700 ml-1">
                        {rating}+ stars
                        {filterOptions.ratings[rating] && (
                          <span className="text-gray-500"> ({filterOptions.ratings[rating]})</span>
                        )}
                      </span>
                    </div>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchFilters;
