import React from 'react';
import { Calendar, User, Tag, Clock, Eye, Heart, Share2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPostCard = ({ 
  post, 
  onClick, 
  variant = 'default', // 'default', 'featured', 'compact'
  showStats = true,
  showTags = true,
  className = ""
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(post);
    }
  };

  const cardVariants = {
    default: {
      className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300",
      imageHeight: "h-48",
      padding: "p-6"
    },
    featured: {
      className: "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300",
      imageHeight: "h-64 md:h-full",
      padding: "p-8"
    },
    compact: {
      className: "bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300",
      imageHeight: "h-32",
      padding: "p-4"
    }
  };

  const variantStyles = cardVariants[variant] || cardVariants.default;

  return (
    <motion.article 
      className={`${variantStyles.className} ${className} cursor-pointer group`}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full ${variantStyles.imageHeight} object-cover group-hover:scale-105 transition-transform duration-300`}
          onError={(e) => {
            e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJsb2cgUG9zdDwvdGV4dD48L3N2Zz4=";
          }}
        />
        
        {/* Category Badge */}
        {post.category && (
          <div className="absolute top-3 left-3">
            <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-1 rounded-full">
              {post.category}
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Read More Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="bg-white rounded-full p-3 shadow-lg">
              <ChevronRight className="w-6 h-6 text-teal-600" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className={variantStyles.padding}>
        {/* Title */}
        <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors ${
          variant === 'featured' ? 'text-2xl' : variant === 'compact' ? 'text-lg' : 'text-xl'
        } line-clamp-2`}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className={`text-gray-600 mb-4 ${
          variant === 'compact' ? 'line-clamp-2' : 'line-clamp-3'
        }`}>
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{formatDate(post.date)}</span>
            </div>
            {post.readTime && (
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        {showStats && (post.views || post.likes || post.comments) && (
          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
            {post.views && (
              <div className="flex items-center space-x-1">
                <Eye size={14} />
                <span>{post.views}</span>
              </div>
            )}
            {post.likes && (
              <div className="flex items-center space-x-1">
                <Heart size={14} />
                <span>{post.likes}</span>
              </div>
            )}
            {post.comments && (
              <div className="flex items-center space-x-1">
                <Share2 size={14} />
                <span>{post.comments}</span>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {showTags && post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, variant === 'compact' ? 2 : 3).map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
            {post.tags.length > (variant === 'compact' ? 2 : 3) && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                +{post.tags.length - (variant === 'compact' ? 2 : 3)}
              </span>
            )}
          </div>
        )}

        {/* Read More Button */}
        <div className="flex items-center justify-between">
          <button className="flex items-center space-x-1 text-teal-600 hover:text-teal-700 font-medium text-sm group-hover:translate-x-1 transition-transform">
            <span>Read More</span>
            <ChevronRight size={14} />
          </button>
          
          {/* Share Button */}
          <button 
            className="p-2 text-gray-400 hover:text-teal-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Handle share functionality
            }}
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPostCard;
