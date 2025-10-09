# 🤖 **AI Mod Upload Assistant - Private README**

## 📋 **Purpose**
This README contains the step-by-step process for uploading mods to the website. The AI assistant will follow this process whenever you request a mod upload.

## 🔄 **Upload Process Flow**

### **Step 1: Initial Information Gathering**
When you request a mod upload, I will ask for:

1. **Basic Product Information**:
   - Product name
   - Brand name
   - Artisan/Creator name (if applicable)
   - Category (Beauty, Health, Men, Women, Lifestyle)
   - Subcategory (e.g., Skincare, Makeup, etc.)

2. **Product Details**:
   - Description (brief)
   - Detailed description
   - Price
   - Original price (if on sale)
   - Tags (comma-separated)

3. **File Information**:
   - Main product image
   - Additional gallery images (optional)
   - Product files (zip, etc.)
   - File size estimation

### **Step 2: Folder Structure Creation**
I will create the folder structure following this pattern:
```
public/projects/Shopping Contents/{Category}/{Subcategory}/{BrandName}/{ArtisanName}/{ItemNumber}-{Tags}/
```

### **Step 3: File Organization**
I will organize files as follows:
- `product.json` - Product metadata
- `images/` - Product images
- `files/` - Downloadable files
- `README.md` - Optional documentation

### **Step 4: Database Sync**
I will trigger the product sync to update the database tracking.

## 📝 **Required Information Template**

### **Product Information**:
```
Name: [Product Name]
Brand: [Brand Name]
Artisan: [Creator Name or "Generic"]
Category: [Beauty/Health/Men/Women/Lifestyle]
Subcategory: [Specific subcategory]
Description: [Brief description]
Detailed Description: [Full description]
Price: [Price in USD]
Original Price: [Original price if on sale]
Tags: [comma-separated tags]
```

### **File Information**:
```
Main Image: [Image file or description]
Gallery Images: [Additional images]
Product Files: [Files to include]
File Size: [Estimated size]
```

## 🎯 **Questions I Will Ask**

1. **What is the product name?**
2. **What brand is this product from?**
3. **Who is the artisan/creator? (or "Generic" if none)**
4. **What category does this belong to? (Beauty/Health/Men/Women/Lifestyle)**
5. **What subcategory? (e.g., Skincare, Makeup, etc.)**
6. **What is the product description?**
7. **What is the detailed description?**
8. **What is the price?**
9. **What is the original price? (if on sale)**
10. **What tags should be applied? (comma-separated)**
11. **Do you have a main product image?**
12. **Do you have additional gallery images?**
13. **What files should be included for download?**
14. **What is the estimated file size?**

## 🔧 **Automated Actions**

After gathering all information, I will:

1. **Generate Product ID**: Using the format `{BrandName}-{ArtisanName}-{ItemNumber}-{Tags}-{Category}`
2. **Create Folder Structure**: Following the established pattern
3. **Generate product.json**: With all provided information
4. **Create Image Folders**: For main and gallery images
5. **Create File Folders**: For downloadable content
6. **Update Database**: Sync with ProductTracking collection
7. **Verify Upload**: Confirm successful creation

## 📊 **ID Generation Rules**

- **BrandName**: Sanitized (lowercase, hyphens)
- **ArtisanName**: Sanitized (or "generic" if none)
- **ItemNumber**: Auto-incremented 3-digit number
- **Tags**: Sanitized tags separated by "/"
- **Category**: Sanitized category name

## 🚨 **Error Handling**

If any step fails, I will:
1. Report the specific error
2. Suggest solutions
3. Offer to retry the step
4. Provide alternative approaches

## 📋 **Checklist**

Before completing upload:
- [ ] All required information gathered
- [ ] Folder structure created correctly
- [ ] product.json generated
- [ ] Images organized
- [ ] Files organized
- [ ] Database synced
- [ ] Upload verified

## 🔄 **Follow-up Actions**

After successful upload:
1. Confirm product is visible in admin dashboard
2. Test product API endpoints
3. Verify search functionality
4. Check product display on frontend

## 📝 **Notes**

- This process ensures consistent product organization
- All products follow the same structure
- Database tracking provides admin visibility
- File system remains the primary storage
- Easy to maintain and scale

---

**Last Updated**: [Current Date]
**Version**: 1.0
**Status**: Active
