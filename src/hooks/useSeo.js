import { useEffect } from 'react';
import { pageUrl } from '../seo';

function setTag(selector, create, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', value);
}

const meta = (attr, name) => () => {
  const el = document.createElement('meta');
  el.setAttribute(attr, name);
  return el;
};

/**
 * Mantiene título, description, canonical y Open Graph al navegar entre páginas.
 * El HTML prerenderizado ya trae estos valores; esto cubre la navegación del lado del cliente.
 */
export function useSeo(page) {
  useEffect(() => {
    const url = pageUrl(page);
    document.title = page.title;
    setTag('meta[name="description"]', meta('name', 'description'), page.description);
    setTag(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
      url,
    );
    setTag('meta[property="og:title"]', meta('property', 'og:title'), page.title);
    setTag('meta[property="og:description"]', meta('property', 'og:description'), page.description);
    setTag('meta[property="og:url"]', meta('property', 'og:url'), url);
    setTag('meta[name="twitter:title"]', meta('name', 'twitter:title'), page.title);
    setTag(
      'meta[name="twitter:description"]',
      meta('name', 'twitter:description'),
      page.description,
    );
  }, [page]);
}
