import { Link } from "react-router-dom";
import { NavigationBar } from "@/Components/NavigationBar";
import { Footer } from "@/Components/Footer";
import { WebsiteBackground } from "@/Components/WebsiteBackground";
import { Metadata } from "@/Components/Metadata.jsx";
import { getGalleryEntries } from "@/lib/mods";

// Real grid of in-game screenshots already present in mod content files
// (media.screenshots), per newdesign-layout Section 3 sequencing.
export const Gallery = () => {
  const entries = getGalleryEntries();

  return (
    <div className="min-h-screen">
      <Metadata
        pageTitle="Gallery | MOOSTYLES"
        pageDescription="In-game screenshots from MOOSTYLES InZOI mods."
        canonical="/gallery"
      />
      <WebsiteBackground />
      <NavigationBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="mod-detail__title newdesign-heading">Gallery</h1>
        {entries.length > 0 ? (
          <div className="gallery-teaser__grid gallery-page__grid">
            {entries.map((entry) => (
              <Link to={`/gallery/${entry.key}`} key={entry.key} className="gallery-teaser__item">
                <img src={entry.src} alt={entry.modName} loading="lazy" />
                <span>{entry.modName}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mod-detail__empty-state">No gallery entries yet.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};
