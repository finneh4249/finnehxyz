import React, { useState, useRef, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

const ToolCard = memo(({ icon, name, color, proficiency, description, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [backHeight, setBackHeight] = useState(0);
  const [frontHeight, setFrontHeight] = useState(120); // Default height
  const [cardHeight, setCardHeight] = useState(120);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  
  // Process category to lowercase for CSS class compatibility
  const categoryClass = category ? category.toLowerCase() : '';
  
  // DIRECT COLOR MAPPING - Map Tailwind color classes to CSS variables
  const getColorStyles = (colorClass) => {
    // Map Tailwind color classes to direct color values
    const colorMap = {
      'text-blue-400': '#60a5fa',
      'text-blue-500': '#3b82f6',
      'text-blue-600': '#2563eb',
      'text-red-500': '#ef4444',
      'text-red-600': '#dc2626',
      'text-green-500': '#22c55e',
      'text-yellow-400': '#facc15',
      'text-yellow-500': '#eab308',
      'text-purple-500': '#a855f7',
      'text-pink-500': '#ec4899',
      'text-orange-500': '#f97316',
      'text-orange-600': '#ea580c',
      'text-gray-800': '#1f2937',
      'text-black': '#000000'
    };
    
    const colorValue = colorMap[colorClass];
    const darkModeColorValue = colorClass === 'text-gray-800' || colorClass === 'text-black' 
      ? '#ffffff' // White in dark mode for black/gray icons
      : colorValue;
      
    return {
      color: colorValue,
      style: {
        color: colorValue,
        '--icon-color': colorValue,
        '--icon-color-dark': darkModeColorValue
      }
    };
  };
  
  // Get color details for this tool
  const colorDetails = getColorStyles(color);
  
  // Determine proficiency level label
  const getProficiencyLevel = (percent) => {
    if (percent >= 90) return "Expert";
    if (percent >= 75) return "Advanced";
    if (percent >= 60) return "Intermediate";
    return "Beginner";
  };
  
  // Get progress bar color based on proficiency
  const getProficiencyColor = (percent) => {
    if (percent >= 90) return "bg-green-500";
    if (percent >= 75) return "bg-blue-500";
    if (percent >= 60) return "bg-yellow-500";
    return "bg-orange-400";
  };
  
  // Measure and set both front and back content heights on mount
  useEffect(() => {
    if (backRef.current && frontRef.current) {
      // Get heights of front and back content plus padding
      const backContentHeight = backRef.current.scrollHeight + 20; // Add extra padding
      const frontContentHeight = frontRef.current.scrollHeight;
      
      // Set initial heights
      setFrontHeight(frontContentHeight);
      setBackHeight(Math.max(backContentHeight, frontContentHeight));
      setCardHeight(frontContentHeight);
    }
  }, [description]);

  // Handle mouse enter with immediate response
  const handleMouseEnter = () => {
    // Clear any pending timeouts to prevent conflicts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    setIsHovered(true);
    setCardHeight(backHeight);
  };
  
  // Handle mouse leave with slight delay to prevent jitter
  const handleMouseLeave = () => {
    // Add a small delay before collapsing to prevent jitter
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setCardHeight(frontHeight);
    }, 50);
  };
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);
  
  return (
    <div className="group perspective-card">
      <div 
        className={`relative w-full transition-all duration-300 cursor-pointer ${categoryClass ? `tool-card ${categoryClass}` : ''}`}
        style={{ 
          height: `${cardHeight}px`,
          transformStyle: 'preserve-3d',
          transitionProperty: 'height, transform',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        tabIndex={0}
        aria-label={`View ${name} details`}
      >
        {/* Front card */}
        <motion.div
          ref={frontRef}
          className={`absolute inset-0 rounded-lg bg-white dark:bg-purple-950 shadow-md flex flex-col justify-center items-center p-4 backface-hidden`}
          style={{ 
            transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
            opacity: isHovered ? 0 : 1,
            transition: 'transform 0.6s, opacity 0.3s'
          }}
        >
          {/* Direct color application via inline style */}
          <i 
            className={`bx ${icon} text-4xl tool-icon`} 
            style={{
              color: `var(--icon-color, ${colorDetails.style.color})`,
            }}
          ></i>
          <h3 className="font-medium text-gray-800 dark:text-gray-100 text-center">{name}</h3>
        </motion.div>
        
        {/* Back card */}
        <motion.div
          ref={backRef}
          className={`absolute inset-0 rounded-lg bg-white dark:bg-purple-950 shadow-md p-4 pb-6 backface-hidden overflow-hidden`}
          style={{ 
            transform: isHovered ? 'rotateY(0deg)' : 'rotateY(-180deg)',
            opacity: isHovered ? 1 : 0,
            transition: 'transform 0.6s, opacity 0.3s'
          }}
        >
          <div className="h-full flex flex-col">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2 text-center">{name}</h3>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1.5">
              <div 
                className={`h-2 rounded-full ${getProficiencyColor(proficiency)}`} 
                style={{ 
                  width: isHovered ? `${proficiency}%` : '0%',
                  transition: 'width 0.6s ease-out'
                }}
              ></div>
            </div>
            
            {/* Proficiency info */}
            <div className="flex justify-between w-full mb-2 text-xs text-gray-600 dark:text-gray-300">
              <span>{getProficiencyLevel(proficiency)}</span>
              <span>{proficiency}%</span>
            </div>
            
            <div className="flex-grow">
              {/* Display category if available */}
              {category && (
                <div className="mb-1.5">
                  <span className={`category-label ${categoryClass}`}>
                    {category}
                  </span>
                </div>
              )}
              <p className="text-xs text-gray-600 dark:text-gray-300 text-center">
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add component-specific CSS for dark mode */}
      <style jsx>{`
        .dark .tool-icon {
          color: var(--icon-color-dark, var(--icon-color));
        }
        
        .perspective-card {
          perspective: 1000px;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
});

// Add display name for debugging
ToolCard.displayName = 'ToolCard';

export default ToolCard;
