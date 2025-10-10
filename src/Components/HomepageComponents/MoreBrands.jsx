import { useState } from "react";

import { useNavigate } from "react-router-dom";

export const MoreBrands = () => {
  const navigate = useNavigate();
  // More Brands data - First 3 are specific brand buttons, rest are generic
  const brandData = [
    {
      id: 1,
      image: "/projects/BrandCovers/More Brands/BrandButtons - LUNAGLOW.png",
      name: "LunaGlow",
      brandPage: "/brand/lunaglow"
    },
    {
      id: 2,
      image: "/projects/BrandCovers/More Brands/BrandButtons - PEARLESENCE.png", 
      name: "PearlEssence",
      brandPage: "/brand/pearlessence"
    },
    {
      id: 3,
      image: "/projects/BrandCovers/More Brands/BrandButtons - TOKYOVIBE.png",
      name: "TokyoVibe",
      brandPage: "/brand/tokyovibe"
    },
    {
      id: 4,
      image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
      name: "Moonbeam"
    },
    {
      id: 5,
      image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
      name: "SakuraStyle"
    },
    {
      id: 6,
      image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
      name: "DragonPearl"
    },
    {
      id: 7,
      image: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
      name: "BambooZen"
    },
    {
      id: 8,
      image: "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png", 
      name: "NeonHarbor"
    },
    {
      id: 9,
      image: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
      name: "CrystalGlow"
    },
    {
      id: 10,
      image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
      name: "Starlight"
    },
    {
      id: 11,
      image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
      name: "CherryBlossom"
    },
    {
      id: 12,
      image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
      name: "GoldenPhoenix"
    },
    {
      id: 13,
      image: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
      name: "LotusBloom"
    },
    {
      id: 14,
      image: "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png", 
      name: "CyberWave"
    },
    {
      id: 15,
      image: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
      name: "MysticGlow"
    },
    {
      id: 16,
      image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
      name: "CosmicBeauty"
    },
    {
      id: 17,
      image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
      name: "SpringBreeze"
    },
    {
      id: 18,
      image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
      name: "RoyalJade"
    },
    {
      id: 19,
      image: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
      name: "Serenity"
    },
    {
      id: 20,
      image: "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png", 
      name: "UrbanZen"
    },
    {
      id: 21,
      image: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
      name: "PrismLight"
    },
    {
      id: 22,
      image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
      name: "Ethereal"
    },
    {
      id: 23,
      image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
      name: "BlossomDream"
    },
    {
      id: 24,
      image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
      name: "ImperialGold"
    }
  ];

  const handleViewMoreBrands = () => {
    navigate("/brands");
  };

  return (
    <div className="more-brands-section py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            More Brands
          </h2>
          <p className="text-lg text-gray-700">
            Discover even more amazing brands
          </p>
        </div>

        {/* Brand Buttons Grid - 6 columns, 4 rows */}
        <div className="more-brands-grid">
          {brandData.slice(0, 24).map((brand, index) => (
            <button
              key={brand.id}
              className="more-brands-button"
              aria-label={`View ${brand.name}`}
              onClick={() => brand.brandPage ? navigate(brand.brandPage) : null}
            >
              <div className="more-brands-image-container">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="more-brands-image"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJyYW5kPC90ZXh0Pjwvc3ZnPg==";
                  }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* View More Brands Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleViewMoreBrands}
            className="view-more-brands-button"
          >
            VIEW MORE BRANDS
          </button>
        </div>
      </div>
    </div>
  );
};
