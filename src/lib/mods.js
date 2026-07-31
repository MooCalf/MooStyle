// Loads every mod content file (src/content/mods/*.json) at build time via
// import.meta.glob, and exposes lookup helpers. This is the single source of
// truth for mod/collection data; shoppingData.js and archive.js are thin
// legacy-shaped shims over this module so existing pages keep working while
// they're migrated to consume mods.js directly.
const modules = import.meta.glob("/src/content/mods/*.json", { eager: true });

const allMods = Object.values(modules)
  .map((mod) => mod.default ?? mod)
  .sort((a, b) => a.name.localeCompare(b.name));

// Every mod must ship a non-empty file manifest. Thrown at module load
// (which happens during both the client and SSR builds) so an empty
// manifest fails the build rather than silently rendering blank.
for (const mod of allMods) {
  if (!Array.isArray(mod.fileManifest) || mod.fileManifest.length === 0) {
    throw new Error(`Mod "${mod.slug}" has an empty fileManifest.`);
  }
}

const bySlug = new Map(allMods.map((mod) => [mod.slug, mod]));
const byLegacyId = new Map(allMods.map((mod) => [mod.legacyId, mod]));

export const getAllMods = () => allMods;

export const getActiveMods = () => allMods.filter((mod) => !mod.legacy.isArchiveItem);

export const getArchivedMods = () => allMods.filter((mod) => mod.legacy.isArchiveItem);

export const getModBySlug = (slug) => bySlug.get(slug) ?? null;

export const getModByLegacyId = (legacyId) => byLegacyId.get(legacyId) ?? null;

// Accepts either a current slug or a legacy id, since /mods/:slug and
// /product/:id are dual-mounted onto the same page component.
export const getModByAnyId = (idOrSlug) =>
  bySlug.get(idOrSlug) ?? byLegacyId.get(idOrSlug) ?? null;

export const getCollections = () => {
  const names = new Set(allMods.map((mod) => mod.collection).filter(Boolean));
  return [...names].sort();
};

export const getModsByCollection = (collection) =>
  allMods.filter(
    (mod) => (mod.collection || "").toLowerCase() === (collection || "").toLowerCase()
  );

export const getPubliclyAvailableMods = () => {
  const now = Date.now();
  return allMods.filter((mod) => {
    const publicDate = mod.downloadOptions.public?.date;
    if (!mod.downloadOptions.public?.url) return false;
    if (!publicDate) return true; // no tracked date = already available
    return new Date(publicDate).getTime() <= now;
  });
};

export const getRelatedMods = (slug, limit = 4) => {
  const mod = getModByAnyId(slug);
  if (!mod) return [];
  return allMods
    .filter(
      (other) =>
        other.slug !== mod.slug &&
        (other.tags.some((tag) => mod.tags.includes(tag)) ||
          (mod.collection && other.collection === mod.collection))
    )
    .slice(0, limit);
};

// Flattens every mod's real in-game screenshots into a single list, for the
// /gallery page and its homepage teaser. No fabricated "posted date" is
// attached, since the source data has never tracked when a screenshot was
// taken or published.
export const getGalleryEntries = () =>
  allMods.flatMap((mod) =>
    mod.media.screenshots.map((src, index) => ({
      src,
      modName: mod.name,
      modSlug: mod.slug,
      key: `${mod.slug}-${index}`,
    }))
  );

export const searchMods = (query) => {
  if (!query) return allMods;
  const q = query.toLowerCase();
  return allMods.filter(
    (mod) =>
      mod.name.toLowerCase().includes(q) ||
      mod.description.toLowerCase().includes(q) ||
      (mod.collection || "").toLowerCase().includes(q) ||
      mod.tags.some((tag) => tag.toLowerCase().includes(q))
  );
};
