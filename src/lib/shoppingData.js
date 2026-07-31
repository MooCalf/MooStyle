// Legacy-shaped shim over src/lib/mods.js. Existing consumers (ProductCard,
// ProductDetail, BrandDetail, InZOI, AdvancedSearch, useProductData) expect
// the old { id, brand, image, images, downloadlink, patreonlink, ... }
// product shape; this file translates the new mod content model into that
// shape so those pages keep working unmodified while they're migrated to
// consume mods.js directly. New code should import from "@/lib/mods" instead.
import {
  getActiveMods,
  getModByAnyId,
  getRelatedMods as getRelatedModsFromStore,
} from "@/lib/mods";

const toLegacyProduct = (mod) => {
  const images = [mod.media.banner, ...mod.media.previews].filter(Boolean);
  const downloadLink = mod.downloadOptions.public?.url ?? null;
  const patreonLink = mod.downloadOptions.patreonUrl ?? null;
  return {
    id: mod.legacyId,
    slug: mod.slug,
    name: mod.name,
    brand: mod.collection || "Archive",
    category: mod.legacy.isArchiveItem ? "archive" : "inZOI",
    image: images[0] || "",
    images,
    description: mod.description,
    detailedDescription: mod.description,
    features: mod.highlights || [],
    tags: mod.tags.length ? mod.tags : mod.legacy.isArchiveItem ? ["archive"] : [],
    isNew: mod.legacy.isNew,
    downloadlink: downloadLink,
    downloadLink,
    patreonlink: patreonLink,
    patreonLink,
    howToUse: (mod.installation || []).join("\n\n"),
  };
};

export const getAllProducts = () => getActiveMods().map(toLegacyProduct);

export const getProductsByCategory = () => getAllProducts();

export const getCategoryData = (category) =>
  category === "inZOI" ? { products: getAllProducts() } : null;

export const searchProducts = (query, filters = {}) => {
  let products = getAllProducts();

  if (query) {
    const q = query.toLowerCase();
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  if (filters.brand) {
    products = products.filter((product) =>
      product.brand.toLowerCase().includes(filters.brand.toLowerCase())
    );
  }

  if (filters.subcategory) {
    products = products.filter((product) => product.tags.includes(filters.subcategory));
  }

  return products;
};

export const getFilterOptions = () => {
  const products = getAllProducts();
  return {
    brands: [...new Set(products.map((p) => p.brand))].sort(),
    subcategories: [...new Set(products.flatMap((p) => p.tags))].sort(),
    priceRanges: [],
    ratings: [],
  };
};

export const getProductById = (id) => {
  const mod = getModByAnyId(id);
  return mod ? toLegacyProduct(mod) : null;
};

export const getRelatedProducts = (id, limit = 4) =>
  getRelatedModsFromStore(id, limit).map(toLegacyProduct);

export const getProductCategory = (id) => {
  const mod = getModByAnyId(id);
  if (!mod) return null;
  return mod.legacy.isArchiveItem ? "archive" : "inZOI";
};
