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

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sample blog posts - you can replace this with real data later
  const blogPosts = [
    {
      id: 1,
      type: 'blog',
      title: "Welcome to MOOSTYLE - Your New Modding Destination",
      excerpt: "I'm excited to announce the launch of MOOSTYLE, your premier destination for high-quality InZoi mods. After months of development, we're finally ready to share amazing mods with the community.",
      content: `
        <h2>Welcome to the Future of InZoi Modding</h2>
        <p>After months of hard work and dedication, I'm thrilled to officially launch MOOSTYLE - your new go-to destination for high-quality InZoi mods. This platform represents everything I've learned about modding and community building over the years.</p>
        
        <h3>What Makes MOOSTYLE Different?</h3>
        <p>Unlike other modding platforms, MOOSTYLE focuses on:</p>
        <ul>
          <li><strong>Quality over Quantity:</strong> Every mod is carefully tested and optimized</li>
          <li><strong>Community First:</strong> Built by modders, for modders</li>
          <li><strong>Free Access:</strong> All mods are completely free to download</li>
          <li><strong>Regular Updates:</strong> New content every week</li>
        </ul>
        
        <h3>What's Coming Next?</h3>
        <p>In the coming weeks, you can expect:</p>
        <ul>
          <li>Character customization mods</li>
          <li>Furniture and decor collections</li>
          <li>Gameplay enhancement mods</li>
          <li>Visual improvement packs</li>
        </ul>
        
        <p>Thank you for being part of this journey. Let's create amazing mods together!</p>
      `,
      author: "MooCalf",
      date: "2024-01-15",
      category: "Announcements",
      tags: ["launch", "mods", "inzoi", "community"],
      readTime: "3 min read",
      featured: true,
      image: "/projects/Brand Medias/Promotional Content/Promo Poster.png",
      views: 1250,
      likes: 89,
      comments: 23
    },
    {
      id: 2,
      type: 'blog',
      title: "InZoi Modding Guidelines - What You Need to Know",
      excerpt: "Understanding InZoi's modding guidelines is crucial for creating compatible and safe mods. Here's everything you need to know about the official guidelines and best practices.",
      content: `
        <h2>Understanding InZoi's Modding Guidelines</h2>
        <p>Creating mods for InZoi requires following specific guidelines to ensure compatibility and safety. Here's a comprehensive breakdown of what you need to know.</p>
        
        <h3>Official Guidelines Overview</h3>
        <p>The InZoi team has established clear guidelines for modders to follow:</p>
        <ul>
          <li><strong>File Structure:</strong> Proper organization of mod files</li>
          <li><strong>Naming Conventions:</strong> Consistent naming patterns</li>
          <li><strong>Compatibility:</strong> Ensuring mods work across game versions</li>
          <li><strong>Performance:</strong> Optimizing for smooth gameplay</li>
        </ul>
        
        <h3>Best Practices for Modders</h3>
        <p>Based on my experience, here are the key best practices:</p>
        <ol>
          <li>Always test your mods thoroughly before release</li>
          <li>Document your mods with clear installation instructions</li>
          <li>Use proper version control for your mods</li>
          <li>Engage with the community for feedback</li>
        </ol>
        
        <h3>Common Pitfalls to Avoid</h3>
        <p>Many new modders make these mistakes:</p>
        <ul>
          <li>Not following the official file structure</li>
          <li>Creating mods that conflict with others</li>
          <li>Poor documentation and instructions</li>
          <li>Not considering performance impact</li>
        </ul>
        
        <p>Remember, following these guidelines ensures your mods will be compatible and well-received by the community!</p>
      `,
      author: "MooCalf",
      date: "2024-01-12",
      category: "Tutorials",
      tags: ["inzoi", "guidelines", "modding", "tutorial"],
      readTime: "5 min read",
      featured: false,
      image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
      views: 890,
      likes: 67,
      comments: 15
    },
    {
      id: 3,
      type: 'blog',
      title: "Community Spotlight: Amazing Mods from Our Creators",
      excerpt: "This month we're highlighting some incredible mods created by our community members. From character customizations to furniture sets, these creators are pushing the boundaries of what's possible.",
      content: `
        <h2>Celebrating Our Amazing Community</h2>
        <p>This month, I want to shine a spotlight on some incredible modders in our community who are creating amazing content for InZoi.</p>
        
        <h3>Featured Creator: LunaGlow</h3>
        <p>LunaGlow has been creating stunning character customization mods that have taken the community by storm. Their attention to detail and creative designs are truly inspiring.</p>
        
        <h3>Featured Creator: TokyoVibe</h3>
        <p>TokyoVibe specializes in contemporary Japanese streetwear mods. Their collection brings authentic Japanese fashion to InZoi with incredible accuracy.</p>
        
        <h3>Community Highlights</h3>
        <p>This month's standout mods include:</p>
        <ul>
          <li>CelestialBeauty's luxury cosmetics collection</li>
          <li>ZenLifestyle's mindful wellness products</li>
          <li>UrbanHarbor's modern urban fashion line</li>
          <li>PearlEssence's premium Korean beauty rituals</li>
        </ul>
        
        <h3>How to Get Featured</h3>
        <p>Want to see your mods featured? Here's how:</p>
        <ol>
          <li>Create high-quality, original content</li>
          <li>Follow InZoi's modding guidelines</li>
          <li>Share your work in our Discord community</li>
          <li>Engage with other community members</li>
        </ol>
        
        <p>Thank you to all our amazing creators for making this community so vibrant and creative!</p>
      `,
      author: "MooCalf",
      date: "2024-01-10",
      category: "Community",
      tags: ["community", "spotlight", "creators", "featured"],
      readTime: "4 min read",
      featured: false,
      image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
      views: 756,
      likes: 45,
      comments: 12
    },
    {
      id: 4,
      type: 'blog',
      title: "Technical Deep Dive: Modding Tools and Resources",
      excerpt: "A comprehensive guide to the tools and resources every InZoi modder should know about. From basic setup to advanced techniques, we cover everything you need to get started.",
      content: `
        <h2>Essential Modding Tools for InZoi</h2>
        <p>Whether you're a beginner or an experienced modder, having the right tools is crucial for creating quality mods. Here's my comprehensive guide to the tools and resources you need.</p>
        
        <h3>Essential Software</h3>
        <p>Here are the must-have tools for InZoi modding:</p>
        <ul>
          <li><strong>InZoi ModKit:</strong> Official modding toolkit from the developers</li>
          <li><strong>Blender:</strong> For 3D modeling and animation</li>
          <li><strong>Photoshop/GIMP:</strong> For texture editing and image manipulation</li>
          <li><strong>Visual Studio Code:</strong> For scripting and code editing</li>
        </ul>
        
        <h3>Advanced Tools</h3>
        <p>For more advanced modders:</p>
        <ul>
          <li><strong>Maya:</strong> Professional 3D modeling software</li>
          <li><strong>Substance Painter:</strong> Advanced texture painting</li>
          <li><strong>Unity:</strong> For complex mod development</li>
          <li><strong>Git:</strong> Version control for your projects</li>
        </ul>
        
        <h3>Learning Resources</h3>
        <p>Where to learn modding:</p>
        <ol>
          <li>Official InZoi modding documentation</li>
          <li>Community forums and Discord servers</li>
          <li>YouTube tutorials and guides</li>
          <li>Practice with simple projects first</li>
        </ol>
        
        <h3>Tips for Success</h3>
        <p>My top tips for new modders:</p>
        <ul>
          <li>Start with simple modifications</li>
          <li>Join the community early</li>
          <li>Don't be afraid to ask questions</li>
          <li>Practice regularly</li>
        </ul>
        
        <p>Remember, modding is a skill that takes time to develop. Be patient and keep practicing!</p>
      `,
      author: "MooCalf",
      date: "2024-01-08",
      category: "Tutorials",
      tags: ["tools", "resources", "technical", "guide"],
      readTime: "7 min read",
      featured: false,
      image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
      views: 1120,
      likes: 78,
      comments: 19
    },
    {
      id: 5,
      type: 'blog',
      title: "Monthly Mod Roundup - January 2024",
      excerpt: "Check out the best mods released this month! From character enhancements to gameplay improvements, here are our top picks for January 2024.",
      content: `
        <h2>January 2024 Mod Roundup</h2>
        <p>January was an incredible month for InZoi modding! Here are the standout mods that caught our attention.</p>
        
        <h3>Top Character Mods</h3>
        <p>This month's best character customization mods:</p>
        <ul>
          <li><strong>Korean Glass Skin Set:</strong> Realistic skincare textures</li>
          <li><strong>Japanese Streetwear Collection:</strong> Authentic fashion pieces</li>
          <li><strong>Chinese Traditional Outfits:</strong> Cultural heritage designs</li>
        </ul>
        
        <h3>Best Furniture Mods</h3>
        <p>Outstanding furniture and decor mods:</p>
        <ul>
          <li><strong>Modern Minimalist Set:</strong> Clean, contemporary designs</li>
          <li><strong>Traditional Asian Furniture:</strong> Authentic cultural pieces</li>
          <li><strong>Gaming Setup Collection:</strong> Perfect for streamers</li>
        </ul>
        
        <h3>Gameplay Enhancement Mods</h3>
        <p>Mods that improve the gaming experience:</p>
        <ul>
          <li><strong>Performance Optimizer:</strong> Better frame rates</li>
          <li><strong>UI Improvements:</strong> Cleaner interface</li>
          <li><strong>Quality of Life Features:</strong> Convenience improvements</li>
        </ul>
        
        <h3>Community Favorites</h3>
        <p>Most downloaded mods this month:</p>
        <ol>
          <li>LunaGlow's Skincare Collection</li>
          <li>TokyoVibe's Streetwear Pack</li>
          <li>CelestialBeauty's Makeup Set</li>
          <li>ZenLifestyle's Wellness Items</li>
        </ol>
        
        <p>Thank you to all the amazing modders who contributed this month. Keep up the fantastic work!</p>
      `,
      author: "MooCalf",
      date: "2024-01-05",
      category: "Reviews",
      tags: ["roundup", "january", "mods", "review"],
      readTime: "6 min read",
      featured: false,
      image: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
      views: 980,
      likes: 56,
      comments: 8
    }
  ];

  // Changelog data for mod updates
  const changelogEntries = [
    {
      id: 1,
      modName: "Korean Glass Skin Set",
      version: "2.1.0",
      date: "2024-01-20",
      type: "update",
      changes: [
        {
          type: "added",
          description: "Added new sensitive skin variant with reduced fragrance"
        },
        {
          type: "improved",
          description: "Enhanced texture quality for better skin compatibility"
        },
        {
          type: "fixed",
          description: "Fixed compatibility issue with InZoi version 1.2.3"
        }
      ],
      downloadCount: 15420,
      author: "LunaGlow"
    },
    {
      id: 2,
      modName: "Japanese BB Cream",
      version: "1.3.0",
      date: "2024-01-18",
      type: "update",
      changes: [
        {
          type: "added",
          description: "New color shades: Light, Medium, Deep"
        },
        {
          type: "improved",
          description: "Better SPF protection simulation"
        },
        {
          type: "fixed",
          description: "Resolved texture blending issues"
        }
      ],
      downloadCount: 8920,
      author: "TokyoVibe"
    },
    {
      id: 3,
      modName: "Chinese Herbal Hair Mask",
      version: "1.2.0",
      date: "2024-01-15",
      type: "update",
      changes: [
        {
          type: "added",
          description: "New herbal blend with ginseng and goji berry"
        },
        {
          type: "improved",
          description: "Enhanced hair texture simulation"
        },
        {
          type: "fixed",
          description: "Fixed application timing for better results"
        }
      ],
      downloadCount: 5670,
      author: "HerbalGlow"
    },
    {
      id: 4,
      modName: "Korean Lip Tint Set",
      version: "1.4.0",
      date: "2024-01-12",
      type: "update",
      changes: [
        {
          type: "added",
          description: "New gradient lip effect simulation"
        },
        {
          type: "improved",
          description: "Better color intensity options"
        },
        {
          type: "added",
          description: "Long-lasting formula enhancement"
        }
      ],
      downloadCount: 18750,
      author: "PearlEssence"
    },
    {
      id: 5,
      modName: "Korean A-Line Dress",
      version: "1.5.0",
      date: "2024-01-10",
      type: "update",
      changes: [
        {
          type: "added",
          description: "New size options: XS, S, M, L, XL"
        },
        {
          type: "improved",
          description: "Enhanced fabric texture simulation"
        },
        {
          type: "added",
          description: "New color variants: Navy, Cream, Dusty Rose"
        }
      ],
      downloadCount: 12340,
      author: "SeoulStyle"
    },
    {
      id: 6,
      modName: "Japanese Serum Essence",
      version: "2.0.0",
      date: "2024-01-08",
      type: "major",
      changes: [
        {
          type: "added",
          description: "Complete reformulation with fermented rice extract"
        },
        {
          type: "added",
          description: "New sake extract for skin renewal"
        },
        {
          type: "improved",
          description: "Enhanced absorption simulation"
        },
        {
          type: "fixed",
          description: "Resolved compatibility with all skin types"
        }
      ],
      downloadCount: 15680,
      author: "TokyoFashion"
    }
  ];

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
      const post = blogPosts.find(p => p.id === result.id);
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

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/" 
                  className="back-button-simple"
                >
                  <ArrowLeft size={24} />
                </Link>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <span className="text-white font-bold text-sm">B</span>
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Blog</h1>
                    <p className="text-gray-600 mt-1">Updates, announcements, and insights</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Blog Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search */}
            <motion.div 
              className="mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <SearchQuery
                searchData={getGlobalSearchData()}
                onSearchSelect={handleSearchSelect}
                placeholder="Search products, brands, blog posts..."
                showFilters={true}
                className="max-w-2xl"
                searchFields={['title', 'description', 'content', 'tags', 'category', 'subcategory', 'author', 'brand']}
                resultLimit={20}
              />
            </motion.div>

            {/* Featured Post */}
            {featuredPost && (
              <motion.div 
                className="mb-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.h2 
                  className="text-2xl font-bold text-gray-900 mb-6"
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
              className="mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <Package className="text-white" size={16} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Mod Updates & Changelog</h2>
              </motion.div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200">
                  <p className="text-gray-700 text-sm">
                    Stay updated with the latest mod improvements, bug fixes, and new features from our creators.
                  </p>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {changelogEntries.map((entry, index) => (
                    <motion.div 
                      key={entry.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{entry.modName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              entry.type === 'major' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {entry.type === 'major' ? 'Major Update' : 'Update'} v{entry.version}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(entry.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              {entry.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Download size={14} />
                              {entry.downloadCount.toLocaleString()} downloads
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {entry.changes.map((change, changeIndex) => (
                          <div key={changeIndex} className="flex items-start gap-2">
                            <div className={`mt-1 flex-shrink-0 ${
                              change.type === 'added' ? 'text-green-600' :
                              change.type === 'improved' ? 'text-blue-600' :
                              change.type === 'fixed' ? 'text-orange-600' :
                              'text-gray-600'
                            }`}>
                              {change.type === 'added' && <Plus size={14} />}
                              {change.type === 'improved' && <CheckCircle size={14} />}
                              {change.type === 'fixed' && <AlertCircle size={14} />}
                            </div>
                            <span className={`text-sm ${
                              change.type === 'added' ? 'text-green-700' :
                              change.type === 'improved' ? 'text-blue-700' :
                              change.type === 'fixed' ? 'text-orange-700' :
                              'text-gray-700'
                            }`}>
                              <span className="font-medium capitalize">{change.type}:</span> {change.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Showing {changelogEntries.length} recent updates
                    </p>
                    <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
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
                className="text-2xl font-bold text-gray-900 mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                Latest Posts
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                  // Show loading skeletons
                  [...Array(6)].map((_, index) => (
                    <BlogPostCardSkeleton key={index} />
                  ))
                ) : (
                  regularPosts.map((post, index) => (
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