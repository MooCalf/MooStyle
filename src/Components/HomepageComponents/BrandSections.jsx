import { Link } from "react-router-dom";
import { getCollections, getModsByCollection } from "@/lib/mods";
import { slugify } from "@/lib/slugify";

// One block per collection, each a flat text link list of product pages, no
// thumbnails, per Section 1.2 item 4 and the Section 4 layout rule.
export const BrandSections = () => {
  const collections = getCollections();
  if (!collections.length) return null;

  return (
    <section className="brand-sections">
      <h2 className="brand-sections__heading newdesign-heading">Collections</h2>
      {collections.map((collection) => (
        <div className="brand-sections__block" key={collection}>
          <h3 className="brand-sections__name newdesign-brand-label">
            <Link to={`/collections/${slugify(collection)}`}>{collection}</Link>
          </h3>
          <ul className="brand-sections__list">
            {getModsByCollection(collection).map((mod) => (
              <li key={mod.slug}>
                <Link to={`/mods/${mod.slug}`}>{mod.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};
