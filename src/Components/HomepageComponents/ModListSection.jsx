import { Link } from "react-router-dom";
import InZOIMods from "@/Components/InZOIMods";
import { getAllMods } from "@/lib/mods";

// Beneath the hero carousel, above the gallery teaser: 3 items per row, 2
// rows, then a View More button to /mods. Reuses InZOIMods, the image-card
// component the old /brands grid used to render mod cards (unused since
// that page was rebuilt as ModsIndex).
export const ModListSection = () => {
  const mods = getAllMods().slice(0, 6);
  if (!mods.length) return null;

  return (
    <section className="mod-list-section">
      <h2 className="mod-list-section__heading">Mod List</h2>
      <div className="mod-list-section__grid">
        {mods.map((mod) => (
          <InZOIMods
            key={mod.slug}
            item={{ name: mod.name, image: mod.media.banner }}
            href={`/mods/${mod.slug}`}
          />
        ))}
      </div>
      <div className="mod-list-section__footer">
        <Link to="/mods" className="mod-list-section__view-more">
          View More
        </Link>
      </div>
    </section>
  );
};
