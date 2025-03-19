import React, { memo } from 'react';
import { motion } from 'framer-motion';

const SkillCard = memo(({ icon, title, description, color, category }) => {
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
  
  // Get color details for this skill
  const colorDetails = getColorStyles(color);
  
  return (
    <motion.div 
      className={`card bg-white dark:bg-purple-950 shadow-lg rounded-lg overflow-hidden ${categoryClass ? `skill-card ${categoryClass}` : ''}`}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Gradient top border */}
      <div className="h-1.5 bg-gradient-to-r from-purple-500 to-fuchsia-500"></div>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-4 shadow-sm">
            {/* Direct color application via inline style */}
            <i 
              className={`bx ${icon} text-2xl skill-icon`}
              style={{
                color: `var(--icon-color, ${colorDetails.style.color})`,
              }}
            ></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        
        {/* Display category as a badge */}
        {category && (
          <div className="mb-3">
            <span className={`skill-badge ${categoryClass}`}>
              {category}
            </span>
          </div>
        )}
        
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {description}
        </p>
      </div>

      {/* Add component-specific CSS for dark mode */}
      <style jsx>{`
        .dark .skill-icon {
          color: var(--icon-color-dark, var(--icon-color));
        }
      `}</style>
    </motion.div>
  );
});

// Add display name for debugging
SkillCard.displayName = 'SkillCard';

export default SkillCard;
