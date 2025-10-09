import { NavigationPrimary } from "@/Components/NavigationPrimary";
import { NavigationSecondary } from "@/Components/NavigationSecondary";
import { HeroSection } from "@/Components/HeroSection";
import { Regions } from "@/Components/Regions";
import { BrandCovers } from "@/Components/BrandCovers";
import { Recommended } from "@/Components/Recommended";
import { RecommendedCategories } from "@/Components/RecommendedCategories";
import { MoreBrands } from "@/Components/MoreBrands";
import { LocalArtisans } from "@/Components/LocalArtisans";
import { ContactSection } from "@/Components/ContactSection";
import { ThemeToggle } from "@/Components/ThemeToggle";
import { Background } from "@/Components/Background";
import { Footer } from "@/Components/Footer";
import { Metadata } from "@/Components/Metadata.jsx";

export const Home = () => (
  <>
    <Metadata 
      pageTitle="MooStyle - Asian Fashion & Beauty"
      pageDescription="Discover the latest Asian fashion, beauty products, and lifestyle items at MooStyle."
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
      <ThemeToggle />
      
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