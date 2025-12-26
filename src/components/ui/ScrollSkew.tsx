'use client';

import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

export default function ScrollSkew({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth out the velocity reading
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Transform velocity into a skew angle (Max 5 degrees)
  const skewY = useTransform(smoothVelocity, [-2000, 2000], [5, -5]);

  return (
    <motion.div style={{ skewY, transformOrigin: "center center" }}>
      {children}
    </motion.div>
  );
}