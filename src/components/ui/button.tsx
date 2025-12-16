'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import { Suspense } from 'react';
import { useStore } from '@/store/useStore';
import ViratModel from '../canvas/ViratModel';
import StadiumModel from '../canvas/StadiumModel';
import PostProcessing from '../canvas/PostProcessing';

export default function Scene() {
  const { mode } = useStore();

  return (
    // 1. The 3D Window (Canvas)
    // shadows: Enables realistic shadow calculations
    // dpr: Device Pixel Ratio (Maintains sharpness on high-res screens)
    // gl: Configures the renderer for cinematic colors
    <div id="canvas-container" className="fixed inset-0 z-0">
      <Canvas
        shadows
        dpr={[1, 2]} 
        camera={{ position: [0, 2, 6], fov: 45 }}
        gl={{ antialias: false }} // We let PostProcessing handle antialiasing
      >
        {/* 2. Controls 
            enableZoom={false}: Prevents breaking the immersion
            maxPolarAngle: Prevents the camera from going under the floor
        */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          maxPolarAngle={Math.PI / 2 - 0.1} // Stop at ground level
          autoRotate={mode === 'idle'} // Only rotate when idle
          autoRotateSpeed={0.5}
        />

        {/* 3. The World 
            Suspense waits for the 3D models to load before showing anything.
            While loading, it shows 'null' (The LoadingScreen handles the UI).
        */}
        <Suspense fallback={null}>
          <StadiumModel />
          <ViratModel />
          <PostProcessing />
          
          {/* Preload assets so they don't pop in later */}
          <Preload all />
        </Suspense>

      </Canvas>
    </div>
  );
}