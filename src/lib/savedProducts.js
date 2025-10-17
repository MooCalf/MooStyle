// Saved Products Management System
// Handles localStorage with 1-year expiration and product management

const STORAGE_KEY = 'moostyle_saved_products';
const EXPIRATION_TIME = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds

// Saved Products Manager Class
export class SavedProductsManager {
  constructor() {
    this.savedProducts = this.loadSavedProducts();
    this.cleanupExpiredProducts();
  }

  // Load saved products from localStorage
  loadSavedProducts() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error loading saved products:', error);
      return [];
    }
  }

  // Save products to localStorage
  saveProducts() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.savedProducts));
      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new CustomEvent('savedProductsChanged'));
    } catch (error) {
      console.error('Error saving products:', error);
    }
  }

  // Add product to saved list
  saveProduct(product) {
    const existingIndex = this.savedProducts.findIndex(p => p.id === product.id);
    
    if (existingIndex !== -1) {
      // Update existing product with new timestamp
      this.savedProducts[existingIndex] = {
        ...product,
        savedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + EXPIRATION_TIME).toISOString()
      };
    } else {
      // Add new product
      this.savedProducts.push({
        ...product,
        savedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + EXPIRATION_TIME).toISOString()
      });
    }
    
    this.saveProducts();
    return true;
  }

  // Remove product from saved list
  unsaveProduct(productId) {
    const initialLength = this.savedProducts.length;
    this.savedProducts = this.savedProducts.filter(p => p.id !== productId);
    
    if (this.savedProducts.length !== initialLength) {
      this.saveProducts();
      return true;
    }
    return false;
  }

  // Check if product is saved
  isProductSaved(productId) {
    return this.savedProducts.some(p => p.id === productId);
  }

  // Get all saved products
  getSavedProducts() {
    this.cleanupExpiredProducts();
    return [...this.savedProducts];
  }

  // Get saved products count
  getSavedProductsCount() {
    this.cleanupExpiredProducts();
    return this.savedProducts.length;
  }

  // Clean up expired products
  cleanupExpiredProducts() {
    const now = new Date();
    const initialLength = this.savedProducts.length;
    
    this.savedProducts = this.savedProducts.filter(product => {
      const expiresAt = new Date(product.expiresAt);
      return expiresAt > now;
    });
    
    // Save if any products were removed
    if (this.savedProducts.length !== initialLength) {
      this.saveProducts();
    }
  }

  // Get products expiring soon (within 30 days)
  getProductsExpiringSoon() {
    this.cleanupExpiredProducts();
    const thirtyDaysFromNow = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000));
    
    return this.savedProducts.filter(product => {
      const expiresAt = new Date(product.expiresAt);
      return expiresAt <= thirtyDaysFromNow;
    });
  }

  // Clear all saved products
  clearAllSavedProducts() {
    this.savedProducts = [];
    this.saveProducts();
  }

  // Get saved products by category
  getSavedProductsByCategory() {
    this.cleanupExpiredProducts();
    
    const categories = {};
    this.savedProducts.forEach(product => {
      const category = product.category || 'uncategorized';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(product);
    });
    
    return categories;
  }

  // Search saved products
  searchSavedProducts(query) {
    this.cleanupExpiredProducts();
    
    if (!query || query.trim() === '') {
      return this.savedProducts;
    }
    
    const searchTerm = query.toLowerCase();
    return this.savedProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }

  // Get storage statistics
  getStorageStats() {
    this.cleanupExpiredProducts();
    
    const now = new Date();
    const totalSaved = this.savedProducts.length;
    const expiringSoon = this.getProductsExpiringSoon().length;
    
    // Calculate storage size
    const storageSize = JSON.stringify(this.savedProducts).length;
    const maxStorageSize = 5 * 1024 * 1024; // 5MB limit
    const storagePercentage = (storageSize / maxStorageSize) * 100;
    
    return {
      totalSaved,
      expiringSoon,
      storageSize,
      maxStorageSize,
      storagePercentage: Math.round(storagePercentage * 100) / 100,
      isNearLimit: storagePercentage > 80
    };
  }
}

// Create global instance
export const savedProductsManager = new SavedProductsManager();

// Helper functions for easy use
export const saveProduct = (product) => {
  return savedProductsManager.saveProduct(product);
};

export const unsaveProduct = (productId) => {
  return savedProductsManager.unsaveProduct(productId);
};

export const isProductSaved = (productId) => {
  return savedProductsManager.isProductSaved(productId);
};

export const getSavedProducts = () => {
  return savedProductsManager.getSavedProducts();
};

export const getSavedProductsCount = () => {
  return savedProductsManager.getSavedProductsCount();
};

export const getSavedProductsByCategory = () => {
  return savedProductsManager.getSavedProductsByCategory();
};

export const searchSavedProducts = (query) => {
  return savedProductsManager.searchSavedProducts(query);
};

export const getStorageStats = () => {
  return savedProductsManager.getStorageStats();
};

export const clearAllSavedProducts = () => {
  return savedProductsManager.clearAllSavedProducts();
};
