// 'use client';

// import { motion } from 'framer-motion';
// import StatCard from '@/components/dom/StatCard';

// const statsData = [
//   { label: "Intl. Centuries", value: "80", subtext: "Second Highest Ever" },
//   { label: "ODI Runs", value: "13,800+", subtext: "Fastest to 13k" },
//   { label: "Test Double 100s", value: "7", subtext: "Most by Indian Captain" },
//   { label: "Batting Average", value: "58.67", subtext: "ODI Format" },
//   { label: "ICC Awards", value: "10", subtext: "Cricketer of the Decade" },
//   { label: "Instagram", value: "265M", subtext: "Most Followed Asian" },
// ];

// export default function Stats() {
//   return (
//     <section 
//       id="section-1" 
//       className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-20 py-20 relative z-10"
//     >
//       {/* 1. Section Title */}
//       <motion.div 
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-100px" }}
//         transition={{ duration: 0.8 }}
//         className="text-center mb-16"
//       >
//         <span className="font-heading text-vk-gold text-xl tracking-widest uppercase">
//           Dominance
//         </span>
//         <h2 className="font-heading text-6xl md:text-8xl text-white mt-2 drop-shadow-2xl">
//           THE <span className="text-transparent bg-clip-text bg-gradient-to-br from-vk-gold to-white">NUMBERS</span>
//         </h2>
//       </motion.div>

//       {/* 2. The Grid of Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
//         {statsData.map((stat, index) => (
//           <StatCard
//             key={index}
//             label={stat.label}
//             value={stat.value}
//             subtext={stat.subtext}
//             delay={index * 0.1} // Stagger effect (0s, 0.1s, 0.2s...)
//           />
//         ))}
//       </div>

//       {/* 3. Decorative Background Element (Subtle Glow) */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-vk-blue/5 blur-[120px] -z-10 rounded-full pointer-events-none" />
//     </section>
//   );
// }

'use client';

import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  index: number;
}

export default function StatCard({ label, value, subtext, index }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  // --- 1. 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12.5deg", "-12.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12.5deg", "12.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // --- 2. NUMBER COUNTING ANIMATION ---
  useEffect(() => {
    // SAFETY FIX: Ensure value is a string before replacing
    const safeValue = value || "0"; 
    const finalValue = parseInt(safeValue.toString().replace(/[^0-9]/g, '')) || 0;
    
    const controls = animate(0, finalValue, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });

    return () => controls.stop();
  }, [value]);

  const formatDisplay = () => {
    // SAFETY FIX: Handle undefined value to prevent crash
    const safeValue = value || "";
    
    const hasPlus = safeValue.includes('+');
    let formatted = displayValue.toLocaleString();
    
    if (hasPlus) formatted += '+';
    if (safeValue.includes('M')) formatted = displayValue + 'M';
    
    return formatted;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "backOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "relative h-full p-[1px] rounded-2xl group perspective-1000",
        "bg-gradient-to-b from-white/20 via-white/5 to-transparent"
      )}
    >
      <div className="relative h-full p-8 rounded-2xl bg-black/40 backdrop-blur-xl overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-vk-gold/30 group-hover:bg-black/50">
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center" style={{ transform: "translateZ(20px)" }}>
          <h3 className="font-heading text-vk-gold uppercase tracking-widest text-sm mb-4 opacity-80">
            {label}
          </h3>
          
          <div className="font-heading text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] tabular-nums">
            {formatDisplay()}
          </div>
          
          <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
             <div className="h-[1px] w-6 bg-vk-gold/50" />
             <p className="font-body text-gray-300 text-sm tracking-wider uppercase">
              {subtext}
            </p>
             <div className="h-[1px] w-6 bg-vk-gold/50" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}