import React, { useState, useEffect, useMemo, memo } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  sizes = '100vw',
  priority = false,
  quality = 75,
  srcSets = [],
  placeholderSrc,
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Memoize srcset generation to prevent recalculation on each render
  const generateSrcSet = () => {
    if (srcSets && srcSets.length > 0) {
      return srcSets.map(size => `${src.replace(/\.(jpg|jpeg|png|webp)/, `_${size}w.$1`)} ${size}w`).join(', ');
    }
    return '';
  };
  
  // Memoize the srcSet value
  const srcSet = useMemo(() => generateSrcSet(), [src, srcSets]);
  
  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = () => {
    setError(true);
  };

  // Use Intersection Observer for browsers that don't support native lazy loading
  useEffect(() => {
    if (!('loading' in HTMLImageElement.prototype) && !priority) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            if (image.dataset.srcset) {
              image.srcset = image.dataset.srcset;
            }
            observer.unobserve(image);
          }
        });
      });

      const imgElements = document.querySelectorAll('img[data-src]');
      imgElements.forEach(img => {
        observer.observe(img);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [priority]);

  const loadingAttribute = priority ? 'eager' : 'lazy';

  return (
    <div className={`image-container relative ${className}`} style={{ width, height }}>
      {placeholderSrc && !isLoaded && !error && (
        <img 
          src={placeholderSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity blur-sm"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loadingAttribute}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        sizes={sizes}
        srcSet={srcSet || undefined}
        onLoad={handleLoad}
        onError={handleError}
        data-src={!('loading' in HTMLImageElement.prototype) && !priority ? '' : undefined}
        data-srcset={!('loading' in HTMLImageElement.prototype) && !priority && srcSet ? srcSet : undefined}
        {...props}
      />
    </div>
  );
};

// Custom prop comparator to avoid unnecessary re-renders
const arePropsEqual = (prevProps, nextProps) => {
  // Only re-render if these specific props change
  return (
    prevProps.src === nextProps.src &&
    prevProps.alt === nextProps.alt &&
    prevProps.width === nextProps.width &&
    prevProps.height === nextProps.height &&
    prevProps.priority === nextProps.priority &&
    prevProps.className === nextProps.className &&
    prevProps.placeholderSrc === nextProps.placeholderSrc &&
    JSON.stringify(prevProps.srcSets) === JSON.stringify(nextProps.srcSets)
  );
};

// Export memoized version of the component
export default memo(OptimizedImage, arePropsEqual);
