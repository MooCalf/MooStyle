import { NavigationPrimary } from "@/Components/NavigationPrimary";
import { NavigationSecondary } from "@/Components/NavigationSecondary";
import { Footer } from "@/Components/Footer";
import { ArrowLeft, Star, MapPin, Heart, Package, Users, Award, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Metadata } from "@/Components/Metadata.jsx";

const Artisans = () => {
  // Local Artisans data - expanded with more details
  const artisanData = [
    {
      id: 1,
      name: "Maya Chen",
      location: "Seoul, South Korea",
      specialty: "Korean Ceramics",
      rating: 4.9,
      reviews: 127,
      image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
      story: "Traditional Korean pottery techniques passed down through generations",
      products: ["Ceramic Tea Sets", "Hand-painted Bowls", "Traditional Vases"],
      totalProducts: 45,
      totalDownloads: 2340,
      category: "Ceramics",
      description: "Master ceramicist specializing in traditional Korean pottery with contemporary designs"
    },
    {
      id: 2,
      name: "Hiroshi Tanaka",
      location: "Kyoto, Japan",
      specialty: "Japanese Textiles",
      rating: 4.8,
      reviews: 89,
      image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
      story: "Master of traditional Japanese weaving and dyeing techniques",
      products: ["Silk Kimonos", "Indigo Dyed Fabrics", "Traditional Obi Belts"],
      totalProducts: 32,
      totalDownloads: 1890,
      category: "Textiles",
      description: "Traditional Japanese textile artist preserving ancient weaving techniques"
    },
    {
      id: 3,
      name: "Li Wei",
      location: "Beijing, China",
      specialty: "Chinese Calligraphy",
      rating: 4.9,
      reviews: 156,
      image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
      story: "Contemporary artist blending traditional calligraphy with modern design",
      products: ["Calligraphy Sets", "Hand-painted Scrolls", "Custom Artwork"],
      totalProducts: 28,
      totalDownloads: 3120,
      category: "Art",
      description: "Contemporary calligraphy artist bridging traditional Chinese art with modern aesthetics"
    },
    {
      id: 4,
      name: "Priya Sharma",
      location: "Mumbai, India",
      specialty: "Indian Jewelry",
      rating: 4.7,
      reviews: 203,
      image: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
      story: "Handcrafted jewelry using traditional Indian techniques and modern aesthetics",
      products: ["Gold Earrings", "Gemstone Necklaces", "Traditional Bangles"],
      totalProducts: 67,
      totalDownloads: 4560,
      category: "Jewelry",
      description: "Master jeweler creating exquisite pieces using traditional Indian craftsmanship"
    },
    {
      id: 5,
      name: "Sakura Yamamoto",
      location: "Tokyo, Japan",
      specialty: "Japanese Beauty",
      rating: 4.8,
      reviews: 94,
      image: "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
      story: "Natural skincare products inspired by Japanese beauty rituals",
      products: ["Rice Powder", "Green Tea Serums", "Traditional Face Masks"],
      totalProducts: 23,
      totalDownloads: 1780,
      category: "Beauty",
      description: "Natural beauty expert specializing in traditional Japanese skincare formulations"
    },
    {
      id: 6,
      name: "Kim Min-jun",
      location: "Busan, South Korea",
      specialty: "Korean Fashion",
      rating: 4.9,
      reviews: 178,
      image: "/projects/BrandCovers/{EF70721B-F1FF-4841-8E03-55F36D37F440}.png",
      story: "Contemporary fashion designer blending Korean heritage with modern trends",
      products: ["Streetwear", "Traditional Hanbok", "Accessories"],
      totalProducts: 89,
      totalDownloads: 5670,
      category: "Fashion",
      description: "Innovative fashion designer merging traditional Korean elements with contemporary style"
    },
    {
      id: 7,
      name: "Yuki Nakamura",
      location: "Osaka, Japan",
      specialty: "Japanese Woodworking",
      rating: 4.8,
      reviews: 112,
      image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
      story: "Traditional Japanese woodworking techniques for modern furniture",
      products: ["Wooden Tables", "Traditional Cabinets", "Hand-carved Bowls"],
      totalProducts: 34,
      totalDownloads: 1890,
      category: "Woodworking",
      description: "Master woodworker creating functional art using traditional Japanese techniques"
    },
    {
      id: 8,
      name: "Chen Xiaoli",
      location: "Shanghai, China",
      specialty: "Chinese Embroidery",
      rating: 4.9,
      reviews: 145,
      image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
      story: "Intricate Chinese embroidery preserving ancient needlework traditions",
      products: ["Embroidered Scarves", "Traditional Dresses", "Decorative Panels"],
      totalProducts: 41,
      totalDownloads: 2340,
      category: "Textiles",
      description: "Embroidery master creating stunning pieces using traditional Chinese needlework"
    },
    {
      id: 9,
      name: "Raj Patel",
      location: "Delhi, India",
      specialty: "Indian Spices",
      rating: 4.7,
      reviews: 167,
      image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
      story: "Authentic Indian spice blends and traditional cooking ingredients",
      products: ["Spice Blends", "Traditional Masalas", "Cooking Kits"],
      totalProducts: 56,
      totalDownloads: 3450,
      category: "Food",
      description: "Spice master creating authentic Indian blends using traditional family recipes"
    }
  ];

  // Sort artisans by total downloads (most popular first)
  artisanData.sort((a, b) => b.totalDownloads - a.totalDownloads);

  return (
    <>
      <Metadata 
        pageTitle="Local Artisans - MooStyle"
        pageDescription="Discover authentic Asian craftsmanship through our network of talented local artisans."
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bars */}
        <NavigationPrimary />
        <NavigationSecondary />

        {/* Header */}
        <div className="page-header">
          <div className="content-container">
            <div className="page-header-content">
              <Link to="/" className="back-button">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="mt-4">
              <h1 className="page-title">
                Meet Our <span className="page-title-accent">Local Artisans</span>
              </h1>
              <p className="page-description">
                Discover authentic Asian craftsmanship through our network of talented local artisans. 
                Each piece tells a story of tradition, culture, and exceptional skill.
              </p>
            </div>
          </div>
        </div>

        {/* Artisans Grid */}
        <div className="content-container section-spacing">
          <div className="grid-responsive">
            {artisanData.map((artisan) => (
              <Link 
                key={artisan.id} 
                to={`/artisan/${encodeURIComponent(artisan.name)}`}
                className="brand-card"
              >
                {/* Artisan Header with Background Image */}
                <div className="relative p-6 border-b border-gray-100 overflow-hidden">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${artisan.image})`,
                      opacity: 0.5
                    }}
                  ></div>
                  
                  {/* White Gradient Fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
                        <img
                          src={artisan.image}
                          alt={artisan.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BcnRpc2FuPC90ZXh0Pjwvc3ZnPg==";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{artisan.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin size={14} />
                          <span>{artisan.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star size={14} className="text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{artisan.rating}</span>
                          <span className="text-sm text-gray-500">({artisan.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Artisan Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <span className="category-badge">{artisan.specialty}</span>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {artisan.description}
                  </p>
                  
                  {/* Artisan Story */}
                  <div className="mb-3">
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {artisan.story}
                    </p>
                  </div>
                  
                  {/* Location & Rating */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={14} />
                      <span>{artisan.location}</span>
                      <span className="mx-2">•</span>
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span>{artisan.rating} ({artisan.reviews})</span>
                    </div>
                  </div>
                  
                  
                  <button className="btn-primary w-full">
                    <Package size={16} />
                    View Products
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export { Artisans };
