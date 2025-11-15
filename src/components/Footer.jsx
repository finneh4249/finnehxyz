import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { trackEvent, trackOutboundLink } from './Analytics';
import SocialShareButtons, { ShareDialog } from './SocialShareButtons';

const Footer = () => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [secretMessage, setSecretMessage] = useState('');
  const currentYear = new Date().getFullYear();
  
  const handleOpenShareDialog = () => {
    setShowShareDialog(true);
    trackEvent('Footer', 'Click', 'OpenShareDialog');
  };

  // Easter egg: Click the copyright multiple times
  const handleCopyrightClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    const messages = [
      '',
      '👀 Hmm?',
      '🤔 What are you doing?',
      '🎯 Keep clicking...',
      '🚀 Almost there...',
      '🎉 You did it! 🎊',
    ];
    
    if (newCount < messages.length) {
      setSecretMessage(messages[newCount]);
    }
    
    if (newCount === 5) {
      // Mark easter egg as found
      if (window.markEasterEggFound) {
        window.markEasterEggFound('copyrightClick');
      }
      
      setTimeout(() => {
        setSecretMessage('✨ Secret Unlocked! ✨');
      }, 100);
      
      setTimeout(() => {
        setSecretMessage('📦 Repo: github.com/finneh4249/finnehxyz');
      }, 2000);
    }
    
    if (newCount === 10) {
      setSecretMessage('🤯 OK, that\'s enough clicking!');
    }
    
    if (newCount > 10) {
      const funnyMessages = [
        '🛑 Seriously, stop',
        '😅 There\'s nothing more',
        '🤷 You can keep going...',
        '👻 But it\'s pointless',
        '🎪 Just random messages',
        '🔄 Over and over...',
        '💤 Aren\'t you bored?',
        '🍕 Want pizza instead?',
        '⚡ Fine, you win.',
        '🏆 Click Champion!',
      ];
      setSecretMessage(funnyMessages[Math.min(newCount - 11, funnyMessages.length - 1)]);
    }
  };

  return (
    <footer className="bg-base-100 border-t-brutal-thick border-black pt-16 pb-8 relative overflow-hidden">
      {/* Wild asymmetric decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-40 bg-neo-purple border-r-brutal-thick border-b-brutal-thick border-black rotate-6"></div>
      <div className="absolute bottom-0 right-0 w-40 h-56 bg-neo-orange border-l-brutal-thick border-t-brutal-thick border-black -rotate-6"></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-neo-yellow border-brutal border-black rotate-45"></div>
      <div className="absolute top-1/4 right-1/4 w-24 h-48 bg-neo-pink border-brutal-thick border-black -rotate-12"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="brutal-card bg-white dark:bg-base-200 -rotate-1 hover:rotate-0 transition-all">
              <div className="p-6">
                <h2 className="text-4xl font-bold uppercase mb-2 tracking-tight">Ethan Cornwill</h2>
                <p className="text-xl font-bold">Technical Lead & AI Developer</p>
              </div>
            </div>
            
            <div className="brutal-card bg-neo-blue rotate-1 hover:rotate-0 transition-all">
              <div className="p-6">
                <p className="font-bold uppercase mb-2">Quick Links</p>
                <div className="flex flex-wrap gap-3">
                  <a href="#aboutme" className="brutal-btn brutal-yellow px-4 py-2 text-sm rotate-2 hover:rotate-0">About</a>
                  <a href="#projects" className="brutal-btn brutal-pink px-4 py-2 text-sm -rotate-2 hover:rotate-0">Projects</a>
                  <a href="#skills" className="brutal-btn brutal-green px-4 py-2 text-sm rotate-1 hover:rotate-0">Skills</a>
                  <a href="#contact" className="brutal-btn brutal-purple px-4 py-2 text-sm -rotate-1 hover:rotate-0">Contact</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Social & Share */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="brutal-card bg-white dark:bg-base-200 rotate-2 hover:rotate-0 transition-all">
              <div className="p-6">
                <p className="font-bold uppercase mb-4">Connect With Me</p>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://github.com/finneh4249" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="brutal-btn bg-black text-white w-14 h-14 flex items-center justify-center rotate-6 hover:rotate-0 transition-all"
                    aria-label="GitHub Profile"
                    onClick={() => trackOutboundLink('https://github.com/finneh4249')}
                  >
                    <i className="bx bxl-github text-3xl"></i>
                  </a>
                  <a 
                    href="https://linkedin.com/in/ethancornwill" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="brutal-btn bg-[#0077B5] text-white w-14 h-14 flex items-center justify-center -rotate-6 hover:rotate-0 transition-all"
                    aria-label="LinkedIn Profile"
                    onClick={() => trackOutboundLink('https://linkedin.com/in/ethancornwill')}
                  >
                    <i className="bx bxl-linkedin text-3xl"></i>
                  </a>
                  <a 
                    href="https://twitter.com/melbPAT" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="brutal-btn brutal-blue w-14 h-14 flex items-center justify-center rotate-3 hover:rotate-0 transition-all"
                    aria-label="Twitter Profile"
                    onClick={() => trackOutboundLink('https://twitter.com/melbPAT')}
                  >
                    <i className="bx bxl-twitter text-3xl"></i>
                  </a>
                  <button
                    onClick={handleOpenShareDialog}
                    className="brutal-btn brutal-yellow w-14 h-14 flex items-center justify-center -rotate-3 hover:rotate-0 transition-all"
                    aria-label="Share this portfolio"
                  >
                    <i className="bx bx-share-alt text-3xl"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleOpenShareDialog}
              className="brutal-btn brutal-pink px-8 py-4 text-lg w-full -rotate-1 hover:rotate-0 transition-all"
            >
              <span className="font-bold uppercase">Share My Portfolio</span>
            </button>
          </motion.div>
        </div>
        
        <div className="border-t-brutal border-black pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div 
              className="brutal-btn bg-white dark:bg-base-200 px-6 py-3 rotate-1 cursor-pointer relative"
              onClick={handleCopyrightClick}
              whileHover={{ scale: 1.05, rotate: 0 }}
              whileTap={{ scale: 0.95 }}
            >
              <p className="font-bold">&copy; {currentYear} Ethan Cornwill. Built with Astro + React.</p>
              {secretMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 brutal-btn brutal-yellow px-4 py-2 text-sm whitespace-nowrap"
                >
                  {secretMessage}
                </motion.div>
              )}
            </motion.div>
            <div className="flex gap-3 font-bold">
              <a 
                href="mailto:mail@finneh.xyz" 
                className="brutal-btn brutal-yellow px-4 py-2 -rotate-1 hover:rotate-0 transition-all text-sm"
              >
                mail@finneh.xyz
              </a>
              <a 
                href="https://github.com/finneh4249" 
                target="_blank" 
                rel="noopener noreferrer"
                className="brutal-btn bg-white dark:bg-base-200 px-4 py-2 rotate-1 hover:rotate-0 transition-all text-sm"
              >
                View Source
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Share Dialog */}
      <ShareDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        title="Share My Portfolio"
        description="If you like my work, please share my portfolio with others!"
      />
    </footer>
  );
};

export default Footer;
