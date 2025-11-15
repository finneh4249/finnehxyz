import React, { memo } from 'react';
import { motion } from 'framer-motion';

const SkillCard = memo(({ icon, title, description, color, category }) => {
  const categoryClass = category ? category.toLowerCase() : '';
  
  const colors = ['bg-neo-yellow', 'bg-neo-pink', 'bg-neo-blue', 'bg-neo-green', 'bg-neo-purple', 'bg-neo-orange'];
  const colorIndex = Math.abs(title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
  
  return (
    <motion.div 
      className="brutal-card cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={`${colors[colorIndex]} border-b-brutal border-black p-4`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center">
            <i className={`bx ${icon} text-2xl text-white`}></i>
          </div>
          <h3 className="text-xl font-bold uppercase">{title}</h3>
        </div>
      </div>
      
      <div className="p-6 bg-white dark:bg-base-200">
        {category && (
          <div className="mb-3">
            <span className="bg-black text-white px-3 py-1 font-bold uppercase text-xs border-2 border-black">
              {category}
            </span>
          </div>
        )}
        
        <p className="text-base font-medium">
          {description}
        </p>
      </div>
    </motion.div>
  );
});

SkillCard.displayName = 'SkillCard';

export default SkillCard;
