// Legacy-shaped shim over src/lib/mods.js. See shoppingData.js for why this
// exists. New code should import from "@/lib/mods" instead.
import { getArchivedMods, getModByAnyId, searchMods } from "@/lib/mods";

const toLegacyArchiveItem = (mod) => {
  const images = [mod.media.banner, ...mod.media.previews].filter(Boolean);
  const downloadLink = mod.downloadOptions.public?.url ?? null;
  const patreonLink = mod.downloadOptions.patreonUrl ?? null;
  return {
    id: mod.legacyId,
    slug: mod.slug,
    name: mod.name,
    image: images[0] || "",
    images,
    description: mod.description,
    isNew: mod.legacy.isNew,
    downloadlink: downloadLink,
    downloadLink,
    patreonlink: patreonLink,
    patreonLink,
  };
};

export const getAllArchives = () => getArchivedMods().map(toLegacyArchiveItem);

export const getArchiveById = (id) => {
  const mod = getModByAnyId(id);
  return mod && mod.legacy.isArchiveItem ? toLegacyArchiveItem(mod) : null;
};

export const searchArchives = (query) =>
  searchMods(query)
    .filter((mod) => mod.legacy.isArchiveItem)
    .map(toLegacyArchiveItem);

export default getAllArchives;
