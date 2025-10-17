import { memo, useMemo } from "react";
import { List } from "react-window";
import { ProductCard } from "../ProductCard";

// Virtualized Product Grid Item
const ProductGridItem = memo(({ index, style, data }) => {
  const { products, onToggleFavorite, onQuickView, itemsPerRow } = data;
  const startIndex = index * itemsPerRow;
  const endIndex = Math.min(startIndex + itemsPerRow, products.length);
  const rowProducts = products.slice(startIndex, endIndex);

  return (
    <div style={style} className="flex gap-6">
      {rowProducts.map((product) => (
        <div key={product.id} className="flex-1">
          <ProductCard
            product={product}
            onToggleFavorite={onToggleFavorite}
            onQuickView={onQuickView}
          />
        </div>
      ))}
      {/* Fill empty slots to maintain grid alignment */}
      {Array.from({ length: itemsPerRow - rowProducts.length }).map((_, i) => (
        <div key={`empty-${i}`} className="flex-1" />
      ))}
    </div>
  );
});

ProductGridItem.displayName = 'ProductGridItem';

export const VirtualizedProductGrid = memo(({ 
  products, 
  onToggleFavorite, 
  onQuickView,
  containerHeight = 600,
  itemHeight = 400
}) => {
  // Calculate items per row based on container width
  const itemsPerRow = 4; // Default for xl screens
  const rowCount = Math.ceil(products.length / itemsPerRow);

  const itemData = useMemo(() => ({
    products,
    onToggleFavorite,
    onQuickView,
    itemsPerRow
  }), [products, onToggleFavorite, onQuickView, itemsPerRow]);

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
    <div className="w-full">
      <List
        height={containerHeight}
        itemCount={rowCount}
        itemSize={itemHeight}
        itemData={itemData}
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        {ProductGridItem}
      </List>
    </div>
  );
});

VirtualizedProductGrid.displayName = 'VirtualizedProductGrid';
