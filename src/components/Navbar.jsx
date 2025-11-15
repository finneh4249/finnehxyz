import React, { useState, useEffect, useRef, memo } from 'react';
import NavLink from './NavLink';
import ThemeSwitcher from './ThemeSwitcher';
import ScrollProgressBar from './ScrollProgressBar';

// Navigation links data array
const navLinks = [
  { id: 'hero', label: 'Home', type: 'anchor' },
  { id: 'aboutme', label: 'About', type: 'anchor' },
  { id: 'professionalExperience', label: 'Experience', type: 'anchor' },
  { id: 'education', label: 'Education', type: 'anchor' },
  { id: 'skills', label: 'Skills', type: 'anchor' },
  { id: 'projects', label: 'Projects', type: 'anchor' },
  { href: '/blog', label: 'Blog', type: 'page' },
  { id: 'contact', label: 'Contact', type: 'anchor' }
];

function Navbar({ activeSection }) {
  const [isNavActive, setIsNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const mobileMenuRef = useRef(null);

  const handleLogoDoubleClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    if (newCount === 1) {
      // First double click - Mark easter egg as found
      if (window.markEasterEggFound) {
        window.markEasterEggFound('navbarDisco');
      }
      
      const colors = ['#FFE600', '#FF006E', '#00B4D8', '#06FFA5', '#B75CFF', '#FF6B35'];
      let colorIndex = 0;
      
      const interval = setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
      }, 200);
      
      setTimeout(() => {
        clearInterval(interval);
        document.body.style.backgroundColor = '';
      }, 2000);
      
      // Show message
      const notification = document.createElement('div');
      notification.innerHTML = '🌈 DISCO MODE ACTIVATED! 🌈';
      notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: #FFE600;
        color: #000;
        padding: 1rem 2rem;
        border: 4px solid #000;
        box-shadow: 6px 6px 0px 0px #000;
        z-index: 10001;
        font-weight: bold;
        font-size: 20px;
        text-transform: uppercase;
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 2500);
    } else if (newCount === 3) {
      // Third double click - rotate everything
      document.body.style.transition = 'transform 1s ease';
      document.body.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        document.body.style.transform = '';
      }, 1000);
      
      console.log('%c🎪 You found the rotation easter egg!', 'color: #FF006E; font-size: 16px; font-weight: bold;');
    } else if (newCount >= 5) {
      // Stop the madness
      setLogoClickCount(0);
      alert('🛑 OK, you can stop double-clicking now! 😄');
    }
  };

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
    document.body.classList.toggle('overflow-hidden', !isNavActive);
  };

  const handleLinkClick = () => {
    setIsNavActive(false);
    document.body.classList.remove('overflow-hidden');
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNavActive && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsNavActive(false);
        document.body.classList.remove('overflow-hidden');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNavActive]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b-brutal border-black ${
        scrolled ? 'bg-base-100 shadow-brutal' : 'bg-base-100'
      }`}
    >
      <ScrollProgressBar className="absolute top-0 left-0" />
      
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4 px-4">
          {/* Logo */}
          <a 
            href="#hero" 
            className="font-bold text-2xl uppercase hover:text-primary transition-colors tracking-tight select-none"
            onDoubleClick={handleLogoDoubleClick}
            title="Try double-clicking me! 😉"
          >
            Ethan Cornwill
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map(link => (
              <a
                key={link.id || link.href}
                href={link.type === 'page' ? link.href : `#${link.id}`}
                className={`brutal-btn px-4 py-2 text-sm ${
                  activeSection === link.id 
                    ? 'brutal-yellow' 
                    : 'bg-white dark:bg-base-200'
                }`}
              >
                {link.label}
              </a>
            ))}
            
            <ThemeSwitcher />
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex items-center lg:hidden gap-2">
            <ThemeSwitcher />
            
            <button 
              className={`brutal-btn w-12 h-12 flex items-center justify-center ${
                isNavActive ? 'brutal-pink' : 'bg-white dark:bg-base-200'
              }`}
              onClick={toggleNav}
              aria-label="Toggle menu"
              aria-expanded={isNavActive}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                {isNavActive ? (
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Neo-brutalist Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-200 ${
          isNavActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isNavActive}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80"
          onClick={handleLinkClick}
        ></div>
        
        {/* Menu Panel */}
        <div 
          className={`absolute right-0 top-0 h-full w-80 max-w-full bg-base-100 border-l-brutal border-black shadow-brutal-xl transform transition-transform duration-300 ${
            isNavActive ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8 pb-4 border-b-brutal border-black">
              <h3 className="text-2xl font-bold uppercase">Menu</h3>
              <button 
                onClick={handleLinkClick}
                className="brutal-btn brutal-pink w-12 h-12 flex items-center justify-center"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.id || link.href}>
                  <a 
                    href={link.type === 'page' ? link.href : `#${link.id}`}
                    className={`brutal-btn w-full text-left block ${
                      activeSection === link.id 
                        ? 'brutal-yellow' 
                        : 'bg-white dark:bg-base-200'
                    }`}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default memo(Navbar);
