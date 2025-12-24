// 'use client';

// import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
// import { useEffect, useRef, useState } from 'react';
// import { Howl } from 'howler';
// import { useStore } from '@/store/useStore';
// import Button from '@/components/ui/Button';

// // --- AUDIO SETUP ---
// const sfx = {
//   hover: new Howl({ src: ['/sounds/hover-click.mp3'], volume: 0.2, html5: true }), // Replace with your file
//   active: new Howl({ src: ['/sounds/power-up.mp3'], volume: 0.4, html5: true }),   // Replace with your file
// };

// // --- CUSTOM HOOK: TEXT SCRAMBLE EFFECT ---
// // Decodes text like a movie hacker terminal (e.g., "XF#9" -> "GOAT")
// function useScrambleText(text: string, speed: number = 50) {
//   const [displayedText, setDisplayedText] = useState("");
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

//   useEffect(() => {
//     let i = 0;
//     const interval = setInterval(() => {
//       setDisplayedText(
//         text
//           .split("")
//           .map((letter, index) => {
//             if (index < i) return letter;
//             return chars[Math.floor(Math.random() * chars.length)];
//           })
//           .join("")
//       );
//       if (i >= text.length) clearInterval(interval);
//       i += 1 / 3; // Controls speed of decryption
//     }, speed);
//     return () => clearInterval(interval);
//   }, [text, speed]);

//   return displayedText;
// }

// export default function Hero() {
//   const { setMode, mode } = useStore();
//   const ref = useRef<HTMLDivElement>(null);

//   // --- 1. MOUSE TRACKING FOR 3D TILT ---
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   // Smooth out the mouse movement so it feels like fluid liquid
//   const springConfig = { damping: 20, stiffness: 300 };
//   const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
//   const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

//   // Mouse Spotlight Effect (Radial Gradient follows mouse)
//   const spotLightX = useSpring(0, { damping: 30, stiffness: 200 });
//   const spotLightY = useSpring(0, { damping: 30, stiffness: 200 });
  
//   function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
//     const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
//     // Calculate normalized mouse position (-0.5 to 0.5) for Tilt
//     mouseX.set((clientX - left) / width - 0.5);
//     mouseY.set((clientY - top) / height - 0.5);

//     // Update Spotlight Position
//     spotLightX.set(clientX);
//     spotLightY.set(clientY);
//   }

//   // --- 2. SCROLL PARALLAX ---
//   const { scrollY } = useScroll();
//   const yText = useTransform(scrollY, [0, 500], [0, 200]); // Text moves down slowly
//   const opacityFade = useTransform(scrollY, [0, 300], [1, 0]); // Fades out on scroll

//   // --- 3. SCRAMBLE TEXT ---
//   const scrambledLabel = useScrambleText("THE G.O.A.T", 70);

//   return (
//     <motion.section
//       id="section-0"
//       ref={ref}
//       onMouseMove={handleMouseMove}
//       style={{ opacity: opacityFade }}
//       className="relative h-screen w-full flex items-center justify-start px-6 md:px-20 overflow-hidden perspective-1000" // perspective is KEY for 3D
//     >
//       {/* A. DYNAMIC BACKGROUND (Reacts to Mode) */}
//       <div
//         className={`absolute inset-0 transition-colors duration-1000 ease-in-out -z-20 ${
//           mode === 'aggressive' ? 'bg-red-950/30' : mode === 'classic' ? 'bg-blue-950/30' : 'bg-transparent'
//         }`}
//       />

//       {/* B. MOUSE SPOTLIGHT (The "Flashlight" in the dark) */}
//       <motion.div
//         className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-500"
//         style={{
//           background: useMotionTemplate`
//             radial-gradient(
//               600px circle at ${spotLightX}px ${spotLightY}px,
//               rgba(212, 175, 55, 0.10),
//               transparent 80%
//             )
//           `,
//         }}
//       />

//       <div className="flex flex-col items-start z-10 max-w-5xl pointer-events-none">
        
//         {/* C. DECODED LABEL ("THE G.O.A.T") */}
//         <motion.span
//           className="font-heading text-vk-gold text-xl md:text-2xl tracking-[0.5em] mb-4 pl-1"
//           style={{ textShadow: "0px 0px 20px rgba(212, 175, 55, 0.5)" }}
//         >
//           {scrambledLabel}
//         </motion.span>

//         {/* D. 3D TILT TITLE (The Masterpiece) */}
//         <motion.div
//           style={{ 
//             rotateX, 
//             rotateY, 
//             y: yText,
//             transformStyle: "preserve-3d" // Enables deep 3D
//           }}
//           className="relative perspective-1000"
//         >
//           <h1 className="font-heading text-8xl md:text-[13rem] leading-[0.85] text-white mix-blend-overlay drop-shadow-2xl">
//             <motion.span 
//               className="block"
//               initial={{ x: -100, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 1, ease: "easeOut" }}
//             >
//               VIRAT
//             </motion.span>
            
//             <motion.span 
//               className="block text-transparent bg-clip-text bg-gradient-to-r from-vk-gold to-yellow-600"
//               initial={{ x: 100, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
//               // Add a subtle z-axis lift to make it pop out
//               style={{ transform: "translateZ(50px)" }} 
//             >
//               KOHLI
//             </motion.span>
//           </h1>
//         </motion.div>

//         {/* E. SUBTEXT WITH GLASSMORPHISM */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8 }}
//           className="font-body text-gray-300 text-lg mt-10 max-w-lg leading-relaxed backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 shadow-2xl"
//         >
//           From the streets of Delhi to the throne of World Cricket. <br />
//           <span className="text-vk-gold font-bold">80 Centuries. 265M Fans. 1 King.</span>
//         </motion.p>

//         {/* F. INTERACTIVE BUTTONS (Glass Deck) */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1 }}
//           className="mt-12 flex flex-wrap gap-6 pointer-events-auto"
//         >
//           <Button
//             variant="aggressive"
//             onMouseEnter={() => { setMode('aggressive'); sfx.hover.play(); }}
//             onMouseLeave={() => setMode('idle')}
//             onClick={() => {
//               sfx.active.play();
//               document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' });
//             }}
//           >
//             Chase Master
//           </Button>

//           <Button
//             variant="secondary"
//             onMouseEnter={() => { setMode('classic'); sfx.hover.play(); }}
//             onMouseLeave={() => setMode('idle')}
//             onClick={() => {
//               sfx.active.play();
//               document.getElementById('section-2')?.scrollIntoView({ behavior: 'smooth' });
//             }}
//           >
//             Career Journey
//           </Button>
//         </motion.div>

//       </div>

//       {/* G. SCROLL PROMPT */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1, y: [0, 10, 0] }}
//         transition={{ delay: 2, duration: 2, repeat: Infinity }}
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none text-white/50"
//       >
//         <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
//         <div className="w-[1px] h-12 bg-gradient-to-b from-vk-gold to-transparent" />
//       </motion.div>

//     </motion.section>
//   );
// }

// 'use client';

// import { motion } from 'framer-motion';

// export default function Hero() {
//   return (
//     <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
//       {/* Background Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-vk-black z-0" />
      
//       {/* Giant Background Number "18" */}
//       <span className="absolute text-[40vw] font-heading text-white/5 font-bold select-none z-0">
//         18
//       </span>

//       <div className="relative z-10 text-center">
//         <motion.span 
//           initial={{ opacity: 0, letterSpacing: '0.2em' }}
//           animate={{ opacity: 1, letterSpacing: '0.5em' }}
//           transition={{ duration: 1 }}
//           className="text-vk-gold font-bold uppercase tracking-widest text-sm md:text-xl"
//         >
//           The G.O.A.T
//         </motion.span>
        
//         <h1 className="font-heading text-7xl md:text-9xl text-white mt-4 mb-6">
//           VIRAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-vk-gold to-yellow-600">KOHLI</span>
//         </h1>

//         <p className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed">
//           A visual journey through the career of the greatest batsman of the modern era.
//         </p>
//       </div>
//     </section>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// --- CONFIGURATION ---
// 📅 SET THE NEXT MATCH DATE HERE (Year, MonthIndex 0-11, Day, Hour, Minute)
// Example: March 22, 2025 at 7:30 PM
const NEXT_MATCH_DATE = new Date(2025, 2, 22, 19, 30).getTime(); 
const OPPONENT = "CSK"; // Change this to the opponent team name

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  // --- COUNTDOWN LOGIC ---
  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = NEXT_MATCH_DATE - now;

      if (distance < 0) {
        clearInterval(timer); // Stop if match started
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
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-vk-black">
      
      {/* 1. CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 bg-linear-to-b from-gray-900 via-vk-black to-black z-0" />
      
      {/* Giant "18" Watermark */}
      <motion.span 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute text-[45vw] font-heading text-white/3 font-bold select-none z-0 leading-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-sm"
      >
        18
      </motion.span>

      {/* 2. MAIN CONTENT */}
      <div className="relative z-10 text-center px-4">
        
        {/* Top Label */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <div className="h-px w-12 bg-linear-to-r from-transparent to-vk-gold" />
          <span className="text-vk-gold font-bold uppercase tracking-[0.3em] text-xs md:text-sm drop-shadow-md">
            The G.O.A.T
          </span>
          <div className="h-px w-12 bg-linear-to-l from-transparent to-vk-gold" />
        </motion.div>
        
        {/* Main Title */}
        <h1 className="font-heading text-6xl md:text-[8rem] leading-[0.9] text-white mb-6 drop-shadow-2xl">
          VIRAT <br />
          <span className="text-transparent bg-clip-text bg-linear-to-b from-[#FFFFFF] via-[#FFD700] to-[#B8860B]">
            KOHLI
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-gray-400 text-sm md:text-lg leading-relaxed mb-12 border-l-2 border-vk-gold/30 pl-4 text-left md:text-center md:border-l-0 md:pl-0">
          A visual journey through the career of the greatest batsman of the modern era.
          From Delhi to the World.
        </p>

        {/* 3. THE ADVANCED COUNTDOWN MATCH CENTER */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative inline-flex flex-col items-center"
        >
          {/* Match Context Badge */}
          <div className="absolute -top-6 bg-vk-gold text-black font-bold text-xs px-3 py-1 rounded-full tracking-widest uppercase shadow-[0_0_15px_rgba(255,215,0,0.6)]">
            Next Battle vs {OPPONENT}
          </div>

          {/* Glassmorphism Container */}
          <div className="flex gap-4 md:gap-8 p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
            
            {/* Days */}
            <CountdownItem value={timeLeft.days} label="Days" />
            <Separator />
            {/* Hours */}
            <CountdownItem value={timeLeft.hours} label="Hours" />
            <Separator />
            {/* Minutes */}
            <CountdownItem value={timeLeft.minutes} label="Mins" />
            <Separator />
            {/* Seconds */}
            <CountdownItem value={timeLeft.seconds} label="Secs" />

          </div>
        </motion.div>

      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 text-white/30 text-xs tracking-[0.2em] uppercase"
      >
        Scroll to Explore
      </motion.div>

    </section>
  );
}

// --- HELPER COMPONENTS ---

function CountdownItem({ value, label }: { value: number, label: string }) {
  // Format number to always show 2 digits (e.g., 05 instead of 5)
  const formattedValue = value < 10 ? `0${value}` : value;

  return (
    <div className="flex flex-col items-center min-w-15 md:min-w-20">
      <span className="font-mono text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400 drop-shadow-lg">
        {formattedValue}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-vk-gold mt-2 font-medium opacity-80">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex flex-col justify-start pt-2 md:pt-4">
      <span className="text-2xl md:text-4xl text-white/20 animate-pulse">:</span>
    </div>
  );
}