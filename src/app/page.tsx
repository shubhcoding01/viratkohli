// // import Image from "next/image";

// // export default function Home() {
// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
// //       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
// //         <Image
// //           className="dark:invert"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={100}
// //           height={20}
// //           priority
// //         />
// //         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
// //           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
// //             To get started, edit the page.tsx file.
// //           </h1>
// //           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
// //             Looking for a starting point or more instructions? Head over to{" "}
// //             <a
// //               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Templates
// //             </a>{" "}
// //             or the{" "}
// //             <a
// //               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Learning
// //             </a>{" "}
// //             center.
// //           </p>
// //         </div>
// //         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
// //           <a
// //             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={16}
// //               height={16}
// //             />
// //             Deploy Now
// //           </a>
// //           <a
// //             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Documentation
// //           </a>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// 'use client';

// import dynamic from 'next/dynamic';
// import LoadingScreen from '@/components/dom/LoadingScreen';
// import Navbar from '@/components/dom/Navbar';

// // 1. Lazy Load the 3D Scene
// // We use 'ssr: false' because 3D cannot be rendered on the server.
// // This prevents the "window is not defined" error.
// const Scene = dynamic(() => import('@/components/canvas/Scene'), { 
//   ssr: false 
// });

// // 2. Import Sections
// import Hero from '@/app/(sections)/Hero';
// import Stats from '@/app/(sections)/Stats';
// import Career from '@/app/(sections)/Career';

// export default function Home() {
//   return (
//     <main className="relative w-full min-h-screen bg-vk-black">
      
//       {/* LAYER 1: The UI Overlays (Fixed Top) */}
//       <LoadingScreen />
//       <Navbar />

//       {/* LAYER 2: The 3D Background (Fixed Back) */}
//       {/* We put this in a fixed container so it doesn't scroll away */}
//       <div className="fixed inset-0 z-0">
//         <Scene />
//       </div>

//       {/* LAYER 3: The Scrollable Content (Foreground) */}
//       {/* We add 'relative z-10' so this sits ON TOP of the 3D canvas */}
//       <div className="relative z-10 flex flex-col w-full">
//         <Hero />
//         <Stats />
//         <Career />
        
//         {/* Footer / Copyright */}
//         <footer className="w-full py-6 text-center text-white/20 font-heading tracking-widest text-sm">
//           DESIGNED FOR THE KING. BUILT WITH NEXT.JS
//         </footer>
//       </div>

//     </main>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import Navbar from '@/components/dom/Navbar';
// import Intro from '@/components/dom/Intro';
// import Gallery from '@/components/dom/Gallery';
// import Hero from '@/app/(sections)/Hero';
// import Stats from '@/app/(sections)/Stats';   // Keeping your existing Stats
// import Career from '@/app/(sections)/Career'; // Keeping your existing Career

// export default function Home() {
//   const [introFinished, setIntroFinished] = useState(false);

//   return (
//     <main className="relative w-full min-h-screen bg-vk-black text-white selection:bg-vk-gold selection:text-black">
      
//       {/* 1. The Intro Splash Screen (virat.jpg) */}
//       {/* It covers everything initially. */}
//       <Intro onComplete={() => setIntroFinished(true)} />

//       {/* 2. Main Website Content */}
//       {/* We can hide the scrollbar or navigation until intro is done if desired, 
//           but usually, just letting it sit under is fine. */}
      
//       <Navbar />

//       <div className="relative z-10 flex flex-col w-full">
//         <Hero />
        
//         {/* The 18-Image Moving Gallery */}
//         <Gallery />

//         {/* Your Info Sections */}
//         <Stats />
//         <Career />
        
//         <footer className="w-full py-10 text-center text-white/20 font-heading tracking-widest text-sm border-t border-white/5 mt-20">
//           DESIGNED FOR THE KING. BUILT WITH NEXT.JS
//         </footer>
//       </div>

//     </main>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '@/components/dom/Navbar';
import Intro from '@/components/dom/Intro';
import Gallery from '@/components/dom/Gallery';
import Hero from '@/app/(sections)/Hero';
import Stats from '@/app/(sections)/Stats';   
import Career from '@/app/(sections)/Career'; 

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  // --- SCROLL PROGRESS BAR LOGIC ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-white selection:bg-vk-gold selection:text-black">
      
      {/* 1. SCROLL PROGRESS BAR (Fixed at Top) */}
      {/* This shows the user how far they have scrolled */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-vk-gold via-white to-vk-gold origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* 2. THE INTRO SPLASH SCREEN */}
      <Intro onComplete={() => setIntroFinished(true)} />

      {/* 3. NAVBAR (Fades in ONLY after Intro is done) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-50"
      >
        <Navbar />
      </motion.div>

      {/* 4. MAIN CONTENT */}
      <div className="relative z-10 flex flex-col w-full">
        
        {/* Hero Section */}
        <Hero />
        
        {/* The 18-Image Moving Gallery */}
        <Gallery />

        {/* Info Sections */}
        <Stats label={''} value={''} subtext={''} index={0} />
        <Career />
        
        {/* 5. ADVANCED FOOTER */}
        <footer className="relative w-full py-20 bg-black overflow-hidden border-t border-white/10">
           {/* Background Glow */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-vk-gold/50 to-transparent blur-md" />
           
           <div className="flex flex-col items-center justify-center text-center px-4">
              
              {/* "18" Logo */}
              <h2 className="font-heading text-9xl text-white/5 font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
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
                <FooterLink href="#" text="Instagram" />
                <FooterLink href="#" text="Twitter" />
                <FooterLink href="#" text="Stats" />
              </div>

              <p className="mt-20 text-white/20 text-xs tracking-widest uppercase font-mono relative z-10">
                © {new Date().getFullYear()} VK18 Experience. Crafted for the King.
              </p>
           </div>
        </footer>
      </div>

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