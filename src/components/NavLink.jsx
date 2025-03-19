import React from 'react';

function NavLink({ href, isActive, children }) {
  return (
    <li>
      <a 
        href={href} 
        className={`px-3 py-2 rounded-md transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
          isActive ? 'bg-primary/15 text-primary font-medium' : 'text-base-content/80'
        }`}
      >
        {children}
      </a>
    </li>
  );
}

export default NavLink;