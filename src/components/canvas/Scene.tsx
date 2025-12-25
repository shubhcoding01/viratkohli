// 'use client';

// import { Canvas, useFrame } from '@react-three/fiber';
// import { Preload, BakeShadows, AdaptiveDpr, Environment, ContactShadows, useTexture } from '@react-three/drei';
// import { Suspense, useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import { useStore } from '@/store/useStore';
// import ViratModel from './ViratModel';
// import TrophyModel from './TrophyModel'; // New Component for the Trophy
// import Effects from './Effects'; 

// // --- ADVANCED FEATURE: CINEMATIC CAMERA RIG ---
// // Flies the camera to different angles based on the "Mode"
// function CameraRig() {
//   const { mode } = useStore();
//   const vec = new THREE.Vector3();

//   useFrame((state) => {
//     // 1. Define Target Positions
//     let targetPos = [0, 1.5, 6]; // Default: Front View
//     let targetLookAt = [0, 1, 0];

//     if (mode === 'aggressive') {
//        // Zoom in tight for "Aggressive" mode (Trophy/Action view)
//        targetPos = [2, 1, 4];
//        targetLookAt = [0, 0.5, 0];
//     } else if (mode === 'classic') {
//        // Side angle for "Classic" stance
//        targetPos = [-3, 1.5, 5];
//     }

//     // 2. Smoothly Interpolate Camera Position (The "Fly" effect)
//     state.camera.position.lerp(vec.set(targetPos[0], targetPos[1], targetPos[2]), 0.05);
//     state.camera.lookAt(targetLookAt[0], targetLookAt[1], targetLookAt[2]);
//   });
//   return null;
// }

// // --- ADVANCED FEATURE: REALISTIC GRASS PITCH ---
// function RealisticPitch() {
//   // Load texture with anisotropic filtering for sharpness at angles
//   const texture = useTexture('/textures/pitch-grass.png');
//   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//   texture.repeat.set(15, 15); // Tile it 15 times so it's high-res
  
//   return (
//     <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
//       <planeGeometry args={[50, 50]} />
//       <meshStandardMaterial 
//         map={texture}
//         roughness={1} 
//         color="#888" // Darken it slightly for night mode
//       />
//     </mesh>
//   );
// }

// export default function Scene() {
//   const { mode } = useStore();

//   return (
//     <div id="canvas-container" className="fixed inset-0 z-0 pointer-events-auto">
//       <Canvas
//         shadows
//         dpr={[1, 1.5]}
//         gl={{ antialias: false, powerPreference: "high-performance" }}
//         camera={{ position: [0, 1.5, 6], fov: 45 }}
//       >
//         {/* 1. The Director (Controls Camera Movement) */}
//         <CameraRig />

//         {/* 2. Global Lighting (Stadium Night Vibe) */}
//         <Environment preset="city" blur={0.6} />
//         <ambientLight intensity={0.5} />
//         <spotLight 
//           position={[10, 10, 5]} 
//           angle={0.15} 
//           penumbra={1} 
//           intensity={mode === 'aggressive' ? 800 : 400} 
//           color={mode === 'aggressive' ? '#ff0000' : '#ffffff'} 
//           castShadow 
//         />

//         {/* 3. The Stage */}
//         <Suspense fallback={null}>
//           <RealisticPitch />
          
//           {/* LOGIC: Swap Models based on interaction */}
//           {mode === 'aggressive' ? (
//              <TrophyModel /> 
//           ) : (
//              <ViratModel />
//           )}

//           {/* High Quality Floor Shadows */}
//           <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={10} blur={2} far={4} />
          
//           <Effects />
//           <Preload all />
//         </Suspense>

//         <BakeShadows />
//         <AdaptiveDpr pixelated />
//       </Canvas>
//     </div>
//   );
// }

// 'use client';

// import { Canvas, useFrame } from '@react-three/fiber';
// import { Preload, BakeShadows, AdaptiveDpr, Environment, ContactShadows, useTexture } from '@react-three/drei';
// import { Suspense } from 'react';
// import * as THREE from 'three';
// import { useStore } from '@/store/useStore';
// import ViratModel from './ViratModel';
// import TrophyModel from './TrophyModel';
// import Effects from './Effects'; 

// // --- CAMERA RIG (No changes here, keeping your flight logic) ---
// function CameraRig() {
//   const { mode } = useStore();
//   const vec = new THREE.Vector3();

//   useFrame((state) => {
//     let targetPos = [0, 1.5, 6];
//     let targetLookAt = [0, 1, 0];

//     if (mode === 'aggressive') {
//        targetPos = [2, 1, 4];
//        targetLookAt = [0, 0.5, 0];
//     } else if (mode === 'classic') {
//        targetPos = [-3, 1.5, 5];
//     }

//     state.camera.position.lerp(vec.set(targetPos[0], targetPos[1], targetPos[2]), 0.05);
//     state.camera.lookAt(targetLookAt[0], targetLookAt[1], targetLookAt[2]);
//   });
//   return null;
// }

// // --- REALISTIC PITCH (No changes here) ---
// function RealisticPitch() {
//   const texture = useTexture('/textures/pitch-grass.png');
//   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//   texture.repeat.set(15, 15);
  
//   return (
//     <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
//       <planeGeometry args={[50, 50]} />
//       <meshStandardMaterial map={texture} roughness={1} color="#888" />
//     </mesh>
//   );
// }

// export default function Scene() {
//   const { mode } = useStore();

//   return (
//     <div id="canvas-container" className="fixed inset-0 z-0 pointer-events-auto">
//       <Canvas
//         shadows
//         dpr={[1, 1.5]}
//         camera={{ position: [0, 1.5, 6], fov: 45 }}
//         // 👇 UPDATED GL CONFIGURATION (The Fix)
//         gl={{ 
//           antialias: false, // Must be false for PostProcessing to work correctly
//           powerPreference: "high-performance",
//           alpha: true,      // Explicitly enable Alpha to prevent the crash
//           stencil: false,
//           depth: true
//         }}
//       >
//         <CameraRig />

//         <Environment preset="city" blur={0.6} />
//         <ambientLight intensity={0.5} />
//         <spotLight 
//           position={[10, 10, 5]} 
//           angle={0.15} 
//           penumbra={1} 
//           intensity={mode === 'aggressive' ? 800 : 400} 
//           color={mode === 'aggressive' ? '#ff0000' : '#ffffff'} 
//           castShadow 
//         />

//         <Suspense fallback={null}>
//           <RealisticPitch />
          
//           {mode === 'aggressive' ? <TrophyModel /> : <ViratModel />}

//           <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={10} blur={2} far={4} />
          
//           <Effects />
//           <Preload all />
//         </Suspense>

//         <BakeShadows />
//         <AdaptiveDpr pixelated />
//       </Canvas>
//     </div>
//   );
// }


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