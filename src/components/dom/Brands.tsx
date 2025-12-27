'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// --- CONFIGURATION ---
// Replace these paths with your actual logo images in 'public/images/brands/'
// For now, I'm using text fallbacks so it works immediately.
const BRANDS = [
  { name: "PUMA", id: 1, type: "Athletic Partner" },
  { name: "MRF", id: 2, type: "Bat Sponsor" },
  { name: "WROGN", id: 3, type: "Lifestyle Brand" },
  { name: "AUDI", id: 4, type: "Automotive" },
  { name: "TISSOT", id: 5, type: "Timekeeper" },
  { name: "ONE8", id: 6, type: "Own Brand" },
  { name: "HERBALIFE", id: 7, type: "Nutrition" },
  { name: "DIGIT", id: 8, type: "Insurance" },
  { name: "MPL", id: 9, type: "Gaming" },
  { name: "AMERICAN TOURISTER", id: 10, type: "Travel" },
];

export default function Brands() {
  return (
    <section className="relative w-full py-24 bg-[#050505] overflow-hidden border-t border-white/5">
      
      {/* 1. SECTION HEADER */}
      <div className="relative z-10 text-center mb-16 px-4">
         <h3 className="font-serif text-vk-gold tracking-[0.4em] uppercase text-xs md:text-sm mb-4">
            Global Partnerships
         </h3>
         <h2 className="font-heading text-4xl md:text-6xl text-white opacity-90">
            TRUSTED BY <span className="text-gray-600">GIANTS</span>
         </h2>
      </div>

      {/* 2. INFINITE MARQUEE */}
      <div className="relative flex w-full overflow-hidden mask-gradient">
        
        {/* We duplicate the list to create a seamless loop */}
        <MarqueeGroup />
        <MarqueeGroup />
        <MarqueeGroup />
        
        {/* Gradient Masks (Fade edges to black) */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20" />
      </div>

    </section>
  );
}

function MarqueeGroup() {
  return (
    <motion.div 
      className="flex items-center gap-12 md:gap-24 px-6 md:px-12 min-w-max"
      animate={{ x: "-100%" }}
      transition={{ 
        duration: 30, // Adjust speed (higher = slower)
        repeat: Infinity, 
        ease: "linear" 
      }}
    >
      {BRANDS.map((brand) => (
        <div 
          key={brand.id} 
          className="group relative flex flex-col items-center justify-center cursor-pointer"
        >
           {/* LOGO (Text Fallback for now) */}
           {/* Replace this <h1> with <Image src="..." /> when you have files */}
           <h1 className="font-heading text-5xl md:text-7xl text-white/10 group-hover:text-white transition-colors duration-500 select-none">
             {brand.name}
           </h1>

           {/* HOVER GLOW EFFECT */}
           <div className="absolute -inset-4 bg-vk-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
           
           {/* Small Tag on Hover */}
           <span className="absolute -bottom-6 text-[9px] font-mono text-vk-gold tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
             {brand.type}
           </span>
        </div>
      ))}
    </motion.div>
  );
}