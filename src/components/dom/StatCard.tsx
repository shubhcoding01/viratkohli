'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;       // e.g., "ODI Centuries"
  value: string;       // e.g., "50"
  subtext?: string;    // e.g., "World Record"
  delay?: number;      // Animation delay
  className?: string;
}

export default function StatCard({ 
  label, 
  value, 
  subtext, 
  delay = 0,
  className 
}: StatCardProps) {
  return (
    <motion.div
      // 1. Entrance Animation (Slide up + Fade in)
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}

      // 2. Hover Animation (Glow + Lift)
      whileHover={{ y: -5, boxShadow: "0px 10px 30px -10px rgba(212, 175, 55, 0.3)" }}
      
      // 3. Glassmorphism Styling
      className={cn(
        "relative p-6 rounded-xl border border-white/10",
        "bg-white/5 backdrop-blur-md", // The Frosted Glass Magic
        "flex flex-col items-center justify-center text-center",
        "group overflow-hidden", // Needed for the shine effect
        className
      )}
    >
      {/* 4. The "Shine" Effect (Passes across card on hover) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />

      {/* 5. The Value (Big Gold Number) */}
      <h3 className="font-heading text-6xl text-vk-gold drop-shadow-lg leading-none">
        {value}
      </h3>

      {/* 6. The Label (White Text) */}
      <p className="font-heading text-xl text-gray-200 mt-2 tracking-wide uppercase">
        {label}
      </p>

      {/* 7. Subtext (Optional small detail) */}
      {subtext && (
        <span className="mt-2 text-sm text-gray-400">
          {subtext}
        </span>
      )}
    </motion.div>
  );
}