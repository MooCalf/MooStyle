import { memo, useState } from "react";
import { Star, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Product List Item Component with Carousel
const ProductListItem = memo(({ product, onToggleFavorite }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get all available images
  const allImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

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

  return (
    <div className="list-item bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 group">
      <div className="flex items-center gap-4">
        {/* Small Product Image with Carousel */}
        <div className="list-item-image w-16 h-16 flex-shrink-0 relative group">
          <img
            src={allImages[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZTwvdGV4dD48L3N2Zz4=";
            }}
          />
          
          {/* Carousel Navigation for List View */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={goToPreviousImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={10} />
              </button>
              <button
                onClick={goToNextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                aria-label="Next image"
              >
                <ChevronRight size={10} />
              </button>
            </>
          )}
        </div>
        
        {/* Product Info */}
        <div className="list-item-content flex-1 min-w-0">
          <h3 className="list-item-title text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 truncate">{product.author || product.brand}</p>
        </div>
        
        {/* View Details Button - Only visible on hover */}
        <div className="list-item-actions opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-full group-hover:translate-x-0">
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="btn-primary text-sm px-4 py-2 whitespace-nowrap"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
});

ProductListItem.displayName = 'ProductListItem';

export const ProductList = memo(({ 
  products, 
  onToggleFavorite, 
  loading = false 
}) => {
  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        <span className="ml-3 text-gray-600">Loading products...</span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your search criteria or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} onToggleFavorite={onToggleFavorite} />
      ))}
    </div>
  );
});

ProductList.displayName = 'ProductList';