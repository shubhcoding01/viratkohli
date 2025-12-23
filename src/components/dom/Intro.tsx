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

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const [clicked, setClicked] = useState(false);

  // Lock body scroll so user can't scroll away while intro is visible
  useEffect(() => {
    if (!clicked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [clicked]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer group"
      
      // 👇 CHANGE HERE: Use 'x' instead of 'y'
      initial={{ x: 0 }}
      animate={clicked ? { x: '100%' } : { x: 0 }} 
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      
      onAnimationComplete={() => {
        if (clicked) onComplete();
      }}
      onClick={() => setClicked(true)}
    >
      {/* The Hero Image */}
      <div className="relative w-full h-full">
        <Image
          src="/images/virat.jpg"
          alt="Virat Kohli Champion"
          fill
          className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
          priority
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/20" />

        {/* Text Content */}
        <div className="absolute bottom-10 left-6 md:left-20 text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-heading text-6xl md:text-8xl tracking-tighter mb-2"
          >
            THE KING
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-body text-xl tracking-[0.5em] text-vk-gold mb-8"
          >
            LEGACY OF 18
          </motion.p>

          {/* Click Prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, repeat: Infinity, duration: 2, repeatType: "reverse" }} 
            className="flex items-center gap-4"
          >
             <div className="h-[1px] w-12 bg-white/50" />
             <span className="font-heading tracking-widest text-sm uppercase">Click to Enter</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}