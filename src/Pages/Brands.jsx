import { NavigationPrimary } from "@/Components/NavigationPrimary";
import { NavigationSecondary } from "@/Components/NavigationSecondary";
import { Footer } from "@/Components/Footer";
import { ArrowLeft, Star, Users, Award, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Metadata } from "@/Components/Metadata.jsx";
import { getAllProducts } from "@/lib/shoppingData";

const Brands = () => {
  // Get all products to extract unique brands
  const allProducts = getAllProducts();
  const brands = [...new Set(allProducts.map(product => product.brand))];
  
  // Create brand data with additional information
  const brandData = brands.map(brand => {
    const brandProducts = allProducts.filter(product => product.brand === brand);
    const totalProducts = brandProducts.length;
    const averageRating = brandProducts.reduce((sum, product) => sum + product.rating, 0) / totalProducts;
    const totalDownloads = brandProducts.reduce((sum, product) => sum + product.downloadCount, 0);
    
    return {
      name: brand,
      products: brandProducts,
      totalProducts,
      averageRating: Math.round(averageRating * 10) / 10,
      totalDownloads,
      description: getBrandDescription(brand),
      category: getBrandCategory(brand),
      logo: getBrandLogoImage(brand)
    };
  });

  // Sort brands by total downloads (most popular first)
  brandData.sort((a, b) => b.totalDownloads - a.totalDownloads);

  return (
    <>
      <Metadata 
        pageTitle="Brands - MooStyle"
        pageDescription="Discover amazing brands from Asia offering beauty, fashion, lifestyle, and health products."
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bars */}
        <NavigationPrimary />
        <NavigationSecondary />

        {/* Header */}
        <div className="page-header">
          <div className="content-container">
            <div className="page-header-content">
              <Link to="/" className="back-button-enhanced">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="mt-4">
              <h1 className="page-title">
                <span className="page-title-accent">Partnering</span> Brands
              </h1>
              <p className="page-description">
                Discover amazing brands from all over the globe, offering premium beauty, fashion, lifestyle, and health products.
              </p>
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandData.map((brand, index) => (
              <Link 
                key={brand.name} 
                to={`/brand/${encodeURIComponent(brand.name)}`}
                className="brand-card"
              >
                {/* Brand Header with Background Image */}
                <div className="relative p-6 border-b border-gray-100 overflow-hidden">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${getBrandBackgroundImage(brand.name)})`,
                      opacity: 0.5
                    }}
                  ></div>
                  
                  {/* White Gradient Fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
                        <img
                          src={getBrandLogoImage(brand.name)}
                          alt={`${brand.name} logo`}
                          className="w-12 h-12 object-cover rounded-full"
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Mb2dvPC90ZXh0Pjwvc3ZnPg==";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 drop-shadow-sm">{brand.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < Math.floor(brand.averageRating) ? "text-yellow-400 fill-current drop-shadow-sm" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 drop-shadow-sm">{brand.averageRating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm leading-relaxed drop-shadow-sm">
                      {brand.description}
                    </p>
                  </div>
                </div>

                {/* Brand Stats */}
                <div className="p-6 bg-gradient-to-br from-teal-50/50 to-white">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-teal-600 mb-1">
                        <Users size={16} />
                      </div>
                      <div className="text-lg font-semibold text-gray-900">{brand.totalProducts}</div>
                      <div className="text-xs text-teal-600 font-medium">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-teal-500 mb-1">
                        <Award size={16} />
                      </div>
                      <div className="text-lg font-semibold text-gray-900">{brand.averageRating}</div>
                      <div className="text-xs text-teal-600 font-medium">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-teal-400 mb-1">
                        <Globe size={16} />
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {brand.totalDownloads > 1000 ? `${(brand.totalDownloads / 1000).toFixed(1)}K` : brand.totalDownloads}
                      </div>
                      <div className="text-xs text-teal-600 font-medium">Downloads</div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                      {brand.category}
                    </span>
                    <span className="text-teal-600 text-sm font-medium group-hover:text-teal-700 transition-colors">
                      View Details →
                    </span>
                  </div>
                </div>

                {/* Featured Products Preview */}
                <div className="px-6 pb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Featured Products</h4>
                  <div className="space-y-2">
                    {brand.products.slice(0, 1).map((product) => (
                      <div key={product.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-xs text-gray-600">${product.price}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-16 bg-gradient-to-br from-teal-50 to-white rounded-lg border border-teal-200 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Brand <span className="text-teal-600">Overview</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-teal-50 transition-colors">
                <div className="text-3xl font-bold text-teal-600 mb-2">{brands.length}</div>
                <div className="text-teal-700 font-medium">Total Brands</div>
              </div>
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-teal-50 transition-colors">
                <div className="text-3xl font-bold text-teal-500 mb-2">{allProducts.length}</div>
                <div className="text-teal-700 font-medium">Total Products</div>
              </div>
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-teal-50 transition-colors">
                <div className="text-3xl font-bold text-teal-400 mb-2">
                  {allProducts.reduce((sum, product) => sum + product.downloadCount, 0) > 100000 
                    ? `${(allProducts.reduce((sum, product) => sum + product.downloadCount, 0) / 100000).toFixed(1)}M`
                    : `${(allProducts.reduce((sum, product) => sum + product.downloadCount, 0) / 1000).toFixed(0)}K`
                  }
                </div>
                <div className="text-teal-700 font-medium">Total Downloads</div>
              </div>
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-teal-50 transition-colors">
                <div className="text-3xl font-bold text-teal-600 mb-2">
                  {Math.round((allProducts.reduce((sum, product) => sum + product.rating, 0) / allProducts.length) * 10) / 10}
                </div>
                <div className="text-teal-700 font-medium">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

// Helper functions
const getBrandDescription = (brandName) => {
  const descriptions = {
    "LunaGlow": "Korean skincare innovator specializing in glass skin routines and premium beauty solutions.",
    "TokyoVibe": "Japanese beauty brand bringing authentic Tokyo street style and innovative makeup products.",
    "CelestialBeauty": "Chinese herbal beauty brand combining traditional medicine with modern skincare science.",
    "PearlEssence": "Korean makeup brand known for natural, dewy finishes and long-lasting color products.",
    "MLOO": "An online store specializing in delicious pastries, little snack bites, and typical cafe-style foods. MLOO brings you the perfect blend of comfort and indulgence with our carefully crafted baked goods and delightful treats.",
    "TokyoGlow": "Japanese skincare brand focused on fermented ingredients and radiant, healthy skin.",
    "HerbalGlow": "Traditional Chinese beauty brand using ancient herbal wisdom for modern skincare needs.",
    "SeoulStyle": "Korean fashion brand bringing Seoul's trendy street style to global audiences.",
    "TokyoFashion": "Japanese fashion house known for minimalist designs and high-quality materials.",
    "SilkRoad": "Chinese luxury brand specializing in premium silk accessories and traditional craftsmanship.",
    "UrbanHarbor": "Korean streetwear brand creating comfortable, stylish urban fashion for modern lifestyles.",
    "TokyoDenim": "Japanese denim specialist crafting premium jeans with traditional techniques and modern fits.",
    "ZenLifestyle": "Japanese lifestyle brand promoting mindfulness through beautiful home and wellness products.",
    "HarmonyWell": "Korean wellness brand creating products for balanced living and inner peace.",
    "WellnessCore": "Korean health brand specializing in traditional supplements and energy-boosting products.",
    "TraditionalWell": "Chinese wellness brand bringing ancient healing wisdom to modern health needs.",
    "ARNOO": "Premium home renovation and interior design studio specializing in modern furniture and contemporary home decor. Transform your living spaces with our curated collection of sophisticated furniture pieces and innovative design solutions."
  };
  return descriptions[brandName] || "A premium brand offering quality products from Asia.";
};

const getBrandCategory = (brandName) => {
  const categories = {
    "LunaGlow": "Beauty",
    "TokyoVibe": "Beauty", 
    "CelestialBeauty": "Beauty",
    "PearlEssence": "Beauty",
    "MLOO": "Food & Beverage",
    "TokyoGlow": "Beauty",
    "HerbalGlow": "Beauty",
    "SeoulStyle": "Fashion",
    "TokyoFashion": "Fashion",
    "SilkRoad": "Fashion",
    "UrbanHarbor": "Fashion",
    "TokyoDenim": "Fashion",
    "ZenLifestyle": "Lifestyle",
    "HarmonyWell": "Lifestyle",
    "WellnessCore": "Health",
    "TraditionalWell": "Health",
    "ARNOO": "Home & Design"
  };
  return categories[brandName] || "General";
};

const getBrandLogoImage = (brandName) => {
  const logoImages = {
    "LunaGlow": "/projects/BrandCovers/More Brands/BrandButtons - LUNAGLOW.png",
    "TokyoVibe": "/projects/BrandCovers/More Brands/BrandButtons - TOKYOVIBE.png",
    "CelestialBeauty": "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    "PearlEssence": "/projects/BrandCovers/More Brands/BrandButtons - PEARLESENCE.png",
    "MLOO": "/projects/Brand Medias/Mloo/Branding/Mloo - Logo (Black and White).webp",
    "TokyoGlow": "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
    "HerbalGlow": "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
    "SeoulStyle": "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    "TokyoFashion": "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    "SilkRoad": "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
    "UrbanHarbor": "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
    "TokyoDenim": "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
    "ZenLifestyle": "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
    "HarmonyWell": "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    "WellnessCore": "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    "TraditionalWell": "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
    "ARNOO": "/projects/Brand Medias/Arnoo/Branding/Arnoo - Logo (Black and White).webp"
  };
  return logoImages[brandName] || "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png";
};

const getBrandBackgroundImage = (brandName) => {
  const backgroundImages = {
    "LunaGlow": "/projects/Products/LunaGlow/Korean Glass Skin Set/Lunaglow - Kit Promotional Cover.png",
    "TokyoVibe": "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    "CelestialBeauty": "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    "PearlEssence": "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
    "MLOO": "/projects/Brand Medias/Mloo/Branding/MLOO - Branding Advertising.webp",
    "TokyoGlow": "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
    "HerbalGlow": "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
    "SeoulStyle": "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    "TokyoFashion": "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    "SilkRoad": "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
    "UrbanHarbor": "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
    "TokyoDenim": "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
    "ZenLifestyle": "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
    "HarmonyWell": "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    "WellnessCore": "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    "TraditionalWell": "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
    "ARNOO": "/projects/Brand Medias/Arnoo/Branding/Arnoo - Branding Advertising.png"
  };
  return backgroundImages[brandName] || "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png";
};

export { Brands };
