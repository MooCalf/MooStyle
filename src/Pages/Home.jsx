import { NavigationBar } from "@/Components/NavigationBar";
import { Metadata } from "@/Components/Metadata";
import { HeroSection } from "@/Components/HomepageComponents/HeroSection";
import { Pitch } from "@/Components/HomepageComponents/Pitch";
import { ContactSection } from "@/Components/HomepageComponents/ContactSection";
import { Footer } from "@/Components/Footer";
import { WebsiteBackground } from "@/Components/WebsiteBackground";

export const Home = () => (
  <>
    <Metadata
      pageTitle="MOOSTYLE | Free InZOI Mods, Archive Builds, and Creator Updates"
      pageDescription="Explore free InZOI mods, archived builds, and creator updates from MOOSTYLE. Browse custom brands, decor sets, and downloadable content made for InZOI players."
      keywords="MOOSTYLE, free InZOI mods, InZOI custom content, InZOI downloads, archive builds, InZOI decor mods, InZOI brand packs"
      canonical="/"
      ogUrl="/"
    />

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
  </>
);