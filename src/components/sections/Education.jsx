import React, { useState, useEffect } from 'react';
import EducationItem from '../education/EducationItem';
import { fetchData } from '../../utils/dataFetcher';

function Education() {
  const [educationItems, setEducationItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEducation() {
      try {
        const data = await fetchData('/data/education.json');
        if (data) {
          setEducationItems(data);
        } else {
          throw new Error('Failed to load education data');
        }
      } catch (err) {
        console.error("Failed to load education data:", err);
        throw err; // Propagate to ErrorBoundary
      } finally {
        setLoading(false);
      }
    }
    
    loadEducation();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading education information...</div>;
  }

  return (
    <section id="education" className="py-20 bg-indigo-50/70 dark:bg-indigo-950/90">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold text-center mb-12 pb-4 border-b-2 border-secondary/30 relative">
          <span className="relative z-10 px-4 text-gray-800 dark:text-white">
            Education
          </span>
          <div className="absolute h-1 w-24 bg-gradient-to-r from-secondary to-indigo-500 left-1/2 -translate-x-1/2 bottom-0"></div>
        </h1>

        <div className="timeline max-w-4xl mx-auto flex flex-col relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary/80 via-indigo-500/60 to-secondary/30 -translate-x-1/2 rounded-full"></div>
          
          {educationItems.map((item, index) => (
            <EducationItem
              key={index}
              year={item.year}
              institution={item.institution}
              program={item.program}
              description={item.description}
              logoSrc={item.logoSrc}
              logoAlt={item.logoAlt}
              isLast={index === educationItems.length - 1}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
