'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Intro({ onComplete }: { onComplete: () => void }) {
  // Lock body scroll when Intro is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }} // Slides up like a curtain
      transition={{ delay: 2.5, duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // "Quart" easing
      onAnimationComplete={onComplete}
    >
      {/* The Hero Image (RCB Team Cup) */}
      <div className="relative w-full h-full">
        <Image
          src="/images/virat.jpg" // Make sure this file exists!
          alt="Virat Kohli Champion"
          fill
          className="object-cover"
          priority
        />
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Text Animation on top of the image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-10 left-6 md:left-20 text-white"
        >
          <h1 className="font-heading text-6xl md:text-8xl tracking-tighter">
            THE KING
          </h1>
          <p className="font-body text-xl tracking-[0.5em] text-vk-gold">
            LEGACY OF 18
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}