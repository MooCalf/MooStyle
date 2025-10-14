// API Configuration
// Centralized configuration for all API endpoints

import { envConfig } from './envConfig.js';
import { authHelpers } from './betterAuthClient.js';

// Get API base URL from environment or use default
const getApiBaseUrl = () => {
  return envConfig.apiBaseUrl;
};

// API Configuration object
export const apiConfig = {
  baseURL: getApiBaseUrl(),
  endpoints: {
    // Authentication endpoints
    auth: {
      login: '/api/auth/login',
      register: '/api/auth/register',
      logout: '/api/auth/logout',
      profile: '/api/auth/profile',
      forgotPassword: '/api/auth/forgot-password',
      resetPassword: '/api/auth/reset-password',
      changePassword: '/api/auth/change-password',
      refresh: '/api/auth/refresh',
      test: '/api/auth/test'
    },
    
    // Cart endpoints
    cart: {
      base: '/api/cart',
      add: '/api/cart/add',
      update: '/api/cart/update',
      remove: '/api/cart/remove',
      clear: '/api/cart/clear',
      count: '/api/cart/count',
      download: '/api/cart/download',
      check: '/api/cart/check',
      productFiles: '/api/cart/product-files',
      productFilesByPath: '/api/cart/product-files-by-path'
    },
    
    // Admin endpoints
    admin: {
      stats: '/api/admin/stats',
      users: '/api/admin/users',
      carts: '/api/admin/carts',
      products: '/api/admin/products'
    },
    
    // Product endpoints
    products: {
      base: '/api/products',
      sync: '/api/products/sync',
      refresh: '/api/products/refresh',
      meta: {
        categories: '/api/products/meta/categories',
        brands: '/api/products/meta/brands',
        tags: '/api/products/meta/tags'
      }
    },
    
    // Health endpoints
    health: {
      base: '/api/health',
      status: '/api/status'
    }
  },
  
  // Helper function to build full URL
  buildUrl: (endpoint) => {
    return `${apiConfig.baseURL}${endpoint}`;
  },
  
  // Helper function to get auth headers (BetterAuth uses cookies)
  getAuthHeaders: () => {
    return {
      'Content-Type': 'application/json',
      // BetterAuth handles authentication via cookies automatically
    };
  },

  // Helper function to make authenticated requests
  makeAuthenticatedRequest: async (url, options = {}) => {
    return authHelpers.makeAuthenticatedRequest(url, options);
  },
  
  // Helper function to check if user is authenticated
  // Note: This should use BetterAuth's useSession hook instead
  isAuthenticated: () => {
    console.warn('apiConfig.isAuthenticated() is deprecated. Use BetterAuth useSession hook instead.');
    return false; // Always return false to force migration to BetterAuth
  }
};

// Export individual endpoint builders for convenience
export const buildAuthUrl = (endpoint) => apiConfig.buildUrl(apiConfig.endpoints.auth[endpoint]);
export const buildCartUrl = (endpoint) => apiConfig.buildUrl(apiConfig.endpoints.cart[endpoint]);
export const buildAdminUrl = (endpoint) => apiConfig.buildUrl(apiConfig.endpoints.admin[endpoint]);
export const buildProductUrl = (endpoint) => apiConfig.buildUrl(apiConfig.endpoints.products[endpoint]);
export const buildHealthUrl = (endpoint) => apiConfig.buildUrl(apiConfig.endpoints.health[endpoint]);

export default apiConfig;
