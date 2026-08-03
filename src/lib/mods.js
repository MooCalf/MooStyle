const modules = import.meta.glob("/src/content/mods/*.json", { eager: true });

const allMods = Object.values(modules)
  .map((mod) => mod.default ?? mod)
  .sort((a, b) => a.name.localeCompare(b.name));

for (const mod of allMods) {
  if (!Array.isArray(mod.fileManifest) || mod.fileManifest.length === 0) {
    throw new Error(`Mod "${mod.slug}" has an empty fileManifest.`);
  }
}

const bySlug = new Map(allMods.map((mod) => [mod.slug, mod]));
const byLegacyId = new Map(allMods.map((mod) => [mod.legacyId, mod]));

export const getAllMods = () => allMods;

export const getActiveMods = () => allMods.filter((mod) => !mod.legacy.isArchiveItem);

export const getModBySlug = (slug) => bySlug.get(slug) ?? null;

export const getModByAnyId = (idOrSlug) =>
  bySlug.get(idOrSlug) ?? byLegacyId.get(idOrSlug) ?? null;

export const getPubliclyAvailableMods = () => {
  const now = Date.now();
  return allMods.filter((mod) => {
    const publicDate = mod.downloadOptions.public?.date;
    if (!mod.downloadOptions.public?.url) return false;
    if (!publicDate) return true;
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

export const getGalleryEntries = () =>
  allMods.flatMap((mod) =>
    mod.media.screenshots.map((src, index) => ({
      src,
      modName: mod.name,
      modSlug: mod.slug,
      key: `${mod.slug}-${index}`,
    }))
  );
