# Brands and Artisans Data Management Systems

This document outlines the comprehensive data management systems created for brands and artisans, similar to the shopping page product system.

## 📊 Brands Data System (`src/lib/brandsData.js`)

### **Data Structure**

Each brand object contains:
```javascript
{
  id: "unique-brand-id",           // Unique identifier
  name: "Brand Name",             // Display name
  category: "Beauty",             // Brand category
  description: "Brand description", // Detailed description
  logo: "/path/to/logo.png",      // Logo image path
  backgroundImage: "/path/to/bg.png", // Background image path
  website: "https://brand.com",   // Official website
  founded: "2018",               // Founding year
  country: "South Korea",        // Country of origin
  isActive: true,                // Active status
  isFeatured: false,             // Featured status
  socialMedia: {                 // Social media links
    instagram: "@brand_official",
    twitter: "@brand",
    facebook: "BrandOfficial"
  },
  tags: ["Korean", "Skincare"]   // Searchable tags
}
```

### **Available Categories**
- Beauty
- Fashion
- Lifestyle
- Health
- Food & Beverage
- Home & Design
- Electronics
- General

### **Key Functions**

#### **Retrieval Functions**
- `getAllBrands()` - Get all brands
- `getBrandById(brandId)` - Get brand by ID
- `getBrandByName(brandName)` - Get brand by name
- `getBrandsByCategory(category)` - Filter by category
- `getFeaturedBrands()` - Get featured brands only
- `getActiveBrands()` - Get active brands only

#### **Search & Filter Functions**
- `searchBrands(query, filters)` - Search with optional filters
- `getBrandCategories()` - Get all available categories
- `getBrandStats()` - Get statistical overview

#### **CRUD Operations**
- `addBrand(brandData)` - Add new brand
- `updateBrand(brandId, updates)` - Update existing brand
- `deleteBrand(brandId)` - Remove brand

### **Usage Example**
```javascript
import { getAllBrands, searchBrands, BRAND_CATEGORIES } from '@/lib/brandsData';

// Get all brands
const brands = getAllBrands();

// Search for Korean brands
const koreanBrands = searchBrands('Korean');

// Get beauty brands
const beautyBrands = getBrandsByCategory(BRAND_CATEGORIES.BEAUTY);

// Add new brand
const newBrand = addBrand({
  name: 'New Brand',
  category: BRAND_CATEGORIES.BEAUTY,
  description: 'A new beauty brand',
  country: 'Japan',
  isActive: true,
  isFeatured: false,
  tags: ['Japanese', 'Beauty']
});
```

## 🎨 Artisans Data System (`src/lib/artisansData.js`)

### **Data Structure**

Each artisan object contains:
```javascript
{
  id: 1,                         // Unique numeric ID
  name: "Artisan Name",           // Display name
  location: "City, Country",      // Location
  region: "South Korea",          // Region category
  specialty: "Korean Ceramics",   // Specialization
  category: "Ceramics",           // Artisan category
  rating: 4.9,                   // Average rating
  reviews: 127,                  // Number of reviews
  image: "/path/to/image.png",   // Profile image
  story: "Artisan story",        // Background story
  products: ["Product 1", "Product 2"], // Product types
  totalProducts: 45,             // Total products
  totalDownloads: 2340,          // Total downloads
  description: "Detailed description", // Description
  experience: "15+ years",       // Experience level
  techniques: ["Technique 1"],  // Used techniques
  materials: ["Material 1"],    // Used materials
  isActive: true,               // Active status
  isFeatured: false,            // Featured status
  socialMedia: {                // Social media links
    instagram: "@artisan_official",
    website: "https://artisan.com"
  },
  tags: ["Korean", "Ceramics"]   // Searchable tags
}
```

### **Available Categories**
- Ceramics
- Textiles
- Art
- Jewelry
- Beauty
- Fashion
- Woodworking
- Food
- General

### **Available Regions**
- South Korea
- Japan
- China
- India
- Thailand
- Vietnam
- Singapore
- Malaysia
- Philippines
- Indonesia

### **Key Functions**

#### **Retrieval Functions**
- `getAllArtisans()` - Get all artisans
- `getArtisanById(artisanId)` - Get artisan by ID
- `getArtisanByName(artisanName)` - Get artisan by name
- `getArtisansByCategory(category)` - Filter by category
- `getArtisansByRegion(region)` - Filter by region
- `getFeaturedArtisans()` - Get featured artisans only
- `getActiveArtisans()` - Get active artisans only

#### **Search & Filter Functions**
- `searchArtisans(query, filters)` - Search with optional filters
- `getArtisanCategories()` - Get all available categories
- `getArtisanRegions()` - Get all available regions
- `getArtisanStats()` - Get statistical overview

#### **CRUD Operations**
- `addArtisan(artisanData)` - Add new artisan
- `updateArtisan(artisanId, updates)` - Update existing artisan
- `deleteArtisan(artisanId)` - Remove artisan

### **Usage Example**
```javascript
import { getAllArtisans, searchArtisans, ARTISAN_CATEGORIES, ARTISAN_REGIONS } from '@/lib/artisansData';

// Get all artisans
const artisans = getAllArtisans();

// Search for traditional artisans
const traditionalArtisans = searchArtisans('traditional');

// Get ceramics artisans
const ceramicsArtisans = getArtisansByCategory(ARTISAN_CATEGORIES.CERAMICS);

// Get Korean artisans
const koreanArtisans = getArtisansByRegion(ARTISAN_REGIONS.SOUTH_KOREA);

// Add new artisan
const newArtisan = addArtisan({
  name: 'New Artisan',
  location: 'Seoul, South Korea',
  region: ARTISAN_REGIONS.SOUTH_KOREA,
  specialty: 'Korean Pottery',
  category: ARTISAN_CATEGORIES.CERAMICS,
  rating: 4.5,
  reviews: 0,
  description: 'A new ceramics artisan',
  isActive: true,
  isFeatured: false,
  tags: ['Korean', 'Pottery']
});
```

## 🔄 Integration with Pages

### **Brands Page (`src/Pages/Brands.jsx`)**
- Uses `getAllBrands()` and `getBrandStats()` from the data system
- Displays brands in a responsive grid layout
- Shows comprehensive statistics overview
- Maintains all existing functionality while using centralized data

### **Artisans Page (`src/Pages/Artisans.jsx`)**
- Uses `getAllArtisans()` and `getArtisanStats()` from the data system
- Displays artisans in a responsive grid layout
- Shows comprehensive statistics overview
- Maintains all existing functionality while using centralized data

## 🎯 Benefits of the New System

### **Centralized Data Management**
- All brand and artisan data in dedicated files
- Easy to add, modify, or remove entries
- Consistent data structure across the application

### **Advanced Filtering & Search**
- Multi-criteria search functionality
- Category and region-based filtering
- Tag-based search capabilities
- Flexible filter combinations

### **CRUD Operations**
- Complete Create, Read, Update, Delete functionality
- Data validation and integrity checks
- Automatic ID generation for artisans
- Safe data manipulation

### **Statistical Insights**
- Comprehensive statistics for both systems
- Category and region breakdowns
- Featured and active item counts
- Average ratings and totals

### **Scalability**
- Easy to add new categories and regions
- Simple to extend with new fields
- Modular design for future enhancements
- Consistent API across both systems

## 🚀 Future Enhancements

### **Potential Additions**
- Image optimization and lazy loading
- Advanced sorting options
- Bulk operations for data management
- Export/import functionality
- Data validation schemas
- Caching mechanisms for performance

### **Integration Opportunities**
- Connect with product data for cross-references
- Link with user reviews and ratings
- Integrate with analytics and metrics
- Connect with social media APIs
- Add recommendation algorithms

This comprehensive data management system provides a solid foundation for managing brands and artisans with the same level of sophistication as the shopping product system.
