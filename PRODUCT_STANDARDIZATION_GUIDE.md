# Product Data Standardization Guide

## ✅ **Standardized Product Structure**

All products now follow this comprehensive structure based on the Korean Glass Skin Set template:

### **Core Properties (Required for all products):**
```javascript
{
  id: "category-###",                    // Unique identifier
  name: "Product Name",                  // Display name
  author: "Brand/Author",               // Creator
  brand: "Brand Name",                  // Brand
  folderPath: "Products/Brand/Product", // Download path
  price: 89.99,                         // Current price
  originalPrice: 129.99,                // Original price (if different)
  image: "/path/to/main-image.jpg",     // Primary image
  images: [                             // Additional images array
    "/path/to/image1.jpg",
    "/path/to/image2.jpg"
  ],
  description: "Short description",     // Brief description
  detailedDescription: "Long detailed description...", // Full description
  features: [                           // Key features array
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  sizes: [                              // Available sizes/variants
    { size: "Small", price: 29.99, stock: 15 },
    { size: "Medium", price: 89.99, stock: 8 },
    { size: "Large", price: 149.99, stock: 3 }
  ],
  colors: [                             // Available colors/variants
    { name: "Original", hex: "#F5F5F5", image: "/path/to/color-image.jpg" },
    { name: "Sensitive", hex: "#FFF8F0", image: "/path/to/color-image2.jpg" }
  ],
  tags: ["Category", "Style", "Type"],  // Search/filter tags
  rating: 4.8,                          // Average rating (1-5)
  reviewCount: 234,                     // Number of reviews
  isNew: true,                          // New product flag
  isBestSeller: false,                  // Best seller flag
  discount: 31,                         // Discount percentage
  inStock: true,                        // Stock availability
  shipping: "Free shipping on orders over $50", // Shipping info
  returnPolicy: "30-day return policy", // Return policy
  ingredients: "List of ingredients",   // For beauty/health products
  materials: "Fabric composition",       // For fashion products
  modFile: {                            // Download file info
    filename: "product-name.zip",
    size: 15728640, // File size in bytes
    version: "1.2.0"
  },
  downloadCount: 15420,                 // Download count
  howToUse: "Usage instructions",       // For beauty/health products
  careInstructions: "Care instructions"   // For fashion products
}
```

## **Category-Specific Adaptations:**

### **Beauty Products:**
- `ingredients`: List of active ingredients
- `howToUse`: Step-by-step usage instructions
- `sizes`: Volume-based (30ml, 50ml, 100ml)
- `colors`: Shade variations

### **Fashion Products:**
- `materials`: Fabric composition
- `careInstructions`: Washing and care instructions
- `sizes`: Clothing sizes (XS, S, M, L, XL)
- `colors`: Color variations

### **Home/Lifestyle Products:**
- `materials`: Material composition
- `dimensions`: Size specifications
- `assembly`: Assembly requirements
- `warranty`: Warranty information

## **✅ Completed Products:**

### **Beauty Category:**
- ✅ Korean Glass Skin Set 
- ✅ Japanese BB Cream
- ✅ Chinese Herbal Hair Mask
- ✅ Korean Lip Tint Set
- ✅ Korean Lip Gloss Set 
- ✅ Japanese Serum Essence 
- ✅ Chinese Herbal Face Mask 

### **Women's Category:**
- ✅ Korean A-Line Dress
- ✅ Japanese Blouse

## **🔄 Remaining Products to Update:**

### **Women's Category:**
- Chinese Silk Scarf
- TokyoVibe Streetwear
- UrbanHarbor Collection

### **Men's Category:**
- Korean Streetwear Hoodie
- Japanese Denim Jeans
- LunaGlow Radiance Set
- LunaGlow Kit Promotional Cover
- PearlEssence Rituals
- CelestialBeauty Luxe

### **Lifestyle Category:**
- Japanese Tea Set
- Korean Incense Set
- ZenLifestyle Essentials

### **Health Category:**
- Korean Ginseng Extract
- Chinese Herbal Tea

### **Blog Category:**
- Modern Home Design Guide
- Contemporary Furniture Trends

### **Home Design Category:**
- Modern Scandinavian Sofa
- Minimalist Coffee Table
- Contemporary Floor Lamp

## **Template for Quick Updates:**

```javascript
{
  id: "category-###",
  name: "Product Name",
  author: "Brand/Author",
  brand: "Brand Name",
  folderPath: "Products/Brand/Product",
  price: 0.00,
  originalPrice: 0.00,
  image: "/path/to/image.jpg",
  images: ["/path/to/image.jpg"],
  description: "Brief description",
  detailedDescription: "Comprehensive product description highlighting key benefits and features...",
  features: [
    "Key feature 1",
    "Key feature 2",
    "Key feature 3",
    "Key feature 4",
    "Key feature 5"
  ],
  sizes: [
    { size: "Small", price: 0.00, stock: 999 },
    { size: "Medium", price: 0.00, stock: 999 },
    { size: "Large", price: 0.00, stock: 999 }
  ],
  colors: [
    { name: "Original", hex: "#F5F5F5", image: "/path/to/color-image.jpg" }
  ],
  tags: ["Category", "Style", "Type"],
  rating: 4.8,
  reviewCount: 156,
  isNew: true,
  isBestSeller: true,
  discount: 0,
  inStock: true,
  shipping: "Free shipping on orders over $25",
  returnPolicy: "30-day return policy",
  ingredients: "Natural ingredients list", // For beauty/health
  materials: "Material composition", // For fashion/home
  modFile: {
    filename: "product-name.zip",
    size: 8388608, // File size in bytes
    version: "1.0.0"
  },
  downloadCount: 8920,
  howToUse: "Usage instructions", // For beauty/health
  careInstructions: "Care instructions" // For fashion/home
}
```

The remaining products can be updated using this template, adapting the category-specific properties (ingredients vs materials, howToUse vs careInstructions) based on the product type.
