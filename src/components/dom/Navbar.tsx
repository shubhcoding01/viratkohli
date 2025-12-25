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

'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Stats', href: '#section-1' },
  { name: 'Journey', href: '#section-2' },
  { name: 'Archives', href: '#section-3' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Auto-hide navbar on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-[100] w-full px-6 md:px-10 py-4 transition-all duration-500",
        scrolled ? "bg-black/50 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-heading text-3xl text-white group-hover:text-vk-gold transition-colors">
            VK<span className="text-vk-gold">18</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link 
              key={i} 
              href={link.href}
              className="relative font-serif text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-vk-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          
          <button className="px-6 py-2 bg-white/10 hover:bg-vk-gold hover:text-black border border-white/20 rounded-full text-xs uppercase tracking-widest transition-all duration-300">
            Fan Club
          </button>
        </div>

        {/* MOBILE MENU BUTTON (Simple Placeholder) */}
        <button className="md:hidden text-white">
           <div className="space-y-2">
             <span className="block w-8 h-[1px] bg-white" />
             <span className="block w-6 h-[1px] bg-white ml-auto" />
           </div>
        </button>

      </div>
    </motion.nav>
  );
}