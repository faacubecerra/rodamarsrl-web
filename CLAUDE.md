# Rodamar SRL — Instrucciones para Claude Code

Leé @BRIEF.md antes de crear o modificar cualquier componente — ahí está el copy
real, los colores exactos y la estructura de las 4 páginas.

## Reglas rápidas
- Celeste (--primary): navegación y acceso a la App.
- Rojo (--accent): SOLO para botones de acción (WhatsApp, enviar consulta, pedidos).
  No usarlo en ningún otro lugar.
- Negro/--ink con moderación, nunca como fondo grande.
- No inventar datos de la empresa que no estén en BRIEF.md — si falta algo, preguntame.
## SEO (prerender)
- `npm run build` = build cliente + build SSR + `scripts/prerender.mjs`: genera HTML estático por
  ruta, `404.html` (noindex), `sitemap.xml` y `robots.txt`. Los títulos/descriptions de cada
  página y el JSON-LD viven en `src/seo.js` (pisan los títulos de pestaña del BRIEF).
- Al agregar una página: sumarla a `PAGES` en `src/seo.js`, a `AppRoutes` en `src/App.jsx` y usar
  `useSeo(PAGES.x)`. Nada que dependa de `window`/`localStorage` en el primer render (hidratación).
- Dominio: definir `VITE_SITE_URL` (y `SITE_BASE=/` si hay dominio propio) al compilar.
