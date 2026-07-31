import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { getAllMods, getCollections, getGalleryEntries } from './lib/mods';
import { slugify } from './lib/slugify';

export function render(url) {
  const helmetContext = {};

  const appHtml = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );

  return { appHtml, helmet: helmetContext.helmet };
}

const STATIC_PATHS = [
  '/',
  '/home',
  '/support',
  '/saved-products',
  '/privacy-policy',
  '/terms-of-service',
  '/offline',
  '/links',
  '/brands',
  '/mods',
  '/collections',
  '/archive',
  '/about',
  '/common-questions',
  '/blog',
  '/gallery',
];

export function getStaticRoutes() {
  const mods = getAllMods();
  const collections = getCollections();
  const galleryEntries = getGalleryEntries();

  const modPaths = mods.flatMap((mod) => [
    `/mods/${mod.slug}`,
    `/product/${mod.legacyId}`,
  ]);

  const collectionPaths = collections.flatMap((collection) => [
    `/collections/${slugify(collection)}`,
    `/brand/${collection}`,
  ]);

  const galleryPaths = galleryEntries.map((entry) => `/gallery/${entry.key}`);

  return [...STATIC_PATHS, ...modPaths, ...collectionPaths, ...galleryPaths];
}
