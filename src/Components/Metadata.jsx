import React from 'react';
import { Helmet } from 'react-helmet-async';

const Metadata = ({
  // Basic SEO
  pageTitle = "MOOSTYLE - Asian Fashion & Beauty",
  pageDescription = "Discover the latest Asian fashion, beauty products, and lifestyle items at MOOSTYLE. High-quality InZoi mods, Korean skincare, Japanese streetwear, and more.",
  keywords = "Asian fashion, Korean beauty, Japanese streetwear, InZoi mods, K-beauty, Asian lifestyle, fashion mods, beauty products",
  
  // Open Graph
  ogTitle = "",
  ogDescription = "",
  ogImage = "/projects/Brand Medias/Promotional Content/Promo Poster.png",
  ogUrl = "",
  ogType = "website",
  ogSiteName = "MOOSTYLE",
  
  // Twitter Cards
  twitterCard = "summary_large_image",
  twitterTitle = "",
  twitterDescription = "",
  twitterImage = "",
  twitterSite = "@moostyle",
  twitterCreator = "@moocalf",
  
  // Additional Meta
  author = "MooCalf",
  canonical = "",
  noindex = false,
  
  // Product-specific (for product pages)
  product = null,
  
  // Article-specific (for blog posts)
  article = null,
  
  // Category-specific (for shopping pages)
  category = null
}) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://moostyle.com';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : siteUrl;
  
  // Determine final values with fallbacks
  const finalTitle = ogTitle || pageTitle;
  const finalDescription = ogDescription || pageDescription;
  const finalImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
  const finalUrl = ogUrl || currentUrl;
  const finalCanonical = canonical || finalUrl;
  
  // Twitter fallbacks
  const finalTwitterTitle = twitterTitle || finalTitle;
  const finalTwitterDescription = twitterDescription || finalDescription;
  const finalTwitterImage = twitterImage || finalImage;

  // Generate structured data based on content type
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "MOOSTYLE",
      "url": siteUrl,
      "logo": `${siteUrl}/projects/Brand Medias/Logos/MooStyle Logo.png`,
      "description": "Premier destination for Asian fashion, beauty products, and lifestyle items",
      "sameAs": [
        "https://twitter.com/moostyle",
        "https://instagram.com/moostyle",
        "https://discord.gg/moostyle"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "hello@moocalf.com"
      }
    };

    // Add Website schema
    const websiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "MOOSTYLE",
      "url": siteUrl,
      "description": finalDescription,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/shopping?search={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    const structuredData = [baseData, websiteData];

    // Add Product schema if product data is provided
    if (product) {
      const productData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image.startsWith('http') ? product.image : `${siteUrl}${product.image}`,
        "url": `${siteUrl}/product/${product.id}`,
        "brand": {
          "@type": "Brand",
          "name": product.brand || "MOOSTYLE"
        },
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "USD",
          "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "seller": {
            "@type": "Organization",
            "name": "MOOSTYLE"
          }
        },
        "aggregateRating": product.rating ? {
          "@type": "AggregateRating",
          "ratingValue": product.rating,
          "reviewCount": product.reviewCount || 0
        } : undefined,
        "category": product.category || "Fashion & Beauty"
      };
      
      if (product.originalPrice && product.originalPrice > product.price) {
        productData.offers.priceValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      }
      
      structuredData.push(productData);
    }

    // Add Article schema if article data is provided
    if (article) {
      const articleData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title || finalTitle,
        "description": article.description || finalDescription,
        "image": article.image ? (article.image.startsWith('http') ? article.image : `${siteUrl}${article.image}`) : finalImage,
        "url": finalUrl,
        "author": {
          "@type": "Person",
          "name": article.author || author
        },
        "publisher": {
          "@type": "Organization",
          "name": "MOOSTYLE",
          "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/projects/Brand Medias/Logos/MooStyle Logo.png`
          }
        },
        "datePublished": article.publishedTime || new Date().toISOString(),
        "dateModified": article.modifiedTime || article.publishedTime || new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": finalUrl
        }
      };
      
      if (article.tags && article.tags.length > 0) {
        articleData.keywords = article.tags.join(", ");
      }
      
      structuredData.push(articleData);
    }

    // Add CollectionPage schema for category pages
    if (category) {
      const collectionData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${category.name} - MOOSTYLE`,
        "description": category.description,
        "url": finalUrl,
        "mainEntity": {
          "@type": "ItemList",
          "name": `${category.name} Products`,
          "description": category.description
        }
      };
      
      structuredData.push(collectionData);
    }

    return structuredData;
  };

  const structuredData = generateStructuredData();

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={finalCanonical} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {!noindex && <meta name="robots" content="index,follow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Open Graph for products */}
      {product && (
        <>
          <meta property="og:price:amount" content={product.price} />
          <meta property="og:price:currency" content="USD" />
          <meta property="product:brand" content={product.brand || "MOOSTYLE"} />
          <meta property="product:availability" content={product.inStock ? "in stock" : "out of stock"} />
          <meta property="product:condition" content="new" />
          <meta property="product:price:amount" content={product.price} />
          <meta property="product:price:currency" content="USD" />
        </>
      )}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTwitterTitle} />
      <meta name="twitter:description" content={finalTwitterDescription} />
      <meta name="twitter:image" content={finalTwitterImage} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#0d9488" />
      <meta name="msapplication-TileColor" content="#0d9488" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Structured Data */}
      {structuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export { Metadata };