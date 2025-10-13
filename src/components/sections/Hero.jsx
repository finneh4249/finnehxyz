import React, { useEffect, useRef, useCallback } from 'react';
import TypingEffect from '../TypingEffect';

function Hero() {
const heroRef = useRef(null);

// Throttle function to limit execution frequency
const throttle = (callback, delay) => {
let lastCall = 0;
return function(...args) {
const now = Date.now();
if (now - lastCall >= delay) {
lastCall = now;
callback(...args);
}
};
};

// Memoize the mousemove handler with useCallback
const handleMouseMove = useCallback(throttle((e) => {
if (!heroRef.current) return;

code
Code
download
content_copy
expand_less
const moveX = (e.clientX - window.innerWidth / 2) / 50;
const moveY = (e.clientY - window.innerHeight / 2) / 50;

// Apply subtle movements only to important elements
const elements = heroRef.current.querySelectorAll('.parallax-element');
elements.forEach((el) => {
  const depth = parseFloat(el.getAttribute('data-depth')) || 1;
  const translationX = moveX * depth;
  const translationY = moveY * depth;
  
  // Use transform translate3d for hardware acceleration
  el.style.transform = `translate3d(${translationX}px, ${translationY}px, 0)`;
});

}, 20), []);

useEffect(() => {
window.addEventListener('mousemove', handleMouseMove, { passive: true });
return () => window.removeEventListener('mousemove', handleMouseMove);
}, [handleMouseMove]);

return (
<section
ref={heroRef}
className="min-h-screen flex flex-col justify-center items-center relative pt-16 pb-32 overflow-hidden"
>
{/* Removing problematic pattern and gradient elements */}

code
Code
download
content_copy
expand_less
{/* Adding a simpler, more reliable gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-base-300 via-base-100 to-base-300"></div>
  
  {/* Add a few subtle accent elements that will definitely be visible */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
  
  {/* Simple corner accents */}
  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent"></div>
  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary/20 to-transparent"></div>
  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-secondary/20 to-transparent"></div>
  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/20 to-transparent"></div>



  <div id="hero" className="container mx-auto px-4 text-center relative z-10">
    {/* Animated profile image - using will-change for rendering optimization */}
    <div className="mb-8 relative parallax-element will-change-transform" data-depth="0.5">
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary opacity-75 blur-sm animate-pulse-very-slow"></div>
      <div className="avatar relative transform transition-all duration-500 hover:scale-105 hover:rotate-3">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full ring ring-primary ring-offset-4 ring-offset-base-100 mx-auto shadow-xl overflow-hidden">
          <img
            src="/images/ethan.jpg"
            alt="Ethan Cornwill"
            className="object-cover w-full h-full"
            loading="eager" // Prioritize image loading
            fetchpriority="high"
          />
        </div>
      </div>
    </div>
    
    <div className="mb-4 animate-fadeIn">
      <h1 className="text-4xl md:text-5xl font-bold">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient">
          Hi, I'm Ethan!
        </span>
      </h1>
    </div>
    
    {/* Updated USP statement with more personable tone */}
    <div className="mb-6 animate-fadeIn" style={{animationDelay: "0.15s"}}>
      <p className="text-lg md:text-xl text-base-content/90 max-w-2xl mx-auto">
        A <span className="text-primary font-medium">Technical Lead and AI Developer</span> bridging 
        <span className="text-secondary font-medium"> real-world business challenges and intelligent, scalable software solutions.</span>
      </p>
      <p className="text-lg md:text-xl text-base-content/90 max-w-2xl mx-auto mt-2">
        Blending a decade of operational leadership with hands-on technical expertise to turn ideas into impact.
      </p>
    </div>
    
    <div className="mb-10 animate-fadeIn" style={{animationDelay: "0.2s"}}>
      <h2 className="text-xl md:text-2xl text-base-content/80 max-w-2xl mx-auto h-12">
        <TypingEffect
          strings={[
            "Technical Lead & AI Developer",
            "Bridging operational leadership and software engineering",
            "I build intelligent, scalable systems",
            "Creator of the Axion venture framework",
            "TDD and Clean Code advocate",
          ]}
          typingSpeed={80}
          deletingSpeed={40}
          delayBetweenStrings={2000}
        />
      </h2>


      <div className="mt-4 flex flex-wrap justify-center gap-2 px-2">
        <div className="badge badge-primary">Technical Lead</div>
        <div className="badge badge-secondary">AI Developer</div>
        <div className="badge badge-accent">Problem Solver</div>
      </div>
    </div>
    
    {/* Enhanced social links */}
    <div className="flex justify-center gap-6 animate-fadeIn" style={{animationDelay: "0.4s"}}>
      <a href="https://github.com/finneh4249" target="_blank" rel="noopener noreferrer"
        className="social-icon-link group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 blur-md group-hover:animate-pulse-slow transition-all duration-300"></div>
        <div className="relative p-0.5 rounded-full bg-gradient-to-br from-primary via-secondary to-accent">
          <div className="btn btn-circle bg-base-100 hover:bg-base-100/90 border-0 p-3 h-14 w-14 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <i className="bx bxl-github text-3xl group-hover:text-primary transition-colors"></i>
          </div>
        </div>
      </a>

      <a href="https://twitter.com/melbPAT" target="_blank" rel="noopener noreferrer"
        className="social-icon-link group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 blur-md group-hover:animate-pulse-slow transition-all duration-300"></div>
        <div className="relative p-0.5 rounded-full bg-gradient-to-br from-primary via-secondary to-accent">
          <div className="btn btn-circle bg-base-100 hover:bg-base-100/90 border-0 p-3 h-14 w-14 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <i className="bx bxl-twitter text-3xl group-hover:text-primary transition-colors"></i>
          </div>
        </div>
      </a>

      <a href="https://www.linkedin.com/in/ethancornwill/" target="_blank" rel="noopener noreferrer"
        className="social-icon-link group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 blur-md group-hover:animate-pulse-slow transition-all duration-300"></div>
        <div className="relative p-0.5 rounded-full bg-gradient-to-br from-primary via-secondary to-accent">
          <div className="btn btn-circle bg-base-100 hover:bg-base-100/90 border-0 p-3 h-14 w-14 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <i className="bx bxl-linkedin text-3xl group-hover:text-primary transition-colors"></i>
          </div>
        </div>
      </a>

      <a href="https://cityloopers.com/discord" target="_blank" rel="noopener noreferrer"
        className="social-icon-link group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 blur-md group-hover:animate-pulse-slow transition-all duration-300"></div>
        <div className="relative p-0.5 rounded-full bg-gradient-to-br from-primary via-secondary to-accent">
          <div className="btn btn-circle bg-base-100 hover:bg-base-100/90 border-0 p-3 h-14 w-14 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <i className="bx bxl-discord text-3xl group-hover:text-primary transition-colors"></i>
          </div>
        </div>
      </a>
    </div>

    {/* Repositioned and enhanced scroll down button */}
    <div className="mt-24 mb-4">
      <a 
        href="#aboutme" 
        className="group inline-flex flex-col items-center py-3 px-6 rounded-full 
                   bg-base-100/50 backdrop-blur-sm shadow-lg hover:shadow-xl 
                   border border-primary/20 hover:border-primary/40
                   transition-all duration-300 hover:-translate-y-1 scroll-indicator"
      >
        <span className="text-sm mb-1 text-base-content/90 group-hover:text-primary font-medium tracking-wide">
          DISCOVER MORE
        </span>
        <div className="flex justify-center">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-center justify-center group-hover:border-primary transition-colors">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-scroll-dot"></div>
          </div>
        </div>
      </a>
    </div>
  </div>
</section>

);
}

export default Hero;