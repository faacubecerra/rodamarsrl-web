import './StepCard.css';

function StepCard({ number, title, text }) {
  return (
    <div className="step-card">
      <span className="step-card-number">{number}</span>
      <h3 className="step-card-title">{title}</h3>
      <p className="step-card-text">{text}</p>
    </div>
  );
}

export default StepCard;
