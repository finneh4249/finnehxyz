import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TimelineItem from '../professional-experience/TimelineItem';

const ProfessionalExperience = () => {
  const [experienceData, setExperienceData] = useState([]);

  useEffect(() => {
    fetch('/data/experience.json')
      .then(response => response.json())
      .then(data => setExperienceData(data))
      .catch(error => console.error('Error loading experience data:', error));
  }, []);

  return (
    <section id="experience" className="py-20 bg-base-100 dark:bg-base-100 relative overflow-hidden">
      {/* Wild asymmetric brutal decorations */}
      <div className="absolute top-10 right-5 w-52 h-40 border-brutal-thick border-black bg-neo-yellow -rotate-12"></div>
      <div className="absolute top-60 left-10 w-40 h-64 border-brutal border-black bg-neo-purple rotate-6"></div>
      <div className="absolute bottom-40 right-20 w-36 h-36 border-brutal-thick border-black bg-neo-pink -rotate-3"></div>
      <div className="absolute bottom-20 left-32 w-48 h-28 border-brutal border-black bg-neo-blue rotate-12"></div>
      <div className="absolute top-1/3 left-1/4 w-24 h-24 border-brutal border-black bg-neo-green rotate-45"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 relative"
        >
          <div className="flex items-center gap-6 flex-wrap justify-end">
            <div className="brutal-btn brutal-blue px-6 py-3 -rotate-3">
              WORK
            </div>
            <h2 className="text-6xl md:text-7xl font-bold uppercase tracking-tight rotate-2">
              Experience
            </h2>
          </div>
          <div className="h-2 w-48 bg-black mt-6 ml-auto rotate-1"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">
          {experienceData.map((item, index) => (
            <TimelineItem 
              key={index}
              yearRange={item.yearRange}
              company={item.company}
              employer={item.employer}
              roles={item.roles}
              logoSrc={item.logoSrc}
              logoSrcs={item.logoSrcs}
              logoAlt={item.logoAlt}
              index={index}
              isFirst={index === 0}
              isLast={index === experienceData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalExperience;
