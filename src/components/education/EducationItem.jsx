import React from 'react';
import { motion } from 'framer-motion';

const EducationItem = ({ 
  year, 
  institution, 
  program, 
  description, 
  logoSrc, 
  logoAlt, 
  isLast,
  isFirst 
}) => {
  return (
    <motion.div 
      className="timeline-item relative mb-16 last:mb-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Year marker */}
      <div className="flex justify-center mb-6">
        <motion.div 
          className="year-marker bg-gradient-to-r from-secondary to-indigo-500 text-white font-bold rounded-full px-6 py-2 z-10 shadow-lg"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {year}
        </motion.div>
      </div>

      {/* Timeline node */}
      <div className="absolute left-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-white dark:bg-indigo-900 border-4 border-secondary z-10"></div>

      {/* Content Card */}
      <motion.div 
        className="bg-white dark:bg-indigo-900 dark:!bg-indigo-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm"
        style={{ backgroundColor: 'var(--bg-card-color, white)' }}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Institution Logo */}
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-white dark:bg-indigo-800 p-2 shadow-md">
            <img 
              src={logoSrc} 
              alt={logoAlt} 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Content */}
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{institution}</h3>
            <h4 className="text-lg font-semibold text-secondary dark:text-indigo-300 mb-2">{program}</h4>
            
            {description && (
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {description}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EducationItem;
