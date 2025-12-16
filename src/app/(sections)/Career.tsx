'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const milestones = [
  {
    year: "2008",
    title: "The Arrival",
    description: "Leads India to U19 World Cup glory. Makes ODI debut against Sri Lanka.",
    color: "text-gray-400"
  },
  {
    year: "2011",
    title: "World Champion",
    description: "Lifts the ICC World Cup. Carries Sachin Tendulkar on his shoulders.",
    color: "text-vk-blue"
  },
  {
    year: "2014",
    title: "Test Captaincy",
    description: "Takes over the reins in Australia. Scores 692 runs in the series.",
    color: "text-white"
  },
  {
    year: "2016",
    title: "The 973 Season",
    description: "Smashes 4 centuries in a single IPL season. Defines dominance in T20.",
    color: "text-vk-red"
  },
  {
    year: "2023",
    title: "The 50th Century",
    description: "Breaks Sachin's record. Becomes the first human to score 50 ODI hundreds.",
    color: "text-vk-gold"
  }
];

export default function Career() {
  return (
    <section 
      id="section-2" 
      className="min-h-screen w-full flex flex-col items-start justify-center px-6 md:px-20 py-20 relative z-10"
    >
      {/* 1. Title */}
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="font-heading text-6xl md:text-8xl text-white mb-16"
      >
        THE <span className="text-vk-gold">JOURNEY</span>
      </motion.h2>

      {/* 2. Timeline Container */}
      <div className="relative w-full max-w-4xl border-l-2 border-white/10 ml-4 md:ml-10 space-y-12">
        {milestones.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* The Glowing Dot on the Line */}
            <span className={cn(
              "absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 border-vk-black",
              index === milestones.length - 1 ? "bg-vk-gold shadow-[0_0_20px_#D4AF37]" : "bg-gray-600"
            )} />

            {/* The Year */}
            <h3 className="font-heading text-4xl text-white/20 mb-1">
              {item.year}
            </h3>

            {/* The Title */}
            <h4 className={cn("font-heading text-3xl mb-2", item.color)}>
              {item.title}
            </h4>

            {/* The Description */}
            <p className="font-body text-gray-400 text-lg max-w-xl">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}