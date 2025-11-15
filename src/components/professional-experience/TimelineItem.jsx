import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ 
  yearRange, 
  company, 
  employer, 
  roles, 
  logoSrc, 
  logoSrcs,
  logoAlt,
  index,
  isLast,
  isFirst 
}) => {
  // Alternate between left and right with more chaos
  const isEven = index % 2 === 0;
  const rotations = ['rotate-2', '-rotate-1', 'rotate-1', '-rotate-2'];
  const rotation = rotations[index % rotations.length];
  const colors = ['neo-pink', 'neo-blue', 'neo-green', 'neo-yellow', 'neo-purple'];
  const yearColor = colors[index % colors.length];

  return (
    <motion.div 
      className={`relative mb-12 ${isEven ? 'md:mr-0 md:ml-auto' : 'md:mr-auto md:ml-0'} max-w-4xl`}
      initial={{ opacity: 0, x: isEven ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <div className={`flex ${isEven ? 'flex-row-reverse' : 'flex-row'} gap-6 items-start`}>
        {/* Year Range Badge - Floating & Rotated */}
        <motion.div 
          className={`brutal-btn brutal-${yearColor} px-6 py-4 flex-shrink-0 ${rotation} shadow-brutal-lg z-20 relative`}
          whileHover={{ scale: 1.1, rotate: isEven ? 5 : -5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="text-xl font-bold uppercase tracking-tighter leading-tight text-center">
            {yearRange.split('-').map((year, i) => (
              <div key={i}>{year.trim()}</div>
            ))}
          </div>
        </motion.div>

        {/* Content Card - Asymmetric & Wild */}
        <motion.div 
          className={`brutal-card bg-white dark:bg-base-200 flex-grow relative`}
          style={{ overflow: 'visible' }}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Logo(s) - Chaotic positioning with more space */}
          <div className={`absolute ${isEven ? '-left-8' : '-right-8'} -top-8 z-30 flex ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-2`}>
            {logoSrcs && Array.isArray(logoSrcs) ? (
              logoSrcs.map((src, idx) => (
                <motion.div 
                  key={idx}
                  className={`w-24 h-24 border-brutal-thick border-black bg-white dark:bg-base-100 p-2 shadow-brutal ${idx === 0 ? 'rotate-6' : '-rotate-6'}`}
                  whileHover={{ rotate: idx === 0 ? -6 : 6, scale: 1.1 }}
                >
                  <img
                    src={src}
                    alt={`${logoAlt} ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="w-28 h-28 border-brutal-thick border-black bg-white dark:bg-base-100 p-3 shadow-brutal -rotate-6"
                whileHover={{ rotate: 6, scale: 1.1 }}
              >
                <img
                  src={logoSrc}
                  alt={logoAlt}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            )}
          </div>

          <div className="p-8 pt-20 relative z-10">
            <div className="mb-6">
              <h3 className="text-4xl font-bold uppercase mb-2 tracking-tight -rotate-1">
                {company}
              </h3>
              <p className="text-lg font-bold rotate-1">{employer}</p>
            </div>
            
            {/* Roles - Stacked with decorative elements */}
            <div className="space-y-8">
              {roles.map((role, idx) => {
                const roleColors = ['neo-blue', 'neo-pink', 'neo-yellow', 'neo-green'];
                const roleColor = roleColors[idx % roleColors.length];
                
                return (
                  <div key={idx} className="relative">
                    {/* Decorative side bar */}
                    <div className={`absolute -left-4 top-0 bottom-0 w-2 bg-${roleColor} -rotate-2`}></div>
                    
                    <div className="pl-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h4 className="font-bold text-2xl uppercase tracking-tight">
                          {role.title}
                        </h4>
                        {role.isCurrent && (
                          <span className="brutal-btn brutal-yellow px-4 py-2 text-xs rotate-3">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <div className="brutal-btn bg-base-200 dark:bg-base-300 border-black px-4 py-2 inline-block mb-3 text-sm -rotate-1">
                        {role.period}
                      </div>
                      <div className="text-base font-medium leading-relaxed border-l-brutal border-black pl-4 rotate-1">
                        {role.description}
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    {idx === roles.length - 1 && (
                      <div className={`absolute ${isEven ? 'top-4 left-0' : 'top-4 right-0'} w-12 h-12 border-brutal border-black bg-${roleColor} rotate-45`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Large decorative corner element - outside card */}
          <div className={`absolute ${isEven ? '-bottom-4 -right-4' : '-bottom-4 -left-4'} w-20 h-20 border-brutal-thick border-black bg-${yearColor} rotate-12 -z-10`}></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
