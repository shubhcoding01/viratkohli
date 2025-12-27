'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore'; // 1. Connect to Global Store

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  
  // 2. Access the loading state
  const { isLoaded } = useStore();

  useEffect(() => {
    // 3. SYNC LENIS WITH GSAP TICKER (The "Pro" Setup)
    // We add priority: true to ensure Scroll updates BEFORE 3D animations render.
    // This fixes "jittery" 3D models during scroll.
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(update, false, true); // true = High Priority

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  // 4. SMART LOCKING LOGIC
  // This automatically Freezes/Unfreezes scroll based on your site's state.
  useEffect(() => {
    if (lenisRef.current?.lenis) {
      if (!isLoaded) {
        // Freeze scroll during Loading/Intro
        lenisRef.current.lenis.stop();
        document.body.style.overflow = 'hidden'; // CSS Backup
      } else {
        // Resume scroll when ready
        lenisRef.current.lenis.start();
        document.body.style.overflow = ''; // Clear CSS override
      }
    }
  }, [isLoaded]);

  return (
    <ReactLenis 
      ref={lenisRef} 
      root 
      autoRaf={false} // Manually driving via GSAP
      options={{
        duration: 1.5,
        // "Quart" easing for a heavy, premium feel
        easing: (t) => 1 - Math.pow(1 - t, 4), 
        smoothWheel: true,
        touchMultiplier: 2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        syncTouch: true, // Fixes keyboard scrolling issues
        bgTouch: true,   // Allows touch events to pass through background
      }}
    >
      {children}
    </ReactLenis>
  );
}
