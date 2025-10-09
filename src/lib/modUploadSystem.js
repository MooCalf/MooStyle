// Mod Upload System
// Handles the step-by-step process of uploading mods to the website

import fs from 'fs';
import path from 'path';

class ModUploadSystem {
  constructor() {
    this.basePath = '/projects/Shopping Contents';
    this.currentUpload = null;
    this.uploadSteps = [
      'basicInfo',
      'productDetails', 
      'fileInfo',
      'confirmation',
      'creation'
    ];
    this.currentStep = 0;
  }

  // Start upload process
  startUpload() {
    this.currentUpload = {
      step: 'basicInfo',
      data: {},
      errors: []
    };
    this.currentStep = 0;
    return this.getNextQuestion();
  }

  // Get next question based on current step
  getNextQuestion() {
    switch (this.currentUpload.step) {
      case 'basicInfo':
        return this.getBasicInfoQuestions();
      case 'productDetails':
        return this.getProductDetailsQuestions();
      case 'fileInfo':
        return this.getFileInfoQuestions();
      case 'confirmation':
        return this.getConfirmationQuestions();
      case 'creation':
        return this.createProduct();
      default:
        return { error: 'Invalid step' };
    }
  }

  // Answer current question and move to next
  answerQuestion(answer) {
    if (!this.currentUpload) {
      return { error: 'No upload in progress' };
    }

    // Store answer
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion && currentQuestion.field) {
      this.currentUpload.data[currentQuestion.field] = answer;
    }

    // Move to next step
    this.currentStep++;
    if (this.currentStep < this.uploadSteps.length) {
      this.currentUpload.step = this.uploadSteps[this.currentStep];
      return this.getNextQuestion();
    } else {
      return this.createProduct();
    }
  }

  // Get current question
  getCurrentQuestion() {
    switch (this.currentUpload.step) {
      case 'basicInfo':
        return this.getBasicInfoQuestions();
      case 'productDetails':
        return this.getProductDetailsQuestions();
      case 'fileInfo':
        return this.getFileInfoQuestions();
      case 'confirmation':
        return this.getConfirmationQuestions();
      default:
        return null;
    }
  }

  // Basic information questions
  getBasicInfoQuestions() {
    const questions = [
      {
        field: 'name',
        question: 'What is the product name?',
        type: 'text',
        required: true
      },
      {
        field: 'brand',
        question: 'What brand is this product from?',
        type: 'text',
        required: true
      },
      {
        field: 'artisan',
        question: 'Who is the artisan/creator? (or "Generic" if none)',
        type: 'text',
        required: true,
        default: 'Generic'
      },
      {
        field: 'category',
        question: 'What category does this belong to?',
        type: 'select',
        options: ['Beauty', 'Health', 'Men', 'Women', 'Lifestyle'],
        required: true
      },
      {
        field: 'subcategory',
        question: 'What subcategory? (e.g., Skincare, Makeup, etc.)',
        type: 'text',
        required: true
      }
    ];

    return {
      step: 'basicInfo',
      questions: questions,
      title: 'Basic Product Information',
      description: 'Let\'s start with the basic information about your product.'
    };
  }

  // Product details questions
  getProductDetailsQuestions() {
    const questions = [
      {
        field: 'description',
        question: 'What is the product description? (brief)',
        type: 'textarea',
        required: true
      },
      {
        field: 'detailedDescription',
        question: 'What is the detailed description?',
        type: 'textarea',
        required: false
      },
      {
        field: 'price',
        question: 'What is the price? (in USD)',
        type: 'number',
        required: true,
        min: 0
      },
      {
        field: 'originalPrice',
        question: 'What is the original price? (if on sale, leave empty if not)',
        type: 'number',
        required: false,
        min: 0
      },
      {
        field: 'tags',
        question: 'What tags should be applied? (comma-separated)',
        type: 'text',
        required: true,
        placeholder: 'premium, hydrating, anti-aging'
      }
    ];

    return {
      step: 'productDetails',
      questions: questions,
      title: 'Product Details',
      description: 'Now let\'s add the detailed information about your product.'
    };
  }

  // File information questions
  getFileInfoQuestions() {
    const questions = [
      {
        field: 'mainImage',
        question: 'Do you have a main product image? (provide file path or description)',
        type: 'text',
        required: true
      },
      {
        field: 'galleryImages',
        question: 'Do you have additional gallery images? (provide file paths or descriptions)',
        type: 'textarea',
        required: false,
        placeholder: 'One image per line'
      },
      {
        field: 'productFiles',
        question: 'What files should be included for download? (provide file paths or descriptions)',
        type: 'textarea',
        required: true,
        placeholder: 'One file per line'
      },
      {
        field: 'fileSize',
        question: 'What is the estimated file size? (in MB)',
        type: 'number',
        required: true,
        min: 0
      }
    ];

    return {
      step: 'fileInfo',
      questions: questions,
      title: 'File Information',
      description: 'Finally, let\'s add the files and images for your product.'
    };
  }

  // Confirmation questions
  getConfirmationQuestions() {
    const data = this.currentUpload.data;
    
    return {
      step: 'confirmation',
      title: 'Confirm Product Information',
      description: 'Please review the information before creating the product.',
      data: {
        name: data.name,
        brand: data.brand,
        artisan: data.artisan,
        category: data.category,
        subcategory: data.subcategory,
        description: data.description,
        detailedDescription: data.detailedDescription,
        price: data.price,
        originalPrice: data.originalPrice,
        tags: data.tags,
        mainImage: data.mainImage,
        galleryImages: data.galleryImages,
        productFiles: data.productFiles,
        fileSize: data.fileSize
      },
      generatedId: this.generateProductId(data)
    };
  }

  // Generate product ID
  generateProductId(data) {
    const cleanBrand = this.sanitizeString(data.brand);
    const cleanArtisan = data.artisan ? this.sanitizeString(data.artisan) : 'generic';
    const cleanTags = data.tags ? data.tags.split(',').map(tag => this.sanitizeString(tag.trim())).join('/') : 'general';
    const cleanCategory = this.sanitizeString(data.category);
    
    // Get next item number
    const itemNumber = this.getNextItemNumber(cleanBrand, cleanArtisan);
    
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

  // Get next item number for brand/artisan combination
  getNextItemNumber(brand, artisan) {
    // This would typically check existing products to get the next number
    // For now, return a random number between 1-999
    return Math.floor(Math.random() * 999) + 1;
  }

  // Create the product
  async createProduct() {
    try {
      const data = this.currentUpload.data;
      const productId = this.generateProductId(data);
      
      // Create folder structure
      const folderPath = await this.createFolderStructure(data, productId);
      
      // Create product.json
      await this.createProductJson(data, productId, folderPath);
      
      // Create image folders
      await this.createImageFolders(data, folderPath);
      
      // Create file folders
      await this.createFileFolders(data, folderPath);
      
      // Create README
      await this.createReadme(data, productId, folderPath);
      
      // Sync with database
      await this.syncWithDatabase(productId);
      
      return {
        success: true,
        message: 'Product created successfully!',
        productId: productId,
        folderPath: folderPath,
        data: data
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to create product'
      };
    }
  }

  // Create folder structure
  async createFolderStructure(data, productId) {
    const folderPath = path.join(
      process.cwd(),
      'public',
      this.basePath,
      data.category,
      data.subcategory,
      data.brand,
      data.artisan,
      `${this.getNextItemNumber(this.sanitizeString(data.brand), this.sanitizeString(data.artisan)).toString().padStart(3, '0')}-${data.tags.split(',').map(tag => this.sanitizeString(tag.trim())).join('-')}`
    );
    
    await fs.promises.mkdir(folderPath, { recursive: true });
    await fs.promises.mkdir(path.join(folderPath, 'images'), { recursive: true });
    await fs.promises.mkdir(path.join(folderPath, 'files'), { recursive: true });
    
    return folderPath;
  }

  // Create product.json
  async createProductJson(data, productId, folderPath) {
    const productData = {
      name: data.name,
      description: data.description,
      detailedDescription: data.detailedDescription || data.description,
      price: parseFloat(data.price),
      originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : parseFloat(data.price),
      subcategory: data.subcategory,
      tags: data.tags.split(',').map(tag => tag.trim()),
      features: this.generateFeatures(data.tags),
      sizes: this.generateSizes(),
      colors: this.generateColors(),
      downloadCount: 0,
      rating: 0,
      reviews: 0,
      inStock: true,
      isNew: true,
      isFeatured: false,
      createdAt: new Date().toISOString(),
      customFields: {
        artisan: data.artisan,
        brand: data.brand,
        category: data.category,
        fileSize: data.fileSize
      }
    };
    
    const jsonPath = path.join(folderPath, 'product.json');
    await fs.promises.writeFile(jsonPath, JSON.stringify(productData, null, 2));
  }

  // Create image folders
  async createImageFolders(data, folderPath) {
    const imagesPath = path.join(folderPath, 'images');
    
    // Create placeholder for main image
    if (data.mainImage) {
      const mainImagePath = path.join(imagesPath, 'main.jpg');
      await fs.promises.writeFile(mainImagePath, '# Main product image placeholder\n' + data.mainImage);
    }
    
    // Create placeholders for gallery images
    if (data.galleryImages) {
      const galleryImages = data.galleryImages.split('\n').filter(img => img.trim());
      for (let i = 0; i < galleryImages.length; i++) {
        const galleryPath = path.join(imagesPath, `gallery-${i + 1}.jpg`);
        await fs.promises.writeFile(galleryPath, `# Gallery image ${i + 1} placeholder\n${galleryImages[i]}`);
      }
    }
  }

  // Create file folders
  async createFileFolders(data, folderPath) {
    const filesPath = path.join(folderPath, 'files');
    
    if (data.productFiles) {
      const files = data.productFiles.split('\n').filter(file => file.trim());
      for (let i = 0; i < files.length; i++) {
        const filePath = path.join(filesPath, `product-file-${i + 1}.zip`);
        await fs.promises.writeFile(filePath, `# Product file ${i + 1} placeholder\n${files[i]}`);
      }
    }
  }

  // Create README
  async createReadme(data, productId, folderPath) {
    const readmeContent = `# ${data.name}

**Product ID**: ${productId}
**Brand**: ${data.brand}
**Artisan**: ${data.artisan}
**Category**: ${data.category} > ${data.subcategory}
**Price**: $${data.price}${data.originalPrice ? ` (was $${data.originalPrice})` : ''}

## Description
${data.description}

## Detailed Description
${data.detailedDescription || data.description}

## Tags
${data.tags}

## Files
- Main Image: ${data.mainImage}
- Gallery Images: ${data.galleryImages || 'None'}
- Product Files: ${data.productFiles}
- File Size: ${data.fileSize} MB

## Created
${new Date().toISOString()}

---
*This product was created using the AI Mod Upload System*
`;
    
    const readmePath = path.join(folderPath, 'README.md');
    await fs.promises.writeFile(readmePath, readmeContent);
  }

  // Generate features from tags
  generateFeatures(tags) {
    const featureMap = {
      'premium': ['High-quality materials', 'Professional grade', 'Long-lasting'],
      'organic': ['Natural ingredients', 'Eco-friendly', 'Chemical-free'],
      'anti-aging': ['Age-defying formula', 'Wrinkle reduction', 'Skin renewal'],
      'moisturizing': ['Deep hydration', 'Skin nourishment', 'Soft texture'],
      'cleansing': ['Deep cleaning', 'Gentle formula', 'Pore purification']
    };
    
    const features = [];
    const tagList = tags.split(',').map(tag => tag.trim().toLowerCase());
    
    tagList.forEach(tag => {
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

  // Sync with database
  async syncWithDatabase(productId) {
    try {
      const response = await fetch('http://localhost:5000/api/products/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        console.log('Product synced with database successfully');
        return true;
      } else {
        console.error('Failed to sync with database');
        return false;
      }
    } catch (error) {
      console.error('Error syncing with database:', error);
      return false;
    }
  }

  // Cancel upload
  cancelUpload() {
    this.currentUpload = null;
    this.currentStep = 0;
    return { message: 'Upload cancelled' };
  }

  // Get upload status
  getUploadStatus() {
    if (!this.currentUpload) {
      return { status: 'none' };
    }
    
    return {
      status: 'in_progress',
      step: this.currentUpload.step,
      progress: ((this.currentStep + 1) / this.uploadSteps.length) * 100,
      data: this.currentUpload.data
    };
  }
}

// Export singleton instance
export const modUploadSystem = new ModUploadSystem();
export default modUploadSystem;
