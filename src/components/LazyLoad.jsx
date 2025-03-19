import React, { Suspense, lazy, useState, useEffect, useRef, memo } from 'react';

// Enhanced loading spinner with progress indication
const EnhancedLoading = memo(({ componentName }) => (
  <div className="flex flex-col justify-center items-center py-12">
    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-2"></div>
    <p className="text-sm text-gray-500 dark:text-gray-400">Loading {componentName}...</p>
  </div>
));

/**
 * Optimized lazy loading component with viewport detection
 * @param {string} importPath - Path to component to lazy load
 * @param {string} componentName - Name of component (for loading state)
 * @param {number} threshold - Viewport intersection threshold (0-1)
 * @param {number} rootMargin - Additional margin around viewport
 */
const LazyLoad = ({ 
  importPath, 
  componentName, 
  threshold = 0.1, 
  rootMargin = '200px',
  preloadData = false,
  dataKey = null, 
  dataPath = null,
  ...props 
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);

  // Use dynamic import with webpack chunk naming
  const Component = lazy(() => {
    // If preloading data is enabled, preload the data first
    if (preloadData && dataKey && dataPath) {
      return import(/* webpackPreload: true */ '../utils/DataPreloader')
        .then(module => module.preloadData(dataKey, dataPath))
        .then(() => import(/* webpackChunkName: "[request]" */ `../${importPath}`));
    }
    return import(/* webpackChunkName: "[request]" */ `../${importPath}`);
  });

  useEffect(() => {
    // If IntersectionObserver is available, use it for better performance
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        {
          rootMargin,
          threshold
        }
      );
      
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
      
      return () => observer.disconnect();
    } else {
      // Fallback for browsers without IntersectionObserver
      setShouldLoad(true);
    }
  }, [rootMargin, threshold]);

  return (
    <div ref={containerRef} className="lazy-load-container">
      {shouldLoad ? (
        <Suspense fallback={<EnhancedLoading componentName={componentName} />}>
          <Component {...props} />
        </Suspense>
      ) : (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default memo(LazyLoad);
