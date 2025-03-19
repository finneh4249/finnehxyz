import React, { useState } from 'react';
import { trackEvent } from './Analytics';

/**
 * SocialShareButtons component that allows visitors to share the portfolio
 * @param {Object} props - Component props
 * @param {string} props.title - Title to use when sharing (defaults to page title)
 * @param {string} props.description - Description to use when sharing
 * @param {string} props.url - URL to share (defaults to current URL)
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.showText - Whether to show text labels next to icons
 * @param {boolean} props.compact - Whether to show a more compact design
 */
const SocialShareButtons = ({ 
  title, 
  description, 
  url, 
  className = '',
  showText = false,
  compact = false
}) => {
  const [copied, setCopied] = useState(false);
  
  // Set default values if not provided
  const shareTitle = title || document.title;
  const shareUrl = url || window.location.href;
  const shareDescription = description || "Check out this awesome portfolio!";
  
  // Share handlers for different platforms
  const handleShare = (platform) => {
    trackEvent('Social', 'Share', platform);
    
    let shareLink;
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
        
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      
      case 'reddit':
        shareLink = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`;
        break;
        
      case 'email':
        shareLink = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareDescription + '\n\n' + shareUrl)}`;
        break;
        
      default:
        return;
    }
    
    // Open in a new window
    window.open(shareLink, '_blank', 'width=600,height=400');
  };
  
  // Handle copy to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      trackEvent('Social', 'Share', 'CopyLink');
      
      // Reset copy status after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };
  
  // Define button classes based on compact mode
  const buttonBaseClass = compact 
    ? 'w-8 h-8 rounded-full flex items-center justify-center text-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2' 
    : 'flex items-center justify-center rounded-lg px-3 py-2 transition-colors hover:shadow-md focus:outline-none focus:ring-2';
  
  // Define platforms and their properties
  const platforms = [
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'bx bxl-twitter',
      color: 'bg-blue-400 hover:bg-blue-500 text-white',
      ariaLabel: 'Share on Twitter'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'bx bxl-linkedin',
      color: 'bg-blue-700 hover:bg-blue-800 text-white',
      ariaLabel: 'Share on LinkedIn'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'bx bxl-facebook',
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      ariaLabel: 'Share on Facebook'
    },
    {
      id: 'reddit',
      name: 'Reddit',
      icon: 'bx bxl-reddit',
      color: 'bg-orange-600 hover:bg-orange-700 text-white',
      ariaLabel: 'Share on Reddit'
    },
    {
      id: 'email',
      name: 'Email',
      icon: 'bx bx-envelope',
      color: 'bg-gray-500 hover:bg-gray-600 text-white',
      ariaLabel: 'Share via Email'
    }
  ];
  
  return (
    <div className={`social-share-buttons ${className}`}>
      <div className="flex flex-wrap gap-2 items-center">
        {/* Share platform buttons */}
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => handleShare(platform.id)}
            className={`${buttonBaseClass} ${platform.color}`}
            aria-label={platform.ariaLabel}
          >
            <i className={platform.icon}></i>
            {showText && !compact && (
              <span className="ml-2">{platform.name}</span>
            )}
          </button>
        ))}
        
        {/* Copy link button */}
        <button
          onClick={handleCopyLink}
          className={`${buttonBaseClass} ${
            copied 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white'
          }`}
          aria-label="Copy link to clipboard"
        >
          <i className={`bx ${copied ? 'bx-check' : 'bx-link'}`}></i>
          {showText && !compact && (
            <span className="ml-2">{copied ? 'Copied!' : 'Copy Link'}</span>
          )}
        </button>
      </div>
    </div>
  );
};

// Share dialog component with title and description
export const ShareDialog = ({ 
  title = "Share this portfolio", 
  description, 
  url, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close dialog"
          >
            <i className="bx bx-x text-2xl"></i>
          </button>
        </div>
        
        {description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {description}
          </p>
        )}
        
        <SocialShareButtons 
          url={url}
          showText={true}
          className="mb-4"
        />
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              value={url || window.location.href}
              readOnly
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 pr-12 text-gray-800 dark:text-gray-200 text-sm"
              onClick={(e) => e.target.select()}
              aria-label="Share URL"
            />
            <button
              onClick={() => navigator.clipboard.writeText(url || window.location.href)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              aria-label="Copy link"
            >
              <i className="bx bx-copy"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShareButtons;
