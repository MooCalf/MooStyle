// Global Search Data
// Centralized search data for all webpages and content

import { getAllProducts, getCategoryData } from './shoppingData.js';

// Get all available categories
const getAllCategories = () => {
  const categories = ['beauty', 'fashion', 'electronics', 'home', 'lifestyle'];
  return categories.map(category => {
    const categoryData = getCategoryData(category);
    return {
      id: `category-${category}`,
      title: categoryData?.name || category.charAt(0).toUpperCase() + category.slice(1),
      description: categoryData?.description || `Browse ${category} products`,
      content: categoryData?.description || `Discover amazing ${category} products and collections`,
      excerpt: categoryData?.description || `Browse ${category} products`,
      category: 'category',
      subcategory: category,
      tags: [category, 'products', 'shopping'],
      author: 'MOOSTYLE',
      type: 'category',
      date: new Date().toISOString(),
      url: `/shopping/${category}`,
      image: `/projects/BrandCovers/${category}-cover.png`
    };
  });
};

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
    description: 'Welcome to MOOSTYLE - Your destination for Asian fashion and beauty',
    content: 'Discover the latest Asian fashion trends, beauty products, and lifestyle items. Shop from our curated collection of Korean skincare, Japanese fashion, and more.',
    excerpt: 'Welcome to MOOSTYLE - Your destination for Asian fashion and beauty',
    category: 'pages',
    subcategory: 'main',
    tags: ['home', 'main', 'welcome', 'fashion', 'beauty'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/',
    image: '/projects/Brand Medias/Logos/MOOSTYLES LOGO - TEAL COLOR.png'
  },
  {
    id: 'about',
    title: 'About Me',
    description: 'Learn more about MOOSTYLE and our mission',
    content: 'MOOSTYLE is dedicated to bringing you the best in Asian fashion and beauty. We curate products from top brands and artisans to provide you with authentic, high-quality items.',
    excerpt: 'Learn more about MOOSTYLE and our mission',
    category: 'pages',
    subcategory: 'about',
    tags: ['about', 'mission', 'story', 'company'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/about-me',
    image: '/projects/Brand Medias/Logos/MOOSTYLES LOGO - TEAL COLOR.png'
  },
  {
    id: 'brands',
    title: 'Brands',
    description: 'Explore our featured brands and collections',
    content: 'Discover our carefully selected brands including LunaGlow, TokyoVibe, SeoulStyle, and more. Each brand brings unique Asian-inspired products to our collection.',
    excerpt: 'Explore our featured brands and collections',
    category: 'pages',
    subcategory: 'brands',
    tags: ['brands', 'collections', 'featured', 'lunaglow', 'tokyovibe'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/brands',
    image: '/projects/BrandCovers/default-brand-cover.png'
  },
  {
    id: 'artisans',
    title: 'Local Artisans',
    description: 'Support local artisans and discover unique handmade products',
    content: 'Connect with talented local artisans who create unique, handmade products. From traditional crafts to modern designs, discover one-of-a-kind items.',
    excerpt: 'Support local artisans and discover unique handmade products',
    category: 'pages',
    subcategory: 'artisans',
    tags: ['artisans', 'handmade', 'local', 'crafts', 'unique'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/artisans',
    image: '/projects/BrandCovers/artisan-cover.png'
  },
  {
    id: 'cart',
    title: 'Shopping Cart',
    description: 'Review your selected items and proceed to checkout',
    content: 'Your shopping cart contains all the items you have selected. Review your order, apply discounts, and proceed to secure checkout.',
    excerpt: 'Review your selected items and proceed to checkout',
    category: 'pages',
    subcategory: 'shopping',
    tags: ['cart', 'checkout', 'shopping', 'order'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/cart',
    image: '/projects/BrandCovers/cart-cover.png'
  },
  {
    id: 'login',
    title: 'Sign In',
    description: 'Sign in to your MOOSTYLE account',
    content: 'Access your account to view order history, manage preferences, and enjoy personalized shopping experience.',
    excerpt: 'Sign in to your MOOSTYLE account',
    category: 'pages',
    subcategory: 'auth',
    tags: ['login', 'signin', 'account', 'auth'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/login',
    image: '/projects/Brand Medias/Logos/MOOSTYLES LOGO - TEAL COLOR.png'
  },
  {
    id: 'register',
    title: 'Create Account',
    description: 'Join MOOSTYLE and start your fashion journey',
    content: 'Create your MOOSTYLE account to enjoy exclusive deals, track orders, and access personalized recommendations.',
    excerpt: 'Join MOOSTYLE and start your fashion journey',
    category: 'pages',
    subcategory: 'auth',
    tags: ['register', 'signup', 'account', 'join'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/register',
    image: '/projects/Brand Medias/Logos/MOOSTYLES LOGO - TEAL COLOR.png'
  },
  {
    id: 'common-questions',
    title: 'General Information',
    description: 'Find answers to frequently asked questions',
    content: 'Get answers to common questions about shipping, returns, product information, and more. Our FAQ section covers everything you need to know.',
    excerpt: 'Find answers to frequently asked questions',
    category: 'pages',
    subcategory: 'help',
    tags: ['faq', 'questions', 'help', 'support'],
    author: 'MOOSTYLE',
    type: 'page',
    date: new Date().toISOString(),
    url: '/common-questions',
    image: '/projects/BrandCovers/help-cover.png'
  }
];

// Blog posts data
const getBlogPosts = () => [
  {
    id: 'blog-1',
    title: 'The Future of AI in Fashion Design',
    description: 'Explore how artificial intelligence is revolutionizing the fashion industry',
    content: 'Artificial intelligence is rapidly transforming various industries, and fashion is no exception. From generating new designs to optimizing supply chains, AI is proving to be a powerful tool for innovation. Designers are now using AI-powered tools to create unique patterns, predict trends, and even generate entire collections based on specific parameters.',
    excerpt: 'Explore how artificial intelligence is revolutionizing the fashion industry',
    category: 'blog',
    subcategory: 'AI & Fashion',
    tags: ['AI', 'Fashion Tech', 'Innovation', 'Design'],
    author: 'Jane Doe',
    type: 'blog',
    date: '2023-10-26',
    url: '/blog',
    image: '/projects/Blog/ai-fashion.jpg'
  },
  {
    id: 'blog-2',
    title: 'Sustainable Practices in Korean Beauty',
    description: 'Discover the growing trend of sustainable and eco-friendly practices in K-Beauty',
    content: 'Korean beauty, or K-Beauty, has long been at the forefront of innovation, and now it\'s embracing sustainability. Consumers are increasingly demanding eco-friendly products, and K-Beauty brands are responding with innovative solutions.',
    excerpt: 'Discover the growing trend of sustainable and eco-friendly practices in K-Beauty',
    category: 'blog',
    subcategory: 'Beauty',
    tags: ['K-Beauty', 'Sustainability', 'Eco-friendly', 'Skincare'],
    author: 'Kim Lee',
    type: 'blog',
    date: '2023-09-15',
    url: '/blog',
    image: '/projects/Blog/k-beauty-sustainable.jpg'
  },
  {
    id: 'blog-3',
    title: 'The Rise of Digital Fashion and NFTs',
    description: 'Explore how digital fashion and NFTs are creating new opportunities',
    content: 'Digital fashion is no longer a niche concept; it\'s a rapidly expanding industry driven by advancements in virtual reality, augmented reality, and blockchain technology.',
    excerpt: 'Explore how digital fashion and NFTs are creating new opportunities',
    category: 'blog',
    subcategory: 'Digital Fashion',
    tags: ['NFT', 'Metaverse', 'Virtual Fashion', 'Digital'],
    author: 'Alex Chen',
    type: 'blog',
    date: '2023-08-01',
    url: '/blog',
    image: '/projects/Blog/digital-fashion-nft.jpg'
  },
  {
    id: 'blog-4',
    title: 'Minimalist Wardrobe: A Guide to Essential Pieces',
    description: 'Learn how to build a minimalist wardrobe with essential pieces',
    content: 'Building a minimalist wardrobe is about curating a collection of versatile, high-quality pieces that can be mixed and matched to create numerous outfits.',
    excerpt: 'Learn how to build a minimalist wardrobe with essential pieces',
    category: 'blog',
    subcategory: 'Lifestyle',
    tags: ['Minimalism', 'Wardrobe', 'Fashion Tips', 'Lifestyle'],
    author: 'Sarah Green',
    type: 'blog',
    date: '2023-07-10',
    url: '/blog',
    image: '/projects/Blog/minimalist-wardrobe.jpg'
  },
  {
    id: 'blog-5',
    title: 'The Art of Japanese Street Style',
    description: 'Dive into the vibrant world of Japanese street style',
    content: 'Japanese street style is renowned globally for its creativity, diversity, and fearless approach to fashion. It\'s a dynamic scene where traditional aesthetics blend with avant-garde trends.',
    excerpt: 'Dive into the vibrant world of Japanese street style',
    category: 'blog',
    subcategory: 'Fashion',
    tags: ['Japanese Fashion', 'Street Style', 'Culture', 'Trends'],
    author: 'Hiroshi Tanaka',
    type: 'blog',
    date: '2023-06-20',
    url: '/blog',
    image: '/projects/Blog/japanese-street-style.jpg'
  }
];

// Combine all search data
export const getGlobalSearchData = () => {
  return [
    ...getAllProductsForSearch(),
    ...getAllCategories(),
    ...getStaticPages(),
    ...getBlogPosts()
  ];
};

// Export individual data sources for specific use cases
export const getProductSearchData = getAllProductsForSearch;
export const getCategorySearchData = getAllCategories;
export const getPageSearchData = getStaticPages;
export const getBlogSearchData = getBlogPosts;
