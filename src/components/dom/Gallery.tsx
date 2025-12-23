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
import { cn } from '@/lib/utils'; // Ensure you have this utility, or remove cn() usage

// Images 1 to 17 go in the scroll gallery. 
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
  
  // 1. SCROLL TRACKING (Locked for 300vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // 2. HORIZONTAL MOVEMENT (Images)
  // Row 1: Moves Left
  const x1 = useTransform(scrollYProgress, [0, 1], ["10%", "-60%"]);
  // Row 2: Moves Right
  const x2 = useTransform(scrollYProgress, [0, 1], ["-60%", "10%"]);

  // 3. VERTICAL 3D TEXT CRAWL MOVEMENT
  // Starts below screen (100%), scrolls up into distance (-150%)
  const textY = useTransform(scrollYProgress, [0, 1], ["110%", "-200%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);


  const topRowImages = galleryImages.slice(0, 9);
  const bottomRowImages = galleryImages.slice(9, 17).reverse();

  // Shared Image Container Styles (Fixed the cropping issue here)
  const imageContainerClass = "relative h-[45vh] w-[35vh] md:h-[55vh] md:w-[45vh] flex-shrink-0 rounded-lg overflow-hidden group bg-gray-900/50 border border-white/10";
  // Using 'object-contain' ensures the WHOLE image is seen, no cropping.
  const imageClass = "object-contain p-2 group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 transition-opacity";

  return (
    <>
      {/* SECTION A: THE LOCKED GALLERY & 3D CRAWL */}
      <section ref={containerRef} className="relative h-[300vh] bg-vk-black">
        
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          
          {/* Static Title Overlay */}
          <div className="absolute top-10 left-6 md:left-20 z-30 mix-blend-difference">
            <h2 className="font-heading text-4xl md:text-6xl text-white">
              THE <span className="text-vk-gold">ARCHIVES</span>
            </h2>
            <p className="text-gray-400 font-body tracking-wider text-sm mt-2">
              SCROLL TO WITNESS THE JOURNEY
            </p>
          </div>

          {/* --- THE 3D MOVIE TEXT CRAWL LAYER --- */}
          {/* 'perspective' creates the 3D depth field */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none perspective-[1000px]">
              {/* The scrolling container with 3D tilt */}
              <motion.div 
                style={{ 
                  y: textY, 
                  opacity: textOpacity,
                  rotateX: "25deg", // Tilts the text back like Star Wars ending
                }}
                className="max-w-4xl text-center font-heading text-vk-gold tracking-widest leading-relaxed drop-shadow-2xl"
              >
                {crawlText.map((line, index) => (
                  <p key={index} className={cn(
                    "mb-8",
                    index === 0 ? "text-4xl md:text-6xl mb-16 text-white" : "text-xl md:text-3xl",
                    index === crawlText.length - 1 ? "text-4xl md:text-5xl mt-16 text-white" : ""
                  )}>
                    {line}
                  </p>
                ))}
              </motion.div>
               {/* Gradient Mask to make text fade out at top and bottom */}
              <div className="absolute inset-0 bg-gradient-to-b from-vk-black via-transparent to-vk-black z-25 pointer-events-none" />
          </div>


          {/* --- BACKGROUND MOVING IMAGES --- */}
          <div className="flex flex-col gap-8 relative z-10">
            
            {/* ROW 1 (Moves Left) */}
            <motion.div style={{ x: x1 }} className="flex gap-6 w-max pl-6">
              {topRowImages.map((num) => (
                <div key={num} className={imageContainerClass}>
                  <Image
                    src={`/images/virat${num}.jpg`}
                    alt={`Memory ${num}`}
                    fill
                    className={imageClass} // Using object-contain here
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
                    className={imageClass} // Using object-contain here
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

      {/* SECTION B: THE GRAND FINALE (Virat 18) */}
      <section className="relative h-screen w-full overflow-hidden z-30">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/virat18.jpg"
            alt="The Perfect Cover Drive"
            fill
            // We keep cover here for the full screen impact
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