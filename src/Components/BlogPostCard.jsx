import React from 'react';
import { Calendar, User, Tag, Clock, Eye, Heart, Share2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/blog.css';
import { useToast } from '@/hooks/use-toast';

const BlogPostCard = ({ 
  post, 
  onClick, 
  variant = 'default', // 'default', 'featured', 'compact'
  showStats = true,
  showTags = true,
  className = ""
}) => {
  const { toast } = useToast();

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

  const handleShare = async (e) => {
    e.stopPropagation();
    
    try {
      // Create SEO-friendly blog post URL
      const postSlug = post.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim();
      const postUrl = `${window.location.origin}/blog/${postSlug}`;
      
      // Try to use the Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: postUrl
        });
        toast({
          title: "Shared successfully!",
          description: "The blog post has been shared.",
        });
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(postUrl);
        toast({
          title: "Link copied!",
          description: "The blog post link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Share failed",
        description: "Unable to share the blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const cardVariants = {
    default: {
      className: "blog-post-card-default",
      imageHeight: "blog-post-image-default",
      padding: "blog-post-content-default"
    },
    featured: {
      className: "blog-post-card-featured",
      imageHeight: "blog-post-image-featured",
      padding: "blog-post-content-featured"
    },
    compact: {
      className: "blog-post-card-compact",
      imageHeight: "blog-post-image-compact",
      padding: "blog-post-content-compact"
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
          src={post.primaryImage || post.image}
          alt={post.title}
          className={`blog-post-image ${variantStyles.imageHeight}`}
          onError={(e) => {
            e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJsb2cgUG9zdDwvdGV4dD48L3N2Zz4=";
          }}
        />
        
        {/* Category Badge */}
        {post.category && (
          <div className="blog-post-category-badge">
            <span>
              {post.category}
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {post.featured && (
          <div className="blog-post-featured-badge">
            <span>
              Featured
            </span>
          </div>
        )}

        {/* Read More Overlay */}
        <div className="blog-post-overlay">
          <motion.div
            className="blog-post-read-more-icon"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="blog-post-read-more-icon-button">
              <ChevronRight />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className={variantStyles.padding}>
        {/* Title */}
        <h3 className={`blog-post-title ${
          variant === 'featured' ? 'blog-post-title-featured' : variant === 'compact' ? 'blog-post-title-compact' : 'blog-post-title-default'
        }`}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className={`blog-post-excerpt ${
          variant === 'compact' ? 'blog-post-excerpt-compact' : 'blog-post-excerpt-default'
        }`}>
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="blog-post-meta">
          <div className="blog-post-meta-info">
            <div className="blog-post-meta-item">
              <User size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="text-xs sm:text-sm">{post.author}</span>
            </div>
            <div className="blog-post-meta-item">
              <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="text-xs sm:text-sm">{formatDate(post.date)}</span>
            </div>
            {post.readTime && (
              <div className="blog-post-meta-item">
                <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
                <span className="text-xs sm:text-sm">{post.readTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        {showStats && (post.views || post.likes || post.comments) && (
          <div className="blog-post-stats">
            {post.views && (
              <div className="blog-post-stat-item">
                <Eye size={12} className="sm:w-3.5 sm:h-3.5" />
                <span className="text-xs sm:text-sm">{post.views}</span>
              </div>
            )}
            {post.likes && (
              <div className="blog-post-stat-item">
                <Heart size={12} className="sm:w-3.5 sm:h-3.5" />
                <span className="text-xs sm:text-sm">{post.likes}</span>
              </div>
            )}
            {post.comments && (
              <div className="blog-post-stat-item">
                <Share2 size={12} className="sm:w-3.5 sm:h-3.5" />
                <span className="text-xs sm:text-sm">{post.comments}</span>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {showTags && post.tags && post.tags.length > 0 && (
          <div className="blog-post-tags">
            {post.tags.slice(0, variant === 'compact' ? 2 : 3).map((tag, index) => (
              <span key={index} className="blog-post-tag">
                #{tag}
              </span>
            ))}
            {post.tags.length > (variant === 'compact' ? 2 : 3) && (
              <span className="blog-post-tag">
                +{post.tags.length - (variant === 'compact' ? 2 : 3)}
              </span>
            )}
          </div>
        )}

        {/* Read More Button */}
        <div className="blog-post-read-more">
          <button className="blog-post-read-more-button">
            <span className="text-xs sm:text-sm">Read More</span>
            <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5" />
          </button>
          
          {/* Share Button */}
          <button 
            className="blog-post-share-button"
            onClick={handleShare}
          >
            <Share2 size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPostCard;
