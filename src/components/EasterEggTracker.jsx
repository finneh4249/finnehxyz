import { useEffect, useState } from 'react';

/**
 * EasterEggTracker - Tracks discovered easter eggs and unlocks secret page
 * 
 * Easter Eggs to Find:
 * 1. Konami Code (↑↑↓↓←→←→BA)
 * 2. hireethan() console command
 * 3. Double-click navbar logo (disco mode)
 * 4. Click profile image in Hero
 * 5. Click transparency card in About
 * 6. Click copyright in footer 5+ times
 * 7. Hold Shift + move mouse (cursor trail)
 * 8. Scroll really fast (speed scroll detector)
 * 9. Wait for floating emojis to appear
 */

const EasterEggTracker = () => {
  const [foundEggs, setFoundEggs] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('foundEasterEggs');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [showSecretUnlock, setShowSecretUnlock] = useState(false);

  const totalEggs = 9;
  const eggNames = {
    konami: '🎮 Konami Code',
    hireethan: '💼 hireethan() Command',
    navbarDisco: '🕺 Navbar Disco Mode',
    heroImage: '🖼️ Hero Image Click',
    transparencyCard: '🔍 Transparency Card',
    copyrightClick: '©️ Copyright Click',
    cursorTrail: '✨ Cursor Trail',
    speedScroll: '⚡ Speed Scroll',
    floatingEmoji: '😊 Floating Emoji'
  };

  useEffect(() => {
    // Save to localStorage whenever foundEggs changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('foundEasterEggs', JSON.stringify(foundEggs));
      
      // Check if all eggs found
      if (foundEggs.length === totalEggs && !showSecretUnlock) {
        unlockSecret();
      }
    }
  }, [foundEggs]);

  useEffect(() => {
    // Global function to mark an egg as found
    window.markEasterEggFound = (eggId) => {
      if (!foundEggs.includes(eggId)) {
        const newFoundEggs = [...foundEggs, eggId];
        setFoundEggs(newFoundEggs);
        
        console.log('%c🎊 EASTER EGG FOUND! 🎊', 'color: #FFE600; font-size: 20px; font-weight: bold;');
        console.log('%c' + eggNames[eggId], 'color: #FF006E; font-size: 16px; font-weight: bold;');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00B4D8;');
        console.log(`%c${newFoundEggs.length}/${totalEggs} Easter Eggs Found`, 'color: #06FFA5; font-size: 14px; font-weight: bold;');
        
        if (newFoundEggs.length < totalEggs) {
          console.log('%cKeep exploring to find them all! 🔍', 'color: #B75CFF; font-size: 12px;');
        }
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00B4D8;');
      }
    };

    // Console command to check progress
    window.eggprogress = () => {
      console.clear();
      console.log('%c🥚 EASTER EGG PROGRESS 🥚', 'color: #FFE600; font-size: 24px; font-weight: bold;');
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00B4D8;');
      console.log(`%cFound: ${foundEggs.length}/${totalEggs}`, 'color: #06FFA5; font-size: 16px; font-weight: bold;');
      console.log('%c', '');
      
      Object.entries(eggNames).forEach(([id, name]) => {
        const found = foundEggs.includes(id);
        const status = found ? '✅' : '❓';
        const color = found ? '#06FFA5' : '#666';
        console.log(`%c${status} ${name}`, `color: ${color}; font-size: 12px;`);
      });
      
      console.log('%c', '');
      if (foundEggs.length === totalEggs) {
        console.log('%c🎊 ALL EGGS FOUND! Visit /secret 🎊', 'color: #FFE600; font-size: 16px; font-weight: bold;');
      } else {
        console.log(`%c${totalEggs - foundEggs.length} more to find... Keep looking! 🔍`, 'color: #B75CFF; font-size: 12px;');
      }
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00B4D8;');
      
      return `${foundEggs.length}/${totalEggs} eggs found`;
    };

    // Reset command (for testing)
    window.reseteggs = () => {
      localStorage.removeItem('foundEasterEggs');
      setFoundEggs([]);
      console.log('%c🔄 Easter egg progress reset!', 'color: #FF006E; font-size: 14px; font-weight: bold;');
      return 'Progress reset. Start hunting again! 🥚';
    };

    return () => {
      delete window.markEasterEggFound;
      delete window.eggprogress;
      delete window.reseteggs;
    };
  }, [foundEggs]);

  const unlockSecret = () => {
    setShowSecretUnlock(true);
    
    console.clear();
    console.log('%c🎊🎊🎊 CONGRATULATIONS! 🎊🎊🎊', 'color: #FFE600; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 0px #000;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00B4D8;');
    console.log('%c', '');
    console.log('%cYOU FOUND ALL ' + totalEggs + ' EASTER EGGS!', 'color: #FF006E; font-size: 20px; font-weight: bold;');
    console.log('%c', '');
    console.log('%c🔓 SECRET UNLOCKED! 🔓', 'color: #06FFA5; font-size: 18px; font-weight: bold;');
    console.log('%c', '');
    console.log('%cVisit /secret for one more surprise...', 'color: #B75CFF; font-size: 16px; font-weight: bold;');
    console.log('%c', '');
    console.log('%cYou\'re in the top 0.1% of visitors.', 'color: #fff; font-size: 14px;');
    console.log('%cHere\'s something special just for you. 🎁', 'color: #fff; font-size: 14px;');
    console.log('%c', '');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00B4D8;');

    // Show visual notification
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #FFE600;
        color: #000;
        padding: 3rem;
        border: 8px solid #000;
        box-shadow: 16px 16px 0px 0px #000;
        z-index: 10000;
        text-align: center;
        max-width: 500px;
        animation: bounceIn 0.5s ease-out;
      ">
        <div style="font-size: 48px; margin-bottom: 1rem;">🎊</div>
        <div style="font-size: 28px; font-weight: bold; margin-bottom: 1rem; text-transform: uppercase;">
          ALL EGGS FOUND!
        </div>
        <div style="font-size: 18px; margin-bottom: 1.5rem; font-weight: bold;">
          ${totalEggs}/${totalEggs} Easter Eggs Discovered
        </div>
        <div style="font-size: 16px; margin-bottom: 2rem;">
          You're one of the <strong>0.1%</strong> who explores everything.
          <br/>Here's your reward:
        </div>
        <a 
          href="/secret" 
          style="
            display: inline-block;
            background: #FF006E;
            color: #fff;
            padding: 1rem 2rem;
            border: 4px solid #000;
            box-shadow: 6px 6px 0px #000;
            font-weight: bold;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 18px;
            transition: all 0.2s;
          "
          onmouseover="this.style.transform='translate(3px, 3px)'; this.style.boxShadow='3px 3px 0px #000';"
          onmouseout="this.style.transform='translate(0, 0)'; this.style.boxShadow='6px 6px 0px #000';"
        >
          🔓 Visit Secret Page
        </a>
        <div style="font-size: 12px; margin-top: 1.5rem; opacity: 0.7;">
          (Click anywhere to dismiss)
        </div>
      </div>
    `;

    // Add bounce animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounceIn {
        0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.05); }
        70% { transform: translate(-50%, -50%) scale(0.9); }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    const removeNotification = () => {
      notification.remove();
      style.remove();
    };

    notification.addEventListener('click', removeNotification);
  };

  return null;
};

export default EasterEggTracker;
