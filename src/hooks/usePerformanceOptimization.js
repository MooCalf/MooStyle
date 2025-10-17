import { useState, useMemo, useCallback, useEffect } from "react";

// Custom hook for optimized product array management
export const useOptimizedProducts = (products, pageSize = 12) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedProducts, setLoadedProducts] = useState([]);

  // Memoized pagination logic
  const paginatedProducts = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * pageSize;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage, pageSize]);

  // Load more products
  const loadMore = useCallback(() => {
    if (currentPage * pageSize < products.length) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, pageSize, products.length]);

  // Check if there are more products to load
  const hasMore = useMemo(() => {
    return currentPage * pageSize < products.length;
  }, [currentPage, pageSize, products.length]);

  // Reset pagination when products change
  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    displayedProducts: paginatedProducts,
    hasMore,
    loadMore,
    resetPagination,
    totalProducts: products.length,
    loadedCount: paginatedProducts.length
  };
};

// Hook for debounced search to prevent excessive API calls
export const useDebouncedSearch = (searchQuery, delay = 300) => {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return debouncedQuery;
};

// Hook for managing viewport-based rendering
export const useViewportOptimization = () => {
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine optimal grid columns based on viewport
  const gridColumns = useMemo(() => {
    if (viewportSize.width < 768) return 1;
    if (viewportSize.width < 1024) return 2;
    if (viewportSize.width < 1280) return 3;
    return 4;
  }, [viewportSize.width]);

  // Determine if virtualization should be enabled
  const shouldUseVirtualization = useMemo(() => {
    return viewportSize.width < 1024; // Enable on smaller screens for better performance
  }, [viewportSize.width]);

  return {
    viewportSize,
    gridColumns,
    shouldUseVirtualization
  };
};
