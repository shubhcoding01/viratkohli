// 'use client';

// // import { ReactLenis } from '@studio-freight/react-lenis';
// import { ReactLenis } from 'lenis/react';
// export default function SmoothScroll({ children }: { children: React.ReactNode }) {
//   // settings: duration 1.5 makes it feel heavy and premium
//   return (
//     <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
//       {children}
//     </ReactLenis>
//   );
// }

'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // 1. SYNC LENIS WITH GSAP TICKER
    // This creates a unified clock for both scroll and animations, eliminating jitter.
    function update(time: number) {
      // time * 1000 converts seconds to milliseconds
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    // 2. DISABLE LAG SMOOTHING
    // This forces GSAP to update instantly, which is smoother when Lenis controls the scroll.
    gsap.ticker.lagSmoothing(0);
    
    // 3. ADD TO TICKER
    // Instead of Lenis running its own loop, GSAP drives the bus.
    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis 
      ref={lenisRef} 
      root 
      autoRaf={false} // CRITICAL: We are manually driving the raf via GSAP above
      options={{
        duration: 1.5, // The "Heavy" feel you like
        // Advanced "Exponential" easing for that premium stop
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        smoothWheel: true,
        touchMultiplier: 2, // Makes mobile scrolling feel snappy, not sluggish
        orientation: 'vertical',
        // gestureDirection: 'vertical',
      }}
    >
      {children}
    </ReactLenis>
  );
}