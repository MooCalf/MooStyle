// WebP Image Optimization Utility
// This utility helps with image optimization and WebP conversion

export const imageOptimization = {
  // Check if browser supports WebP
  supportsWebP: () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  },

  // Get optimized image URL
  getOptimizedImageUrl: (originalUrl, options = {}) => {
    const {
      width = null,
      height = null,
      quality = 80,
      format = 'auto'
    } = options;

    // If it's already a WebP or external URL, return as is
    if (originalUrl.includes('.webp') || originalUrl.startsWith('http')) {
      return originalUrl;
    }

    // For Cloudflare Images (if using Cloudflare Images service)
    if (format === 'webp' && imageOptimization.supportsWebP()) {
      const params = new URLSearchParams();
      if (width) params.append('width', width);
      if (height) params.append('height', height);
      params.append('quality', quality);
      params.append('format', 'webp');
      
      return `${originalUrl}?${params.toString()}`;
    }

    return originalUrl;
  },

  // Lazy load images with WebP support
  lazyLoadImage: (imgElement, src, options = {}) => {
    const { placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' } = options;
    
    // Set placeholder
    imgElement.src = placeholder;
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const optimizedSrc = imageOptimization.getOptimizedImageUrl(src);
          
          img.src = optimizedSrc;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    observer.observe(imgElement);
  },

  // Preload critical images
  preloadImages: (imageUrls) => {
    imageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageOptimization.getOptimizedImageUrl(url);
      document.head.appendChild(link);
    });
  },

  // Generate responsive image srcset
  generateSrcSet: (baseUrl, sizes = [320, 640, 1024, 1280, 1920]) => {
    return sizes.map(size => {
      const optimizedUrl = imageOptimization.getOptimizedImageUrl(baseUrl, { width: size });
      return `${optimizedUrl} ${size}w`;
    }).join(', ');
  }
};

// Critical images to preload - only images that are used on multiple pages
export const criticalImages = [
  '/projects/Brand Medias/Logos/MooStyle Logo.png'
];

export default imageOptimization;
