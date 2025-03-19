import React, { useState, useEffect, memo } from 'react';

const ScrollProgressBar = ({ className = '', height = '2px' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const calculateScrollProgress = () => {
      // Use requestAnimationFrame for smoother progress updates
      requestAnimationFrame(() => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Calculate percentage scrolled
        if (scrollHeight > 0) {
          const scrollPercentage = (scrollTop / scrollHeight) * 100;
          setScrollProgress(scrollPercentage);
        }
      });
    };
    
    // Initial calculation
    calculateScrollProgress();
    
    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
    };
  }, []);
  
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <div 
        className="h-full bg-primary transition-transform duration-75 origin-left"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(ScrollProgressBar);
