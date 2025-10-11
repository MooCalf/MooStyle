// Lazy Loading Utility
// Provides lazy loading capabilities for components and resources

import { lazy, Suspense } from 'react';

/**
 * Lazy loading wrapper with loading fallback
 * @param {Function} importFunc - Function that returns a promise resolving to a component
 * @param {React.Component} fallback - Fallback component to show while loading
 * @returns {React.Component} Lazy loaded component
 */
export const createLazyComponent = (importFunc, fallback = null) => {
  const LazyComponent = lazy(importFunc);
  
  return (props) => (
    <Suspense fallback={fallback || <DefaultLoadingFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

/**
 * Default loading fallback component
 */
const DefaultLoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

/**
 * Lazy loading wrapper for images
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 * @param {Object} props - Additional props
 * @returns {React.Component} Lazy loaded image
 */
export const LazyImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const imgRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="relative">
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
};

/**
 * Lazy loading wrapper for components with intersection observer
 * @param {React.Component} Component - Component to lazy load
 * @param {React.Component} fallback - Fallback component
 * @returns {React.Component} Lazy loaded component
 */
export const LazyComponent = ({ Component, fallback = <DefaultLoadingFallback />, ...props }) => {
  const [isInView, setIsInView] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {isInView ? <Component {...props} /> : fallback}
    </div>
  );
};

/**
 * Lazy loading hook for data fetching
 * @param {Function} fetchFunction - Function that returns a promise
 * @param {Array} dependencies - Dependencies array
 * @returns {Object} Loading state and data
 */
export const useLazyData = (fetchFunction, dependencies = []) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  return { data, loading, error, fetchData };
};

/**
 * Lazy loading hook for components
 * @param {Function} importFunction - Function that returns a promise resolving to a component
 * @returns {Object} Component and loading state
 */
export const useLazyComponent = (importFunction) => {
  const [Component, setComponent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    importFunction()
      .then((module) => {
        setComponent(() => module.default || module);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [importFunction]);

  return { Component, loading, error };
};

/**
 * Lazy loading wrapper for routes
 * @param {Function} importFunc - Function that returns a promise resolving to a component
 * @param {React.Component} fallback - Fallback component
 * @returns {React.Component} Lazy loaded route component
 */
export const createLazyRoute = (importFunc, fallback = null) => {
  return createLazyComponent(importFunc, fallback);
};

/**
 * Preload component for better performance
 * @param {Function} importFunc - Function that returns a promise resolving to a component
 */
export const preloadComponent = (importFunc) => {
  importFunc().catch(() => {
    // Silently handle preload errors
  });
};

/**
 * Preload multiple components
 * @param {Array<Function>} importFuncs - Array of import functions
 */
export const preloadComponents = (importFuncs) => {
  Promise.all(importFuncs.map(importFunc => importFunc())).catch(() => {
    // Silently handle preload errors
  });
};

export default {
  createLazyComponent,
  LazyImage,
  LazyComponent,
  useLazyData,
  useLazyComponent,
  createLazyRoute,
  preloadComponent,
  preloadComponents
};
