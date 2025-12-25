// 'use client';

// import { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { useGLTF, Float, Sparkles } from '@react-three/drei';
// import * as THREE from 'three';

// export default function TrophyModel() {
//   const { scene } = useGLTF('/models/trophy.glb');
//   const ref = useRef<THREE.Group>(null);

//   // Rotate the trophy slowly like a showcase
//   useFrame((state, delta) => {
//     if(ref.current) ref.current.rotation.y += delta * 0.5;
//   });

//   return (
//     <group>
//       <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
//         <primitive 
//           ref={ref} 
//           object={scene} 
//           scale={2} 
//           position={[0, 0.5, 0]} 
//         />
        
//         {/* Add Gold Sparkles around the Trophy */}
//         <Sparkles count={50} scale={3} size={4} speed={0.4} opacity={1} color="#FFD700" />
//       </Float>
//     </group>
//   );
// }

// useGLTF.preload('/models/trophy.glb');


'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, Sparkles, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

export default function TrophyModel(props: any) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/trophy.glb');
  
  // 1. Interaction State
  const [hovered, setHovered] = useState(false);
  const { setHoveredItem } = useStore();
  
  // Helper from Drei to change cursor pointer automatically
  useCursor(hovered);

  // 2. MATERIAL ENHANCEMENT (Make it look like expensive Gold)
  // We use useMemo so we don't re-process materials on every render
  useMemo(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        // Enable Shadows
        child.castShadow = true;
        child.receiveShadow = true;

        // Force PBR Material Properties
        // If the model already has a texture, we keep it but make it shiny.
        // If it's plain color, we force it to Gold.
        if (child.material) {
          child.material.envMapIntensity = 2.5; // High Reflection
          child.material.metalness = 1.0;       // Pure Metal
          child.material.roughness = 0.15;      // Very Polished
          
          // Optional: Force Gold Color if texture is missing
          // child.material.color = new THREE.Color("#FFD700"); 
        }
      }
    });
  }, [scene]);

  // 3. ANIMATION LOOP (Physics)
  useFrame((state, delta) => {
    if (!ref.current) return;

    // A. Rotation Logic
    // Base speed = 0.5. Hover speed = 3.0.
    // MathUtils.lerp creates a smooth acceleration/deceleration effect (no instant snapping)
    const targetSpeed = hovered ? 3 : 0.5;
    ref.current.rotation.y += delta * targetSpeed;

    // B. Floating/Hover Scale Effect
    // Smoothly scale up to 1.1x when hovered
    const targetScale = hovered ? 2.2 : 2; 
    ref.current.scale.setScalar(
      THREE.MathUtils.lerp(ref.current.scale.x, targetScale, 0.1)
    );
  });

  return (
    <group {...props}>
      {/* 4. FLOATING CONTAINER */}
      {/* floatIntensity makes it bob up and down. rotationIntensity tilts it slightly. */}
      <Float 
        speed={2} 
        rotationIntensity={0.5} 
        floatIntensity={1} 
        floatingRange={[-0.1, 0.1]}
      >
        <primitive 
          ref={ref} 
          object={scene} 
          position={[0, 0.5, 0]} 
          // Events
          onPointerOver={() => {
            setHovered(true);
            setHoveredItem('trophy'); // Update global store (for UI tooltips etc)
          }}
          onPointerOut={() => {
            setHovered(false);
            setHoveredItem(null);
          }}
        />

        {/* 5. VISUAL EFFECTS */}
        
        {/* A. Golden Sparkles (Magic Dust) */}
        <Sparkles 
          count={40} 
          scale={3} 
          size={6} 
          speed={0.4} 
          opacity={hovered ? 1 : 0.5} // Brighter when hovered
          color="#FFD700"
          noise={0.2} // Adds randomness to movement
        />

        {/* B. Rim Light (Backlighting) */}
        {/* This creates a cinematic "Halo" effect on the trophy edges */}
        <spotLight
          position={[0, 2, -2]}
          intensity={5}
          color="#FFD700"
          distance={4}
          angle={0.5}
          penumbra={1}
        />
        
        {/* C. Key Light (Front) - Only activates on hover for dramatic reveal */}
        <pointLight 
          position={[0, 1, 2]} 
          intensity={hovered ? 2 : 0} 
          color="white" 
          distance={3}
        />

      </Float>
    </group>
  );
}

// Preload to avoid pop-in
useGLTF.preload('/models/trophy.glb');