function PhotoFrame({ src, alt = '', ratio, className = '' }) {
  return (
    <div className={`photo-frame ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

export default PhotoFrame;
