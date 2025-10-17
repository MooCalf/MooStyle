import { memo, useState, useEffect, lazy, Suspense } from "react";
import { ProductGrid } from "./ProductGrid";
import { ProductList } from "./ProductList";

// Lazy load VirtualizedProductGrid to avoid import issues
const VirtualizedProductGrid = lazy(() => 
  import("./VirtualizedProductGrid").catch(() => ({
    default: () => (
      <div className="text-center py-8 text-gray-500">
        Virtualization not available. Using regular grid view.
      </div>
    )
  }))
);

export const ProductDisplay = memo(({ 
  products, 
  viewMode, 
  onToggleFavorite, 
  onQuickView,
  loading = false,
  enableVirtualization = false,
  virtualizationThreshold = 100
}) => {
  const [shouldUseVirtualization, setShouldUseVirtualization] = useState(false);

  useEffect(() => {
    // Enable virtualization for large datasets
    if (enableVirtualization && products.length > virtualizationThreshold) {
      setShouldUseVirtualization(true);
    } else {
      setShouldUseVirtualization(false);
    }
  }, [products.length, enableVirtualization, virtualizationThreshold]);

  // Use virtualization for grid view with large datasets
  if (viewMode === "grid" && shouldUseVirtualization) {
    return (
      <Suspense fallback={<ProductGrid products={products} onToggleFavorite={onToggleFavorite} onQuickView={onQuickView} loading={loading} />}>
        <VirtualizedProductGrid
          products={products}
          onToggleFavorite={onToggleFavorite}
          onQuickView={onQuickView}
          loading={loading}
        />
      </Suspense>
    );
  }

  // Use regular components for smaller datasets or list view
  return viewMode === "grid" ? (
    <ProductGrid
      products={products}
      onToggleFavorite={onToggleFavorite}
      onQuickView={onQuickView}
      loading={loading}
    />
  ) : (
    <ProductList
      products={products}
      onToggleFavorite={onToggleFavorite}
      loading={loading}
    />
  );
});

ProductDisplay.displayName = 'ProductDisplay';