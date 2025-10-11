// API Caching Utility
// Provides intelligent caching for API calls with TTL and invalidation

/**
 * Cache entry structure
 * @typedef {Object} CacheEntry
 * @property {*} data - Cached data
 * @property {number} timestamp - Cache creation timestamp
 * @property {number} ttl - Time to live in milliseconds
 * @property {string} key - Cache key
 */

class ApiCache {
  constructor() {
    this.cache = new Map();
    this.defaultTTL = 5 * 60 * 1000; // 5 minutes
    this.maxSize = 100; // Maximum cache entries
  }

  /**
   * Generate cache key from URL and options
   * @param {string} url - API URL
   * @param {Object} options - Fetch options
   * @returns {string} Cache key
   */
  generateKey(url, options = {}) {
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : '';
    return `${method}:${url}:${body}`;
  }

  /**
   * Check if cache entry is valid
   * @param {CacheEntry} entry - Cache entry
   * @returns {boolean} Whether entry is valid
   */
  isValid(entry) {
    if (!entry) return false;
    const now = Date.now();
    return (now - entry.timestamp) < entry.ttl;
  }

  /**
   * Get cached data
   * @param {string} key - Cache key
   * @returns {*} Cached data or null
   */
  get(key) {
    const entry = this.cache.get(key);
    if (this.isValid(entry)) {
      return entry.data;
    }
    
    // Remove expired entry
    if (entry) {
      this.cache.delete(key);
    }
    
    return null;
  }

  /**
   * Set cached data
   * @param {string} key - Cache key
   * @param {*} data - Data to cache
   * @param {number} ttl - Time to live in milliseconds
   */
  set(key, data, ttl = this.defaultTTL) {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      key
    });
  }

  /**
   * Remove specific cache entry
   * @param {string} key - Cache key
   */
  delete(key) {
    this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Clear expired entries
   */
  clearExpired() {
    for (const [key, entry] of this.cache.entries()) {
      if (!this.isValid(entry)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getStats() {
    const now = Date.now();
    let validEntries = 0;
    let expiredEntries = 0;

    for (const entry of this.cache.values()) {
      if (this.isValid(entry)) {
        validEntries++;
      } else {
        expiredEntries++;
      }
    }

    return {
      totalEntries: this.cache.size,
      validEntries,
      expiredEntries,
      hitRate: this.hitCount / (this.hitCount + this.missCount) || 0,
      memoryUsage: this.cache.size * 1000 // Rough estimate in bytes
    };
  }

  /**
   * Enhanced fetch with caching
   * @param {string} url - API URL
   * @param {Object} options - Fetch options
   * @param {number} ttl - Cache TTL
   * @returns {Promise<*>} Cached or fresh data
   */
  async fetch(url, options = {}, ttl = this.defaultTTL) {
    const key = this.generateKey(url, options);
    
    // Check cache first
    const cachedData = this.get(key);
    if (cachedData !== null) {
      this.hitCount = (this.hitCount || 0) + 1;
      return cachedData;
    }

    this.missCount = (this.missCount || 0) + 1;

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache successful responses
      if (response.status < 400) {
        this.set(key, data, ttl);
      }

      return data;
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  /**
   * Invalidate cache by pattern
   * @param {string} pattern - Pattern to match cache keys
   */
  invalidatePattern(pattern) {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Invalidate cache by URL prefix
   * @param {string} prefix - URL prefix to match
   */
  invalidateByPrefix(prefix) {
    for (const key of this.cache.keys()) {
      if (key.includes(prefix)) {
        this.cache.delete(key);
      }
    }
  }
}

// Create singleton instance
const apiCache = new ApiCache();

// Auto-cleanup expired entries every 5 minutes
setInterval(() => {
  apiCache.clearExpired();
}, 5 * 60 * 1000);

export default apiCache;
export { ApiCache };
