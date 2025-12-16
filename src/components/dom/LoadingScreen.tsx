'use client';

import { useProgress } from '@react-three/drei';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function LoadingScreen() {
  // 1. Hook into the 3D Loader
  // 'progress' is a number from 0 to 100 representing loaded assets
  const { progress } = useProgress();
  
  // 2. Access our Global Store
  const { isLoaded, setIsLoaded } = useStore();

  // 3. Watch the progress
  useEffect(() => {
    // If progress is 100% and we haven't marked it loaded yet...
    if (progress === 100 && !isLoaded) {
      // Add a small delay so the user sees "100%" briefly before it vanishes
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }
  }, [progress, isLoaded, setIsLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="loader"
          // Exit Animation: Fade out and slide up
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-vk-black text-white"
        >
          {/* A. The "King's Brand" Logo */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-9xl text-vk-gold tracking-tighter drop-shadow-2xl"
          >
            18
          </motion.h1>

          {/* B. The Progress Bar Container */}
          <div className="w-64 h-1 mt-8 bg-vk-gray rounded-full overflow-hidden relative">
            {/* The Moving Gold Bar */}
            <motion.div 
              className="absolute top-0 left-0 h-full bg-vk-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }} // Instant response to loading updates
            />
          </div>

          {/* C. The Percentage Text */}
          <p className="mt-4 font-body text-sm text-gray-400 tracking-widest uppercase">
            Entering the Arena... {Math.round(progress)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}