// 'use client';

// import { useState, useEffect } from 'react';

// export default function useScroll() {
//   // 1. Store the scroll state
//   const [data, setData] = useState({
//     x: 0,
//     y: 0,
//     lastX: 0,
//     lastY: 0,
//     direction: 'none' as 'up' | 'down' | 'none',
//     progress: 0, // 0 to 1 (Percentage of page scrolled)
//   });

//   useEffect(() => {
//     const handleScroll = () => {
//       const { scrollY, scrollX, innerHeight } = window;
//       const { scrollHeight } = document.body;

//       // Calculate logic
//       setData((last) => {
//         const direction = scrollY > last.y ? 'down' : 'up';
        
//         // Calculate 0.0 to 1.0 progress
//         const maxScroll = scrollHeight - innerHeight;
//         const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

//         return {
//           x: scrollX,
//           y: scrollY,
//           lastX: last.x,
//           lastY: last.y,
//           direction,
//           progress,
//         };
//       });
//     };

//     // Listen to scroll events
//     window.addEventListener('scroll', handleScroll);
    
//     // Cleanup
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return data;
// }

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useScroll as useFramerScroll, useVelocity, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { useLenis } from 'lenis/react';

export default function useScroll() {
  // 1. GET MOTION VALUES (High Performance - No Re-renders)
  const { scrollY, scrollYProgress } = useFramerScroll();
  
  // 2. CALCULATE VELOCITY (How fast is the user scrolling?)
  // Useful for skewing text or tilting 3D models based on speed
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // 3. REACTIVE STATE (For UI Logic only, e.g., Navbar hiding)
  // We only update this when necessary to avoid lag
  const [scrollState, setScrollState] = useState({
    isScrolling: false,
    direction: 'none' as 'up' | 'down' | 'none',
    passedThreshold: false, // Useful for changing navbar color after Hero section
  });

  // 4. ACCESS LENIS (For controlling scroll)
  const lenis = useLenis();

  // --- LOGIC: Track Direction & Threshold ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;
    const isScrollingDown = diff > 0;
    const threshold = 100; // Change navbar after 100px

    setScrollState((prev) => {
      // optimization: only update state if values actually changed
      const newDirection = isScrollingDown ? 'down' : 'up';
      const newThreshold = latest > threshold;

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
  });

  // --- ACTION: STOP / START SCROLLING ---
  const stopScroll = useCallback(() => lenis?.stop(), [lenis]);
  const startScroll = useCallback(() => lenis?.start(), [lenis]);

  // --- ACTION: SMOOTH SCROLL TO TARGET ---
  // Usage: scrollTo('#section-2') or scrollTo(500)
  const scrollTo = useCallback((target: string | number | HTMLElement, offset = 0) => {
    if (!lenis) return;
    lenis.scrollTo(target, {
      offset: offset,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
    });
  }, [lenis]);

  return {
    // A. Motion Values (Pass these to <motion.div> for 60fps animations)
    scrollY,
    progress: scrollYProgress,
    velocity: smoothVelocity,

    // B. UI State (Use these for conditional rendering like Navbars)
    direction: scrollState.direction,
    passedThreshold: scrollState.passedThreshold,
    
    // C. Actions (Control the page)
    scrollTo,
    stopScroll,
    startScroll,
  };
}