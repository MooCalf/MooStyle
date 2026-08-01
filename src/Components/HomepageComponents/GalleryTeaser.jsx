import { Link } from "react-router-dom";
import { getGalleryEntries } from "@/lib/mods";

// Section 1.2 item 8. bank42n shows the three most recent entries with a
// posted date; MOOSTYLES has never tracked when a screenshot was taken or
// published, so entries are shown without a fabricated date rather than
// claiming a false "recency."
export const GalleryTeaser = () => {
  const entries = getGalleryEntries().slice(0, 3);

  return (
    <section className="gallery-teaser">
      <h1 className="gallery-teaser__heading newdesign-heading">Gallery</h1>
      {entries.length > 0 ? (
        <div className="gallery-teaser__grid">
          {entries.map((entry) => (
            <Link to={`/mods/${entry.modSlug}`} key={entry.key} className="gallery-teaser__item">
              <img src={entry.src} alt={entry.modName} loading="lazy" />
              <span>{entry.modName}</span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="gallery-teaser__empty">No gallery entries yet.</p>
      )}
      <Link to="/gallery" className="gallery-teaser__link">
        View gallery
      </Link>
    </section>
  );
};
