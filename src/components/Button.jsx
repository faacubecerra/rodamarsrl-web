import { Link } from 'react-router-dom';
import './Button.css';

/**
 * variant: 'primary' | 'secondary'
 * color (solo con variant="primary"): 'primary' (celeste) | 'accent' (rojo)
 *   Regla del brief: celeste = navegación/App, rojo = conversión directa.
 * light: variante outline blanca de 'secondary', para usar sobre fondos oscuros.
 */
function Button({
  variant = 'primary',
  color = 'primary',
  light = false,
  to,
  href,
  external = false,
  icon,
  iconPosition = 'right',
  children,
  className = '',
  type = 'button',
  ...rest
}) {
  const classes = [
    'btn',
    variant === 'primary' ? `btn-primary btn-primary--${color}` : 'btn-secondary',
    variant === 'secondary' && light ? 'btn-secondary--light' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}

export default Button;
