// Service Worker for MOOSTYLE
// Implements caching strategies for better performance

const CACHE_NAME = 'moostyle-v1.0.0';
const STATIC_CACHE = 'moostyle-static-v1.0.0';
const DYNAMIC_CACHE = 'moostyle-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/blog',
  '/shopping',
  '/brands',
  '/artisans',
  '/about-me',
  '/common-questions',
  '/manifest.json'
];

// Skip caching for development files
const SKIP_CACHE_PATTERNS = [
  /@vite/,
  /@react-refresh/,
  /node_modules/,
  /\.hot-update\./,
  /hmr/
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static files', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip development files that shouldn't be cached
  if (SKIP_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    return;
  }

  // Strategy 1: Cache First for static assets
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Strategy 2: Network First for API calls
  if (isApiRequest(request)) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Strategy 3: Stale While Revalidate for HTML pages
  if (isHtmlRequest(request)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Default: Network First
  event.respondWith(networkFirst(request));
});

// Cache First Strategy
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache First Strategy Error:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Offline', { status: 503 });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, return cached response if available
    return cachedResponse;
  });

  return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticAsset(request) {
  const url = new URL(request.url);
  return (
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/projects/') ||
    request.url.includes('.js') ||
    request.url.includes('.css') ||
    request.url.includes('.png') ||
    request.url.includes('.jpg') ||
    request.url.includes('.jpeg') ||
    request.url.includes('.gif') ||
    request.url.includes('.webp') ||
    request.url.includes('.svg') ||
    request.url.includes('.ico') ||
    request.url.includes('.woff') ||
    request.url.includes('.woff2')
  );
}

function isApiRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') || url.pathname.startsWith('/auth/');
}

function isHtmlRequest(request) {
  return request.headers.get('accept')?.includes('text/html');
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Service Worker: Background sync triggered');
  // Implement background sync logic here
  // For example, sync cart items when back online
}

// Push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/projects/Brand Medias/Logos/MooStyle Logo.png',
      badge: '/projects/Brand Medias/Logos/MooStyle Logo.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'View Blog',
          icon: '/projects/Brand Medias/Logos/MooStyle Logo.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/projects/Brand Medias/Logos/MooStyle Logo.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/blog')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('Service Worker: Loaded');
