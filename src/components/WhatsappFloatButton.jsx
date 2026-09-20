import { useEffect, useRef, useState } from 'react';
import { IconWhatsapp } from './icons';
import './WhatsappFloatButton.css';

const WHATSAPP_URL = 'https://wa.me/5493412608989';
const STORAGE_KEY = 'rodamar-whatsapp-btn-pos';
const SIZE = 60;
const MARGIN = 20;
const DRAG_THRESHOLD = 4;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getDefaultPosition() {
  return {
    x: window.innerWidth - SIZE - MARGIN,
    y: window.innerHeight - SIZE - MARGIN,
  };
}

function readStoredPosition() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved.x === 'number' && typeof saved.y === 'number') {
      return saved;
    }
  } catch {
    /* ignore malformed/blocked storage */
  }
  return null;
}

function WhatsappFloatButton() {
  const [position, setPosition] = useState(() => readStoredPosition() || getDefaultPosition());
  const drag = useRef({ dragging: false, moved: false, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    function handleResize() {
      setPosition((prev) =>
        prev
          ? {
              x: clamp(prev.x, MARGIN, window.innerWidth - SIZE - MARGIN),
              y: clamp(prev.y, MARGIN, window.innerHeight - SIZE - MARGIN),
            }
          : prev,
      );
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handlePointerDown(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    drag.current = {
      dragging: true,
      moved: false,
      startClientX: event.clientX,
      startClientY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    if (!drag.current.dragging) return;

    const dx = event.clientX - drag.current.startClientX;
    const dy = event.clientY - drag.current.startClientY;
    if (!drag.current.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
      drag.current.moved = true;
    }

    const nextX = clamp(event.clientX - drag.current.offsetX, MARGIN, window.innerWidth - SIZE - MARGIN);
    const nextY = clamp(event.clientY - drag.current.offsetY, MARGIN, window.innerHeight - SIZE - MARGIN);
    setPosition({ x: nextX, y: nextY });
  }

  function handlePointerUp(event) {
    if (!drag.current.dragging) return;
    drag.current.dragging = false;
    event.currentTarget.releasePointerCapture(event.pointerId);

    if (drag.current.moved) {
      setPosition((current) => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
        } catch {
          /* ignore blocked storage */
        }
        return current;
      });
    }
  }

  function handleClick(event) {
    if (drag.current.moved) {
      event.preventDefault();
      drag.current.moved = false;
    }
  }

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      style={{ left: position.x, top: position.y }}
      draggable={false}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      aria-label="Hablar por WhatsApp"
    >
      <IconWhatsapp />
    </a>
  );
}

export default WhatsappFloatButton;
