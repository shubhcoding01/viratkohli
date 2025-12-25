// 'use client';

// import { motion } from 'framer-motion';
// import { useStore } from '@/store/useStore';
// import { cn } from '@/lib/utils';
// import { useEffect, useState } from 'react';

// export default function Navbar() {
//   const { currentSection, setCurrentSection } = useStore();
//   const [scrolled, setScrolled] = useState(false);

//   // 1. Detect Scroll to change background opacity
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { name: 'ARENA', index: 0 },
//     { name: 'STATS', index: 1 },
//     { name: 'CAREER', index: 2 },
//   ];

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.8, ease: 'easeOut' }}
//       className={cn(
//         "fixed top-0 left-0 w-full z-40 px-6 py-4 flex items-center justify-between transition-all duration-300",
//         scrolled ? "bg-vk-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
//       )}
//     >
//       {/* 2. The Logo (Left) */}
//       <div className="flex items-center gap-2">
//         <h1 className="font-heading text-3xl text-white tracking-widest">
//           VK <span className="text-vk-gold">18</span>
//         </h1>
//       </div>

//       {/* 3. The Links (Right) */}
//       <ul className="flex items-center gap-8">
//         {navItems.map((item) => (
//           <li key={item.name}>
//             <button
//               onClick={() => {
//                 setCurrentSection(item.index);
//                 // Smooth scroll to section (we will implement the IDs in the sections next)
//                 const element = document.getElementById(`section-${item.index}`);
//                 element?.scrollIntoView({ behavior: 'smooth' });
//               }}
//               className={cn(
//                 "font-heading text-lg tracking-wider transition-colors duration-200 relative group",
//                 currentSection === item.index ? "text-vk-gold" : "text-gray-400 hover:text-white"
//               )}
//             >
//               {item.name}
              
//               {/* Active Underline Indicator */}
//               {currentSection === item.index && (
//                 <motion.div 
//                   layoutId="underline"
//                   className="absolute -bottom-1 left-0 w-full h-[2px] bg-vk-gold"
//                 />
//               )}
              
//               {/* Hover Underline (Invisible until hover) */}
//               <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
//             </button>
//           </li>
//         ))}
//       </ul>
//     </motion.nav>
//   );
// }

// 'use client';

// import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
// import { useState } from 'react';
// import Link from 'next/link';
// import { cn } from '@/lib/utils';

// const navLinks = [
//   { name: 'Home', href: '#' },
//   { name: 'Stats', href: '#section-1' },
//   { name: 'Journey', href: '#section-2' },
//   { name: 'Archives', href: '#section-3' },
// ];

// export default function Navbar() {
//   const { scrollY } = useScroll();
//   const [hidden, setHidden] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // Auto-hide navbar on scroll down, show on scroll up
//   useMotionValueEvent(scrollY, "change", (latest) => {
//     const previous = scrollY.getPrevious() ?? 0;
//     if (latest > previous && latest > 150) {
//       setHidden(true);
//     } else {
//       setHidden(false);
//     }
//     setScrolled(latest > 50);
//   });

//   return (
//     <motion.nav
//       variants={{
//         visible: { y: 0 },
//         hidden: { y: "-100%" },
//       }}
//       animate={hidden ? "hidden" : "visible"}
//       transition={{ duration: 0.35, ease: "easeInOut" }}
//       className={cn(
//         "fixed top-0 inset-x-0 z-[100] w-full px-6 md:px-10 py-4 transition-all duration-500",
//         scrolled ? "bg-black/50 backdrop-blur-md border-b border-white/5" : "bg-transparent"
//       )}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
        
//         {/* LOGO */}
//         <Link href="/" className="group flex items-center gap-2">
//           <span className="font-heading text-3xl text-white group-hover:text-vk-gold transition-colors">
//             VK<span className="text-vk-gold">18</span>
//           </span>
//         </Link>

//         {/* DESKTOP LINKS */}
//         <div className="hidden md:flex items-center gap-8">
//           {navLinks.map((link, i) => (
//             <Link 
//               key={i} 
//               href={link.href}
//               className="relative font-serif text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors group"
//             >
//               {link.name}
//               <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-vk-gold transition-all duration-300 group-hover:w-full" />
//             </Link>
//           ))}
          
//           <button className="px-6 py-2 bg-white/10 hover:bg-vk-gold hover:text-black border border-white/20 rounded-full text-xs uppercase tracking-widest transition-all duration-300">
//             Fan Club
//           </button>
//         </div>

//         {/* MOBILE MENU BUTTON (Simple Placeholder) */}
//         <button className="md:hidden text-white">
//            <div className="space-y-2">
//              <span className="block w-8 h-[1px] bg-white" />
//              <span className="block w-6 h-[1px] bg-white ml-auto" />
//            </div>
//         </button>

//       </div>
//     </motion.nav>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import useScroll from '@/hooks/useScroll'; // Importing your advanced hook
import { Menu, X } from 'lucide-react'; // Premium icons

// Define links with specific IDs to scroll to
const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Stats', href: '#section-stats' },
  { name: 'Journey', href: '#section-career' },
  { name: 'Archives', href: '#section-gallery' },
];

export default function Navbar() {
  // 1. Get Scroll Data from our Custom Hook
  const { direction, passedThreshold, scrollTo } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Logic: Hide navbar if scrolling down AND we are not at the very top
  // Show navbar if scrolling up OR at the very top
  const isHidden = direction === 'down' && passedThreshold;

  // 2. Smooth Scroll Handler
  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault(); // Stop default jump
    setIsMobileMenuOpen(false);

    if (href === '#hero') {
      scrollTo(0); // Scroll to top
    } else {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        scrollTo(element); // Lenis smooth scroll
      }
    }
  };

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Custom Bezier
        className={cn(
          "fixed top-0 inset-x-0 z-[100] w-full px-6 md:px-12 py-4 transition-all duration-500",
          // Glass effect activates only when scrolled or menu is open
          passedThreshold || isMobileMenuOpen 
            ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" onClick={(e) => handleLinkClick(e, '#hero')} className="group flex items-center gap-2 z-50">
            <span className="font-heading text-3xl text-white group-hover:text-vk-gold transition-colors tracking-wider">
              VK<span className="text-vk-gold group-hover:text-white transition-colors">18</span>
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <a 
                key={i} 
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative font-serif text-xs font-bold uppercase tracking-[0.2em] text-white/60 hover:text-vk-gold transition-colors group py-2"
              >
                {link.name}
                {/* Animated Gold Underline */}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-vk-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            <button className="px-6 py-2 bg-white/5 hover:bg-vk-gold hover:text-black border border-white/10 hover:border-vk-gold rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300">
              Fan Club
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="md:hidden text-white z-50 p-2 hover:text-vk-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
             {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </motion.nav>

      {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-[#050505] flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('/images/noise.png')] pointer-events-none" />

            <nav className="flex flex-col items-center gap-6 relative z-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
                  className="font-heading text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 hover:to-vk-gold transition-all cursor-pointer"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               transition={{ delay: 0.6 }}
               className="absolute bottom-10"
             >
               <p className="text-vk-gold/50 text-xs tracking-[0.3em] uppercase">
                  The King's Arena
               </p>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}