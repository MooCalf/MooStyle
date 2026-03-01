// Global Search Data
// Centralized search data for all webpages and content

import { getAllProducts } from './shoppingData.js';

// Get all products for search
const getAllProductsForSearch = () => {
  const products = getAllProducts();
  return products.map(product => ({
    id: product.id,
    title: product.name,
    description: product.description,
    content: product.detailedDescription || product.description,
    excerpt: product.description,
    category: product.category || 'products',
    subcategory: product.subcategory || 'general',
    tags: product.tags || [],
    author: product.author || product.brand,
    brand: product.brand,
    price: product.price,
    rating: product.rating,
    image: product.image,
    type: 'product',
    date: product.createdAt || new Date().toISOString(),
    url: `/product/${product.id}`,
    inStock: product.inStock,
    isNew: product.isNew,
    isBestSeller: product.isBestSeller
  }));
};

// Static page content
const getStaticPages = () => [
  {
    id: 'home',
    title: 'Home',
    description: 'Welcome to MOOSTYLE - Your destination for InZOI mods and digital content',
    content: 'Discover premium InZOI mods and digital resources from talented creators. Browse our curated collection of game mods, custom content, and more.',
    excerpt: 'Welcome to MOOSTYLE - Your destination for InZOI mods and digital content',
    category: 'pages',
    subcategory: 'main',
    tags: ['home', 'main', 'welcome', 'mods', 'inzoi'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/',
    image: '/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png'
  },
  {
    id: 'about',
    title: 'About Me',
    description: 'Learn more about MOOSTYLE and our mission',
    content: 'MOOSTYLE is dedicated to bringing you the best in digital resources and content. We create and curate high-quality mods and custom content for InZOI and other games.',
    excerpt: 'Learn more about MOOSTYLE and our mission',
    category: 'pages',
    subcategory: 'about',
    tags: ['about', 'mission', 'story', 'creator'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/about',
    image: '/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png'
  },
  {
    id: 'brands',
    title: 'InZOI Mods',
    description: 'Browse and download InZOI mods',
    content: 'Explore our collection of InZOI mods including custom brands, items, and content. Each mod is carefully crafted to enhance your InZOI experience.',
    excerpt: 'Browse and download InZOI mods',
    category: 'pages',
    subcategory: 'mods',
    tags: ['mods', 'inzoi', 'game', 'custom content', 'downloads'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/brands',
    image: '/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png'
  },
  {
    id: 'archive',
    title: 'Archive',
    description: 'Browse archived content and past projects',
    content: 'Explore our archive of past projects, retired mods, and historical content. Discover the evolution of our creative work.',
    excerpt: 'Browse archived content and past projects',
    category: 'pages',
    subcategory: 'archive',
    tags: ['archive', 'history', 'past projects', 'content'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/archive',
    image: '/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png'
  },
  {
    id: 'saved-products',
    title: 'Saved Mods',
    description: 'View your saved mods and favorite content',
    content: 'Access all the mods and content you\'ve saved for later. Keep track of your favorite items and downloads.',
    excerpt: 'View your saved mods and favorite content',
    category: 'pages',
    subcategory: 'saved',
    tags: ['saved', 'favorites', 'bookmarks', 'mods'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/saved-products',
    image: '/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png'
  },
  {
    id: 'support',
    title: 'Support',
    description: 'Get help and support for mods and downloads',
    content: 'Need help with a mod or have questions? Our support page provides answers to common questions and ways to get in touch.',
    excerpt: 'Get help and support for mods and downloads',
    category: 'pages',
    subcategory: 'help',
    tags: ['support', 'help', 'contact', 'assistance'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/support',
    image: '/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png'
  },
  {
    id: 'common-questions',
    title: 'Common Questions',
    description: 'Find answers to frequently asked questions',
    content: 'Get answers to common questions about mods, downloads, installation, compatibility, and more. Our FAQ section covers everything you need to know.',
    excerpt: 'Find answers to frequently asked questions',
    category: 'pages',
    subcategory: 'help',
    tags: ['faq', 'questions', 'help', 'answers'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/common-questions',
    image: '/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png'
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'Read our privacy policy and data protection practices',
    content: 'Learn about how we collect, use, and protect your personal information. Our privacy policy explains our commitment to your data security.',
    excerpt: 'Read our privacy policy and data protection practices',
    category: 'pages',
    subcategory: 'legal',
    tags: ['privacy', 'policy', 'legal', 'data protection'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/privacy-policy',
    image: '/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png'
  },
  {
    id: 'terms-of-service',
    title: 'Terms of Service',
    description: 'Read our terms of service and usage guidelines',
    content: 'Understand the terms and conditions for using our website and downloading our content. Our terms of service outline your rights and responsibilities.',
    excerpt: 'Read our terms of service and usage guidelines',
    category: 'pages',
    subcategory: 'legal',
    tags: ['terms', 'service', 'legal', 'guidelines'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/terms-of-service',
    image: '/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png'
  }
];

// Combine all search data
export const getGlobalSearchData = () => {
  return [
    ...getAllProductsForSearch(),
    ...getStaticPages()
  ];
};

// Export individual data sources for specific use cases
export const getProductSearchData = getAllProductsForSearch;
export const getPageSearchData = getStaticPages;

