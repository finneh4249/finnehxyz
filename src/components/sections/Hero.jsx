import React from 'react';
import { motion } from 'framer-motion';
import TypingEffect from '../TypingEffect';

function Hero() {
  const handleImageClick = () => {
    // Mark easter egg as found
    if (window.markEasterEggFound) {
      window.markEasterEggFound('heroImage');
    }
    
    // Just show a fun visual message, no console spam
    const notification = document.createElement('div');
    notification.innerHTML = '📸 Fun fact: I used to manage the busiest Taco Bell in Australia. Now I build AI systems!';
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #FF006E;
      color: white;
      padding: 1.5rem 2rem;
      border: 6px solid #000;
      box-shadow: 10px 10px 0px 0px #000;
      z-index: 10000;
      font-weight: bold;
      font-size: 16px;
      max-width: 500px;
      text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transition = 'all 0.3s ease';
      notification.style.opacity = '0';
      notification.style.transform = 'translate(-50%, -50%) scale(0) rotate(180deg)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Add a fun shake animation
    const img = document.querySelector('#hero-image');
    if (img) {
      img.style.animation = 'shake 0.5s';
      setTimeout(() => {
        img.style.animation = '';
      }, 500);
    }
  };

  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center relative pt-20 pb-20 bg-base-100 overflow-hidden"
    >
      {/* Bold grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(#000 2px, transparent 2px),
            linear-gradient(90deg, #000 2px, transparent 2px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Chaotic brutal decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-48 bg-neo-yellow border-brutal-thick border-black shadow-brutal-lg rotate-12"></div>
      <div className="absolute bottom-20 right-10 w-40 h-32 bg-neo-pink border-brutal border-black shadow-brutal -rotate-12"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-neo-blue border-brutal-thick border-black shadow-brutal rotate-45"></div>
      <div className="absolute bottom-40 left-20 w-20 h-56 bg-neo-green border-brutal border-black shadow-brutal -rotate-6"></div>
      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-neo-purple border-brutal border-black shadow-brutal rotate-12"></div>
      <div className="absolute bottom-1/3 left-1/3 w-28 h-20 bg-neo-orange border-brutal-thick border-black shadow-brutal -rotate-12"></div>

      <div id="hero" className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Asymmetric layout */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Profile */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative md:ml-12"
            >
              {/* Neo-brutalist profile image with offset elements */}
              <div className="relative inline-block">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-neo-purple border-brutal-thick border-black shadow-brutal-xl rotate-6"></div>
                <div className="relative">
                  <div 
                    className="w-56 h-56 md:w-72 md:h-72 border-brutal-thick border-black shadow-brutal-lg overflow-hidden bg-white cursor-pointer hover:shadow-brutal-xl transition-all"
                    onClick={handleImageClick}
                    title="Click me for a surprise 👀"
                  >
                    <img
                      id="hero-image"
                      src="/images/ethan.jpg"
                      alt="Ethan Cornwill"
                      className="object-cover w-full h-full"
                      loading="eager"
                      fetchpriority="high"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-neo-yellow border-brutal border-black shadow-brutal -rotate-12"></div>
              </div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="relative">
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-4 -rotate-1">
                  Hi, I'm<br/>Ethan!
                </h1>
                <div className="h-3 w-40 bg-neo-pink border-brutal border-black -rotate-2 absolute -bottom-2 left-0"></div>
              </div>
              
              <div className="bg-neo-yellow border-brutal-thick border-black shadow-brutal-lg p-6 rotate-1">
                <p className="text-xl md:text-2xl font-bold uppercase leading-tight">
                  AI Engineer &<br/>Systems Architect
                </p>
              </div>

              <div className="bg-white dark:bg-base-200 border-brutal border-black shadow-brutal p-6 -rotate-1">
                <p className="text-lg font-medium leading-relaxed">
                  13+ years building software. 10 years managing operations.<br/>
                  Now I architect AI systems that survive production, not just demos that die in staging.
                </p>
              </div>
              
              <div className="bg-neo-blue border-brutal-thick border-black shadow-brutal-lg p-6 rotate-2">
                <h2 className="text-xl md:text-2xl font-bold uppercase min-h-[60px] flex items-center">
                  <TypingEffect
                    strings={[
                      "AI Systems Engineer",
                      "LLM Trainer & Evaluator",
                      "RAG Architect",
                      "Automation Specialist",
                    ]}
                    typingSpeed={80}
                    deletingSpeed={40}
                    delayBetweenStrings={2000}
                  />
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="brutal-btn brutal-pink px-5 py-3 rotate-2">AI Development</div>
                <div className="brutal-btn brutal-green px-5 py-3 -rotate-1">Agent Systems</div>
                <div className="brutal-btn brutal-purple px-5 py-3 rotate-1">Production ML</div>
              </div>
            </motion.div>
          </div>

          {/* Social links - Asymmetric bottom */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 flex justify-center gap-4 flex-wrap"
          >
            <a href="https://github.com/finneh4249" target="_blank" rel="noopener noreferrer"
              className="brutal-btn bg-white dark:bg-base-200 w-16 h-16 flex items-center justify-center rotate-3 hover:rotate-0 transition-all">
              <i className="bx bxl-github text-4xl"></i>
            </a>
            <a href="https://twitter.com/melbPAT" target="_blank" rel="noopener noreferrer"
              className="brutal-btn brutal-blue w-16 h-16 flex items-center justify-center -rotate-3 hover:rotate-0 transition-all">
              <i className="bx bxl-twitter text-4xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/ethancornwill/" target="_blank" rel="noopener noreferrer"
              className="brutal-btn bg-[#0077B5] text-white w-16 h-16 flex items-center justify-center rotate-6 hover:rotate-0 transition-all">
              <i className="bx bxl-linkedin text-4xl"></i>
            </a>
            <a href="https://cityloopers.com/discord" target="_blank" rel="noopener noreferrer"
              className="brutal-btn bg-[#5865F2] text-white w-16 h-16 flex items-center justify-center -rotate-6 hover:rotate-0 transition-all">
              <i className="bx bxl-discord text-4xl"></i>
            </a>
          </motion.div>

          {/* Scroll down indicator */}
          <div className="mt-16 text-center">
            <a href="#aboutme" className="brutal-btn brutal-yellow px-6 py-3 inline-flex items-center gap-2 animate-bounce rotate-1">
              <span className="font-bold uppercase">Scroll Down</span>
              <span className="text-2xl">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;