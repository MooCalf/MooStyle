import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const PromotionalCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Placeholder images - will be replaced with actual images from Carousel Images folder
  const carouselImages = [
    "/projects/Carousell Images/image1.jpg",
    "/projects/Carousell Images/image2.jpg", 
    "/projects/Carousell Images/image3.jpg",
    "/projects/Carousell Images/image4.jpg",
    "/projects/Carousell Images/image5.jpg"
  ];

  const totalImages = carouselImages.length;

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
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
  }, [isHovered, totalImages]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="promotional-carousel-container">
      {/* Promotional Banner */}
      <div className="promotional-banner">
        <div className="promotional-content">
          <span className="promotional-text">15% OFF US$ 59 order</span>
          <a href="#details" className="promotional-link">See Details</a>
        </div>
      </div>

      {/* Carousel Box */}
      <div 
        className="carousel-box"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left Arrow */}
        <button 
          className="carousel-arrow carousel-arrow-left"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
        </button>

        {/* Carousel Content */}
        <div className="carousel-content">
          <div className="carousel-slide-container">
            <img
              src={carouselImages[currentIndex]}
              alt={`Promotional image ${currentIndex + 1}`}
              className="carousel-image"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIFBsYWNlaG9sZGVyPC90ZXh0Pjwvc3ZnPg==";
              }}
            />
          </div>

          {/* Image Counter */}
          <div className="carousel-counter">
            {currentIndex + 1}/{totalImages}
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          className="carousel-arrow carousel-arrow-right"
          onClick={goToNext}
          aria-label="Next image"
        >
          <ChevronRight size={24} className="sm:w-8 sm:h-8" />
        </button>
      </div>
    </div>
  );
};
