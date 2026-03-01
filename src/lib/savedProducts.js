// Saved Products Management using cookies (2 year expiry)
// Stores an array of saved product IDs with timestamps in a cookie

import { getProductById } from "./shoppingData";

const STORAGE_KEY = 'moostyle_saved_products';
const EXPIRATION_DAYS = 365 * 2; // 2 years

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (!match) return null;
  return decodeURIComponent(match[2]);
}

function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

function nowISO() {
  return new Date().toISOString();
}

function defaultSavedEntry(id) {
  return {
    id,
    savedAt: nowISO(),
    expiresAt: new Date(Date.now() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000).toISOString()
  };
}

function loadRawSaved() {
  try {
    const raw = getCookie(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error parsing saved products cookie:', e);
    return [];
  }
}

function saveRawSaved(arr) {
  try {
    setCookie(STORAGE_KEY, JSON.stringify(arr), EXPIRATION_DAYS);
    window.dispatchEvent(new CustomEvent('savedProductsChanged'));
  } catch (e) {
    console.error('Error saving saved products cookie:', e);
  }
}

// Add a product id to saved list
export function saveProduct(product) {
  if (!product || !product.id) return false;
  const raw = loadRawSaved();
  const existing = raw.findIndex(e => e.id === product.id);
  if (existing !== -1) {
    raw[existing] = { ...raw[existing], savedAt: nowISO(), expiresAt: new Date(Date.now() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000).toISOString() };
  } else {
    raw.push(defaultSavedEntry(product.id));
  }
  saveRawSaved(raw);
  return true;
}

export function unsaveProduct(productId) {
  const raw = loadRawSaved();
  const filtered = raw.filter(e => e.id !== productId);
  if (filtered.length === raw.length) return false;
  saveRawSaved(filtered);
  return true;
}

export function isProductSaved(productId) {
  const raw = loadRawSaved();
  return raw.some(e => e.id === productId && new Date(e.expiresAt) > new Date());
}

export function getSavedProducts() {
  // Return current product objects for saved ids; remove expired or missing products
  const raw = loadRawSaved();
  const now = new Date();
  const valid = raw.filter(e => new Date(e.expiresAt) > now);
  // persist cleaned list
  if (valid.length !== raw.length) saveRawSaved(valid);

  const products = valid.map(entry => {
    const p = getProductById(entry.id);
    if (!p) return null;
    return { ...p, savedAt: entry.savedAt, expiresAt: entry.expiresAt };
  }).filter(Boolean);

  return products;
}

export function getSavedProductsCount() {
  return loadRawSaved().length;
}

export function getSavedProductsByCategory() {
  const products = getSavedProducts();
  const categories = {};
  products.forEach(product => {
    const category = product.category || 'uncategorized';
    categories[category] = categories[category] || [];
    categories[category].push(product);
  });
  return categories;
}

export function searchSavedProducts(query) {
  const products = getSavedProducts();
  if (!query || !query.trim()) return products;
  const term = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(term) ||
    (p.description || '').toLowerCase().includes(term) ||
    (p.brand || '').toLowerCase().includes(term) ||
    (p.tags || []).some(tag => tag.toLowerCase().includes(term))
  );
}

export function getStorageStats() {
  const raw = loadRawSaved();
  const storageSize = JSON.stringify(raw).length;
  const maxStorageSize = 5 * 1024 * 1024; // 5MB
  const storagePercentage = (storageSize / maxStorageSize) * 100;
  const totalSaved = raw.length;
  const expiringSoon = raw.filter(e => new Date(e.expiresAt) <= new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))).length;
  return { totalSaved, expiringSoon, storageSize, maxStorageSize, storagePercentage: Math.round(storagePercentage * 100) / 100, isNearLimit: storagePercentage > 80 };
}

export function clearAllSavedProducts() {
  deleteCookie(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('savedProductsChanged'));
}

// Keep an alias default export-like for existing imports
export const savedProductsManager = {
  saveProduct,
  unsaveProduct,
  isProductSaved,
  getSavedProducts,
  getSavedProductsCount,
  getSavedProductsByCategory,
  searchSavedProducts,
  getStorageStats,
  clearAllSavedProducts
};
