import { NavigationPrimary } from "@/Components/NavigationPrimary";
import { NavigationSecondary } from "@/Components/NavigationSecondary";
import { HeroSection } from "@/Components/HomepageComponents/HeroSection";
import { Regions } from "@/Components/HomepageComponents/Regions";
import { BrandCovers } from "@/Components/HomepageComponents/BrandCovers";
import { Recommended } from "@/Components/HomepageComponents/Recommended";
import { RecommendedCategories } from "@/Components/HomepageComponents/RecommendedCategories";
import { MoreBrands } from "@/Components/HomepageComponents/MoreBrands";
import { LocalArtisans } from "@/Components/HomepageComponents/LocalArtisans";
import { ContactSection } from "@/Components/HomepageComponents/ContactSection";
import { Background } from "@/Components/Background";
import { Footer } from "@/Components/Footer";
import SEO from "@/Components/SEO";

export const Home = () => (
  <>
    <SEO
      title="MOOSTYLE - Premier Asian Fashion & Beauty Platform | InZoi Mods"
      description="Discover the latest Asian fashion, beauty products, and lifestyle items at MOOSTYLE. High-quality InZoi mods, Korean skincare, Japanese streetwear, Chinese traditional items, and more. Free downloads, community-driven platform."
      keywords="Asian fashion, Korean beauty, Japanese streetwear, InZoi mods, K-beauty, Asian lifestyle, fashion mods, beauty products, Korean skincare, Japanese fashion, Chinese traditional, modding community, free mods"
      url="/"
      type="website"
    />
    
    {/* Skip Links for Accessibility */}
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
    <a href="#navigation" className="skip-link">
      Skip to navigation
    </a>
    
    <div className="min-h-screen text-gray-900 overflow-x-hidden relative">
      <Background showEffects={false} />
      
      {/* Navigation Bars */}
      <div id="navigation">
        <NavigationPrimary />
        <NavigationSecondary />
      </div>
      
      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section with Promotional Carousel */}
        <HeroSection />
        
        {/* Brand Covers Section */}
        <BrandCovers />
        
        {/* Regions Section */}
        <Regions />
        
        {/* Recommended Section */}
        <Recommended />
        
        {/* More Brands Section */}
        <MoreBrands />
        
        {/* Local Artisans Section */}
        <LocalArtisans />
        
        {/* Recommended Categories Section */}
        <RecommendedCategories />
        
              
        {/* Contact Section */}
        <ContactSection />
        
        <Footer />
      </main>
    </div>
  </>
);