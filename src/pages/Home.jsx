import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import FeatureCard from '../components/FeatureCard';
import SegmentCard from '../components/SegmentCard';
import BrandBadge from '../components/BrandBadge';
import PhotoFrame from '../components/PhotoFrame';
import {
  IconArrowRight,
  IconWhatsapp,
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconTag,
  IconHeadset,
  IconTruck,
  IconLayers,
  IconGraduationCap,
} from '../components/icons';

import heroPhoto from '../assets/photos/deposito-frente-hero.jpg';
import depositoFrente from '../assets/photos/deposito-frente.jpg';
import depositoInterior from '../assets/photos/deposito-interior.jpg';
import depositoRacks from '../assets/photos/deposito-racks.jpg';

import ntnLogo from '../assets/logos/ntn.png';
import timkenLogo from '../assets/logos/timken.svg';
import inaLogo from '../assets/logos/ina.png';
import fagLogo from '../assets/logos/fag.png';
import zklLogo from '../assets/logos/zkl.png';
import lukLogo from '../assets/logos/luk.png';
import dbhLogo from '../assets/logos/dbh.png';

import './Home.css';

const APP_URL = 'https://app.rodamar.com.ar/login';
const WHATSAPP_URL = 'https://wa.me/5493412608989';

const BRANDS = [
  { name: 'NTN', logo: ntnLogo },
  { name: 'Timken', logo: timkenLogo },
  { name: 'INA', logo: inaLogo },
  { name: 'FAG', logo: fagLogo },
  { name: 'ZKL', logo: zklLogo },
  { name: 'LuK', logo: lukLogo },
  { name: 'DBH', logo: dbhLogo },
];

const FEATURES = [
  {
    icon: <IconTag />,
    title: 'Precios competitivos',
    text: 'Opciones flexibles de pago, adaptadas a la realidad de cada cliente.',
  },
  {
    icon: <IconHeadset />,
    title: 'Atención personalizada',
    text: 'Asesoramiento técnico y buena predisposición para resolver tu consulta.',
  },
  {
    icon: <IconTruck />,
    title: 'Envíos a todo el país',
    text: 'Despachos diarios con el transporte que elijas. Reparto propio en Rosario y alrededores.',
  },
  {
    icon: <IconClock />,
    title: 'Servicio 24/7',
    text: 'Disponibilidad todo el año para industrias, bajo contrato.',
  },
  {
    icon: <IconLayers />,
    title: 'Variedad de marcas',
    text: 'Alternativas Premium, intermedias y económicas para cada aplicación.',
  },
  {
    icon: <IconGraduationCap />,
    title: 'Capacitación sin cargo',
    text: 'Cursos y entrenamientos en planta junto a los ingenieros de nuestras marcas.',
  },
];

function Home() {
  useDocumentTitle('Rodamar SRL — Rodamientos y retenes');

  return (
    <>
      {/* Hero */}
      <section className="section hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              Distribuidor mayorista desde 2003
            </span>
            <h1>Rodamientos y retenes para que tu producción no pare.</h1>
            <p className="hero-text">
              Vendemos a industria, agro y automotor en todo el país. Marcas Premium como NTN,
              TIMKEN e INA-FAG, atención técnica real, y stock y pedidos al instante desde
              nuestra app.
            </p>
            <div className="hero-actions">
              <Button
                href={APP_URL}
                external
                variant="primary"
                color="accent"
                icon={<IconArrowRight />}
              >
                Consultar stock y hacer pedidos
              </Button>
              <Button href={WHATSAPP_URL} external variant="secondary" icon={<IconWhatsapp />}>
                Hablar por WhatsApp
              </Button>
            </div>
            <div className="hero-stats">
              <StatCard value="+20 años" label="en el mercado" />
              <StatCard value="+1.200 m²" label="depósito propio con WMS" />
              <StatCard value="+20" label="personas en el equipo" />
            </div>
          </div>
          <PhotoFrame
            src={heroPhoto}
            alt="Frente del depósito de Rodamar SRL"
            ratio="4 / 5"
            className="hero-photo"
          />
        </div>
      </section>

      {/* Barra de marcas */}
      <section className="brands-section">
        <div className="container">
          <p className="brands-title">Marcas que representamos</p>
          <div className="brands-grid">
            {BRANDS.map((brand) => (
              <BrandBadge key={brand.name} name={brand.name} logo={brand.logo} compact />
            ))}
          </div>
        </div>
      </section>

      {/* Nuestras instalaciones */}
      <section className="section section--white installations-section">
        <div className="container">
          <div className="installations-intro">
            <h2>Invertimos en infraestructura para que tu pedido salga rápido y bien armado.</h2>
            <p className="text-secondary">
              Nuestro depósito nuevo suma +1.200 m², y trabajamos con un sistema WMS
              computarizado que rastrea cada pieza según su ubicación exacta. Así logramos un
              control de stock más preciso y armamos pedidos más rápido.
            </p>
          </div>

          <div className="installations-stats">
            <StatCard variant="boxed" value="+1.200 m²" label="Superficie del depósito nuevo" />
            <StatCard variant="boxed" value="2.500" label="Posiciones de pallets" />
            <StatCard variant="boxed" value="+22.000" label="Posiciones de picking" />
          </div>

          <div className="installations-gallery">
            <PhotoFrame
              src={depositoFrente}
              alt="Frente panorámico del depósito"
              ratio="21 / 9"
              className="installations-gallery-main"
            />
            <PhotoFrame src={depositoInterior} alt="Interior del depósito" ratio="4 / 3" />
            <PhotoFrame src={depositoRacks} alt="Racks del depósito" ratio="4 / 3" />
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="section features-section">
        <div className="container">
          <h2 className="features-title">Por qué elegirnos</h2>
          <div className="features-grid">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Quiénes somos (teaser) */}
      <section className="section section--white about-teaser">
        <div className="container about-teaser-grid">
          <div>
            <h2>De revendedores locales a proveedores de la industria nacional.</h2>
            <p className="text-secondary about-teaser-text">
              Empezamos en 2003 importando rodamientos y retenes para revendedores de todo el
              país. Hoy representamos marcas Premium como NTN, INA-FAG y TIMKEN, atendemos
              industria, agro y automotor, y lo hacemos con un equipo de más de 20 personas.
            </p>
            <Button to="/quienes-somos" variant="secondary">
              Conocé nuestra historia y al equipo completo
            </Button>
          </div>
          <div className="about-teaser-stats">
            <StatCard value="2003" label="Año de fundación" />
            <StatCard value="+20" label="Personas en el equipo" />
          </div>
        </div>
      </section>

      {/* Productos (teaser) */}
      <section className="section products-teaser">
        <div className="container">
          <div className="products-teaser-header">
            <h2>Rodamientos, retenes y repuestos para tres frentes de trabajo.</h2>
            <div className="products-teaser-actions">
              <Button to="/productos" variant="secondary">
                Ver marcas y cómo comprar
              </Button>
              <Button href={APP_URL} external variant="secondary">
                Ver catálogo y hacer pedidos en la App
              </Button>
            </div>
          </div>

          <div className="segments-grid">
            <SegmentCard
              accent="primary"
              title="Industria"
              text="Rodamientos y retenes para industrias usuarias y fabricantes de máquina-herramienta, con servicio 24/7 bajo contrato."
            />
            <SegmentCard
              accent="accent"
              title="Agro"
              text="Componentes para OEMs y fabricantes de implementos agrícolas, con marcas Premium e intermedias según la aplicación."
            />
            <SegmentCard
              accent="ink"
              title="Automotor"
              text="Repuestos para talleres, repuesteros y distribuidores especializados. Nuestro segmento más nuevo, en crecimiento sostenido."
            />
          </div>
        </div>
      </section>

      {/* Contacto (teaser) */}
      <section className="section section--dark contact-teaser">
        <div className="container contact-teaser-grid">
          <div className="contact-teaser-info">
            <h2>Hablemos de lo que tu empresa necesita.</h2>
            <p className="contact-teaser-text">
              Para stock, precios y pedidos al instante, usá la App. Para todo lo demás,
              escribinos.
            </p>
            <ul className="contact-list">
              <li>
                <IconMapPin />
                <span>Uriburu 3585, Rosario, Santa Fe</span>
              </li>
              <li>
                <IconPhone />
                <span>+54 9 341 435-1216 / +54 9 341 418-0100</span>
              </li>
              <li>
                <IconWhatsapp />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  +54 9 341 260-8989
                </a>
              </li>
              <li>
                <IconMail />
                <a href="mailto:ventas@rodamar.com.ar">ventas@rodamar.com.ar</a>
              </li>
              <li>
                <IconClock />
                <span>Lunes a viernes 08:30-13:00 / 13:45-18:00</span>
              </li>
            </ul>
          </div>

          <div className="contact-teaser-panel">
            <h3>¿Hablamos?</h3>
            <Button
              href={WHATSAPP_URL}
              external
              variant="primary"
              color="accent"
              icon={<IconWhatsapp />}
              className="contact-teaser-panel-btn"
            >
              Hablar por WhatsApp
            </Button>
            <Button to="/contacto" variant="secondary" className="contact-teaser-panel-btn">
              Completar formulario de contacto
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
