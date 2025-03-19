import React, { useState, useEffect, useCallback, useRef } from 'react';

const TypingEffect = ({ 
  strings = [], 
  className, 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  delayBetweenStrings = 2000 
}) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [phase, setPhase] = useState('typing'); // typing, pausing, deleting
  const timeoutRef = useRef(null);
  
  // Use a memoized handler for typing effect
  const handleTypingEffect = useCallback(() => {
    // Return early if no strings
    if (strings.length === 0) return;
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Handle typing phase
    if (phase === 'typing') {
      if (currentText.length < strings[currentStringIndex].length) {
        // Continue typing current string
        timeoutRef.current = setTimeout(() => {
          setCurrentText(strings[currentStringIndex].substring(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, pause before deleting
        timeoutRef.current = setTimeout(() => {
          setPhase('pausing');
        }, delayBetweenStrings);
      }
    }
    // Handle pausing phase
    else if (phase === 'pausing') {
      timeoutRef.current = setTimeout(() => {
        setPhase('deleting');
      }, 500);
    }
    // Handle deleting phase
    else if (phase === 'deleting') {
      if (currentText.length > 0) {
        // Continue deleting current string
        timeoutRef.current = setTimeout(() => {
          setCurrentText(prev => prev.substring(0, prev.length - 1));
        }, deletingSpeed);
      } else {
        // Move to next string once current one is deleted
        setPhase('typing');
        setCurrentStringIndex(prev => (prev + 1) % strings.length);
      }
    }
  }, [currentText, currentStringIndex, phase, strings, typingSpeed, deletingSpeed, delayBetweenStrings]);
  
  useEffect(() => {
    handleTypingEffect();
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleTypingEffect]);
  
  return (
    <span className={className}>
      {currentText}
      <span className="animate-blink inline-block w-1 h-6 ml-1 bg-primary"></span>
    </span>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(TypingEffect);
