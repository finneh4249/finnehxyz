import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Secret floating emoji easter egg that appears randomly
const FloatingEmoji = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [emoji, setEmoji] = useState('🚀');
  const [hasFoundEgg, setHasFoundEgg] = useState(false);
  
  useEffect(() => {
    const emojis = ['🚀', '🤖', '⚡', '🔥', '💜', '🎯', '✨', '🎨', '🎮', '💻'];
    
    const showRandomEmoji = () => {
      if (Math.random() > 0.98) { // 2% chance
        setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
        setPosition({
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 100)
        });
        setIsVisible(true);
        
        // Mark easter egg as found on first appearance
        if (!hasFoundEgg && window.markEasterEggFound) {
          window.markEasterEggFound('floatingEmoji');
          setHasFoundEgg(true);
        }
        
        setTimeout(() => setIsVisible(false), 3000);
      }
    };
    
    const interval = setInterval(showRandomEmoji, 5000);
    return () => clearInterval(interval);
  }, [hasFoundEgg]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            fontSize: '48px',
            zIndex: 9999,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 10px rgba(255, 230, 0, 0.5))',
          }}
        >
          {emoji}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Secret message that appears when scrolling fast
const SpeedScrollDetector = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [hasFoundEgg, setHasFoundEgg] = useState(false);
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      
      if (timeDiff > 0) {
        const speed = scrollDiff / timeDiff;
        setScrollSpeed(speed);
        
        if (speed > 5) { // Fast scroll detected
          setShowMessage(true);
          
          // Mark easter egg as found on first fast scroll
          if (!hasFoundEgg && window.markEasterEggFound) {
            window.markEasterEggFound('speedScroll');
            setHasFoundEgg(true);
          }
          
          setTimeout(() => setShowMessage(false), 2000);
        }
      }
      
      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          style={{
            position: 'fixed',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10000,
            backgroundColor: '#FFE600',
            color: '#000',
            padding: '1rem 2rem',
            border: '4px solid #000',
            boxShadow: '6px 6px 0px 0px #000',
            fontWeight: 'bold',
            fontSize: '18px',
            textTransform: 'uppercase',
            pointerEvents: 'none',
          }}
        >
          ⚡ Woah! Slow down speed demon! ⚡
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Cursor trail effect that activates after holding Shift
const CursorTrail = () => {
  const [trails, setTrails] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [hasFoundEgg, setHasFoundEgg] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && !isActive) {
        setIsActive(true);
        
        // Mark easter egg as found on first activation
        if (!hasFoundEgg && window.markEasterEggFound) {
          window.markEasterEggFound('cursorTrail');
          setHasFoundEgg(true);
        }
        
        console.log('%c🎨 CURSOR TRAIL ACTIVATED!', 'color: #FF006E; font-size: 14px; font-weight: bold;');
        console.log('%cHold Shift and move your mouse around!', 'color: #06FFA5; font-size: 12px;');
      }
    };
    
    const handleKeyUp = (e) => {
      if (e.key === 'Shift') {
        setIsActive(false);
      }
    };
    
    const handleMouseMove = (e) => {
      if (isActive) {
        const newTrail = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color: ['#FFE600', '#FF006E', '#00B4D8', '#06FFA5', '#B75CFF'][Math.floor(Math.random() * 5)],
        };
        
        setTrails(prev => [...prev, newTrail].slice(-20)); // Keep last 20
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);
  
  useEffect(() => {
    if (trails.length > 0) {
      const timer = setTimeout(() => {
        setTrails(prev => prev.slice(1));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [trails]);
  
  return (
    <>
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            left: trail.x - 10,
            top: trail.y - 10,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: trail.color,
            pointerEvents: 'none',
            zIndex: 9998,
            border: '2px solid #000',
          }}
        />
      ))}
    </>
  );
};

// Main component that combines all hidden easter eggs
const HiddenEasterEggs = () => {
  return (
    <>
      <FloatingEmoji />
      <SpeedScrollDetector />
      <CursorTrail />
    </>
  );
};

export default HiddenEasterEggs;
