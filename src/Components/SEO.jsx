import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_SITE_URL = 'https://moostyles.com';

const toAbsoluteUrl = (value, siteUrl, fallback = siteUrl) => {
  if (!value) {
    return fallback;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith('/')) {
    return `${siteUrl}${value}`;
  }

  return `${siteUrl}/${value}`;
};

const SEO = ({
  title = "MOOSTYLES | Free InZOI Mods, Archive Builds, and Creator Resources",
  description = "Browse free InZOI mods, archived builds, and creator updates from MOOSTYLES. Download brand packs, decor sets, and custom content built for InZOI.",
  keywords = "MOOSTYLES, InZOI mods, free InZOI mods, InZOI custom content, InZOI downloads, archive builds, decor mods, brand packs",
  image = "/projects/HeroSection/MOOSTYLESBANNER.png",
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
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : DEFAULT_SITE_URL;
  const fullUrl = toAbsoluteUrl(url, siteUrl, siteUrl);
  const fullImage = toAbsoluteUrl(image, siteUrl);
  const canonicalUrl = toAbsoluteUrl(canonical, siteUrl, fullUrl);

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
      <meta property="og:site_name" content="MOOSTYLES" />
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
          "name": "MOOSTYLES",
          "url": siteUrl,
          "logo": `${siteUrl}/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png`,
          "description": "Free InZOI mods, archive builds, and downloadable custom content from MOOSTYLES.",
          "sameAs": [
            "https://www.patreon.com/MOOSTYLES"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "hello@moostyles.com"
          }
        })}
      </script>
      
      {/* Structured Data - Website */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MOOSTYLES",
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
              "name": "MOOSTYLES",
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
