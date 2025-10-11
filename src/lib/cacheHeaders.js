// Caching Headers Configuration
// This file contains caching strategies for different types of content

export const cacheHeaders = {
  // Static assets (JS, CSS, images)
  static: {
    'Cache-Control': 'public, max-age=31536000, immutable', // 1 year
    'Expires': new Date(Date.now() + 31536000 * 1000).toUTCString()
  },

  // HTML pages
  html: {
    'Cache-Control': 'public, max-age=3600', // 1 hour
    'Expires': new Date(Date.now() + 3600 * 1000).toUTCString()
  },

  // API responses
  api: {
    'Cache-Control': 'public, max-age=300', // 5 minutes
    'Expires': new Date(Date.now() + 300 * 1000).toUTCString()
  },

  // Blog posts
  blog: {
    'Cache-Control': 'public, max-age=1800', // 30 minutes
    'Expires': new Date(Date.now() + 1800 * 1000).toUTCString()
  },

  // User-specific content
  user: {
    'Cache-Control': 'private, max-age=600', // 10 minutes
    'Expires': new Date(Date.now() + 600 * 1000).toUTCString()
  },

  // No cache
  noCache: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
};

// Cloudflare-specific caching rules
export const cloudflareRules = {
  // Static assets
  staticAssets: {
    path: '/assets/*',
    cacheLevel: 'cache_everything',
    edgeTtl: 31536000, // 1 year
    browserTtl: 31536000
  },

  // Images
  images: {
    path: '/projects/*',
    cacheLevel: 'cache_everything',
    edgeTtl: 2592000, // 30 days
    browserTtl: 2592000
  },

  // HTML pages
  htmlPages: {
    path: '/*',
    cacheLevel: 'cache_everything',
    edgeTtl: 3600, // 1 hour
    browserTtl: 3600
  },

  // API endpoints
  apiEndpoints: {
    path: '/api/*',
    cacheLevel: 'cache_everything',
    edgeTtl: 300, // 5 minutes
    browserTtl: 300
  }
};

// Service Worker caching strategy
export const swCacheStrategy = {
  // Cache first for static assets
  cacheFirst: [
    '/assets/',
    '/projects/',
    '*.js',
    '*.css',
    '*.png',
    '*.jpg',
    '*.jpeg',
    '*.gif',
    '*.webp',
    '*.svg',
    '*.ico'
  ],

  // Network first for API calls
  networkFirst: [
    '/api/',
    '/auth/'
  ],

  // Stale while revalidate for HTML
  staleWhileRevalidate: [
    '/',
    '/blog',
    '/shopping',
    '/brands'
  ]
};

// Browser caching hints
export const browserHints = {
  // Preload critical resources
  preload: [
    '/assets/index.css',
    '/assets/index.js',
    '/projects/Brand Medias/Logos/MooStyle Logo.png'
  ],

  // Prefetch likely next pages
  prefetch: [
    '/blog',
    '/shopping',
    '/brands'
  ],

  // Preconnect to external domains
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ]
};

// Generate cache headers for different content types
export const getCacheHeaders = (contentType, isUserSpecific = false) => {
  if (isUserSpecific) {
    return cacheHeaders.user;
  }

  switch (contentType) {
    case 'text/html':
      return cacheHeaders.html;
    case 'application/json':
      return cacheHeaders.api;
    case 'text/css':
    case 'application/javascript':
    case 'image/':
      return cacheHeaders.static;
    default:
      return cacheHeaders.html;
  }
};

// Generate Cloudflare Page Rules (for _headers file)
export const generateCloudflareHeaders = () => {
  return `
# Static Assets
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Images
/projects/*
  Cache-Control: public, max-age=2592000

# HTML Pages
/*
  Cache-Control: public, max-age=3600

# API Endpoints
/api/*
  Cache-Control: public, max-age=300

# User-specific content
/my-account
/cart
  Cache-Control: private, max-age=600

# No cache for auth pages
/login
/register
/forgot-password
/reset-password
  Cache-Control: no-cache, no-store, must-revalidate
`;
};

export default cacheHeaders;
