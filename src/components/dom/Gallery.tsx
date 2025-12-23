// 'use client';

// import { motion, useScroll, useTransform } from 'framer-motion';
// import Image from 'next/image';
// import { useRef } from 'react';

// // Create an array of 18 items [1, 2, ... 18]
// const images = Array.from({ length: 18 }, (_, i) => i + 1);

// export default function Gallery() {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start end', 'end start']
//   });

//   // Parallax: Row 1 moves Left, Row 2 moves Right
//   const x1 = useTransform(scrollYProgress, [0, 1], [0, -1000]);
//   const x2 = useTransform(scrollYProgress, [0, 1], [-1000, 0]);

//   return (
//     <section ref={containerRef} className="py-20 bg-vk-black overflow-hidden relative z-10">
      
//       <div className="mb-10 px-6 md:px-20">
//         <h2 className="font-heading text-4xl md:text-6xl text-white">
//           THE <span className="text-vk-gold">ARCHIVES</span>
//         </h2>
//       </div>

//       <div className="flex flex-col gap-8">
//         {/* ROW 1: Images 1-9 */}
//         <motion.div style={{ x: x1 }} className="flex gap-4 w-max">
//           {images.slice(0, 9).map((num) => (
//             <div key={num} className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500 rounded-lg overflow-hidden">
//               <Image
//                 src={`/images/virat${num}.jpg`}
//                 alt={`Memory ${num}`}
//                 fill
//                 className="object-cover hover:scale-110 transition-transform duration-700"
//               />
//             </div>
//           ))}
//         </motion.div>

//         {/* ROW 2: Images 10-18 */}
//         <motion.div style={{ x: x2 }} className="flex gap-4 w-max">
//           {images.slice(9, 18).map((num) => (
//             <div key={num} className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500 rounded-lg overflow-hidden">
//               <Image
//                 src={`/images/virat${num}.jpg`}
//                 alt={`Memory ${num}`}
//                 fill
//                 className="object-cover hover:scale-110 transition-transform duration-700"
//               />
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// 'use client';

// import { motion, useScroll, useTransform } from 'framer-motion';
// import Image from 'next/image';
// import { useRef } from 'react';

// export default function Gallery() {
//   const targetRef = useRef(null);
  
//   // 1. The Scroll Logic
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     // Start animation when bottom of viewport hits top of section
//     // End animation when bottom of viewport leaves bottom of section
//     offset: ["start start", "end end"]
//   });

//   // 17 images moving horizontally
//   // We move the track from 0% to -90% (adjust based on how many images)
//   const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

//   // Create array for images 1 to 17
//   const streakImages = Array.from({ length: 17 }, (_, i) => i + 1);

//   return (
//     <>
//       {/* SECTION 1: THE HORIZONTAL SCROLL (Images 1-17) */}
//       {/* height: 400vh makes it 4x longer than a normal screen, giving you time to scroll */}
//       <section ref={targetRef} className="relative h-[400vh] bg-vk-black">
        
//         {/* The Sticky Container (This stays locked on screen) */}
//         <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          
//           {/* Title Overlay */}
//           <div className="absolute top-10 left-10 z-20 mix-blend-difference text-white">
//             <h2 className="font-heading text-4xl md:text-6xl uppercase tracking-tighter">
//               The Streak
//             </h2>
//             <p className="font-body text-vk-gold tracking-widest text-sm">
//               SCROLL DOWN TO EXPLORE
//             </p>
//           </div>

//           {/* The Moving Track */}
//           <motion.div style={{ x }} className="flex gap-10 px-20">
//             {streakImages.map((num) => (
//               <div 
//                 key={num} 
//                 className="relative h-[60vh] w-[40vh] md:h-[70vh] md:w-[50vh] flex-shrink-0 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500"
//               >
//                 <Image
//                   src={`/images/virat${num}.jpg`}
//                   alt={`Virat Memory ${num}`}
//                   fill
//                   className="object-cover"
//                 />
//                 <div className="absolute bottom-4 left-4 text-white font-heading text-6xl opacity-50">
//                   {num < 10 ? `0${num}` : num}
//                 </div>
//               </div>
//             ))}
//           </motion.div>

//         </div>
//       </section>

//       {/* SECTION 2: THE GRAND FINALE (Image 18 - Cover Drive) */}
//       <section className="relative h-screen w-full overflow-hidden">
//         {/* Parallax Background Image */}
//         <div className="absolute inset-0 z-0">
//           <Image
//             src="/images/virat18.jpg" // Must be the Cover Drive photo
//             alt="The Perfect Cover Drive"
//             fill
//             className="object-cover"
//             priority
//           />
//           {/* Vignette Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
//         </div>

//         {/* Text Reveal */}
//         <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 text-center">
//           <motion.h2 
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.2 }}
//             className="font-heading text-7xl md:text-9xl text-white drop-shadow-2xl"
//           >
//             PURE CLASS
//           </motion.h2>
          
//           <motion.p 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 0.5 }}
//             className="font-body text-vk-gold tracking-[0.5em] text-lg uppercase mt-4"
//           >
//             The Signature Cover Drive
//           </motion.p>
//         </div>
//       </section>
//     </>
//   );
// }

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const galleryImages = Array.from({ length: 17 }, (_, i) => i + 1);

// THE CINEMATIC TEXT CONTENT
const crawlText = [
  "THE KOHLI ERA",
  "A boy from Delhi who dared to dream. He didn't just play the game; he redefined aggression, consistency, and passion.",
  "From the Under-19 glory to stepping into the shoes of giants, he carried the hopes of a billion with a fire in his eyes that burned brighter than the stadium lights.",
  "The Chase Master. The Run Machine. The King. 80 international centuries are not just statistics; they are chapters of dominance written across stadiums worldwide.",
  "He made the impossible chases look routine. He turned pressure into his playground. His cover drive became poetry in motion, a sight that stopped time.",
  "Beyond the runs, it was the attitude. The belief that victory belongs to those who want it most. He transformed a team's mindset, forging a legacy of fitness and fearlessness.",
  "As the archives scroll, witness the evolution of a legend. A career defined not just by triumphs, but by the indomitable spirit to rise after every fall.",
  "LONG LIVE THE KING."
];

export default function Gallery() {
  const containerRef = useRef(null);
  
  // 1. SCROLL TRACKING (Locked for 350vh for a longer, slower crawl)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // 2. HORIZONTAL MOVEMENT (Images) - Slightly slower speed
  const x1 = useTransform(scrollYProgress, [0, 1], ["5%", "-45%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-45%", "5%"]);

  // 3. VERTICAL 3D TEXT CRAWL MOVEMENT
  // Starts further down, ends further up for a long dramatic scroll
  const textY = useTransform(scrollYProgress, [0, 1], ["120%", "-250%"]);

  const topRowImages = galleryImages.slice(0, 9);
  const bottomRowImages = galleryImages.slice(9, 17).reverse();

  // Shared Image Styles
  const imageContainerClass = "relative h-[45vh] w-[35vh] md:h-[55vh] md:w-[45vh] flex-shrink-0 rounded-lg overflow-hidden group bg-gray-900/50 border border-white/10";
  // Reduced image opacity slightly to make text pop more
  const imageClass = "object-contain p-2 group-hover:scale-105 transition-transform duration-700 opacity-40 group-hover:opacity-80 transition-opacity";

  return (
    <>
      {/* SECTION A: THE LOCKED GALLERY & 3D CRAWL */}
      <section ref={containerRef} className="relative h-[350vh] bg-vk-black">
        
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          
          {/* Static Title Overlay - Made subtler so it doesn't fight the crawl text */}
          <div className="absolute top-10 left-6 md:left-20 z-30 opacity-50 mix-blend-overlay">
            <h2 className="font-heading text-3xl md:text-5xl text-white">
              THE ARCHIVES
            </h2>
          </div>

          {/* --- THE 3D MOVIE TEXT CRAWL LAYER --- */}
          {/* NEW FEATURE: THE FOCUS MASK 
              [mask-image:...] creates a gradient mask. 
              - transparent_0%: Top is invisible
              - black_35% to black_65%: The center "sweet spot" is fully visible
              - transparent_100%: Bottom becomes invisible again
          */}
          <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none perspective-[1000px]
                          [mask-image:linear-gradient(to_bottom,transparent_0%,black_35%,black_65%,transparent_100%)]">
              
              {/* The scrolling container with 3D tilt */}
              <motion.div 
                style={{ 
                  y: textY, 
                  rotateX: "30deg", // Increased tilt slightly
                }}
                // NEW FEATURE: 3D METALLIC FONT & NEW FONT STYLE
                // font-serif: Gives it the Roman/Cinematic feel
                // bg-gradient-to-b...bg-clip-text text-transparent: Creates the 3D Gold effect
                className="max-w-4xl text-center font-serif uppercase tracking-[0.2em] leading-loose drop-shadow-2xl
                           bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent"
              >
                {crawlText.map((line, index) => (
                  <p key={index} className={cn(
                    // Added extra padding between lines for the focus effect to work better
                    "py-6 md:py-10",
                    index === 0 ? "text-5xl md:text-7xl font-bold" : "text-2xl md:text-4xl font-semibold",
                    index === crawlText.length - 1 ? "text-5xl md:text-6xl font-bold mt-10" : ""
                  )}>
                    {line}
                  </p>
                ))}
              </motion.div>
          </div>


          {/* --- BACKGROUND MOVING IMAGES --- */}
          <div className="flex flex-col gap-8 relative z-10 blur-[2px]">
            
            {/* ROW 1 (Moves Left) */}
            <motion.div style={{ x: x1 }} className="flex gap-6 w-max pl-6">
              {topRowImages.map((num) => (
                <div key={num} className={imageContainerClass}>
                  <Image
                    src={`/images/virat${num}.jpg`}
                    alt={`Memory ${num}`}
                    fill
                    className={imageClass}
                  />
                   <span className="absolute bottom-2 right-4 text-4xl text-white/20 font-heading">
                    {num}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* ROW 2 (Moves Right) */}
            <motion.div style={{ x: x2 }} className="flex gap-6 w-max pr-6">
              {bottomRowImages.map((num) => (
                <div key={num} className={imageContainerClass}>
                  <Image
                    src={`/images/virat${num}.jpg`}
                    alt={`Memory ${num}`}
                    fill
                    className={imageClass}
                  />
                  <span className="absolute bottom-2 right-4 text-4xl text-white/20 font-heading">
                    {num}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION B: THE GRAND FINALE (Virat 18) - No changes here */}
      <section className="relative h-screen w-full overflow-hidden z-50">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/virat18.jpg"
            alt="The Perfect Cover Drive"
            fill
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vk-black via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-24 text-center px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-heading text-7xl md:text-[10rem] leading-none text-white drop-shadow-2xl"
          >
            PURE CLASS
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-4 flex items-center gap-4"
          >
            <div className="h-[1px] w-12 bg-vk-gold" />
            <span className="font-body text-vk-gold tracking-[0.5em] text-lg uppercase">
              The Signature Cover Drive
            </span>
            <div className="h-[1px] w-12 bg-vk-gold" />
          </motion.div>
        </div>
      </section>
    </>
  );
}


// 'use client';

// import { motion, useScroll, useTransform } from 'framer-motion';
// import Image from 'next/image';
// import { useRef } from 'react';
// import { cn } from '@/lib/utils';

// // Images 1 → 17
// const galleryImages = Array.from({ length: 17 }, (_, i) => i + 1);

// // CINEMATIC VIRAT-ONLY STORY
// const crawlText = [
//   "THE KOHLI ERA",
//   "From the streets of Delhi to the grandest stadiums on Earth.",
//   "A generation didn’t just watch cricket — they watched belief take shape.",
//   "He walked in with aggression, hunger, and an unshakable fire.",
//   "Chases became rituals. Pressure became fuel.",
//   "Fitness became culture. Intent became identity.",
//   "Records fell. Expectations rose. The standard changed forever.",
//   "This is not just a career.",
//   "This is legacy.",
//   "LONG LIVE THE KING."
// ];

// export default function Gallery() {
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   // LOCKED SCROLL
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end end'],
//   });

//   // IMAGE MOTION (same feel as original)
//   const x1 = useTransform(scrollYProgress, [0, 1], [0, -800]);
//   const x2 = useTransform(scrollYProgress, [0, 1], [-800, 0]);

//   // TEXT CRAWL
//   const textY = useTransform(scrollYProgress, [0, 1], ['120%', '-250%']);

//   const topRowImages = galleryImages.slice(0, 9);
//   const bottomRowImages = galleryImages.slice(9, 17).reverse();

//   return (
//     <>
//       {/* ================= SECTION A ================= */}
//       <section ref={containerRef} className="relative h-[350vh] bg-vk-black">
//         <div className="sticky top-0 h-screen overflow-hidden">

//           {/* TITLE */}
//           <div className="absolute top-10 left-6 md:left-20 z-30">
//             <h2 className="font-heading text-4xl md:text-6xl text-white">
//               THE <span className="text-vk-gold">ARCHIVES</span>
//             </h2>
//             <p className="text-gray-400 tracking-wider text-sm mt-2">
//               A COLLECTION OF MEMORIES
//             </p>
//           </div>

//           {/* ===== CINEMATIC TEXT CRAWL ===== */}
//           <div
//             className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none
//                        perspective-[1000px]
//                        [mask-image:linear-gradient(to_bottom,transparent_0%,black_35%,black_65%,transparent_100%)]"
//           >
//             <motion.div
//               style={{ y: textY, rotateX: '28deg' }}
//               className="max-w-5xl text-center font-serif uppercase tracking-[0.25em]
//                          bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#B38728]
//                          bg-clip-text text-transparent drop-shadow-2xl"
//             >
//               {crawlText.map((line, i) => (
//                 <p
//                   key={i}
//                   className={cn(
//                     'py-6 md:py-10',
//                     i === 0 && 'text-5xl md:text-7xl font-bold',
//                     i !== 0 && i !== crawlText.length - 1 && 'text-2xl md:text-4xl',
//                     i === crawlText.length - 1 && 'text-5xl md:text-6xl font-bold mt-10'
//                   )}
//                 >
//                   {line}
//                 </p>
//               ))}
//             </motion.div>
//           </div>

//           {/* ===== BACKGROUND IMAGE GALLERY (ORIGINAL STYLE) ===== */}
//           <div className="relative z-10 flex flex-col gap-8 pt-40">

//             {/* ROW 1 */}
//             <motion.div style={{ x: x1 }} className="flex gap-6 w-max pl-6">
//               {topRowImages.map((num) => (
//                 <div
//                   key={num}
//                   className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]
//                              flex-shrink-0 rounded-lg overflow-hidden
//                              grayscale hover:grayscale-0 transition-all duration-500 group"
//                 >
//                   <Image
//                     src={`/images/virat${num}.jpg`}
//                     alt={`Memory ${num}`}
//                     fill
//                     className="object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <span className="absolute bottom-2 right-4 text-6xl text-white/10 font-heading font-bold">
//                     {num}
//                   </span>
//                 </div>
//               ))}
//             </motion.div>

//             {/* ROW 2 */}
//             <motion.div style={{ x: x2 }} className="flex gap-6 w-max pr-6">
//               {bottomRowImages.map((num) => (
//                 <div
//                   key={num}
//                   className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]
//                              flex-shrink-0 rounded-lg overflow-hidden
//                              grayscale hover:grayscale-0 transition-all duration-500 group"
//                 >
//                   <Image
//                     src={`/images/virat${num}.jpg`}
//                     alt={`Memory ${num}`}
//                     fill
//                     className="object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <span className="absolute bottom-2 right-4 text-6xl text-white/10 font-heading font-bold">
//                     {num}
//                   </span>
//                 </div>
//               ))}
//             </motion.div>

//           </div>
//         </div>
//       </section>

//       {/* ================= SECTION B ================= */}
//       <section className="relative h-screen w-full overflow-hidden z-50">
//         <div className="absolute inset-0">
//           <Image
//             src="/images/virat18.jpg"
//             alt="The Perfect Cover Drive"
//             fill
//             className="object-cover"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-vk-black via-black/50 to-transparent" />
//         </div>

//         <div className="relative h-full flex flex-col items-center justify-end pb-24 text-center px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1 }}
//             className="font-heading text-7xl md:text-[10rem] text-white drop-shadow-2xl"
//           >
//             PURE CLASS
//           </motion.h2>

//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 0.5 }}
//             className="mt-4 flex items-center gap-4"
//           >
//             <div className="h-[1px] w-12 bg-vk-gold" />
//             <span className="text-vk-gold tracking-[0.5em] uppercase text-lg">
//               The Signature Cover Drive
//             </span>
//             <div className="h-[1px] w-12 bg-vk-gold" />
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// }


// 'use client';

// import { motion, useScroll, useTransform } from 'framer-motion';
// import Image from 'next/image';
// import { useRef } from 'react';
// import { cn } from '@/lib/utils';

// // Images 1 → 17
// const galleryImages = Array.from({ length: 17 }, (_, i) => i + 1);

// // CINEMATIC VIRAT STORY (ONLY TEXT)
// const crawlText = [
//   'THE KOHLI ERA',
//   'From the streets of Delhi to the world’s grandest stadiums.',
//   'A generation didn’t just watch cricket — they witnessed belief.',
//   'Aggression in the eyes. Discipline in the body. Fire in the soul.',
//   'Chases became rituals. Pressure became fuel.',
//   'Fitness became culture. Intent became identity.',
//   'Records fell. Expectations rose. The standard changed forever.',
//   'This is not just a career.',
//   'This is legacy.',
//   'LONG LIVE THE KING.'
// ];

// export default function Gallery() {
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   /* ================= SCROLL CONTROL ================= */
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end 85%'], // lock longer
//   });

//   /* ================= IMAGE MOTION ================= */
//   const x1 = useTransform(scrollYProgress, [0, 1], [0, -800]);
//   const x2 = useTransform(scrollYProgress, [0, 1], [-800, 0]);

//   /* ================= TEXT MOTION (SLOW) ================= */
//   const textY = useTransform(
//     scrollYProgress,
//     [0, 0.85, 1],
//     ['140%', '-120%', '-280%']
//   );

//   const topRowImages = galleryImages.slice(0, 9);
//   const bottomRowImages = galleryImages.slice(9, 17).reverse();

//   return (
//     <>
//       {/* ================= SECTION A ================= */}
//       <section ref={containerRef} className="relative h-[350vh] bg-vk-black">
//         <div className="sticky top-0 h-screen overflow-hidden">

//           {/* ===== TITLE ===== */}
//           <div className="absolute top-10 left-6 md:left-20 z-30">
//             <h2 className="font-heading text-4xl md:text-6xl text-white">
//               THE <span className="text-vk-gold">ARCHIVES</span>
//             </h2>
//             <p className="text-gray-400 tracking-wider text-sm mt-2">
//               A COLLECTION OF MEMORIES
//             </p>
//           </div>

//           {/* ===== CINEMATIC TEXT CRAWL ===== */}
//           <div
//             className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none
//                        perspective-[1200px]
//                        [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_70%,transparent_100%)]"
//           >
//             <motion.div
//               style={{ y: textY, rotateX: '26deg' }}
//              className="relative max-w-5xl text-center font-serif uppercase tracking-[0.28em]
//            bg-gradient-to-b from-[#FFFFFF] via-[#FFD700] to-[#B8860B]
//            bg-clip-text text-transparent
//            drop-shadow-[0_4px_4px_rgba(0,0,0,1)]
//            [text-shadow:0_0_20px_rgba(255,215,0,0.5)]"
//             >
//               {crawlText.map((line, index) => (
//                 <motion.p
//                   key={index}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 1.8, delay: index * 0.15 }}
//                   className={cn(
//                     'py-8 md:py-12 leading-relaxed',
//                     index === 0 && 'text-5xl md:text-7xl font-bold',
//                     index > 0 &&
//                       index < crawlText.length - 1 &&
//                       'text-2xl md:text-4xl font-medium',
//                     index === crawlText.length - 1 &&
//                       'text-5xl md:text-6xl font-bold mt-16 tracking-[0.4em]'
//                   )}
//                 >
//                   {line}
//                 </motion.p>
//               ))}
//             </motion.div>
//           </div>

//           {/* ===== IMAGE GALLERY (UNCHANGED STYLE) ===== */}
//           <div className="relative z-10 flex flex-col gap-8 pt-40">

//             {/* ROW 1 */}
//             <motion.div style={{ x: x1 }} className="flex gap-6 w-max pl-6">
//               {topRowImages.map((num) => (
//                 <div
//                   key={num}
//                   className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]
//                              flex-shrink-0 rounded-lg overflow-hidden
//                              grayscale hover:grayscale-0 transition-all duration-500 group"
//                 >
//                   <Image
//                     src={`/images/virat${num}.jpg`}
//                     alt={`Memory ${num}`}
//                     fill
//                     className="object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <span className="absolute bottom-2 right-4 text-6xl text-white/10 font-heading font-bold">
//                     {num}
//                   </span>
//                 </div>
//               ))}
//             </motion.div>

//             {/* ROW 2 */}
//             <motion.div style={{ x: x2 }} className="flex gap-6 w-max pr-6">
//               {bottomRowImages.map((num) => (
//                 <div
//                   key={num}
//                   className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]
//                              flex-shrink-0 rounded-lg overflow-hidden
//                              grayscale hover:grayscale-0 transition-all duration-500 group"
//                 >
//                   <Image
//                     src={`/images/virat${num}.jpg`}
//                     alt={`Memory ${num}`}
//                     fill
//                     className="object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <span className="absolute bottom-2 right-4 text-6xl text-white/10 font-heading font-bold">
//                     {num}
//                   </span>
//                 </div>
//               ))}
//             </motion.div>

//           </div>
//         </div>
//       </section>

//       {/* ================= SECTION B ================= */}
//       <section className="relative h-screen w-full overflow-hidden z-50">
//         <div className="absolute inset-0">
//           <Image
//             src="/images/virat18.jpg"
//             alt="The Perfect Cover Drive"
//             fill
//             className="object-cover"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-vk-black via-black/50 to-transparent" />
//         </div>

//         <div className="relative h-full flex flex-col items-center justify-end pb-24 text-center px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="font-heading text-7xl md:text-[10rem] text-white drop-shadow-2xl"
//           >
//             PURE CLASS
//           </motion.h2>

//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 0.5 }}
//             className="mt-4 flex items-center gap-4"
//           >
//             <div className="h-[1px] w-12 bg-vk-gold" />
//             <span className="text-vk-gold tracking-[0.5em] uppercase text-lg">
//               The Signature Cover Drive
//             </span>
//             <div className="h-[1px] w-12 bg-vk-gold" />
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// }
