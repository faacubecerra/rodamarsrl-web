import { useState } from 'react';
import { useSeo } from '../hooks/useSeo';
import { PAGES } from '../seo';
import { FAQS } from '../data/faqs';
import Button from '../components/Button';
import FaqItem from '../components/FaqItem';
import { IconMapPin, IconPhone, IconMail, IconClock, IconWhatsapp } from '../components/icons';
import './Contacto.css';

const WHATSAPP_URL = 'https://wa.me/5493412608989';
const MAPS_URL =
  'https://maps.app.goo.gl/pULhXBDvmpZT8yy7A';

const MOTIVOS = ['Industria', 'Agro', 'Automotor', 'Otra consulta'];

function Contacto() {
  useSeo(PAGES.contacto);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="contacto-intro">
            <h1>Hablemos de lo que tu empresa necesita.</h1>
            <p className="text-secondary">
              Para stock, precios y pedidos al instante, usá la App. Para cotizaciones,
              asesoramiento técnico o cualquier otra consulta, escribinos por acá.
            </p>
          </div>
        </div>

        <div className="container contacto-grid">
          <div className="contacto-info">
            <ul className="contacto-list">
              <li>
                <IconMapPin />
                <span>Uriburu 3585, Rosario, Santa Fe</span>
              </li>
              <li>
                <IconPhone />
                <span>
                  <a href="tel:+5493414351216">+54 9 341 435-1216</a> /{' '}
                  <a href="tel:+5493414180100">+54 9 341 418-0100</a>
                </span>
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
                <span>Lunes a viernes 08:30 a 13:00 y 13:45 a 18:00</span>
              </li>
            </ul>

            <a className="maps-link" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              Ver en Google Maps →
            </a>

            <Button
              href={WHATSAPP_URL}
              external
              variant="primary"
              color="accent"
              icon={<IconWhatsapp />}
              className="contacto-whatsapp-btn"
            >
              Hablar por WhatsApp ahora
            </Button>

            <div className="map-placeholder">
              <span>Mapa — Uriburu 3585, Rosario</span>
            </div>
          </div>

          <div className="contacto-form-panel">
            <h2>Dejanos tu consulta</h2>
            <p className="text-secondary contacto-form-subtitle">
              Te respondemos por el medio que prefieras.
            </p>

            {submitted ? (
              <div className="contacto-form-success">
                <p>¡Gracias! Recibimos tu consulta y te vamos a contactar a la brevedad.</p>
              </div>
            ) : (
              <form className="contacto-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input id="nombre" name="nombre" type="text" required />
                </div>

                <div className="form-field">
                  <label htmlFor="empresa">Empresa</label>
                  <input id="empresa" name="empresa" type="text" />
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="telefono">Teléfono</label>
                    <input id="telefono" name="telefono" type="tel" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="motivo">Motivo de la consulta</label>
                  <select id="motivo" name="motivo" defaultValue="">
                    <option value="" disabled>
                      Elegí una opción
                    </option>
                    {MOTIVOS.map((motivo) => (
                      <option key={motivo} value={motivo}>
                        {motivo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="consulta">Consulta</label>
                  <textarea id="consulta" name="consulta" rows={5} required />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  color="accent"
                  className="contacto-submit-btn"
                >
                  Enviar consulta
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section section--white faq-section">
        <div className="container">
          <h2 className="faq-title">Antes de escribirnos, capaz esto ya te responde.</h2>
          <div className="faq-list">
            {FAQS.map((faq) => (
              <FaqItem key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Contacto;
