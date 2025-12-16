'use client';

import { useState, useEffect } from 'react';

export default function useScroll() {
  // 1. Store the scroll state
  const [data, setData] = useState({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    direction: 'none' as 'up' | 'down' | 'none',
    progress: 0, // 0 to 1 (Percentage of page scrolled)
  });

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY, scrollX, innerHeight } = window;
      const { scrollHeight } = document.body;

      // Calculate logic
      setData((last) => {
        const direction = scrollY > last.y ? 'down' : 'up';
        
        // Calculate 0.0 to 1.0 progress
        const maxScroll = scrollHeight - innerHeight;
        const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

        return {
          x: scrollX,
          y: scrollY,
          lastX: last.x,
          lastY: last.y,
          direction,
          progress,
        };
      });
    };

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return data;
}