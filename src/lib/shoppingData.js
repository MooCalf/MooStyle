// Shopping Content Data System
// This file contains all the dynamic content for the shopping page

export const shoppingCategories = {
  inZOI: {
    products: [
      {
        id: "MOCA-001",
        name: "MOCA Cafe Brand",
        nameColor: "#ffffff",
        brand: "MOCA",
        image: "/projects/Products/MOCA Brand/MOCA - Logo -  Image Green.png",
        images: [
          "/projects/Products/MOCA Brand/MOCA - Logo -  Image Green.png",
          "/projects/Products/MOCA Brand/Mod Feature Pack Showcase.png",
          "/projects/Products/MOCA Brand/Preview  (1).png",
          "/projects/Products/MOCA Brand/Preview  (2).png",
          "/projects/Products/MOCA Brand/Preview  (3).png",
        ],
        description: "A full on brand experience for MOCA Cafe, your local coffee shop.",
        detailedDescription: "A full on brand experience for MOCA Cafe, your local coffee shop.",
        features: [
          "Large Exterior Signs foir Branding",
          "Wall Mounted Signs",
          "Menu Boards"
          
        ],
        tags: ["Cafe", "Coffee", "MOCA", "Shop"],
        isNew: true,
        downloadlink: "https://www.curseforge.com/inzoi/build-mode/moca-cafe-brand-9abd5f5f",
        patreonlink: "https://www.patreon.com/posts/moca-cafe-brand-151972427?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link",
        howToUse: "Place the exterior signs on the outside of your building to create a welcoming storefront. Use the wall-mounted signs to add character and charm to your interior spaces. The menu boards can be placed near your counter or seating areas to display your offerings in style. Perfect for creating a cozy and inviting atmosphere in your cafe or coffee shop. Can't find my mods in your build menu? Try looking for 'MOCA' or 'Sign' and you should see them! If you still can't find them, make sure your mod is up to date and that you have the correct version of Build Mode installed. Happy building!",

      },
    ]
  }
};

// Ensure each product object exposes normalized download link fields.
// This makes it safe for UI to read `downloadLink` or `downloadlink` directly
// even if the original product only provided `modFile` info.
Object.values(shoppingCategories).forEach(category => {
  category.products.forEach(p => {
    const dl = p.downloadLink ?? p.downloadlink ?? p.modFile?.url ?? (p.modFile?.filename ? `/download/${p.id}` : null);
    p.downloadLink = dl;
    p.downloadlink = dl;
  });
});

// Helper functions for content management
export const getCategoryData = (category) => {
  return shoppingCategories[category] || null;
};

export const getAllProducts = () => {
  const allProducts = [];
  Object.values(shoppingCategories).forEach(category => {
    allProducts.push(...category.products);
  });
  // Return normalized copies that include downloadLink/downloadlink for safety
  return allProducts.map(p => ({
    ...p,
    downloadLink: p.downloadLink ?? p.downloadlink ?? p.modFile?.url ?? (p.modFile?.filename ? `/download/${p.id}` : null),
    downloadlink: p.downloadLink ?? p.downloadlink ?? p.modFile?.url ?? (p.modFile?.filename ? `/download/${p.id}` : null)
  }));
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
