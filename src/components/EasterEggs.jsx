import { useEffect, useState } from 'react';

const EasterEggs = () => {
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [konamiActivated, setKonamiActivated] = useState(false);
  
  // Konami code sequence
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  useEffect(() => {
    // Console ASCII Art and Messages
    const consoleMessages = () => {
      console.log('%c' + `
  ███████╗████████╗██╗  ██╗ █████╗ ███╗   ██╗
  ██╔════╝╚══██╔══╝██║  ██║██╔══██╗████╗  ██║
  █████╗     ██║   ███████║███████║██╔██╗ ██║
  ██╔══╝     ██║   ██╔══██║██╔══██║██║╚██╗██║
  ███████╗   ██║   ██║  ██║██║  ██║██║ ╚████║
  ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
      `, 'color: #FFE600; font-weight: bold; font-size: 12px;');
      
      console.log('%c🚀 AI Engineer & Systems Architect', 'color: #FF006E; font-weight: bold; font-size: 16px;');
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00B4D8;');
      
      console.log('%c👋 Hey developer! Nice to see you checking the code.', 'color: #06FFA5; font-weight: bold; font-size: 14px;');
      console.log('%c', '');
      
      console.log('%c💡 Quick Facts:', 'color: #FFE600; font-weight: bold; font-size: 14px;');
      console.log('%c  • Built with AI-human collaboration', 'color: #fff; font-size: 11px;');
      console.log('%c  • SPARC prompt library = systematic AI collaboration', 'color: #fff; font-size: 11px;');
      console.log('%c  • Neo-brutalism = no border-radius allowed', 'color: #fff; font-size: 11px;');
      console.log('%c', '');
      
      console.log('%c🎮 Easter Eggs (9 to find):', 'color: #FF6B35; font-weight: bold; font-size: 14px;');
      console.log('%c  • Try the Konami code (↑↑↓↓←→←→BA)', 'color: #fff; font-size: 11px;');
      console.log('%c  • Double-click my name in the navbar', 'color: #fff; font-size: 11px;');
      console.log('%c  • Click the transparency card in About section', 'color: #fff; font-size: 11px;');
      console.log('%c  • Hold Shift and move your mouse', 'color: #fff; font-size: 11px;');
      console.log('%c  • Type hireethan() to see my pitch', 'color: #fff; font-size: 11px;');
      console.log('%c  • Type eggprogress() to check your progress', 'color: #fff; font-size: 11px;');
      console.log('%c  • ...and 4 more hidden around the site 🔍', 'color: #fff; font-size: 11px;');
      console.log('%c', '');
      console.log('%c🎁 Find all 9 to unlock something special...', 'color: #B75CFF; font-size: 12px; font-style: italic;');
      console.log('%c', '');
      
      console.log('%c� Contact: mail@finneh.xyz', 'color: #B75CFF; font-size: 12px;');
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00B4D8;');
    };

    // Load console messages
    consoleMessages();

    // Secret console command
    window.hireethan = () => {
      // Mark easter egg as found
      if (window.markEasterEggFound) {
        window.markEasterEggFound('hireethan');
      }
      
      console.clear();
      console.log('%c🎉 YOU FOUND THE SECRET COMMAND! 🎉', 'color: #FFE600; font-size: 24px; font-weight: bold;');
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00B4D8;');
      console.log('%c', '');
      console.log('%c📧 Ready to hire me?', 'color: #FF006E; font-size: 16px; font-weight: bold;');
      console.log('%c', '');
      console.log('%c   📮 Email: mail@finneh.xyz', 'color: #FFE600; font-size: 14px; font-weight: bold;');
      console.log('%c   💼 LinkedIn: linkedin.com/in/ethancornwill', 'color: #00B4D8; font-size: 13px;');
      console.log('%c   🐙 GitHub: github.com/finneh4249', 'color: #B75CFF; font-size: 13px;');
      console.log('%c', '');
      console.log('%c🎯 What I bring:', 'color: #FF6B35; font-size: 14px; font-weight: bold;');
      console.log('%c   ✨ Production AI systems', 'color: #fff; font-size: 12px;');
      console.log('%c   ⚡ Prompt architecture for production (SPARC)', 'color: #fff; font-size: 12px;');
      console.log('%c   🤖 LLM training expertise', 'color: #fff; font-size: 12px;');
      console.log('%c   🏗️  Full-stack + AI integration', 'color: #fff; font-size: 12px;');
      console.log('%c', '');
      console.log('%c� Status: OPEN TO OPPORTUNITIES', 'color: #06FFA5; font-size: 14px; font-weight: bold;');
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00B4D8;');
      
      return '🎊 Email me at mail@finneh.xyz';
    };

    // Remove the annoying random messages
    return () => {};
  }, []);

  useEffect(() => {
    // Konami Code Handler
    const handleKeyPress = (e) => {
      const key = e.key;
      
      if (key === konamiCode[konamiProgress] || 
          (key.toLowerCase() === konamiCode[konamiProgress])) {
        setKonamiProgress(prev => prev + 1);
        
        if (konamiProgress + 1 === konamiCode.length) {
          activateKonami();
          setKonamiProgress(0);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiProgress]);

  const activateKonami = () => {
    if (konamiActivated) return;
    
    setKonamiActivated(true);
    
    // Mark easter egg as found
    if (window.markEasterEggFound) {
      window.markEasterEggFound('konami');
    }
    
    console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'color: #FFE600; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 0px #000;');
    console.log('%c🚀 Easter Egg Found: 2/5', 'color: #06FFA5; font-weight: bold; font-size: 14px;');
    console.log('%cYou\'ve unlocked: MATRIX MODE', 'color: #FF006E; font-size: 12px;');
    
    // Add matrix effect
    document.body.classList.add('konami-activated');
    
    // Create matrix rain effect
    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.id = 'matrix-canvas';
    matrixCanvas.style.position = 'fixed';
    matrixCanvas.style.top = '0';
    matrixCanvas.style.left = '0';
    matrixCanvas.style.width = '100%';
    matrixCanvas.style.height = '100%';
    matrixCanvas.style.pointerEvents = 'none';
    matrixCanvas.style.zIndex = '9999';
    matrixCanvas.style.opacity = '0.15';
    document.body.appendChild(matrixCanvas);
    
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const chars = 'ETHANCORNWILLAIスパーク01';
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      
      ctx.fillStyle = '#06FFA5';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const matrixInterval = setInterval(drawMatrix, 33);
    
    // Show notification
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #FFE600;
        color: #000;
        padding: 2rem 3rem;
        border: 6px solid #000;
        box-shadow: 12px 12px 0px 0px #000;
        z-index: 10000;
        font-weight: bold;
        text-align: center;
        font-size: 24px;
        text-transform: uppercase;
      ">
        🎮 KONAMI CODE ACTIVATED! 🎮
        <div style="font-size: 14px; margin-top: 10px;">Matrix Mode Enabled</div>
        <div style="font-size: 12px; margin-top: 10px; font-weight: normal;">
          Click anywhere to dismiss (or wait 5 seconds)
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    
    const removeNotification = () => {
      notification.remove();
      clearInterval(matrixInterval);
      matrixCanvas.remove();
      document.body.classList.remove('konami-activated');
    };
    
    notification.addEventListener('click', removeNotification);
    setTimeout(removeNotification, 5000);
  };

  return null;
};

export default EasterEggs;
