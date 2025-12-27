'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import Image from 'next/image'; // ✅ Import Image
import StatCard from '@/components/dom/StatCard';
import useMouse from '@/hooks/useMouse';

// --- THE KING'S NUMBERS (UPDATED FOR 2025) ---
const statData = [
  {
    label: "Intl. Centuries",
    value: "81", // Updated
    subtext: "Inching closer to the Century of Centuries",
    className: "md:col-span-2",
  },
  {
    label: "International Runs",
    value: "28,500+", // Updated
    subtext: "The All-Time Leading Run Scorer",
    className: "md:col-span-1",
  },
  {
    label: "ODI Batting Avg",
    value: "59.12", // Updated
    subtext: "Unmatched Consistency across eras",
    className: "md:col-span-1",
  },
  {
    label: "Matches Won",
    value: "335+", // Updated
    subtext: "India's Greatest Match Winner",
    className: "md:col-span-2",
  },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. SCROLL PARALLAX
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // 2. MOUSE SPOTLIGHT LOGIC
  const { x: mouseX, y: mouseY } = useMouse();
  const spotlightGradient = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px, 
    rgba(212, 175, 55, 0.1), 
    transparent 80%
  )`;

  return (
    <section 
      id="section-stats" 
      ref={containerRef} 
      className="relative w-full py-32 bg-[#050505] overflow-hidden"
    >
      
      {/* A. DYNAMIC BACKGROUND (Image + Grid + Spotlight) */}
      <div className="absolute inset-0 z-0">
        
        {/* 1. Background Image Layer */}
        <div className="absolute inset-0 opacity-50">
           <Image 
             src="/images/viratchampion.png" // Ensure this exists!
             alt="Virat Kohli Stats Background"
             fill
             className="object-cover object-center grayscale"
           />
        </div>

        {/* 2. Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] mix-blend-overlay" />
        
        {/* 3. The Moving Spotlight */}
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: spotlightGradient }}
        />
        
        {/* 4. Vignette Fade (Darkens edges) */}
        <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]" />
        
        {/* 5. Top/Bottom Fade to Black */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-20" />
      </div>


      {/* B. CONTENT LAYER */}
      <motion.div 
        style={{ y, opacity }} 
        className="relative z-30 max-w-7xl mx-auto px-6 md:px-12"
      >
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-8xl text-white tracking-tighter"
          >
            THE <span className="text-transparent bg-clip-text bg-gradient-to-b from-vk-gold to-[#8B7020]">NUMBERS</span>
          </motion.h2>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-12 bg-vk-gold/50" />
            <p className="font-serif text-vk-gold tracking-[0.3em] text-sm uppercase">
              Statistical Dominance (2025)
            </p>
            <div className="h-[1px] w-12 bg-vk-gold/50" />
          </div>
        </div>

        {/* C. THE GRID OF CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {statData.map((stat, i) => (
            <div key={i} className={stat.className}>
              <StatCard 
                label={stat.label}
                value={stat.value}
                subtext={stat.subtext}
                index={i}
              />
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}