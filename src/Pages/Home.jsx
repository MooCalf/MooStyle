import { NavigationBar } from "@/Components/NavigationBar";
import { HeroSection } from "@/Components/HomepageComponents/HeroSection";
import { Pitch } from "@/Components/HomepageComponents/Pitch";
import { ContactSection } from "@/Components/HomepageComponents/ContactSection";
import { Footer } from "@/Components/Footer";
import { WebsiteBackground } from "@/Components/WebsiteBackground";

export const Home = () => (
  <div className="min-h-screen text-gray-900 relative">
    <WebsiteBackground />
    <NavigationBar />
    <main id="main-content">
      <HeroSection />
      <Pitch />
      <ContactSection />
      <Footer />
    </main>
  </div>
);