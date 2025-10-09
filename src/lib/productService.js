// Frontend Product Service
// Handles API calls to the backend product system

class ProductService {
  constructor() {
    this.baseURL = 'http://localhost:5000/api/products';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Generic API call method
  async apiCall(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Product API error:', error);
      throw error;
    }
  }

  // Get all products with optional filters
  async getProducts(filters = {}) {
    const cacheKey = `products-${JSON.stringify(filters)}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    try {
      const params = new URLSearchParams();
      
      if (filters.category) params.append('category', filters.category);
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.search) params.append('search', filters.search);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      const endpoint = params.toString() ? `?${params.toString()}` : '';
      const data = await this.apiCall(endpoint);

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Get product by ID
  async getProductById(id) {
    const cacheKey = `product-${id}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    try {
      const data = await this.apiCall(`/${id}`);

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Get products by category
  async getProductsByCategory(category, page = 1, limit = 20) {
    const cacheKey = `category-${category}-${page}-${limit}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    try {
      const data = await this.apiCall(`/category/${category}?page=${page}&limit=${limit}`);

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }

  // Get products by brand
  async getProductsByBrand(brand, page = 1, limit = 20) {
    const cacheKey = `brand-${brand}-${page}-${limit}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    try {
      const data = await this.apiCall(`/brand/${brand}?page=${page}&limit=${limit}`);

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error('Error fetching products by brand:', error);
      throw error;
    }
  }

  // Search products
  async searchProducts(query, page = 1, limit = 20) {
    const cacheKey = `search-${query}-${page}-${limit}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    try {
      const data = await this.apiCall(`/search/${encodeURIComponent(query)}?page=${page}&limit=${limit}`);

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  // Get metadata (categories, brands, tags)
  async getMetadata() {
    const cacheKey = 'metadata';
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    try {
      const [categories, brands, tags] = await Promise.all([
        this.apiCall('/meta/categories'),
        this.apiCall('/meta/brands'),
        this.apiCall('/meta/tags')
      ]);

      const data = {
        categories: categories.categories,
        brands: brands.brands,
        tags: tags.tags
      };

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error('Error fetching metadata:', error);
      throw error;
    }
  }

  // Refresh product cache
  async refreshCache() {
    try {
      await this.apiCall('/refresh', { method: 'POST' });
      this.cache.clear(); // Clear frontend cache too
      return true;
    } catch (error) {
      console.error('Error refreshing cache:', error);
      throw error;
    }
  }

  // Clear frontend cache
  clearCache() {
    this.cache.clear();
  }

  // Get cache statistics
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      oldestEntry: Math.min(...Array.from(this.cache.values()).map(entry => entry.timestamp)),
      newestEntry: Math.max(...Array.from(this.cache.values()).map(entry => entry.timestamp))
    };
  }
}

// Export singleton instance
export const productService = new ProductService();
export default productService;
