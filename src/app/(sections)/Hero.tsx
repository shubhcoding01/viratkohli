// 'use client';

// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useStore } from '@/store/useStore';
// import Button from '@/components/ui/Button';
// import { useRef } from 'react';

// // Animation Variants for "Staggered Letters"
// const titleVariants = {
//   hidden: { opacity: 0, y: 100 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: 0.5 + (i * 0.1), // Staggers each letter by 0.1s
//       duration: 1,
//       ease: [0.22, 1, 0.36, 1], // "Cinematic" easing
//     }
//   })
// };

// export default function Hero() {
//   const { setMode } = useStore();
//   const ref = useRef(null);

//   // 1. Hook into the Scroll Position
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"]
//   });

//   // 2. Parallax Transforms (Items move at different speeds)
//   const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Moves slow
//   const ySubtext = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]); // Moves fast
//   const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]); // Fades out

//   return (
//     <section 
//       ref={ref}
//       id="section-0" 
//       className="relative h-screen w-full flex items-center justify-start px-6 md:px-20 overflow-hidden"
//     >
//       {/* NOTE: We removed 'pointer-events-none' from the main container to fix scrolling issues.
//          Instead, we manually set 'pointer-events-none' on the text layers so clicks pass through to the 3D scene 
//          where there are no buttons.
//       */}

//       <div className="flex flex-col items-start z-10 max-w-5xl pointer-events-none">
        
//         {/* A. The "GOAT" Label (Parallax Layer 1) */}
//         <motion.div style={{ y: yText, opacity: opacityFade }}>
//           <motion.span 
//             initial={{ opacity: 0, letterSpacing: "0em" }}
//             whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
//             transition={{ duration: 1.5, ease: "easeOut" }}
//             className="font-heading text-vk-gold text-xl md:text-2xl block mb-4 ml-1"
//           >
//             THE G.O.A.T
//           </motion.span>
//         </motion.div>

//         {/* B. The Massive Title (Staggered Characters) */}
//         <div className="relative font-heading text-8xl md:text-[13rem] leading-[0.85] text-white mix-blend-overlay">
//           {/* Row 1: VIRAT */}
//           <div className="flex overflow-hidden">
//             {["V", "I", "R", "A", "T"].map((char, i) => (
//               <motion.span
//                 key={i}
//                 custom={i}
//                 variants={titleVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 className="inline-block"
//               >
//                 {char}
//               </motion.span>
//             ))}
//           </div>
          
//           {/* Row 2: KOHLI (Gradient) */}
//           <div className="flex overflow-hidden">
//              {["K", "O", "H", "L", "I"].map((char, i) => (
//               <motion.span
//                 key={i}
//                 custom={i + 2} // Start delaying after "VIRAT" finishes
//                 variants={titleVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-vk-gold to-yellow-600 drop-shadow-2xl"
//               >
//                 {char}
//               </motion.span>
//             ))}
//           </div>
//         </div>

//         {/* C. Subtext (Parallax Layer 2 - Moves Faster) */}
//         <motion.p 
//           style={{ y: ySubtext, opacity: opacityFade }}
//           initial={{ opacity: 0, x: -20 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1, delay: 1.2 }}
//           className="font-body text-gray-300 text-lg md:text-xl mt-10 max-w-xl leading-relaxed border-l-2 border-vk-gold pl-6"
//         >
//           From the streets of Delhi to the throne of World Cricket. <br />
//           <span className="text-white font-bold">80 Centuries. 265M Fans. 1 King.</span>
//         </motion.p>

//         {/* D. Control Deck (Glassmorphism) - Pointer Events ENABLED */}
//         <motion.div 
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 1.5 }}
//           className="mt-12 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex flex-wrap gap-4 pointer-events-auto"
//         >
//           <Button 
//             variant="aggressive" 
//             onMouseEnter={() => setMode('aggressive')}
//             onMouseLeave={() => setMode('idle')}
//             onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
//           >
//             Chase Master
//           </Button>

//           <Button 
//             variant="secondary"
//             onMouseEnter={() => setMode('classic')}
//             onMouseLeave={() => setMode('idle')}
//             onClick={() => document.getElementById('section-2')?.scrollIntoView({ behavior: 'smooth' })}
//           >
//             Career Journey
//           </Button>
//         </motion.div>

//       </div>

//       {/* E. Scroll Indicator (Animated Mouse) */}
//       <motion.div 
//         style={{ opacity: opacityFade }}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2, duration: 1 }}
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
//       >
//         <span className="text-xs font-heading tracking-widest text-vk-gold animate-pulse">
//           SCROLL TO EXPLORE
//         </span>
//         <div className="w-[1px] h-16 bg-gradient-to-b from-vk-gold to-transparent" />
//       </motion.div>

//       {/* F. Background Glow */}
//       <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-vk-gold/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10 pointer-events-none" />
//     </section>
//   );
// }

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { useStore } from '@/store/useStore';
import Button from '@/components/ui/Button';

// Audio setup (using Howler for SFX)
const hoverSound = new Howl({ src: ['/sounds/swoosh.mp3'], volume: 0.3 });
const clickSound = new Howl({ src: ['/sounds/bat-hit.mp3'], volume: 0.5 });

export default function Hero() {
  const { setMode, mode } = useStore(); // Zustand for 3D mode
  const titleRef = useRef(null);
  const subtextRef = useRef(null);
  const [particles, setParticles] = useState([]); // State for client-side particles

  // Parallax effect (Framer handles SSR internally)
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    // GSAP animation for title reveal
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
      .fromTo(subtextRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.5 }, '-=0.5');

    // Generate particles only on client (after mount)
    if (typeof window !== 'undefined') {
      const newParticles = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 2,
      }));
      setParticles(newParticles);
    }
  }, []);

  return (
    <motion.section
      id="section-0"
      className="relative h-screen w-full flex items-center justify-start px-6 md:px-20 overflow-hidden pointer-events-none"
      style={{ y: yTransform }}
    >
      {/* Dynamic background based on mode */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          mode === 'aggressive' ? 'bg-red-900/20' : mode === 'classic' ? 'bg-blue-900/20' : 'bg-black/50'
        }`}
      />

      {/* Floating particles (client-side only) */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-vk-gold rounded-full opacity-50"
            initial={{ x: particle.x, y: particle.y }}
            animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: particle.delay }}
          />
        ))}
      </div>

      <div className="flex flex-col items-start z-10 max-w-4xl">
        {/* 1. The "GOAT" Label */}
        <motion.span
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-vk-gold text-xl md:text-2xl tracking-[0.5em] mb-4 drop-shadow-lg"
          style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.8)' }}
        >
          THE G.O.A.T
        </motion.span>

        {/* 2. The Main Title */}
        <h1
          ref={titleRef}
          className="font-heading text-8xl md:text-[12rem] leading-none text-white mix-blend-overlay cursor-pointer"
          onMouseEnter={() => hoverSound.play()}
        >
          VIRAT
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-vk-gold to-yellow-600 drop-shadow-2xl">
            KOHLI
          </span>
        </h1>

        {/* 3. Subtext */}
        <motion.p
          ref={subtextRef}
          className="font-body text-gray-400 text-lg mt-8 max-w-lg leading-relaxed backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10"
        >
          Explore the journey of the King. From the streets of Delhi to the throne of World Cricket.
          Experience the aggression, the class, and the records in 3D.
        </motion.p>

        {/* Quick Stats Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="mt-4 text-sm text-vk-gold bg-black/70 p-2 rounded pointer-events-auto"
        >
          Hover to see: Runs: 13,000+ | Centuries: 80+
        </motion.div>

        {/* 4. Interactive Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap gap-6 mt-12 pointer-events-auto"
        >
          <Button
            variant="aggressive"
            onMouseEnter={() => {
              setMode('aggressive');
              hoverSound.play();
            }}
            onMouseLeave={() => setMode('idle')}
            onClick={() => {
              clickSound.play();
              const statsSection = document.getElementById('section-1');
              if (statsSection) statsSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:shadow-2xl hover:scale-105 transition-transform"
          >
            Chase Master
          </Button>

          <Button
            variant="secondary"
            onMouseEnter={() => {
              setMode('classic');
              hoverSound.play();
            }}
            onMouseLeave={() => setMode('idle')}
            onClick={() => {
              clickSound.play();
              const careerSection = document.getElementById('section-2');
              if (careerSection) careerSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:shadow-2xl hover:scale-105 transition-transform"
          >
            Career Journey
          </Button>
        </motion.div>
      </div>

      {/* 5. Enhanced Decorative Background */}
      <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-radial from-vk-gold/10 to-transparent opacity-50 blur-3xl -z-10 animate-pulse" />
    </motion.section>
  );
}
