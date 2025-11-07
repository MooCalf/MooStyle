import { NavigationPrimary } from "@/Components/NavigationPrimary";
import { NavigationSecondary } from "@/Components/NavigationSecondary";
import { HeroSection } from "@/Components/HomepageComponents/HeroSection";
import { BrandCovers } from "@/Components/HomepageComponents/BrandCovers";
import { Recommended } from "@/Components/HomepageComponents/Recommended";
import { RecommendedCategories } from "@/Components/HomepageComponents/RecommendedCategories";
import { MoreBrands } from "@/Components/HomepageComponents/MoreBrands";
import { FeaturedCreators } from "@/Components/HomepageComponents/FeaturedCreators";
import { ContactSection } from "@/Components/HomepageComponents/ContactSection";
import { BetaTestingSection } from "@/Components/HomepageComponents/BetaTestingSection";
import { Background } from "@/Components/Background";
import { Footer } from "@/Components/Footer";
import { Metadata } from "@/Components/Metadata";
import { DevelopmentWarning } from "@/Components/DevelopmentWarning";

export const Home = () => (
  <>
    <Metadata
      pageTitle="MOOSTYLE - Digital Resources & Creator Platform"
      pageDescription="Discover premium digital resources, mods, and content from talented creators worldwide at MOOSTYLE. High-quality downloads, community-driven platform, free downloads, and more."
      ogTitle="MOOSTYLE - Digital Resources & Creator Platform"
      ogDescription="Discover premium digital resources, mods, and content from talented creators worldwide. High-quality downloads, community-driven platform."
      ogImage="/projects/Brand Medias/Promotional Content/Promo Poster.png"
      ogType="website"
      keywords="digital resources, creator platform, mods, downloads, user-generated content, content marketplace, fashion mods, beauty products, lifestyle items, free downloads, modding community"
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
      
      {/* Development Warning Ribbon */}
      <DevelopmentWarning />
      
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
        
        {/* Recommended Section */}
        <Recommended />
        
        {/* More Brands Section */}
        <MoreBrands />
        
        {/* Featured Creators Section */}
        <FeaturedCreators />
        
        {/* Recommended Categories Section */}
        <RecommendedCategories />
        
        {/* Beta Testing Section */}
        <BetaTestingSection />
        
        {/* Contact Section */}
        <ContactSection />
        
        <Footer />
      </main>
    </div>
  </>
);