import { useState, useEffect } from "react";
import { Heart, Star, Eye, Download, User, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { OverlayModal } from "./ui/OverlayModal";
import { motion } from "framer-motion";
import { saveProduct, unsaveProduct, isProductSaved } from "@/lib/savedProducts";

export const ProductCard = ({ product, onToggleFavorite, onQuickView }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all available images (primary + additional)
  const allImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  // Check if product is saved on component mount
  useEffect(() => {
    setIsFavorite(isProductSaved(product.id));
    // Reset image index when product changes
    setCurrentImageIndex(0);
  }, [product.id]);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (allImages.length <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => 
          prev === 0 ? allImages.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => 
          prev === allImages.length - 1 ? 0 : prev + 1
        );
      }
    };

    // Add event listener when component mounts
    document.addEventListener('keydown', handleKeyDown);
    
    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [allImages.length]);

  // Carousel navigation functions
  const goToPreviousImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const goToNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  // Handle save/unsave functionality
  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSaving) return;
    
    setIsSaving(true);
    
    try {
      if (isFavorite) {
        // Unsave product
        const success = unsaveProduct(product.id);
        if (success) {
          setIsFavorite(false);
          showToast('Product removed from saved items', 'success');
        }
      } else {
        // Save product
        const success = saveProduct(product);
        if (success) {
          setIsFavorite(true);
          showToast('Product saved!', 'success');
        }
      }
      
      // Call parent callback if provided
      onToggleFavorite?.(product.id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showToast('Error saving product', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Show toast notification
  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    toast.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300`;
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const handleQuickView = () => {
    onQuickView?.(product);
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
      <motion.div 
        className="product-card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          y: -4,
          transition: { type: "spring", stiffness: 400, damping: 17 }
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <img
              src={imageError ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1vZDwvdGV4dD48L3N2Zz4=" : allImages[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
            />
          </div>

          {/* Carousel Navigation Arrows - Only show if multiple images */}
          {allImages.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={goToPreviousImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Next Button */}
              <button
                onClick={goToNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </>
          )}

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
              onClick={handleFavoriteToggle}
              disabled={isSaving}
              className={`p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all ${
                isSaving ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Heart 
                size={16} 
                className={`transition-colors ${
                  isFavorite ? "text-red-500 fill-current" : "text-gray-400 hover:text-red-500"
                } ${isSaving ? 'animate-pulse' : ''}`} 
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

          {/* View Details Button */}
          <Link
            to={`/product/${product.id}`}
            className="w-full py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Eye size={16} />
            View Details
          </Link>
        </div>
      </motion.div>
    </Link>
  );
};