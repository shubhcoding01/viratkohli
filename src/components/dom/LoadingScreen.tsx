'use client';

import { useProgress } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Image from 'next/image';

// --- CONFIGURATION ---
const DURATION = 3500; // ⚡ 3.5 Seconds (Change this to make it faster/slower)

const SYSTEM_LOGS = [
  "INITIALIZING_LEGACY...",
  "LOADING_18_ERA...",
  "SYNCING_STATISTICS...",
  "FETCHING_TROPHIES...",
  "PREPARING_THE_KING..."
];

const FLASH_IMAGES = [
  "/images/virat2008.png",
  "/images/virat2011.png",
  "/images/viratcaptain.png",
  "/images/virat2016.png",
  "/images/virat50th.png",
  "/images/viratt20.png",
  "/images/viratbg1.png"
];

export default function LoadingScreen() {
  const { active } = useProgress();
  const { isLoaded, setProgress: setStoreProgress } = useStore();
  
  const [displayProgress, setDisplayProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. VIDEO SPEED
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  // 2. IMAGE FLICKER
  useEffect(() => {
    const interval = setInterval(() => {
       setImgIndex((prev) => (prev + 1) % FLASH_IMAGES.length);
    }, 80); 
    return () => clearInterval(interval);
  }, []);

  // 3. ⚡ SMOOTH TIME-BASED LOADING LOGIC
  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      
      // Calculate percentage based on time elapsed (0 to 100)
      const rawProgress = Math.min((elapsedTime / DURATION) * 100, 100);
      
      setDisplayProgress((prev) => {
        // If assets are strictly still loading and we are at 99%, hold it.
        // (Remove '&& active' if you want to force finish regardless of 3D)
        if (rawProgress >= 99 && active) {
            return 99;
        }
        return rawProgress;
      });

      if (rawProgress < 100 || active) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [active]);

  // 4. SYNC TO STORE
  useEffect(() => {
    // Round for store to keep integer logic clean elsewhere
    setStoreProgress(Math.round(displayProgress));
    
    // Finish Trigger
    if (displayProgress >= 100 && !active && !isLoaded) {
       setTimeout(() => setStoreProgress(100), 200);
    }
  }, [displayProgress, active, setStoreProgress, isLoaded]);

  // 5. LOG ROTATOR
  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex(prev => (prev + 1) % SYSTEM_LOGS.length);
    }, DURATION / SYSTEM_LOGS.length); // Sync logs to finish with loader
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    exit: { transition: { staggerChildren: 0.1 } }
  };

  const columnVariants = {
    initial: { y: 0 },
    exit: { 
      y: "-100%", 
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isLoaded && (
        <motion.div
          key="loader-container"
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col md:flex-row pointer-events-none bg-black" 
        >
          
          {/* A. BACKGROUND LAYERS */}
          <div className="absolute inset-0 z-0">
             {/* Base Video */}
             <video 
               ref={videoRef}
               src="/images/sign.mp4" 
               autoPlay 
               muted 
               loop 
               playsInline
               className="w-full h-full object-cover opacity-60 grayscale" 
             />
             
             {/* Flashing Images */}
             <div className="absolute inset-0 z-10 mix-blend-overlay opacity-40">
                {FLASH_IMAGES.map((src, i) => (
                    <div 
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-0 ${i === imgIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image 
                            src={src}
                            alt="Loading Sequence"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                ))}
             </div>

             {/* Dark Overlay */}
             <div className="absolute inset-0 bg-black/70 z-20" />
          </div>

          {/* B. CURTAINS */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              variants={columnVariants}
              className="relative h-full w-full border-r border-white/5 last:border-r-0 overflow-hidden z-10"
            >
               <div className="absolute inset-0 opacity-10 bg-[url('/images/noise.png')]" />
            </motion.div>
          ))}

          {/* C. CONTENT */}
          <motion.div 
            className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 z-20"
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.5 } }}
          >
            
            {/* TOP BAR */}
            <div className="flex justify-between items-start font-mono text-[10px] md:text-xs text-white/60 tracking-widest uppercase">
              <div className="flex flex-col gap-1">
                 <span className="text-vk-gold animate-pulse">SYSTEM_ONLINE</span>
                 <span>LATENCY: 12ms</span>
              </div>
              <div>SECURE_ENCLAVE</div>
            </div>

            {/* CENTER NUMBER */}
            <div className="flex-1 flex flex-col items-center justify-center relative">
               
               {/* Spinning Ring */}
               <div className="absolute w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] border border-white/20 rounded-full animate-slow-spin" />

               {/* THE NUMBER */}
               <div className="relative font-heading text-[20vw] md:text-[15vw] leading-none tracking-tighter select-none">
                 
                 {/* LAYER 1: Base Color */}
                 <span className="block text-white/10">
                   {Math.floor(displayProgress)}
                 </span>

                 {/* LAYER 2: Liquid Gold Fill */}
                 <motion.span 
                   className="absolute inset-0 top-0 left-0 text-vk-gold overflow-hidden"
                   initial={{ height: "0%" }}
                   style={{ height: `${displayProgress}%` }}
                 >
                   {Math.floor(displayProgress)}
                 </motion.span>
               </div>

               <div className="mt-8 font-mono text-xs md:text-sm tracking-[0.8em] text-vk-gold/80 animate-pulse">
                  LOADING_DATA
               </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="font-mono text-[10px] md:text-xs text-white/50 flex justify-between items-end border-t border-white/10 pt-4">
              <div className="h-6 w-64 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={logIndex}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                  >
                    {`> ${SYSTEM_LOGS[logIndex]}`}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div>ID: VK-18 // VER.24</div>
            </div>

          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}