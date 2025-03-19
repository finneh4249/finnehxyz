import React, { useState, useEffect } from 'react';
import { fetchData } from '../../utils/dataFetcher';

import TimelineItem from '../professional-experience/TimelineItem';

function Experience() {
  const [experienceItems, setExperienceItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadExperience() {
      try {
        const data = await fetchData('/data/experience.json');
        if (data) {
          setExperienceItems(data);
        } else {
          throw new Error('Failed to load experience data');
        }
      } catch (err) {
        console.error("Failed to load experience data:", err);
        throw err; // Propagate to ErrorBoundary
      } finally {
        setLoading(false);
      }
    }
    
    loadExperience();
  }, []);
  
  if (loading) {
    return <div className="py-20 text-center">Loading experience information...</div>;
  }

  return (
    <section id="professionalExperience" className="py-20 bg-blue-50/70 dark:bg-blue-950/90">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold text-center mb-12 pb-4 border-b-2 border-primary/30 relative">
          <span className="relative z-10 px-4 text-gray-800 dark:text-white">
            Professional Experience
          </span>
          <div className="absolute h-1 w-24 bg-gradient-to-r from-primary to-blue-500 left-1/2 -translate-x-1/2 bottom-0"></div>
        </h1>

        <div className="timeline max-w-4xl mx-auto flex flex-col relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/80 via-blue-500/60 to-primary/30 -translate-x-1/2 rounded-full"></div>
          
          {experienceItems.map((item, index) => (
            <TimelineItem
              key={index}
              position={item.position}
              company={item.company}
              duration={item.duration}
              location={item.location}
              description={item.description}
              responsibilities={item.responsibilities}
              technologies={item.technologies}
              logoSrc={item.logoSrc}
              logoAlt={item.logoAlt}
              isLast={index === experienceItems.length - 1}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
