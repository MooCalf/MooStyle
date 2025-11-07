# MOOSTYLE - Digital Resources & Creator Platform

A modern, frontend-only e-commerce platform for digital resources, mods, and content from talented creators worldwide. Built with React and Vite, MOOSTYLE provides a comprehensive marketplace experience with product browsing, creator showcases, and a beautiful user interface similar to a online shopping site.

## 🌟 Overview

MOOSTYLE is a  digital resources platform that showcases creators and their content. The platform supports various content types including beauty products, fashion items, lifestyle products, and more.

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite 7** - Fast build tool and dev server
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Helmet Async** - SEO and metadata management

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd MooStyle
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Start development server**
   ```
   npm run dev
   ```

4. **Build for production**
   ```
   npm run build
   ```

5. **Preview production build**
   ```
   npm run preview
   ```

## 📁 Project Structure

```
MooStyle/
├── src/                      # Frontend source code
│   ├── Components/           # React components
│   │   ├── HomepageComponents/  # Homepage-specific components
│   │   └── ShoppingProducts/    # Shopping-related components
│   ├── Pages/               # Page components
│   │   ├── Home.jsx         # Homepage (default route)
│   │   ├── Shopping.jsx     # Product listing page
│   │   ├── Creators.jsx     # Creators showcase page
│   │   └── ...
│   ├── lib/                 # Utility libraries and data
│   │   ├── creatorsData.js  # Creator data (local storage)
│   │   ├── shoppingData.js  # Product data (local storage)
│   │   ├── brandsData.js    # Brand information (local storage)
│   │   ├── blogData.js      # Blog posts (local storage)
│   │   └── ...
│   └── hooks/               # Custom React hooks
├── public/                  # Static assets
│   └── projects/            # Product images and assets
└── Guides and More/         # Documentation
```


## 🌐 Routes

### Main Routes
- `/` - Homepage (default)
- `/home` - Homepage
- `/shopping` - Product listing page
- `/shopping/:category` - Category-specific products
- `/product/:id` - Product detail page
- `/creators` - Creators showcase page
- `/brands` - Brand listing page
- `/brand/:id` - Brand detail page

### Content Routes
- `/blog` - Blog posts
- `/about` - About page
- `/support` - Support page
- `/common-questions` - FAQ page

### User Routes
- `/saved-products` - User's saved products (stored in localStorage)

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build


## 📊 Current Status

- ✅ Frontend: Fully functional with React 19
- ✅ Product Management: Comprehensive product system with local data storage
- ✅ Creator System: Featured creators showcase with local data
- ✅ Static Site: No backend or database required

---

**MOOSTYLE** - Digital Resources & Creator Platform 🌟
Built with ❤️ by the MOOSTYLE team

