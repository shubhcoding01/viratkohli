'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

// --- COMPONENTS ---
import Navbar from '@/components/dom/Navbar';
import LoadingScreen from '@/components/dom/LoadingScreen';
import Intro from '@/components/dom/Intro';

// --- SECTIONS ---
 import Hero from '@/app/(sections)/Hero';
 import Stats from '@/app/(sections)/Stats';   // Keeping your existing Stats
 import Career from '@/app/(sections)/Career';
import Gallery from '@/components/dom/Gallery';
import Brands from '@/components/dom/Brands';
import ScrollSkew from '@/components/ui/ScrollSkew';
import Legacy from '@/components/dom/Legacy';

// --- 3D SCENE (Lazy Loaded) ---
// We disable SSR because 3D canvas requires the window object
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false });

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const { isLoaded } = useStore(); // From our global store (controlled by LoadingScreen)

  // --- SCROLL PROGRESS BAR LOGIC ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-white selection:bg-vk-gold selection:text-black">
      
      {/* 1. LOADING MANAGER (Highest Priority) */}
      <LoadingScreen />

      {/* 2. INTRO CURTAIN (Shows after loading, hides on click) */}
      <AnimatePresence>
        {isLoaded && !introFinished && (
          <Intro onComplete={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      {/* 3. THE 3D WORLD (Fixed Background) */}
      {/* It sits behind everything but remains interactive */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene />
      </div>

      {/* 4. UI OVERLAYS (Navbar & ScrollBar) */}
      {/* Only visible after the Intro is finished */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={introFinished ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none" // pointer-events-none lets clicks pass through to 3D
      >
        {/* Scroll Progress */}
        <motion.div
          className="h-1 bg-gradient-to-r from-vk-gold via-white to-vk-gold origin-left"
          style={{ scaleX }}
        />
        {/* Navbar (Pointer events re-enabled inside component) */}
        <div className="pointer-events-auto">
          <Navbar />
        </div>
      </motion.div>

      {/* 5. MAIN SCROLLABLE CONTENT */}
      {/* We use 'pointer-events-none' on the container to let clicks pass through to the 3D background...
          ...but we re-enable 'pointer-events-auto' on the actual text/cards so they can be clicked. */}
      <motion.div 
        className="relative z-10 flex flex-col w-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={introFinished ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        
        {/* HERO SECTION */}
        <div className="pointer-events-auto">
          <Hero />
        </div>

        {/* STATS GRID (The Spotlight Section) */}
        <div className="pointer-events-auto">
           <Stats />
        </div>

        {/* CAREER TIMELINE (Scroll-Syncs 3D Models) */}
        <div className="pointer-events-auto">
           <Career />
        </div>
        
        {/* GALLERY ARCHIVES (Horizontal Scroll) */}
        <div className="pointer-events-auto">
           <Gallery />
        </div>

        {/* BRANDS MARQUEE (Infinite Scroll) */}
        <ScrollSkew>
  {/* ... other sections ... */}
  <div className="pointer-events-auto"><Legacy /></div>
  
  {/* 2. Add Brands Here */}
  <div className="pointer-events-auto">
     <Brands />
  </div>
</ScrollSkew>
        
        {/* 6. ADVANCED FOOTER */}
        <footer className="relative w-full py-20 bg-black overflow-hidden border-t border-white/10 pointer-events-auto">
           {/* Background Glow */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-vk-gold/50 to-transparent blur-md" />
           
           <div className="flex flex-col items-center justify-center text-center px-4">
             
             {/* "18" Logo */}
             
             {/* <h2 className="font-heading text-9xl text-white/5 font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
               18
             </h2> */}

             <h2 
  className="font-heading text-[12rem] md:text-[20rem] font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
  style={{
    // 1. 3D Gradient Fill (Metallic Dark Grey)
    background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',

    // 2. Gold Outline (The "Stroke")
    WebkitTextStroke: '2px rgba(212, 175, 55, 0.2)',

    // 3. Deep Shadow (The 3D Depth)
    filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.8))'
  }}
>
  18
</h2>

             <p className="font-serif text-vk-gold tracking-[0.3em] uppercase text-sm mb-6 relative z-10">
               The Legacy Continues
             </p>

             {/* Signature Effect Text */}
             <h3 className="font-heading text-4xl md:text-6xl text-white mb-10 relative z-10">
               VIRAT <span className="text-gray-500">KOHLI</span>
             </h3>

             <div className="flex items-center gap-8 relative z-10">
               <FooterLink href="https://www.instagram.com/virat.kohli/" text="Instagram" />
               <FooterLink href="https://x.com/imVkohli" text="Twitter" />
               <FooterLink href="#" text="Stats" />
             </div>

             <p className="mt-20 text-white/20 text-xs tracking-widest uppercase font-mono relative z-10">
               © {new Date().getFullYear()} VK18 Experience. Crafted for the King.
             </p>
           </div>
        </footer>

      </motion.div>

    </main>
  );
}

// Helper for Footer Links
function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <a 
      href={href} 
      className="text-gray-400 hover:text-vk-gold transition-colors duration-300 uppercase tracking-widest text-xs font-bold"
    >
      {text}
    </a>
  );
}