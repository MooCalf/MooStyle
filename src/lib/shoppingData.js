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
        folderPath: "Products/LunaGlow/Korean Glass Skin Set", // Exact folder path for downloads
        price: 89.99,
        originalPrice: 129.99,
        image: "/projects/BETATESTINGIMAGES/M_p0217730395.jpg",
        images: [
          "/projects/BETATESTINGIMAGES/M_p0217730395.jpg",
          "/projects/BETATESTINGIMAGES/M_p0219136879.png",
          "/projects/BETATESTINGIMAGES/M_p0194400752.jpg"
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
        modFile: {
          filename: "korean-glass-skin-set.zip",
          size: 15728640, // 15MB
          version: "1.2.0"
        },
        downloadCount: 15420,
        howToUse: "Apply cleanser, then toner, followed by serum, and finish with moisturizer. Use morning and evening for best results."
      },
      {
        id: "beauty-002",
        name: "Japanese BB Cream",
        author: "TokyoVibe",
        brand: "TokyoVibe",
        folderPath: "Products/TokyoVibe/Japanese BB Cream",
        price: 45.00,
        originalPrice: 60.00,
        image: "/projects/BETATESTINGIMAGES/M_p0153126832.jpg",
        images: [
          "/projects/BETATESTINGIMAGES/M_p0153126832.jpg",
          "/projects/BETATESTINGIMAGES/M_p0173471010.jpg"
        ],
        description: "Lightweight Japanese BB cream with SPF protection",
        detailedDescription: "Experience the perfect fusion of Japanese skincare innovation and makeup artistry with our premium BB cream. This lightweight formula provides natural coverage while delivering skincare benefits, including SPF protection and skin-brightening properties.",
        features: [
          "SPF 30 sun protection",
          "Lightweight, breathable formula",
          "Natural skin-brightening effect",
          "Hydrating hyaluronic acid",
          "Long-lasting coverage",
          "Suitable for all skin types",
          "Cruelty-free and vegan"
        ],
        sizes: [
          { size: "30ml", price: 35.00, stock: 20 },
          { size: "50ml", price: 45.00, stock: 15 },
          { size: "75ml", price: 60.00, stock: 8 }
        ],
        colors: [
          { name: "Light", hex: "#F5F5DC", image: "/Shopping Contents/Beauty/bb-cream-light.jpg" },
          { name: "Medium", hex: "#D2B48C", image: "/Shopping Contents/Beauty/bb-cream-medium.jpg" },
          { name: "Deep", hex: "#8B4513", image: "/Shopping Contents/Beauty/bb-cream-deep.jpg" }
        ],
        tags: ["Makeup", "Japanese", "BB Cream", "SPF"],
        rating: 4.6,
        reviewCount: 189,
        isNew: false,
        isBestSeller: true,
        discount: 25,
        inStock: true,
        shipping: "Free shipping on orders over $30",
        returnPolicy: "30-day return policy",
        ingredients: "Hyaluronic Acid, SPF 30, Vitamin C, Niacinamide, Japanese Rice Extract",
        modFile: {
          filename: "japanese-bb-cream.zip",
          size: 8388608, // 8MB
          version: "1.0.0"
        },
        downloadCount: 8920,
        howToUse: "Apply evenly to clean skin using fingertips or a makeup sponge. Start from the center of the face and blend outward. Can be used alone or as a base for additional makeup."
      },
      {
        id: "beauty-003",
        name: "Chinese Herbal Hair Mask",
        author: "CelestialBeauty",
        brand: "CelestialBeauty",
        folderPath: "Products/CelestialBeauty/Chinese Herbal Hair Mask",
        price: 35.00,
        originalPrice: 50.00,
        image: "/projects/BETATESTINGIMAGES/M_p0188313813.jpg",
        images: [
          "/projects/BETATESTINGIMAGES/M_p0188313813.jpg",
          "/projects/BETATESTINGIMAGES/M_p0212227403.jpg"
        ],
        description: "Traditional Chinese herbal hair treatment",
        detailedDescription: "Revitalize your hair with our traditional Chinese herbal hair mask, crafted using ancient Chinese medicine principles. This intensive treatment combines powerful herbs like ginseng, goji berry, and black sesame to restore hair health and promote growth.",
        features: [
          "Traditional Chinese herbal formula",
          "Ginseng for hair strength",
          "Goji berry for scalp health",
          "Black sesame for shine",
          "Deep conditioning treatment",
          "Natural and organic ingredients",
          "Suitable for all hair types"
        ],
        sizes: [
          { size: "200ml", price: 25.00, stock: 25 },
          { size: "350ml", price: 35.00, stock: 18 },
          { size: "500ml", price: 50.00, stock: 12 }
        ],
        colors: [
          { name: "Original", hex: "#8B4513", image: "/Shopping Contents/Beauty/hair-mask-original.jpg" }
        ],
        tags: ["Hair Care", "Chinese", "Herbal", "Repair"],
        rating: 4.7,
        reviewCount: 156,
        isNew: false,
        isBestSeller: false,
        discount: 30,
        inStock: true,
        shipping: "Free shipping on orders over $25",
        returnPolicy: "30-day return policy",
        ingredients: "Chinese Ginseng Extract, Goji Berry Extract, Black Sesame Oil, Green Tea Extract, Vitamin E",
        modFile: {
          filename: "chinese-herbal-hair-mask.zip",
          size: 12582912, // 12MB
          version: "2.1.0"
        },
        downloadCount: 5670,
        howToUse: "Apply to clean, damp hair from roots to ends. Leave on for 15-20 minutes, then rinse thoroughly with warm water. Use once or twice per week for best results."
      },
      {
        id: "beauty-004",
        name: "Korean Lip Tint Set",
        author: "PearlEssence",
        brand: "PearlEssence",
        folderPath: "Products/PearlEssence/Korean Lip Tint Set",
        price: 28.00,
        originalPrice: 40.00,
        image: "/projects/BETATESTINGIMAGES/M_p0219369326.jpg",
        images: [
          "/projects/BETATESTINGIMAGES/M_p0219369326.jpg",
          "/projects/BETATESTINGIMAGES/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png"
        ],
        description: "Set of 3 Korean lip tints in popular shades",
        detailedDescription: "Achieve the perfect Korean gradient lip look with our premium lip tint set. Each tint is formulated with natural fruit extracts and provides long-lasting, buildable color that creates the signature Korean lip effect.",
        features: [
          "3 popular Korean-inspired shades",
          "Natural fruit extracts",
          "Long-lasting formula",
          "Buildable color intensity",
          "Non-drying formula",
          "Cruelty-free and vegan",
          "Perfect for gradient lips"
        ],
        sizes: [
          { size: "3-Pack", price: 28.00, stock: 20 },
          { size: "5-Pack", price: 45.00, stock: 15 },
          { size: "Deluxe Set", price: 60.00, stock: 8 }
        ],
        colors: [
          { name: "Cherry Blossom", hex: "#FFB6C1", image: "/Shopping Contents/Beauty/lip-tint-cherry.jpg" },
          { name: "Peach Glow", hex: "#FFCCCB", image: "/Shopping Contents/Beauty/lip-tint-peach.jpg" },
          { name: "Rose Pink", hex: "#E8B4B8", image: "/Shopping Contents/Beauty/lip-tint-rose.jpg" }
        ],
        tags: ["Makeup", "Korean", "Lip Tint", "Set"],
        rating: 4.9,
        reviewCount: 203,
        isNew: true,
        isBestSeller: true,
        discount: 30,
        inStock: true,
        shipping: "Free shipping on orders over $25",
        returnPolicy: "30-day return policy",
        ingredients: "Natural Fruit Extracts, Vitamin E, Hyaluronic Acid, Jojoba Oil, Natural Colorants",
        modFile: {
          filename: "korean-lip-tint-set.zip",
          size: 6291456, // 6MB
          version: "1.3.0"
        },
        downloadCount: 18750,
        howToUse: "Apply a small amount to the center of lips and blend outward for gradient effect. Layer for more intense color. Can be used alone or over lip balm for hydration."
      },
      {
        id: "beauty-005",
        name: "Artisan Pastry Collection",
        author: "MLOO",
        brand: "MLOO",
        price: 32.00,
        originalPrice: 45.00,
        image: "/projects/BETATESTINGIMAGES/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
        images: [
          "/projects/BETATESTINGIMAGES/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
          "/projects/BETATESTINGIMAGES/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png"
        ],
        description: "Handcrafted pastries and cafe-style treats made with premium ingredients",
        detailedDescription: "Indulge in our carefully crafted artisan pastry collection featuring traditional recipes with a modern twist. Each pastry is made fresh daily using premium ingredients and time-honored techniques. Perfect for breakfast, afternoon tea, or as a delightful treat any time of day.",
        features: [
          "5 assorted artisan pastries",
          "Made with premium butter and flour",
          "Traditional baking techniques",
          "Fresh ingredients sourced locally",
          "Perfect for breakfast or afternoon tea",
          "Individually wrapped for freshness",
          "No artificial preservatives"
        ],
        sizes: [
          { size: "Small Box", price: 18.00, stock: 20 },
          { size: "Regular Box", price: 32.00, stock: 12 },
          { size: "Large Box", price: 45.00, stock: 5 }
        ],
        colors: [
          { name: "Chocolate", hex: "#8B4513", image: "/Shopping Contents/Food/chocolate-pastry.jpg" },
          { name: "Vanilla", hex: "#F5F5DC", image: "/Shopping Contents/Food/vanilla-pastry.jpg" },
          { name: "Strawberry", hex: "#FFB6C1", image: "/Shopping Contents/Food/strawberry-pastry.jpg" }
        ],
        tags: ["Pastries", "Cafe", "Artisan", "Fresh", "Handmade"],
        rating: 4.9,
        reviewCount: 312,
        isNew: true,
        isBestSeller: true,
        discount: 29,
        inStock: true,
        shipping: "Free shipping on orders over $30",
        returnPolicy: "30-day return policy",
        ingredients: "Premium Flour, Fresh Butter, Free-Range Eggs, Pure Vanilla Extract, Natural Sweeteners",
        howToUse: "Best enjoyed fresh! Store in a cool, dry place. Perfect for breakfast, afternoon tea, or as a delightful treat. Serve at room temperature for optimal flavor and texture.",
        modFile: {
          filename: "artisan-pastry-collection.zip",
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
        image: "/projects/BETATESTINGIMAGES/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
        images: [
          "/projects/BETATESTINGIMAGES/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
          "/projects/BETATESTINGIMAGES/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png"
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
        image: "/projects/BETATESTINGIMAGES/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
        images: [
          "/projects/BETATESTINGIMAGES/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png"
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
        folderPath: "Products/SeoulStyle/Korean A-Line Dress",
        price: 75.00,
        originalPrice: 100.00,
        image: "/projects/BETATESTINGIMAGES/M_p0217730395.jpg",
        images: [
          "/projects/BETATESTINGIMAGES/M_p0217730395.jpg",
          "/projects/BETATESTINGIMAGES/M_p0219136879.png"
        ],
        description: "Elegant Korean A-line dress perfect for any occasion",
        detailedDescription: "Embrace Korean fashion elegance with our signature A-line dress. Featuring a flattering silhouette that cinches at the waist and flows beautifully to the hem, this dress combines modern Korean design with timeless elegance. Perfect for both casual and formal occasions.",
        features: [
          "Flattering A-line silhouette",
          "High-quality Korean fabric",
          "Comfortable fit for all body types",
          "Versatile styling options",
          "Easy care and maintenance",
          "Modern Korean design",
          "Perfect length for any occasion"
        ],
        sizes: [
          { size: "XS", price: 75.00, stock: 15 },
          { size: "S", price: 75.00, stock: 20 },
          { size: "M", price: 75.00, stock: 25 },
          { size: "L", price: 75.00, stock: 18 },
          { size: "XL", price: 75.00, stock: 12 }
        ],
        colors: [
          { name: "Black", hex: "#000000", image: "/Shopping Contents/Women/dress-black.jpg" },
          { name: "Navy", hex: "#000080", image: "/Shopping Contents/Women/dress-navy.jpg" },
          { name: "Cream", hex: "#F5F5DC", image: "/Shopping Contents/Women/dress-cream.jpg" },
          { name: "Dusty Rose", hex: "#D2B48C", image: "/Shopping Contents/Women/dress-rose.jpg" }
        ],
        tags: ["Dresses", "Korean", "A-Line", "Elegant"],
        rating: 4.8,
        reviewCount: 167,
        isNew: true,
        isBestSeller: false,
        discount: 25,
        inStock: true,
        shipping: "Free shipping on orders over $50",
        returnPolicy: "30-day return policy",
        materials: "Polyester Blend, Spandex, Korean Cotton",
        modFile: {
          filename: "korean-a-line-dress.zip",
          size: 20971520, // 20MB
          version: "1.5.0"
        },
        downloadCount: 12340,
        careInstructions: "Machine wash cold, tumble dry low. Iron on low heat if needed. Do not bleach."
      },
      {
        id: "women-002",
        name: "Japanese Blouse",
        author: "TokyoFashion",
        brand: "TokyoFashion",
        folderPath: "Products/TokyoFashion/Japanese Blouse",
        price: 55.00,
        originalPrice: 70.00,
        image: "/projects/BETATESTINGIMAGES/M_p0153126832.jpg",
        images: [
          "/projects/BETATESTINGIMAGES/M_p0153126832.jpg",
          "/projects/BETATESTINGIMAGES/M_p0173471010.jpg"
        ],
        description: "Lightweight Japanese blouse with unique patterns",
        detailedDescription: "Discover the artistry of Japanese fashion with our elegant blouse featuring traditional-inspired patterns and modern cuts. This versatile piece combines comfort with style, perfect for both professional and casual settings.",
        features: [
          "Traditional Japanese-inspired patterns",
          "Lightweight, breathable fabric",
          "Modern cut with traditional elements",
          "Versatile styling options",
          "Comfortable all-day wear",
          "Easy care fabric",
          "Timeless design"
        ],
        sizes: [
          { size: "XS", price: 55.00, stock: 12 },
          { size: "S", price: 55.00, stock: 18 },
          { size: "M", price: 55.00, stock: 22 },
          { size: "L", price: 55.00, stock: 16 },
          { size: "XL", price: 55.00, stock: 10 }
        ],
        colors: [
          { name: "White", hex: "#FFFFFF", image: "/Shopping Contents/Women/blouse-white.jpg" },
          { name: "Ivory", hex: "#FFFFF0", image: "/Shopping Contents/Women/blouse-ivory.jpg" },
          { name: "Light Blue", hex: "#ADD8E6", image: "/Shopping Contents/Women/blouse-blue.jpg" }
        ],
        tags: ["Tops", "Japanese", "Blouse", "Pattern"],
        rating: 4.5,
        reviewCount: 134,
        isNew: false,
        isBestSeller: true,
        discount: 21,
        inStock: true,
        shipping: "Free shipping on orders over $50",
        returnPolicy: "30-day return policy",
        materials: "Cotton Blend, Silk, Japanese Rayon",
        modFile: {
          filename: "japanese-blouse.zip",
          size: 16777216, // 16MB
          version: "1.1.0"
        },
        downloadCount: 9870,
        careInstructions: "Hand wash cold or gentle machine cycle. Hang dry or tumble dry low. Iron on medium heat."
      },
      {
        id: "women-003",
        name: "Chinese Silk Scarf",
        author: "SilkRoad",
        brand: "SilkRoad",
        price: 45.00,
        originalPrice: 65.00,
        image: "/projects/BETATESTINGIMAGES/M_p0188313813.jpg",
        images: [
          "/projects/BETATESTINGIMAGES/M_p0188313813.jpg",
          "/projects/BETATESTINGIMAGES/M_p0212227403.jpg"
        ],
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
        image: "/projects/BETATESTINGIMAGES/M_p0219369326.jpg",
        images: [
          "/projects/BETATESTINGIMAGES/M_p0219369326.jpg",
          "/projects/BETATESTINGIMAGES/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png"
        ],
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
        image: "/projects/BETATESTINGIMAGES/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
        images: [
          "/projects/BETATESTINGIMAGES/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
          "/projects/BETATESTINGIMAGES/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png"
        ],
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
        image: "/projects/BETATESTINGIMAGES/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
        images: [
          "/projects/BETATESTINGIMAGES/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
          "/projects/BETATESTINGIMAGES/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png"
        ],
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
        image: "/projects/BETATESTINGIMAGES/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
        images: [
          "/projects/BETATESTINGIMAGES/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png"
        ],
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
        image: "/projects/Products/LunaGlow/Korean Glass Skin Set/Lunaglow - Kit Promotional Cover.png",
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
        id: "beauty-008b",
        name: "LunaGlow Kit Promotional Cover",
        author: "LunaGlow",
        brand: "LunaGlow",
        price: 0.00,
        originalPrice: 0.00,
        image: "/projects/Products/LunaGlow/Korean Glass Skin Set/Lunaglow - Kit Promotional Cover.png",
        images: [
          "/projects/Products/LunaGlow/Korean Glass Skin Set/Lunaglow - Kit Promotional Cover.png"
        ],
        description: "Exclusive LunaGlow promotional kit cover - premium Korean skincare collection",
        detailedDescription: "Discover the essence of Korean beauty with our exclusive LunaGlow Kit Promotional Cover. This premium collection features our signature skincare products designed to give you that coveted glass skin effect. Perfect for those who want to experience the best of Korean beauty innovation.",
        features: [
          "Premium Korean skincare formula",
          "Glass skin effect technology",
          "Hyaluronic acid infusion",
          "Niacinamide for pore refinement",
          "Korean ginseng extract",
          "Green tea antioxidant protection",
          "Dermatologist tested",
          "Cruelty-free and vegan",
          "Exclusive promotional packaging"
        ],
        sizes: [
          { size: "Standard Kit", price: 0.00, stock: 999 }
        ],
        colors: [
          { name: "Original", hex: "#F5F5F5", image: "/projects/Products/LunaGlow/Lunaglow - Kit Promotional Cover.png" }
        ],
        tags: ["Skincare", "Korean", "Promotional", "Kit", "Free", "Glass Skin"],
        rating: 4.9,
        reviewCount: 156,
        isNew: true,
        isBestSeller: true,
        discount: 0,
        modFile: {
          filename: "lunaglow-kit-promotional-cover.zip",
          size: 8388608,
          version: "1.0.0"
        },
        downloadCount: 8920,
        category: "beauty",
        inStock: true,
        isFeatured: true
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
        image: "/projects/BETATESTINGIMAGES/M_p0217730395.jpg",
        images: [
          "/projects/BETATESTINGIMAGES/M_p0217730395.jpg",
          "/projects/BETATESTINGIMAGES/M_p0219136879.png"
        ],
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
        image: "/projects/BETATESTINGIMAGES/M_p0153126832.jpg",
        images: [
          "/projects/BETATESTINGIMAGES/M_p0153126832.jpg",
          "/projects/BETATESTINGIMAGES/M_p0173471010.jpg"
        ],
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
        image: "/projects/BETATESTINGIMAGES/M_p0188313813.jpg",
        images: [
          "/projects/BETATESTINGIMAGES/M_p0188313813.jpg",
          "/projects/BETATESTINGIMAGES/M_p0212227403.jpg"
        ],
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
        image: "/projects/BETATESTINGIMAGES/M_p0219369326.jpg",
        images: [
          "/projects/BETATESTINGIMAGES/M_p0219369326.jpg",
          "/projects/BETATESTINGIMAGES/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png"
        ],
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
        image: "/projects/BETATESTINGIMAGES/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
        images: [
          "/projects/BETATESTINGIMAGES/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
          "/projects/BETATESTINGIMAGES/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png"
        ],
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
    description: "Latest trends, tips, and insights in home design and interior decoration",
    subcategories: ["Home Design", "Interior Design", "Furniture Trends", "Modern Living", "Design Tips"],
    products: [
      {
        id: "blog-001",
        name: "Modern Home Design Guide",
        author: "ARNOO",
        brand: "ARNOO",
        price: 0,
        originalPrice: 0,
        image: "/projects/Brand Medias/Arnoo/Branding/Arnoo Brand Design Board.png",
        images: [
          "/projects/Brand Medias/Arnoo/Branding/Arnoo Brand Design Board.png",
          "/projects/Brand Medias/Arnoo/Branding/Arnoo - Branding Advertising.webp"
        ],
        description: "Complete guide to modern home renovation and interior design",
        tags: ["Home Design", "Interior Design", "Modern", "Guide"],
        rating: 4.9,
        reviewCount: 156,
        isNew: true,
        isBestSeller: true,
        discount: 0,
        modFile: {
          filename: "modern-home-design-guide.zip",
          size: 2097152, // 2MB
          version: "1.0.0"
        },
        downloadCount: 25670
      },
      {
        id: "blog-002",
        name: "Contemporary Furniture Trends",
        author: "ARNOO",
        brand: "ARNOO",
        price: 0,
        originalPrice: 0,
        image: "/projects/Brand Medias/Arnoo/Branding/Arnoo Brand Design Board.png",
        images: [
          "/projects/Brand Medias/Arnoo/Branding/Arnoo Brand Design Board.png"
        ],
        description: "Latest trends in contemporary furniture and home decor",
        tags: ["Furniture Trends", "Contemporary", "Home Decor", "Trends"],
        rating: 4.7,
        reviewCount: 89,
        isNew: false,
        isBestSeller: false,
        discount: 0,
        modFile: {
          filename: "contemporary-furniture-trends.zip",
          size: 3145728, // 3MB
          version: "1.0.0"
        },
        downloadCount: 18940
      }
    ]
  },
  homeDesign: {
    name: "Home & Design",
    description: "Transform your living spaces with modern furniture and contemporary home decor",
    subcategories: ["Furniture", "Home Decor", "Lighting", "Storage", "Accessories"],
    products: [
      {
        id: "home-001",
        name: "Modern Scandinavian Sofa",
        author: "ARNOO",
        brand: "ARNOO",
        folderPath: "Products/ARNOO/Modern Scandinavian Sofa",
        price: 1299.99,
        originalPrice: 1599.99,
        image: "/projects/Brand Medias/Arnoo/Branding/Arnoo Brand Design Board.png",
        images: [
          "/projects/Brand Medias/Arnoo/Branding/Arnoo Brand Design Board.png",
          "/projects/Brand Medias/Arnoo/Branding/Arnoo - Branding Advertising.webp"
        ],
        description: "Elegant Scandinavian-inspired sofa with clean lines and premium materials",
        detailedDescription: "Transform your living room with our signature Modern Scandinavian Sofa. Crafted with sustainable materials and featuring minimalist design principles, this sofa combines comfort with contemporary aesthetics. Perfect for modern homes seeking both style and functionality.",
        features: [
          "Premium sustainable materials",
          "Modular design for flexibility",
          "Easy-to-clean fabric upholstery",
          "Ergonomic support system",
          "Assembly required",
          "5-year warranty",
          "Free shipping included"
        ],
        sizes: [
          { size: "2-Seater", price: 899.99, stock: 12 },
          { size: "3-Seater", price: 1299.99, stock: 8 },
          { size: "4-Seater", price: 1599.99, stock: 5 }
        ],
        colors: [
          { name: "Charcoal Gray", hex: "#36454F", stock: 15 },
          { name: "Cream White", hex: "#F5F5DC", stock: 12 },
          { name: "Navy Blue", hex: "#000080", stock: 8 },
          { name: "Forest Green", hex: "#228B22", stock: 6 }
        ],
        tags: ["Furniture", "Sofa", "Scandinavian", "Modern", "Living Room"],
        rating: 4.8,
        reviewCount: 234,
        isNew: true,
        isBestSeller: true,
        discount: 19,
        modFile: {
          filename: "modern-scandinavian-sofa.zip",
          size: 15728640, // 15MB
          version: "1.0.0"
        },
        downloadCount: 5670
      },
      {
        id: "home-002",
        name: "Minimalist Coffee Table",
        author: "ARNOO",
        brand: "ARNOO",
        folderPath: "Products/ARNOO/Minimalist Coffee Table",
        price: 399.99,
        originalPrice: 499.99,
        image: "/projects/Brand Medias/Arnoo/Branding/Arnoo Brand Design Board.png",
        images: [
          "/projects/Brand Medias/Arnoo/Branding/Arnoo Brand Design Board.png"
        ],
        description: "Sleek coffee table with hidden storage and contemporary design",
        detailedDescription: "Our Minimalist Coffee Table features clean geometric lines and practical hidden storage compartments. Made from premium oak wood with a natural finish, this piece serves as both a functional centerpiece and a statement of modern design philosophy.",
        features: [
          "Premium oak wood construction",
          "Hidden storage compartments",
          "Natural wood finish",
          "Easy assembly",
          "Scratch-resistant surface",
          "2-year warranty"
        ],
        sizes: [
          { size: "Small (100cm)", price: 299.99, stock: 20 },
          { size: "Medium (120cm)", price: 399.99, stock: 15 },
          { size: "Large (140cm)", price: 499.99, stock: 10 }
        ],
        colors: [
          { name: "Natural Oak", hex: "#D2B48C", stock: 25 },
          { name: "Dark Walnut", hex: "#3C2415", stock: 18 },
          { name: "White Wash", hex: "#F5F5F5", stock: 12 }
        ],
        tags: ["Furniture", "Coffee Table", "Minimalist", "Storage", "Living Room"],
        rating: 4.6,
        reviewCount: 156,
        isNew: false,
        isBestSeller: false,
        discount: 20,
        modFile: {
          filename: "minimalist-coffee-table.zip",
          size: 8388608, // 8MB
          version: "1.0.0"
        },
        downloadCount: 3240
      },
      {
        id: "home-003",
        name: "Contemporary Floor Lamp",
        author: "ARNOO",
        brand: "ARNOO",
        folderPath: "Products/ARNOO/Contemporary Floor Lamp",
        price: 199.99,
        originalPrice: 249.99,
        image: "/projects/Brand Medias/Arnoo/Branding/Arnoo Brand Design Board.png",
        images: [
          "/projects/Brand Medias/Arnoo/Branding/Arnoo Brand Design Board.png"
        ],
        description: "Sculptural floor lamp with adjustable lighting and modern aesthetics",
        detailedDescription: "Illuminate your space with our Contemporary Floor Lamp, featuring a sculptural design that doubles as functional art. With adjustable brightness and direction, this lamp provides both ambient and task lighting while serving as a striking focal point in any room.",
        features: [
          "LED lighting technology",
          "Adjustable brightness levels",
          "360-degree rotation",
          "Touch control interface",
          "Energy efficient",
          "Modern sculptural design",
          "1-year warranty"
        ],
        sizes: [
          { size: "Standard (150cm)", price: 199.99, stock: 30 },
          { size: "Tall (180cm)", price: 249.99, stock: 20 }
        ],
        colors: [
          { name: "Matte Black", hex: "#2F2F2F", stock: 25 },
          { name: "Brushed Gold", hex: "#DAA520", stock: 15 },
          { name: "White", hex: "#FFFFFF", stock: 20 }
        ],
        tags: ["Lighting", "Floor Lamp", "Contemporary", "LED", "Adjustable"],
        rating: 4.7,
        reviewCount: 89,
        isNew: true,
        isBestSeller: false,
        discount: 20,
        modFile: {
          filename: "contemporary-floor-lamp.zip",
          size: 5242880, // 5MB
          version: "1.0.0"
        },
        downloadCount: 1890
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
