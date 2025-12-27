// 'use client';

// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { useEffect, useState, useMemo } from 'react';
// import { useStore } from '@/store/useStore';
// import useMouse from '@/hooks/useMouse';

// // --- SMART SCHEDULE CONFIGURATION ---
// // The system will pick the first date that is in the future.
// // Times are set to 1:30 PM (13:30) as requested.
// const SCHEDULE = [
//   { 
//     id: 1, 
//     date: '2026-01-11T13:30:00', // YYYY-MM-DD format ensures correct sorting
//     label: "1st ODI", 
//     opponent: "New Zealand" 
//   },
//   { 
//     id: 2, 
//     date: '2026-01-14T13:30:00', 
//     label: "2nd ODI", 
//     opponent: "New Zealand" 
//   },
//   { 
//     id: 3, 
//     date: '2026-01-18T13:30:00', 
//     label: "3rd ODI", 
//     opponent: "New Zealand" 
//   }
// ];

// export default function Hero() {
//   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//   const [activeMatch, setActiveMatch] = useState(SCHEDULE[0]);
  
//   // 1. SCENE CONTROL (Force Idle Mode)
//   const { setMode } = useStore();
//   useEffect(() => { setMode('idle'); }, [setMode]);

//   // 2. PARALLAX EFFECTS
//   const { normalizedX, normalizedY } = useMouse();
//   const springConfig = { stiffness: 50, damping: 20 };
//   const springX = useSpring(useTransform(normalizedX, [-1, 1], [30, -30]), springConfig);
//   const springY = useSpring(useTransform(normalizedY, [-1, 1], [30, -30]), springConfig);

//   // 3. SMART MATCH DETECTION
//   useEffect(() => {
//     const now = new Date().getTime();
//     // Find the first match where the time is greater than now
//     const upcoming = SCHEDULE.find(match => new Date(match.date).getTime() > now);
    
//     if (upcoming) {
//       setActiveMatch(upcoming);
//     } else {
//       // If all matches passed, show the last one or a "Season Over" state
//       setActiveMatch(SCHEDULE[SCHEDULE.length - 1]);
//     }
//   }, []);

//   // 4. COUNTDOWN TIMER
//   useEffect(() => {
//     if (!activeMatch) return;
    
//     const targetDate = new Date(activeMatch.date).getTime();

//     const timer = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = targetDate - now;

//       if (distance < 0) {
//         clearInterval(timer);
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       } else {
//         setTimeLeft({
//           days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//           minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
//           seconds: Math.floor((distance % (1000 * 60)) / 1000),
//         });
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [activeMatch]);

//   const handleScrollDown = () => {
//     const nextSection = document.getElementById('section-stats');
//     if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      
//       {/* BACKGROUND */}
//       <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-black z-0" />
//       <div className="absolute inset-0 opacity-[0.05] bg-[url('/images/noise.png')] pointer-events-none z-0 mix-blend-overlay" />

//       {/* PARALLAX WATERMARK */}
//       <motion.div 
//         style={{ x: springX, y: springY }}
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1.5, ease: "easeOut" }}
//         className="absolute z-0 select-none pointer-events-none"
//       >
//         <span className="text-[40vw] font-heading font-bold leading-none text-white/[0.03] blur-sm">
//            18
//         </span>
//       </motion.div>

//       {/* MAIN CONTENT */}
//       <div className="relative z-10 text-center px-4">
        
//         {/* TOP LABEL */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="flex items-center justify-center gap-4 mb-6"
//         >
//           <div className="h-[1px] w-8 md:w-16 bg-vk-gold" />
//           <span className="text-vk-gold font-bold uppercase tracking-[0.4em] text-[10px] md:text-sm drop-shadow-md">
//             The G.O.A.T
//           </span>
//           <div className="h-[1px] w-8 md:w-16 bg-vk-gold" />
//         </motion.div>
        
//         {/* NAME TITLE */}
//         <motion.h1 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="font-heading text-6xl md:text-[9rem] leading-[0.9] text-white mb-8 drop-shadow-2xl"
//         >
//           VIRAT <br />
//           <span className="text-vk-gold">KOHLI</span>
//         </motion.h1>

//         {/* SUBTEXT */}
//         <motion.p 
//            initial={{ opacity: 0 }}
//            animate={{ opacity: 1 }}
//            transition={{ duration: 0.8, delay: 0.6 }}
//            className="max-w-xl mx-auto text-gray-300 text-sm md:text-lg leading-relaxed mb-16 tracking-wide"
//         >
//           The King returns to face New Zealand. 
//           <span className="text-vk-gold"> {activeMatch.label} at 1:30 PM.</span>
//         </motion.p>

//         {/* SMART COUNTDOWN */}
//         <motion.div 
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8, duration: 0.8 }}
//           className="relative inline-flex flex-col items-center group"
//         >
//           {/* DYNAMIC BADGE */}
//           <div className="absolute -top-5 z-20 bg-vk-gold text-black font-bold text-[10px] md:text-xs px-4 py-1 rounded-full tracking-widest uppercase shadow-lg group-hover:scale-105 transition-transform">
//             Next Battle: {activeMatch.opponent} ({activeMatch.label})
//           </div>

//           {/* TIMER CONTAINER */}
//           <div className="flex gap-4 md:gap-8 p-6 md:p-8 rounded-2xl bg-[#111] border border-white/20 shadow-2xl group-hover:border-vk-gold/50 transition-colors duration-500">
//             <CountdownItem value={timeLeft.days} label="Days" />
//             <Separator />
//             <CountdownItem value={timeLeft.hours} label="Hours" />
//             <Separator />
//             <CountdownItem value={timeLeft.minutes} label="Mins" />
//             <Separator />
//             <CountdownItem value={timeLeft.seconds} label="Secs" />
//           </div>
//         </motion.div>

//       </div>
      
//       {/* SCROLL BUTTON */}
//       <motion.button 
//         onClick={handleScrollDown}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1, y: [0, 10, 0] }}
//         transition={{ delay: 2, duration: 2, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute bottom-10 z-20 flex flex-col items-center gap-2 group cursor-pointer"
//       >
//         <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase group-hover:text-vk-gold transition-colors">
//           Scroll to Explore
//         </span>
//         <div className="w-[1px] h-12 bg-vk-gold" />
//       </motion.button>

//     </section>
//   );
// }

// // --- HELPERS ---
// function CountdownItem({ value, label }: { value: number, label: string }) {
//   const formattedValue = value < 10 ? `0${value}` : value;
//   return (
//     <div className="flex flex-col items-center min-w-[50px] md:min-w-[80px]">
//       <span className="font-mono text-3xl md:text-5xl font-bold text-white drop-shadow-md tabular-nums">
//         {formattedValue}
//       </span>
//       <span className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-vk-gold mt-2 font-medium">
//         {label}
//       </span>
//     </div>
//   );
// }

// function Separator() {
//   return (
//     <div className="flex flex-col justify-start pt-2 md:pt-4">
//       <span className="text-2xl md:text-4xl text-white/40 animate-pulse">:</span>
//     </div>
//   );
// }

'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image'; // ✅ Added Image Component
import { useStore } from '@/store/useStore';
import useMouse from '@/hooks/useMouse';

// --- SMART SCHEDULE CONFIGURATION ---
const SCHEDULE = [
  { id: 1, date: '2026-01-11T13:30:00', label: "1st ODI", opponent: "New Zealand" },
  { id: 2, date: '2026-01-14T13:30:00', label: "2nd ODI", opponent: "New Zealand" },
  { id: 3, date: '2026-01-18T13:30:00', label: "3rd ODI", opponent: "New Zealand" }
];

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeMatch, setActiveMatch] = useState(SCHEDULE[0]);
  
  // 1. SCENE CONTROL
  const { setMode } = useStore();
  useEffect(() => { setMode('idle'); }, [setMode]);

  // 2. PARALLAX EFFECTS
  const { normalizedX, normalizedY } = useMouse();
  const springConfig = { stiffness: 50, damping: 20 };
  const springX = useSpring(useTransform(normalizedX, [-1, 1], [30, -30]), springConfig);
  const springY = useSpring(useTransform(normalizedY, [-1, 1], [30, -30]), springConfig);

  // 3. SMART MATCH DETECTION & TIMER
  useEffect(() => {
    const now = new Date().getTime();
    const upcoming = SCHEDULE.find(match => new Date(match.date).getTime() > now);
    if (upcoming) setActiveMatch(upcoming);
    else setActiveMatch(SCHEDULE[SCHEDULE.length - 1]);
  }, []);

  useEffect(() => {
    if (!activeMatch) return;
    const targetDate = new Date(activeMatch.date).getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [activeMatch]);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('section-stats');
    if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#050505]">
      
      {/* 1. BACKGROUND IMAGE (Aligned Right) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image 
          src="/images/champions2025.jpg" // Ensure this image exists!
          alt="Virat Kohli Hero"
          fill
          priority
          className="object-cover object-right opacity-90"
        />
      </div>

      {/* 2. THE CINEMATIC SPLIT GRADIENT (Left Dark -> Right Transparent) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      <div className="absolute inset-0 opacity-[0.05] bg-[url('/images/noise.png')] pointer-events-none z-10 mix-blend-overlay" />

      {/* 3. PARALLAX WATERMARK (Subtle in Background) */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute left-10 top-20 z-10 select-none pointer-events-none opacity-20"
      >
        <span className="text-[30vw] font-heading font-bold leading-none text-white/[0.05] blur-sm">
           18
        </span>
      </motion.div>

      {/* 4. MAIN CONTENT (Aligned Left) */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center px-6 md:px-20 items-start text-left">
        
        {/* TOP LABEL */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-[1px] w-12 bg-vk-gold" />
          <span className="text-vk-gold font-bold uppercase tracking-[0.4em] text-xs md:text-sm drop-shadow-md">
            The G.O.A.T
          </span>
        </motion.div>
        
        {/* NAME TITLE */}
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-6xl md:text-[9rem] leading-[0.9] text-white mb-8 drop-shadow-2xl"
        >
          VIRAT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-vk-gold to-[#B8860B]">
            KOHLI
          </span>
        </motion.h1>

        {/* SUBTEXT (Border Left Style) */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="border-l-4 border-vk-gold pl-6 mb-12"
        >
           <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-lg">
             The King returns to face New Zealand. <br />
             <span className="text-white font-bold">{activeMatch.label} at 1:30 PM.</span>
           </p>
        </motion.div>

        {/* SMART COUNTDOWN (Left Aligned) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative group"
        >
          {/* Badge */}
          <div className="absolute -top-4 left-4 z-20 bg-vk-gold text-black font-bold text-[10px] px-3 py-1 rounded-full tracking-widest uppercase shadow-lg">
            Next Battle: {activeMatch.opponent}
          </div>

          {/* Timer Box */}
          <div className="flex gap-4 md:gap-8 p-6 md:p-8 rounded-2xl bg-[#111]/80 backdrop-blur-md border border-white/10 shadow-2xl group-hover:border-vk-gold/50 transition-colors duration-500">
            <CountdownItem value={timeLeft.days} label="Days" />
            <Separator />
            <CountdownItem value={timeLeft.hours} label="Hours" />
            <Separator />
            <CountdownItem value={timeLeft.minutes} label="Mins" />
            <Separator />
            <CountdownItem value={timeLeft.seconds} label="Secs" />
          </div>
        </motion.div>

      </div>
      
      {/* SCROLL BUTTON (Bottom Left) */}
      <motion.button 
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-20 flex items-center gap-4 group cursor-pointer z-20"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-vk-gold to-transparent" />
        <span className="text-white/40 text-[10px] uppercase tracking-widest writing-vertical-rl rotate-180 group-hover:text-vk-gold transition-colors">
          Scroll to Explore
        </span>
      </motion.button>

    </section>
  );
}

// --- HELPERS ---
function CountdownItem({ value, label }: { value: number, label: string }) {
  const formattedValue = value < 10 ? `0${value}` : value;
  return (
    <div className="flex flex-col items-center min-w-[50px] md:min-w-[80px]">
      <span className="font-mono text-3xl md:text-5xl font-bold text-white drop-shadow-md tabular-nums">
        {formattedValue}
      </span>
      <span className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-vk-gold mt-2 font-medium">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex flex-col justify-start pt-2 md:pt-4">
      <span className="text-2xl md:text-4xl text-white/40 animate-pulse">:</span>
    </div>
  );
}