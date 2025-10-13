// Open Graph Image Generator Utility
// This utility helps generate optimized social media images for different content types

export const generateOGImageUrl = (options = {}) => {
  const {
    title = "MOOSTYLE",
    subtitle = "Asian Fashion & Beauty",
    image = "/projects/Brand Medias/Promotional Content/Promo Poster.png",
    type = "default", // default, product, category, article
    price = null,
    brand = null,
    rating = null
  } = options;

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://moostyle.com';
  
  // For now, return the provided image or default
  // In the future, this could integrate with a service like Vercel's OG Image Generation
  // or a custom image generation API
  return image.startsWith('http') ? image : `${siteUrl}${image}`;
};

export const getOptimizedImageDimensions = (type = "default") => {
  const dimensions = {
    default: { width: 1200, height: 630 }, // Standard OG image size
    product: { width: 1200, height: 630 },
    category: { width: 1200, height: 630 },
    article: { width: 1200, height: 630 },
    square: { width: 1200, height: 1200 } // For Instagram-style posts
  };
  
  return dimensions[type] || dimensions.default;
};

export const generateImageAltText = (options = {}) => {
  const {
    title = "MOOSTYLE",
    type = "default",
    product = null,
    category = null
  } = options;

  switch (type) {
    case "product":
      return `${product?.name || title} - ${product?.brand || 'MOOSTYLE'} product image showing ${product?.description || 'premium Asian fashion and beauty item'}`;
    case "category":
      return `${category?.name || title} category showcase featuring ${category?.description || 'premium Asian fashion and beauty products'}`;
    case "article":
      return `${title} - Article image about Asian fashion, beauty, and lifestyle trends`;
    default:
      return `${title} - Premium Asian fashion, beauty products, and lifestyle items at MOOSTYLE`;
  }
};

// Image optimization recommendations
export const getImageOptimizationTips = () => {
  return {
    dimensions: "1200x630px (1.91:1 ratio) for optimal social media display",
    fileSize: "Under 8MB for Facebook, under 5MB for Twitter",
    format: "JPG or PNG (PNG for images with text/transparency)",
    textOverlay: "Keep text minimal and readable at small sizes",
    branding: "Include MOOSTYLE logo for brand recognition",
    colors: "Use high contrast colors for better visibility",
    testing: "Test with Facebook Debugger and Twitter Card Validator"
  };
};

// Social media platform specific requirements
export const getPlatformRequirements = () => {
  return {
    facebook: {
      minWidth: 600,
      minHeight: 315,
      maxWidth: 1200,
      maxHeight: 630,
      aspectRatio: "1.91:1",
      fileSize: "8MB max"
    },
    twitter: {
      minWidth: 300,
      minHeight: 157,
      maxWidth: 1200,
      maxHeight: 630,
      aspectRatio: "1.91:1",
      fileSize: "5MB max"
    },
    linkedin: {
      minWidth: 1200,
      minHeight: 627,
      maxWidth: 1200,
      maxHeight: 627,
      aspectRatio: "1.91:1",
      fileSize: "5MB max"
    },
    instagram: {
      minWidth: 1080,
      minHeight: 1080,
      maxWidth: 1080,
      maxHeight: 1080,
      aspectRatio: "1:1",
      fileSize: "8MB max"
    }
  };
};
