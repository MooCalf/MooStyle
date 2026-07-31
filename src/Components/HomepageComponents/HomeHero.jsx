import { getCollections } from "@/lib/mods";

// Hero: brand statement plus a list of sub-brand/collection codes, per
// newdesign-layout Section 1.2 item 1.
export const HomeHero = () => {
  const collections = getCollections();

  return (
    <section className="home-hero">
      <p className="home-hero__eyebrow newdesign-brand-label">MOOSTYLES</p>
      <h1 className="home-hero__title newdesign-heading">
        Free InZOI mods, brand packs, and modding resources.
      </h1>
      {collections.length > 0 && (
        <p className="home-hero__collections newdesign-brand-label">{collections.join(" · ")}</p>
      )}
    </section>
  );
};
