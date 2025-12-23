'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

// Create an array of 18 items [1, 2, ... 18]
const images = Array.from({ length: 18 }, (_, i) => i + 1);

export default function Gallery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Parallax: Row 1 moves Left, Row 2 moves Right
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-1000, 0]);

  return (
    <section ref={containerRef} className="py-20 bg-vk-black overflow-hidden relative z-10">
      
      <div className="mb-10 px-6 md:px-20">
        <h2 className="font-heading text-4xl md:text-6xl text-white">
          THE <span className="text-vk-gold">ARCHIVES</span>
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {/* ROW 1: Images 1-9 */}
        <motion.div style={{ x: x1 }} className="flex gap-4 w-max">
          {images.slice(0, 9).map((num) => (
            <div key={num} className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500 rounded-lg overflow-hidden">
              <Image
                src={`/images/virat${num}.jpg`}
                alt={`Memory ${num}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </motion.div>

        {/* ROW 2: Images 10-18 */}
        <motion.div style={{ x: x2 }} className="flex gap-4 w-max">
          {images.slice(9, 18).map((num) => (
            <div key={num} className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500 rounded-lg overflow-hidden">
              <Image
                src={`/images/virat${num}.jpg`}
                alt={`Memory ${num}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}