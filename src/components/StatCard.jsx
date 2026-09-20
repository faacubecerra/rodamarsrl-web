import './StatCard.css';

function StatCard({ value, label, variant = 'plain', className = '' }) {
  return (
    <div className={`stat-card stat-card--${variant} ${className}`}>
      <span className="stat-card-value">{value}</span>
      <span className="stat-card-label">{label}</span>
    </div>
  );
}

export default StatCard;
