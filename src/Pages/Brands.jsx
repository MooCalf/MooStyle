import { NavigationPrimary } from "@/Components/NavigationPrimary";
import { NavigationSecondary } from "@/Components/NavigationSecondary";
import { Footer } from "@/Components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Metadata } from "@/Components/Metadata.jsx";
import { getAllProducts } from "@/lib/shoppingData";
import { BrandCard } from "@/Components/BrandCard";
import { getAllBrands, getBrandStats } from "@/lib/brandsData";

const Brands = () => {
  // Get all brands from the new data system
  const allBrands = getAllBrands();
  const brandStats = getBrandStats();
  
  // Get all products for additional calculations
  const allProducts = getAllProducts();

  return (
    <>
      <Metadata 
        pageTitle="Brands - MooStyle"
        pageDescription="Discover amazing brands from Asia offering beauty, fashion, lifestyle, and health products."
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bars */}
        <NavigationPrimary />
        <NavigationSecondary />

        {/* Header */}
        <div className="page-header">
          <div className="content-container">
            <div className="page-header-content">
              <Link to="/" className="back-button-enhanced">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="mt-4">
              <h1 className="page-title">
                <span className="page-title-accent">Partnering</span> Brands
              </h1>
              <p className="page-description">
                Discover amazing brands from all over the globe, offering premium beauty, fashion, lifestyle, and health products.
              </p>
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-16 bg-gradient-to-br from-teal-50 to-white rounded-lg border border-teal-200 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Brand <span className="text-teal-600">Overview</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-teal-50 transition-colors">
                <div className="text-3xl font-bold text-teal-600 mb-2">{brandStats.totalBrands}</div>
                <div className="text-teal-700 font-medium">Total Brands</div>
              </div>
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-teal-50 transition-colors">
                <div className="text-3xl font-bold text-teal-500 mb-2">{allProducts.length}</div>
                <div className="text-teal-700 font-medium">Total Products</div>
              </div>
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-teal-50 transition-colors">
                <div className="text-3xl font-bold text-teal-400 mb-2">
                  {allProducts.reduce((sum, product) => sum + product.downloadCount, 0) > 100000 
                    ? `${(allProducts.reduce((sum, product) => sum + product.downloadCount, 0) / 100000).toFixed(1)}M`
                    : `${(allProducts.reduce((sum, product) => sum + product.downloadCount, 0) / 1000).toFixed(0)}K`
                  }
                </div>
                <div className="text-teal-700 font-medium">Total Downloads</div>
              </div>
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-teal-50 transition-colors">
                <div className="text-3xl font-bold text-teal-600 mb-2">
                  {Math.round((allProducts.reduce((sum, product) => sum + product.rating, 0) / allProducts.length) * 10) / 10}
                </div>
                <div className="text-teal-700 font-medium">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export { Brands };
