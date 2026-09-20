import './FeatureCard.css';

function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-card-icon">{icon}</div>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-text">{text}</p>
    </div>
  );
}

export default FeatureCard;
