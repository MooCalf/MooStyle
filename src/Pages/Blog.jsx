import React, { useState } from 'react';
import { ArrowLeft, Calendar, User, Tag, ChevronRight, Search, Filter, Clock, Eye, Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Sample blog posts - you can replace this with real data later
  const blogPosts = [
    {
      id: 1,
      title: "Welcome to MooStyle - Your New Modding Destination",
      excerpt: "I'm excited to announce the launch of MooStyle, your premier destination for high-quality InZoi mods. After months of development, we're finally ready to share amazing mods with the community.",
      content: `
        <h2>Welcome to the Future of InZoi Modding</h2>
        <p>After months of hard work and dedication, I'm thrilled to officially launch MooStyle - your new go-to destination for high-quality InZoi mods. This platform represents everything I've learned about modding and community building over the years.</p>
        
        <h3>What Makes MooStyle Different?</h3>
        <p>Unlike other modding platforms, MooStyle focuses on:</p>
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
      image: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
      views: 1250,
      likes: 89,
      comments: 23
    },
    {
      id: 2,
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
      image: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
      views: 890,
      likes: 67,
      comments: 15
    },
    {
      id: 3,
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
      image: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
      views: 756,
      likes: 45,
      comments: 12
    },
    {
      id: 4,
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
      image: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
      views: 1120,
      likes: 78,
      comments: 19
    },
    {
      id: 5,
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
      image: "/projects/BrandCovers/{D8B2FBCD-A9DF-4257-AA79-AE1A22E9DEF4}.png",
      views: 980,
      likes: 56,
      comments: 8
    }
  ];

  const categories = ['all', 'Announcements', 'Tutorials', 'Community', 'Reviews'];
  const allTags = ['all', ...new Set(blogPosts.flatMap(post => post.tags))];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most-viewed', label: 'Most Viewed' },
    { value: 'most-liked', label: 'Most Liked' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Sort posts based on selected option
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'most-viewed':
        return b.views - a.views;
      case 'most-liked':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const featuredPost = sortedPosts.find(post => post.featured);
  const regularPosts = sortedPosts.filter(post => !post.featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="p-2 text-gray-600 hover:text-teal-600 transition-colors duration-200"
            >
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Blog</h1>
                <p className="text-gray-600 mt-1">Updates, announcements, and insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white min-w-[140px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white min-w-[120px]"
                >
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>
                      {tag === 'all' ? 'All Tags' : `#${tag}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white min-w-[140px]"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(selectedCategory !== 'all' || selectedTag !== 'all' || searchTerm) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchTerm && (
                <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Category: {selectedCategory}
                </span>
              )}
              {selectedTag !== 'all' && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Tag: #{selectedTag}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedTag('all');
                }}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Post</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZlYXR1cmVkIEJsb2cgUG9zdDwvdGV4dD48L3N2Zz4=";
                    }}
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-teal-600 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{formatDate(featuredPost.date)}</span>
                      </div>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button className="flex items-center space-x-1 text-teal-600 hover:text-teal-700 font-medium">
                      <span>Read More</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJsb2cgUG9zdDwvdGV4dD48L3N2Zz4=";
                  }}
                />
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-teal-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
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
                    </div>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>
                    <button className="flex items-center space-x-1 text-teal-600 hover:text-teal-700 font-medium text-sm">
                      <span>Read</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {regularPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
