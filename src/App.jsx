import React, { useState, useEffect, useCallback, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import DarkModeListener from './components/DarkModeListener';
import Footer from './components/Footer';
import OptimizedImage from './components/OptimizedImage';
import { ImageOptimizationProvider } from './contexts/ImageOptimizationContext';
import LazyLoad from './components/LazyLoad';
import { preloadAllData } from './utils/DataPreloader';
import Analytics from './components/Analytics';
import { getSectionMeta, getStructuredData } from './utils/seo';
import Testimonials from './components/Testimonials';
import ErrorBoundary from './components/ErrorBoundary';
import BackToTop from './components/ui/BackToTop';
import Contact from './components/Contact.jsx'; // Make sure to include the file extension

// Core components that are not lazy loaded for immediate display
const MemoizedComponent = memo(({ children }) => children);

function App() {
  const [activeSection, setActiveSection] = useState('');
  const [dataPreloaded, setDataPreloaded] = useState(false);
  
  // Get SEO meta data based on active section
  const seoMeta = getSectionMeta(activeSection || 'home');
  const personSchema = getStructuredData('Person');
  const websiteSchema = getStructuredData('WebSite');
  
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
      <DarkModeListener>
        <ImageOptimizationProvider>
          <Helmet>
            <title>{seoMeta.title}</title>
            {seoMeta.meta.map((item, index) => (
              <meta key={`meta-${index}`} {...item} />
            ))}
            {seoMeta.link.map((item, index) => (
              <link key={`link-${index}`} {...item} />
            ))}
            <script type="application/ld+json">
              {JSON.stringify(personSchema)}
            </script>
            <script type="application/ld+json">
              {JSON.stringify(websiteSchema)}
            </script>
          </Helmet>
          
          <Analytics />
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
              importPath="components/ProfessionalExperience"
              componentName="Professional Experience" 
              rootMargin="300px"
            />
          </ErrorBoundary>
          
          <ErrorBoundary componentName="Education Section">
            <LazyLoad 
              importPath="components/Education"
              componentName="Education" 
              rootMargin="400px"
            />
          </ErrorBoundary>
          
          <ErrorBoundary componentName="Skills Section">
            <LazyLoad 
              importPath="components/Skills"
              componentName="Skills" 
              rootMargin="500px"
            />
          </ErrorBoundary>
          
          <ErrorBoundary componentName="Projects Section">
            <LazyLoad 
              importPath="components/Projects"
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
              importPath="components/Contact"
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
      </DarkModeListener>
    </ErrorBoundary>
  );
}

export default memo(App);
export { OptimizedImage };
