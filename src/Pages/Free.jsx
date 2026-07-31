import { NavigationBar } from "@/Components/NavigationBar";
import { Footer } from "@/Components/Footer";
import { WebsiteBackground } from "@/Components/WebsiteBackground";
import { Metadata } from "@/Components/Metadata.jsx";
import { ProductCard } from "@/Components/ProductCard";
import { getPubliclyAvailableMods } from "@/lib/mods";

const toLegacyCard = (mod) => ({
  id: mod.legacyId,
  slug: mod.slug,
  name: mod.name,
  brand: mod.collection || "Archive",
  image: mod.media.banner,
  images: [mod.media.banner, ...mod.media.previews],
  isNew: mod.legacy.isNew,
});

// Index of everything currently past its public release date, per Section 2
// route inventory.
export const Free = () => {
  const mods = getPubliclyAvailableMods();

  return (
    <div className="min-h-screen">
      <Metadata
        pageTitle="Free Downloads | MOOSTYLES"
        pageDescription="Every InZOI mod currently available as a free public download on MOOSTYLES."
        canonical="/free"
      />
      <WebsiteBackground />
      <NavigationBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="mod-detail__title newdesign-heading newdesign-brand-label">
          Free Downloads
        </h1>
        {mods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {mods.map((mod) => (
              <ProductCard key={mod.slug} product={toLegacyCard(mod)} />
            ))}
          </div>
        ) : (
          <p className="mod-detail__empty-state mt-8">No free downloads available yet.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};
