import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavigationBar } from "@/Components/NavigationBar";
import { ProductCard } from "@/Components/ProductCard";
import { getProductById, getRelatedProducts, getProductCategory, getAllProducts } from "@/lib/shoppingData";
import { Metadata } from "@/Components/Metadata.jsx";
import { 
  Star, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle,
  ArrowLeft,
  Check
} from "lucide-react";
import { saveProduct, unsaveProduct, isProductSaved } from "@/lib/savedProducts";
import { WebsiteBackground } from "@/Components/WebsiteBackground";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      try {
        const productData = getProductById(id);
        
        if (productData) {
          setProduct(productData);
          setRelatedProducts(getRelatedProducts(id));
          // sync saved state from cookie
          setIsFavorite(isProductSaved(productData.id));
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  // Keyboard navigation for image carousel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!product?.images || product.images.length <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1);
      } else if (e.key === 'ArrowRight') {
        setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1);
      }
    };

    // Add event listener when component mounts
    document.addEventListener('keydown', handleKeyDown);
    
    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [product?.images]);

  const handleToggleFavorite = () => {
    if (!product) return;
    try {
      if (isProductSaved(product.id)) {
        unsaveProduct(product.id);
        setIsFavorite(false);
      } else {
        saveProduct(product);
        setIsFavorite(true);
      }
    } catch (e) {
      console.error('Error toggling save:', e);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
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
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    const allProducts = getAllProducts();
    return (
      <div className="min-h-screen flex items-center justify-center">
        <WebsiteBackground />
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">
            The product with ID "{id}" doesn't exist.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-2">Available Products:</h3>
            <div className="text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto">
              {allProducts.slice(0, 10).map(p => (
                <div key={p.id} className="flex justify-between">
                  <span>{p.name}</span>
                  <span className="text-gray-500">ID: {p.id}</span>
                </div>
              ))}
              {allProducts.length > 10 && (
                <div className="text-gray-500 italic">
                  ... and {allProducts.length - 10} more
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  
  const category = getProductCategory(id);

  return (
    <>
      <Metadata 
        pageTitle={`${product.name} - ${product.brand} | MooStyle`}
        pageDescription={product.description}
        ogTitle={`${product.name} by ${product.brand} - Premium Asian Fashion | MooStyle`}
        ogDescription={`${product.description} Shop now at MooStyle for authentic Asian fashion and beauty products. ${product.rating ? `⭐ ${product.rating}/5 stars` : ''} ${product.inStock ? 'In Stock' : 'Limited Stock'}.`}
        ogImage={product.image}
        ogType="product"
        keywords={`${product.name}, ${product.brand}, ${product.tags?.join(', ') || ''}, Asian fashion, Korean beauty, Japanese streetwear, MooStyle`}
        product={product}
      />
      
      <div className="min-h-screen">
        <WebsiteBackground />
        {/* Navigation Bars */}
        <NavigationBar />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image with Carousel Navigation */}
              <div className="aspect-square bg-white rounded-lg overflow-hidden border border-gray-200 relative group">
                <img
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2R1Y3QgSW1hZ2U8L3RleHQ+PC9zdmc+";
                  }}
                />
                
                {/* Carousel Navigation Arrows - Only show if multiple images */}
                {product.images && product.images.length > 1 && (
                  <>
                    {/* Previous Button */}
                    <button
                      onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={() => setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {selectedImage + 1} / {product.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-teal-500" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</span>
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      NEW
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      BESTSELLER
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                {/* Rating */}
                {(product.rating || product.reviewCount) && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < Math.floor(product.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    {product.reviewCount ? <span className="text-gray-600">({product.reviewCount} reviews)</span> : null}
                  </div>
                )}

              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.detailedDescription || product.description}
                </p>
              </div>

              {/* Features */}
              {product.features && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const dl = product.downloadLink ?? product.downloadlink ?? null;
                      if (dl) window.open(dl, '_blank');
                    }}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
                      (product.downloadLink || product.downloadlink)
                        ? "bg-teal-600 hover:bg-teal-700 text-white"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                  >
                    {(product.downloadLink || product.downloadlink) ? (
                      <>
                        <ArrowLeft size={20} />
                        Download Product
                      </>
                    ) : (
                      <>
                        <CheckCircle size={20} />
                        Coming Soon
                      </>
                    )}
                  </button>

                  {/* Patreon support button - shows only if product.patreonlink or product.patreonLink is present */}
                  {(product.patreonlink || product.patreonLink) && (
                    <a
                      href={product.patreonlink ?? product.patreonLink}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`Support ${product.brand} on Patreon`}
                      className="py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 bg-[#ff424d] hover:bg-[#e63a42] text-white"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M3 12.5C3 10.57 4.57 9 6.5 9C8.43 9 10 10.57 10 12.5C10 14.43 8.43 16 6.5 16C4.57 16 3 14.43 3 12.5Z" fill="currentColor"/>
                        <path d="M15 7H18C20.2091 7 22 8.79086 22 11V13C22 15.2091 20.2091 17 18 17H15V7Z" fill="currentColor"/>
                      </svg>
                      Patreon
                    </a>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleToggleFavorite}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
                      isFavorite
                        ? "bg-red-50 text-red-600 border border-red-200"
                        : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <Heart size={20} className={isFavorite ? "fill-current" : ""} />
                    {isFavorite ? "Saved" : "Save"}
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                  >
                    <Share2 size={20} />
                    Share
                  </button>
                </div>
              </div>

              {/* Shipping & Returns */}
              {(product.shipping || product.returnPolicy) && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  {product.shipping && (
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-teal-600" />
                      <span className="text-sm text-gray-700">{product.shipping}</span>
                    </div>
                  )}
                  {product.returnPolicy && (
                    <div className="flex items-center gap-2">
                      <RotateCcw size={16} className="text-teal-600" />
                      <span className="text-sm text-gray-700">{product.returnPolicy}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-teal-600" />
                    <span className="text-sm text-gray-700">Secure checkout</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* How to Use - Show for beauty products */}
            {product.howToUse && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-600 text-sm font-bold">1</span>
                  </div>
                  How to Use
                </h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">{product.howToUse}</p>
                </div>
              </div>
            )}

            {/* Privacy & Terms advisory - replaces Ingredients/Features column */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy & Terms</h3>
              <div className="text-sm text-gray-700 space-y-3">
                <p>
                  Please review our policies before using or downloading this product. By using this site and its
                  services you agree to the terms described in the links below.
                </p>
                <ul className="list-disc list-inside">
                  <li>
                    <a href="http://localhost:5173/privacy-policy" target="_blank" rel="noreferrer noopener" className="text-teal-600 hover:underline">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="http://localhost:5173/terms-of-service" target="_blank" rel="noreferrer noopener" className="text-teal-600 hover:underline">Terms of Usage</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">You Might Also Like</h2>
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Similar to: {product.tags?.slice(0, 2).join(", ") || ''}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    onAddToCart={() => console.log("Add to cart:", relatedProduct.name)}
                    onToggleFavorite={() => console.log("Toggle favorite:", relatedProduct.id)}
                    onQuickView={() => console.log("Quick view:", relatedProduct.name)}
                  />
                ))}
              </div>
              {relatedProducts.length < 4 && (
                <div className="text-center mt-6">
                  <p className="text-gray-600 text-sm">
                    Showing {relatedProducts.length} related product{relatedProducts.length !== 1 ? 's' : ''} with similar tags
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
