'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// --- CONFIGURATION ---
// Ensure these exact files exist in: public/images/brands/
const BRANDS = [
  { name: "PUMA", file: "puma.png", type: "Athletic Partner" },
  { name: "MRF", file: "mrf.png", type: "Bat Sponsor" },
  { name: "AUDI", file: "audi.png", type: "Automotive" },
  { name: "MYNTRA", file: "myntra.png", type: "Fashion" },
  { name: "HSBC", file: "hsbc.png", type: "Banking" },
  { name: "WROGN", file: "wrong.png", type: "Lifestyle Brand" }, // Corrected spelling for display, kept filename 'wrong.png' as per your code
  { name: "NOISE", file: "noise.png", type: "Wearables" },
  { name: "AMERICAN TOURISTER", file: "american.png", type: "Travel Gear" },
  { name: "ONE8", file: "one8.png", type: "Own Brand" },
  { name: "MANYAVAR", file: "manyavar.png", type: "Celebration Wear" },
];

export default function Brands() {
  return (
    <section className="relative w-full py-24 bg-[#050505] overflow-hidden border-t border-white/5">
      
      {/* HEADER */}
      <div className="relative z-10 text-center mb-16 px-4">
         <h3 className="font-serif text-vk-gold tracking-[0.4em] uppercase text-xs md:text-sm mb-4">
            Global Partnerships
         </h3>
         <h2 className="font-heading text-4xl md:text-6xl text-white opacity-90">
            TRUSTED BY <span className="text-gray-600">GIANTS</span>
         </h2>
      </div>

      {/* INFINITE MARQUEE */}
      <div className="relative flex w-full overflow-hidden mask-gradient"
           // Pause animation on hover for better user experience
           onMouseEnter={() => document.documentElement.style.setProperty('--marquee-play-state', 'paused')}
           onMouseLeave={() => document.documentElement.style.setProperty('--marquee-play-state', 'running')}
      >
        {/* We need 3 groups to ensure seamless looping without gaps */}
        <MarqueeGroup />
        <MarqueeGroup />
        <MarqueeGroup />
        
        {/* Faded Edges (Gradient Masks) */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
      </div>

    </section>
  );
}

function MarqueeGroup() {
  return (
    <div className="flex items-center gap-16 md:gap-32 px-8 md:px-16 min-w-max animate-marquee">
      {BRANDS.map((brand, i) => (
        <div 
          key={i} 
          className="group relative flex flex-col items-center justify-center cursor-pointer"
        >
           {/* LOGO IMAGE */}
           <div className="relative w-32 h-16 md:w-40 md:h-20 opacity-40 grayscale brightness-150 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
             <Image 
               src={`/images/brands/${brand.file}`} 
               alt={brand.name} 
               fill 
               className="object-contain"
             />
           </div>

           {/* GLOW EFFECT ON HOVER */}
           <div className="absolute -inset-4 bg-vk-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
           
           {/* TYPE TAG (e.g. "Bat Sponsor") */}
           <span className="absolute -bottom-8 text-[9px] font-mono text-vk-gold tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap">
             {brand.type}
           </span>
        </div>
      ))}
    </div>
  );
}