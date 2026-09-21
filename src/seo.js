import { FAQS } from './data/faqs';

// URL pública definitiva del sitio (sin barra final). Se define al compilar con
// VITE_SITE_URL. Mientras el dominio no esté decidido, se asume el dominio de la empresa.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://rodamar.com.ar').replace(
  /\/$/,
  '',
);

export const SITE_NAME = 'Rodamar SRL';
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const LOGO = `${SITE_URL}/logo.png`;

// Rutas con barra final: es cómo GitHub Pages sirve `carpeta/index.html`.
export const PAGES = {
  home: {
    path: '/',
    title: 'Rodamientos y retenes en Rosario | Mayorista — Rodamar SRL',
    description:
      'Mayorista de rodamientos y retenes en Rosario desde 2003. NTN, TIMKEN, INA, FAG y más para industria, agro y automotor. Envíos a todo el país.',
    breadcrumb: 'Inicio',
  },
  quienesSomos: {
    path: '/quienes-somos/',
    title: 'Quiénes somos | Rodamar SRL, rodamientos desde 2003',
    description:
      'Más de 20 años distribuyendo rodamientos y retenes desde Rosario: depósito propio de +1.200 m² con WMS y un equipo de más de 20 personas.',
    breadcrumb: 'Quiénes somos',
  },
  productos: {
    path: '/productos/',
    title: 'Rodamientos, retenes y marcas: NTN, TIMKEN, INA, FAG | Rodamar',
    description:
      'Rodamientos, retenes y repuestos para industria, agro y automotor. Marcas Premium (NTN, TIMKEN, INA, FAG), intermedias (ZKL, DBH) y LuK. Stock y pedidos en la App.',
    breadcrumb: 'Productos',
  },
  contacto: {
    path: '/contacto/',
    title: 'Contacto y ubicación en Rosario | Rodamar SRL',
    description:
      'Uriburu 3585, Rosario, Santa Fe. Lunes a viernes de 08:30 a 13:00 y de 13:45 a 18:00. Tel. +54 9 341 435-1216, WhatsApp +54 9 341 260-8989 o ventas@rodamar.com.ar.',
    breadcrumb: 'Contacto',
  },
};

export const pageUrl = (page) => `${SITE_URL}${page.path}`;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const organization = {
  '@type': 'LocalBusiness',
  '@id': ORG_ID,
  name: SITE_NAME,
  legalName: 'Rodamar SRL',
  url: `${SITE_URL}/`,
  logo: LOGO,
  image: OG_IMAGE,
  description:
    'Distribuidor mayorista de rodamientos y retenes en Rosario, Argentina, desde 2003. Vende a industria, agro y automotor en todo el país.',
  foundingDate: '2003',
  email: 'ventas@rodamar.com.ar',
  telephone: ['+5493414351216', '+5493414180100', '+5493412608989'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Uriburu 3585',
    addressLocality: 'Rosario',
    addressRegion: 'Santa Fe',
    addressCountry: 'AR',
  },
  areaServed: { '@type': 'Country', name: 'Argentina' },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '13:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '13:45',
      closes: '18:00',
    },
  ],
  knowsAbout: ['Rodamientos', 'Retenes', 'Repuestos automotor', 'Rodamientos industriales'],
  brand: ['NTN', 'TIMKEN', 'INA', 'FAG', 'NSK', 'ZKL', 'DBH', 'LuK'].map((name) => ({
    '@type': 'Brand',
    name,
  })),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+5493412608989',
    email: 'ventas@rodamar.com.ar',
    areaServed: 'AR',
    availableLanguage: 'es',
  },
};

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: 'es-AR',
  publisher: { '@id': ORG_ID },
};

function webPage(page, type = 'WebPage') {
  return {
    '@type': type,
    '@id': `${pageUrl(page)}#webpage`,
    url: pageUrl(page),
    name: page.title,
    description: page.description,
    inLanguage: 'es-AR',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
  };
}

function breadcrumbs(page) {
  const items = [PAGES.home];
  if (page !== PAGES.home) items.push(page);
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.breadcrumb,
      item: pageUrl(item),
    })),
  };
}

const faqPage = {
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

/** Grafo JSON-LD (schema.org) de una página. */
export function getJsonLd(page) {
  const graph = [organization, website];
  if (page === PAGES.home) {
    graph.push(webPage(page));
  } else if (page === PAGES.quienesSomos) {
    graph.push(webPage(page, 'AboutPage'), breadcrumbs(page));
  } else if (page === PAGES.contacto) {
    graph.push(webPage(page, 'ContactPage'), breadcrumbs(page), faqPage);
  } else {
    graph.push(webPage(page, 'CollectionPage'), breadcrumbs(page));
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
