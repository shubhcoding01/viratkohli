'use client';

import { useEffect } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function useMouse() {
  // 1. Raw Mouse Position (Pixels)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 2. Smoothed Mouse Position (Spring Physics)
  // This removes "jitter" and makes cursor followers feel heavy/premium
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(x, smoothOptions);
  const smoothY = useSpring(y, smoothOptions);

  // 3. Normalized Position (-1 to 1)
  // 0 = Center, -1 = Left/Top, 1 = Right/Bottom
  // Extremely useful for 3D tilts (Stat Cards) or Parallax (Gallery)
  const normalizedX = useMotionValue(0);
  const normalizedY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      // Update Raw Values
      x.set(clientX);
      y.set(clientY);

      // Calculate Normalized Values (-1 to 1)
      // Formula: (Value / Size) * 2 - 1
      const nX = (clientX / innerWidth) * 2 - 1;
      const nY = (clientY / innerHeight) * 2 - 1;
      
      normalizedX.set(nX);
      normalizedY.set(nY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y, normalizedX, normalizedY]);

  return {
    x,
    y,
    smoothX,
    smoothY,
    normalizedX,
    normalizedY
  };
}