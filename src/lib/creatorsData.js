// Creators Data Management System
// This file contains all creator data and management functions

export const CREATOR_CATEGORIES = {
  CERAMICS: "Ceramics",
  TEXTILES: "Textiles",
  ART: "Art",
  JEWELRY: "Jewelry",
  BEAUTY: "Beauty",
  FASHION: "Fashion",
  WOODWORKING: "Woodworking",
  FOOD: "Food",
  GENERAL: "General"
};

// Creator data array - easily manageable for adding new creators
export const creatorsData = [
  {
    id: 1,
    name: "Maya Chen",
    location: "Global",
    specialty: "Ceramics",
    category: CREATOR_CATEGORIES.CERAMICS,
    rating: 4.9,
    reviews: 127,
    image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
    story: "Traditional pottery techniques passed down through generations",
    products: ["Ceramic Tea Sets", "Hand-painted Bowls", "Decorative Vases"],
    totalProducts: 45,
    totalDownloads: 2340,
    description: "Master ceramicist specializing in traditional pottery with contemporary designs",
    experience: "15+ years",
    techniques: ["Traditional Pottery", "Hand-painting", "Glazing"],
    materials: ["Clay", "Glazes", "Natural Pigments"],
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@maya_chen_ceramics",
      website: "https://mayachenceramics.com"
    },
    tags: ["Ceramics", "Traditional", "Pottery", "Handcrafted"]
  },
  {
    id: 2,
    name: "Hiroshi Tanaka",
    location: "Global",
    specialty: "Textiles",
    category: CREATOR_CATEGORIES.TEXTILES,
    rating: 4.8,
    reviews: 89,
    image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    story: "Master of traditional weaving and dyeing techniques",
    products: ["Silk Garments", "Indigo Dyed Fabrics", "Traditional Accessories"],
    totalProducts: 32,
    totalDownloads: 1890,
    description: "Traditional textile artist preserving ancient weaving techniques",
    experience: "20+ years",
    techniques: ["Traditional Weaving", "Indigo Dyeing", "Silk Production"],
    materials: ["Silk", "Indigo", "Natural Dyes"],
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@hiroshi_tanaka_textiles",
      website: "https://hiroshitanakatextiles.com"
    },
    tags: ["Textiles", "Traditional", "Weaving", "Handcrafted"]
  },
  {
    id: 3,
    name: "Li Wei",
    location: "Global",
    specialty: "Calligraphy",
    category: CREATOR_CATEGORIES.ART,
    rating: 4.9,
    reviews: 156,
    image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    story: "Contemporary artist blending traditional calligraphy with modern design",
    products: ["Calligraphy Sets", "Hand-painted Scrolls", "Custom Artwork"],
    totalProducts: 28,
    totalDownloads: 3120,
    description: "Contemporary calligraphy artist bridging traditional art with modern aesthetics",
    experience: "12+ years",
    techniques: ["Traditional Calligraphy", "Modern Design", "Scroll Painting"],
    materials: ["Rice Paper", "Ink", "Brushes"],
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@liwei_calligraphy",
      website: "https://liweicalligraphy.com"
    },
    tags: ["Calligraphy", "Art", "Traditional", "Contemporary"]
  },
  {
    id: 4,
    name: "Priya Sharma",
    location: "Global",
    specialty: "Jewelry",
    category: CREATOR_CATEGORIES.JEWELRY,
    rating: 4.7,
    reviews: 203,
    image: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
    story: "Handcrafted jewelry using traditional techniques and modern aesthetics",
    products: ["Gold Earrings", "Gemstone Necklaces", "Traditional Bangles"],
    totalProducts: 67,
    totalDownloads: 4560,
    description: "Master jeweler creating exquisite pieces using traditional craftsmanship",
    experience: "18+ years",
    techniques: ["Traditional Jewelry Making", "Gem Setting", "Metalwork"],
    materials: ["Gold", "Silver", "Gemstones"],
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@priya_sharma_jewelry",
      website: "https://priyasharmajewelry.com"
    },
    tags: ["Jewelry", "Traditional", "Handcrafted", "Premium"]
  },
  {
    id: 5,
    name: "Sakura Yamamoto",
    location: "Global",
    specialty: "Beauty",
    category: CREATOR_CATEGORIES.BEAUTY,
    rating: 4.8,
    reviews: 94,
    image: "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
    story: "Natural skincare products inspired by traditional beauty rituals",
    products: ["Rice Powder", "Green Tea Serums", "Traditional Face Masks"],
    totalProducts: 23,
    totalDownloads: 1780,
    description: "Natural beauty expert specializing in traditional skincare formulations",
    experience: "10+ years",
    techniques: ["Traditional Formulation", "Natural Extraction", "Herbal Processing"],
    materials: ["Rice", "Green Tea", "Natural Herbs"],
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@sakura_yamamoto_beauty",
      website: "https://sakurayamamotobeauty.com"
    },
    tags: ["Beauty", "Natural", "Skincare", "Organic"]
  },
  {
    id: 6,
    name: "Kim Min-jun",
    location: "Global",
    specialty: "Fashion",
    category: CREATOR_CATEGORIES.FASHION,
    rating: 4.9,
    reviews: 178,
    image: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
    story: "Contemporary fashion designer blending heritage with modern trends",
    products: ["Streetwear", "Traditional Garments", "Accessories"],
    totalProducts: 89,
    totalDownloads: 5670,
    description: "Innovative fashion designer merging traditional elements with contemporary style",
    experience: "8+ years",
    techniques: ["Traditional Sewing", "Modern Design", "Pattern Making"],
    materials: ["Silk", "Cotton", "Traditional Fabrics"],
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@kimminjun_fashion",
      website: "https://kimminjunfashion.com"
    },
    tags: ["Fashion", "Traditional", "Contemporary", "Streetwear"]
  },
  {
    id: 7,
    name: "Yuki Nakamura",
    location: "Global",
    specialty: "Woodworking",
    category: CREATOR_CATEGORIES.WOODWORKING,
    rating: 4.8,
    reviews: 112,
    image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
    story: "Traditional woodworking techniques for modern furniture",
    products: ["Wooden Tables", "Traditional Cabinets", "Hand-carved Bowls"],
    totalProducts: 34,
    totalDownloads: 1890,
    description: "Master woodworker creating functional art using traditional techniques",
    experience: "22+ years",
    techniques: ["Traditional Joinery", "Hand Carving", "Wood Finishing"],
    materials: ["Cedar", "Cypress", "Traditional Woods"],
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@yuki_nakamura_woodwork",
      website: "https://yukinakamurawoodwork.com"
    },
    tags: ["Woodworking", "Traditional", "Furniture", "Handcrafted"]
  },
  {
    id: 8,
    name: "Chen Xiaoli",
    location: "Global",
    specialty: "Embroidery",
    category: CREATOR_CATEGORIES.TEXTILES,
    rating: 4.9,
    reviews: 145,
    image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    story: "Intricate embroidery preserving ancient needlework traditions",
    products: ["Embroidered Scarves", "Traditional Dresses", "Decorative Panels"],
    totalProducts: 41,
    totalDownloads: 2340,
    description: "Embroidery master creating stunning pieces using traditional needlework",
    experience: "16+ years",
    techniques: ["Traditional Embroidery", "Silk Thread Work", "Pattern Design"],
    materials: ["Silk Thread", "Fine Fabrics", "Traditional Tools"],
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@chen_xiaoli_embroidery",
      website: "https://chenxiaoliembroidery.com"
    },
    tags: ["Embroidery", "Traditional", "Needlework", "Textiles"]
  },
  {
    id: 9,
    name: "Raj Patel",
    location: "Global",
    specialty: "Spices",
    category: CREATOR_CATEGORIES.FOOD,
    rating: 4.7,
    reviews: 167,
    image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    story: "Authentic spice blends and traditional cooking ingredients",
    products: ["Spice Blends", "Traditional Masalas", "Cooking Kits"],
    totalProducts: 56,
    totalDownloads: 3450,
    description: "Spice master creating authentic blends using traditional family recipes",
    experience: "25+ years",
    techniques: ["Traditional Grinding", "Spice Blending", "Quality Control"],
    materials: ["Traditional Spices", "Natural Ingredients", "Traditional Tools"],
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@raj_patel_spices",
      website: "https://rajpatelspices.com"
    },
    tags: ["Spices", "Traditional", "Cooking", "Authentic"]
  }
];

// Helper functions for creator management
export const getAllCreators = () => creatorsData;

export const getCreatorById = (creatorId) => {
  return creatorsData.find(creator => creator.id === creatorId);
};

export const getCreatorByName = (creatorName) => {
  return creatorsData.find(creator => creator.name === creatorName);
};

export const getCreatorsByCategory = (category) => {
  return creatorsData.filter(creator => creator.category === category);
};

export const getFeaturedCreators = () => {
  return creatorsData.filter(creator => creator.isFeatured);
};

export const getActiveCreators = () => {
  return creatorsData.filter(creator => creator.isActive);
};

export const searchCreators = (query, filters = {}) => {
  let results = creatorsData;
  
  // Apply filters
  if (filters.category) {
    results = results.filter(creator => creator.category === filters.category);
  }
  
  if (filters.minRating) {
    results = results.filter(creator => creator.rating >= filters.minRating);
  }
  
  if (filters.isFeatured !== undefined) {
    results = results.filter(creator => creator.isFeatured === filters.isFeatured);
  }
  
  if (filters.isActive !== undefined) {
    results = results.filter(creator => creator.isActive === filters.isActive);
  }
  
  // Apply search query
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase();
    results = results.filter(creator => 
      creator.name.toLowerCase().includes(searchTerm) ||
      creator.specialty.toLowerCase().includes(searchTerm) ||
      creator.description.toLowerCase().includes(searchTerm) ||
      creator.location.toLowerCase().includes(searchTerm) ||
      creator.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      creator.products.some(product => product.toLowerCase().includes(searchTerm))
    );
  }
  
  return results;
};

export const getCreatorCategories = () => {
  return Object.values(CREATOR_CATEGORIES);
};

export const getCreatorStats = () => {
  const totalCreators = creatorsData.length;
  const activeCreators = creatorsData.filter(creator => creator.isActive).length;
  const featuredCreators = creatorsData.filter(creator => creator.isFeatured).length;
  const categories = [...new Set(creatorsData.map(creator => creator.category))].length;
  const averageRating = creatorsData.reduce((sum, creator) => sum + creator.rating, 0) / totalCreators;
  
  return {
    totalCreators,
    activeCreators,
    featuredCreators,
    categories,
    averageRating: Math.round(averageRating * 10) / 10
  };
};

// Function to add a new creator
export const addCreator = (creatorData) => {
  const newId = Math.max(...creatorsData.map(c => c.id)) + 1;
  const newCreator = {
    id: newId,
    name: creatorData.name,
    location: creatorData.location || "Global",
    specialty: creatorData.specialty || "",
    category: creatorData.category || CREATOR_CATEGORIES.GENERAL,
    rating: creatorData.rating || 0,
    reviews: creatorData.reviews || 0,
    image: creatorData.image || "",
    story: creatorData.story || "",
    products: creatorData.products || [],
    totalProducts: creatorData.totalProducts || 0,
    totalDownloads: creatorData.totalDownloads || 0,
    description: creatorData.description || "",
    experience: creatorData.experience || "",
    techniques: creatorData.techniques || [],
    materials: creatorData.materials || [],
    isActive: creatorData.isActive !== undefined ? creatorData.isActive : true,
    isFeatured: creatorData.isFeatured !== undefined ? creatorData.isFeatured : false,
    socialMedia: creatorData.socialMedia || {},
    tags: creatorData.tags || []
  };
  
  creatorsData.push(newCreator);
  return newCreator;
};

// Function to update a creator
export const updateCreator = (creatorId, updates) => {
  const creatorIndex = creatorsData.findIndex(creator => creator.id === creatorId);
  if (creatorIndex !== -1) {
    creatorsData[creatorIndex] = { ...creatorsData[creatorIndex], ...updates };
    return creatorsData[creatorIndex];
  }
  return null;
};

// Function to delete a creator
export const deleteCreator = (creatorId) => {
  const creatorIndex = creatorsData.findIndex(creator => creator.id === creatorId);
  if (creatorIndex !== -1) {
    return creatorsData.splice(creatorIndex, 1)[0];
  }
  return null;
};

