import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const PromotionalCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Carousel content including images and videos
  const carouselContent = [
    {
      type: 'image',
      src: "/projects/Brand Medias/Promotional Content/Betatesting.png",
      alt: "MooStyle Beta Testing - Website Under Development"
    },
    {
      type: 'image',
      src: "/projects/Brand Medias/Promotional Content/Banner - Moostyles.webp",
      alt: "MooStyle Banner"
    },
    {
      type: 'image',
      src: "/projects/Brand Medias/Promotional Content/Promo Banner - Patreon.png",
      alt: "Promo Banner - Patreon"
    },
    {
      type: 'image',
      src: "/projects/Brand Medias/Arnoo/Branding/Arnoo - Branding Advertising.webp",
      alt: "Arnoo - Branding Advertising"
    }
  ];

  const totalContent = carouselContent.length;

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalContent);
    }, 5000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startInterval();
    } else {
      stopInterval();
    }

    return () => stopInterval();
  }, [isHovered, totalContent]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalContent) % totalContent);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalContent);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="promotional-carousel-container">
      {/* Carousel Box */}
      <div 
        className="carousel-box"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Promotional Banner Overlay */}
        <div className="promotional-banner-overlay">
          <div className="promotional-content">
            <span className="promotional-text">Feature your brand with us!</span>
          </div>
        </div>
        {/* Left Arrow */}
        <motion.button 
          className="carousel-arrow carousel-arrow-left"
          onClick={goToPrevious}
          aria-label="Previous image"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
        </motion.button>

        {/* Carousel Content */}
        <div className="carousel-content">
          <div className="carousel-slide-container">
            <AnimatePresence mode="wait">
              {carouselContent[currentIndex].type === 'video' ? (
                <motion.video
                  key={currentIndex}
                  src={carouselContent[currentIndex].src}
                  alt={carouselContent[currentIndex].alt}
                  className="carousel-image"
                  autoPlay
                  muted
                  loop
                  playsInline
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlZpZGVvIFBsYWNlaG9sZGVyPC90ZXh0Pjwvc3ZnPg==";
                  }}
                />
              ) : (
                <motion.img
                  key={currentIndex}
                  src={carouselContent[currentIndex].src}
                  alt={carouselContent[currentIndex].alt}
                  className="carousel-image"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIFBsYWNlaG9sZGVyPC90ZXh0Pjwvc3ZnPg==";
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Content Counter */}
          <div className="carousel-counter">
            {currentIndex + 1}/{totalContent}
          </div>
        </div>

        {/* Right Arrow */}
        <motion.button 
          className="carousel-arrow carousel-arrow-right"
          onClick={goToNext}
          aria-label="Next image"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <ChevronRight size={24} className="sm:w-8 sm:h-8" />
        </motion.button>
      </div>
    </div>
  );
};
