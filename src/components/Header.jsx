import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import Button from './Button';
import { IconMenu, IconClose } from './icons';
import logo from '../assets/logos/rodamar-logo.png';
import './Header.css';

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/quienes-somos', label: 'Quiénes somos' },
  { to: '/productos', label: 'Productos' },
  { to: '/contacto', label: 'Contacto' },
];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner container">
        <Link to="/" className="header-logo" onClick={() => setOpen(false)}>
          <img src={logo} alt="Rodamar SRL" height={34} />
        </Link>

        <nav className={`header-nav${open ? ' header-nav--open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <Button
            href="https://app.rodamar.com.ar/login"
            external
            variant="primary"
            color="primary"
            className="header-cta"
          >
            Ingresar a la App
          </Button>
        </nav>

        <button
          type="button"
          className="header-toggle"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </header>
  );
}

export default Header;
