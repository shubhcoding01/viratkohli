// 'use client';

// import { motion } from 'framer-motion';
// import { cn } from '@/lib/utils';

// const milestones = [
//   {
//     year: "2008",
//     title: "The Arrival",
//     description: "Leads India to U19 World Cup glory. Makes ODI debut against Sri Lanka.",
//     color: "text-gray-400"
//   },
//   {
//     year: "2011",
//     title: "World Champion",
//     description: "Lifts the ICC World Cup. Carries Sachin Tendulkar on his shoulders.",
//     color: "text-vk-blue"
//   },
//   {
//     year: "2014",
//     title: "Test Captaincy",
//     description: "Takes over the reins in Australia. Scores 692 runs in the series.",
//     color: "text-white"
//   },
//   {
//     year: "2016",
//     title: "The 973 Season",
//     description: "Smashes 4 centuries in a single IPL season. Defines dominance in T20.",
//     color: "text-vk-red"
//   },
//   {
//     year: "2023",
//     title: "The 50th Century",
//     description: "Breaks Sachin's record. Becomes the first human to score 50 ODI hundreds.",
//     color: "text-vk-gold"
//   }
// ];

// export default function Career() {
//   return (
//     <section 
//       id="section-2" 
//       className="min-h-screen w-full flex flex-col items-start justify-center px-6 md:px-20 py-20 relative z-10"
//     >
//       {/* 1. Title */}
//       <motion.h2 
//         initial={{ opacity: 0, x: -50 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         className="font-heading text-6xl md:text-8xl text-white mb-16"
//       >
//         THE <span className="text-vk-gold">JOURNEY</span>
//       </motion.h2>

//       {/* 2. Timeline Container */}
//       <div className="relative w-full max-w-4xl border-l-2 border-white/10 ml-4 md:ml-10 space-y-12">
//         {milestones.map((item, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, margin: "-50px" }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             className="relative pl-8 md:pl-12"
//           >
//             {/* The Glowing Dot on the Line */}
//             <span className={cn(
//               "absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 border-vk-black",
//               index === milestones.length - 1 ? "bg-vk-gold shadow-[0_0_20px_#D4AF37]" : "bg-gray-600"
//             )} />

//             {/* The Year */}
//             <h3 className="font-heading text-4xl text-white/20 mb-1">
//               {item.year}
//             </h3>

//             {/* The Title */}
//             <h4 className={cn("font-heading text-3xl mb-2", item.color)}>
//               {item.title}
//             </h4>

//             {/* The Description */}
//             <p className="font-body text-gray-400 text-lg max-w-xl">
//               {item.description}
//             </p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// 'use client';

// import { motion, AnimatePresence } from 'framer-motion';
// import { useState } from 'react';
// import Image from 'next/image';
// import { cn } from '@/lib/utils';

// // Mapped to your existing images (virat1.jpg etc.) 
// // You can swap these specifically later if you have exact year photos.
// const milestones = [
//   {
//     id: 0,
//     year: "2008",
//     title: "The Arrival",
//     description: "Leads India to U19 World Cup glory. A star is born in Kuala Lumpur. Makes ODI debut against Sri Lanka.",
//     img: "/images/virat1.jpg" // Using your existing images
//   },
//   {
//     id: 1,
//     year: "2011",
//     title: "World Champion",
//     description: "Carries Sachin Tendulkar on his shoulders. 'He has carried the burden of the nation for 21 years.'",
//     img: "/images/virat2.jpg"
//   },
//   {
//     id: 2,
//     year: "2014",
//     title: "Test Captaincy",
//     description: "Takes over the reins in Adelaide. Scores 692 runs in the Australian series. The aggressor era begins.",
//     img: "/images/virat5.jpg"
//   },
//   {
//     id: 3,
//     year: "2016",
//     title: "The 973 Season",
//     description: "Smashes 4 centuries in a single IPL season. Redefines consistency in T20 cricket. Pure dominance.",
//     img: "/images/virat8.jpg"
//   },
//   {
//     id: 4,
//     year: "2023",
//     title: "The 50th Century",
//     description: "Breaks the God's record. Becomes the first human to score 50 ODI hundreds at the World Cup semi-final.",
//     img: "/images/virat18.jpg"
//   }
// ];

// export default function Career() {
//   const [activeTab, setActiveTab] = useState(0);

//   return (
//     <section id="section-2" className="relative min-h-screen w-full py-20 overflow-hidden bg-vk-black">
      
//       {/* 1. DYNAMIC BACKGROUND LAYER */}
//       {/* Changes based on which card you are hovering/viewing */}
//       <div className="absolute inset-0 z-0">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, scale: 1.1 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.8 }}
//             className="absolute inset-0"
//           >
//             <Image
//               src={milestones[activeTab].img}
//               alt="Era Background"
//               fill
//               className="object-cover opacity-20 blur-sm" // Blurred so text is readable
//             />
//             {/* Gradient Overlay to fade smoothly into black */}
//             <div className="absolute inset-0 bg-gradient-to-r from-vk-black via-vk-black/80 to-transparent" />
//             <div className="absolute inset-0 bg-gradient-to-b from-vk-black via-transparent to-vk-black" />
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       <div className="relative z-10 px-6 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        
//         {/* 2. LEFT SIDE: STICKY TITLE */}
//         <div className="md:w-1/3">
//           <div className="sticky top-40">
//             <motion.div 
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <h2 className="font-heading text-6xl md:text-8xl text-white mb-4 drop-shadow-xl">
//                 THE <br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-vk-gold to-[#B8860B]">
//                   JOURNEY
//                 </span>
//               </h2>
//               <p className="font-body text-gray-400 text-lg leading-relaxed border-l-2 border-vk-gold pl-4">
//                 From a young boy in Delhi to the King of World Cricket. Select a milestone to revisit the moment.
//               </p>
//             </motion.div>
//           </div>
//         </div>

//         {/* 3. RIGHT SIDE: INTERACTIVE TIMELINE */}
//         <div className="md:w-2/3 relative">
          
//           {/* The Glowing Vertical Beam */}
//           <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-white/10">
//             <motion.div 
//               className="w-full bg-vk-gold shadow-[0_0_15px_#FFD700]"
//               style={{ height: `${((activeTab + 1) / milestones.length) * 100}%` }} // Dynamic Height
//               transition={{ duration: 0.5 }}
//             />
//           </div>

//           <div className="space-y-8 pl-8 md:pl-12">
//             {milestones.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: 50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true, margin: "-50px" }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 onMouseEnter={() => setActiveTab(index)} // TRIGGER BACKGROUND CHANGE
//                 className={cn(
//                   "relative p-6 md:p-8 rounded-xl border transition-all duration-500 cursor-pointer group",
//                   activeTab === index 
//                     ? "bg-white/10 border-vk-gold/50 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-md" 
//                     : "bg-white/5 border-white/5 hover:bg-white/10"
//                 )}
//               >
//                 {/* The Connector Dot */}
//                 <span className={cn(
//                   "absolute -left-[41px] md:-left-[57px] top-10 w-4 h-4 rounded-full border-2 transition-all duration-300",
//                   activeTab === index 
//                     ? "bg-vk-gold border-vk-gold shadow-[0_0_15px_#FFD700] scale-125" 
//                     : "bg-vk-black border-gray-600"
//                 )} />

//                 <div className="flex flex-col gap-2">
//                   <span className={cn(
//                     "font-heading text-5xl md:text-6xl transition-colors duration-300",
//                     activeTab === index ? "text-white" : "text-white/20"
//                   )}>
//                     {item.year}
//                   </span>
                  
//                   <h3 className={cn(
//                     "font-serif text-2xl md:text-3xl uppercase tracking-wider transition-colors duration-300",
//                     activeTab === index ? "text-vk-gold" : "text-gray-400"
//                   )}>
//                     {item.title}
//                   </h3>
                  
//                   <p className={cn(
//                     "font-body text-base md:text-lg leading-relaxed transition-colors duration-300",
//                     activeTab === index ? "text-gray-200" : "text-gray-500"
//                   )}>
//                     {item.description}
//                   </p>
//                 </div>
                
//                 {/* Subtle Shine Effect on Active Card */}
//                 {activeTab === index && (
//                   <motion.div
//                     layoutId="shine"
//                     className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
//                     initial={{ x: '-100%' }}
//                     animate={{ x: '100%' }}
//                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//                   />
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }


// 'use client';

// import { motion, useScroll, useTransform, useInView } from 'framer-motion';
// import { useState, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import { cn } from '@/lib/utils';
// import { useStore } from '@/store/useStore'; // Connects to the 3D World

// const milestones = [
//   {
//     id: 0,
//     year: "2008",
//     mode: "classic",
//     title: "The Arrival",
//     description: "Leads India to U19 World Cup glory. A star is born in Kuala Lumpur. Makes ODI debut against Sri Lanka.",
//     img: "/images/virat1.jpg" 
//   },
//   {
//     id: 1,
//     year: "2011",
//     mode: "classic",
//     title: "World Champion",
//     description: "Carries Sachin Tendulkar on his shoulders. 'He has carried the burden of the nation for 21 years.'",
//     img: "/images/virat2.jpg"
//   },
//   {
//     id: 2,
//     year: "2014",
//     mode: "aggressive",
//     title: "Test Captaincy",
//     description: "Takes over the reins in Adelaide. Scores 692 runs in the Australian series. The aggressor era begins.",
//     img: "/images/virat5.jpg"
//   },
//   {
//     id: 3,
//     year: "2016",
//     mode: "aggressive",
//     title: "The 973 Season",
//     description: "Smashes 4 centuries in a single IPL season. Redefines consistency in T20 cricket. Pure dominance.",
//     img: "/images/virat8.jpg"
//   },
//   {
//     id: 4,
//     year: "2023",
//     mode: "idle", // Royal Mode
//     title: "The 50th Century",
//     description: "Breaks the God's record. Becomes the first human to score 50 ODI hundreds at the World Cup semi-final.",
//     img: "/images/virat18.jpg"
//   }
// ];

// export default function Career() {
//   const [activeTab, setActiveTab] = useState(0);
//   const containerRef = useRef(null);
//   const { setMode } = useStore(); // Global 3D Control

//   // 1. SCROLL PROGRESS BAR
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start center", "end center"]
//   });

//   const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

//   return (
//     <section id="section-career" ref={containerRef} className="relative min-h-screen w-full py-20 overflow-hidden bg-[#050505]">
      
//       {/* 2. DYNAMIC BACKGROUND IMAGE (Sticky) */}
//       {/* Instead of Framer AnimatePresence (which can be heavy), we stack images and fade opacity */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         {milestones.map((item, index) => (
//           <div 
//             key={item.id}
//             className={cn(
//               "absolute inset-0 transition-opacity duration-1000 ease-in-out",
//               activeTab === index ? "opacity-30" : "opacity-0"
//             )}
//           >
//             <Image
//               src={item.img}
//               alt={item.title}
//               fill
//               className="object-cover blur-sm scale-105"
//             />
//             {/* Gradient Overlays for Readability */}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent" />
//             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
//           </div>
//         ))}
//       </div>

//       <div className="relative z-10 px-6 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        
//         {/* 3. LEFT SIDE: STICKY TITLE */}
//         <div className="md:w-1/3">
//           <div className="sticky top-40">
//             <motion.div 
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <h2 className="font-heading text-6xl md:text-8xl text-white mb-6 drop-shadow-xl">
//                 THE <br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-vk-gold to-[#B8860B]">
//                   JOURNEY
//                 </span>
//               </h2>
//               <div className="h-1 w-24 bg-vk-gold mb-6" />
//               <p className="font-body text-gray-400 text-lg leading-relaxed">
//                 Witness the evolution of a legend. From a young boy in Delhi to the undisputed King of World Cricket.
//               </p>
//             </motion.div>
//           </div>
//         </div>

//         {/* 4. RIGHT SIDE: SCROLL-SYNCED TIMELINE */}
//         <div className="md:w-2/3 relative pl-8 md:pl-12">
          
//           {/* The Glowing Vertical Beam */}
//           <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 overflow-hidden rounded-full">
//             <motion.div 
//               className="w-full bg-vk-gold shadow-[0_0_20px_#FFD700]"
//               style={{ height: lineHeight }} 
//             />
//           </div>

//           <div className="flex flex-col gap-24 py-20">
//             {milestones.map((item, index) => (
//               <CareerItem 
//                 key={index} 
//                 item={item} 
//                 index={index} 
//                 isActive={activeTab === index}
//                 onActivate={() => {
//                    setActiveTab(index);
//                    // @ts-ignore
//                    setMode(item.mode); // Updates the 3D Scene Mode!
//                 }}
//               />
//             ))}
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }

// // 5. SUB-COMPONENT: INDIVIDUAL CAREER CARD
// // Handles "InView" detection to auto-activate itself
// function CareerItem({ item, index, isActive, onActivate }: any) {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { margin: "-50% 0px -50% 0px", amount: 0.5 });

//   // Auto-activate when scrolled into the center of viewport
//   useEffect(() => {
//     if (isInView) {
//       onActivate();
//     }
//   }, [isInView, onActivate]);

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, x: 50 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true, margin: "-20%" }}
//       transition={{ duration: 0.6, delay: 0.1 }}
//       className={cn(
//         "relative p-8 rounded-2xl border transition-all duration-700 group",
//         isActive 
//           ? "bg-white/5 border-vk-gold/60 shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)] backdrop-blur-md scale-105" 
//           : "bg-transparent border-white/5 opacity-50 hover:opacity-80 scale-100"
//       )}
//     >
//       {/* Connector Dot */}
//       <div className={cn(
//         "absolute -left-[43px] md:-left-[59px] top-10 w-6 h-6 rounded-full border-4 transition-all duration-500 z-20",
//         isActive 
//           ? "bg-[#050505] border-vk-gold shadow-[0_0_20px_#FFD700] scale-125" 
//           : "bg-[#050505] border-white/20"
//       )} />

//       {/* Year Label */}
//       <span className={cn(
//         "font-heading text-6xl md:text-7xl transition-colors duration-500 block mb-2",
//         isActive ? "text-white drop-shadow-lg" : "text-white/10"
//       )}>
//         {item.year}
//       </span>
      
//       {/* Title */}
//       <h3 className={cn(
//         "font-serif text-2xl md:text-3xl uppercase tracking-widest mb-4 transition-colors duration-500",
//         isActive ? "text-vk-gold" : "text-gray-500"
//       )}>
//         {item.title}
//       </h3>
      
//       {/* Description */}
//       <p className="font-body text-gray-300 text-lg leading-relaxed">
//         {item.description}
//       </p>

//       {/* Aggressive Mode Badge (Only for 2016/2014) */}
//       {item.mode === 'aggressive' && isActive && (
//          <motion.div 
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/50 bg-red-900/20"
//          >
//             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
//             <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Aggressive Mode Active</span>
//          </motion.div>
//       )}

//     </motion.div>
//   );
// }



'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

// --- CONFIGURATION: CHRONOLOGICAL ORDER ---
const milestones = [
  {
    id: 0,
    year: "2008",
    mode: "classic",
    title: "The Arrival",
    description: "Leads India to U19 World Cup glory. A star is born in Kuala Lumpur.",
    img: "/images/virat2008.png" 
  },
  {
    id: 1,
    year: "2011",
    mode: "classic",
    title: "World Champion",
    description: "Carries Sachin Tendulkar on his shoulders. The burden of 21 years is lifted.",
    img: "/images/virat2011.png" 
  },

  {
    id: 3,
    year: "2014",
    mode: "aggressive",
    title: "Test Captaincy",
    description: "Takes over in Adelaide. Scores 692 runs in Australia. The 'Aggressive Era' begins.",
    img: "/images/viratcaptain.png" 
  },
  {
    id: 4,
    year: "2016",
    mode: "aggressive",
    title: "The 973 Season",
    description: "Smashes 4 centuries in a single IPL season. Pure dominance defined.",
    img: "/images/virat2016.png" 
  },
  {
    id: 5,
    year: "2023",
    mode: "idle",
    title: "The 50th Century",
    description: "Breaks the God's record. The first human to score 50 ODI hundreds.",
    img: "/images/virat50th.png" 
  },
  {
    id: 6,
    year: "2024",
    mode: "idle",
    title: "T20 World Glory",
    description: "Retires from T20Is as a Champion. The anchor of the final in Barbados.",
    img: "/images/viratt20.png" 
  },

  {
    id: 7,
    year: "2025",
    mode: "idle",
    title: "IPL Champions",
    description: "The dream comes true. RCB lifts the trophy. The legacy is complete.",
    img: "/images/viratbg1.png" 
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
    <section id="section-career" ref={containerRef} className="relative w-full py-24 bg-[#050505] overflow-hidden">
      
      {/* SECTION TITLE */}
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
        <div className="flex flex-col gap-24 md:gap-32">
          {milestones.map((item, index) => (
            <TimelineItem 
              key={index} 
              item={item} 
              index={index} 
              isLeft={index % 2 === 0} // Alternate Left/Right
              setMode={setMode}
            />
          ))}
        </div>

      </div>

    </section>
  );
}

function TimelineItem({ item, index, isLeft, setMode }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px", amount: 0.5 });

  // Update 3D Mode when scrolled to
  useEffect(() => {
    if (isInView) setMode(item.mode);
  }, [isInView, item.mode, setMode]);

  return (
    <div 
      ref={ref}
      className={cn(
        "relative flex items-center md:justify-between",
        // Mobile: All align left | Desktop: Alternate
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      
      {/* 1. THE SPACER (Empty side to push content) */}
      <div className="hidden md:block w-5/12" />

      {/* 2. THE CONNECTOR DOT (Center) */}
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

      {/* 3. THE FLIP CARD (Content Side) */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-5/12 pl-12 md:pl-0 perspective-1000 group h-[500px] cursor-pointer"
      >
        
        {/* PRESERVE-3D WRAPPER */}
        <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
          
          {/* === FRONT SIDE (TEXT) === */}
          {/* <div className="absolute inset-0 backface-hidden bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-center backdrop-blur-sm">
             <span className="font-heading text-6xl text-white/10 absolute top-4 right-4">
               {item.year}
             </span>
             
             <h3 className="font-heading text-4xl text-vk-gold mb-2">
               {item.year}
             </h3>
             <h4 className="font-serif text-xl text-white uppercase tracking-widest mb-4">
               {item.title}
             </h4>
             <p className="font-body text-gray-400 text-sm leading-relaxed">
               {item.description}
             </p>

             <div className="mt-6 flex items-center gap-2 text-[10px] text-vk-gold/60 uppercase tracking-widest font-mono">
                <span>[ Hover to View Image ]</span>
                <div className="w-4 h-[1px] bg-vk-gold/40" />
             </div>
          </div> */}

          {/* === FRONT SIDE (TEXT) === */}
<div className="absolute inset-0 backface-hidden border border-white/10 rounded-2xl overflow-hidden relative bg-[#050505]">
   
   {/* 1. BACKGROUND IMAGE (Colorful & Faded) */}
   <div className="absolute inset-0 w-full h-full">
     <Image 
       src={item.img}
       alt={item.title}
       fill
       className={cn(
         "object-cover opacity-80", // ✅ Colorful (No grayscale), High Opacity
         item.year === "2008" ? "object-top" : "object-center"
       )}
     />
   </div>
   
   {/* 2. THE MAGIC GRADIENT (Hides Right Side) */}
   {/* Transparent on Left -> Solid Black on Right */}
   <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/80 to-black z-10" />

   {/* 3. CONTENT (Aligns to Right where it's dark) */}
   <div className="relative z-20 p-8 h-full flex flex-col justify-center text-right items-end">
      <span className="font-heading text-6xl text-white/10 absolute top-4 left-4">
        {item.year}
      </span>
      
      <h3 className="font-heading text-4xl text-vk-gold mb-2 drop-shadow-lg">
        {item.year}
      </h3>
      <h4 className="font-serif text-xl text-white uppercase tracking-widest mb-4 drop-shadow-md">
        {item.title}
      </h4>
      <p className="font-body text-gray-200 text-sm leading-relaxed drop-shadow-md font-medium max-w-[80%]">
        {item.description}
      </p>

      <div className="mt-6 flex items-center gap-2 text-[10px] text-vk-gold uppercase tracking-widest font-mono font-bold">
        <div className="w-4 h-[1px] bg-vk-gold" />
        <span>[ Hover to Reveal ]</span>
      </div>
   </div>
</div>

          {/* === BACK SIDE (IMAGE) === */}
          {/* Rotated 180deg so it's behind the front face */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden border border-vk-gold/30">
             <Image 
  src={item.img} 
  alt={item.title}
  fill
  // 👇 IF year is 2008 use "object-top", ELSE use just "object-cover"
  className={cn(
    "object-cover", 
    item.year === "2008" ? "object-top" : "object-center"
  )}
/>
             {/* Gradient Overlay for Text Readability if needed */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
             
             <div className="absolute bottom-4 left-4 right-4">
                <span className="text-white font-heading text-2xl drop-shadow-lg">
                  {item.title}
                </span>
             </div>
          </div>

        </div>

      </motion.div>

    </div>
  );
}