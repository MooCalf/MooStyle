// Build-time prerender: renders every known route to static HTML so each page
// ships with its own title/description/OG tags instead of one generic shell.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');
const SITE_URL = 'https://moostyles.com';

const { render, getStaticRoutes } = await import(pathToFileURL(ssrEntry).href);

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const helmetToHead = (helmet) =>
  [helmet.title, helmet.meta, helmet.link, helmet.script]
    .map((tag) => tag.toString())
    .join('\n');

// renderToString (React 19's legacy, non-streaming SSR API — all we need for
// a one-shot build-time prerender) auto-generates <link rel="preload" as="image">
// resource hints for <img> tags, but — unlike the streaming APIs — inlines them
// as a literal leading run of siblings in the returned string instead of routing
// them to <head>. Left in place, the client's fresh render never produces those
// <link> elements at that position, so hydrateRoot sees a mismatched first child
// and discards the whole tree. Split them out and place them in <head>, where
// preload hints belong anyway.
const splitLeadingPreloadLinks = (html) => {
  const match = html.match(/^(?:<link[^>]*\/>)+/);
  if (!match) return { links: '', rest: html };
  return { links: match[0], rest: html.slice(match[0].length) };
};

const writeRoute = (routePath, html) => {
  const outDir =
    routePath === '/' ? distDir : path.join(distDir, routePath.replace(/^\//, ''));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
};

const renderPage = (routePath) => {
  const { appHtml, helmet } = render(routePath);
  const { links, rest } = splitLeadingPreloadLinks(appHtml);
  const head = helmetToHead(helmet) + (links ? '\n' + links : '');
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', rest);
};

const routes = getStaticRoutes();
let count = 0;

for (const routePath of routes) {
  writeRoute(routePath, renderPage(routePath));
  count += 1;
}

// 404.html: served automatically by static hosts (Cloudflare Pages, Netlify,
// GitHub Pages) for any path not present in dist/. Since it's the same SPA
// shell, BrowserRouter picks up the real path client-side once it loads.
fs.writeFileSync(
  path.join(distDir, '404.html'),
  renderPage('/this-page-does-not-exist'),
  'utf-8'
);

// Regenerate sitemap.xml from the same manifest so it can't drift out of sync
// with real product/brand data (the static copy was hardcoded/stale).
const today = new Date().toISOString().slice(0, 10);
const sitemapEntries = routes
  .filter((r) => r !== '/saved-products')
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r === '/' ? '/' : r}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${r === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8');

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });

console.log(`Prerendered ${count} routes + 404.html + sitemap.xml`);
