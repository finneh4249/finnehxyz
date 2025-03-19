import React, { useState, useEffect, useRef } from 'react';
import { trackEvent } from './Analytics';
import SocialShareButtons from './SocialShareButtons';

// Sample testimonial data - replace with actual data
const testimonialData = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "Senior Developer at TechCorp",
    image: "/images/testimonials/alex.jpg", // Add placeholder image
    text: "Working with Ethan was an incredible experience. His technical expertise and problem-solving abilities significantly contributed to our project's success. He consistently delivered high-quality code and innovative solutions.",
  },
  {
    id: 2,
    name: "Maya Rodriguez",
    position: "Product Manager at InnovateLabs",
    image: "/images/testimonials/maya.jpg",
    text: "Ethan's ability to translate complex technical concepts into accessible language made collaboration seamless. He not only delivered exceptional code but also provided valuable insights that improved our product strategy.",
  },
  {
    id: 3,
    name: "David Kim",
    position: "CTO at StartupVision",
    image: "/images/testimonials/david.jpg",
    text: "I've worked with many developers, but Ethan stands out for his combination of technical excellence and communication skills. He's proactive, detail-oriented, and genuinely cares about creating solutions that deliver real value.",
  },
  {
    id: 4,
    name: "Sarah Williams",
    position: "Engineering Lead at DataFlow",
    image: "/images/testimonials/sarah.jpg",
    text: "Ethan's deep understanding of software architecture and clean code principles made him an invaluable asset to our team. He consistently exceeded expectations and helped elevate our entire development process.",
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  const autoPlayIntervalRef = useRef(null);
  const sliderRef = useRef(null);
  
  // Handle navigation
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1);
    trackEvent('Testimonial', 'Navigate', 'Next');
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1);
    trackEvent('Testimonial', 'Navigate', 'Previous');
  };
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
    trackEvent('Testimonial', 'Navigate', `Dot-${index}`);
  };
  
  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayIntervalRef.current = setInterval(() => {
        nextSlide();
      }, 6000); // Change slide every 6 seconds
    }
    
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [currentIndex, isAutoPlaying]);
  
  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);
  
  // Touch controls for mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    
    // If swipe distance is significant enough (more than 50px)
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevSlide(); // Swipe right to go to previous
      } else {
        nextSlide(); // Swipe left to go to next
      }
    }
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <section 
      id="testimonials" 
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800 dark:text-white">
          What People Say
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Feedback from colleagues and clients about my work and collaboration style
        </p>
        
        <div 
          className="testimonial-slider relative max-w-4xl mx-auto overflow-hidden"
          ref={sliderRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Testimonial cards - will transform horizontally for sliding effect */}
          <div 
            className="testimonial-track flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            aria-live="polite"
          >
            {testimonialData.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id}
                data={testimonial}
                isActive={index === currentIndex}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous testimonial"
          >
            <i className='bx bx-chevron-left text-2xl'></i>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next testimonial"
          >
            <i className='bx bx-chevron-right text-2xl'></i>
          </button>
          
          {/* Indicator dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonialData.map((_, index) => (
              <button 
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
        
        {/* Add social share buttons at the bottom of the section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Found these testimonials helpful? Share with others:
          </p>
          <div className="flex justify-center">
            <SocialShareButtons 
              compact={true}
              title="See what people say about working with Ethan Cornwill"
              description="Check out these testimonials from clients and colleagues who have worked with Ethan Cornwill."
              className="justify-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ data, isActive }) => {
  return (
    <div 
      className="testimonial-card min-w-full px-4 animate-fadeIn"
      role="group"
      aria-roledescription="slide"
      aria-label={`Testimonial from ${data.name}`}
    >
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-blue-500">
              {data.image ? (
                <img 
                  src={data.image} 
                  alt={data.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=' + encodeURIComponent(data.name.charAt(0));
                  }}
                />
              ) : (
                <div className="w-full h-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-300">
                  {data.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
          <div className="ml-4">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white">
              {data.name}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {data.position}
            </p>
          </div>
        </div>
        
        <div className="relative">
          <i className='bx bxs-quote-left text-4xl text-blue-200 dark:text-blue-900 absolute -top-4 -left-2 opacity-60'></i>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-2 px-2 md:px-4 italic">
            {data.text}
          </p>
          <i className='bx bxs-quote-right text-4xl text-blue-200 dark:text-blue-900 absolute -bottom-4 -right-2 opacity-60'></i>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
