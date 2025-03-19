import React from 'react';
import TimelineItem from './professional-experience/TimelineItem';
import experiences from '../data/experience.json';

function ProfessionalExperience() {
  return (
    <section id="professionalExperience" className="py-20 bg-slate-50 dark:bg-slate-950/90">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold text-center mb-12 pb-4 border-b-2 border-primary/30 relative">
          <span className="relative z-10 px-4 text-gray-800 dark:text-white">
            Professional Experience
          </span>
          <div className="absolute h-1 w-24 bg-gradient-to-r from-primary to-secondary left-1/2 -translate-x-1/2 bottom-0"></div>
        </h1>

        <div className="timeline max-w-4xl mx-auto flex flex-col relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/80 via-secondary/60 to-primary/30 -translate-x-1/2 rounded-full"></div>
          
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              yearRange={exp.yearRange}
              company={exp.company}
              employer={exp.employer}
              roles={exp.roles}
              logoSrc={exp.logoSrc}
              logoAlt={exp.logoAlt}
              isLast={index === experiences.length - 1}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfessionalExperience;
