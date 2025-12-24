// 'use client';

// import { motion } from 'framer-motion';
// import { cn } from '@/lib/utils';

// const milestones = [
//   {
//     year: "2008",
//     title: "The Arrival",
//     description: "Leads India to U19 World Cup glory. Makes ODI debut against Sri Lanka.",
//     color: "text-gray-400"
//   },
//   {
//     year: "2011",
//     title: "World Champion",
//     description: "Lifts the ICC World Cup. Carries Sachin Tendulkar on his shoulders.",
//     color: "text-vk-blue"
//   },
//   {
//     year: "2014",
//     title: "Test Captaincy",
//     description: "Takes over the reins in Australia. Scores 692 runs in the series.",
//     color: "text-white"
//   },
//   {
//     year: "2016",
//     title: "The 973 Season",
//     description: "Smashes 4 centuries in a single IPL season. Defines dominance in T20.",
//     color: "text-vk-red"
//   },
//   {
//     year: "2023",
//     title: "The 50th Century",
//     description: "Breaks Sachin's record. Becomes the first human to score 50 ODI hundreds.",
//     color: "text-vk-gold"
//   }
// ];

// export default function Career() {
//   return (
//     <section 
//       id="section-2" 
//       className="min-h-screen w-full flex flex-col items-start justify-center px-6 md:px-20 py-20 relative z-10"
//     >
//       {/* 1. Title */}
//       <motion.h2 
//         initial={{ opacity: 0, x: -50 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         className="font-heading text-6xl md:text-8xl text-white mb-16"
//       >
//         THE <span className="text-vk-gold">JOURNEY</span>
//       </motion.h2>

//       {/* 2. Timeline Container */}
//       <div className="relative w-full max-w-4xl border-l-2 border-white/10 ml-4 md:ml-10 space-y-12">
//         {milestones.map((item, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, margin: "-50px" }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             className="relative pl-8 md:pl-12"
//           >
//             {/* The Glowing Dot on the Line */}
//             <span className={cn(
//               "absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 border-vk-black",
//               index === milestones.length - 1 ? "bg-vk-gold shadow-[0_0_20px_#D4AF37]" : "bg-gray-600"
//             )} />

//             {/* The Year */}
//             <h3 className="font-heading text-4xl text-white/20 mb-1">
//               {item.year}
//             </h3>

//             {/* The Title */}
//             <h4 className={cn("font-heading text-3xl mb-2", item.color)}>
//               {item.title}
//             </h4>

//             {/* The Description */}
//             <p className="font-body text-gray-400 text-lg max-w-xl">
//               {item.description}
//             </p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Mapped to your existing images (virat1.jpg etc.) 
// You can swap these specifically later if you have exact year photos.
const milestones = [
  {
    id: 0,
    year: "2008",
    title: "The Arrival",
    description: "Leads India to U19 World Cup glory. A star is born in Kuala Lumpur. Makes ODI debut against Sri Lanka.",
    img: "/images/virat1.jpg" // Using your existing images
  },
  {
    id: 1,
    year: "2011",
    title: "World Champion",
    description: "Carries Sachin Tendulkar on his shoulders. 'He has carried the burden of the nation for 21 years.'",
    img: "/images/virat2.jpg"
  },
  {
    id: 2,
    year: "2014",
    title: "Test Captaincy",
    description: "Takes over the reins in Adelaide. Scores 692 runs in the Australian series. The aggressor era begins.",
    img: "/images/virat5.jpg"
  },
  {
    id: 3,
    year: "2016",
    title: "The 973 Season",
    description: "Smashes 4 centuries in a single IPL season. Redefines consistency in T20 cricket. Pure dominance.",
    img: "/images/virat8.jpg"
  },
  {
    id: 4,
    year: "2023",
    title: "The 50th Century",
    description: "Breaks the God's record. Becomes the first human to score 50 ODI hundreds at the World Cup semi-final.",
    img: "/images/virat18.jpg"
  }
];

export default function Career() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="section-2" className="relative min-h-screen w-full py-20 overflow-hidden bg-vk-black">
      
      {/* 1. DYNAMIC BACKGROUND LAYER */}
      {/* Changes based on which card you are hovering/viewing */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={milestones[activeTab].img}
              alt="Era Background"
              fill
              className="object-cover opacity-20 blur-sm" // Blurred so text is readable
            />
            {/* Gradient Overlay to fade smoothly into black */}
            <div className="absolute inset-0 bg-gradient-to-r from-vk-black via-vk-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-vk-black via-transparent to-vk-black" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 px-6 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* 2. LEFT SIDE: STICKY TITLE */}
        <div className="md:w-1/3">
          <div className="sticky top-40">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-6xl md:text-8xl text-white mb-4 drop-shadow-xl">
                THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-vk-gold to-[#B8860B]">
                  JOURNEY
                </span>
              </h2>
              <p className="font-body text-gray-400 text-lg leading-relaxed border-l-2 border-vk-gold pl-4">
                From a young boy in Delhi to the King of World Cricket. Select a milestone to revisit the moment.
              </p>
            </motion.div>
          </div>
        </div>

        {/* 3. RIGHT SIDE: INTERACTIVE TIMELINE */}
        <div className="md:w-2/3 relative">
          
          {/* The Glowing Vertical Beam */}
          <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-white/10">
            <motion.div 
              className="w-full bg-vk-gold shadow-[0_0_15px_#FFD700]"
              style={{ height: `${((activeTab + 1) / milestones.length) * 100}%` }} // Dynamic Height
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="space-y-8 pl-8 md:pl-12">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setActiveTab(index)} // TRIGGER BACKGROUND CHANGE
                className={cn(
                  "relative p-6 md:p-8 rounded-xl border transition-all duration-500 cursor-pointer group",
                  activeTab === index 
                    ? "bg-white/10 border-vk-gold/50 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-md" 
                    : "bg-white/5 border-white/5 hover:bg-white/10"
                )}
              >
                {/* The Connector Dot */}
                <span className={cn(
                  "absolute -left-[41px] md:-left-[57px] top-10 w-4 h-4 rounded-full border-2 transition-all duration-300",
                  activeTab === index 
                    ? "bg-vk-gold border-vk-gold shadow-[0_0_15px_#FFD700] scale-125" 
                    : "bg-vk-black border-gray-600"
                )} />

                <div className="flex flex-col gap-2">
                  <span className={cn(
                    "font-heading text-5xl md:text-6xl transition-colors duration-300",
                    activeTab === index ? "text-white" : "text-white/20"
                  )}>
                    {item.year}
                  </span>
                  
                  <h3 className={cn(
                    "font-serif text-2xl md:text-3xl uppercase tracking-wider transition-colors duration-300",
                    activeTab === index ? "text-vk-gold" : "text-gray-400"
                  )}>
                    {item.title}
                  </h3>
                  
                  <p className={cn(
                    "font-body text-base md:text-lg leading-relaxed transition-colors duration-300",
                    activeTab === index ? "text-gray-200" : "text-gray-500"
                  )}>
                    {item.description}
                  </p>
                </div>
                
                {/* Subtle Shine Effect on Active Card */}
                {activeTab === index && (
                  <motion.div
                    layoutId="shine"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}