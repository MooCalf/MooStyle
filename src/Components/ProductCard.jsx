import { useState } from "react";
import { Heart, ShoppingBag, Star, Eye, Download, User, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export const ProductCard = ({ product, onAddToCart, onToggleFavorite, onQuickView }) => {
  const { addToCart, isInCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Placeholder functions for now
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(product.id);
  };

  const handleQuickView = () => {
    onQuickView?.(product);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAddingToCart(true);
    try {
      const success = await addToCart(product);
      if (success) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000); // Reset after 2 seconds
      }
      // Don't call onAddToCart callback to prevent double adding
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDownloadCount = (count) => {
    if (!count) return '0';
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="product-card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <img
              src={imageError ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1vZDwvdGV4dD48L3N2Zz4=" : product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
            />
          </div>

          {/* Product Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                NEW
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                FEATURED
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleFavoriteToggle();
              }}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <Heart 
                size={16} 
                className={isFavorite ? "text-red-500 fill-current" : "text-gray-400"} 
              />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleQuickView();
              }}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <Eye size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Product Info */}
              <div className="p-4">
                {/* Author */}
                <div className="flex items-center gap-1 mb-1">
                  <User size={12} className="text-gray-400" />
                  <p className="text-xs text-gray-500 truncate">{product.author || product.brand}</p>
                </div>
                
                {/* Name */}
                <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2">{product.name}</h3>
                
                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                
                {/* Mod Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Download size={12} />
                    <span>{formatDownloadCount(product.downloadCount)}</span>
                  </div>
                  {product.modFile && (
                    <span>{formatFileSize(product.modFile.size)}</span>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                  {product.tags.length > 2 && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      +{product.tags.length - 2} more
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart || isInCart(product.id)}
                  className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                    addedToCart || isInCart(product.id)
                      ? "bg-green-600 text-white cursor-default"
                      : addingToCart
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700 text-white"
                  }`}
                >
            {addingToCart ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Adding...
              </>
            ) : addedToCart || isInCart(product.id) ? (
              <>
                <Check size={16} />
                In Cart
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};