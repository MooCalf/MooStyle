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
      pageTitle="MOOSTYLES | Free InZOI Mods, Downloads & Modding Community Platform"
      pageDescription="Discover and download high-quality InZOI mods at MOOSTYLES. Your ultimate destination for InZOI modding resources, archived builds, mod packs, and community updates. Free InZOI mods, custom content, and modding tutorials for all players."
      keywords="InZOI mods, free InZOI mods, InZOI mod downloads, modding InZOI, mods for InZOI, InZOI modding, InZOI mods website, InZOI custom content, MOOSTYLES, archived builds, mod packs, InZOI modding community, InZOI resources"
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