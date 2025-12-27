'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

// --- DATA ---
const galleryImages = Array.from({ length: 17 }, (_, i) => i + 1);

const crawlText = [
  "THE KOHLI ERA",
  "From the streets of Delhi to the world’s grandest stadiums.",
  "A generation didn’t just watch cricket — they witnessed belief.",
  "Aggression in the eyes. Discipline in the body. Fire in the soul.",
  "Chases became rituals. Pressure became fuel.",
  "Fitness became culture. Intent became identity.",
  "Records fell. Expectations rose. The standard changed forever.",
  "This is not just a career.",
  "This is legacy.",
  "LONG LIVE THE KING."
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 1. SCROLL PHYSICS
  // We lock the scroll for 350vh to give the user time to read and watch
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 2. TRANSFORMATIONS
  // Row 1 moves Left, Row 2 moves Right
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-60%", "0%"]);

  // The 3D Text moves from bottom to top, disappearing into the 'distance'
  const textY = useTransform(scrollYProgress, [0, 0.9], ['120%', '-200%']);
  const textOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  const topRowImages = galleryImages.slice(0, 9);
  const bottomRowImages = galleryImages.slice(9, 17).reverse();

  return (
    <>
      {/* ================= SECTION A: THE ARCHIVES ================= */}
      <section ref={containerRef} className="relative h-[350vh] bg-[#050505]">
        
        {/* STICKY VIEWPORT (The 'Screen' the user sees) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">

          {/* --- LAYER 1: STATIC TITLE (Subtle Overlay) --- */}
          <div className="absolute top-10 left-6 md:left-20 z-30 opacity-60 mix-blend-overlay pointer-events-none">
            <h2 className="font-heading text-4xl md:text-6xl text-white tracking-tighter">
              THE <span className="text-vk-gold">ARCHIVES</span>
            </h2>
            <div className="h-1 w-20 bg-vk-gold mt-2" />
          </div>

          {/* --- LAYER 2: THE 3D TEXT CRAWL (Foreground) --- */}
          <div 
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none perspective-[1200px]"
            // This mask fades the text out at the top and bottom edges
            style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)" }}
          >
            <motion.div
              style={{ y: textY, rotateX: "25deg", opacity: textOpacity }}
              className="max-w-4xl text-center px-4"
            >
              {crawlText.map((line, index) => (
                <p 
                  key={index}
                  className={cn(
                    // 3D Metallic Gold Gradient Text
                    "bg-gradient-to-b from-[#F9F295] via-[#E0AA3E] to-[#B88A44] bg-clip-text text-transparent",
                    "font-serif uppercase tracking-[0.2em] drop-shadow-2xl leading-relaxed",
                    index === 0 ? "text-6xl md:text-8xl font-bold mb-12" : "text-2xl md:text-4xl font-medium py-8",
                    index === crawlText.length - 1 && "text-5xl md:text-7xl font-bold mt-20 tracking-[0.3em]"
                  )}
                >
                  {line}
                </p>
              ))}
            </motion.div>
          </div>

          {/* --- LAYER 3: THE MOVING IMAGE BACKGROUND --- */}
          {/* We blur this slightly so the text is readable, but hover creates focus */}
          <div className="relative z-10 flex flex-col gap-10 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-700">
            
            {/* ROW 1 (Left) */}
            <motion.div style={{ x: x1 }} className="flex gap-6 w-max pl-10">
              {topRowImages.map((num) => (
                <GalleryItem key={num} num={num} />
              ))}
            </motion.div>

            {/* ROW 2 (Right) */}
            <motion.div style={{ x: x2 }} className="flex gap-6 w-max pr-10">
              {bottomRowImages.map((num) => (
                <GalleryItem key={num} num={num} />
              ))}
            </motion.div>

          </div>
          
          {/* Vignette Overlay for cinematic edges */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />

        </div>
      </section>

      {/* ================= SECTION B: THE GRAND FINALE ================= */}
      <FinaleSection />
    </>
  );
}

// --- SUB-COMPONENT: GALLERY IMAGE ITEM ---
function GalleryItem({ num }: { num: number }) {
  return (
    <div className="relative h-[35vh] w-[25vh] md:h-[50vh] md:w-[40vh] flex-shrink-0 rounded-lg overflow-hidden group border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:z-50 hover:border-vk-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
      <Image
        src={`/images/virat${num}.jpg`}
        alt={`Memory ${num}`}
        fill
        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 blur-[2px] group-hover:blur-0"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
      <span className="absolute bottom-4 right-4 text-4xl font-heading text-white/20 group-hover:text-vk-gold transition-colors">
        {num < 10 ? `0${num}` : num}
      </span>
    </div>
  );
}

// --- SUB-COMPONENT: FINALE SECTION ---
function FinaleSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden z-50 bg-[#050505]">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
           initial={{ scale: 1.1 }}
           whileInView={{ scale: 1 }}
           transition={{ duration: 10, ease: "linear" }}
           className="relative w-full h-full"
        >
          <Image
            src="/images/virat18.jpg"
            alt="The Perfect Cover Drive"
            fill
            className="object-cover opacity-80" 
            priority
          />
        </motion.div>
        {/* Heavy Gradient for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-24 text-center px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-heading text-8xl md:text-[12rem] leading-none text-white drop-shadow-2xl tracking-tighter"
        >
          PURE CLASS
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, width: "0%" }}
          whileInView={{ opacity: 1, width: "auto" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 flex items-center gap-6 overflow-hidden"
        >
          <div className="h-[1px] w-12 md:w-32 bg-vk-gold" />
          <span className="font-serif text-vk-gold tracking-[0.4em] uppercase text-sm md:text-xl whitespace-nowrap">
            The Signature Cover Drive
          </span>
          <div className="h-[1px] w-12 md:w-32 bg-vk-gold" />
        </motion.div>
      </div>
    </section>
  );
}