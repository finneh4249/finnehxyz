import React from 'react';
import { motion } from 'framer-motion';

const EducationItem = ({ 
  year, 
  institution, 
  program, 
  description, 
  gpa,
  logoSrc, 
  logoAlt,
  index,
  isLast,
  isFirst 
}) => {
  // Alternate between left and right with chaotic offsets
  const isEven = index % 2 === 0;
  const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
  const rotation = rotations[index % rotations.length];
  const colors = ['neo-blue', 'neo-pink', 'neo-yellow', 'neo-green', 'neo-purple'];
  const yearColor = colors[index % colors.length];

  return (
    <motion.div 
      className={`relative mb-12 ${isEven ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'} max-w-3xl`}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <div className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-6 items-start`}>
        {/* Year Badge - Floating */}
        <motion.div 
          className={`brutal-btn brutal-${yearColor} px-6 py-4 flex-shrink-0 ${rotation} shadow-brutal-lg z-20 relative`}
          whileHover={{ scale: 1.1, rotate: isEven ? -5 : 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="text-2xl font-bold uppercase tracking-tighter">
            {year}
          </div>
        </motion.div>

        {/* Content Card - Asymmetric */}
        <motion.div 
          className={`brutal-card bg-white dark:bg-base-200 flex-grow relative`}
          style={{ overflow: 'visible' }}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Offset logo badge - positioned to avoid content */}
          <div className={`absolute ${isEven ? '-right-6' : '-left-6'} -top-6 z-30`}>
            <motion.div 
              className="w-28 h-28 border-brutal-thick border-black bg-white dark:bg-base-100 p-3 shadow-brutal rotate-6"
              whileHover={{ rotate: -6, scale: 1.1 }}
            >
              <img 
                src={logoSrc} 
                alt={logoAlt} 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>

          <div className={`p-8 relative z-10 ${isEven ? 'pt-12' : 'pt-12 pl-16'}`}>
            <h3 className="text-3xl font-bold uppercase mb-3 tracking-tight">
              {institution}
            </h3>
            <h4 className="text-xl font-bold mb-4">
              {program}
            </h4>
            
            <div className="flex flex-wrap gap-3 mb-4">
              {gpa && (
                <div className="brutal-btn brutal-green px-5 py-2 text-base rotate-1">
                  GPA: {gpa}
                </div>
              )}
            </div>

            {description && (
              <div className="text-base font-medium leading-relaxed border-l-brutal border-black pl-4 -rotate-1">
                {description}
              </div>
            )}
          </div>

          {/* Decorative corner element - outside card */}
          <div className={`absolute ${isEven ? '-bottom-3 -left-3' : '-bottom-3 -right-3'} w-16 h-16 border-brutal border-black bg-${yearColor} -rotate-12 -z-10`}></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EducationItem;
