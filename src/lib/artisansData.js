// Artisans Data Management System
// This file contains all artisan data and management functions

export const ARTISAN_CATEGORIES = {
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

export const ARTISAN_REGIONS = {
  SOUTH_KOREA: "South Korea",
  JAPAN: "Japan",
  CHINA: "China",
  INDIA: "India",
  THAILAND: "Thailand",
  VIETNAM: "Vietnam",
  SINGAPORE: "Singapore",
  MALAYSIA: "Malaysia",
  PHILIPPINES: "Philippines",
  INDONESIA: "Indonesia"
};

// Artisan data array - easily manageable for adding new artisans
export const artisansData = [
  {
    id: 1,
    name: "Maya Chen",
    location: "Seoul, South Korea",
    region: ARTISAN_REGIONS.SOUTH_KOREA,
    specialty: "Korean Ceramics",
    category: ARTISAN_CATEGORIES.CERAMICS,
    rating: 4.9,
    reviews: 127,
    image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
    story: "Traditional Korean pottery techniques passed down through generations",
    products: ["Ceramic Tea Sets", "Hand-painted Bowls", "Traditional Vases"],
    totalProducts: 45,
    totalDownloads: 2340,
    description: "Master ceramicist specializing in traditional Korean pottery with contemporary designs",
    experience: "15+ years",
    techniques: ["Traditional Korean Pottery", "Hand-painting", "Glazing"],
    materials: ["Clay", "Traditional Glazes", "Natural Pigments"],
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@maya_chen_ceramics",
      website: "https://mayachenceramics.com"
    },
    tags: ["Korean", "Ceramics", "Traditional", "Pottery"]
  },
  {
    id: 2,
    name: "Hiroshi Tanaka",
    location: "Kyoto, Japan",
    region: ARTISAN_REGIONS.JAPAN,
    specialty: "Japanese Textiles",
    category: ARTISAN_CATEGORIES.TEXTILES,
    rating: 4.8,
    reviews: 89,
    image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    story: "Master of traditional Japanese weaving and dyeing techniques",
    products: ["Silk Kimonos", "Indigo Dyed Fabrics", "Traditional Obi Belts"],
    totalProducts: 32,
    totalDownloads: 1890,
    description: "Traditional Japanese textile artist preserving ancient weaving techniques",
    experience: "20+ years",
    techniques: ["Traditional Weaving", "Indigo Dyeing", "Silk Production"],
    materials: ["Silk", "Indigo", "Natural Dyes"],
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@hiroshi_tanaka_textiles",
      website: "https://hiroshitanakatextiles.com"
    },
    tags: ["Japanese", "Textiles", "Traditional", "Weaving"]
  },
  {
    id: 3,
    name: "Li Wei",
    location: "Beijing, China",
    region: ARTISAN_REGIONS.CHINA,
    specialty: "Chinese Calligraphy",
    category: ARTISAN_CATEGORIES.ART,
    rating: 4.9,
    reviews: 156,
    image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    story: "Contemporary artist blending traditional calligraphy with modern design",
    products: ["Calligraphy Sets", "Hand-painted Scrolls", "Custom Artwork"],
    totalProducts: 28,
    totalDownloads: 3120,
    description: "Contemporary calligraphy artist bridging traditional Chinese art with modern aesthetics",
    experience: "12+ years",
    techniques: ["Traditional Calligraphy", "Modern Design", "Scroll Painting"],
    materials: ["Rice Paper", "Ink", "Brushes"],
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@liwei_calligraphy",
      website: "https://liweicalligraphy.com"
    },
    tags: ["Chinese", "Calligraphy", "Art", "Traditional"]
  },
  {
    id: 4,
    name: "Priya Sharma",
    location: "Mumbai, India",
    region: ARTISAN_REGIONS.INDIA,
    specialty: "Indian Jewelry",
    category: ARTISAN_CATEGORIES.JEWELRY,
    rating: 4.7,
    reviews: 203,
    image: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
    story: "Handcrafted jewelry using traditional Indian techniques and modern aesthetics",
    products: ["Gold Earrings", "Gemstone Necklaces", "Traditional Bangles"],
    totalProducts: 67,
    totalDownloads: 4560,
    description: "Master jeweler creating exquisite pieces using traditional Indian craftsmanship",
    experience: "18+ years",
    techniques: ["Traditional Jewelry Making", "Gem Setting", "Metalwork"],
    materials: ["Gold", "Silver", "Gemstones"],
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@priya_sharma_jewelry",
      website: "https://priyasharmajewelry.com"
    },
    tags: ["Indian", "Jewelry", "Traditional", "Handcrafted"]
  },
  {
    id: 5,
    name: "Sakura Yamamoto",
    location: "Tokyo, Japan",
    region: ARTISAN_REGIONS.JAPAN,
    specialty: "Japanese Beauty",
    category: ARTISAN_CATEGORIES.BEAUTY,
    rating: 4.8,
    reviews: 94,
    image: "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
    story: "Natural skincare products inspired by Japanese beauty rituals",
    products: ["Rice Powder", "Green Tea Serums", "Traditional Face Masks"],
    totalProducts: 23,
    totalDownloads: 1780,
    description: "Natural beauty expert specializing in traditional Japanese skincare formulations",
    experience: "10+ years",
    techniques: ["Traditional Formulation", "Natural Extraction", "Herbal Processing"],
    materials: ["Rice", "Green Tea", "Natural Herbs"],
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@sakura_yamamoto_beauty",
      website: "https://sakurayamamotobeauty.com"
    },
    tags: ["Japanese", "Beauty", "Natural", "Skincare"]
  },
  {
    id: 6,
    name: "Kim Min-jun",
    location: "Busan, South Korea",
    region: ARTISAN_REGIONS.SOUTH_KOREA,
    specialty: "Korean Fashion",
    category: ARTISAN_CATEGORIES.FASHION,
    rating: 4.9,
    reviews: 178,
    image: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
    story: "Contemporary fashion designer blending Korean heritage with modern trends",
    products: ["Streetwear", "Traditional Hanbok", "Accessories"],
    totalProducts: 89,
    totalDownloads: 5670,
    description: "Innovative fashion designer merging traditional Korean elements with contemporary style",
    experience: "8+ years",
    techniques: ["Traditional Sewing", "Modern Design", "Pattern Making"],
    materials: ["Silk", "Cotton", "Traditional Fabrics"],
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@kimminjun_fashion",
      website: "https://kimminjunfashion.com"
    },
    tags: ["Korean", "Fashion", "Traditional", "Contemporary"]
  },
  {
    id: 7,
    name: "Yuki Nakamura",
    location: "Osaka, Japan",
    region: ARTISAN_REGIONS.JAPAN,
    specialty: "Japanese Woodworking",
    category: ARTISAN_CATEGORIES.WOODWORKING,
    rating: 4.8,
    reviews: 112,
    image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
    story: "Traditional Japanese woodworking techniques for modern furniture",
    products: ["Wooden Tables", "Traditional Cabinets", "Hand-carved Bowls"],
    totalProducts: 34,
    totalDownloads: 1890,
    description: "Master woodworker creating functional art using traditional Japanese techniques",
    experience: "22+ years",
    techniques: ["Traditional Joinery", "Hand Carving", "Wood Finishing"],
    materials: ["Cedar", "Cypress", "Traditional Woods"],
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@yuki_nakamura_woodwork",
      website: "https://yukinakamurawoodwork.com"
    },
    tags: ["Japanese", "Woodworking", "Traditional", "Furniture"]
  },
  {
    id: 8,
    name: "Chen Xiaoli",
    location: "Shanghai, China",
    region: ARTISAN_REGIONS.CHINA,
    specialty: "Chinese Embroidery",
    category: ARTISAN_CATEGORIES.TEXTILES,
    rating: 4.9,
    reviews: 145,
    image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    story: "Intricate Chinese embroidery preserving ancient needlework traditions",
    products: ["Embroidered Scarves", "Traditional Dresses", "Decorative Panels"],
    totalProducts: 41,
    totalDownloads: 2340,
    description: "Embroidery master creating stunning pieces using traditional Chinese needlework",
    experience: "16+ years",
    techniques: ["Traditional Embroidery", "Silk Thread Work", "Pattern Design"],
    materials: ["Silk Thread", "Fine Fabrics", "Traditional Tools"],
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@chen_xiaoli_embroidery",
      website: "https://chenxiaoliembroidery.com"
    },
    tags: ["Chinese", "Embroidery", "Traditional", "Needlework"]
  },
  {
    id: 9,
    name: "Raj Patel",
    location: "Delhi, India",
    region: ARTISAN_REGIONS.INDIA,
    specialty: "Indian Spices",
    category: ARTISAN_CATEGORIES.FOOD,
    rating: 4.7,
    reviews: 167,
    image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    story: "Authentic Indian spice blends and traditional cooking ingredients",
    products: ["Spice Blends", "Traditional Masalas", "Cooking Kits"],
    totalProducts: 56,
    totalDownloads: 3450,
    description: "Spice master creating authentic Indian blends using traditional family recipes",
    experience: "25+ years",
    techniques: ["Traditional Grinding", "Spice Blending", "Quality Control"],
    materials: ["Traditional Spices", "Natural Ingredients", "Traditional Tools"],
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@raj_patel_spices",
      website: "https://rajpatelspices.com"
    },
    tags: ["Indian", "Spices", "Traditional", "Cooking"]
  }
];

// Helper functions for artisan management
export const getAllArtisans = () => artisansData;

export const getArtisanById = (artisanId) => {
  return artisansData.find(artisan => artisan.id === artisanId);
};

export const getArtisanByName = (artisanName) => {
  return artisansData.find(artisan => artisan.name === artisanName);
};

export const getArtisansByCategory = (category) => {
  return artisansData.filter(artisan => artisan.category === category);
};

export const getArtisansByRegion = (region) => {
  return artisansData.filter(artisan => artisan.region === region);
};

export const getFeaturedArtisans = () => {
  return artisansData.filter(artisan => artisan.isFeatured);
};

export const getActiveArtisans = () => {
  return artisansData.filter(artisan => artisan.isActive);
};

export const searchArtisans = (query, filters = {}) => {
  let results = artisansData;
  
  // Apply filters
  if (filters.category) {
    results = results.filter(artisan => artisan.category === filters.category);
  }
  
  if (filters.region) {
    results = results.filter(artisan => artisan.region === filters.region);
  }
  
  if (filters.minRating) {
    results = results.filter(artisan => artisan.rating >= filters.minRating);
  }
  
  if (filters.isFeatured !== undefined) {
    results = results.filter(artisan => artisan.isFeatured === filters.isFeatured);
  }
  
  if (filters.isActive !== undefined) {
    results = results.filter(artisan => artisan.isActive === filters.isActive);
  }
  
  // Apply search query
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase();
    results = results.filter(artisan => 
      artisan.name.toLowerCase().includes(searchTerm) ||
      artisan.specialty.toLowerCase().includes(searchTerm) ||
      artisan.description.toLowerCase().includes(searchTerm) ||
      artisan.location.toLowerCase().includes(searchTerm) ||
      artisan.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      artisan.products.some(product => product.toLowerCase().includes(searchTerm))
    );
  }
  
  return results;
};

export const getArtisanCategories = () => {
  return Object.values(ARTISAN_CATEGORIES);
};

export const getArtisanRegions = () => {
  return Object.values(ARTISAN_REGIONS);
};

export const getArtisanStats = () => {
  const totalArtisans = artisansData.length;
  const activeArtisans = artisansData.filter(artisan => artisan.isActive).length;
  const featuredArtisans = artisansData.filter(artisan => artisan.isFeatured).length;
  const categories = [...new Set(artisansData.map(artisan => artisan.category))].length;
  const regions = [...new Set(artisansData.map(artisan => artisan.region))].length;
  const averageRating = artisansData.reduce((sum, artisan) => sum + artisan.rating, 0) / totalArtisans;
  
  return {
    totalArtisans,
    activeArtisans,
    featuredArtisans,
    categories,
    regions,
    averageRating: Math.round(averageRating * 10) / 10
  };
};

// Function to add a new artisan
export const addArtisan = (artisanData) => {
  const newId = Math.max(...artisansData.map(a => a.id)) + 1;
  const newArtisan = {
    id: newId,
    name: artisanData.name,
    location: artisanData.location,
    region: artisanData.region || ARTISAN_REGIONS.GENERAL,
    specialty: artisanData.specialty || "",
    category: artisanData.category || ARTISAN_CATEGORIES.GENERAL,
    rating: artisanData.rating || 0,
    reviews: artisanData.reviews || 0,
    image: artisanData.image || "",
    story: artisanData.story || "",
    products: artisanData.products || [],
    totalProducts: artisanData.totalProducts || 0,
    totalDownloads: artisanData.totalDownloads || 0,
    description: artisanData.description || "",
    experience: artisanData.experience || "",
    techniques: artisanData.techniques || [],
    materials: artisanData.materials || [],
    isActive: artisanData.isActive !== undefined ? artisanData.isActive : true,
    isFeatured: artisanData.isFeatured !== undefined ? artisanData.isFeatured : false,
    socialMedia: artisanData.socialMedia || {},
    tags: artisanData.tags || []
  };
  
  artisansData.push(newArtisan);
  return newArtisan;
};

// Function to update an artisan
export const updateArtisan = (artisanId, updates) => {
  const artisanIndex = artisansData.findIndex(artisan => artisan.id === artisanId);
  if (artisanIndex !== -1) {
    artisansData[artisanIndex] = { ...artisansData[artisanIndex], ...updates };
    return artisansData[artisanIndex];
  }
  return null;
};

// Function to delete an artisan
export const deleteArtisan = (artisanId) => {
  const artisanIndex = artisansData.findIndex(artisan => artisan.id === artisanId);
  if (artisanIndex !== -1) {
    return artisansData.splice(artisanIndex, 1)[0];
  }
  return null;
};
