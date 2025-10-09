import { useState } from "react";

export const RecommendedCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Recommended Categories data - using actual images from BrandCovers folder for testing
  const categoryData = [
    {
      id: 1,
      image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
      name: "Beauty"
    },
    {
      id: 2,
      image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png", 
      name: "Fashion"
    },
    {
      id: 3,
      image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
      name: "Lifestyle"
    },
    {
      id: 4,
      image: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
      name: "Wellness"
    },
    {
      id: 5,
      image: "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
      name: "Technology"
    },
    {
      id: 6,
      image: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
      name: "Accessories"
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? categoryData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categoryData.length);
  };

  // Calculate which 6 images to show (showing all 6 at once)
  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < 6; i++) {
      const index = (currentIndex + i) % categoryData.length;
      items.push(categoryData[index]);
    }
    return items;
  };

  return (
    <div className="recommended-categories-section py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Recommended Categories
          </h2>
          <p className="text-lg text-gray-700">
            Explore our top categories
          </p>
        </div>

        <div className="recommended-categories-carousel-container relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="recommended-categories-arrow recommended-categories-arrow-left"
            aria-label="Previous categories"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="recommended-categories-arrow recommended-categories-arrow-right"
            aria-label="Next categories"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>

          {/* Category Items Grid */}
          <div className="recommended-categories-grid">
            {getVisibleItems().map((item, index) => (
              <div key={`${item.id}-${currentIndex}-${index}`} className="recommended-categories-item">
                <div className="recommended-categories-image-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="recommended-categories-image"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNhdGVnb3J5PC90ZXh0Pjwvc3ZnPg==";
                    }}
                  />
                </div>
                <div className="recommended-categories-caption">
                  <h3 className="recommended-categories-name">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
