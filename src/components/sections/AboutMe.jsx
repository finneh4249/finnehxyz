import React from 'react';
import { motion } from 'framer-motion';

function AboutMe() {
  const handleTransparencyClick = () => {
    // Mark easter egg as found
    if (window.markEasterEggFound) {
      window.markEasterEggFound('transparencyCard');
    }
    
    const messages = [
      '🎯 Fun fact: This portfolio took ~4 hours to build with SPARC prompt library + Roo Code!',
      '🤖 I wrote the prompts. Roo Code executed them. Claude/GPT validated output.',
      '✨ That\'s the power of systematic prompt architecture!',
      '📊 Traditional build time would\'ve been 2+ weeks.',
      '⚡ Prompt engineering at scale isn\'t just faster. It\'s systematic.',
    ];
    
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    
    // Create floating notification
    const notification = document.createElement('div');
    notification.innerHTML = randomMsg;
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #FF006E;
      color: white;
      padding: 1.5rem 2rem;
      border: 4px solid #000;
      box-shadow: 8px 8px 0px 0px #000;
      z-index: 10000;
      font-weight: bold;
      font-size: 16px;
      max-width: 400px;
      text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transition = 'all 0.3s ease';
      notification.style.opacity = '0';
      notification.style.transform = 'translate(-50%, -50%) scale(0)';
      setTimeout(() => notification.remove(), 300);
    }, 2500);
  };

  return (
    <section id="aboutme" className="py-20 bg-neo-blue relative overflow-hidden">
      {/* Chaotic decorative elements */}
      <div className="absolute top-10 left-10 w-36 h-48 bg-neo-yellow border-brutal-thick border-black shadow-brutal-lg -rotate-6"></div>
      <div className="absolute bottom-10 right-10 w-48 h-32 bg-neo-pink border-brutal border-black shadow-brutal rotate-12"></div>
      <div className="absolute top-1/2 right-20 w-20 h-56 bg-neo-green border-brutal-thick border-black shadow-brutal rotate-6"></div>
      <div className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-neo-purple border-brutal border-black shadow-brutal -rotate-12"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-6 flex-wrap mb-6">
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight -rotate-2">
              About Me
            </h1>
            <div className="brutal-btn brutal-yellow px-6 py-3 rotate-3">
              WHO AM I?
            </div>
          </div>
          <div className="h-3 w-64 bg-black rotate-1"></div>
        </motion.div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8">
          {/* Main content - takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-6"
          >
            <div className="brutal-card bg-white dark:bg-base-200 -rotate-1 hover:rotate-0 transition-all">
              <div className="p-8">
                <h3 className="text-3xl mb-6 font-bold uppercase">
                  I Build AI Systems That Ship
                </h3>
                <p className="text-lg leading-relaxed font-medium">
                  Not demos. Not prototypes. Production systems handling real traffic.
                </p>
              </div>
            </div>
            
            <div className="brutal-card bg-neo-yellow rotate-1 hover:rotate-0 transition-all">
              <div className="p-8">
                <p className="text-lg leading-relaxed font-medium">
                  I've spent 13+ years writing code and 10 years managing operations where downtime costs money and failures are public. That combination taught me something most AI engineers miss: the gap between "works on my machine" and "works under load with actual users."
                </p>
              </div>
            </div>

            <div className="brutal-card bg-white dark:bg-base-200 -rotate-1 hover:rotate-0 transition-all">
              <div className="p-8">
                <p className="text-lg leading-relaxed font-medium">
                  I train LLMs at DataAnnotation. I evaluate model reasoning. I debug AI logic errors. I build RAG pipelines and agent systems. I deploy full-stack applications. All while maintaining ethical practices and radical transparency.
                </p>
              </div>
            </div>

            <div className="brutal-card bg-neo-purple rotate-1 hover:rotate-0 transition-all">
              <div className="p-8">
                <p className="text-xl font-bold uppercase leading-relaxed">
                  I wrote SPARC—a 3,000+ line prompt library for Roo Code with 12 specialized agents, security mandates, and TDD workflows. It's systematic prompt architecture that reduces scaffolding from 2 days to 4-6 hours. Not a framework. A way to encode production engineering into prompts.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sidebar - takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-6"
          >
            <div className="brutal-card bg-white dark:bg-base-200 rotate-2 hover:rotate-0 transition-all">
              <div className="p-6">
                <p className="font-bold uppercase mb-4 text-2xl -rotate-1">What I'm Shipping</p>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute -left-3 top-0 w-2 h-full bg-neo-pink rotate-2"></div>
                    <div className="pl-4">
                      <strong className="text-lg">SPARC Prompt Library:</strong>
                      <p className="mt-2 font-medium">3,000+ lines of prompt architecture for Roo Code. 12 agents with security controls, TDD enforcement, Big O tracking. Reduces scaffolding from days to hours. Built Fusion, MagnetLab projects, this portfolio.</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-3 top-0 w-2 h-full bg-neo-green rotate-2"></div>
                    <div className="pl-4">
                      <strong className="text-lg">Fusion Infrastructure:</strong>
                      <p className="mt-2 font-medium">Built alternative web platform (Astro + Sanity CMS) as rebrand proposal. Architected compliance systems for real political organization.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="brutal-card bg-neo-green -rotate-2 hover:rotate-0 transition-all cursor-pointer"
              onClick={handleTransparencyClick}
              title="Click me! 🎯"
            >
              <div className="p-6">
                <p className="text-xs font-bold leading-relaxed">
                  <strong className="block mb-2 text-sm uppercase">Full Transparency:</strong>
                  This portfolio was built using AI-human collaboration (Claude + ChatGPT + me). 
                  I believe in showing the work, not hiding the tools. The /secret page shows exactly how it was built.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <a href="#projects" className="brutal-btn brutal-pink px-6 py-4 text-lg inline-flex items-center gap-2 rotate-3 hover:rotate-0 transition-all w-full justify-center">
                <span className="font-bold uppercase">See My Work</span>
                <span className="text-2xl">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;