import { useState } from "react";

export const BrandCovers = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Brand data - Original MooStyle brands
  const brandData = [
    // Row 1: 4 brands
    {
      id: 1,
      image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
      name: "LunaGlow",
      description: "Korean-inspired skincare essentials",
      discount: "30% OFF"
    },
    {
      id: 2,
      image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
      name: "TokyoVibe",
      description: "Contemporary Japanese streetwear",
      discount: "25% OFF"
    },
    {
      id: 3,
      image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
      name: "CelestialBeauty",
      description: "Chinese luxury cosmetics",
      discount: "20% OFF"
    },
    {
      id: 4,
      image: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
      name: "ZenLifestyle",
      description: "Mindful Asian wellness products",
      discount: "35% OFF"
    },
    // Row 2: 4 brands
    {
      id: 5,
      image: "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
      name: "UrbanHarbor",
      description: "Modern Asian urban fashion",
      discount: "15% OFF"
    },
    {
      id: 6,
      image: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
      name: "PearlEssence",
      description: "Premium Korean beauty rituals",
      discount: "40% OFF"
    },
    {
      id: 7,
      image: "/projects/BrandCovers/brand7.jpg",
      name: "SilkRoad",
      description: "Traditional Chinese elegance",
      discount: "22% OFF"
    },
    {
      id: 8,
      image: "/projects/BrandCovers/brand8.jpg",
      name: "HarmonyWell",
      description: "Holistic Asian wellness",
      discount: "18% OFF"
    }
  ];

  const handleCardHover = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="brand-covers-section flex justify-center items-center">
      <div className="container mx-auto px-4 py-4">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Featured Brands
          </h2>
          <p className="text-lg text-gray-700">
            Discover the best Asian brands and products
          </p>
        </div>

        <div className="brand-covers-grid">
          {/* Row 1: 4 brands */}
          <div className="brand-row brand-row-4">
            {brandData.slice(0, 4).map((brand) => (
              <BrandCard
                key={brand.id}
                brand={brand}
                isHovered={hoveredCard === brand.id}
                onHover={() => handleCardHover(brand.id)}
                onLeave={handleCardLeave}
              />
            ))}
          </div>

          {/* Row 2: 4 brands */}
          <div className="brand-row brand-row-4">
            {brandData.slice(4, 8).map((brand) => (
              <BrandCard
                key={brand.id}
                brand={brand}
                isHovered={hoveredCard === brand.id}
                onHover={() => handleCardHover(brand.id)}
                onLeave={handleCardLeave}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

const BrandCard = ({ brand, isHovered, onHover, onLeave }) => {
  return (
    <div
      className={`brand-card ${isHovered ? 'brand-card-hovered' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="brand-card-image-container">
        <img
          src={brand.image}
          alt={brand.name}
          className="brand-card-image"
          onError={(e) => {
            e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJyYW5kIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
          }}
        />
        
        {/* Discount Badge */}
        <div className="brand-discount-badge">
          {brand.discount}
        </div>

        {/* Caption Overlay */}
        <div className="brand-caption-overlay">
          <h3 className="brand-name">{brand.name}</h3>
          <p className="brand-description">{brand.description}</p>
        </div>
      </div>
    </div>
  );
};
