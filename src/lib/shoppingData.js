// Shopping Content Data System
// This file contains all the dynamic content for the shopping page

export const shoppingCategories = {
  beauty: {
    name: "Beauty",
    description: "Discover the latest in Asian beauty trends",
    subcategories: ["Skincare", "Makeup", "Hair Care", "Fragrance", "Tools & Accessories"],
    products: [
      {
        id: "beauty-001",
        name: "Korean Glass Skin Set",
        author: "LunaGlow",
        brand: "LunaGlow",
        price: 89.99,
        originalPrice: 129.99,
        image: "/Shopping Contents/Beauty/skincare-set-1.jpg",
        images: [
          "/Shopping Contents/Beauty/skincare-set-1.jpg",
          "/Shopping Contents/Beauty/skincare-set-2.jpg",
          "/Shopping Contents/Beauty/skincare-set-3.jpg",
          "/Shopping Contents/Beauty/skincare-set-4.jpg"
        ],
        description: "Complete Korean skincare routine for glass skin effect",
        detailedDescription: "Transform your skin with our premium Korean Glass Skin Set. This comprehensive 4-step routine combines the best of Korean skincare innovation to achieve that coveted glass skin effect. Formulated with hyaluronic acid, niacinamide, and traditional Korean ingredients like ginseng and green tea extract.",
        features: [
          "4-step complete skincare routine",
          "Hyaluronic acid for deep hydration",
          "Niacinamide for pore refinement",
          "Korean ginseng extract for skin vitality",
          "Green tea extract for antioxidant protection",
          "Dermatologist tested",
          "Cruelty-free and vegan"
        ],
        sizes: [
          { size: "Travel Size", price: 29.99, stock: 15 },
          { size: "Regular", price: 89.99, stock: 8 },
          { size: "Family Size", price: 149.99, stock: 3 }
        ],
        colors: [
          { name: "Original", hex: "#F5F5F5", image: "/Shopping Contents/Beauty/skincare-set-1.jpg" },
          { name: "Sensitive", hex: "#FFF8F0", image: "/Shopping Contents/Beauty/skincare-set-sensitive.jpg" }
        ],
        tags: ["Skincare", "Korean", "Glass Skin", "Hydrating"],
        rating: 4.8,
        reviewCount: 234,
        isNew: true,
        isBestSeller: false,
        discount: 31,
        inStock: true,
        shipping: "Free shipping on orders over $50",
        returnPolicy: "30-day return policy",
        ingredients: "Hyaluronic Acid, Niacinamide, Korean Ginseng Extract, Green Tea Extract, Ceramides",
        howToUse: "Apply cleanser, then toner, followed by serum, and finish with moisturizer. Use morning and evening for best results.",
        modFile: {
          filename: "korean-glass-skin-set.zip",
          size: 15728640, // 15MB
          version: "1.2.0"
        },
        downloadCount: 15420
      },
      {
        id: "beauty-002",
        name: "Japanese BB Cream",
        author: "TokyoVibe",
        brand: "TokyoVibe",
        price: 45.00,
        originalPrice: 60.00,
        image: "/Shopping Contents/Beauty/bb-cream-1.jpg",
        description: "Lightweight Japanese BB cream with SPF protection",
        tags: ["Makeup", "Japanese", "BB Cream", "SPF"],
        rating: 4.6,
        reviewCount: 189,
        isNew: false,
        isBestSeller: true,
        discount: 25,
        modFile: {
          filename: "japanese-bb-cream.zip",
          size: 8388608, // 8MB
          version: "1.0.0"
        },
        downloadCount: 8920
      },
      {
        id: "beauty-003",
        name: "Chinese Herbal Hair Mask",
        author: "CelestialBeauty",
        brand: "CelestialBeauty",
        price: 35.00,
        originalPrice: 50.00,
        image: "/Shopping Contents/Beauty/hair-mask-1.jpg",
        description: "Traditional Chinese herbal hair treatment",
        tags: ["Hair Care", "Chinese", "Herbal", "Repair"],
        rating: 4.7,
        reviewCount: 156,
        isNew: false,
        isBestSeller: false,
        discount: 30,
        modFile: {
          filename: "chinese-herbal-hair-mask.zip",
          size: 12582912, // 12MB
          version: "2.1.0"
        },
        downloadCount: 5670
      },
      {
        id: "beauty-004",
        name: "Korean Lip Tint Set",
        author: "PearlEssence",
        brand: "PearlEssence",
        price: 28.00,
        originalPrice: 40.00,
        image: "/Shopping Contents/Beauty/lip-tint-1.jpg",
        description: "Set of 3 Korean lip tints in popular shades",
        tags: ["Makeup", "Korean", "Lip Tint", "Set"],
        rating: 4.9,
        reviewCount: 203,
        isNew: true,
        isBestSeller: true,
        discount: 30,
        modFile: {
          filename: "korean-lip-tint-set.zip",
          size: 6291456, // 6MB
          version: "1.3.0"
        },
        downloadCount: 18750
      },
      {
        id: "beauty-005",
        name: "Korean Lip Gloss Set",
        author: "GlossyLips",
        brand: "GlossyLips",
        price: 32.00,
        originalPrice: 45.00,
        image: "/Shopping Contents/Beauty/lip-gloss-1.jpg",
        images: [
          "/Shopping Contents/Beauty/lip-gloss-1.jpg",
          "/Shopping Contents/Beauty/lip-gloss-2.jpg",
          "/Shopping Contents/Beauty/lip-gloss-3.jpg"
        ],
        description: "High-shine Korean lip gloss set with 5 trendy shades",
        detailedDescription: "Achieve the perfect Korean glass lip look with our premium lip gloss set. Each gloss is formulated with hyaluronic acid and vitamin E for long-lasting moisture and shine. The non-sticky formula provides comfortable wear while delivering intense color payoff.",
        features: [
          "5 trendy Korean-inspired shades",
          "Hyaluronic acid for deep hydration",
          "Vitamin E for lip protection",
          "Non-sticky formula",
          "Long-lasting shine",
          "Cruelty-free and vegan",
          "Paraben-free formula"
        ],
        sizes: [
          { size: "Mini Set", price: 18.00, stock: 20 },
          { size: "Regular Set", price: 32.00, stock: 12 },
          { size: "Deluxe Set", price: 45.00, stock: 5 }
        ],
        colors: [
          { name: "Cherry Blossom", hex: "#FFB6C1", image: "/Shopping Contents/Beauty/lip-gloss-cherry.jpg" },
          { name: "Peach Glow", hex: "#FFCCCB", image: "/Shopping Contents/Beauty/lip-gloss-peach.jpg" },
          { name: "Rose Gold", hex: "#E8B4B8", image: "/Shopping Contents/Beauty/lip-gloss-rose.jpg" }
        ],
        tags: ["Makeup", "Korean", "Lip Gloss", "High Shine", "Hydrating"],
        rating: 4.9,
        reviewCount: 312,
        isNew: true,
        isBestSeller: true,
        discount: 29,
        inStock: true,
        shipping: "Free shipping on orders over $30",
        returnPolicy: "30-day return policy",
        ingredients: "Hyaluronic Acid, Vitamin E, Jojoba Oil, Shea Butter, Natural Colorants",
        howToUse: "Apply directly to clean lips or over lipstick for extra shine. Start from the center and work outward. Reapply as needed throughout the day.",
        modFile: {
          filename: "korean-lip-gloss-set.zip",
          size: 12582912, // 12MB
          version: "1.4.0"
        },
        downloadCount: 22340
      },
      {
        id: "beauty-006",
        name: "Japanese Serum Essence",
        author: "TokyoGlow",
        brand: "TokyoGlow",
        price: 68.00,
        originalPrice: 85.00,
        image: "/Shopping Contents/Beauty/serum-essence-1.jpg",
        images: [
          "/Shopping Contents/Beauty/serum-essence-1.jpg",
          "/Shopping Contents/Beauty/serum-essence-2.jpg",
          "/Shopping Contents/Beauty/serum-essence-3.jpg"
        ],
        description: "Premium Japanese serum essence for radiant skin",
        detailedDescription: "Experience the power of Japanese skincare innovation with our premium serum essence. Formulated with fermented rice extract and sake, this lightweight essence penetrates deep into the skin to deliver intense hydration and brightening benefits.",
        features: [
          "Fermented rice extract for brightening",
          "Sake extract for skin renewal",
          "Hyaluronic acid for deep hydration",
          "Lightweight, fast-absorbing formula",
          "Suitable for all skin types",
          "Dermatologist tested",
          "Made in Japan"
        ],
        sizes: [
          { size: "30ml", price: 45.00, stock: 25 },
          { size: "50ml", price: 68.00, stock: 15 },
          { size: "100ml", price: 120.00, stock: 8 }
        ],
        colors: [
          { name: "Original", hex: "#F5F5F5", image: "/Shopping Contents/Beauty/serum-essence-1.jpg" }
        ],
        tags: ["Skincare", "Japanese", "Serum", "Essence", "Brightening", "Fermented"],
        rating: 4.8,
        reviewCount: 189,
        isNew: false,
        isBestSeller: true,
        discount: 20,
        inStock: true,
        shipping: "Free shipping on orders over $50",
        returnPolicy: "30-day return policy",
        ingredients: "Fermented Rice Extract, Sake Extract, Hyaluronic Acid, Ceramides, Niacinamide, Green Tea Extract",
        howToUse: "Apply 2-3 drops to clean skin after toner and before moisturizer. Gently pat into skin until fully absorbed. Use morning and evening for best results.",
        modFile: {
          filename: "japanese-serum-essence.zip",
          size: 18874368, // 18MB
          version: "2.1.0"
        },
        downloadCount: 15670
      },
      {
        id: "beauty-007",
        name: "Chinese Herbal Face Mask",
        author: "HerbalGlow",
        brand: "HerbalGlow",
        price: 28.00,
        originalPrice: 40.00,
        image: "/Shopping Contents/Beauty/herbal-mask-1.jpg",
        images: [
          "/Shopping Contents/Beauty/herbal-mask-1.jpg",
          "/Shopping Contents/Beauty/herbal-mask-2.jpg"
        ],
        description: "Traditional Chinese herbal face mask for detoxifying",
        detailedDescription: "Rejuvenate your skin with our traditional Chinese herbal face mask. Made with ancient Chinese herbs including ginseng, goji berry, and pearl powder, this mask helps detoxify and brighten the skin while providing deep nourishment.",
        features: [
          "Traditional Chinese herbs",
          "Ginseng for skin vitality",
          "Goji berry for antioxidant protection",
          "Pearl powder for brightening",
          "Clay base for deep cleansing",
          "Natural and organic ingredients",
          "Cruelty-free"
        ],
        sizes: [
          { size: "Single Use", price: 8.00, stock: 50 },
          { size: "5 Pack", price: 28.00, stock: 20 },
          { size: "10 Pack", price: 50.00, stock: 10 }
        ],
        colors: [
          { name: "Original", hex: "#F4E4BC", image: "/Shopping Contents/Beauty/herbal-mask-1.jpg" }
        ],
        tags: ["Skincare", "Chinese", "Herbal", "Face Mask", "Detoxifying", "Traditional"],
        rating: 4.7,
        reviewCount: 145,
        isNew: true,
        isBestSeller: false,
        discount: 30,
        inStock: true,
        shipping: "Free shipping on orders over $25",
        returnPolicy: "30-day return policy",
        ingredients: "Chinese Ginseng Extract, Goji Berry Extract, Pearl Powder, White Clay, Green Tea Extract, Licorice Root",
        howToUse: "Apply a thin layer to clean, dry skin avoiding the eye area. Leave on for 15-20 minutes, then rinse with warm water. Use 2-3 times per week for best results.",
        modFile: {
          filename: "chinese-herbal-face-mask.zip",
          size: 10485760, // 10MB
          version: "1.2.0"
        },
        downloadCount: 8930
      }
    ]
  },
  women: {
    name: "Women",
    description: "Elegant and trendy fashion for women",
    subcategories: ["Dresses", "Tops", "Bottoms", "Outerwear", "Accessories", "Shoes"],
    products: [
      {
        id: "women-001",
        name: "Korean A-Line Dress",
        author: "SeoulStyle",
        brand: "SeoulStyle",
        price: 75.00,
        originalPrice: 100.00,
        image: "/Shopping Contents/Women/dress-1.jpg",
        description: "Elegant Korean A-line dress perfect for any occasion",
        tags: ["Dresses", "Korean", "A-Line", "Elegant"],
        rating: 4.8,
        reviewCount: 167,
        isNew: true,
        isBestSeller: false,
        discount: 25,
        modFile: {
          filename: "korean-a-line-dress.zip",
          size: 20971520, // 20MB
          version: "1.5.0"
        },
        downloadCount: 12340
      },
      {
        id: "women-002",
        name: "Japanese Blouse",
        author: "TokyoFashion",
        brand: "TokyoFashion",
        price: 55.00,
        originalPrice: 70.00,
        image: "/Shopping Contents/Women/blouse-1.jpg",
        description: "Lightweight Japanese blouse with unique patterns",
        tags: ["Tops", "Japanese", "Blouse", "Pattern"],
        rating: 4.5,
        reviewCount: 134,
        isNew: false,
        isBestSeller: true,
        discount: 21,
        modFile: {
          filename: "japanese-blouse.zip",
          size: 16777216, // 16MB
          version: "1.1.0"
        },
        downloadCount: 9870
      },
      {
        id: "women-003",
        name: "Chinese Silk Scarf",
        author: "SilkRoad",
        brand: "SilkRoad",
        price: 45.00,
        originalPrice: 65.00,
        image: "/Shopping Contents/Women/scarf-1.jpg",
        description: "Luxurious Chinese silk scarf with traditional patterns",
        tags: ["Accessories", "Chinese", "Silk", "Traditional"],
        rating: 4.9,
        reviewCount: 98,
        isNew: false,
        isBestSeller: false,
        discount: 31,
        modFile: {
          filename: "chinese-silk-scarf.zip",
          size: 8388608, // 8MB
          version: "2.0.0"
        },
        downloadCount: 6540
      },
      // Homepage Fashion Products
      {
        id: "women-004",
        name: "TokyoVibe Streetwear",
        author: "TokyoVibe",
        brand: "TokyoVibe",
        price: 85.00,
        originalPrice: 110.00,
        image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
        description: "Modern Japanese fashion collection",
        tags: ["Fashion", "Japanese", "Streetwear", "Modern"],
        rating: 4.7,
        reviewCount: 156,
        isNew: true,
        isBestSeller: true,
        discount: 23,
        modFile: {
          filename: "tokyovibe-streetwear.zip",
          size: 15728640,
          version: "1.1.0"
        },
        downloadCount: 8920
      },
      {
        id: "women-005",
        name: "UrbanHarbor Collection",
        author: "UrbanHarbor",
        brand: "UrbanHarbor",
        price: 95.00,
        originalPrice: 125.00,
        image: "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
        description: "Contemporary Asian urban style",
        tags: ["Fashion", "Urban", "Contemporary", "Asian"],
        rating: 4.8,
        reviewCount: 203,
        isNew: false,
        isBestSeller: true,
        discount: 24,
        modFile: {
          filename: "urbanharbor-collection.zip",
          size: 18874368,
          version: "1.3.0"
        },
        downloadCount: 5670
      }
    ]
  },
  men: {
    name: "Men",
    description: "Modern and stylish fashion for men",
    subcategories: ["Shirts", "Pants", "Outerwear", "Accessories", "Shoes", "Activewear"],
    products: [
      {
        id: "men-001",
        name: "Korean Streetwear Hoodie",
        author: "UrbanHarbor",
        brand: "UrbanHarbor",
        price: 65.00,
        originalPrice: 85.00,
        image: "/Shopping Contents/Men/hoodie-1.jpg",
        description: "Comfortable Korean streetwear hoodie",
        tags: ["Outerwear", "Korean", "Hoodie", "Streetwear"],
        rating: 4.7,
        reviewCount: 145,
        isNew: true,
        isBestSeller: true,
        discount: 24,
        modFile: {
          filename: "korean-streetwear-hoodie.zip",
          size: 25165824, // 24MB
          version: "1.4.0"
        },
        downloadCount: 11230
      },
      {
        id: "men-002",
        name: "Japanese Denim Jeans",
        author: "TokyoDenim",
        brand: "TokyoDenim",
        price: 95.00,
        originalPrice: 120.00,
        image: "/Shopping Contents/Men/jeans-1.jpg",
        description: "Premium Japanese denim jeans",
        tags: ["Pants", "Japanese", "Denim", "Premium"],
        rating: 4.6,
        reviewCount: 178,
        isNew: false,
        isBestSeller: false,
        discount: 21,
        modFile: {
          filename: "japanese-denim-jeans.zip",
          size: 18874368, // 18MB
          version: "1.2.0"
        },
        downloadCount: 14560
      },
      // Homepage Recommended Products
      {
        id: "beauty-008",
        name: "LunaGlow Radiance Set",
        author: "LunaGlow",
        brand: "LunaGlow",
        price: 75.00,
        originalPrice: 95.00,
        image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
        description: "Complete Korean skincare routine",
        tags: ["Skincare", "Korean", "Radiance", "Set"],
        rating: 4.8,
        reviewCount: 234,
        isNew: true,
        isBestSeller: true,
        discount: 21,
        modFile: {
          filename: "lunaglow-radiance-set.zip",
          size: 12582912,
          version: "1.0.0"
        },
        downloadCount: 15420
      },
      {
        id: "beauty-009",
        name: "PearlEssence Rituals",
        author: "PearlEssence",
        brand: "PearlEssence",
        price: 65.00,
        originalPrice: 85.00,
        image: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
        description: "Korean beauty traditions",
        tags: ["Beauty", "Korean", "Rituals", "Traditional"],
        rating: 4.9,
        reviewCount: 178,
        isNew: false,
        isBestSeller: true,
        discount: 24,
        modFile: {
          filename: "pearlessence-rituals.zip",
          size: 10485760,
          version: "1.2.0"
        },
        downloadCount: 5670
      },
      {
        id: "beauty-010",
        name: "CelestialBeauty Luxe",
        author: "CelestialBeauty",
        brand: "CelestialBeauty",
        price: 95.00,
        originalPrice: 120.00,
        image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
        description: "Premium Chinese cosmetics line",
        tags: ["Beauty", "Chinese", "Luxe", "Premium"],
        rating: 4.9,
        reviewCount: 189,
        isNew: true,
        isBestSeller: true,
        discount: 21,
        modFile: {
          filename: "celestialbeauty-luxe.zip",
          size: 18874368,
          version: "1.2.0"
        },
        downloadCount: 3120
      }
    ]
  },
  lifestyle: {
    name: "Lifestyle",
    description: "Enhance your daily life with Asian-inspired products",
    subcategories: ["Home Decor", "Kitchen", "Wellness", "Books", "Electronics", "Stationery"],
    products: [
      {
        id: "lifestyle-001",
        name: "Japanese Tea Set",
        author: "ZenLifestyle",
        brand: "ZenLifestyle",
        price: 85.00,
        originalPrice: 110.00,
        image: "/Shopping Contents/Lifestyle/tea-set-1.jpg",
        description: "Traditional Japanese ceramic tea set",
        tags: ["Kitchen", "Japanese", "Tea Set", "Ceramic"],
        rating: 4.8,
        reviewCount: 123,
        isNew: true,
        isBestSeller: false,
        discount: 23,
        modFile: {
          filename: "japanese-tea-set.zip",
          size: 31457280, // 30MB
          version: "1.0.0"
        },
        downloadCount: 8760
      },
      {
        id: "lifestyle-002",
        name: "Korean Incense Set",
        author: "HarmonyWell",
        brand: "HarmonyWell",
        price: 35.00,
        originalPrice: 50.00,
        image: "/Shopping Contents/Lifestyle/incense-1.jpg",
        description: "Korean traditional incense for meditation",
        tags: ["Wellness", "Korean", "Incense", "Meditation"],
        rating: 4.5,
        reviewCount: 89,
        isNew: false,
        isBestSeller: true,
        discount: 30,
        modFile: {
          filename: "korean-incense-set.zip",
          size: 10485760, // 10MB
          version: "1.1.0"
        },
        downloadCount: 5430
      },
      // Homepage Lifestyle Products
      {
        id: "lifestyle-004",
        name: "ZenLifestyle Essentials",
        author: "ZenLifestyle",
        brand: "ZenLifestyle",
        price: 45.00,
        originalPrice: 60.00,
        image: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
        description: "Mindful wellness products",
        tags: ["Lifestyle", "Wellness", "Mindful", "Zen"],
        rating: 4.6,
        reviewCount: 134,
        isNew: true,
        isBestSeller: false,
        discount: 25,
        modFile: {
          filename: "zenlifestyle-essentials.zip",
          size: 10485760,
          version: "1.0.0"
        },
        downloadCount: 3450
      }
    ]
  },
  health: {
    name: "Health",
    description: "Traditional and modern health products from Asia",
    subcategories: ["Supplements", "Traditional Medicine", "Fitness", "Mental Health", "Personal Care"],
    products: [
      {
        id: "health-001",
        name: "Korean Ginseng Extract",
        author: "WellnessCore",
        brand: "WellnessCore",
        price: 45.00,
        originalPrice: 60.00,
        image: "/Shopping Contents/Health/ginseng-1.jpg",
        description: "Premium Korean ginseng extract for energy",
        tags: ["Supplements", "Korean", "Ginseng", "Energy"],
        rating: 4.7,
        reviewCount: 156,
        isNew: false,
        isBestSeller: true,
        discount: 25,
        modFile: {
          filename: "korean-ginseng-extract.zip",
          size: 7340032, // 7MB
          version: "1.3.0"
        },
        downloadCount: 9870
      },
      {
        id: "health-002",
        name: "Chinese Herbal Tea",
        author: "TraditionalWell",
        brand: "TraditionalWell",
        price: 25.00,
        originalPrice: 35.00,
        image: "/Shopping Contents/Health/herbal-tea-1.jpg",
        description: "Traditional Chinese herbal tea blend",
        tags: ["Traditional Medicine", "Chinese", "Herbal Tea", "Wellness"],
        rating: 4.6,
        reviewCount: 134,
        isNew: true,
        isBestSeller: false,
        discount: 29,
        modFile: {
          filename: "chinese-herbal-tea.zip",
          size: 5242880, // 5MB
          version: "1.0.0"
        },
        downloadCount: 4320
      }
    ]
  },
  blog: {
    name: "Blog",
    description: "Latest trends, tips, and insights from Asian culture",
    subcategories: ["Beauty Tips", "Fashion Trends", "Lifestyle", "Culture", "Reviews"],
    products: [
      {
        id: "blog-001",
        name: "Korean Skincare Guide",
        author: "MooStyle Blog",
        brand: "MooStyle Blog",
        price: 0,
        originalPrice: 0,
        image: "/Shopping Contents/Blog/skincare-guide-1.jpg",
        description: "Complete guide to Korean skincare routines",
        tags: ["Beauty Tips", "Korean", "Skincare", "Guide"],
        rating: 4.9,
        reviewCount: 156,
        isNew: true,
        isBestSeller: true,
        discount: 0,
        modFile: {
          filename: "korean-skincare-guide.zip",
          size: 2097152, // 2MB
          version: "1.0.0"
        },
        downloadCount: 25670
      },
      {
        id: "blog-002",
        name: "Japanese Fashion Trends",
        author: "MooStyle Blog",
        brand: "MooStyle Blog",
        price: 0,
        originalPrice: 0,
        image: "/Shopping Contents/Blog/fashion-trends-1.jpg",
        description: "Latest Japanese streetwear and fashion trends",
        tags: ["Fashion Trends", "Japanese", "Streetwear", "Trends"],
        rating: 4.7,
        reviewCount: 89,
        isNew: false,
        isBestSeller: false,
        discount: 0,
        modFile: {
          filename: "japanese-fashion-trends.zip",
          size: 3145728, // 3MB
          version: "1.0.0"
        },
        downloadCount: 18940
      }
    ]
  }
};

// Helper functions for content management
export const getCategoryData = (category) => {
  return shoppingCategories[category] || null;
};

export const getAllProducts = () => {
  const allProducts = [];
  Object.values(shoppingCategories).forEach(category => {
    allProducts.push(...category.products);
  });
  return allProducts;
};

export const getProductsByCategory = (category) => {
  const categoryData = getCategoryData(category);
  return categoryData ? categoryData.products : [];
};

export const searchProducts = (query, filters = {}) => {
  let products = getAllProducts();
  
  // Text search
  if (query) {
    products = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }
  
  // Filter by category
  if (filters.category) {
    products = products.filter(product => 
      getProductsByCategory(filters.category).includes(product)
    );
  }
  
  // Filter by subcategory
  if (filters.subcategory) {
    products = products.filter(product => 
      product.tags.includes(filters.subcategory)
    );
  }
  
  // Filter by price range
  if (filters.priceRange) {
    const [min, max] = filters.priceRange.split('-').map(Number);
    products = products.filter(product => {
      if (max) {
        return product.price >= min && product.price <= max;
      } else {
        return product.price >= min;
      }
    });
  }
  
  // Filter by brand
  if (filters.brand) {
    products = products.filter(product => 
      product.brand.toLowerCase().includes(filters.brand.toLowerCase())
    );
  }
  
  // Filter by rating
  if (filters.rating) {
    const minRating = parseInt(filters.rating);
    products = products.filter(product => product.rating >= minRating);
  }
  
  return products;
};

export const getFilterOptions = (category = null) => {
  const products = category ? getProductsByCategory(category) : getAllProducts();
  
  const brands = [...new Set(products.map(p => p.brand))];
  const tags = [...new Set(products.flatMap(p => p.tags))];
  
  return {
    brands: brands.sort(),
    subcategories: tags.sort(),
    priceRanges: [
      { label: "Under $25", value: "0-25" },
      { label: "$25 - $50", value: "25-50" },
      { label: "$50 - $100", value: "50-100" },
      { label: "$100+", value: "100-999" }
    ],
    ratings: [
      { label: "4+ Stars", value: "4" },
      { label: "3+ Stars", value: "3" },
      { label: "2+ Stars", value: "2" }
    ]
  };
};

// Product detail functions
export const getProductById = (productId) => {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === productId) || null;
};

export const getRelatedProducts = (productId, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];
  
  const allProducts = getAllProducts();
  const relatedProducts = allProducts
    .filter(p => p.id !== productId && p.tags.some(tag => product.tags.includes(tag)))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
  
  return relatedProducts;
};

export const getProductCategory = (productId) => {
  const product = getProductById(productId);
  if (!product) return null;
  
  for (const [categoryName, categoryData] of Object.entries(shoppingCategories)) {
    if (categoryData.products.some(p => p.id === productId)) {
      return categoryName;
    }
  }
  return null;
};
