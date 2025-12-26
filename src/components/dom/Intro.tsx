// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { cn } from '@/lib/utils'; // Assuming you have this, otherwise remove cn() wrapper

// export default function Intro({ onComplete }: { onComplete: () => void }) {
//   const [clicked, setClicked] = useState(false);

//   // Lock body scroll so user can't scroll away while intro is visible
//   useEffect(() => {
//     if (!clicked) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//   }, [clicked]);

//   return (
//     <motion.div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer group"
//       // 1. Logic Change: Only animate OUT when 'clicked' is true
//       initial={{ y: 0 }}
//       animate={clicked ? { y: '-100%' } : { y: 0 }} 
//       transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
//       onAnimationComplete={() => {
//         if (clicked) onComplete();
//       }}
//       onClick={() => setClicked(true)} // 2. Trigger dismissal on click
//     >
//       {/* The Hero Image */}
//       <div className="relative w-full h-full">
//         <Image
//           src="/images/virat.jpg"
//           alt="Virat Kohli Champion"
//           fill
//           className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" // Subtle zoom effect on hover
//           priority
//         />
        
//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/20" />

//         {/* Text Content */}
//         <div className="absolute bottom-10 left-6 md:left-20 text-white">
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="font-heading text-6xl md:text-8xl tracking-tighter mb-2"
//           >
//             THE KING
//           </motion.h1>
          
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//             className="font-body text-xl tracking-[0.5em] text-vk-gold mb-8"
//           >
//             LEGACY OF 18
//           </motion.p>

//           {/* 3. The "Click to Enter" Button/Prompt */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.5, repeat: Infinity, duration: 2, repeatType: "reverse" }} // Pulse animation
//             className="flex items-center gap-4"
//           >
//              <div className="h-[1px] w-12 bg-white/50" />
//              <span className="font-heading tracking-widest text-sm uppercase">Click to Enter</span>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';

// export default function Intro({ onComplete }: { onComplete: () => void }) {
//   const [clicked, setClicked] = useState(false);

//   // Lock body scroll so user can't scroll away while intro is visible
//   useEffect(() => {
//     if (!clicked) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//   }, [clicked]);

//   return (
//     <motion.div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer group"
      
//       // 👇 CHANGE HERE: Use 'x' instead of 'y'
//       initial={{ x: 0 }}
//       animate={clicked ? { x: '100%' } : { x: 0 }} 
//       transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      
//       onAnimationComplete={() => {
//         if (clicked) onComplete();
//       }}
//       onClick={() => setClicked(true)}
//     >
//       {/* The Hero Image */}
//       <div className="relative w-full h-full">
//         <Image
//           src="/images/virat.jpg"
//           alt="Virat Kohli Champion"
//           fill
//           className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
//           priority
//         />
        
//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/20" />

//         {/* Text Content */}
//         <div className="absolute bottom-10 left-6 md:left-20 text-white">
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="font-heading text-6xl md:text-8xl tracking-tighter mb-2"
//           >
//             THE KING
//           </motion.h1>
          
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//             className="font-body text-xl tracking-[0.5em] text-vk-gold mb-8"
//           >
//             LEGACY OF 18
//           </motion.p>

//           {/* Click Prompt */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.5, repeat: Infinity, duration: 2, repeatType: "reverse" }} 
//             className="flex items-center gap-4"
//           >
//              <div className="h-[1px] w-12 bg-white/50" />
//              <span className="font-heading tracking-widest text-sm uppercase">Click to Enter</span>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }


// 'use client';

// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import Image from 'next/image';
// import { useEffect, useState, useRef } from 'react';
// import { cn } from '@/lib/utils';
// import useMouse from '@/hooks/useMouse'; // Use your advanced hook for tilt

// interface IntroProps {
//   onComplete: () => void;
// }

// export default function Intro({ onComplete }: IntroProps) {
//   const [clicked, setClicked] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   // 1. Mouse Parallax for "Alive" feel before click
//   const { normalizedX, normalizedY } = useMouse();
  
//   // Subtle movement opposite to mouse
//   const x = useTransform(normalizedX, [-1, 1], ["2%", "-2%"]);
//   const y = useTransform(normalizedY, [-1, 1], ["2%", "-2%"]);

//   // 2. Lock Scroll Logic
//   useEffect(() => {
//     if (!clicked) {
//       document.body.style.overflow = 'hidden';
//       document.body.style.cursor = 'pointer';
//     } else {
//       document.body.style.overflow = '';
//       document.body.style.cursor = 'auto';
//     }
//   }, [clicked]);

//   const handleClick = () => {
//     if (clicked) return;
//     setClicked(true);
    
//     // OPTIONAL: Trigger Global Audio Here
//     // useStore.getState().setAudio(true);
//   };

//   return (
//     <motion.div
//       ref={containerRef}
//       className="fixed inset-0 z-[50] flex items-center justify-center bg-black overflow-hidden"
//       onClick={handleClick}
//     >
//       {/* --- A. LEFT CURTAIN --- */}
//       <motion.div
//         className="absolute inset-y-0 left-0 w-1/2 bg-[#050505] z-20 origin-left"
//         initial={{ scaleX: 1 }}
//         animate={clicked ? { x: "-100%" } : { x: 0 }}
//         transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Heavy exponential ease
//       >
//          {/* Split Image Left Half */}
//          <div className="relative w-[200vw] h-full overflow-hidden -ml-[0vw]"> 
//             <motion.div style={{ x, y }} className="relative w-full h-full">
//                <Image
//                  src="/images/virat.jpg"
//                  alt="The King"
//                  fill
//                  className="object-cover opacity-60 grayscale"
//                  priority
//                />
//             </motion.div>
//          </div>
//       </motion.div>

//       {/* --- B. RIGHT CURTAIN --- */}
//       <motion.div
//         className="absolute inset-y-0 right-0 w-1/2 bg-[#050505] z-20 origin-right"
//         initial={{ scaleX: 1 }}
//         animate={clicked ? { x: "100%" } : { x: 0 }}
//         transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
//         onAnimationComplete={() => onComplete()}
//       >
//          {/* Split Image Right Half */}
//          <div className="relative w-[200vw] h-full overflow-hidden -ml-[100vw]">
//             <motion.div style={{ x, y }} className="relative w-full h-full">
//                <Image
//                  src="/images/virat.jpg"
//                  alt="The King"
//                  fill
//                  className="object-cover opacity-60 grayscale"
//                  priority
//                />
//             </motion.div>
//          </div>
//       </motion.div>

//       {/* --- C. TEXT CONTENT (Fades out quickly on click) --- */}
//       <motion.div 
//         className="absolute z-30 flex flex-col items-center justify-center text-center pointer-events-none mix-blend-overlay"
//         animate={clicked ? { opacity: 0, scale: 1.5, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
//         transition={{ duration: 0.8 }}
//       >
//         <h1 className="font-heading text-9xl md:text-[12rem] text-white tracking-tighter leading-none">
//           THE KING
//         </h1>
//         <div className="h-[1px] w-32 bg-vk-gold my-6" />
//         <p className="font-serif text-vk-gold tracking-[0.5em] text-sm md:text-xl uppercase">
//           Enter The Arena
//         </p>
//       </motion.div>

//       {/* --- D. BACKGROUND REVEAL FLASH --- */}
//       {/* White flash when curtains open */}
//       <motion.div 
//          className="absolute inset-0 bg-white z-10 pointer-events-none"
//          initial={{ opacity: 0 }}
//          animate={clicked ? { opacity: [0, 0.5, 0] } : { opacity: 0 }}
//          transition={{ duration: 0.5, delay: 0.1 }}
//       />

//     </motion.div>
//   );
// }


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