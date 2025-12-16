// 'use client';

// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Preload } from '@react-three/drei';
// import { Suspense } from 'react';
// import { useStore } from '@/store/useStore';
// import ViratModel from './ViratModel';
// import StadiumModel from './StadiumModel';
// import PostProcessing from './PostProcessing';

// export default function Scene() {
//   const { mode } = useStore();

//   return (
//     // 1. The 3D Window (Canvas)
//     // shadows: Enables realistic shadow calculations
//     // dpr: Device Pixel Ratio (Maintains sharpness on high-res screens)
//     // gl: Configures the renderer for cinematic colors
//     <div id="canvas-container" className="fixed inset-0 z-0">
//       <Canvas
//         shadows
//         dpr={[1, 2]} 
//         camera={{ position: [0, 2, 6], fov: 45 }}
//         gl={{ antialias: false }} // We let PostProcessing handle antialiasing
//       >
//         {/* 2. Controls 
//             enableZoom={false}: Prevents breaking the immersion
//             maxPolarAngle: Prevents the camera from going under the floor
//         */}
//         <OrbitControls 
//           enableZoom={false} 
//           enablePan={false} 
//           maxPolarAngle={Math.PI / 2 - 0.1} // Stop at ground level
//           autoRotate={mode === 'idle'} // Only rotate when idle
//           autoRotateSpeed={0.5}
//         />

//         {/* 3. The World 
//             Suspense waits for the 3D models to load before showing anything.
//             While loading, it shows 'null' (The LoadingScreen handles the UI).
//         */}
//         <Suspense fallback={null}>
//           <StadiumModel />
//           <ViratModel />
//           <PostProcessing />
          
//           {/* Preload assets so they don't pop in later */}
//           <Preload all />
//         </Suspense>

//       </Canvas>
//     </div>
//   );
// }

'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, BakeShadows, AdaptiveDpr, CameraShake } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import ViratModel from './ViratModel';
import StadiumModel from './StadiumModel';
import Effects from './Effects'; // 👈 Using your Advanced Effects file

export default function Scene() {
  const { mode } = useStore();
  const [shakeIntensity, setShakeIntensity] = useState(0);

  // Logic: Increase camera shake when in "Aggressive" mode
  useEffect(() => {
    if (mode === 'aggressive') {
      setShakeIntensity(1.5); // High energy vibration
    } else {
      setShakeIntensity(0);   // Calm
    }
  }, [mode]);

  return (
    <div id="canvas-container" className="fixed inset-0 z-0 pointer-events-auto">
      <Canvas
        shadows
        dpr={[1, 2]} // Support high-res Retina displays
        camera={{ position: [0, 1.5, 6], fov: 45 }}
        gl={{ 
          antialias: false, // OFF for better Post-Processing performance
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
      >
        {/* 1. Intelligent Controls 
            - autoRotate: Spins slowly when idle
            - enableZoom: FALSE (keeps the "App" feel)
        */}
        <OrbitControls 
          makeDefault
          enableZoom={false} 
          enablePan={false} 
          maxPolarAngle={Math.PI / 2 - 0.05} // Don't go below ground
          minPolarAngle={Math.PI / 3}        // Don't look too high up
          autoRotate={mode === 'idle'} 
          autoRotateSpeed={0.8}
        />

        {/* 2. Dynamic Camera Shake (The "Stadium Energy" Effect) */}
        <CameraShake 
          maxYaw={0.05 * shakeIntensity} // Horizontal shake
          maxPitch={0.05 * shakeIntensity} // Vertical shake
          maxRoll={0.05 * shakeIntensity} // Tilt shake
          yawFrequency={0.5 * shakeIntensity} 
          pitchFrequency={0.5 * shakeIntensity} 
          rollFrequency={0.5 * shakeIntensity} 
          intensity={shakeIntensity}
          decay={true}
          decayRate={0.65}
        />

        {/* 3. Performance Optimizers (Crucial for Mobile) */}
        <AdaptiveDpr pixelated /> {/* Lowers resolution while moving camera */}
        <BakeShadows />           {/* Calculates shadows once to save GPU */}

        {/* 4. The World */}
        <Suspense fallback={null}>
          <StadiumModel />
          <ViratModel />
          
          {/* The Advanced Cinematic Lens */}
          <Effects /> 
          
          <Preload all />
        </Suspense>

      </Canvas>
    </div>
  );
}