import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ 
  yearRange, 
  company, 
  employer, 
  roles, 
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
          className="year-marker bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full px-6 py-2 z-10 shadow-lg"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {yearRange}
        </motion.div>
      </div>

      {/* Timeline node */}
      <div className="absolute left-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-white dark:bg-slate-800 border-4 border-primary z-10"></div>

      {/* Content Card */}
      <motion.div 
        className="bg-white dark:bg-slate-800 dark:!bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm"
        style={{ backgroundColor: 'var(--bg-card-color, white)' }}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Company Logo */}
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-white dark:bg-slate-700 p-2 shadow-md">
            <img 
              src={logoSrc} 
              alt={logoAlt} 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Content */}
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{company}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{employer}</p>
            
            {/* Roles */}
            <div className="space-y-6">
              {roles.map((role, idx) => (
                <div key={idx} className="role-item">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                    <h4 className={`font-semibold ${role.isCurrent ? 'text-primary' : 'text-gray-800 dark:text-gray-200'}`}>
                      {role.title}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400 md:before:content-['•'] md:before:mx-2 md:before:text-gray-400">
                      {role.period}
                    </span>
                    {role.isCurrent && (
                      <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium inline-block w-fit">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {role.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TimelineItem;
