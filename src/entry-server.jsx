import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { getAllProducts } from './lib/shoppingData';
import { getAllArchives } from './lib/archive';

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
  '/archive',
  '/about',
  '/common-questions',
];

export function getStaticRoutes() {
  const products = getAllProducts();
  const archives = getAllArchives();

  const productPaths = [
    ...products.map((p) => `/product/${p.id}`),
    ...archives.map((a) => `/product/${a.id}`),
  ];

  const brandPaths = [...new Set(products.map((p) => p.brand))].map(
    (brand) => `/brand/${brand}`
  );

  return [...STATIC_PATHS, ...productPaths, ...brandPaths];
}
