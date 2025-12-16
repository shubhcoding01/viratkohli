'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Button from '@/components/ui/button';

export default function Hero() {
  const { setMode } = useStore();

  return (
    <section 
      id="section-0" 
      className="relative h-screen w-full flex items-center justify-start px-6 md:px-20 overflow-hidden pointer-events-none"
    >
      {/* pointer-events-none on the container allows you to click 
        and drag the 3D model BEHIND the text. 
      */}

      <div className="flex flex-col items-start z-10 max-w-4xl">
        
        {/* 1. The "GOAT" Label */}
        <motion.span 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-vk-gold text-xl md:text-2xl tracking-[0.5em] mb-4"
        >
          THE G.O.A.T
        </motion.span>

        {/* 2. The Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="font-heading text-8xl md:text-[12rem] leading-none text-white mix-blend-overlay"
        >
          VIRAT
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-vk-gold to-yellow-600 drop-shadow-2xl">
            KOHLI
          </span>
        </motion.h1>

        {/* 3. Subtext */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-body text-gray-400 text-lg mt-8 max-w-lg leading-relaxed"
        >
          Explore the journey of the King. From the streets of Delhi to the throne of World Cricket. 
          Experience the aggression, the class, and the records in 3D.
        </motion.p>

        {/* 4. Interactive Buttons (The Magic Triggers) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap gap-6 mt-12 pointer-events-auto"
        >
          {/* Button A: Triggers RED Mode */}