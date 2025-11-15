import React, { useState, useEffect, useCallback, memo } from 'react';
import Navbar from './Navbar';
import Hero from './sections/Hero.jsx';
import AboutMe from './sections/AboutMe.jsx';
import Footer from './Footer';
import BackToTop from './ui/BackToTop';
import Analytics from './Analytics';
import EasterEggs from './EasterEggs';
import HiddenEasterEggs from './HiddenEasterEggs';
import EasterEggTracker from './EasterEggTracker';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ImageOptimizationProvider } from '../contexts/ImageOptimizationContext';
import LazyLoad from './LazyLoad';
import { preloadAllData } from '../utils/DataPreloader';
import Testimonials from './sections/Testimonials.jsx';
import ErrorBoundary from './ErrorBoundary';

// Core components that are not lazy loaded for immediate display
const MemoizedComponent = memo(({ children }) => children);

function AppWrapper() {
  const [activeSection, setActiveSection] = useState('');
  const [dataPreloaded, setDataPreloaded] = useState(false);
  
  // Preload all data in the background
  useEffect(() => {
    preloadAllData().then(() => {
      setDataPreloaded(true);
    });
  }, []);
  
  // Throttled scroll handler for better performance
  const throttledScrollHandler = useCallback(() => {
    // Use requestAnimationFrame for better performance
    let ticking = false;
    
    return () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = document.querySelectorAll('section');
          let currentSection = '';
          
          sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 4) {
              currentSection = section.getAttribute('id');
            }
          });
          
          setActiveSection(currentSection);
          ticking = false;
        });
        
        ticking = true;
      }
    };
  }, []);

  // Setup scroll handler
  useEffect(() => {
    const handleScroll = throttledScrollHandler();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [throttledScrollHandler]);

  return (
    <ErrorBoundary componentName="Application Root">
      <ThemeProvider>
        <ImageOptimizationProvider>
          <Analytics />
          <EasterEggs />
          <HiddenEasterEggs />
          <EasterEggTracker />
          <Navbar activeSection={activeSection} />
          
          <ErrorBoundary componentName="Hero Section">
            <MemoizedComponent>
              <Hero />
            </MemoizedComponent>
          </ErrorBoundary>
          
          <ErrorBoundary componentName="About Me Section">
            <MemoizedComponent>
              <AboutMe />
            </MemoizedComponent>
          </ErrorBoundary>
          
          {/* Optimized lazy loaded components with progressive loading */}
          <ErrorBoundary componentName="Professional Experience Section">
            <LazyLoad 
              componentKey="ProfessionalExperience"
              componentName="Professional Experience" 
              rootMargin="300px"
            />
          </ErrorBoundary>
          
          <ErrorBoundary componentName="Education Section">
            <LazyLoad 
              componentKey="Education"
              componentName="Education" 
              rootMargin="400px"
            />
          </ErrorBoundary>
          
          <ErrorBoundary componentName="Skills Section">
            <LazyLoad 
              componentKey="Skills"
              componentName="Skills" 
              rootMargin="500px"
            />
          </ErrorBoundary>
          
          <ErrorBoundary componentName="Projects Section">
            <LazyLoad 
              componentKey="Projects"
              componentName="Projects" 
              rootMargin="600px"
            />
          </ErrorBoundary>
          
          {/* Add the Testimonials component before Contact */}
          <ErrorBoundary componentName="Testimonials Section">
            <MemoizedComponent>
              <Testimonials />
            </MemoizedComponent>
          </ErrorBoundary>
          
          <ErrorBoundary componentName="Contact Section">
            <LazyLoad 
              componentKey="Contact"
              componentName="Contact" 
              rootMargin="700px"
            />
          </ErrorBoundary>
          
          <ErrorBoundary componentName="Footer">
            <MemoizedComponent>
              <Footer />
            </MemoizedComponent>
          </ErrorBoundary>
          <BackToTop />
        </ImageOptimizationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default memo(AppWrapper);
