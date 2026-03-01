import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "MOOSTYLE - InZOI Mods & Creator Platform",
  description = "Discover high-quality InZOI mods, creator resources, and community content at MOOSTYLE. Free downloads, support, and curated mod collections.",
  keywords = "InZOI mods, MOOSTYLE, game mods, free mods, creator resources, mod downloads, InZOI custom content",
  image = "/projects/Website Branding/MOOSTYLESBANNER.png",
  url = "",
  type = "website",
  author = "MooCalf",
  publishedTime = "",
  modifiedTime = "",
  section = "",
  tags = [],
  noindex = false,
  canonical = ""
}) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://moostyle.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const canonicalUrl = canonical || fullUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {!noindex && <meta name="robots" content="index,follow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="MOOSTYLE" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#0d9488" />
      <meta name="msapplication-TileColor" content="#0d9488" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MOOSTYLE",
          "url": siteUrl,
          "logo": `${siteUrl}/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png`,
          "description": "Creator platform for high-quality InZOI mods and downloadable content.",
          "sameAs": [
            "https://discord.gg/moostyle"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "hello@moocalf.com"
          }
        })}
      </script>
      
      {/* Structured Data - Website */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MOOSTYLE",
          "url": siteUrl,
          "description": description
        })}
      </script>
      
      {/* Structured Data - Article (if applicable) */}
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": fullImage,
            "url": fullUrl,
            "author": {
              "@type": "Person",
              "name": author
            },
            "publisher": {
              "@type": "Organization",
              "name": "MOOSTYLE",
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png`
              }
            },
            "datePublished": publishedTime,
            "dateModified": modifiedTime || publishedTime,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": fullUrl
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
