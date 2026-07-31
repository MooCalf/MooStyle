import { Link } from "react-router-dom";
import { NavigationBar } from "@/Components/NavigationBar";
import { Footer } from "@/Components/Footer";
import { WebsiteBackground } from "@/Components/WebsiteBackground";
import { Metadata } from "@/Components/Metadata.jsx";
import { getCollections, getModsByCollection } from "@/lib/mods";
import { slugify } from "@/lib/slugify";

// Dense text link list, not a thumbnail grid, per newdesign-layout Section 4:
// brand/collection index lists should be scannable and load instantly.
export const CollectionsIndex = () => {
  const collections = getCollections();

  return (
    <div className="min-h-screen">
      <Metadata
        pageTitle="Collections | MOOSTYLES"
        pageDescription="Browse every mod collection on MOOSTYLES."
        canonical="/collections"
      />

      <WebsiteBackground />
      <NavigationBar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="mod-detail__title newdesign-heading newdesign-brand-label">Collections</h1>

        {collections.length > 0 ? (
          <ul className="collections-index__list">
            {collections.map((collection) => {
              const count = getModsByCollection(collection).length;
              return (
                <li key={collection} className="collections-index__item">
                  <Link to={`/collections/${slugify(collection)}`} className="collections-index__link">
                    {collection}
                  </Link>
                  <span className="collections-index__count">
                    {count} mod{count === 1 ? "" : "s"}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mod-detail__empty-state">No collections yet.</p>
        )}
      </main>

      <Footer />
    </div>
  );
};
