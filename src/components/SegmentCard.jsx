import './SegmentCard.css';

/** accent: 'primary' (celeste) | 'accent' (rojo) | 'ink' (negro) */
function SegmentCard({ accent = 'primary', title, text, meta }) {
  return (
    <div className={`segment-card segment-card--${accent}`}>
      <div className="segment-card-bar" />
      <div className="segment-card-body">
        <h3 className="segment-card-title">{title}</h3>
        <p className="segment-card-text">{text}</p>
        {meta && <p className="segment-card-meta">{meta}</p>}
      </div>
    </div>
  );
}

export default SegmentCard;
