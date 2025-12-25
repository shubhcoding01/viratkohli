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

'use client';

import { useProgress } from '@react-three/drei';
import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const QUOTES = [
  "Self-belief and hard work will always earn you success.",
  "I like to be myself, and I don't pretend.",
  "Pressure is a privilege.",
  "Consistency is boring, but it's the only way.",
];

export default function LoadingScreen() {
  // 1. Hook into the 3D Loader
  // 'active' tells us if three.js is currently fetching files
  const { progress, active } = useProgress();
  
  // 2. Access our Global Store
  const { isLoaded, setProgress: setStoreProgress } = useStore();
  
  // 3. Local Smoothing State
  const [displayProgress, setDisplayProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // --- LOGIC: SMOOTH PROGRESS BAR ---
  // If assets load instantly (0->100), we still want a smooth 1s animation.
  useEffect(() => {
    let animationFrame: number;

    const updateProgress = () => {
      setDisplayProgress((prev) => {
        // Move 20% of the way to the target (Ease-out effect)
        const diff = progress - prev;
        if (diff === 0) return prev;
        
        const next = prev + diff * 0.1; 
        
        // Snap to 100 if we are very close
        if (progress === 100 && next > 99) return 100;
        return next;
      });
      
      animationFrame = requestAnimationFrame(updateProgress);
    };

    if (active || displayProgress < 100) {
      updateProgress();
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [progress, active, displayProgress]);


  // --- LOGIC: FINISH LOADING ---
  useEffect(() => {
    // Sync with global store (Zustand)
    setStoreProgress(Math.round(displayProgress));

    if (displayProgress >= 99.9 && !isLoaded) {
       // Small delay for drama before lifting curtain
       // Note: We don't manually setLoaded(true) here anymore because 
       // the store automatically handles it when progress hits 100 in our advanced store!
       setStoreProgress(100); 
    }
  }, [displayProgress, setStoreProgress, isLoaded]);


  // --- LOGIC: ROTATE QUOTES ---
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 2500); // Change quote every 2.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="loader"
          // Cinematic Exit: Curtain Slide Up + Fade
          exit={{ y: "-100%", opacity: 0.9, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden"
        >
          {/* BACKGROUND TEXTURE */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
            
            {/* A. PULSING LOGO */}
            <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="relative mb-12"
            >
              <h1 className="font-heading text-[120px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-vk-gold to-vk-gold-dark tracking-tighter drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                18
              </h1>
              {/* Shine effect passing over logo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer pointer-events-none" />
            </motion.div>


            {/* B. QUOTE CAROUSEL */}
            <div className="h-16 mb-8 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="font-serif text-vk-gold/80 text-sm tracking-widest uppercase"
                >
                  "{QUOTES[quoteIndex]}"
                </motion.p>
              </AnimatePresence>
            </div>


            {/* C. PROGRESS BAR CONTAINER */}
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              {/* The Moving Gold Bar */}
              <motion.div 
                className="absolute top-0 left-0 h-full bg-vk-gold shadow-[0_0_10px_#D4AF37]"
                style={{ width: `${displayProgress}%` }}
              />
            </div>

            {/* D. PERCENTAGE TEXT */}
            <div className="w-full flex justify-between items-center mt-4">
               <span className="text-xs text-white/40 font-mono tracking-wider">
                  LOADING ASSETS
               </span>
               <span className="text-xl font-heading text-white font-bold tabular-nums">
                  {Math.round(displayProgress).toString().padStart(2, '0')}%
               </span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}