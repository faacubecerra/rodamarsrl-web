import { useSeo } from '../hooks/useSeo';
import { PAGES } from '../seo';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import TeamMember from '../components/TeamMember';
import { IconWhatsapp } from '../components/icons';
import './QuienesSomos.css';

const WHATSAPP_URL = 'https://wa.me/5493412608989';

const VENTAS = [
  { name: 'Darío Burgio', role: 'Agro' },
  { name: 'Gabriel Sulli', role: 'Agro · Automotor' },
  { name: 'Álvaro Palmucci', role: 'Agro · Automotor' },
  { name: 'Maximiliano Becerra', role: 'Industria' },
  { name: 'Stefania Schmaedke', role: 'Industria' },
  { name: 'Jonatan Sisa', role: 'Industria' },
  { name: 'Axel Dalmasso', role: 'Agro' },
];

const ADMINISTRACION = [
  { name: 'Mariana Rodriguez', role: 'Facturación' },
  { name: 'Juan Pablo Martin', role: 'Proveedores' },
  { name: 'Federico Garcia', role: 'Cobranzas' },
  { name: 'Facundo Becerra', role: 'Customer Service' },
  { name: 'Gonzalo Romero', role: 'Compras' },
  { name: 'Lucas Franco', role: 'Activacion Comercial'}
];

const EXPEDICION = [
  'Julian Lopez',
  'Lucas Arcuri',
  'Joaquin Schmaedke',
  'Nicolas Marrone',
  'Gabriel Ramirez',
  'Cristian Beltramo',
].map((name) => ({ name }));

function QuienesSomos() {
  useSeo(PAGES.quienesSomos);

  return (
    <>
      <section className="section intro-section">
        <div className="container intro-grid">
          <h1>Más de 20 años poniendo rodamientos donde la industria los necesita.</h1>
          <div className="intro-stats">
            <StatCard value="2003" label="Año de fundación" />
            <StatCard value="+20" label="Personas en el equipo" />
            <StatCard value="+1.200 m²" label="Depósito propio con WMS" />
            <StatCard value="+2500" label="Posiciones de Pallets" />
            <StatCard value="+22000" label="Posiciones de Picking" />
          </div>
        </div>

        <div className="container">
          <div className="history">
            <p>
              Empezamos en 2003 importando y distribuyendo rodamientos y retenes con marcas como
              ZKL y DBH, enfocados en revendedores y rulemaneros de todo el país desde nuestra
              base en Rosario.
            </p>
            <p>
              Con el tiempo sumamos líneas más accesibles y marcas propias de importación desde el
              sudeste asiático, lo que nos permitió atender también a OEMs y fabricantes de
              implementos agrícolas y máquina-herramienta. Más adelante incorporamos marcas
              Premium —NTN, INA-FAG y TIMKEN— para los clientes más exigentes con su
              aplicación.
            </p>
            <p>
              Ese respaldo técnico nos abrió la puerta a industrias de renombre nacional e
              internacional, y en los últimos años sumamos el segmento automotor: repuestos para
              talleres, repuesteros y distribuidores especializados, con un crecimiento sostenido.
              Hoy nos distingue un enfoque dinámico, joven y flexible, con una atención cercana y
              la capacidad de adaptarnos a cada necesidad.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--white team-section">
        <div className="container">
          <h2 className="team-title">
            19 personas resolviendo ventas, administración y logística todos los días.
          </h2>

          <div className="team-group">
            <h3 className="team-group-title">Ventas</h3>
            <div className="team-grid">
              {VENTAS.map((person) => (
                <TeamMember key={person.name} {...person} />
              ))}
            </div>
          </div>

          <div className="team-group">
            <h3 className="team-group-title">Administración</h3>
            <div className="team-grid">
              {ADMINISTRACION.map((person) => (
                <TeamMember key={person.name} {...person} />
              ))}
            </div>
          </div>

          <div className="team-group">
            <h3 className="team-group-title">Expedición</h3>
            <div className="team-grid">
              {EXPEDICION.map((person) => (
                <TeamMember key={person.name} {...person} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section closing-cta">
        <div className="container closing-cta-inner">
          <h2>¿Querés que te asesore alguien del equipo?</h2>
          <div className="closing-cta-actions">
            <Button
              href={WHATSAPP_URL}
              external
              variant="primary"
              color="accent"
              icon={<IconWhatsapp />}
            >
              Hablar por WhatsApp
            </Button>
            <Button to="/contacto" variant="secondary">
              Ver todos los medios de contacto
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default QuienesSomos;
