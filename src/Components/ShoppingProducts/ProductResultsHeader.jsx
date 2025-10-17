import { memo } from "react";
import { ViewModeToggle } from "./ViewModeToggle";

export const ProductResultsHeader = memo(({ 
  categoryData,
  category,
  filteredProducts,
  products,
  isSearchActive,
  searchQuery,
  viewMode,
  onViewModeChange
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="page-title capitalize text-2xl font-bold text-gray-900">
            {category ? categoryData?.name : "All Products"}
          </h1>
          <p className="page-description text-gray-600 mt-1">
            {category ? categoryData?.description : "Discover amazing products from all categories"}
          </p>
        </div>
        
        <ViewModeToggle 
          viewMode={viewMode} 
          onViewModeChange={onViewModeChange} 
        />
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {isSearchActive ? (
          <>Showing {filteredProducts.length} search results for "{searchQuery}"</>
        ) : (
          <>Showing {filteredProducts.length} of {products.length} products</>
        )}
      </div>
    </div>
  );
});

ProductResultsHeader.displayName = 'ProductResultsHeader';
