'use client';

import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export default function useMouse() {
  // 1. Raw Mouse Position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 2. Smoothed Position (Physics-based)
  // "damping" controls how fast it stops, "stiffness" controls how fast it moves
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(x, smoothOptions);
  const smoothY = useSpring(y, smoothOptions);

  // 3. Normalized Position (-1 to 1) for 3D tilts
  const normalizedX = useMotionValue(0);
  const normalizedY = useMotionValue(0);

  useEffect(() => {
    // Check if we are on the client
    if (typeof window === 'undefined') return;

    const updateMouse = (clientX: number, clientY: number) => {
      const { innerWidth, innerHeight } = window;

      // Update Raw (Pixels)
      x.set(clientX);
      y.set(clientY);

      // Update Normalized (-1 to 1)
      // Center = 0, Left = -1, Right = 1
      normalizedX.set((clientX / innerWidth) * 2 - 1);
      normalizedY.set((clientY / innerHeight) * 2 - 1);
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMouse(e.clientX, e.clientY);
    };

    // Optional: Add Touch Support for mobile interaction
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateMouse(touch.clientX, touch.clientY);
      }
    };

    // 4. ADD LISTENERS WITH 'PASSIVE' FLAG
    // This is the CRITICAL fix. It prevents the listener from blocking the main thread (scrolling).
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
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