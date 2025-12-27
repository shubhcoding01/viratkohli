'use client';

import { useState, useEffect, useCallback } from 'react';
import { useScroll as useFramerScroll, useVelocity, useSpring, useMotionValueEvent } from 'framer-motion';
import { useLenis } from 'lenis/react';

export default function useScroll() {
  const { scrollY, scrollYProgress } = useFramerScroll();
  const lenis = useLenis();

  // 1. VELOCITY PHYSICS
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // 2. UI STATE
  const [scrollState, setScrollState] = useState({
    isScrolling: false,
    direction: 'none' as 'up' | 'down' | 'none',
    passedThreshold: false,
  });

  // 3. THRESHOLD LOGIC (Refactored for reuse)
  const threshold = 100;

  const handleScrollChange = useCallback((latest: number) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;
    const isScrollingDown = diff > 0;
    
    // Only update if moving more than 5px to avoid micro-jitters
    if (Math.abs(diff) < 5 && latest > 0) return; 

    setScrollState((prev) => {
      const newDirection = isScrollingDown ? 'down' : 'up';
      const newThreshold = latest > threshold;

      // Performance: Only update state if values actually changed
      if (prev.direction === newDirection && prev.passedThreshold === newThreshold) {
        return prev;
      }

      return {
        ...prev,
        direction: newDirection,
        passedThreshold: newThreshold,
        isScrolling: true,
      };
    });
  }, [scrollY]);

  // 4. LISTENER: SCROLL EVENTS
  useMotionValueEvent(scrollY, "change", handleScrollChange);

  // 5. FIX: SYNC ON MOUNT (Handles page reload at bottom)
  useEffect(() => {
    // Check immediate scroll position
    const initialY = window.scrollY;
    if (initialY > threshold) {
      setScrollState(prev => ({
        ...prev,
        passedThreshold: true,
        // Assume 'down' if we start lower down so navbar hides correctly if configured that way
        direction: 'down' 
      }));
    }
  }, []);

  // 6. ACTIONS
  const stopScroll = useCallback(() => lenis?.stop(), [lenis]);
  const startScroll = useCallback(() => lenis?.start(), [lenis]);
  
  const scrollTo = useCallback((target: string | number | HTMLElement, offset = 0) => {
    if (!lenis) return;
    lenis.scrollTo(target, {
      offset: offset,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }, [lenis]);

  return {
    scrollY,
    progress: scrollYProgress,
    velocity: smoothVelocity,
    direction: scrollState.direction,
    passedThreshold: scrollState.passedThreshold,
    scrollTo,
    stopScroll,
    startScroll,
  };
}