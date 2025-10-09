import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter, SortAsc } from "lucide-react";

export const Recommended = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced recommended data with more product information
  const recommendedData = [
    {
      id: 1,
      image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
      name: "LunaGlow Radiance Set",
      description: "Complete Korean skincare routine",
      brand: "LunaGlow",
      category: "Skincare"
    },
    {
      id: 2,
      image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png", 
      name: "TokyoVibe Streetwear",
      description: "Modern Japanese fashion collection",
      brand: "TokyoVibe",
      category: "Fashion"
    },
    {
      id: 3,
      image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
      name: "CelestialBeauty Luxe", 
      description: "Premium Chinese cosmetics line",
      brand: "CelestialBeauty",
      category: "Beauty"
    },
    {
      id: 4,
      image: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
      name: "ZenLifestyle Essentials",
      description: "Mindful wellness products",
      brand: "ZenLifestyle",
      category: "Lifestyle"
    },
    {
      id: 5,
      image: "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
      name: "UrbanHarbor Collection",
      description: "Contemporary Asian urban style",
      brand: "UrbanHarbor",
      category: "Fashion"
    },
    {
      id: 6,
      image: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
      name: "PearlEssence Rituals",
      description: "Korean beauty traditions",
      brand: "PearlEssence",
      category: "Beauty"
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? recommendedData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendedData.length);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    // In a real app, this would trigger a re-sort of the data
    console.log("Sorting by:", newSortBy);
  };

  // Sort data based on selected option
  const sortedData = [...recommendedData].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "category":
        return a.category.localeCompare(b.category);
      case "brand":
        return a.brand.localeCompare(b.brand);
      default:
        return 0; // Keep original order for "recommended"
    }
  });

  // Calculate which 6 images to show (showing all 6 at once)
  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < 6; i++) {
      const index = (currentIndex + i) % sortedData.length;
      items.push(sortedData[index]);
    }
    return items;
  };

  return (
    <div className="recommended-section py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Recommended For You
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover products tailored to your style preferences
          </p>
          
          {/* Sorting and Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <SortAsc size={16} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="recommended">Recommended</option>
                <option value="name">Name A-Z</option>
                <option value="category">Category</option>
                <option value="brand">Brand</option>
              </select>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} className="text-gray-500" />
              Filters
            </button>
          </div>
          
          {/* Quick Filter Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["All", "Skincare", "Fashion", "Beauty", "Lifestyle"].map((category) => (
              <button
                key={category}
                onClick={() => console.log("Filter by:", category)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-teal-50 hover:border-teal-300 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="recommended-carousel-container relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="recommended-arrow recommended-arrow-left"
            aria-label="Previous recommendations"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="recommended-arrow recommended-arrow-right"
            aria-label="Next recommendations"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>

          {/* Recommended Items Grid */}
          <div className="recommended-grid">
            {getVisibleItems().map((item, index) => (
              <div key={`${item.id}-${currentIndex}-${index}`} className="recommended-item group relative">
                <div className="recommended-image-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="recommended-image"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlJlY29tbWVuZGVkPC90ZXh0Pjwvc3ZnPg==";
                    }}
                  />
                </div>
                
                <div className="recommended-caption">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">{item.brand}</span>
                    <h3 className="recommended-name">{item.name}</h3>
                    <p className="recommended-description">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
