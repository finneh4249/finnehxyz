import React, { useState, useEffect, memo } from 'react';

const ScrollProgressBar = ({ className = '', height = '6px' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const calculateScrollProgress = () => {
      requestAnimationFrame(() => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if (scrollHeight > 0) {
          const scrollPercentage = (scrollTop / scrollHeight) * 100;
          setScrollProgress(scrollPercentage);
        }
      });
    };
    
    calculateScrollProgress();
    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
    };
  }, []);
  
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <div 
        className="h-full bg-neo-yellow border-b-brutal border-black transition-transform duration-75 origin-left"
        style={{ 
          transform: `scaleX(${scrollProgress / 100})`,
          boxShadow: scrollProgress > 0 ? '0 2px 0 0 #000' : 'none'
        }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

export default memo(ScrollProgressBar);
