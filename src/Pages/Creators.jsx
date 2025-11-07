import { NavigationPrimary } from "@/Components/NavigationPrimary";
import { NavigationSecondary } from "@/Components/NavigationSecondary";
import { Footer } from "@/Components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Metadata } from "@/Components/Metadata.jsx";
import { CreatorCard } from "@/Components/CreatorCard";
import { getAllCreators, getCreatorStats } from "@/lib/creatorsData";

const Creators = () => {
  // Get all creators from the data system
  const allCreators = getAllCreators();
  const creatorStats = getCreatorStats();

  return (
    <>
      <Metadata 
        pageTitle="Featured Creators - MooStyle"
        pageDescription="Discover talented creators and their exceptional work through our network of featured creators."
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bars */}
        <NavigationPrimary />
        <NavigationSecondary />

        {/* Header */}
        <div className="page-header">
          <div className="content-container">
            <div className="page-header-content">
              <Link to="/home" className="back-button">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="mt-4">
              <h1 className="page-title">
                Meet Our <span className="page-title-accent">Featured Creators</span>
              </h1>
              <p className="page-description">
                Discover talented creators and their exceptional work through our network of featured creators. 
                Each piece tells a story of tradition, culture, and exceptional skill.
              </p>
            </div>
          </div>
        </div>

        {/* Creators Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-16 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Creator <span className="text-purple-600">Overview</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-purple-50 transition-colors">
                <div className="text-3xl font-bold text-purple-600 mb-2">{creatorStats.totalCreators}</div>
                <div className="text-purple-700 font-medium">Total Creators</div>
              </div>
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-purple-50 transition-colors">
                <div className="text-3xl font-bold text-purple-500 mb-2">{creatorStats.categories}</div>
                <div className="text-purple-700 font-medium">Categories</div>
              </div>
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-purple-50 transition-colors">
                <div className="text-3xl font-bold text-purple-400 mb-2">{creatorStats.featuredCreators}</div>
                <div className="text-purple-700 font-medium">Featured</div>
              </div>
              <div className="text-center bg-white/60 rounded-lg p-4 hover:bg-purple-50 transition-colors">
                <div className="text-3xl font-bold text-purple-600 mb-2">{creatorStats.averageRating}</div>
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

export { Creators };

