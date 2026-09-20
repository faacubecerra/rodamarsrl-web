import './BrandBadge.css';

function BrandBadge({ logo, name, description, compact = false }) {
  return (
    <div className={`brand-badge${compact ? ' brand-badge--compact' : ''}`}>
      <div className="brand-badge-mark">
        {logo ? <img src={logo} alt={name} /> : <span className="brand-badge-text">{name}</span>}
      </div>
      {description && <p className="brand-badge-description">{description}</p>}
    </div>
  );
}

export default BrandBadge;
