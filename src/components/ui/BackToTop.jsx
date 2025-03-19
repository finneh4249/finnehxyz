import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = ({ threshold = 300, right = 6, bottom = 6 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Track scroll position and update visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);
  
  // Scroll to top with smooth behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white rounded-full shadow-lg p-3 z-50"
          style={{ 
            right: `${right}px`, 
            bottom: `${bottom}px`
          }}
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <i className="bx bx-up-arrow-alt text-2xl"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
