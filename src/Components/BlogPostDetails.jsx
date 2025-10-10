import React from 'react';
import { ArrowLeft, Calendar, User, Tag, Clock, Eye, Heart, Share2, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPostDetails = ({ post, onClose, onShare }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = () => {
    if (onShare) {
      onShare(post);
    } else if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <motion.button
            onClick={onClose}
            className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </motion.button>
          
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-teal-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={20} />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Featured Image */}
          <motion.div 
            className="mb-8 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJsb2cgUG9zdCBJbWFnZTwvdGV4dD48L3N2Zz4=";
              }}
            />
          </motion.div>

          {/* Post Meta */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              {post.category && (
                <span className="bg-teal-100 text-teal-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              )}
              {post.featured && (
                <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{formatDate(post.date)}</span>
              </div>
              {post.readTime && (
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
              )}
            </div>

            {/* Stats */}
            {(post.views || post.likes || post.comments) && (
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                {post.views && (
                  <div className="flex items-center space-x-2">
                    <Eye size={16} />
                    <span>{post.views} views</span>
                  </div>
                )}
                {post.likes && (
                  <div className="flex items-center space-x-2">
                    <Heart size={16} />
                    <span>{post.likes} likes</span>
                  </div>
                )}
                {post.comments && (
                  <div className="flex items-center space-x-2">
                    <Share2 size={16} />
                    <span>{post.comments} comments</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.div 
            className="text-xl text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {post.excerpt}
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Tag size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-teal-100 hover:text-teal-700 transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Content */}
          <motion.div 
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="text-gray-700 leading-relaxed"
            />
          </motion.div>

          {/* Author Bio */}
          <motion.div 
            className="mt-12 p-6 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                <User size={24} className="text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{post.author}</h3>
                <p className="text-gray-600">
                  Author and creator of MOOSTYLE. Passionate about InZoi modding and community building.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Posts or Call to Action */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="bg-teal-50 rounded-lg p-6">
              <BookOpen className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enjoyed this post?</h3>
              <p className="text-gray-600 mb-4">
                Check out more blog posts and stay updated with the latest MOOSTYLE news and modding tips.
              </p>
              <motion.button
                onClick={onClose}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore More Posts
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogPostDetails;