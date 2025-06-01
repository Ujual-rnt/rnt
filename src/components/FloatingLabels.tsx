import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface FloatingLabelsProps {
  hamburgerRef: React.RefObject<HTMLButtonElement>;
}

const FloatingLabels: React.FC<FloatingLabelsProps> = ({ hamburgerRef }) => {
  const [activeLabel, setActiveLabel] = useState<'rent' | 'sell' | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const animationTimer = useRef<NodeJS.Timeout>();
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Only run animation on home screen
    if (location.pathname !== '/browse') {
      setActiveLabel(null);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Scrolling down and past threshold
        setIsVisible(false);
      } else if (currentScrollY < 50) {
        // Scrolled back to top
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const startAnimation = () => {
      const animateSequence = () => {
        // Show RENT
        setActiveLabel('rent');
        
        // Switch to SELL after 5.3s (5s display + 300ms fade)
        animationTimer.current = setTimeout(() => {
          setActiveLabel(null);
          
          // 200ms gap before showing SELL
          animationTimer.current = setTimeout(() => {
            setActiveLabel('sell');
            
            // Reset after 5.3s
            animationTimer.current = setTimeout(() => {
              setActiveLabel(null);
              
              // 200ms gap before restarting sequence
              animationTimer.current = setTimeout(animateSequence, 200);
            }, 5300);
          }, 200);
        }, 5300);
      };

      animateSequence();
    };

    startAnimation();

    return () => {
      if (animationTimer.current) {
        clearTimeout(animationTimer.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  if (!hamburgerRef.current) return null;

  const labelPosition = {
    position: 'fixed' as const,
    top: '40px',
    left: '56px'
  };

  return (
    <div 
      className={`fixed z-10 transition-opacity duration-150 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={labelPosition}
    >
      <div 
        className={`h-8 px-3 bg-white/10 transition-all duration-300 ease-in-out flex items-center
          ${activeLabel ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
      >
        <span className="text-[22px] font-bold text-white">
          {activeLabel === 'rent' ? 'RENT' : 'SELL'}
        </span>
      </div>
    </div>
  );
};

export default FloatingLabels;