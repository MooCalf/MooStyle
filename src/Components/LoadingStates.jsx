import React from 'react';
import { motion } from 'framer-motion';

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <svg
        className="w-full h-full text-teal-600"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </motion.div>
  );
};

// Loading Skeleton Component
export const LoadingSkeleton = ({ 
  variant = 'text', 
  width = '100%', 
  height = '1rem',
  className = '' 
}) => {
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  return (
    <motion.div
      className={`bg-gray-200 ${variants[variant]} ${className}`}
      style={{ width, height }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
};

// Blog Post Card Loading Skeleton
export const BlogPostCardSkeleton = () => (
  <div className="blog-post-card-default animate-pulse">
    {/* Image Skeleton */}
    <div className="relative overflow-hidden">
      <LoadingSkeleton 
        variant="rectangular" 
        height="12rem" 
        className="w-full"
      />
    </div>
    
    {/* Content Skeleton */}
    <div className="blog-post-content-default">
      {/* Title Skeleton */}
      <LoadingSkeleton height="1.5rem" className="mb-3" />
      <LoadingSkeleton height="1rem" width="80%" className="mb-4" />
      
      {/* Meta Skeleton */}
      <div className="flex items-center space-x-3 mb-4">
        <LoadingSkeleton height="0.875rem" width="4rem" />
        <LoadingSkeleton height="0.875rem" width="3rem" />
        <LoadingSkeleton height="0.875rem" width="3rem" />
      </div>
      
      {/* Tags Skeleton */}
      <div className="flex space-x-2 mb-4">
        <LoadingSkeleton height="1.5rem" width="3rem" className="rounded-full" />
        <LoadingSkeleton height="1.5rem" width="4rem" className="rounded-full" />
        <LoadingSkeleton height="1.5rem" width="3.5rem" className="rounded-full" />
      </div>
      
      {/* Button Skeleton */}
      <div className="flex justify-between items-center">
        <LoadingSkeleton height="1.5rem" width="5rem" />
        <LoadingSkeleton height="2rem" width="2rem" className="rounded-full" />
      </div>
    </div>
  </div>
);

// Page Loading Component
export const PageLoading = ({ message = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <LoadingSpinner size="xl" className="mx-auto mb-4" />
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  </div>
);

// Button Loading State
export const LoadingButton = ({ 
  children, 
  loading = false, 
  loadingText = "Loading...",
  className = "",
  ...props 
}) => (
  <button
    className={`relative ${className}`}
    disabled={loading}
    {...props}
  >
    {loading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <LoadingSpinner size="sm" />
      </div>
    )}
    <span className={loading ? 'opacity-0' : 'opacity-100'}>
      {loading ? loadingText : children}
    </span>
  </button>
);

// Image Loading Component
export const LoadingImage = ({ 
  src, 
  alt, 
  className = "",
  fallback = "/projects/Brand Medias/Promotional Content/Promo Poster.png",
  ...props 
}) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <LoadingSpinner size="md" />
        </div>
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
};

// Search Loading Component
export const SearchLoading = () => (
  <div className="p-4">
    <div className="space-y-3">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-center space-x-3">
          <LoadingSkeleton height="3rem" width="3rem" className="rounded-lg" />
          <div className="flex-1">
            <LoadingSkeleton height="1rem" width="70%" className="mb-2" />
            <LoadingSkeleton height="0.875rem" width="50%" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default {
  LoadingSpinner,
  LoadingSkeleton,
  BlogPostCardSkeleton,
  PageLoading,
  LoadingButton,
  LoadingImage,
  SearchLoading
};
