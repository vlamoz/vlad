import { useState, useEffect, useCallback } from 'react';

interface UseScrollDetectionOptions {
  threshold?: number;
  throttleMs?: number;
}

export const useScrollDetection = (options: UseScrollDetectionOptions = {}) => {
  const { threshold = 50, throttleMs = 16 } = options;
  const [isScrolled, setIsScrolled] = useState(false);

  const throttle = useCallback((func: (...args: unknown[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let lastExecTime = 0;
    
    return (...args: unknown[]) => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > threshold);
    }, throttleMs);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, throttleMs, throttle]);

  return isScrolled;
};