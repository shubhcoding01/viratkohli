// 'use client';

// import { motion } from 'framer-motion';
// import { cn } from '@/lib/utils';

// interface StatCardProps {
//   label: string;       // e.g., "ODI Centuries"
//   value: string;       // e.g., "50"
//   subtext?: string;    // e.g., "World Record"
//   delay?: number;      // Animation delay
//   className?: string;
// }

// export default function StatCard({ 
//   label, 
//   value, 
//   subtext, 
//   delay = 0,
//   className 
// }: StatCardProps) {
//   return (
//     <motion.div
//       // 1. Entrance Animation (Slide up + Fade in)
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay }}

//       // 2. Hover Animation (Glow + Lift)
//       whileHover={{ y: -5, boxShadow: "0px 10px 30px -10px rgba(212, 175, 55, 0.3)" }}
      
//       // 3. Glassmorphism Styling
//       className={cn(
//         "relative p-6 rounded-xl border border-white/10",
//         "bg-white/5 backdrop-blur-md", // The Frosted Glass Magic
//         "flex flex-col items-center justify-center text-center",
//         "group overflow-hidden", // Needed for the shine effect
//         className
//       )}
//     >
//       {/* 4. The "Shine" Effect (Passes across card on hover) */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />

//       {/* 5. The Value (Big Gold Number) */}
//       <h3 className="font-heading text-6xl text-vk-gold drop-shadow-lg leading-none">
//         {value}
//       </h3>

//       {/* 6. The Label (White Text) */}
//       <p className="font-heading text-xl text-gray-200 mt-2 tracking-wide uppercase">
//         {label}
//       </p>

//       {/* 7. Subtext (Optional small detail) */}
//       {subtext && (
//         <span className="mt-2 text-sm text-gray-400">
//           {subtext}
//         </span>
//       )}
//     </motion.div>
//   );
// }

'use client';

import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  index?: number; // Optional, for stagger delay
  className?: string;
}

export default function StatCard({ 
  label, 
  value, 
  subtext = "", 
  index = 0,
  className 
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  // --- 1. 3D PHYSICS TILT ENGINE ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs make the movement feel "heavy" and premium, not jittery
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  // Map mouse position (-0.5 to 0.5) to Rotation Degrees (-12deg to 12deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12.5deg", "-12.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12.5deg", "12.5deg"]);

  // Track mouse relative to the card's center
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate percentage from center (-0.5 to 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Snap back to center when mouse leaves
    x.set(0);
    y.set(0);
  };

  // --- 2. NUMBER COUNTING ANIMATION ---
  useEffect(() => {
    // SAFETY: Ensure we handle "13,800+" or "265M" correctly
    const safeValue = value || "0"; 
    // Strip non-numeric chars to get the target number
    const finalValue = parseInt(safeValue.toString().replace(/[^0-9]/g, '')) || 0;
    
    // Animate from 0 to finalValue over 2 seconds
    const controls = animate(0, finalValue, {
      duration: 2.5,
      ease: [0.22, 1, 0.36, 1], // Custom bezier for "pop" effect
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });

    return () => controls.stop();
  }, [value]);

  // Re-format the number (Add back commas, M, +, etc.)
  const formatDisplay = () => {
    const safeValue = value || "";
    let formatted = displayValue.toLocaleString(); // Adds commas: 13,800
    
    if (safeValue.includes('+')) formatted += '+';
    if (safeValue.includes('M')) formatted = displayValue + 'M';
    if (safeValue.includes('K')) formatted = displayValue + 'K';
    
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
      // 'preserve-3d' is CRITICAL for the depth effect
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "relative h-full min-h-62.5 p-px rounded-2xl group perspective-1000",
        // The outer gradient border
        "bg-linear-to-b from-white/20 via-white/5 to-transparent",
        className
      )}
    >
      {/* 3. THE GLASS CARD CONTAINER */}
      <div className="relative h-full w-full p-8 rounded-2xl bg-black/40 backdrop-blur-xl overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-vk-gold/30 group-hover:bg-black/60">
        
        {/* Shine/Glare Effect moving across */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-linear-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out z-0 pointer-events-none" />

        {/* 4. CONTENT LAYER (Floats above background) */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center" style={{ transform: "translateZ(30px)" }}>
          
          {/* Label */}
          <h3 className="font-heading text-vk-gold uppercase tracking-[0.2em] text-sm mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
            {label}
          </h3>
          
          {/* Big Number */}
          <div className="font-heading text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] tabular-nums">
            {formatDisplay()}
          </div>
          
          {/* Subtext with decorative lines */}
          <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
             <div className="h-px w-6 bg-vk-gold/50" />
             <p className="font-body text-gray-300 text-xs md:text-sm tracking-wider uppercase">
              {subtext}
            </p>
             <div className="h-px w-6 bg-vk-gold/50" />
          </div>

        </div>
      </div>
    </motion.div>
  );
}