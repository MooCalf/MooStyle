// Brands Data Management System
// This file contains all brand data and management functions

export const BRAND_CATEGORIES = {
  BEAUTY: "Beauty",
  FASHION: "Fashion", 
  LIFESTYLE: "Lifestyle",
  HEALTH: "Health",
  FOOD_BEVERAGE: "Food & Beverage",
  HOME_DESIGN: "Home & Design",
  ELECTRONICS: "Electronics",
  GENERAL: "General"
};

// Brand data array - easily manageable for adding new brands
export const brandsData = [
  {
    id: "lunaglow",
    name: "LunaGlow",
    category: BRAND_CATEGORIES.BEAUTY,
    description: "Korean skincare innovator specializing in glass skin routines and premium beauty solutions.",
    logo: "/projects/BrandCovers/More Brands/BrandButtons - LUNAGLOW.png",
    backgroundImage: "/projects/Products/LunaGlow/Korean Glass Skin Set/Lunaglow - Kit Promotional Cover.png",
    website: "https://lunaglow.com",
    founded: "2018",
    country: "South Korea",
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@lunaglow_official",
      twitter: "@lunaglow",
      facebook: "LunaGlowOfficial"
    },
    tags: ["Korean", "Skincare", "Glass Skin", "Premium"]
  },
  {
    id: "tokyovibe",
    name: "TokyoVibe",
    category: BRAND_CATEGORIES.BEAUTY,
    description: "Japanese beauty brand bringing authentic Tokyo street style and innovative makeup products.",
    logo: "/projects/BrandCovers/More Brands/BrandButtons - TOKYOVIBE.png",
    backgroundImage: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    website: "https://tokyovibe.com",
    founded: "2019",
    country: "Japan",
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@tokyovibe_official",
      twitter: "@tokyovibe",
      facebook: "TokyoVibeOfficial"
    },
    tags: ["Japanese", "Makeup", "Street Style", "Innovative"]
  },
  {
    id: "celestialbeauty",
    name: "CelestialBeauty",
    category: BRAND_CATEGORIES.BEAUTY,
    description: "Chinese herbal beauty brand combining traditional medicine with modern skincare science.",
    logo: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    backgroundImage: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    website: "https://celestialbeauty.com",
    founded: "2017",
    country: "China",
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@celestialbeauty_official",
      twitter: "@celestialbeauty",
      facebook: "CelestialBeautyOfficial"
    },
    tags: ["Chinese", "Herbal", "Traditional Medicine", "Skincare"]
  },
  {
    id: "pearlessence",
    name: "PearlEssence",
    category: BRAND_CATEGORIES.BEAUTY,
    description: "Korean makeup brand known for natural, dewy finishes and long-lasting color products.",
    logo: "/projects/BrandCovers/More Brands/BrandButtons - PEARLESENCE.png",
    backgroundImage: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
    website: "https://pearlessence.com",
    founded: "2020",
    country: "South Korea",
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@pearlessence_official",
      twitter: "@pearlessence",
      facebook: "PearlEssenceOfficial"
    },
    tags: ["Korean", "Makeup", "Natural", "Dewy Finish"]
  },
  {
    id: "mloo",
    name: "MLOO",
    category: BRAND_CATEGORIES.FOOD_BEVERAGE,
    description: "An online store specializing in delicious pastries, little snack bites, and typical cafe-style foods. MLOO brings you the perfect blend of comfort and indulgence with our carefully crafted baked goods and delightful treats.",
    logo: "/projects/Brand Medias/Mloo/Branding/Mloo - Logo (Black and White).webp",
    backgroundImage: "/projects/Brand Medias/Mloo/Branding/MLOO - Branding Advertising.webp",
    website: "https://mloo.com",
    founded: "2016",
    country: "Global",
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@mloo_official",
      twitter: "@mloo",
      facebook: "MLOOOfficial"
    },
    tags: ["Food", "Pastries", "Cafe", "Snacks"]
  },
  {
    id: "tokyoglow",
    name: "TokyoGlow",
    category: BRAND_CATEGORIES.BEAUTY,
    description: "Japanese skincare brand focused on fermented ingredients and radiant, healthy skin.",
    logo: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
    backgroundImage: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
    website: "https://tokyoglow.com",
    founded: "2019",
    country: "Japan",
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@tokyoglow_official",
      twitter: "@tokyoglow",
      facebook: "TokyoGlowOfficial"
    },
    tags: ["Japanese", "Skincare", "Fermented", "Radiant"]
  },
  {
    id: "herbalglow",
    name: "HerbalGlow",
    category: BRAND_CATEGORIES.BEAUTY,
    description: "Traditional Chinese beauty brand using ancient herbal wisdom for modern skincare needs.",
    logo: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
    backgroundImage: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
    website: "https://herbalglow.com",
    founded: "2018",
    country: "China",
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@herbalglow_official",
      twitter: "@herbalglow",
      facebook: "HerbalGlowOfficial"
    },
    tags: ["Chinese", "Herbal", "Traditional", "Skincare"]
  },
  {
    id: "seoulstyle",
    name: "SeoulStyle",
    category: BRAND_CATEGORIES.FASHION,
    description: "Korean fashion brand bringing Seoul's trendy street style to global audiences.",
    logo: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    backgroundImage: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    website: "https://seoulstyle.com",
    founded: "2020",
    country: "South Korea",
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@seoulstyle_official",
      twitter: "@seoulstyle",
      facebook: "SeoulStyleOfficial"
    },
    tags: ["Korean", "Fashion", "Street Style", "Trendy"]
  },
  {
    id: "tokyofashion",
    name: "TokyoFashion",
    category: BRAND_CATEGORIES.FASHION,
    description: "Japanese fashion house known for minimalist designs and high-quality materials.",
    logo: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    backgroundImage: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    website: "https://tokyofashion.com",
    founded: "2017",
    country: "Japan",
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@tokyofashion_official",
      twitter: "@tokyofashion",
      facebook: "TokyoFashionOfficial"
    },
    tags: ["Japanese", "Fashion", "Minimalist", "High Quality"]
  },
  {
    id: "silkroad",
    name: "SilkRoad",
    category: BRAND_CATEGORIES.FASHION,
    description: "Chinese luxury brand specializing in premium silk accessories and traditional craftsmanship.",
    logo: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
    backgroundImage: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
    website: "https://silkroad.com",
    founded: "2015",
    country: "China",
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@silkroad_official",
      twitter: "@silkroad",
      facebook: "SilkRoadOfficial"
    },
    tags: ["Chinese", "Luxury", "Silk", "Traditional"]
  },
  {
    id: "urbanharbor",
    name: "UrbanHarbor",
    category: BRAND_CATEGORIES.FASHION,
    description: "Korean streetwear brand creating comfortable, stylish urban fashion for modern lifestyles.",
    logo: "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
    backgroundImage: "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
    website: "https://urbanharbor.com",
    founded: "2021",
    country: "South Korea",
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@urbanharbor_official",
      twitter: "@urbanharbor",
      facebook: "UrbanHarborOfficial"
    },
    tags: ["Korean", "Streetwear", "Urban", "Comfortable"]
  },
  {
    id: "tokyodenim",
    name: "TokyoDenim",
    category: BRAND_CATEGORIES.FASHION,
    description: "Japanese denim specialist crafting premium jeans with traditional techniques and modern fits.",
    logo: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
    backgroundImage: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
    website: "https://tokyodenim.com",
    founded: "2018",
    country: "Japan",
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@tokyodenim_official",
      twitter: "@tokyodenim",
      facebook: "TokyoDenimOfficial"
    },
    tags: ["Japanese", "Denim", "Premium", "Traditional"]
  },
  {
    id: "zenlifestyle",
    name: "ZenLifestyle",
    category: BRAND_CATEGORIES.LIFESTYLE,
    description: "Japanese lifestyle brand promoting mindfulness through beautiful home and wellness products.",
    logo: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
    backgroundImage: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
    website: "https://zenlifestyle.com",
    founded: "2019",
    country: "Japan",
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@zenlifestyle_official",
      twitter: "@zenlifestyle",
      facebook: "ZenLifestyleOfficial"
    },
    tags: ["Japanese", "Lifestyle", "Mindfulness", "Wellness"]
  },
  {
    id: "harmonywell",
    name: "HarmonyWell",
    category: BRAND_CATEGORIES.LIFESTYLE,
    description: "Korean wellness brand creating products for balanced living and inner peace.",
    logo: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    backgroundImage: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    website: "https://harmonywell.com",
    founded: "2020",
    country: "South Korea",
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@harmonywell_official",
      twitter: "@harmonywell",
      facebook: "HarmonyWellOfficial"
    },
    tags: ["Korean", "Wellness", "Balance", "Inner Peace"]
  },
  {
    id: "wellnesscore",
    name: "WellnessCore",
    category: BRAND_CATEGORIES.HEALTH,
    description: "Korean health brand specializing in traditional supplements and energy-boosting products.",
    logo: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    backgroundImage: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    website: "https://wellnesscore.com",
    founded: "2018",
    country: "South Korea",
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@wellnesscore_official",
      twitter: "@wellnesscore",
      facebook: "WellnessCoreOfficial"
    },
    tags: ["Korean", "Health", "Supplements", "Energy"]
  },
  {
    id: "traditionalwell",
    name: "TraditionalWell",
    category: BRAND_CATEGORIES.HEALTH,
    description: "Chinese wellness brand bringing ancient healing wisdom to modern health needs.",
    logo: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
    backgroundImage: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
    website: "https://traditionalwell.com",
    founded: "2017",
    country: "China",
    isActive: true,
    isFeatured: false,
    socialMedia: {
      instagram: "@traditionalwell_official",
      twitter: "@traditionalwell",
      facebook: "TraditionalWellOfficial"
    },
    tags: ["Chinese", "Traditional", "Healing", "Wellness"]
  },
  {
    id: "arnoo",
    name: "ARNOO",
    category: BRAND_CATEGORIES.HOME_DESIGN,
    description: "Premium home renovation and interior design studio specializing in modern furniture and contemporary home decor. Transform your living spaces with our curated collection of sophisticated furniture pieces and innovative design solutions.",
    logo: "/projects/Brand Medias/Arnoo/Branding/Arnoo - Logo (Black and White).webp",
    backgroundImage: "/projects/Brand Medias/Arnoo/Branding/Arnoo - Branding Advertising.png",
    website: "https://arnoo.com",
    founded: "2023",
    country: "Global",
    isActive: true,
    isFeatured: true,
    socialMedia: {
      instagram: "@arnoo_official",
      twitter: "@arnoo",
      facebook: "ARNOOOfficial"
    },
    tags: ["Home", "Design", "Furniture", "Modern"]
  }
];

// Helper functions for brand management
export const getAllBrands = () => brandsData;

export const getBrandById = (brandId) => {
  return brandsData.find(brand => brand.id === brandId);
};

export const getBrandByName = (brandName) => {
  return brandsData.find(brand => brand.name === brandName);
};

export const getBrandsByCategory = (category) => {
  return brandsData.filter(brand => brand.category === category);
};

export const getFeaturedBrands = () => {
  return brandsData.filter(brand => brand.isFeatured);
};

export const getActiveBrands = () => {
  return brandsData.filter(brand => brand.isActive);
};

export const searchBrands = (query, filters = {}) => {
  let results = brandsData;
  
  // Apply filters
  if (filters.category) {
    results = results.filter(brand => brand.category === filters.category);
  }
  
  if (filters.country) {
    results = results.filter(brand => brand.country === filters.country);
  }
  
  if (filters.isFeatured !== undefined) {
    results = results.filter(brand => brand.isFeatured === filters.isFeatured);
  }
  
  if (filters.isActive !== undefined) {
    results = results.filter(brand => brand.isActive === filters.isActive);
  }
  
  // Apply search query
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase();
    results = results.filter(brand => 
      brand.name.toLowerCase().includes(searchTerm) ||
      brand.description.toLowerCase().includes(searchTerm) ||
      brand.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      brand.country.toLowerCase().includes(searchTerm)
    );
  }
  
  return results;
};

export const getBrandCategories = () => {
  return Object.values(BRAND_CATEGORIES);
};

export const getBrandStats = () => {
  const totalBrands = brandsData.length;
  const activeBrands = brandsData.filter(brand => brand.isActive).length;
  const featuredBrands = brandsData.filter(brand => brand.isFeatured).length;
  const categories = [...new Set(brandsData.map(brand => brand.category))].length;
  
  return {
    totalBrands,
    activeBrands,
    featuredBrands,
    categories
  };
};

// Function to add a new brand
export const addBrand = (brandData) => {
  const newBrand = {
    id: brandData.id || brandData.name.toLowerCase().replace(/\s+/g, ''),
    name: brandData.name,
    category: brandData.category || BRAND_CATEGORIES.GENERAL,
    description: brandData.description || "",
    logo: brandData.logo || "",
    backgroundImage: brandData.backgroundImage || "",
    website: brandData.website || "",
    founded: brandData.founded || "",
    country: brandData.country || "",
    isActive: brandData.isActive !== undefined ? brandData.isActive : true,
    isFeatured: brandData.isFeatured !== undefined ? brandData.isFeatured : false,
    socialMedia: brandData.socialMedia || {},
    tags: brandData.tags || []
  };
  
  brandsData.push(newBrand);
  return newBrand;
};

// Function to update a brand
export const updateBrand = (brandId, updates) => {
  const brandIndex = brandsData.findIndex(brand => brand.id === brandId);
  if (brandIndex !== -1) {
    brandsData[brandIndex] = { ...brandsData[brandIndex], ...updates };
    return brandsData[brandIndex];
  }
  return null;
};

// Function to delete a brand
export const deleteBrand = (brandId) => {
  const brandIndex = brandsData.findIndex(brand => brand.id === brandId);
  if (brandIndex !== -1) {
    return brandsData.splice(brandIndex, 1)[0];
  }
  return null;
};
