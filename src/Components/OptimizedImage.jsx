import React from 'react';
import { imageOptimization } from '@/lib/imageOptimization';

// Image component with WebP optimization
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  quality = 80,
  lazy = true,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = React.useState('');
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const imgRef = React.useRef(null);

  React.useEffect(() => {
    if (lazy && imgRef.current) {
      imageOptimization.lazyLoadImage(imgRef.current, src, { width, height, quality });
    } else {
      setImageSrc(imageOptimization.getOptimizedImageUrl(src, { width, height, quality }));
    }
  }, [src, width, height, quality, lazy]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setImageSrc(src); // Fallback to original
  };

  return (
    <img
      ref={imgRef}
      src={lazy ? '' : imageSrc}
      alt={alt}
      className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      onLoad={handleLoad}
      onError={handleError}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default OptimizedImage;
