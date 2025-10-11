// Advanced Search Engine
// Industry-standard search functionality without external dependencies

/**
 * Advanced search engine with fuzzy matching, relevance scoring, and performance optimization
 */
export class AdvancedSearchEngine {
  constructor(searchData = [], options = {}) {
    // Validate searchData
    if (!Array.isArray(searchData)) {
      console.warn('AdvancedSearchEngine: searchData must be an array, received:', typeof searchData);
      this.searchData = [];
    } else {
      this.searchData = searchData;
    }
    
    this.options = {
      debounceMs: 150,
      maxResults: 50,
      fuzzyThreshold: 0.6,
      enableHighlighting: true,
      enableAnalytics: true,
      ...options
    };
    
    try {
      this.searchIndex = this.buildSearchIndex();
      this.searchCache = new Map();
      this.searchAnalytics = this.loadAnalytics();
      this.debounceTimer = null;
    } catch (error) {
      console.error('AdvancedSearchEngine initialization error:', error);
      // Initialize with empty data to prevent further errors
      this.searchIndex = {
        byType: new Map(),
        byCategory: new Map(),
        byTag: new Map(),
        byAuthor: new Map(),
        fullText: new Map(),
        ngrams: new Map()
      };
      this.searchCache = new Map();
      this.searchAnalytics = new Map();
      this.debounceTimer = null;
    }
  }

  /**
   * Build a search index for fast lookups
   */
  buildSearchIndex() {
    const index = {
      byType: new Map(),
      byCategory: new Map(),
      byTag: new Map(),
      byAuthor: new Map(),
      fullText: new Map(),
      ngrams: new Map()
    };

    // Add safety check for searchData
    if (!this.searchData || !Array.isArray(this.searchData)) {
      console.warn('buildSearchIndex: searchData is not a valid array');
      return index;
    }

    this.searchData.forEach((item, itemIndex) => {
      try {
        // Validate item has required properties
        if (!item || typeof item !== 'object') {
          console.warn(`buildSearchIndex: Invalid item at index ${itemIndex}:`, item);
          return;
        }

        // Index by type
        if (item.type) {
          if (!index.byType.has(item.type)) {
            index.byType.set(item.type, []);
          }
          index.byType.get(item.type).push(item);
        }

        // Index by category
        if (item.category) {
          if (!index.byCategory.has(item.category)) {
            index.byCategory.set(item.category, []);
          }
          index.byCategory.get(item.category).push(item);
        }

        // Index by tags
        if (item.tags && Array.isArray(item.tags)) {
          item.tags.forEach(tag => {
            if (tag && typeof tag === 'string') {
              if (!index.byTag.has(tag.toLowerCase())) {
                index.byTag.set(tag.toLowerCase(), []);
              }
              index.byTag.get(tag.toLowerCase()).push(item);
            }
          });
        }

        // Index by author
        if (item.author) {
          if (!index.byAuthor.has(item.author.toLowerCase())) {
            index.byAuthor.set(item.author.toLowerCase(), []);
          }
          index.byAuthor.get(item.author.toLowerCase()).push(item);
        }

        // Build full-text search index
        if (item.id) {
          const searchableText = this.extractSearchableText(item);
          index.fullText.set(item.id, searchableText);

          // Build n-gram index for fuzzy matching
          this.buildNgrams(item, index.ngrams);
        }
      } catch (itemError) {
        console.error(`buildSearchIndex: Error processing item at index ${itemIndex}:`, itemError, item);
      }
    });

    return index;
  }

  /**
   * Extract all searchable text from an item
   */
  extractSearchableText(item) {
    if (!item || typeof item !== 'object') {
      return '';
    }

    const text = [
      item.title || '',
      item.description || '',
      item.content || '',
      item.excerpt || '',
      item.author || '',
      item.brand || '',
      ...(Array.isArray(item.tags) ? item.tags : [])
    ].join(' ').toLowerCase();

    return this.normalizeText(text);
  }

  /**
   * Normalize text for searching
   */
  normalizeText(text) {
    if (!text || typeof text !== 'string') {
      return '';
    }

    return text
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Build n-grams for fuzzy matching
   */
  buildNgrams(item, ngramsMap) {
    try {
      if (!item || !ngramsMap || !(ngramsMap instanceof Map)) {
        console.warn('buildNgrams: Invalid parameters');
        return;
      }

      const text = this.extractSearchableText(item);
      if (!text) return;

      const words = text.split(' ');
      
      words.forEach(word => {
        if (word && word.length > 2) {
          // Generate 2-grams and 3-grams
          for (let n = 2; n <= Math.min(3, word.length); n++) {
            for (let i = 0; i <= word.length - n; i++) {
              const gram = word.substring(i, i + n);
              if (gram) {
                if (!ngramsMap.has(gram)) {
                  ngramsMap.set(gram, []);
                }
                ngramsMap.get(gram).push(item.id);
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('buildNgrams error:', error, item);
    }
  }

  /**
   * Calculate Levenshtein distance for fuzzy matching
   */
  levenshteinDistance(str1, str2) {
    const matrix = Array(str2.length + 1).fill(null).map(() => 
      Array(str1.length + 1).fill(null)
    );

    for (let i = 0; i <= str1.length; i++) {
      matrix[0][i] = i;
    }

    for (let j = 0; j <= str2.length; j++) {
      matrix[j][0] = j;
    }

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Calculate fuzzy match score
   */
  calculateFuzzyScore(query, text) {
    const queryWords = query.toLowerCase().split(' ');
    const textWords = text.toLowerCase().split(' ');
    
    let totalScore = 0;
    let matches = 0;

    queryWords.forEach(queryWord => {
      let bestScore = 0;
      textWords.forEach(textWord => {
        if (textWord.includes(queryWord)) {
          bestScore = Math.max(bestScore, 1);
        } else {
          const distance = this.levenshteinDistance(queryWord, textWord);
          const maxLength = Math.max(queryWord.length, textWord.length);
          const similarity = 1 - (distance / maxLength);
          if (similarity >= this.options.fuzzyThreshold) {
            bestScore = Math.max(bestScore, similarity);
          }
        }
      });
      if (bestScore > 0) {
        totalScore += bestScore;
        matches++;
      }
    });

    return matches > 0 ? totalScore / queryWords.length : 0;
  }

  /**
   * Calculate relevance score for search results
   */
  calculateRelevanceScore(item, query, matchType) {
    let score = 0;
    const queryLower = query.toLowerCase();
    const title = (item.title || '').toLowerCase();
    const description = (item.description || '').toLowerCase();
    const content = (item.content || '').toLowerCase();
    const tags = (item.tags || []).map(tag => tag.toLowerCase());

    // Exact title match (highest priority)
    if (title.includes(queryLower)) {
      score += 100;
      if (title.startsWith(queryLower)) score += 50;
    }

    // Exact description match
    if (description.includes(queryLower)) {
      score += 50;
    }

    // Content match
    if (content.includes(queryLower)) {
      score += 25;
    }

    // Tag match
    tags.forEach(tag => {
      if (tag.includes(queryLower)) {
        score += 30;
      }
    });

    // Fuzzy matching bonus
    if (matchType === 'fuzzy') {
      score *= 0.8; // Reduce score for fuzzy matches
    }

    // Type-based scoring
    switch (item.type) {
      case 'product':
        score += 20;
        break;
      case 'category':
        score += 15;
        break;
      case 'page':
        score += 10;
        break;
      case 'blog':
        score += 5;
        break;
    }

    // Popularity bonus (based on analytics)
    const popularity = this.searchAnalytics.get(item.id) || 0;
    score += Math.min(popularity * 2, 20);

    // Recency bonus
    if (item.date) {
      const daysSinceCreated = (Date.now() - new Date(item.date).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceCreated < 30) {
        score += 10;
      }
    }

    return Math.max(score, 0);
  }

  /**
   * Perform advanced search with debouncing
   */
  search(query, options = {}) {
    return new Promise((resolve) => {
      // Clear previous debounce timer
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }

      // Debounce the search
      this.debounceTimer = setTimeout(() => {
        const results = this.performSearch(query, options);
        resolve(results);
      }, this.options.debounceMs);
    });
  }

  /**
   * Perform the actual search
   */
  performSearch(query, options = {}) {
    if (!query || query.trim().length < 1) {
      return [];
    }

    const normalizedQuery = this.normalizeText(query);
    const cacheKey = `${normalizedQuery}-${JSON.stringify(options)}`;

    // Check cache first
    if (this.searchCache.has(cacheKey)) {
      return this.searchCache.get(cacheKey);
    }

    const results = [];
    const queryWords = normalizedQuery.split(' ');

    // Track search analytics
    if (this.options.enableAnalytics) {
      this.trackSearch(query);
    }

    // Search through all items
    this.searchData.forEach(item => {
      const searchableText = this.searchIndex.fullText.get(item.id);
      let matchScore = 0;
      let matchType = 'none';

      // Exact match
      if (searchableText.includes(normalizedQuery)) {
        matchScore = 1;
        matchType = 'exact';
      } else {
        // Fuzzy match
        matchScore = this.calculateFuzzyScore(normalizedQuery, searchableText);
        if (matchScore > 0) {
          matchType = 'fuzzy';
        }
      }

      // Word-by-word matching
      if (matchScore === 0) {
        let wordMatches = 0;
        queryWords.forEach(word => {
          if (searchableText.includes(word)) {
            wordMatches++;
          }
        });
        if (wordMatches > 0) {
          matchScore = wordMatches / queryWords.length;
          matchType = 'partial';
        }
      }

      if (matchScore > 0) {
        const relevanceScore = this.calculateRelevanceScore(item, normalizedQuery, matchType);
        results.push({
          ...item,
          matchScore,
          relevanceScore,
          matchType,
          searchQuery: query
        });
      }
    });

    // Sort by relevance score
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Apply filters
    const filteredResults = this.applyFilters(results, options);

    // Limit results
    const limitedResults = filteredResults.slice(0, this.options.maxResults);

    // Cache results
    this.searchCache.set(cacheKey, limitedResults);

    return limitedResults;
  }

  /**
   * Apply search filters
   */
  applyFilters(results, options) {
    let filtered = results;

    // Filter by type
    if (options.type && options.type !== 'all') {
      filtered = filtered.filter(item => item.type === options.type);
    }

    // Filter by category
    if (options.category && options.category !== 'all') {
      filtered = filtered.filter(item => item.category === options.category);
    }

    // Filter by tags
    if (options.tags && options.tags.length > 0) {
      filtered = filtered.filter(item => 
        item.tags && item.tags.some(tag => 
          options.tags.includes(tag.toLowerCase())
        )
      );
    }

    // Filter by author
    if (options.author && options.author !== 'all') {
      filtered = filtered.filter(item => 
        item.author && item.author.toLowerCase().includes(options.author.toLowerCase())
      );
    }

    // Filter by date range
    if (options.dateRange && options.dateRange !== 'all') {
      const now = new Date();
      const daysAgo = {
        'week': 7,
        'month': 30,
        'year': 365
      }[options.dateRange];

      if (daysAgo) {
        const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
        filtered = filtered.filter(item => 
          item.date && new Date(item.date) >= cutoffDate
        );
      }
    }

    return filtered;
  }

  /**
   * Get search suggestions
   */
  getSuggestions(query, limit = 10) {
    if (!query || query.length < 2) {
      return [];
    }

    const suggestions = new Set();
    const queryLower = query.toLowerCase();

    // Get suggestions from titles
    this.searchData.forEach(item => {
      const title = (item.title || '').toLowerCase();
      if (title.includes(queryLower)) {
        suggestions.add(item.title);
      }
    });

    // Get suggestions from tags
    this.searchData.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => {
          if (tag.toLowerCase().includes(queryLower)) {
            suggestions.add(tag);
          }
        });
      }
    });

    // Get suggestions from categories
    this.searchData.forEach(item => {
      if (item.category && item.category.toLowerCase().includes(queryLower)) {
        suggestions.add(item.category);
      }
    });

    return Array.from(suggestions).slice(0, limit);
  }

  /**
   * Highlight search terms in text
   */
  highlightText(text, query) {
    if (!this.options.enableHighlighting || !query) {
      return text;
    }

    const queryWords = query.split(' ').filter(word => word.length > 1);
    let highlightedText = text;

    queryWords.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
    });

    return highlightedText;
  }

  /**
   * Track search analytics
   */
  trackSearch(query) {
    const searches = this.searchAnalytics.get('searches') || [];
    searches.push({
      query,
      timestamp: Date.now(),
      results: 0 // Will be updated when results are clicked
    });

    // Keep only last 100 searches
    if (searches.length > 100) {
      searches.splice(0, searches.length - 100);
    }

    this.searchAnalytics.set('searches', searches);
    this.saveAnalytics();
  }

  /**
   * Track result click
   */
  trackResultClick(itemId, query) {
    const clicks = this.searchAnalytics.get(itemId) || 0;
    this.searchAnalytics.set(itemId, clicks + 1);

    // Update search result count
    const searches = this.searchAnalytics.get('searches') || [];
    const lastSearch = searches[searches.length - 1];
    if (lastSearch && lastSearch.query === query) {
      lastSearch.results = (lastSearch.results || 0) + 1;
    }

    this.saveAnalytics();
  }

  /**
   * Load analytics from localStorage
   */
  loadAnalytics() {
    try {
      const stored = localStorage.getItem('searchAnalytics');
      return stored ? new Map(JSON.parse(stored)) : new Map();
    } catch (error) {
      console.warn('Failed to load search analytics:', error);
      return new Map();
    }
  }

  /**
   * Save analytics to localStorage
   */
  saveAnalytics() {
    try {
      const serialized = JSON.stringify(Array.from(this.searchAnalytics.entries()));
      localStorage.setItem('searchAnalytics', serialized);
    } catch (error) {
      console.warn('Failed to save search analytics:', error);
    }
  }

  /**
   * Get search analytics
   */
  getAnalytics() {
    return {
      searches: this.searchAnalytics.get('searches') || [],
      popularItems: Array.from(this.searchAnalytics.entries())
        .filter(([key]) => key !== 'searches')
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([itemId, clicks]) => ({
          itemId,
          clicks,
          item: this.searchData.find(item => item.id === itemId)
        }))
    };
  }

  /**
   * Clear search cache
   */
  clearCache() {
    this.searchCache.clear();
  }

  /**
   * Update search data
   */
  updateSearchData(newData) {
    this.searchData = newData;
    this.searchIndex = this.buildSearchIndex();
    this.clearCache();
  }
}

// Export singleton instance
export const searchEngine = new AdvancedSearchEngine();
