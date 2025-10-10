import { useState, useEffect } from "react";

export const Regions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Region data - using actual images from Regions folder
  const regionData = [
    {
      id: 1,
      image: "/projects/Regions/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
      name: "Tokyo, Japan",
      description: "Modern metropolis with traditional charm"
    },
    {
      id: 2,
      image: "/projects/Regions/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png", 
      name: "Seoul, South Korea",
      description: "Dynamic city of innovation and culture"
    },
    {
      id: 3,
      image: "/projects/Regions/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
      name: "Shanghai, China", 
      description: "Futuristic skyline meets historic heritage"
    },
    {
      id: 4,
      image: "/projects/Regions/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
      name: "Bangkok, Thailand",
      description: "Vibrant city of temples and street food"
    },
    {
      id: 5,
      image: "/projects/Regions/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
      name: "Singapore",
      description: "Garden city with multicultural diversity"
    },
    {
      id: 6,
      image: "/projects/Regions/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
      name: "Hong Kong",
      description: "Iconic skyline and vibrant street life"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % regionData.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, regionData.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? regionData.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false); // Stop auto-play when manually navigating
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % regionData.length);
    setIsAutoPlaying(false); // Stop auto-play when manually navigating
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Calculate indices for the five visible images
  const getImageIndex = (position) => {
    const totalImages = regionData.length;
    if (position === 'far-left') {
      return currentIndex <= 1 ? totalImages - 2 + currentIndex : currentIndex - 2;
    } else if (position === 'left') {
      return currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
    } else if (position === 'right') {
      return currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
    } else if (position === 'far-right') {
      return currentIndex >= totalImages - 2 ? currentIndex - totalImages + 2 : currentIndex + 2;
    } else {
      return currentIndex; // middle
    }
  };

  return (
    <div className="regions-section py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Explore Regions
          </h2>
          <p className="text-lg text-gray-700">
            Discover amazing destinations across Asia
          </p>
        </div>

        <div 
          className="regions-carousel-container relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Far Left Image */}
          <div className="region-card region-card-far-left">
            <img
              src={regionData[getImageIndex('far-left')].image}
              alt={regionData[getImageIndex('far-left')].name}
              className="region-image"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZhciBMZWZ0PC90ZXh0Pjwvc3ZnPg==";
              }}
            />
            <div className="region-overlay">
              <h3 className="region-name">{regionData[getImageIndex('far-left')].name}</h3>
              <p className="region-description">{regionData[getImageIndex('far-left')].description}</p>
            </div>
          </div>

          {/* Left Image */}
          <div className="region-card region-card-left">
            <img
              src={regionData[getImageIndex('left')].image}
              alt={regionData[getImageIndex('left')].name}
              className="region-image"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxlZnQgUmVnaW9uPC90ZXh0Pjwvc3ZnPg==";
              }}
            />
            <div className="region-overlay">
              <h3 className="region-name">{regionData[getImageIndex('left')].name}</h3>
              <p className="region-description">{regionData[getImageIndex('left')].description}</p>
            </div>
          </div>

          {/* Middle Image (Main Focus) */}
          <div className="region-card region-card-middle">
            <img
              src={regionData[getImageIndex('middle')].image}
              alt={regionData[getImageIndex('middle')].name}
              className="region-image"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1pZGRsZSBSZWdpb248L3RleHQ+PC9zdmc+";
              }}
            />
            <div className="region-overlay">
              <h3 className="region-name">{regionData[getImageIndex('middle')].name}</h3>
              <p className="region-description">{regionData[getImageIndex('middle')].description}</p>
            </div>
          </div>

          {/* Right Image */}
          <div className="region-card region-card-right">
            <img
              src={regionData[getImageIndex('right')].image}
              alt={regionData[getImageIndex('right')].name}
              className="region-image"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlJpZ2h0IFJlZ2lvbjwvdGV4dD48L3N2Zz4=";
              }}
            />
            <div className="region-overlay">
              <h3 className="region-name">{regionData[getImageIndex('right')].name}</h3>
              <p className="region-description">{regionData[getImageIndex('right')].description}</p>
            </div>
          </div>

          {/* Far Right Image */}
          <div className="region-card region-card-far-right">
            <img
              src={regionData[getImageIndex('far-right')].image}
              alt={regionData[getImageIndex('far-right')].name}
              className="region-image"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZhciBSaWdodDwvdGV4dD48L3N2Zz4=";
              }}
            />
            <div className="region-overlay">
              <h3 className="region-name">{regionData[getImageIndex('far-right')].name}</h3>
              <p className="region-description">{regionData[getImageIndex('far-right')].description}</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="region-arrow region-arrow-left"
            aria-label="Previous region"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="region-arrow region-arrow-right"
            aria-label="Next region"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>

        </div>

        {/* Dots Indicator */}
        <div className="region-dots">
          {regionData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`region-dot ${index === currentIndex ? 'active' : ''}`}
              aria-label={`Go to region ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
