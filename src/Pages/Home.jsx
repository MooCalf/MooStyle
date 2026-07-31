import { NavigationBar } from "@/Components/NavigationBar";
import { Metadata } from "@/Components/Metadata";
import { HomeHero } from "@/Components/HomepageComponents/HomeHero";
import { EarlyAccessBand } from "@/Components/HomepageComponents/EarlyAccessBand";
import { MembershipSection } from "@/Components/HomepageComponents/MembershipSection";
import { FeaturedCollections } from "@/Components/HomepageComponents/FeaturedCollections";
import { CharactersSection } from "@/Components/HomepageComponents/CharactersSection";
import { BlogTeaser } from "@/Components/HomepageComponents/BlogTeaser";
import { GalleryTeaser } from "@/Components/HomepageComponents/GalleryTeaser";
import { ComingSoonBand } from "@/Components/HomepageComponents/ComingSoonBand";
import { Footer } from "@/Components/Footer";
import { WebsiteBackground } from "@/Components/WebsiteBackground";

// Homepage section order follows newdesign-layout Section 1.2, minus the
// per-collection brand sections block (removed per request).
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
        <HomeHero />
        <EarlyAccessBand />
        <MembershipSection />
        <FeaturedCollections />
        <CharactersSection />
        <BlogTeaser />
        <GalleryTeaser />
        <ComingSoonBand />
        <Footer />
      </main>
    </div>
  </>
);
