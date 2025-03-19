import React, { useEffect, useRef } from 'react';

// Google Analytics Measurement ID - replace with your actual GA ID
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Helper function to load Google Analytics script
const loadGoogleAnalytics = () => {
  if (typeof window !== 'undefined' && !window.ga) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
  }
};

// Main Analytics component
const Analytics = () => {
  const scrollDepthsTriggered = useRef({});
  let scrollTimeout = useRef(null);
  
  useEffect(() => {
    // Only initialize in production environment
    if (process.env.NODE_ENV === 'production') {
      loadGoogleAnalytics();
      
      // Track initial page view
      trackPageView();
      
      // Add listener for scroll depth tracking
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (process.env.NODE_ENV === 'production') {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      }
    };
  }, []);
  
  // Throttled scroll handler for performance
  const handleScroll = () => {
    if (scrollTimeout.current) return;
    
    scrollTimeout.current = setTimeout(() => {
      const scrollDepths = [25, 50, 75, 100];
      const scrollPercent = Math.floor(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !scrollDepthsTriggered.current[depth]) {
          trackEvent('Scroll Depth', 'Scrolled', `${depth}%`);
          scrollDepthsTriggered.current[depth] = true;
        }
      });
      
      scrollTimeout.current = null;
    }, 500);
  };
  
  // This is a utility component that doesn't render anything visible
  return null;
};

// Helper utility functions for tracking
export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && window.gtag && process.env.NODE_ENV === 'production') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path || window.location.pathname,
    });
  }
};

export const trackEvent = (category, action, label, value) => {
  if (typeof window !== 'undefined' && window.gtag && process.env.NODE_ENV === 'production') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Utility function to track outbound links
export const trackOutboundLink = (url) => {
  if (typeof window !== 'undefined' && window.gtag && process.env.NODE_ENV === 'production') {
    trackEvent('Outbound Link', 'Click', url);
  }
};

export default Analytics;
