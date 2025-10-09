// Automated Product Management System
// Scans file system and generates product data automatically

import fs from 'fs';
import path from 'path';

class ProductManager {
  constructor() {
    this.basePath = '/projects/Shopping Contents';
    this.cache = new Map();
    this.lastScan = null;
  }

  // Generate unique product ID
  generateProductId(brandName, artisanName, itemNumber, tags, category) {
    const cleanBrand = this.sanitizeString(brandName);
    const cleanArtisan = artisanName ? this.sanitizeString(artisanName) : 'generic';
    const cleanTags = Array.isArray(tags) ? tags.join('/') : tags || 'general';
    const cleanCategory = this.sanitizeString(category);
    
    return `${cleanBrand}-${cleanArtisan}-${itemNumber.toString().padStart(3, '0')}-${cleanTags}-${cleanCategory}`;
  }

  // Sanitize string for ID generation
  sanitizeString(str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // Scan directory for products
  async scanDirectory(dirPath = this.basePath) {
    const products = [];
    const categories = await this.getCategories(dirPath);
    
    for (const category of categories) {
      const categoryProducts = await this.scanCategory(path.join(dirPath, category));
      products.push(...categoryProducts);
    }
    
    this.cache.set('products', products);
    this.lastScan = new Date();
    
    return products;
  }

  // Get all categories
  async getCategories(basePath) {
    try {
      const fullPath = path.join(process.cwd(), 'public', basePath);
      const items = await fs.promises.readdir(fullPath, { withFileTypes: true });
      return items.filter(item => item.isDirectory()).map(item => item.name);
    } catch (error) {
      console.error('Error reading categories:', error);
      return [];
    }
  }

  // Scan a specific category
  async scanCategory(categoryPath) {
    const products = [];
    
    try {
      const subcategories = await this.getSubcategories(categoryPath);
      
      for (const subcategory of subcategories) {
        const subcategoryProducts = await this.scanSubcategory(path.join(categoryPath, subcategory));
        products.push(...subcategoryProducts);
      }
    } catch (error) {
      console.error(`Error scanning category ${categoryPath}:`, error);
    }
    
    return products;
  }

  // Get subcategories (brands)
  async getSubcategories(categoryPath) {
    try {
      const fullPath = path.join(process.cwd(), 'public', categoryPath);
      const items = await fs.promises.readdir(fullPath, { withFileTypes: true });
      return items.filter(item => item.isDirectory()).map(item => item.name);
    } catch (error) {
      console.error('Error reading subcategories:', error);
      return [];
    }
  }

  // Scan subcategory (brand)
  async scanSubcategory(subcategoryPath) {
    const products = [];
    
    try {
      const artisans = await this.getArtisans(subcategoryPath);
      
      for (const artisan of artisans) {
        const artisanProducts = await this.scanArtisan(path.join(subcategoryPath, artisan));
        products.push(...artisanProducts);
      }
    } catch (error) {
      console.error(`Error scanning subcategory ${subcategoryPath}:`, error);
    }
    
    return products;
  }

  // Get artisans
  async getArtisans(subcategoryPath) {
    try {
      const fullPath = path.join(process.cwd(), 'public', subcategoryPath);
      const items = await fs.promises.readdir(fullPath, { withFileTypes: true });
      return items.filter(item => item.isDirectory()).map(item => item.name);
    } catch (error) {
      console.error('Error reading artisans:', error);
      return [];
    }
  }

  // Scan artisan directory for products
  async scanArtisan(artisanPath) {
    const products = [];
    
    try {
      const fullPath = path.join(process.cwd(), 'public', artisanPath);
      const items = await fs.promises.readdir(fullPath, { withFileTypes: true });
      const productDirs = items.filter(item => item.isDirectory()).map(item => item.name);
      
      for (const productDir of productDirs) {
        const product = await this.scanProduct(path.join(artisanPath, productDir));
        if (product) {
          products.push(product);
        }
      }
    } catch (error) {
      console.error(`Error scanning artisan ${artisanPath}:`, error);
    }
    
    return products;
  }

  // Scan individual product directory
  async scanProduct(productPath) {
    try {
      const fullPath = path.join(process.cwd(), 'public', productPath);
      
      // Check if product.json exists
      const productJsonPath = path.join(fullPath, 'product.json');
      let productData = {};
      
      try {
        const jsonContent = await fs.promises.readFile(productJsonPath, 'utf8');
        productData = JSON.parse(jsonContent);
      } catch (error) {
        console.warn(`No product.json found for ${productPath}, using defaults`);
      }
      
      // Extract path information
      const pathParts = productPath.split('/');
      const category = pathParts[2]; // Shopping Contents/Category
      const brandName = pathParts[3]; // Brand
      const artisanName = pathParts[4]; // Artisan
      const productFolder = pathParts[5]; // Product folder
      
      // Extract item number from folder name
      const itemNumberMatch = productFolder.match(/^(\d+)-/);
      const itemNumber = itemNumberMatch ? parseInt(itemNumberMatch[1]) : 1;
      
      // Extract tags from folder name
      const tagsMatch = productFolder.match(/^\d+-(.+?)(?:-\w+)?$/);
      const tags = tagsMatch ? tagsMatch[1].split('-') : ['general'];
      
      // Generate product ID
      const id = this.generateProductId(brandName, artisanName, itemNumber, tags, category);
      
      // Get images
      const images = await this.getProductImages(fullPath);
      
      // Get files
      const files = await this.getProductFiles(fullPath);
      
      // Get file size
      const fileSize = await this.getTotalFileSize(fullPath);
      
      // Create product object
      const product = {
        id,
        name: productData.name || this.generateProductName(productFolder),
        brand: brandName,
        author: artisanName,
        category,
        subcategory: productData.subcategory || category,
        description: productData.description || this.generateDescription(productFolder, tags),
        detailedDescription: productData.detailedDescription || productData.description,
        price: productData.price || this.generatePrice(category, tags),
        originalPrice: productData.originalPrice,
        image: images.main || '/placeholder-product.jpg',
        images: images.gallery || [],
        tags: productData.tags || tags,
        features: productData.features || this.generateFeatures(tags),
        sizes: productData.sizes || this.generateSizes(),
        colors: productData.colors || this.generateColors(),
        downloadUrl: files.main || '',
        fileSize: fileSize,
        downloadCount: productData.downloadCount || Math.floor(Math.random() * 1000),
        rating: productData.rating || (4 + Math.random()),
        reviews: productData.reviews || Math.floor(Math.random() * 100),
        inStock: productData.inStock !== undefined ? productData.inStock : true,
        isNew: productData.isNew || false,
        isFeatured: productData.isFeatured || false,
        createdAt: productData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        path: productPath,
        // Additional metadata
        metadata: {
          folderName: productFolder,
          itemNumber,
          extractedTags: tags,
          fileCount: files.count || 0,
          imageCount: images.count || 0,
          lastModified: await this.getLastModified(fullPath)
        }
      };
      
      return product;
      
    } catch (error) {
      console.error(`Error scanning product ${productPath}:`, error);
      return null;
    }
  }

  // Get product images
  async getProductImages(productPath) {
    const images = { main: null, gallery: [], count: 0 };
    
    try {
      const imagesPath = path.join(productPath, 'images');
      const imageFiles = await fs.promises.readdir(imagesPath);
      
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
      const validImages = imageFiles.filter(file => 
        imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
      );
      
      if (validImages.length > 0) {
        images.main = `/projects/Shopping Contents/${path.relative(path.join(process.cwd(), 'public'), imagesPath)}/${validImages[0]}`;
        images.gallery = validImages.map(img => 
          `/projects/Shopping Contents/${path.relative(path.join(process.cwd(), 'public'), imagesPath)}/${img}`
        );
        images.count = validImages.length;
      }
    } catch (error) {
      console.warn(`No images found for ${productPath}`);
    }
    
    return images;
  }

  // Get product files
  async getProductFiles(productPath) {
    const files = { main: null, count: 0 };
    
    try {
      const filesPath = path.join(productPath, 'files');
      const fileList = await fs.promises.readdir(filesPath);
      
      if (fileList.length > 0) {
        files.main = `/projects/Shopping Contents/${path.relative(path.join(process.cwd(), 'public'), filesPath)}/${fileList[0]}`;
        files.count = fileList.length;
      }
    } catch (error) {
      console.warn(`No files found for ${productPath}`);
    }
    
    return files;
  }

  // Get total file size
  async getTotalFileSize(productPath) {
    try {
      const filesPath = path.join(productPath, 'files');
      const files = await fs.promises.readdir(filesPath);
      
      let totalSize = 0;
      for (const file of files) {
        const filePath = path.join(filesPath, file);
        const stats = await fs.promises.stat(filePath);
        totalSize += stats.size;
      }
      
      return totalSize;
    } catch (error) {
      return 0;
    }
  }

  // Get last modified date
  async getLastModified(productPath) {
    try {
      const stats = await fs.promises.stat(productPath);
      return stats.mtime.toISOString();
    } catch (error) {
      return new Date().toISOString();
    }
  }

  // Generate product name from folder
  generateProductName(folderName) {
    return folderName
      .replace(/^\d+-/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  // Generate description
  generateDescription(folderName, tags) {
    const name = this.generateProductName(folderName);
    return `Premium ${name.toLowerCase()} featuring ${tags.join(', ')}. High-quality product designed for optimal results.`;
  }

  // Generate price based on category and tags
  generatePrice(category, tags) {
    const basePrices = {
      'beauty': 25,
      'health': 35,
      'men': 30,
      'women': 28,
      'lifestyle': 20
    };
    
    const basePrice = basePrices[category.toLowerCase()] || 25;
    const tagMultiplier = tags.includes('premium') ? 1.5 : 1;
    const randomVariation = 0.8 + (Math.random() * 0.4); // 80% to 120%
    
    return Math.round(basePrice * tagMultiplier * randomVariation);
  }

  // Generate features
  generateFeatures(tags) {
    const featureMap = {
      'premium': ['High-quality materials', 'Professional grade', 'Long-lasting'],
      'organic': ['Natural ingredients', 'Eco-friendly', 'Chemical-free'],
      'anti-aging': ['Age-defying formula', 'Wrinkle reduction', 'Skin renewal'],
      'moisturizing': ['Deep hydration', 'Skin nourishment', 'Soft texture'],
      'cleansing': ['Deep cleaning', 'Gentle formula', 'Pore purification']
    };
    
    const features = [];
    tags.forEach(tag => {
      if (featureMap[tag]) {
        features.push(...featureMap[tag]);
      }
    });
    
    return features.length > 0 ? features : ['High-quality', 'Effective', 'Safe'];
  }

  // Generate sizes
  generateSizes() {
    return [
      { size: 'Small', price: 15, stock: 10 },
      { size: 'Medium', price: 25, stock: 15 },
      { size: 'Large', price: 35, stock: 8 }
    ];
  }

  // Generate colors
  generateColors() {
    return [
      { name: 'Original', hex: '#F5F5F5', stock: 20 },
      { name: 'Natural', hex: '#D2B48C', stock: 15 },
      { name: 'Classic', hex: '#8B4513', stock: 12 }
    ];
  }

  // Get cached products
  getCachedProducts() {
    return this.cache.get('products') || [];
  }

  // Check if cache is valid
  isCacheValid(maxAgeMinutes = 30) {
    if (!this.lastScan) return false;
    const now = new Date();
    const diffMinutes = (now - this.lastScan) / (1000 * 60);
    return diffMinutes < maxAgeMinutes;
  }

  // Sync products with database
  async syncWithDatabase() {
    try {
      const products = await this.getProducts();
      
      // Call backend API to sync with database
      const response = await fetch('http://localhost:5000/api/products/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ products })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`Synced ${result.count} products with database`);
        return result;
      } else {
        console.error('Failed to sync products with database');
        return null;
      }
    } catch (error) {
      console.error('Error syncing with database:', error);
      return null;
    }
  }

  // Get product by ID
  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(product => product.id === id);
  }

  // Get products by category
  async getProductsByCategory(category) {
    const products = await this.getProducts();
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
  }

  // Get products by brand
  async getProductsByBrand(brand) {
    const products = await this.getProducts();
    return products.filter(product => product.brand.toLowerCase() === brand.toLowerCase());
  }

  // Search products
  async searchProducts(query) {
    const products = await this.getProducts();
    const searchTerm = query.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.author.toLowerCase().includes(searchTerm)
    );
  }
}

// Export singleton instance
export const productManager = new ProductManager();
export default productManager;
