import { useState } from 'react';
import { IconChevronDown } from './icons';
import './FaqItem.css';

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button
        type="button"
        className="faq-item-question"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <IconChevronDown className="faq-item-icon" />
      </button>
      {/* Siempre en el DOM (con `hidden`) para que buscadores y lectores vean la respuesta. */}
      <p className="faq-item-answer" hidden={!open}>
        {answer}
      </p>
    </div>
  );
}

export default FaqItem;
