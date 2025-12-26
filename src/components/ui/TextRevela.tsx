'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(" ");

  return (
    <h2 ref={ref} className={cn("overflow-hidden leading-none", className)}>
      <span className="sr-only">{text}</span>
      <motion.span 
        initial="hidden" 
        animate={isInView ? "visible" : "hidden"} 
        transition={{ staggerChildren: 0.1, delayChildren: delay }}
        aria-hidden
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </h2>
  );
}