import React, { useState } from 'react';
import { trackEvent, trackOutboundLink } from './Analytics';
import SocialShareButtons, { ShareDialog } from './SocialShareButtons';

const Footer = () => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const currentYear = new Date().getFullYear();
  
  const handleOpenShareDialog = () => {
    setShowShareDialog(true);
    trackEvent('Footer', 'Click', 'OpenShareDialog');
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Ethan Cornwill</h2>
            <p className="text-gray-400 mt-1">Software Engineer</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://github.com/finneh4249" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub Profile"
                onClick={() => trackOutboundLink('https://github.com/finneh4249')}
              >
                <i className="bx bxl-github text-2xl"></i>
              </a>
              <a 
                href="https://linkedin.com/in/ethancornwill" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
                onClick={() => trackOutboundLink('https://linkedin.com/in/ethancornwill')}
              >
                <i className="bx bxl-linkedin text-2xl"></i>
              </a>
              <a 
                href="https://twitter.com/melbPAT" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter Profile"
                onClick={() => trackOutboundLink('https://twitter.com/melbPAT')}
              >
                <i className="bx bxl-twitter text-2xl"></i>
              </a>
              
              {/* Share button */}
              <button
                onClick={handleOpenShareDialog}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Share this portfolio"
              >
                <i className="bx bx-share-alt text-2xl"></i>
              </button>
            </div>
            
            <button
              onClick={handleOpenShareDialog}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
            >
              <i className="bx bx-share-alt mr-2"></i>
              Share My Portfolio
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} Ethan Cornwill. All rights reserved.</p>
          <div className="mt-2 md:mt-0 flex space-x-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Use</a>
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
