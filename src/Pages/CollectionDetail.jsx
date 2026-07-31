import { useParams, Link } from "react-router-dom";
import { NavigationBar } from "@/Components/NavigationBar";
import { Footer } from "@/Components/Footer";
import { WebsiteBackground } from "@/Components/WebsiteBackground";
import { Metadata } from "@/Components/Metadata.jsx";
import { ProductCard } from "@/Components/ProductCard";
import { Breadcrumb } from "@/Components/mods/Breadcrumb";
import { getCollections, getModsByCollection } from "@/lib/mods";
import { slugify } from "@/lib/slugify";

const toLegacyCard = (mod) => ({
  id: mod.legacyId,
  slug: mod.slug,
  name: mod.name,
  brand: mod.collection || "Archive",
  image: mod.media.banner,
  images: [mod.media.banner, ...mod.media.previews],
  isNew: mod.legacy.isNew,
});

export const CollectionDetail = () => {
  const params = useParams();
  const routeId = params.slug ?? params.id;
  const collectionName = getCollections().find(
    (name) => slugify(name) === slugify(decodeURIComponent(routeId || ""))
  );
  const mods = collectionName ? getModsByCollection(collectionName) : [];

  if (!collectionName) {
    return (
      <div className="min-h-screen">
        <WebsiteBackground />
        <NavigationBar />
        <Metadata pageTitle="Collection Not Found | MOOSTYLES" noindex />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Collection Not Found</h1>
          <p className="text-gray-600 mb-6">The collection "{routeId}" doesn't exist.</p>
          <Link to="/collections" className="text-teal-600 font-semibold">
            Browse all collections
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const description = `${mods.length} mod${mods.length === 1 ? "" : "s"} from the ${collectionName} collection.`;

  return (
    <div className="min-h-screen">
      <Metadata
        pageTitle={`${collectionName} | MOOSTYLES`}
        pageDescription={description}
        canonical={`/collections/${slugify(collectionName)}`}
        category={{ name: collectionName, description }}
      />

      <WebsiteBackground />
      <NavigationBar />

      <div className="collection-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb to="/collections" label="Collections" />
          <h1 className="collection-banner__title newdesign-heading newdesign-brand-label">
            {collectionName}
          </h1>
          <p className="collection-banner__description">{description}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {mods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mods.map((mod) => (
              <ProductCard key={mod.slug} product={toLegacyCard(mod)} />
            ))}
          </div>
        ) : (
          <p className="mod-detail__empty-state">No mods in this collection yet.</p>
        )}
      </main>

      <Footer />
    </div>
  );
};
