import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Package, Download, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavigationPrimary } from '@/Components/NavigationPrimary';
import { NavigationSecondary } from '@/Components/NavigationSecondary';
import { Footer } from '@/Components/Footer';
import { Background } from '@/Components/Background';
import SEO from '@/Components/SEO';
import SearchQuery from '@/Components/SearchQuery';
import BlogPostCard from '@/Components/BlogPostCard';
import BlogPostDetails from '@/Components/BlogPostDetails';
import { BlogPostCardSkeleton } from '@/Components/LoadingStates';
import { getGlobalSearchData } from '@/lib/globalSearchData';
import { 
  getChangelogPosts,
  getModUpdatePosts,
  searchBlogPosts,
  POST_TYPES,
  POST_CATEGORIES
} from '@/lib/blogData';

const Changelogs = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Get all changelog and mod update posts
  const allChangelogPosts = getChangelogPosts();
  const allModUpdatePosts = getModUpdatePosts();
  const allPosts = [...allChangelogPosts, ...allModUpdatePosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Handle search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchBlogPosts(query);
      const filteredResults = results.filter(post => 
        post.type === POST_TYPES.CHANGELOG || post.type === POST_TYPES.MOD_UPDATE
      );
      setFilteredPosts(filteredResults);
    } else {
      setFilteredPosts([]);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setSearchQuery('');
    setFilteredPosts([]);
  };

  // Get posts to display based on search and filter
  const getPostsToDisplay = () => {
    if (searchQuery.trim()) {
      return filteredPosts;
    }
    
    if (selectedFilter === 'changelog') {
      return allChangelogPosts;
    } else if (selectedFilter === 'mod-updates') {
      return allModUpdatePosts;
    }
    
    return allPosts;
  };

  const postsToDisplay = getPostsToDisplay();

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleSearchSelect = (result) => {
    if (result.type === 'blog') {
      const post = allPosts.find(p => p.id === result.id);
      if (post) {
        handlePostClick(post);
      }
    }
  };

  const getFilterCounts = () => {
    return {
      all: allPosts.length,
      changelog: allChangelogPosts.length,
      'mod-updates': allModUpdatePosts.length
    };
  };

  const filterCounts = getFilterCounts();

  return (
    <>
      <SEO 
        pageTitle="Changelogs & Updates - MooStyle"
        pageDescription="Complete changelog and mod update history for MooStyle products"
        ogTitle="Changelogs & Updates - MooStyle"
        ogDescription="Stay updated with all mod updates, changelogs, and product releases"
        ogImage="/projects/Brand Medias/Promotional Content/Promo Poster.png"
        ogType="website"
        keywords="changelog, mod updates, MooStyle, product updates, release notes"
      />
      
      <div className="min-h-screen bg-gray-50">
        <Background showEffects={false} />
        
        {/* Navigation Bars */}
        <div id="navigation">
          <NavigationPrimary />
          <NavigationSecondary />
        </div>
        
        {/* Main Content */}
        <main id="main-content">
          {/* Changelogs Header */}
          <motion.div 
            className="bg-white border-b border-gray-200"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Link 
                  to="/blog" 
                  className="back-button-simple"
                >
                  <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
                </Link>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <motion.div 
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-600 rounded-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <Package className="text-white" size={14} className="sm:w-4 sm:h-4" />
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Changelogs & Updates</h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">Complete history of mod updates and changelogs</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Changelogs Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Search */}
            <motion.div 
              className="mb-6 sm:mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <SearchQuery
                searchData={getGlobalSearchData()}
                onSearchSelect={handleSearchSelect}
                placeholder="Search changelogs and updates..."
                showFilters={true}
                className="w-full max-w-2xl"
                searchFields={['title', 'description', 'content', 'tags', 'category', 'author']}
                resultLimit={20}
              />
            </motion.div>

            {/* Filters */}
            <motion.div 
              className="mb-6 sm:mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg whitespace-nowrap transition-colors text-sm sm:text-base ${
                    selectedFilter === 'all' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  All ({filterCounts.all})
                </button>
                <button
                  onClick={() => handleFilterChange('changelog')}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg whitespace-nowrap transition-colors text-sm sm:text-base ${
                    selectedFilter === 'changelog' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  Changelogs ({filterCounts.changelog})
                </button>
                <button
                  onClick={() => handleFilterChange('mod-updates')}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg whitespace-nowrap transition-colors text-sm sm:text-base ${
                    selectedFilter === 'mod-updates' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  Mod Updates ({filterCounts['mod-updates']})
                </button>
              </div>
            </motion.div>

            {/* Posts Grid */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.h2 
                className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                {searchQuery.trim() ? `Search Results (${postsToDisplay.length})` : 
                 selectedFilter === 'changelog' ? 'Changelog Posts' :
                 selectedFilter === 'mod-updates' ? 'Mod Update Posts' : 
                 'All Updates & Changelogs'}
              </motion.h2>
              
              {postsToDisplay.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-gray-400 mb-4">
                    <Package size={40} className="mx-auto sm:w-12 sm:h-12" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    {searchQuery.trim() ? "No results found" : "No posts available"}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    {searchQuery.trim() 
                      ? "Try adjusting your search criteria"
                      : "Check back later for new updates and changelogs"
                    }
                  </p>
                  {searchQuery.trim() && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFilteredPosts([]);
                      }}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {postsToDisplay.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                    >
                      <BlogPostCard
                        post={post}
                        onClick={handlePostClick}
                        variant="default"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Blog Post Details Modal */}
      {selectedPost && (
        <BlogPostDetails
          post={selectedPost}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Changelogs;
