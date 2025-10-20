# Blog System Documentation

## Overview
The new blog system provides a comprehensive, array-based structure for managing blog posts with different types, categories, and visibility options. It's designed to be easy to use and maintain.

## File Structure
- **`src/lib/blogData.js`** - Main blog data management system
- **`src/Pages/Blog.jsx`** - Updated blog page component

## Post Types
The system supports 5 different post types:

### 1. Featured Posts (`POST_TYPES.FEATURED`)
- Appears in the "Featured Post" section at the top
- Only one featured post is displayed
- Set `featured: true` in the post object

### 2. Latest Posts (`POST_TYPES.LATEST`)
- Appears in the "Latest Posts" section
- Set `isLatest: true` in the post object
- Can be used to highlight recent important posts

### 3. Mod Update Posts (`POST_TYPES.MOD_UPDATE`)
- Appears in the "Mod Updates & Changelog" section
- Used for announcing mod updates, new features, bug fixes
- Automatically categorized as "Mod Updates"

### 4. Changelog Posts (`POST_TYPES.CHANGELOG`)
- Appears in the "Mod Updates & Changelog" section
- Used for comprehensive changelog entries
- Automatically categorized as "Changelog"

### 5. Regular Posts (`POST_TYPES.REGULAR`)
- Appears in the "Latest Posts" section
- Default post type for general blog content

## Categories
Available categories:
- **Announcements** - Important announcements and news
- **Tutorials** - How-to guides and tutorials
- **Community** - Community spotlights and features
- **Reviews** - Product reviews and roundups
- **Mod Updates** - Mod update announcements
- **Changelog** - Comprehensive changelog entries
- **News** - General news and updates
- **Guides** - Detailed guides and documentation

## Image System
Each post supports:
- **Primary Image** (`primaryImage`) - Main image displayed on cards and in details
- **Secondary Images** (`secondaryImages`) - Array of additional images (optional)

## Adding New Posts

### Method 1: Direct Array Addition
Add posts directly to the `blogPosts` array in `src/lib/blogData.js`:

```javascript
{
  id: 7, // Auto-increment from existing posts
  type: POST_TYPES.FEATURED, // or other types
  category: POST_CATEGORIES.ANNOUNCEMENTS,
  title: "Your Post Title",
  excerpt: "Brief description of the post...",
  content: `
    <h2>Your Content Here</h2>
    <p>Your HTML content...</p>
  `,
  author: "Author Name",
  date: "2024-01-30", // YYYY-MM-DD format
  tags: ["tag1", "tag2", "tag3"],
  readTime: "5 min read",
  featured: true, // Set to true for featured posts
  isLatest: false, // Set to true for latest posts
  primaryImage: "/path/to/primary/image.png",
  secondaryImages: [
    "/path/to/secondary1.png",
    "/path/to/secondary2.png"
  ],
  views: 0, // Will be auto-set if not provided
  likes: 0, // Will be auto-set if not provided
  comments: 0, // Will be auto-set if not provided
  metaDescription: "SEO description",
  metaKeywords: "seo, keywords, here"
}
```

### Method 2: Using Helper Functions
Use the `addBlogPost()` function:

```javascript
import { addBlogPost, POST_TYPES, POST_CATEGORIES } from '@/lib/blogData';

const newPost = addBlogPost({
  type: POST_TYPES.REGULAR,
  category: POST_CATEGORIES.TUTORIALS,
  title: "New Tutorial Post",
  excerpt: "Learn something new...",
  content: "<p>Your content here...</p>",
  author: "Your Name",
  tags: ["tutorial", "guide"],
  readTime: "3 min read",
  primaryImage: "/path/to/image.png"
});
```

## Helper Functions

### Getting Posts
- `getBlogPosts()` - Get all posts (sorted by date)
- `getFeaturedPosts()` - Get featured posts
- `getLatestPosts()` - Get latest posts
- `getModUpdatePosts()` - Get mod update posts
- `getChangelogPosts()` - Get changelog posts
- `getPostsByCategory(category)` - Get posts by category
- `getPostById(id)` - Get specific post by ID
- `getPostsByTag(tag)` - Get posts by tag

### Search and Management
- `searchBlogPosts(query)` - Search posts by title, content, tags, author
- `addBlogPost(postData)` - Add new post
- `updateBlogPost(id, updates)` - Update existing post
- `deleteBlogPost(id)` - Delete post

### Utility Functions
- `getAllCategories()` - Get all available categories
- `getAllTypes()` - Get all available post types
- `getAllTags()` - Get all unique tags used across posts

## Post Visibility Logic

### Featured Posts
- Only posts with `featured: true` appear in the featured section
- Only the first featured post is displayed
- Featured posts also appear in regular posts unless filtered out

### Latest Posts
- Posts with `isLatest: true` are highlighted as latest
- These appear in the "Latest Posts" section
- Can be combined with featured status

### Mod Updates & Changelog
- Posts with `type: POST_TYPES.MOD_UPDATE` appear in mod updates section
- Posts with `type: POST_TYPES.CHANGELOG` appear in changelog section
- These sections are separate from regular blog posts

### Regular Posts
- All posts (except featured) appear in the "Latest Posts" section
- Posts are sorted by date (newest first)
- Search functionality works across all post types

## Search Functionality
The search system searches across:
- Post titles
- Post excerpts
- Post content
- Tags
- Author names

## SEO Features
Each post includes:
- `metaDescription` - For SEO meta description
- `metaKeywords` - For SEO meta keywords
- Automatic URL generation based on post ID

## Example Usage Scenarios

### Scenario 1: Adding a Featured Announcement
```javascript
{
  id: 8,
  type: POST_TYPES.FEATURED,
  category: POST_CATEGORIES.ANNOUNCEMENTS,
  title: "Major Platform Update Coming Soon",
  excerpt: "We're excited to announce major improvements coming to MOOSTYLE...",
  content: "<h2>What's New</h2><p>Details about the update...</p>",
  author: "MooCalf",
  date: "2024-01-30",
  tags: ["announcement", "update", "platform"],
  readTime: "4 min read",
  featured: true,
  isLatest: false,
  primaryImage: "/announcements/update-banner.png",
  secondaryImages: ["/announcements/feature1.png", "/announcements/feature2.png"]
}
```

### Scenario 2: Adding a Mod Update
```javascript
{
  id: 9,
  type: POST_TYPES.MOD_UPDATE,
  category: POST_CATEGORIES.MOD_UPDATES,
  title: "ARNOO Shift1 v1.2.0 - New Features Added",
  excerpt: "The ARNOO Shift1 mod has been updated with new features...",
  content: "<h2>New Features</h2><ul><li>Feature 1</li><li>Feature 2</li></ul>",
  author: "ARNOO",
  date: "2024-01-29",
  tags: ["arnoo", "shift1", "update", "electronics"],
  readTime: "3 min read",
  featured: false,
  isLatest: false,
  primaryImage: "/projects/Brand Medias/Arnoo/Products/AC/DC Design/DC & AC_1.png"
}
```

### Scenario 3: Adding a Tutorial
```javascript
{
  id: 10,
  type: POST_TYPES.REGULAR,
  category: POST_CATEGORIES.TUTORIALS,
  title: "How to Install InZoi Mods - Complete Guide",
  excerpt: "Learn how to properly install and manage InZoi mods...",
  content: "<h2>Installation Steps</h2><ol><li>Step 1</li><li>Step 2</li></ol>",
  author: "MooCalf",
  date: "2024-01-28",
  tags: ["tutorial", "installation", "guide", "inzoi"],
  readTime: "8 min read",
  featured: false,
  isLatest: true,
  primaryImage: "/tutorials/installation-guide.png"
}
```

## Best Practices

1. **Consistent Naming**: Use consistent naming conventions for images and tags
2. **SEO Optimization**: Always include meta descriptions and keywords
3. **Image Optimization**: Use appropriate image sizes and formats
4. **Content Structure**: Use proper HTML structure in content
5. **Tag Management**: Use consistent tags across similar posts
6. **Date Management**: Use YYYY-MM-DD format for dates
7. **Author Consistency**: Use consistent author names

## Migration from Old System
The old hardcoded blog posts have been replaced with the new system. All existing posts have been migrated to the new format with proper categorization and image support.

## Future Enhancements
Potential future improvements:
- Admin interface for managing posts
- Draft/published status
- Post scheduling
- Comment system integration
- Analytics tracking
- Multi-language support
