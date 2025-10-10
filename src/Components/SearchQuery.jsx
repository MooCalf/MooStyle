import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Clock, Tag, Folder, User, Calendar, Filter, TrendingUp, Star, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchQuery = ({ 
  searchData = [], 
  onSearchSelect, 
  placeholder = "Search...",
  showFilters = true,
  className = "",
  searchFields = ['title', 'content', 'tags', 'category', 'author'],
  resultLimit = 10,
  iconOnly = false
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    tags: 'all',
    dateRange: 'all',
    author: 'all'
  });
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Advanced search utilities
  const normalizeText = (text) => {
    if (!text) return '';
    return text.toString().toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Remove special characters
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  };

  const getWordStems = (text) => {
    const words = normalizeText(text).split(' ');
    const stems = new Set();
    
    words.forEach(word => {
      if (word.length > 2) {
        stems.add(word);
        // Add common word variations
        if (word.endsWith('ing')) stems.add(word.slice(0, -3));
        if (word.endsWith('ed')) stems.add(word.slice(0, -2));
        if (word.endsWith('s') && word.length > 3) stems.add(word.slice(0, -1));
        if (word.endsWith('ly')) stems.add(word.slice(0, -2));
        if (word.endsWith('er')) stems.add(word.slice(0, -2));
        if (word.endsWith('est')) stems.add(word.slice(0, -3));
      }
    });
    
    return Array.from(stems);
  };

  const calculateSimilarity = (text1, text2) => {
    const normalized1 = normalizeText(text1);
    const normalized2 = normalizeText(text2);
    
    if (normalized1 === normalized2) return 1;
    
    // Exact substring match
    if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) {
      return 0.9;
    }
    
    // Word overlap
    const words1 = normalized1.split(' ');
    const words2 = normalized2.split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    const similarity = commonWords.length / Math.max(words1.length, words2.length);
    
    return similarity;
  };

  const fuzzyMatch = (text, searchTerm) => {
    const normalizedText = normalizeText(text);
    const normalizedSearch = normalizeText(searchTerm);
    
    // Exact match
    if (normalizedText === normalizedSearch) return 1;
    
    // Contains match
    if (normalizedText.includes(normalizedSearch)) return 0.8;
    
    // Word-by-word fuzzy matching
    const searchWords = normalizedSearch.split(' ');
    const textWords = normalizedText.split(' ');
    
    let matchScore = 0;
    let totalWords = searchWords.length;
    
    searchWords.forEach(searchWord => {
      if (searchWord.length < 2) return;
      
      let bestMatch = 0;
      textWords.forEach(textWord => {
        if (textWord.includes(searchWord) || searchWord.includes(textWord)) {
          bestMatch = Math.max(bestMatch, 0.7);
        } else {
          // Character similarity for typos
          const similarity = calculateSimilarity(searchWord, textWord);
          if (similarity > 0.6) {
            bestMatch = Math.max(bestMatch, similarity * 0.6);
          }
        }
      });
      
      matchScore += bestMatch;
    });
    
    return matchScore / totalWords;
  };

  const phraseMatch = (text, searchTerm) => {
    const normalizedText = normalizeText(text);
    const normalizedSearch = normalizeText(searchTerm);
    
    // Check for phrase matches
    const phrases = normalizedSearch.split(/[,\-&]/).map(p => p.trim()).filter(p => p.length > 0);
    
    let maxScore = 0;
    phrases.forEach(phrase => {
      if (phrase.length > 2) {
        const score = fuzzyMatch(normalizedText, phrase);
        maxScore = Math.max(maxScore, score);
      }
    });
    
    return maxScore;
  };

  const getSearchScore = (item, searchTerm) => {
    let totalScore = 0;
    let fieldWeights = {
      title: 3,
      tags: 2.5,
      category: 2,
      author: 1.5,
      content: 1,
      description: 1,
      excerpt: 1.5
    };
    
    searchFields.forEach(field => {
      const fieldValue = item[field];
      if (!fieldValue) return;
      
      let fieldScore = 0;
      
      if (Array.isArray(fieldValue)) {
        // Handle array fields (like tags)
        fieldValue.forEach(val => {
          const fuzzyScore = fuzzyMatch(val, searchTerm);
          const phraseScore = phraseMatch(val, searchTerm);
          fieldScore = Math.max(fieldScore, Math.max(fuzzyScore, phraseScore));
        });
      } else {
        // Handle string fields
        const fuzzyScore = fuzzyMatch(fieldValue, searchTerm);
        const phraseScore = phraseMatch(fieldValue, searchTerm);
        fieldScore = Math.max(fuzzyScore, phraseScore);
      }
      
      totalScore += fieldScore * (fieldWeights[field] || 1);
    });
    
    return totalScore;
  };

  // Extract unique values for filters
  const categories = ['all', ...new Set(searchData.map(item => item.category).filter(Boolean))];
  const tags = ['all', ...new Set(searchData.flatMap(item => item.tags || []).filter(Boolean))];
  const authors = ['all', ...new Set(searchData.map(item => item.author).filter(Boolean))];
  const dateRanges = [
    'all',
    'today',
    'this week',
    'this month',
    'this year',
    'older'
  ];

  // Generate search suggestions
  const generateSuggestions = useMemo(() => {
    if (!query || query.length < 2) return [];
    
    const suggestions = new Set();
    const queryWords = normalizeText(query).split(' ');
    
    searchData.forEach(item => {
      searchFields.forEach(field => {
        const fieldValue = item[field];
        if (!fieldValue) return;
        
        if (Array.isArray(fieldValue)) {
          fieldValue.forEach(val => {
            const words = normalizeText(val).split(' ');
            words.forEach(word => {
              if (word.length > 2 && queryWords.some(qw => word.includes(qw) || qw.includes(word))) {
                suggestions.add(word);
              }
            });
          });
        } else {
          const words = normalizeText(fieldValue).split(' ');
          words.forEach(word => {
            if (word.length > 2 && queryWords.some(qw => word.includes(qw) || qw.includes(word))) {
              suggestions.add(word);
            }
          });
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 8);
  }, [query, searchData, searchFields]);

  // Enhanced search function
  const performSearch = (searchTerm, filters = selectedFilters) => {
    if (!searchTerm.trim()) {
      setFilteredResults([]);
      setSearchSuggestions([]);
      return;
    }

    const normalizedSearch = normalizeText(searchTerm);
    
    // Score and filter results
    const scoredResults = searchData
      .map(item => ({
        ...item,
        score: getSearchScore(item, searchTerm)
      }))
      .filter(item => {
        // Apply filters
        const categoryMatch = filters.category === 'all' || 
                             item.category === filters.category;
        const tagMatch = filters.tags === 'all' || 
                        (item.tags && item.tags.includes(filters.tags));
        const authorMatch = filters.author === 'all' || 
                           item.author === filters.author;
        const dateMatch = filters.dateRange === 'all' || 
                         checkDateRange(item.date, filters.dateRange);
        
        return item.score > 0 && categoryMatch && tagMatch && authorMatch && dateMatch;
      })
      .sort((a, b) => {
        // Sort by score, then by date (newer first)
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.date || 0) - new Date(a.date || 0);
      });

    setFilteredResults(scoredResults.slice(0, resultLimit));
    setSearchSuggestions(generateSuggestions);
  };

  // Check if date falls within range
  const checkDateRange = (dateString, range) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (range) {
      case 'today':
        return date >= today;
      case 'this week':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return date >= weekAgo;
      case 'this month':
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return date >= monthAgo;
      case 'this year':
        const yearAgo = new Date(today);
        yearAgo.setFullYear(yearAgo.getFullYear() - 1);
        return date >= yearAgo;
      case 'older':
        const yearAgoOlder = new Date(today);
        yearAgoOlder.setFullYear(yearAgoOlder.getFullYear() - 1);
        return date < yearAgoOlder;
      default:
        return true;
    }
  };

  // Handle search input with debouncing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
    
    // Debounce search
    clearTimeout(searchRef.current?.timeout);
    searchRef.current = searchRef.current || {};
    searchRef.current.timeout = setTimeout(() => {
      performSearch(value);
    }, 150);
  };

  // Handle icon click to expand search
  const handleIconClick = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Handle search box collapse
  const handleCollapse = () => {
    setIsExpanded(false);
    setIsOpen(false);
    setQuery('');
    setFilteredResults([]);
    setShowSuggestions(false);
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(newFilters);
    performSearch(query, newFilters);
  };

  // Handle search result selection
  const handleResultSelect = (result) => {
    // Add to recent searches
    const newRecent = [result, ...recentSearches.filter(item => item.id !== result.id)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));

    // Update popular searches
    const searchKey = `${result.type}-${result.id}`;
    const popular = JSON.parse(localStorage.getItem('popularSearches') || '{}');
    popular[searchKey] = (popular[searchKey] || 0) + 1;
    localStorage.setItem('popularSearches', JSON.stringify(popular));

    // Call parent callback
    if (onSearchSelect) {
      onSearchSelect(result);
    }

    // Close search
    setIsOpen(false);
    setQuery('');
    setFilteredResults([]);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    setQuery(suggestion);
    performSearch(suggestion);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredResults.length > 0) {
      handleResultSelect(filteredResults[0]);
    }
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setFilteredResults([]);
    setShowSuggestions(false);
    if (iconOnly) {
      handleCollapse();
    } else {
      inputRef.current?.focus();
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedFilters({
      category: 'all',
      tags: 'all',
      dateRange: 'all',
      author: 'all'
    });
    performSearch(query, {
      category: 'all',
      tags: 'all',
      dateRange: 'all',
      author: 'all'
    });
  };

  // Load recent searches and popular searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading recent searches:', e);
      }
    }

    const popular = localStorage.getItem('popularSearches');
    if (popular) {
      try {
        const popularData = JSON.parse(popular);
        const sortedPopular = Object.entries(popularData)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([key]) => {
            const [type, id] = key.split('-');
            return searchData.find(item => item.type === type && item.id === id);
          })
          .filter(Boolean);
        setPopularSearches(sortedPopular);
      } catch (e) {
        console.error('Error loading popular searches:', e);
      }
    }
  }, [searchData]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowSuggestions(false);
        if (iconOnly) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [iconOnly]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get result type icon
  const getResultIcon = (result) => {
    switch (result.type) {
      case 'blog':
        return <Folder className="w-4 h-4 text-blue-500" />;
      case 'product':
        return <Tag className="w-4 h-4 text-green-500" />;
      case 'user':
        return <User className="w-4 h-4 text-purple-500" />;
      case 'page':
        return <Search className="w-4 h-4 text-orange-500" />;
      default:
        return <Search className="w-4 h-4 text-gray-500" />;
    }
  };

  // Get result type color
  const getResultColor = (result) => {
    switch (result.type) {
      case 'blog':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'product':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'user':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'page':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  // Highlight search terms in text
  const highlightText = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Icon Only Mode */}
      {iconOnly && !isExpanded && (
        <motion.button
          onClick={handleIconClick}
          className="nav-primary-icon"
          aria-label="Search"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search size={18} className="sm:w-5 sm:h-5" />
        </motion.button>
      )}

      {/* Expanded Search Mode */}
      <AnimatePresence>
        {(!iconOnly || isExpanded) && (
          <motion.div
            className="relative"
            initial={iconOnly ? { width: 0, opacity: 0 } : false}
            animate={{ width: "auto", opacity: 1 }}
            exit={iconOnly ? { width: 0, opacity: 0 } : false}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleSearchChange}
                  onFocus={() => setIsOpen(true)}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                {iconOnly && (
                  <button
                    type="button"
                    onClick={handleCollapse}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {isOpen && (query || recentSearches.length > 0 || popularSearches.length > 0) && (
                <motion.div
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Search Suggestions */}
                  {query && searchSuggestions.length > 0 && (
                    <div className="p-2 border-b border-gray-200 bg-gray-50">
                      <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center space-x-2">
                        <Zap className="w-3 h-3" />
                        <span>Suggestions</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {searchSuggestions.slice(0, 6).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionSelect(suggestion)}
                            className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full hover:bg-teal-200 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Filters */}
                  {showFilters && query && (
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <div className="flex items-center space-x-2">
                          <Filter className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Filters:</span>
                        </div>
                        <select
                          value={selectedFilters.category}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-teal-500"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>
                              {cat === 'all' ? 'All Categories' : cat}
                            </option>
                          ))}
                        </select>
                        <select
                          value={selectedFilters.tags}
                          onChange={(e) => handleFilterChange('tags', e.target.value)}
                          className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-teal-500"
                        >
                          {tags.map(tag => (
                            <option key={tag} value={tag}>
                              {tag === 'all' ? 'All Tags' : `#${tag}`}
                            </option>
                          ))}
                        </select>
                        <select
                          value={selectedFilters.dateRange}
                          onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                          className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-teal-500"
                        >
                          {dateRanges.map(range => (
                            <option key={range} value={range}>
                              {range === 'all' ? 'All Time' : range}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={clearFilters}
                          className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Search Results */}
                  {query && (
                    <div className="p-2">
                      {filteredResults.length > 0 ? (
                        <>
                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center space-x-2">
                            <Search className="w-3 h-3" />
                            <span>Search Results ({filteredResults.length})</span>
                          </div>
                          {filteredResults.map((result, index) => (
                            <motion.button
                              key={`${result.id}-${index}`}
                              onClick={() => handleResultSelect(result)}
                              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                            >
                              <div className="flex items-start space-x-3">
                                {getResultIcon(result)}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="text-sm font-medium text-gray-900 truncate">
                                      {highlightText(result.title, query)}
                                    </h4>
                                    <span className={`text-xs px-2 py-1 rounded-full border ${getResultColor(result)}`}>
                                      {result.type || 'content'}
                                    </span>
                                    {result.score > 0.8 && (
                                      <Star className="w-3 h-3 text-yellow-500" />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                    {highlightText(result.excerpt || result.description || result.content?.substring(0, 100) + '...', query)}
                                  </p>
                                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                                    {result.category && (
                                      <span className="flex items-center space-x-1">
                                        <Folder className="w-3 h-3" />
                                        <span>{result.category}</span>
                                      </span>
                                    )}
                                    {result.author && (
                                      <span className="flex items-center space-x-1">
                                        <User className="w-3 h-3" />
                                        <span>{result.author}</span>
                                      </span>
                                    )}
                                    {result.date && (
                                      <span className="flex items-center space-x-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{formatDate(result.date)}</span>
                                      </span>
                                    )}
                                  </div>
                                  {result.tags && result.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {result.tags.slice(0, 3).map((tag, tagIndex) => (
                                        <span key={tagIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                          #{tag}
                                        </span>
                                      ))}
                                      {result.tags.length > 3 && (
                                        <span className="text-xs text-gray-500">+{result.tags.length - 3}</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </>
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">No results found for "{query}"</p>
                          <p className="text-xs text-gray-400 mt-1">Try different keywords, check spelling, or use filters</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Popular Searches */}
                  {!query && popularSearches.length > 0 && (
                    <div className="p-2 border-b border-gray-200">
                      <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center space-x-2">
                        <TrendingUp className="w-3 h-3" />
                        <span>Popular</span>
                      </div>
                      {popularSearches.map((result, index) => (
                        <motion.button
                          key={`popular-${result.id}-${index}`}
                          onClick={() => handleResultSelect(result)}
                          className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <div className="flex items-start space-x-3">
                            {getResultIcon(result)}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {result.title}
                              </h4>
                              <p className="text-xs text-gray-600 truncate">
                                {result.category} • {formatDate(result.date)}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Recent Searches */}
                  {!query && recentSearches.length > 0 && (
                    <div className="p-2">
                      <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center space-x-2">
                        <Clock className="w-3 h-3" />
                        <span>Recent Searches</span>
                      </div>
                      {recentSearches.map((result, index) => (
                        <motion.button
                          key={`recent-${result.id}-${index}`}
                          onClick={() => handleResultSelect(result)}
                          className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <div className="flex items-start space-x-3">
                            {getResultIcon(result)}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {result.title}
                              </h4>
                              <p className="text-xs text-gray-600 truncate">
                                {result.category} • {formatDate(result.date)}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchQuery;
