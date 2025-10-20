import React, { useState } from 'react';
import { ArrowLeft, Filter, Tag, Calendar, User, Package, Download, AlertCircle, CheckCircle, Plus } from 'lucide-react';
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
  getBlogPosts, 
  getFeaturedPosts, 
  getLatestPosts, 
  getModUpdatePosts, 
  getChangelogPosts,
  searchBlogPosts,
  POST_TYPES,
  POST_CATEGORIES
} from '@/lib/blogData';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Get blog data from the new system
  const allBlogPosts = getBlogPosts();
  const featuredPosts = getFeaturedPosts();
  const latestPosts = getLatestPosts();
  const modUpdatePosts = getModUpdatePosts();
  const changelogPosts = getChangelogPosts();

  // Handle search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchBlogPosts(query);
      setFilteredPosts(results);
    } else {
      setFilteredPosts([]);
    }
  };

  // Get posts to display based on search
  const displayPosts = searchQuery.trim() ? filteredPosts : allBlogPosts.filter(post => !post.featured);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handlePostClose = () => {
    setSelectedPost(null);
  };

  const handleSearchSelect = (result) => {
    // Handle search result selection with proper navigation
    if (result.url) {
      // Use the URL from the search result
      window.location.href = result.url;
    } else if (result.path) {
      window.location.href = result.path;
    } else if (result.type === 'blog') {
      // For blog posts, try to find the specific post
      const post = allBlogPosts.find(p => p.id === result.id);
      if (post) {
        setSelectedPost(post);
      } else {
        window.location.href = '/blog';
      }
    } else if (result.type === 'product') {
      window.location.href = `/product/${result.id}`;
    } else if (result.type === 'brand') {
      window.location.href = `/brand/${result.id}`;
    } else if (result.type === 'category') {
      window.location.href = `/shopping/${result.subcategory || result.category}`;
    } else if (result.type === 'page') {
      window.location.href = result.url || '/';
    } else {
      // Fallback to home page
      window.location.href = '/';
    }
  };

  // Get featured post (first featured post)
  const featuredPost = featuredPosts[0];

  return (
    <>
      <SEO
        title="Blog - MOOSTYLE | Latest News, Modding Tips & Community Insights"
        description="Stay updated with the latest MOOSTYLE news, modding tips, and community insights. Discover InZoi modding guides, community spotlights, and technical tutorials."
        keywords="MOOSTYLE blog, InZoi modding, modding tips, community news, modding tutorials, InZoi guides, modding community"
        url="/blog"
        type="website"
      />
      
      <div className="min-h-screen text-gray-900 overflow-x-hidden relative">
        <Background showEffects={false} />
        
        {/* Navigation Bars */}
        <div id="navigation">
          <NavigationPrimary />
          <NavigationSecondary />
        </div>
        
        {/* Main Content */}
        <main id="main-content">
          {/* Blog Header */}
          <motion.div 
            className="bg-white border-b border-gray-200"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Link 
                  to="/home" 
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
                    <span className="text-white font-bold text-xs sm:text-sm">B</span>
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Blog</h1>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">Updates, announcements, and insights</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Blog Content */}
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
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
                placeholder="Search products, brands, blog posts..."
                showFilters={true}
                className="w-full max-w-2xl"
                searchFields={['title', 'description', 'content', 'tags', 'category', 'subcategory', 'author', 'brand']}
                resultLimit={20}
              />
            </motion.div>

            {/* Featured Post */}
            {featuredPost && (
              <motion.div 
                className="mb-8 sm:mb-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.h2 
                  className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  Featured Post
                </motion.h2>
                <BlogPostCard
                  post={featuredPost}
                  onClick={handlePostClick}
                  variant="featured"
                  className="md:flex"
                />
              </motion.div>
            )}

            {/* Mod Changelog Section */}
            <motion.div 
              className="mb-8 sm:mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div 
                className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <Package className="text-white" size={14} className="sm:w-4 sm:h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Mod Updates & Changelog</h2>
              </motion.div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                  <p className="text-gray-700 text-xs sm:text-sm">
                    Stay updated with the latest mod improvements, bug fixes, and new features from our creators.
                  </p>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {modUpdatePosts.map((post, index) => (
                    <motion.div 
                      key={post.id}
                      className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                    >
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">{post.title}</h3>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 self-start">
                              {post.category}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                              {new Date(post.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="flex items-center gap-1">
                              <User size={12} className="sm:w-3.5 sm:h-3.5" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Download size={12} className="sm:w-3.5 sm:h-3.5" />
                              {post.views.toLocaleString()} views
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-gray-700 text-xs sm:text-sm mb-3">
                        {post.excerpt}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handlePostClick(post)}
                          className="text-teal-600 hover:text-teal-700 text-xs sm:text-sm font-medium"
                        >
                          Read More →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Showing {modUpdatePosts.length} recent updates
                    </p>
                    <button className="text-xs sm:text-sm text-teal-600 hover:text-teal-700 font-medium">
                      View All Updates →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Regular Posts */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.h2 
                className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                {searchQuery.trim() ? `Search Results (${filteredPosts.length})` : 'Latest Posts'}
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {loading ? (
                  // Show loading skeletons
                  [...Array(6)].map((_, index) => (
                    <BlogPostCardSkeleton key={index} />
                  ))
                ) : (
                  displayPosts.map((post, index) => (
                    <BlogPostCard
                      key={post.id}
                      post={post}
                      onClick={handlePostClick}
                      variant="default"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    />
                  ))
                )}
              </div>
            </motion.div>
          </div>

          <Footer />
        </main>
      </div>

      {/* Blog Post Details Modal */}
      {selectedPost && (
        <BlogPostDetails
          post={selectedPost}
          onClose={handlePostClose}
        />
      )}
    </>
  );
};

export default Blog;