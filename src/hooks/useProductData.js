import { useState, useEffect, useCallback, useMemo } from "react";
import { getCategoryData, getProductsByCategory, searchProducts, getAllProducts } from "@/lib/shoppingData";

export const useProductData = (category, searchQuery = "", filters = {}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const itemsPerPage = 12;
  const categoryData = useMemo(() => getCategoryData(category), [category]);

  const setSearchResults = useCallback((results) => {
    setFilteredProducts(results.slice(0, itemsPerPage));
    setCurrentPage(1);
    setHasMore(results.length > itemsPerPage);
  }, [itemsPerPage]);

  // Load initial products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      try {
        let productData;
        if (category && categoryData) {
          productData = getProductsByCategory(category);
        } else if (!category) {
          productData = getAllProducts();
        } else {
          setProducts([]);
          setFilteredProducts([]);
          setLoading(false);
          return;
        }
        
        setProducts(productData);
        setFilteredProducts(productData.slice(0, itemsPerPage));
        setCurrentPage(1);
        setHasMore(productData.length > itemsPerPage);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, categoryData, itemsPerPage]);

  // Handle search and filters
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearchActive(true);
      const results = searchProducts(searchQuery, { ...filters, category });
      setSearchResults(results);
    } else {
      setIsSearchActive(false);
      // Apply filters even when there's no search query
      const results = searchProducts('', { ...filters, category });
      setFilteredProducts(results.slice(0, itemsPerPage));
      setCurrentPage(1);
      setHasMore(results.length > itemsPerPage);
    }
  }, [searchQuery, filters, category, itemsPerPage, setSearchResults]);

  const loadMoreProducts = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newProducts = products.slice(startIndex, endIndex);
      
      setFilteredProducts(prev => [...prev, ...newProducts]);
      setCurrentPage(prev => prev + 1);
      setHasMore(endIndex < products.length);
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, currentPage, itemsPerPage, products]);

  const clearFilters = useCallback(() => {
    const originalProducts = category ? getProductsByCategory(category) : getAllProducts();
    setFilteredProducts(originalProducts.slice(0, itemsPerPage));
    setCurrentPage(1);
    setHasMore(originalProducts.length > itemsPerPage);
    setIsSearchActive(false);
  }, [category, itemsPerPage]);

  return {
    products,
    filteredProducts,
    loading,
    hasMore,
    isSearchActive,
    categoryData,
    setSearchResults,
    loadMoreProducts,
    clearFilters
  };
};
