import React, { useState, useEffect, useRef, memo } from 'react';
import NavLink from './NavLink';
import ThemeSwitcher from './ThemeSwitcher';
import ScrollProgressBar from './ScrollProgressBar';

// Navigation links data array - added Contact
const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'aboutme', label: 'About Me' },
  { id: 'professionalExperience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

function Navbar({ activeSection }) {
  const [isNavActive, setIsNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef(null);

  // Toggle mobile menu
  const toggleNav = () => {
    setIsNavActive(!isNavActive);
    // Lock body scroll when menu is open
    document.body.classList.toggle('overflow-hidden', !isNavActive);
  };

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsNavActive(false);
    document.body.classList.remove('overflow-hidden');
  };

  // Detect scrolling for navbar styling
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

  // Close mobile menu when clicking outside
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-base-100 shadow-md' : 'bg-base-100/90'
      }`}
    >
      {/* Scroll Progress Bar - positioned at the very top */}
      <ScrollProgressBar className="absolute top-0 left-0" />
      
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-3 px-4">
          {/* Logo/Name */}
          <a href="#hero" className="font-bold text-xl hover:text-primary transition-colors">
            Ethan Cornwill
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <ul className="flex space-x-1 mr-4">
              {navLinks.map(link => (
                <NavLink 
                  key={link.id} 
                  href={`#${link.id}`} 
                  isActive={activeSection === link.id}
                >
                  {link.label}
                </NavLink>
              ))}
            </ul>
            
            {/* Print Resume Button */}
          
            <ThemeSwitcher />
          </div>
          
          {/* Mobile Navigation Button and Theme Switcher */}
          <div className="flex items-center lg:hidden">
            
            <ThemeSwitcher />
            
            <button 
              className={`ml-2 p-2 rounded-full transition-all duration-200 ${
                isNavActive 
                  ? 'bg-primary/20 text-primary' 
                  : 'hover:bg-base-200'
              }`}
              onClick={toggleNav}
              aria-label="Toggle navigation menu"
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
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Material UI-style Mobile Menu Popover */}
      <div 
        ref={mobileMenuRef}
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isNavActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isNavActive}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isNavActive ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleLinkClick}
        ></div>
        
        {/* Menu Panel */}
        <div 
          className={`absolute right-0 top-0 h-full w-64 bg-base-100 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isNavActive ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu Header */}
          <div className="p-4 border-b border-base-300/50 flex items-center justify-between">
            <h3 className="text-lg font-medium">Menu</h3>
            <button 
              onClick={handleLinkClick}
              className="p-1 rounded-full hover:bg-base-200 transition-colors"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Menu Links */}
          <div className="p-4">
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`} 
                    className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === link.id 
                        ? 'bg-primary/15 text-primary font-medium' 
                        : 'hover:bg-base-200 text-base-content/80'
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

// Export memoized version to prevent unnecessary re-renders
export default memo(Navbar);
