import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchData } from '../utils/dataFetcher';

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
    <section id="testimonials" className="py-20 bg-gray-50/70 dark:bg-gray-900/40">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 pb-4 border-b-2 border-gray-300/30 relative">
          <span className="relative z-10 px-4 text-gray-800 dark:text-white">
            Testimonials
          </span>
          <div className="absolute h-1 w-24 bg-gradient-to-r from-blue-500 to-violet-500 left-1/2 -translate-x-1/2 bottom-0"></div>
        </h2>

        {/* Display testimonials if available */}
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200/50 dark:border-gray-700/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.name}'s avatar`}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=blue&color=fff`;
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full mr-4 bg-blue-200 flex items-center justify-center text-blue-800">
                      {testimonial.name.split(' ').map(word => word[0]).join('')}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-200">{testimonial.position}</p>
                    {testimonial.company && (
                      <p className="text-xs text-gray-500 dark:text-gray-300/70">{testimonial.company}</p>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.testimonial}"</p>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Coming Soon placeholder when no testimonials are available */
          <motion.div 
            className="max-w-3xl mx-auto mb-16 p-8 rounded-xl bg-white dark:bg-gray-800/50 shadow-md border border-gray-200 dark:border-gray-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="bx bx-message-square-dots text-blue-500 text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Testimonials Coming Soon</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-0">
              I'm currently collecting feedback from clients and colleagues I've worked with.
              <br />Check back soon to see what others have to say about working with me!
            </p>
          </motion.div>
        )}
        
        {/* CTA Section - always visible */}
        <motion.div 
          className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">Worked with me before?</h3>
          <p className="text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            I'd love to hear about your experience working with me. Your feedback helps me improve and assists others in making informed decisions.
          </p>
          <div className="flex justify-center">
            <a 
              href="mailto:mail@finneh.xyz?subject=Testimonial for Ethan Cornwill&body=Hi Ethan, I'd like to share my experience working with you..."
              className="btn bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white border-none"
            >
              <i className="bx bx-message-square-dots mr-2"></i>
              Share Your Experience
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;