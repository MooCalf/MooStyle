import { useMemo, useState } from "react";
import { NavigationBar } from "@/Components/NavigationBar";
import { Footer } from "@/Components/Footer";
import { WebsiteBackground } from "@/Components/WebsiteBackground";
import { Metadata } from "@/Components/Metadata.jsx";
import { ProductCard } from "@/Components/ProductCard";
import { getAllMods, getCollections } from "@/lib/mods";

const toLegacyCard = (mod) => ({
  id: mod.legacyId,
  slug: mod.slug,
  name: mod.name,
  brand: mod.collection || "Archive",
  image: mod.media.banner,
  images: [mod.media.banner, ...mod.media.previews],
  isNew: mod.legacy.isNew,
});

export const ModsIndex = () => {
  const [query, setQuery] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("");

  const allMods = useMemo(() => getAllMods(), []);
  const collections = useMemo(() => getCollections(), []);

  const filtered = allMods.filter((mod) => {
    const matchesQuery = !query || mod.name.toLowerCase().includes(query.toLowerCase());
    const matchesCollection = !collectionFilter || mod.collection === collectionFilter;
    return matchesQuery && matchesCollection;
  });

  return (
    <div className="min-h-screen">
      <Metadata
        pageTitle="All Mods | MOOSTYLES"
        pageDescription="Browse every InZOI mod available on MOOSTYLES, filterable by collection."
        canonical="/mods"
      />

      <WebsiteBackground />
      <NavigationBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="mod-detail__title newdesign-heading newdesign-brand-label">All Mods</h1>

        <div className="mods-index__filters">
          <input
            type="search"
            className="mods-index__search"
            placeholder="Search mods"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search mods"
          />
          <select
            className="mods-index__collection-select"
            value={collectionFilter}
            onChange={(event) => setCollectionFilter(event.target.value)}
            aria-label="Filter by collection"
          >
            <option value="">All collections</option>
            {collections.map((collection) => (
              <option key={collection} value={collection}>
                {collection}
              </option>
            ))}
          </select>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {filtered.map((mod) => (
              <ProductCard key={mod.slug} product={toLegacyCard(mod)} />
            ))}
          </div>
        ) : (
          <p className="mod-detail__empty-state mt-8">No mods match your search.</p>
        )}
      </main>

      <Footer />
    </div>
  );
};
