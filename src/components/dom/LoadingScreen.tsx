// 'use client';

// import { useProgress } from '@react-three/drei';
// import { useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useStore } from '@/store/useStore';

// export default function LoadingScreen() {
//   // 1. Hook into the 3D Loader
//   // 'progress' is a number from 0 to 100 representing loaded assets
//   const { progress } = useProgress();
  
//   // 2. Access our Global Store
//   const { isLoaded, setIsLoaded } = useStore();

//   // 3. Watch the progress
//   useEffect(() => {
//     // If progress is 100% and we haven't marked it loaded yet...
//     if (progress === 100 && !isLoaded) {
//       // Add a small delay so the user sees "100%" briefly before it vanishes
//       setTimeout(() => {
//         setIsLoaded(true);
//       }, 1000);
//     }
//   }, [progress, isLoaded, setIsLoaded]);

//   return (
//     <AnimatePresence>
//       {!isLoaded && (
//         <motion.div
//           key="loader"
//           // Exit Animation: Fade out and slide up
//           exit={{ opacity: 0, y: -50 }}
//           transition={{ duration: 1, ease: "easeInOut" }}
//           className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-vk-black text-white"
//         >
//           {/* A. The "King's Brand" Logo */}
//           <motion.h1
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             className="font-heading text-9xl text-vk-gold tracking-tighter drop-shadow-2xl"
//           >
//             18
//           </motion.h1>

//           {/* B. The Progress Bar Container */}
//           <div className="w-64 h-1 mt-8 bg-vk-gray rounded-full overflow-hidden relative">
//             {/* The Moving Gold Bar */}
//             <motion.div 
//               className="absolute top-0 left-0 h-full bg-vk-gold"
//               initial={{ width: 0 }}
//               animate={{ width: `${progress}%` }}
//               transition={{ duration: 0.1 }} // Instant response to loading updates
//             />
//           </div>

//           {/* C. The Percentage Text */}
//           <p className="mt-4 font-body text-sm text-gray-400 tracking-widest uppercase">
//             Entering the Arena... {Math.round(progress)}%
//           </p>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


// 'use client';

// import { useProgress } from '@react-three/drei';
// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useStore } from '@/store/useStore';

// const QUOTES = [
//   "Self-belief and hard work will always earn you success.",
//   "I like to be myself, and I don't pretend.",
//   "Pressure is a privilege.",
//   "Consistency is boring, but it's the only way.",
// ];

// export default function LoadingScreen() {
//   const { progress, active } = useProgress();
//   const { isLoaded, setProgress: setStoreProgress } = useStore();
  
//   const [displayProgress, setDisplayProgress] = useState(0);
//   const [quoteIndex, setQuoteIndex] = useState(0);

//   // --- FIXED USE EFFECT ---
//   useEffect(() => {
//     let animationFrame: number;

//     const updateProgress = () => {
//       setDisplayProgress((prev) => {
//         const diff = progress - prev;
        
//         // Stop if we are close enough (prevents micro-decimals keeping loop alive)
//         if (Math.abs(diff) < 0.5) return progress;
        
//         const next = prev + diff * 0.1; 
//         if (progress === 100 && next > 99) return 100;
//         return next;
//       });
      
//       // Continue loop only if we haven't reached the target
//       if (displayProgress < progress || active) {
//           animationFrame = requestAnimationFrame(updateProgress);
//       }
//     };

//     if (active || displayProgress < 100) {
//       updateProgress();
//     }

//     return () => cancelAnimationFrame(animationFrame);
    
//     // 👇 ERROR WAS HERE: We removed 'displayProgress' from this array
//   }, [progress, active]); 


//   // --- SYNC TO STORE ---
//   useEffect(() => {
//     // Optimization: Round it so we don't blast the global store with decimals
//     const rounded = Math.round(displayProgress);
//     setStoreProgress(rounded);

//     if (rounded === 100 && !isLoaded) {
//        // Allow store to handle the completion logic
//        setStoreProgress(100); 
//     }
//   }, [displayProgress, setStoreProgress, isLoaded]);

//   // --- QUOTE ROTATOR ---
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
//     }, 2500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <AnimatePresence>
//       {!isLoaded && (
//         <motion.div
//           key="loader"
//           exit={{ y: "-100%", opacity: 0.9, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
//           className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden"
//         >
//           {/* BACKGROUND */}
//           <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 pointer-events-none" />

//           <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
            
//             {/* LOGO */}
//             <motion.div
//                initial={{ opacity: 0, scale: 0.8 }}
//                animate={{ opacity: 1, scale: 1 }}
//                transition={{ duration: 1 }}
//                className="relative mb-12"
//             >
//               <h1 className="font-heading text-[120px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-vk-gold to-vk-gold-dark tracking-tighter drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
//                 18
//               </h1>
//               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer pointer-events-none" />
//             </motion.div>

//             {/* QUOTES */}
//             <div className="h-16 mb-8 text-center">
//               <AnimatePresence mode="wait">
//                 <motion.p
//                   key={quoteIndex}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.4 }}
//                   className="font-serif text-vk-gold/80 text-sm tracking-widest uppercase"
//                 >
//                   "{QUOTES[quoteIndex]}"
//                 </motion.p>
//               </AnimatePresence>
//             </div>

//             {/* PROGRESS BAR */}
//             <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
//               <motion.div 
//                 className="absolute top-0 left-0 h-full bg-vk-gold shadow-[0_0_10px_#D4AF37]"
//                 style={{ width: `${displayProgress}%` }}
//               />
//             </div>

//             {/* TEXT */}
//             <div className="w-full flex justify-between items-center mt-4">
//                <span className="text-xs text-white/40 font-mono tracking-wider">
//                   LOADING ASSETS
//                </span>
//                <span className="text-xl font-heading text-white font-bold tabular-nums">
//                   {Math.round(displayProgress).toString().padStart(2, '0')}%
//                </span>
//             </div>

//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


'use client';

import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

// --- CONFIGURATION ---
const SYSTEM_LOGS = [
  "INITIALIZING_NEURAL_LINK...",
  "LOADING_STADIUM_ASSETS...",
  "CALIBRATING_PHYSICS_ENGINE...",
  "FETCHING_LEGACY_DATA...",
  "SYNCING_WITH_RCB_SERVERS...",
  "PREPARING_THE_ARENA..."
];

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const { isLoaded, setProgress: setStoreProgress } = useStore();
  
  const [displayProgress, setDisplayProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  // 1. SMOOTH PROGRESS LOGIC
  useEffect(() => {
    let animationFrame: number;
    const updateProgress = () => {
      setDisplayProgress((prev) => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.5) return progress;
        const next = prev + diff * 0.1;
        if (progress === 100 && next > 99) return 100;
        return next;
      });
      
      if (displayProgress < progress || active) {
         animationFrame = requestAnimationFrame(updateProgress);
      }
    };
    if (active || displayProgress < 100) {
      updateProgress();
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [progress, active]); 

  // 2. SYNC TO STORE
  useEffect(() => {
    const rounded = Math.round(displayProgress);
    setStoreProgress(rounded);
    if (rounded === 100 && !isLoaded) {
       setTimeout(() => setStoreProgress(100), 500);
    }
  }, [displayProgress, setStoreProgress, isLoaded]);

  // 3. LOG ROTATOR
  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex(prev => (prev + 1) % SYSTEM_LOGS.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // --- CURTAIN ANIMATION ---
  const containerVariants = {
    exit: { transition: { staggerChildren: 0.1 } }
  };

  const columnVariants = {
    initial: { y: 0 },
    exit: { 
      y: "-100%", 
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isLoaded && (
        <motion.div
          key="loader-container"
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col md:flex-row pointer-events-none bg-[#050505]" // Force background color
        >
          
          {/* A. CURTAINS */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              variants={columnVariants}
              className="relative h-full w-full bg-[#050505] border-r border-white/5 last:border-r-0 overflow-hidden"
            >
               <div className="absolute inset-0 opacity-10 bg-[url('/images/noise.png')]" />
            </motion.div>
          ))}

          {/* B. CONTENT */}
          <motion.div 
            className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 z-20"
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.5 } }}
          >
            
            {/* TOP BAR */}
            <div className="flex justify-between items-start font-mono text-[10px] md:text-xs text-white/60 tracking-widest uppercase">
              <div className="flex flex-col gap-1">
                 <span className="text-vk-gold animate-pulse">SYSTEM_ONLINE</span>
                 <span>LATENCY: 12ms</span>
              </div>
              <div>SECURE_ENCLAVE</div>
            </div>

            {/* CENTER NUMBER */}
            <div className="flex-1 flex flex-col items-center justify-center relative">
               
               {/* Spinning Ring (Visual Aid) */}
               <div className="absolute w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] border border-white/20 rounded-full animate-slow-spin" />

               {/* THE NUMBER - FIXED VISIBILITY */}
               <div className="relative font-heading text-[20vw] md:text-[15vw] leading-none tracking-tighter select-none">
                  
                  {/* LAYER 1: Base Color (Dark Grey instead of Invisible) */}
                  <span className="block text-white/10">
                    {Math.round(displayProgress)}
                  </span>

                  {/* LAYER 2: Liquid Gold Fill */}
                  <motion.span 
                    className="absolute inset-0 top-0 left-0 text-vk-gold overflow-hidden"
                    initial={{ height: "0%" }}
                    style={{ height: `${displayProgress}%` }}
                  >
                    {Math.round(displayProgress)}
                  </motion.span>
               </div>

               <div className="mt-8 font-mono text-xs md:text-sm tracking-[0.8em] text-vk-gold/80 animate-pulse">
                  LOADING_DATA
               </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="font-mono text-[10px] md:text-xs text-white/50 flex justify-between items-end border-t border-white/10 pt-4">
              <div className="h-6 w-64 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={logIndex}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                  >
                    {`> ${SYSTEM_LOGS[logIndex]}`}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div>ID: VK-18 // VER.24</div>
            </div>

          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}