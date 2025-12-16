'use client';

// import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactLenis } from 'lenis/react';
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // settings: duration 1.5 makes it feel heavy and premium
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}