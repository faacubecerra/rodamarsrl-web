import logo from '../assets/logos/rodamar-logo.png';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-logo-chip">
          <img src={logo} alt="Rodamar SRL" height={28} />
        </div>
        <p className="footer-copy">© 2026 Rodamar SRL · Uriburu 3585, Rosario, Santa Fe</p>
      </div>
    </footer>
  );
}

export default Footer;
