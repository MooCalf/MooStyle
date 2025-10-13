import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Register Service Worker - TEMPORARILY DISABLED FOR CACHE CLEARING
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then((registration) => {
//         console.log('SW registered: ', registration);
//       })
//       .catch((registrationError) => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// }

// Preload critical images
// Preload critical images only if they're actually used
import { criticalImages } from './lib/imageOptimization.js';
if (typeof window !== 'undefined') {
  // Only preload images that are likely to be used immediately
  const immediateImages = criticalImages.filter(url => {
    // Check if the image is used in the current page
    return window.location.pathname === '/' || 
           window.location.pathname.includes('home') ||
           window.location.pathname.includes('brands');
  });
  
  immediateImages.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
