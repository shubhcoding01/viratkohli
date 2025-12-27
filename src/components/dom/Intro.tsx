'use client';

import { motion, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import useMouse from '@/hooks/useMouse';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [clicked, setClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { normalizedX, normalizedY } = useMouse();
  
  // Parallax Logic
  const x = useTransform(normalizedX, [-1, 1], ["2%", "-2%"]);
  const y = useTransform(normalizedY, [-1, 1], ["2%", "-2%"]);

  // --- SCROLL LOCK LOGIC (Updated) ---
  useEffect(() => {
    if (!clicked) {
      document.body.style.overflow = 'hidden';
      // 👇 LINE REMOVED: No more forced pointer cursor
      // document.body.style.cursor = 'pointer'; 
    } else {
      document.body.style.overflow = '';
      document.body.style.cursor = 'auto';
    }
  }, [clicked]);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[50] flex items-center justify-center bg-black overflow-hidden cursor-default" // Explicitly default
      onClick={handleClick}
    >
      {/* --- A. LEFT CURTAIN --- */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#050505] z-20 origin-left"
        initial={{ scaleX: 1 }}
        animate={clicked ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
         <div className="relative w-[200vw] h-full overflow-hidden -ml-[0vw]"> 
            <motion.div style={{ x, y }} className="relative w-full h-full">
               <Image
                 src="/images/virat.jpg"
                 alt="The King"
                 fill
                 className="object-cover opacity-60 grayscale"
                 priority
               />
            </motion.div>
         </div>
      </motion.div>

      {/* --- B. RIGHT CURTAIN --- */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#050505] z-20 origin-right"
        initial={{ scaleX: 1 }}
        animate={clicked ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => onComplete()}
      >
         <div className="relative w-[200vw] h-full overflow-hidden -ml-[100vw]">
            <motion.div style={{ x, y }} className="relative w-full h-full">
               <Image
                 src="/images/virat.jpg"
                 alt="The King"
                 fill
                 className="object-cover opacity-60 grayscale"
                 priority
               />
            </motion.div>
         </div>
      </motion.div>

      {/* --- C. TEXT CONTENT --- */}
      <motion.div 
        className="absolute z-30 flex flex-col items-center justify-center text-center pointer-events-none mix-blend-overlay"
        animate={clicked ? { opacity: 0, scale: 1.5, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-heading text-9xl md:text-[12rem] text-white tracking-tighter leading-none">
          THE KING
        </h1>
        <div className="h-[1px] w-32 bg-vk-gold my-6" />
        <p className="font-serif text-vk-gold tracking-[0.5em] text-sm md:text-xl uppercase">
          Click to Enter
        </p>
      </motion.div>

      {/* --- D. FLASH REVEAL --- */}
      <motion.div 
         className="absolute inset-0 bg-white z-10 pointer-events-none"
         initial={{ opacity: 0 }}
         animate={clicked ? { opacity: [0, 0.5, 0] } : { opacity: 0 }}
         transition={{ duration: 0.5, delay: 0.1 }}
      />
    </motion.div>
  );
}