import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';

const ToolCard = memo(({ icon, name, color, proficiency, description, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const categoryClass = category ? category.toLowerCase() : '';
  
  const getProficiencyLevel = (percent) => {
    if (percent >= 90) return "Expert";
    if (percent >= 75) return "Advanced";
    if (percent >= 60) return "Intermediate";
    return "Beginner";
  };
  
  const colors = ['bg-neo-yellow', 'bg-neo-pink', 'bg-neo-blue', 'bg-neo-green', 'bg-neo-purple', 'bg-neo-orange'];
  const colorIndex = Math.abs(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
  
  return (
    <motion.div 
      className="brutal-card cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {!isHovered ? (
        <div className={`${colors[colorIndex]} p-6 flex flex-col items-center justify-center h-32`}>
          <i className={`bx ${icon} text-5xl mb-2`}></i>
          <h3 className="font-bold text-center uppercase text-sm">{name}</h3>
        </div>
      ) : (
        <div className="bg-white dark:bg-base-200 p-4 h-32 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-center uppercase text-sm mb-2">{name}</h3>
            
            {category && (
              <div className="mb-2 text-center">
                <span className="bg-black text-white px-2 py-0.5 text-xs font-bold uppercase">
                  {category}
                </span>
              </div>
            )}
          </div>
          
          <div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 h-3 mb-1 border-2 border-black">
              <div 
                className={`${colors[colorIndex]} h-full border-r-2 border-black transition-all duration-500`}
                style={{ width: `${proficiency}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs font-bold">
              <span>{getProficiencyLevel(proficiency)}</span>
              <span>{proficiency}%</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
});

ToolCard.displayName = 'ToolCard';

export default ToolCard;
