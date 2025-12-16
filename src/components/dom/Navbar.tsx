'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { currentSection, setCurrentSection } = useStore();
  const [scrolled, setScrolled] = useState(false);

  // 1. Detect Scroll to change background opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'ARENA', index: 0 },
    { name: 'STATS', index: 1 },
    { name: 'CAREER', index: 2 },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn(
        "fixed top-0 left-0 w-full z-40 px-6 py-4 flex items-center justify-between transition-all duration-300",
        scrolled ? "bg-vk-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      )}
    >
      {/* 2. The Logo (Left) */}
      <div className="flex items-center gap-2">
        <h1 className="font-heading text-3xl text-white tracking-widest">
          VK <span className="text-vk-gold">18</span>
        </h1>
      </div>

      {/* 3. The Links (Right) */}
      <ul className="flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => {
                setCurrentSection(item.index);
                // Smooth scroll to section (we will implement the IDs in the sections next)
                const element = document.getElementById(`section-${item.index}`);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={cn(
                "font-heading text-lg tracking-wider transition-colors duration-200 relative group",
                currentSection === item.index ? "text-vk-gold" : "text-gray-400 hover:text-white"
              )}
            >
              {item.name}
              
              {/* Active Underline Indicator */}
              {currentSection === item.index && (
                <motion.div 
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-vk-gold"
                />
              )}
              
              {/* Hover Underline (Invisible until hover) */}
              <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}