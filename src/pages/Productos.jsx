import { useSeo } from '../hooks/useSeo';
import { PAGES } from '../seo';
import Button from '../components/Button';
import SegmentCard from '../components/SegmentCard';
import BrandBadge from '../components/BrandBadge';
import StepCard from '../components/StepCard';

import ntnLogo from '../assets/logos/ntn.png';
import timkenLogo from '../assets/logos/timken.svg';
import inaLogo from '../assets/logos/ina.png';
import fagLogo from '../assets/logos/fag.png';
import zklLogo from '../assets/logos/zkl.png';
import lukLogo from '../assets/logos/luk.png';
import dbhLogo from '../assets/logos/dbh.png';

import './Productos.css';

const APP_URL = 'https://app.rodamar.com.ar/login';

const SEGMENTS = [
  {
    accent: 'primary',
    title: 'Industria',
    text: 'Rodamientos y retenes para industrias usuarias y fabricantes de máquina-herramienta, con servicio 24/7 bajo contrato.',
    meta: 'Marcas típicas: NTN, TIMKEN, INA, FAG',
  },
  {
    accent: 'accent',
    title: 'Agro',
    text: 'Componentes para OEMs y fabricantes de implementos agrícolas, con marcas Premium e intermedias según la aplicación.',
    meta: 'Marcas típicas: ZKL, DBH y marcas Premium según exigencia',
  },
  {
    accent: 'ink',
    title: 'Automotor',
    text: 'Repuestos para talleres, repuesteros y distribuidores especializados. Nuestro segmento más nuevo, en crecimiento sostenido.',
    meta: 'Marca típica: LUK',
  },
];

const BRANDS = [
  { name: 'NTN', logo: ntnLogo },
  { name: 'Timken', logo: timkenLogo },
  { name: 'INA', logo: inaLogo },
  { name: 'FAG', logo: fagLogo },
  { name: 'ZKL', logo: zklLogo },
  { name: 'DBH', logo: dbhLogo },
  { name: 'LuK', logo: lukLogo },
];

const STEPS = [
  {
    number: '1',
    title: 'Consultá y pedí',
    text: 'Desde nuestra App, con stock y precio actualizados al instante — hacés el pedido ahí mismo.',
  },
  {
    number: '2',
    title: 'Armamos tu pedido',
    text: 'Nuestro depósito computarizado (WMS) ubica cada pieza por su posición exacta para preparar tu pedido en minutos.',
  },
  {
    number: '3',
    title: 'Lo recibís',
    text: 'Despacho diario a todo el país, o retiro y reparto propio en Rosario y alrededores.',
  },
];

function Productos() {
  useSeo(PAGES.productos);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="products-intro">
            <h1>Rodamientos, retenes y repuestos para industria, agro y automotor.</h1>
            <p className="text-secondary">
              El stock, los precios y tus pedidos se manejan desde la App. Acá te contamos cómo
              organizamos lo que vendemos y con qué marcas trabajamos, para que sepas dónde buscar
              lo que necesitás.
            </p>
          </div>
        </div>

        <div className="container segments-grid">
          {SEGMENTS.map((segment) => (
            <SegmentCard key={segment.title} {...segment} />
          ))}
        </div>
      </section>

      <section className="section section--white brands-catalog">
        <div className="container">
          <div className="brands-catalog-intro">
            <h2>Premium, intermedias y económicas: la que tu aplicación necesita.</h2>
            <p className="text-secondary">
              No creemos en una sola marca para todo. Por eso representamos opciones en distintos
              niveles, para que pagues lo justo según la exigencia de cada aplicación.
            </p>
          </div>

          <div className="brands-catalog-grid">
            {BRANDS.map((brand) => (
              <BrandBadge key={brand.name} {...brand} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="steps-title">Tres pasos, sin vueltas.</h2>
          <div className="steps-grid">
            {STEPS.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark products-cta">
        <div className="container products-cta-inner">
          <h2>¿Ya sabés lo que buscás? Pedilo ahora en la App.</h2>
          <div className="products-cta-actions">
            <Button href={APP_URL} external variant="primary" color="primary">
              Ingresar a la App
            </Button>
            <Button to="/contacto" variant="secondary" light>
              Prefiero escribir
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Productos;
