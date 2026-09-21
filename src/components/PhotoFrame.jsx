/** priority: imagen LCP (above the fold) — se carga ya y con máxima prioridad. */
function PhotoFrame({ src, alt = '', ratio, className = '', priority = false }) {
  return (
    <div className={`photo-frame ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
      />
    </div>
  );
}

export default PhotoFrame;
