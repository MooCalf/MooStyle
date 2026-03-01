import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { NavigationBar } from "@/Components/NavigationBar";
import { ProductCard } from "@/Components/ProductCard";
import { getAllProducts } from "@/lib/shoppingData";
import { Metadata } from "@/Components/Metadata.jsx";
import { WebsiteBackground } from "@/Components/WebsiteBackground";
import { 
  Star, 
  ArrowLeft, 
  Users, 
  Award, 
  Globe, 
  Heart,
  Share2,
  Grid,
  List,
  Loader2
} from "lucide-react";

export const BrandDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        const allProducts = getAllProducts();
        const brandProducts = allProducts.filter(product => 
          product.brand.toLowerCase() === decodeURIComponent(id).toLowerCase()
        );
        
        if (brandProducts.length > 0) {
          const brand = brandProducts[0].brand;
          const totalProducts = brandProducts.length;
          const averageRating = brandProducts.reduce((sum, product) => sum + product.rating, 0) / totalProducts;
          const totalDownloads = brandProducts.reduce((sum, product) => sum + product.downloadCount, 0);
          
          setBrandData({
            name: brand,
            products: brandProducts,
            totalProducts,
            averageRating: Math.round(averageRating * 10) / 10,
            totalDownloads,
            description: getBrandDescription(brand),
            category: getBrandCategory(brand),
            logo: getBrandLogoImage(brand)
          });
        }
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const handleToggleFavorite = (productId) => {
    console.log("Toggling favorite for:", productId);
  };

  const handleQuickView = (product) => {
    console.log("Quick view for:", product.name);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${brandData.name} - MooStyle`,
        text: brandData.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <WebsiteBackground />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading brand details...</p>
        </div>
      </div>
    );
  }

  if (!brandData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <WebsiteBackground />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Brand Not Found</h1>
          <p className="text-gray-600 mb-6">The brand you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/brands")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Brands
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Metadata 
        pageTitle={`${brandData.name} - Partnering Brands | MooStyle`}
        pageDescription={brandData.description}
      />
      
      <div className="min-h-screen">
        <WebsiteBackground />
        {/* Navigation Bars */}
        <NavigationBar />

        {/* Brand Banner */}
        <div className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 text-white shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-teal-100">
              <Link to="/brands" className="hover:text-white transition-colors">
                Brands
              </Link>
              <span>/</span>
              <span className="text-white">{brandData.name}</span>
            </div>

            {/* Brand Header */}
            <div className="flex items-center gap-8 mb-8">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
                <img
                  src={getBrandLogoImage(brandData.name)}
                  alt={`${brandData.name} logo`}
                  className="w-20 h-20 object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Mb2dvPC90ZXh0Pjwvc3ZnPg==";
                  }}
                />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4">{brandData.name}</h1>
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < Math.floor(brandData.averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold">{brandData.averageRating}</span>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                    {brandData.category}
                  </span>
                </div>
                <p className="text-lg text-teal-100 leading-relaxed max-w-3xl">
                  {brandData.description}
                </p>
              </div>
            </div>

            {/* Brand Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 text-teal-200 mb-2">
                  <Users size={24} />
                </div>
                <div className="text-3xl font-bold mb-1">{brandData.totalProducts}</div>
                <div className="text-teal-200">Products</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 text-teal-200 mb-2">
                  <Award size={24} />
                </div>
                <div className="text-3xl font-bold mb-1">{brandData.averageRating}</div>
                <div className="text-teal-200">Average Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 text-teal-200 mb-2">
                  <Globe size={24} />
                </div>
                <div className="text-3xl font-bold mb-1">
                  {brandData.totalDownloads > 1000 ? `${(brandData.totalDownloads / 1000).toFixed(1)}K` : brandData.totalDownloads}
                </div>
                <div className="text-teal-200">Total Downloads</div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Products Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {brandData.name} Products
              </h2>
              <p className="text-gray-600">
                Showing {brandData.products.length} product{brandData.products.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-600"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-600"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {brandData.products.length > 0 ? (
            <div className={`${
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
                : "space-y-3"
            }`}>
              {brandData.products.map((product) => (
                viewMode === "grid" ? (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onToggleFavorite={handleToggleFavorite}
                    onQuickView={handleQuickView}
                  />
                ) : (
                  <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      {/* Small Product Image */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZTwvdGV4dD48L3N2Zz4=";
                          }}
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{product.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">({product.reviewCount})</span>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-semibold text-gray-900">${product.price}</div>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleToggleFavorite(product.id);
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Heart size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(`/product/${product.id}`);
                          }}
                          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-teal-600 hover:bg-teal-700 text-white"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Download size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">
                This brand doesn't have any products available yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Helper functions (same as in Brands.jsx)
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
