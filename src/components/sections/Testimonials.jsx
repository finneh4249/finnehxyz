import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchData } from '../../utils/dataFetcher';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        // Try to load testimonials from the data file
        const data = await fetchData('/data/testimonials.json');
        if (data && Array.isArray(data)) {
          setTestimonials(data);
        } else {
          // No testimonials or invalid data format
          setTestimonials([]);
        }
      } catch (err) {
        console.log("No testimonials available yet:", err);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    }
    
    loadTestimonials();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <section id="testimonials" className="py-20 bg-neo-green relative overflow-hidden">
      {/* Chaotic decorative elements */}
      <div className="absolute top-10 left-10 w-36 h-48 bg-neo-yellow border-brutal-thick border-black shadow-brutal-lg -rotate-6"></div>
      <div className="absolute bottom-10 right-10 w-48 h-32 bg-neo-pink border-brutal border-black shadow-brutal rotate-12"></div>
      <div className="absolute top-1/2 right-20 w-24 h-60 bg-neo-blue border-brutal-thick border-black shadow-brutal rotate-6"></div>
      <div className="absolute bottom-1/3 left-1/4 w-32 h-28 bg-neo-purple border-brutal border-black shadow-brutal -rotate-12"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-6 flex-wrap mb-6">
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight -rotate-2">
              Testimonials
            </h2>
            <div className="brutal-btn brutal-pink px-6 py-3 rotate-3">
              REVIEWS
            </div>
          </div>
          <div className="h-3 w-64 bg-black mx-auto rotate-1"></div>
        </motion.div>

        {/* Display testimonials if available */}
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => {
              const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'];
              const rotation = rotations[index % rotations.length];
              
              return (
                <motion.div
                  key={index}
                  className={`brutal-card bg-white dark:bg-base-200 ${rotation} hover:rotate-0 transition-all`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {testimonial.avatar ? (
                        <div className="w-16 h-16 border-brutal border-black mr-4 overflow-hidden bg-white">
                          <img
                            src={testimonial.avatar}
                            alt={`${testimonial.name}'s avatar`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=FFE600&color=000`;
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 border-brutal border-black mr-4 bg-neo-blue flex items-center justify-center font-bold text-xl">
                          {testimonial.name.split(' ').map(word => word[0]).join('')}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-lg uppercase">{testimonial.name}</h3>
                        <p className="text-sm font-bold">{testimonial.position}</p>
                        {testimonial.company && (
                          <p className="text-xs font-bold opacity-75">{testimonial.company}</p>
                        )}
                      </div>
                    </div>
                    <p className="font-medium leading-relaxed border-l-brutal border-black pl-4">"{testimonial.testimonial}"</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Coming Soon placeholder when no testimonials are available */
          <motion.div 
            className="max-w-3xl mx-auto mb-16 brutal-card bg-white dark:bg-base-200 rotate-1 hover:rotate-0 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-neo-yellow border-brutal-thick border-black flex items-center justify-center mx-auto mb-6 rotate-12">
                <i className="bx bx-message-square-dots text-5xl"></i>
              </div>
              <h3 className="text-3xl font-bold uppercase mb-4">Testimonials Coming Soon</h3>
              <p className="text-lg font-medium mb-0">
                I'm currently collecting feedback from clients and colleagues I've worked with.
                <br />Check back soon to see what others have to say about working with me!
              </p>
            </div>
          </motion.div>
        )}
        
        {/* CTA Section - always visible */}
        <motion.div 
          className="max-w-3xl mx-auto brutal-card bg-neo-blue -rotate-1 hover:rotate-0 transition-all"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-12">
            <h3 className="text-3xl font-bold uppercase text-center mb-4">Worked with me before?</h3>
            <p className="text-center text-lg font-medium max-w-2xl mx-auto mb-8">
              I'd love to hear about your experience working with me. Your feedback helps me improve and assists others in making informed decisions.
            </p>
            <div className="flex justify-center">
              <a 
                href="mailto:mail@finneh.xyz?subject=Testimonial for Ethan Cornwill&body=Hi Ethan, I'd like to share my experience working with you..."
                className="brutal-btn brutal-yellow px-8 py-4 text-lg rotate-2 hover:rotate-0 transition-all inline-flex items-center gap-2"
              >
                <i className="bx bx-message-square-dots text-2xl"></i>
                <span className="font-bold uppercase">Share Your Experience</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;