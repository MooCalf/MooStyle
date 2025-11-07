import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FeaturedCreators = () => {
  const navigate = useNavigate();

  const creatorData = [
    {
      id: 1,
      name: "Maya Chen",
      location: "Global",
      specialty: "Ceramics",
      rating: 4.9,
      reviews: 127,
      image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
      story: "Traditional pottery techniques passed down through generations",
      products: ["Ceramic Tea Sets", "Hand-painted Bowls", "Decorative Vases"]
    },
    {
      id: 2,
      name: "Hiroshi Tanaka",
      location: "Global",
      specialty: "Textiles",
      rating: 4.8,
      reviews: 89,
      image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
      story: "Master of traditional weaving and dyeing techniques",
      products: ["Silk Garments", "Indigo Dyed Fabrics", "Traditional Accessories"]
    },
    {
      id: 3,
      name: "Li Wei",
      location: "Global",
      specialty: "Calligraphy",
      rating: 4.9,
      reviews: 156,
      image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
      story: "Contemporary artist blending traditional calligraphy with modern design",
      products: ["Calligraphy Sets", "Hand-painted Scrolls", "Custom Artwork"]
    },
    {
      id: 4,
      name: "Priya Sharma",
      location: "Global",
      specialty: "Jewelry",
      rating: 4.7,
      reviews: 203,
      image: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
      story: "Handcrafted jewelry using traditional techniques and modern aesthetics",
      products: ["Gold Earrings", "Gemstone Necklaces", "Traditional Bangles"]
    },
    {
      id: 5,
      name: "Sakura Yamamoto",
      location: "Global",
      specialty: "Beauty",
      rating: 4.8,
      reviews: 94,
      image: "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
      story: "Natural skincare products inspired by traditional beauty rituals",
      products: ["Rice Powder", "Green Tea Serums", "Traditional Face Masks"]
    },
    {
      id: 6,
      name: "Kim Min-jun",
      location: "Global",
      specialty: "Fashion",
      rating: 4.9,
      reviews: 178,
      image: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
      story: "Contemporary fashion designer blending heritage with modern trends",
      products: ["Streetwear", "Traditional Garments", "Accessories"]
    }
  ];

  return (
    <div className="featured-creators-section py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Meet Our <span className="text-teal-600">Featured Creators</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover talented creators and their exceptional work through our network of featured creators. 
            Each piece tells a story of tradition, culture, and exceptional skill.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creatorData.map((creator) => (
            <div key={creator.id} className="bg-white rounded-lg shadow-lg overflow-hidden card-teal-hover">
              <div className="relative">
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNyZWF0b3I8L3RleHQ+PC9zdmc+";
                  }}
                />
              </div>
              
              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{creator.name}</h3>
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="ml-1 text-xs font-medium text-gray-700">{creator.rating}</span>
                    <span className="ml-1 text-xs text-gray-500">({creator.reviews})</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={14} className="mr-1" />
                  <span className="text-xs">{creator.location}</span>
                </div>
                
                <div className="mb-2">
                  <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-medium">
                    {creator.specialty}
                  </span>
                </div>
                
                <p className="text-gray-700 text-xs mb-2 line-clamp-2">
                  {creator.story}
                </p>
                
                {/* Location & Rating */}
                <div className="mb-1">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin size={12} />
                    <span>{creator.location}</span>
                    <span className="mx-1">•</span>
                    <Star size={12} className="text-yellow-400 fill-current" />
                    <span>{creator.rating} ({creator.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button 
            onClick={() => navigate("/creators")}
            className="view-more-brands-button"
          >
            DISCOVER MORE CREATORS
          </button>
        </div>
      </div>
    </div>
  );
};

