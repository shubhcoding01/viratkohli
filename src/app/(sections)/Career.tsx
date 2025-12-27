'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

// --- CONFIGURATION ---
const milestones = [
  {
    id: 0, year: "2008", mode: "classic", title: "The Arrival",
    description: "Leads India to U19 World Cup glory. A star is born in Kuala Lumpur.", img: "/images/virat2008.png"
  },
  {
    id: 1, year: "2011", mode: "classic", title: "World Champion",
    description: "Carries Sachin Tendulkar on his shoulders. The burden of 21 years is lifted.", img: "/images/virat2011.png"
  },
  {
    id: 3, year: "2014", mode: "aggressive", title: "Test Captaincy",
    description: "Takes over in Adelaide. Scores 692 runs in Australia. The 'Aggressive Era' begins.", img: "/images/viratcaptain.png"
  },
  {
    id: 4, year: "2016", mode: "aggressive", title: "The 973 Season",
    description: "Smashes 4 centuries in a single IPL season. Pure dominance defined.", img: "/images/virat2016.png"
  },
  {
    id: 5, year: "2023", mode: "idle", title: "The 50th Century",
    description: "Breaks the God's record. The first human to score 50 ODI hundreds.", img: "/images/virat50th.png"
  },
  {
    id: 6, year: "2024", mode: "idle", title: "T20 World Glory",
    description: "Retires from T20Is as a Champion. The anchor of the final in Barbados.", img: "/images/viratt20.png"
  },
  {
    id: 7, year: "2025", mode: "idle", title: "IPL Champions",
    description: "The dream comes true. RCB lifts the trophy. The legacy is complete.", img: "/images/viratbg1.png"
  }
];

export default function Career() {
  const containerRef = useRef(null);
  const { setMode } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="section-career" ref={containerRef} className="relative w-full bg-[#050505]">
      
      {/* 1. STICKY BACKGROUND LAYER */}
      <div className="sticky top-0 left-0 w-full h-screen z-0 overflow-hidden">
         {milestones.map((item, index) => (
           <div 
             key={item.id}
             className={cn(
               "absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out",
               // 👇 FIX 1: Increased Opacity (60) & Removed Zoom (scale-100)
               activeIndex === index ? "opacity-50 z-10 scale-100" : "opacity-0 z-0 scale-100"
             )}
           >
             <Image 
               src={item.img} 
               alt="Background"
               fill
               priority={index === 0}
               className={cn(
                  "object-cover grayscale blur-sm", 
                  item.year === "2008" ? "object-top" : "object-center"
               )}
             />
             
             {/* 👇 FIX 2: Lighter Gradients (Reduced from /90 to /40) */}
             {/* Left-to-Right Fade */}
             <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
             {/* Bottom-to-Top Fade */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/10" />
           </div>
         ))}
      </div>

      {/* 2. CONTENT WRAPPER */}
      <div className="relative z-10 -mt-[100vh]"> 
        <div className="py-24 pb-48"> 

          {/* TITLE */}
          <div className="text-center mb-24 relative z-10">
            <h2 className="font-heading text-6xl md:text-8xl text-white drop-shadow-2xl">
              TIMELINE <span className="text-vk-gold">OF A KING</span>
            </h2>
            <p className="text-gray-500 font-mono text-xs tracking-widest uppercase mt-4">
              Hover cards to reveal the moment
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto px-4">
            
            {/* CENTER LINE */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full overflow-hidden">
               <motion.div 
                 className="w-full bg-vk-gold shadow-[0_0_20px_#FFD700]" 
                 style={{ height: lineHeight }} 
               />
            </div>

            {/* TIMELINE ITEMS */}
            <div className="flex flex-col gap-32 md:gap-48">
              {milestones.map((item, index) => (
                <TimelineItem 
                  key={index} 
                  item={item} 
                  index={index} 
                  isLeft={index % 2 === 0} 
                  setMode={setMode}
                  setActiveIndex={setActiveIndex}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index, isLeft, setMode, setActiveIndex }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });

  useEffect(() => {
    if (isInView) {
        setMode(item.mode);
        setActiveIndex(index); 
    }
  }, [isInView, item.mode, setMode, index, setActiveIndex]);

  return (
    <div 
      ref={ref}
      className={cn(
        "relative flex items-center md:justify-between",
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* 1. SPACER */}
      <div className="hidden md:block w-5/12" />

      {/* 2. CONNECTOR DOT */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center z-20">
         <motion.div 
           initial={{ scale: 0 }}
           whileInView={{ scale: 1 }}
           className={cn(
             "w-4 h-4 rounded-full border-2 transition-colors duration-500",
             isInView ? "bg-vk-gold border-vk-gold shadow-[0_0_15px_#FFD700]" : "bg-black border-white/20"
           )}
         />
      </div>

      {/* 3. THE FLIP CARD */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-5/12 pl-12 md:pl-0 perspective-1000 group h-[500px] cursor-pointer"
      >
        <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
          
          {/* === FRONT SIDE === */}
          <div className="absolute inset-0 backface-hidden border border-white/10 rounded-2xl overflow-hidden relative bg-[#050505]">
             <div className="absolute inset-0 w-full h-full">
               <Image 
                 src={item.img}
                 alt={item.title}
                 fill
                 className={cn(
                   "object-cover opacity-80", 
                   item.year === "2008" ? "object-top" : "object-center"
                 )}
               />
             </div>
             <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/80 to-black z-10" />

             <div className="relative z-20 p-8 h-full flex flex-col justify-center text-right items-end">
                <span className="font-heading text-6xl text-white/10 absolute top-4 left-4">{item.year}</span>
                <h3 className="font-heading text-4xl text-vk-gold mb-2 drop-shadow-lg">{item.year}</h3>
                <h4 className="font-serif text-xl text-white uppercase tracking-widest mb-4 drop-shadow-md">{item.title}</h4>
                <p className="font-body text-gray-200 text-sm leading-relaxed drop-shadow-md font-medium max-w-[80%]">{item.description}</p>
                <div className="mt-6 flex items-center gap-2 text-[10px] text-vk-gold uppercase tracking-widest font-mono font-bold">
                  <div className="w-4 h-[1px] bg-vk-gold" />
                  <span>[ Hover to Reveal ]</span>
                </div>
             </div>
          </div>

          {/* === BACK SIDE === */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden border border-vk-gold/30">
             <Image 
               src={item.img} 
               alt={item.title}
               fill
               className={cn(
                 "object-cover", 
                 item.year === "2008" ? "object-top" : "object-center"
               )}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
             <div className="absolute bottom-4 left-4 right-4">
                <span className="text-white font-heading text-2xl drop-shadow-lg">{item.title}</span>
             </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}