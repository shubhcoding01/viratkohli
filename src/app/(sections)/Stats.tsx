'use client';

import { motion } from 'framer-motion';
import StatCard from '@/components/dom/StatCard';

const statsData = [
  { label: "Intl. Centuries", value: "80", subtext: "Second Highest Ever" },
  { label: "ODI Runs", value: "13,800+", subtext: "Fastest to 13k" },
  { label: "Test Double 100s", value: "7", subtext: "Most by Indian Captain" },
  { label: "Batting Average", value: "58.67", subtext: "ODI Format" },
  { label: "ICC Awards", value: "10", subtext: "Cricketer of the Decade" },
  { label: "Instagram", value: "265M", subtext: "Most Followed Asian" },
];

export default function Stats() {
  return (
    <section 
      id="section-1" 
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-20 py-20 relative z-10"
    >
      {/* 1. Section Title */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="font-heading text-vk-gold text-xl tracking-widest uppercase">
          Dominance
        </span>
        <h2 className="font-heading text-6xl md:text-8xl text-white mt-2 drop-shadow-2xl">
          THE <span className="text-transparent bg-clip-text bg-gradient-to-br from-vk-gold to-white">NUMBERS</span>
        </h2>
      </motion.div>

      {/* 2. The Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            subtext={stat.subtext}
            delay={index * 0.1} // Stagger effect (0s, 0.1s, 0.2s...)
          />
        ))}
      </div>

      {/* 3. Decorative Background Element (Subtle Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-vk-blue/5 blur-[120px] -z-10 rounded-full pointer-events-none" />
    </section>
  );
}