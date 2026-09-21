import { Link } from 'react-router-dom';
import logo from '../assets/logos/rodamar-logo.png';
import './Footer.css';

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/quienes-somos', label: 'Quiénes somos' },
  { to: '/productos', label: 'Productos y marcas' },
  { to: '/contacto', label: 'Contacto' },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-logo-chip">
          <img src={logo} alt="Rodamar SRL" height={28} />
        </div>

        <nav className="footer-nav" aria-label="Pie de página">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
          <a href="https://app.rodamar.com.ar/login" target="_blank" rel="noopener noreferrer">
            Ingresar a la App
          </a>
        </nav>

        <address className="footer-address">
          <span>Uriburu 3585, Rosario, Santa Fe</span>
          <span>
            <a href="tel:+5493414351216">+54 9 341 435-1216</a> ·{' '}
            <a href="tel:+5493414180100">+54 9 341 418-0100</a>
          </span>
          <a href="mailto:ventas@rodamar.com.ar">ventas@rodamar.com.ar</a>
        </address>

        <p className="footer-copy">
          © 2026 Rodamar SRL · Distribuidor mayorista de rodamientos y retenes en Rosario,
          Argentina.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
