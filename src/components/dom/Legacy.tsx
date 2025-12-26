'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function Legacy() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax: Image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  // Scale: Image gently zooms out for drama
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  // Text Parallax: Moves faster
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={containerRef} className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
      
      {/* 1. BACKGROUND IMAGE (Parallax) */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/Virat.png" // 👈 YOUR RCB TEAM PHOTO
          alt="RCB Champions"
          fill
          className="object-cover brightness-50"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </motion.div>

      {/* 2. OVERLAY TEXT */}
      <motion.div 
        style={{ y: textY }}
        className="relative z-10 text-center px-4"
      >
        <h2 className="font-heading text-8xl md:text-[12rem] text-white mix-blend-overlay opacity-90 leading-none">
          CHAMPIONS
        </h2>
        <p className="font-serif text-vk-gold tracking-[0.5em] text-lg md:text-2xl mt-4 uppercase">
          The Wait is Over
        </p>
      </motion.div>

    </section>
  );
}