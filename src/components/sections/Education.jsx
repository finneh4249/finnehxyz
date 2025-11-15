import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <section id="education" className="py-20 bg-neo-orange relative overflow-hidden">
      {/* Chaotic brutal decorative elements */}
      <div className="absolute top-20 left-5 w-40 h-40 border-brutal-thick border-black bg-neo-pink rotate-12"></div>
      <div className="absolute top-40 right-10 w-24 h-60 border-brutal border-black bg-neo-blue -rotate-6"></div>
      <div className="absolute bottom-32 left-20 w-56 h-32 border-brutal-thick border-black bg-neo-green rotate-3"></div>
      <div className="absolute bottom-20 right-32 w-32 h-32 border-brutal border-black bg-neo-purple -rotate-12"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 border-brutal border-black bg-neo-yellow rotate-45"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 relative"
        >
          <div className="flex items-center gap-6 flex-wrap">
            <h2 className="text-6xl md:text-7xl font-bold uppercase tracking-tight -rotate-2">
              Education
            </h2>
            <div className="brutal-btn brutal-pink px-6 py-3 rotate-3">
              LEARNING
            </div>
          </div>
          <div className="h-2 w-48 bg-black mt-6 -rotate-1"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">
          {educationItems.map((item, index) => (
            <EducationItem
              key={index}
              year={item.year}
              institution={item.institution}
              program={item.program}
              description={item.description}
              gpa={item.gpa}
              logoSrc={item.logoSrc}
              logoAlt={item.logoAlt}
              index={index}
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
