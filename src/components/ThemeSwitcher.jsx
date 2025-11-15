import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="brutal-btn bg-white dark:bg-base-200 w-12 h-12 flex items-center justify-center relative overflow-hidden"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun icon */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-6 w-6 absolute transition-all duration-300 ${
          theme === 'light' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 rotate-180 scale-50'
        }`}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="square" strokeLinejoin="miter" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      
      {/* Moon icon */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-6 w-6 absolute transition-all duration-300 ${
          theme === 'dark' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-180 scale-50'
        }`}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="square" strokeLinejoin="miter" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  );
}

export default ThemeSwitcher;
