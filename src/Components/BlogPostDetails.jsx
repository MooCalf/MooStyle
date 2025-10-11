import React from 'react';
import { ArrowLeft, Calendar, User, Tag, Clock, Eye, Heart, Share2, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/blog.css';
import { useToast } from '@/hooks/use-toast';

const BlogPostDetails = ({ post, onClose, onShare }) => {
  const { toast } = useToast();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = async () => {
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
      
      // Call the onShare prop if provided
      if (onShare) {
        onShare(post);
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

  return (
    <motion.div
      className="blog-post-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="blog-post-modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="blog-post-modal-header">
          <motion.button
            onClick={onClose}
            className="blog-post-modal-back-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </motion.button>
          
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={handleShare}
              className="blog-post-modal-share-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={20} />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="blog-post-modal-body">
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
              className="blog-post-modal-image"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJsb2cgUG9zdCBJbWFnZTwvdGV4dD48L3N2Zz4=";
              }}
            />
          </motion.div>

          {/* Post Meta */}
          <motion.div 
            className="blog-post-modal-meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="blog-post-modal-badges">
              {post.category && (
                <span className="blog-post-modal-category-badge">
                  {post.category}
                </span>
              )}
              {post.featured && (
                <span className="blog-post-modal-featured-badge">
                  Featured
                </span>
              )}
            </div>

            <div className="blog-post-modal-meta-info">
              <div className="blog-post-modal-meta-item">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="blog-post-modal-meta-item">
                <Calendar size={16} />
                <span>{formatDate(post.date)}</span>
              </div>
              {post.readTime && (
                <div className="blog-post-modal-meta-item">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
              )}
            </div>

            {/* Stats */}
            {(post.views || post.likes || post.comments) && (
              <div className="blog-post-modal-stats">
                {post.views && (
                  <div className="blog-post-modal-stat-item">
                    <Eye size={16} />
                    <span>{post.views} views</span>
                  </div>
                )}
                {post.likes && (
                  <div className="blog-post-modal-stat-item">
                    <Heart size={16} />
                    <span>{post.likes} likes</span>
                  </div>
                )}
                {post.comments && (
                  <div className="blog-post-modal-stat-item">
                    <Share2 size={16} />
                    <span>{post.comments} comments</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="blog-post-modal-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.div 
            className="blog-post-modal-excerpt"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {post.excerpt}
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div 
              className="blog-post-modal-tags-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="blog-post-modal-tags-header">
                <Tag size={16} className="text-gray-500" />
                <span className="blog-post-modal-tags-label">Tags:</span>
              </div>
              <div className="blog-post-modal-tags-list">
                {post.tags.map((tag, index) => (
                  <span key={index} className="blog-post-modal-tag">
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
              className="blog-post-modal-content-body"
            />
          </motion.div>

          {/* Author Bio */}
          <motion.div 
            className="blog-post-modal-author-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="blog-post-modal-author-content">
              <div className="blog-post-modal-author-avatar">
                <User size={24} className="text-teal-600" />
              </div>
              <div className="blog-post-modal-author-info">
                <h3>{post.author}</h3>
                <p>
                  Author and creator of MOOSTYLE. Passionate about InZoi modding and community building.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Posts or Call to Action */}
          <motion.div 
            className="blog-post-modal-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="blog-post-modal-cta-content">
              <BookOpen className="blog-post-modal-cta-icon" />
              <h3 className="blog-post-modal-cta-title">Enjoyed this post?</h3>
              <p className="blog-post-modal-cta-description">
                Check out more blog posts and stay updated with the latest MOOSTYLE news and modding tips.
              </p>
              <motion.button
                onClick={onClose}
                className="blog-post-modal-cta-button"
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