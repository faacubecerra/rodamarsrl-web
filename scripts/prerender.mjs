// Prerenderiza cada ruta a HTML estático (SEO) tras `vite build` y el build SSR.
// Genera además 404.html, sitemap.xml y robots.txt en dist/.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

process.env.NODE_ENV = 'production'; // React SSR en modo producción

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-server');

const { render, renderHead, PAGES, SITE_URL } = await import(
  pathToFileURL(join(ssrDir, 'entry-server.js')).href
);

const template = await readFile(join(dist, 'index.html'), 'utf8');

function fill(head, app = '') {
  return template.replace('<!--seo-head-->', head).replace('<!--app-html-->', app);
}

// React 19 emite <link rel="preload"> (imagen LCP, logo) al inicio del HTML de la app:
// se mueven al <head>, que es donde el navegador los descubre primero.
function extractPreloads(appHtml) {
  const preloads = appHtml.match(/^(?:<link rel="preload"[^>]*>)+/)?.[0] ?? '';
  return { preloads, app: appHtml.slice(preloads.length) };
}

for (const page of Object.values(PAGES)) {
  const { preloads, app } = extractPreloads(render(page.path.replace(/\/$/, '') || '/'));
  const html = fill(`${renderHead(page)}\n    ${preloads}`, app);
  const file = page.path === '/' ? 'index.html' : join(page.path, 'index.html');
  const target = join(dist, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
  console.log(`prerender  ${page.path.padEnd(18)} -> ${file}`);
}

// Fallback de hosting (GitHub Pages): shell vacío, no indexable.
await writeFile(
  join(dist, '404.html'),
  fill(
    '<title>Página no encontrada — Rodamar SRL</title>\n    <meta name="robots" content="noindex" />',
  ),
);

const today = new Date().toISOString().slice(0, 10);
const urls = Object.values(PAGES)
  .map((page) => `  <url>\n    <loc>${SITE_URL}${page.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n');
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
await writeFile(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

await rm(ssrDir, { recursive: true, force: true });
console.log(`sitemap.xml, robots.txt y 404.html generados (SITE_URL=${SITE_URL})`);
