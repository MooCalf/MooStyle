// Blog Data Management System
// Comprehensive blog post management with array-based structure

// Blog post types
export const POST_TYPES = {
  FEATURED: 'featured',
  LATEST: 'latest', 
  MOD_UPDATE: 'mod_update',
  CHANGELOG: 'changelog',
  REGULAR: 'regular'
};

// Blog post categories
export const POST_CATEGORIES = {
  ANNOUNCEMENTS: 'Announcements',
  TUTORIALS: 'Tutorials',
  COMMUNITY: 'Community',
  REVIEWS: 'Reviews',
  MOD_UPDATES: 'Mod Updates',
  CHANGELOG: 'Changelog',
  NEWS: 'News',
  GUIDES: 'Guides'
};

// Blog posts array - Easy to add new posts here
export const blogPosts = [
  {
    id: 1,
    type: POST_TYPES.FEATURED,
    category: POST_CATEGORIES.ANNOUNCEMENTS,
    title: "Welcome to MOOSTYLE - Your New Modding Destination",
    excerpt: "I'm excited to announce the launch of MOOSTYLE, your premier destination for high-quality game mods. After months of development, we're finally ready to share amazing mods with the community.",
    content: `
      <h2>Welcome to MOOSTYLES! </h2>
      <p>After months of hard work and dedication, I'm thrilled to officially launch MOOSTYLE. Your new destination for high-quality mods for game like InZOI. This platform represents everything I've learned about modding and community building over the years.</p>
      
      <h3>What Makes MOOSTYLE Different?</h3>
      <p>Unlike other modding platforms, MOOSTYLE focuses on:</p>
      <ul>
        <li><strong>Quality over Quantity:</strong> Every mod is carefully tested and optimized</li>
        <li><strong>Community First:</strong> Built by modders, for modders</li>
        <li><strong>Free Access:</strong> All mods are completely free to download</li>
      </ul>&nbsp;
      
      <h3>What's Coming Next?</h3>
      <p>In the coming months, you can expect to see more and more Brands, promotional content and more mods for YOU to enjoy!</p>
      <p>Thank you for being part of this journey. Let's create amazing mods together!</p>
    `,
    author: "MooCalf",
    date: "2024-01-15",
    tags: ["launch", "mods", "inzoi", "community"],
    readTime: "3 min read",
    featured: true,
    isLatest: false,
    // Image system
    primaryImage: "/projects/Brand Medias/Promotional Content/Promo Poster.png",
    secondaryImages: [
      "/projects/Brand Medias/Logos/MOOSTYLES LOGO - TEAL COLOR.png",
      "/projects/BrandCovers/default-brand-cover.png"
    ],
    // Engagement metrics
    views: 1250,
    likes: 89,
    comments: 23,
    // SEO
    metaDescription: "Welcome to MOOSTYLE - your premier destination for high-quality InZoi mods. Discover amazing mods, community insights, and modding resources.",
    metaKeywords: "MOOSTYLE, InZoi mods, modding, community, launch"
  },
  {
    id: 2,
    type: POST_TYPES.LATEST,
    category: POST_CATEGORIES.TUTORIALS,
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
    tags: ["inzoi", "guidelines", "modding", "tutorial"],
    readTime: "5 min read",
    featured: false,
    isLatest: true,
    primaryImage: "/projects/BrandCovers/{023B9ACC-182C-4EB3-BE88-4BEA63E063DF}.png",
    secondaryImages: [],
    views: 890,
    likes: 67,
    comments: 15,
    metaDescription: "Learn InZoi's official modding guidelines and best practices for creating compatible and safe mods.",
    metaKeywords: "InZoi modding, guidelines, best practices, modding tutorial"
  },
  {
    id: 3,
    type: POST_TYPES.MOD_UPDATE,
    category: POST_CATEGORIES.MOD_UPDATES,
    title: "ARNOO Shift 0.1.0 - First Product Release",
    excerpt: "We're thrilled to announce the official release of ARNOO's first product - the innovative ARNOO Shift1! This groundbreaking electronics product combines analog elegance with digital innovation.",
    content: `
      <h2>ARNOO Shift1 - Revolutionary Electronics Launch</h2>
      <p>We're excited to announce the official release of ARNOO's first product - the innovative ARNOO Shift1! This groundbreaking electronics product represents a perfect fusion of traditional craftsmanship and modern technology.</p>
      
      <h3>What Makes ARNOO Shift1 Special</h3>
      <ul>
        <li><strong>Dual Mode Operation:</strong> Switch between analog elegance and digital convenience</li>
        <li><strong>Bluetooth Connectivity:</strong> Connect with your Android or iOS device seamlessly</li>
        <li><strong>Smart Time System:</strong> DualSync™ Time System with Auto-Calibrate Smart Time</li>
        <li><strong>Voice Assistant Ready:</strong> Compatible with Siri and Google Assistant</li>
        <li><strong>Companion App:</strong> ARNOO Connect app for iOS and Android</li>
        <li><strong>Premium Materials:</strong> High-quality craftsmanship and modern minimalist design</li>
      </ul>
      
      <h3>Key Features</h3>
      <p>The ARNOO Shift1 offers an unparalleled experience:</p>
      <ul>
        <li><strong>Digital Mode:</strong> Connect with Bluetooth, enjoy smart time calibration, and use voice commands</li>
        <li><strong>Analog Mode:</strong> Experience WhisperMotion™ Mechanics for silent operation</li>
        <li><strong>Flexible Design:</strong> Switch between analog sounds and digital silence</li>
        <li><strong>Easy Setup:</strong> Simple configuration and user-friendly interface</li>
      </ul>
      
      <h3>Available Options</h3>
      <p>The ARNOO Shift1 comes in multiple configurations:</p>
      <ul>
        <li><strong>Standard:</strong> $299.99 - Perfect for everyday use</li>
        <li><strong>Premium:</strong> $349.99 - Enhanced features and materials</li>
        <li><strong>Limited Edition:</strong> $399.99 - Exclusive design with premium finishes</li>
      </ul>
      
      <h3>Color Variants</h3>
      <p>Choose from four stunning color options:</p>
      <ul>
        <li><strong>Orange:</strong> Vibrant and energetic</li>
        <li><strong>Gray:</strong> Sophisticated and modern</li>
        <li><strong>Pink:</strong> Elegant and feminine</li>
        <li><strong>Blue:</strong> Calm and professional</li>
      </ul>
      
      <h3>Technical Specifications</h3>
      <ul>
        <li><strong>Connectivity:</strong> Bluetooth 5.0</li>
        <li><strong>Power:</strong> USB-C charging with battery backup</li>
        <li><strong>Display:</strong> LED digital display with analog hands</li>
        <li><strong>Dimensions:</strong> 12" x 8" x 3"</li>
        <li><strong>Weight:</strong> 2.5 lbs</li>
        <li><strong>Warranty:</strong> 2 years comprehensive warranty</li>
      </ul>
      
      <h3>How to Get Yours</h3>
      <ol>
        <li>Visit our product page to explore all options</li>
        <li>Choose your preferred size and color</li>
        <li>Download the ARNOO Connect app</li>
        <li>Pair via Bluetooth and customize your experience</li>
        <li>Enjoy the perfect blend of analog and digital innovation!</li>
      </ol>
      
      <h3>Community Response</h3>
      <p>Early users have been amazed by the ARNOO Shift1's innovative approach to timekeeping. With a 4.9-star rating and over 1,200 downloads, it's clear this product is making waves in the electronics community.</p>
      
      <p>Don't miss out on this revolutionary product that's redefining how we think about time and technology!</p>
    `,
    author: "ARNOO",
    date: "2024-01-20",
    tags: ["arnoo", "shift1", "electronics", "product launch", "innovation"],
    readTime: "6 min read",
    featured: false,
    isLatest: true,
    primaryImage: "/projects/Brand Medias/Arnoo/Products/AC/DC Design/DC & AC_1.png",
    secondaryImages: [
      "/projects/Brand Medias/Arnoo/Products/AC/DC Design/AC_1.png",
      "/projects/Brand Medias/Arnoo/Products/AC/DC Design/DC_1.png",
      "/projects/Brand Medias/Arnoo/Products/AC/DC Design/GroupC_1.png"
    ],
    views: 1540,
    likes: 120,
    comments: 45,
    metaDescription: "ARNOO Shift1 - The revolutionary first product from ARNOO, combining analog elegance with digital innovation.",
    metaKeywords: "ARNOO Shift1, electronics, product launch, innovation, analog, digital"
  },
  {
    id: 4,
    type: POST_TYPES.CHANGELOG,
    category: POST_CATEGORIES.CHANGELOG,
    title: "January 2024 Mod Changelog - All Updates",
    excerpt: "Complete changelog of all mod updates released in January 2024. Stay updated with the latest improvements, bug fixes, and new features.",
    content: `
      <h2>January 2024 Mod Changelog</h2>
      <p>Here's a comprehensive overview of all mod updates released in January 2024.</p>
      
      <h3>Major Updates</h3>
      <ul>
        <li><strong>Japanese Serum Essence v2.0.0:</strong> Complete reformulation with fermented rice extract</li>
        <li><strong>Korean Glass Skin Set v2.1.0:</strong> New sensitive skin variant and enhanced textures</li>
      </ul>
      
      <h3>Regular Updates</h3>
      <ul>
        <li><strong>Japanese BB Cream v1.3.0:</strong> New color shades and improved SPF protection</li>
        <li><strong>Chinese Herbal Hair Mask v1.2.0:</strong> New herbal blend with ginseng</li>
        <li><strong>Korean Lip Tint Set v1.4.0:</strong> New gradient lip effect simulation</li>
        <li><strong>Korean A-Line Dress v1.5.0:</strong> New size options and color variants</li>
      </ul>
      
      <h3>Bug Fixes</h3>
      <ul>
        <li>Fixed compatibility issues with InZoi v1.2.3</li>
        <li>Resolved texture blending problems</li>
        <li>Fixed application timing issues</li>
      </ul>
    `,
    author: "MooCalf",
    date: "2024-01-25",
    tags: ["changelog", "january", "updates", "mods"],
    readTime: "6 min read",
    featured: false,
    isLatest: false,
    primaryImage: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
    secondaryImages: [],
    views: 980,
    likes: 56,
    comments: 8,
    metaDescription: "Complete changelog of all mod updates released in January 2024 with improvements and bug fixes.",
    metaKeywords: "changelog, mod updates, January 2024, InZoi mods"
  },
  {
    id: 5,
    type: POST_TYPES.REGULAR,
    category: POST_CATEGORIES.COMMUNITY,
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
    tags: ["community", "spotlight", "creators", "featured"],
    readTime: "4 min read",
    featured: false,
    isLatest: false,
    primaryImage: "/projects/BrandCovers/{1DDACD3A-0054-4066-A746-1FFC9F652400}.png",
    secondaryImages: [],
    views: 756,
    likes: 45,
    comments: 12,
    metaDescription: "Community spotlight featuring amazing mods created by our talented community members.",
    metaKeywords: "community spotlight, modders, creators, InZoi mods"
  },
  {
    id: 6,
    type: POST_TYPES.REGULAR,
    category: POST_CATEGORIES.TUTORIALS,
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
    tags: ["tools", "resources", "technical", "guide"],
    readTime: "7 min read",
    featured: false,
    isLatest: false,
    primaryImage: "/projects/BrandCovers/{6CB184CF-9B95-4A32-B8AD-0C705A7DA30C}.png",
    secondaryImages: [],
    views: 1120,
    likes: 78,
    comments: 19,
    metaDescription: "Comprehensive guide to essential modding tools and resources for InZoi modders.",
    metaKeywords: "modding tools, InZoi modding, resources, technical guide"
  },
  {
    id: 7,
    type: POST_TYPES.REGULAR,
    category: POST_CATEGORIES.REVIEWS,
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
    tags: ["roundup", "january", "mods", "review"],
    readTime: "6 min read",
    featured: false,
    isLatest: false,
    primaryImage: "/projects/BrandCovers/{C05C1499-3077-4CD7-89E7-ADA6C573DE66}.png",
    secondaryImages: [],
    views: 980,
    likes: 56,
    comments: 8,
    metaDescription: "January 2024 mod roundup featuring the best mods released this month.",
    metaKeywords: "mod roundup, January 2024, InZoi mods, reviews"
  }
];

// Helper functions for blog data management
export const getBlogPosts = () => {
  return blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getFeaturedPosts = () => {
  return blogPosts.filter(post => post.featured === true);
};

export const getLatestPosts = () => {
  return blogPosts.filter(post => post.isLatest === true);
};

export const getModUpdatePosts = () => {
  return blogPosts.filter(post => post.type === POST_TYPES.MOD_UPDATE);
};

export const getChangelogPosts = () => {
  return blogPosts.filter(post => post.type === POST_TYPES.CHANGELOG);
};

export const getPostsByCategory = (category) => {
  return blogPosts.filter(post => post.category === category);
};

export const getPostById = (id) => {
  return blogPosts.find(post => post.id === id);
};

export const getPostsByTag = (tag) => {
  return blogPosts.filter(post => post.tags.includes(tag));
};

export const searchBlogPosts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.author.toLowerCase().includes(lowercaseQuery)
  );
};

// Function to add a new blog post
export const addBlogPost = (newPost) => {
  const maxId = Math.max(...blogPosts.map(post => post.id));
  const post = {
    id: maxId + 1,
    ...newPost,
    date: newPost.date || new Date().toISOString().split('T')[0],
    views: newPost.views || 0,
    likes: newPost.likes || 0,
    comments: newPost.comments || 0,
    secondaryImages: newPost.secondaryImages || []
  };
  blogPosts.push(post);
  return post;
};

// Function to update a blog post
export const updateBlogPost = (id, updates) => {
  const index = blogPosts.findIndex(post => post.id === id);
  if (index !== -1) {
    blogPosts[index] = { ...blogPosts[index], ...updates };
    return blogPosts[index];
  }
  return null;
};

// Function to delete a blog post
export const deleteBlogPost = (id) => {
  const index = blogPosts.findIndex(post => post.id === id);
  if (index !== -1) {
    return blogPosts.splice(index, 1)[0];
  }
  return null;
};

// Export all available categories and types for easy reference
export const getAllCategories = () => Object.values(POST_CATEGORIES);
export const getAllTypes = () => Object.values(POST_TYPES);
export const getAllTags = () => {
  const allTags = new Set();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag));
  });
  return Array.from(allTags).sort();
};
