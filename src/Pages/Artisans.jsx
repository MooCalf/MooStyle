import { NavigationPrimary } from "@/Components/NavigationPrimary";
import { NavigationSecondary } from "@/Components/NavigationSecondary";
import { Footer } from "@/Components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Metadata } from "@/Components/Metadata.jsx";
import { ArtisanCard } from "@/Components/ArtisanCard";
import { getAllArtisans, getArtisanStats } from "@/lib/artisansData";

const Artisans = () => {
  // Get all artisans from the new data system
  const allArtisans = getAllArtisans();
  const artisanStats = getArtisanStats();

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allArtisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-16 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Artisan <span className="text-purple-600">Overview</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-purple-50 transition-colors">
                <div className="text-3xl font-bold text-purple-600 mb-2">{artisanStats.totalArtisans}</div>
                <div className="text-purple-700 font-medium">Total Artisans</div>
              </div>
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-purple-50 transition-colors">
                <div className="text-3xl font-bold text-purple-500 mb-2">{artisanStats.categories}</div>
                <div className="text-purple-700 font-medium">Categories</div>
              </div>
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-purple-50 transition-colors">
                <div className="text-3xl font-bold text-purple-400 mb-2">{artisanStats.regions}</div>
                <div className="text-purple-700 font-medium">Regions</div>
              </div>
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-purple-50 transition-colors">
                <div className="text-3xl font-bold text-purple-600 mb-2">{artisanStats.averageRating}</div>
                <div className="text-purple-700 font-medium">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export { Artisans };
