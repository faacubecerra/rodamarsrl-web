import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { BASENAME } from './basename';
import { PAGES, SITE_URL, OG_IMAGE, SITE_NAME, pageUrl, getJsonLd } from './seo';

export { PAGES, SITE_URL };

/** HTML de la app para una ruta ('/', '/contacto/', ...). */
export function render(path) {
  return renderToString(
    <StaticRouter basename={BASENAME} location={`${BASENAME}${path}`}>
      <AppRoutes />
    </StaticRouter>,
  );
}

const esc = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Etiquetas <head> de SEO (title, description, canonical, Open Graph, Twitter, JSON-LD). */
export function renderHead(page) {
  const url = pageUrl(page);
  return [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="es_AR" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Frente del depósito de Rodamar SRL en Rosario" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<script type="application/ld+json">${JSON.stringify(getJsonLd(page)).replace(/</g, '\u003c')}</script>`,
  ].join('\n    ');
}
