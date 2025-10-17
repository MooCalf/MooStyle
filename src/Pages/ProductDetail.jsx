import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { NavigationPrimary } from "@/Components/NavigationPrimary";
import { NavigationSecondary } from "@/Components/NavigationSecondary";
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
  Minus,
  Plus,
  ArrowLeft,
  Check
} from "lucide-react";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      try {
        const productData = getProductById(id);
        
        if (productData) {
          setProduct(productData);
          setSelectedSize(productData.sizes?.[0] || null);
          setSelectedColor(productData.colors?.[0] || null);
          setRelatedProducts(getRelatedProducts(id));
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log("Toggling favorite for:", product.name);
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

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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

  const currentPrice = selectedSize ? selectedSize.price : product.price;
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
      
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bars */}
        <NavigationPrimary />
        <NavigationSecondary />

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-teal-600 hover:text-teal-700">Home</Link>
              <span className="text-gray-400">/</span>
              <Link to={`/shopping/${category}`} className="text-teal-600 hover:text-teal-700 capitalize">
                {category}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 truncate">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-white rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2R1Y3QgSW1hZ2U8L3RleHQ+PC9zdmc+";
                  }}
                />
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
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.reviewCount} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900">${currentPrice}</span>
                  {product.originalPrice && product.originalPrice > currentPrice && (
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full font-medium">
                      Save {product.discount}%
                    </span>
                  )}
                </div>
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

              {/* Size Selection */}
              {product.sizes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          selectedSize?.size === size.size
                            ? "border-teal-500 bg-teal-50 text-teal-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <div className="text-sm font-medium">{size.size}</div>
                        <div className="text-xs text-gray-600">${size.price}</div>
                        <div className="text-xs text-gray-500">{size.stock} left</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-2 transition-colors ${
                          selectedColor?.name === color.name
                            ? "border-teal-500"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => window.open(product.modFile?.filename ? `/download/${product.id}` : '#', '_blank')}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
                    product.modFile?.filename 
                      ? "bg-teal-600 hover:bg-teal-700 text-white"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                >
                  {product.modFile?.filename ? (
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
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-teal-600" />
                  <span className="text-sm text-gray-700">{product.shipping}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={16} className="text-teal-600" />
                  <span className="text-sm text-gray-700">{product.returnPolicy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-teal-600" />
                  <span className="text-sm text-gray-700">Secure checkout</span>
                </div>
              </div>
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
                  {product.tags.includes("Skincare") && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
                      <p className="text-blue-800 text-sm">
                        For best results, always patch test new skincare products on a small area of skin first.
                      </p>
                    </div>
                  )}
                  {product.tags.includes("Makeup") && (
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                      <h4 className="font-semibold text-pink-900 mb-2">💄 Pro Tip</h4>
                      <p className="text-pink-800 text-sm">
                        Apply makeup in natural lighting for the most accurate color matching.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Ingredients - Show for beauty products */}
            {product.ingredients && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm font-bold">🧪</span>
                  </div>
                  Ingredients
                </h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">{product.ingredients}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">🌿 Natural & Safe</h4>
                    <p className="text-green-800 text-sm">
                      All ingredients are carefully selected and tested for safety and effectiveness.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Product Features - Show for non-beauty products or as additional info */}
            {product.features && !product.howToUse && !product.ingredients && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Features</h3>
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

            {/* Additional Features for Beauty Products */}
            {product.features && (product.howToUse || product.ingredients) && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
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
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">You Might Also Like</h2>
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Similar to: {product.tags.slice(0, 2).join(", ")}
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
