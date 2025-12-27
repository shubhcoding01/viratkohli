'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Preload, BakeShadows, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import { Suspense, useState } from 'react';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

// Models
import ViratModel from './ViratModel';
import TrophyModel from './TrophyModel';
import StadiumModel from './StadiumModel'; // Handles Floor, Lights, Fog
import PostProcessing from './PostProcessing'; // Your VFX Layer

// --- CINEMATIC CAMERA RIG ---
function CameraRig() {
  const { mode } = useStore();
  const vec = new THREE.Vector3();

  useFrame((state) => {
    // 1. Define Shot Angles
    // Default: "Hero Shot" (Low angle, looking up)
    let targetPos = [0, 1.2, 6.5]; 
    let targetLookAt = [0, 0.9, 0];

    if (mode === 'aggressive') {
       // Action Shot: Tighter, closer, slightly higher to see the trophy/bat details
       targetPos = [2.5, 1.5, 4];
       targetLookAt = [0, 0.5, 0];
    } else if (mode === 'classic') {
       // Profile Shot: Cinematic side angle
       targetPos = [-4, 1.2, 5];
       targetLookAt = [0, 1, 0];
    }

    // 2. Smooth Flight Logic
    // 0.04 factor creates a "Heavy Camera" feel (Simulates a crane shot)
    state.camera.position.lerp(vec.set(targetPos[0], targetPos[1], targetPos[2]), 0.04);
    state.camera.lookAt(targetLookAt[0], targetLookAt[1], targetLookAt[2]);
  });
  return null;
}

export default function Scene() {
  const { mode } = useStore();
  const [dpr, setDpr] = useState(1.5); // Default High Quality

  return (
    <div id="canvas-container" className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
      <Canvas
        shadows
        dpr={dpr}
        // FOV 40 = Telephoto Lens (More Cinematic, less Fish-eye distortion)
        camera={{ position: [0, 1.5, 6], fov: 40 }} 
        gl={{ 
          antialias: false, // PostProcessing handles antialiasing
          powerPreference: "high-performance",
          alpha: true,      // Fixes the black background crash
          stencil: false,
          depth: true
        }}
        // Ensures mouse events pass through HTML overlays correctly
        eventSource={typeof document !== 'undefined' ? document.getElementById('root')! : undefined}
        eventPrefix="client"
      >
        {/* 1. Performance Manager (Auto-downgrades quality if lagging) */}
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />

        {/* 2. The Director */}
        <CameraRig />

        {/* 3. The World */}
        <Suspense fallback={null}>
          {/* Environment Layer (Lights, Floor, Fog) */}
          <StadiumModel />
          
          {/* Character Layer (Swaps based on interaction) */}
          {mode === 'aggressive' ? <TrophyModel /> : <ViratModel />}
          
          {/* VFX Layer (Bloom, Noise, Color Grading) */}
          <PostProcessing />
          
          <Preload all />
        </Suspense>

        {/* 4. Optimizations */}
        <BakeShadows />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}