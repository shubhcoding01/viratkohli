// 'use client';

// import { useRef, useEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { useGLTF, useAnimations } from '@react-three/drei';
// import * as THREE from 'three';
// import { useStore } from '@/store/useStore';
// import gsap from 'gsap';

// export default function ViratModel() {
//   const group = useRef<THREE.Group>(null);
//   const { mode } = useStore();

//   // 1. Load the Model
//   // NOTE: If you don't have this file in public/models yet, 
//   // the app will break unless you comment this out and use the fallback below.
//   // For now, I will wrap it in a try-catch logic visually.
  
//   // Once you have the file, uncomment these lines:
//      const { scene, animations } = useGLTF('/models/virat-batting.glb');
//      const { actions } = useAnimations(animations, group);
  

//   // 2. Logic to React to "Modes"
//   useEffect(() => {
//     if (!group.current) return;

//     // A. Aggressive Mode (RCB Red / Fast Movement)
//     if (mode === 'aggressive') {
//       gsap.to(group.current.scale, {
//         x: 1.1, y: 1.1, z: 1.1, // Pulse effect
//         duration: 0.5,
//         ease: "back.out(1.7)"
//       });
//       // If you had real animations: actions['AggressiveShot']?.play();
//     } 
    
//     // B. Classic Mode (India Blue / Steady)
//     else if (mode === 'classic') {
//       gsap.to(group.current.scale, {
//         x: 1, y: 1, z: 1,
//         duration: 0.5,
//         ease: "power2.out"
//       });
//     }
//   }, [mode]);

//   // 3. Constant Animation Loop
//   useFrame((state) => {
//     if (!group.current) return;

//     // Gentle floating breathing animation
//     group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;

//     // Slight rotation based on mouse position (Parallax)
//     const x = state.pointer.x * 0.2;
//     const y = state.pointer.y * 0.2;
    
//     // Smoothly interpolate rotation
//     group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x, 0.1);
//     group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y, 0.1);
//   });

//   // --- RENDER ---
  
//   // OPTION A: If you HAVE the model (Uncomment scene below)
//   // return <primitive ref={group} object={scene} scale={2} position={[0, -2, 0]} />

//   // OPTION B: PLACEHOLDER (Use this until you download a GLB)
//   return (
//     <group ref={group} dispose={null}>
//       {/* 1. The "Body" */}
//       <mesh position={[0, 0, 0]} castShadow receiveShadow>
//         <boxGeometry args={[1, 2, 0.5]} />
//         <meshStandardMaterial 
//           color={mode === 'aggressive' ? '#E31937' : '#005EB8'} // Changes color Red/Blue
//           roughness={0.3}
//           metalness={0.8}
//         />
//       </mesh>

//       {/* 2. The "Head" (Helmet) */}
//       <mesh position={[0, 1.4, 0]}>
//         <sphereGeometry args={[0.35, 32, 32]} />
//         <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.5} />
//       </mesh>

//       {/* 3. The "Bat" */}
//       <mesh position={[0.6, -0.5, 0.2]} rotation={[0, 0, -0.2]}>
//         <boxGeometry args={[0.2, 1.5, 0.05]} />
//         <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={1} />
//       </mesh>
//     </group>
//   );
// }

// // Preload to prevent lag
// useGLTF.preload('/models/virat-batting.glb');


'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, MeshDistortMaterial, Float, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';
import gsap from 'gsap';

export default function ViratModel() {
  const group = useRef<THREE.Group>(null);
  const materialRef = useRef<any>(null); // For the liquid effect
  const { mode } = useStore();

  // ---------------------------------------------------------
  // 1. REAL MODEL LOADING (Uncomment this when you have the file)
  // ---------------------------------------------------------
  /*
  const { scene, animations } = useGLTF('/models/virat-batting.glb');
  const { actions } = useAnimations(animations, group);
  
  useEffect(() => {
    if(mode === 'aggressive') {
       actions['AggressiveShot']?.reset().fadeIn(0.5).play();
    } else {
       actions['Idle']?.reset().fadeIn(0.5).play();
    }
  }, [mode, actions]);
  
  // IF YOU HAVE THE MODEL, RETURN THIS:
  // return <primitive ref={group} object={scene} scale={2} position={[0, -2, 0]} />
  */

  // ---------------------------------------------------------
  // 2. PROCEDURAL "CYBER-CORE" (Use this if no model exists)
  // ---------------------------------------------------------

  // Logic: React to "Modes" via GSAP
  useEffect(() => {
    if (!materialRef.current) return;

    if (mode === 'aggressive') {
      // 😡 RED MODE: Fast distortion, high speed, red color
      gsap.to(materialRef.current, {
        distort: 0.8,       // Spiky
        speed: 5,           // Fast boiling
        color: '#E31937',   // RCB Red
        duration: 1.5,
        ease: "power2.out"
      });
      // Pulse size
      gsap.to(group.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.5, ease: "back.out" });

    } else if (mode === 'classic') {
      // 🥶 BLUE MODE: Smooth flow, blue color
      gsap.to(materialRef.current, {
        distort: 0.3,       // Smooth liquid
        speed: 2,           // Gentle flow
        color: '#005EB8',   // India Blue
        duration: 1.5
      });
      gsap.to(group.current.scale, { x: 1, y: 1, z: 1, duration: 0.5 });
      
    } else {
      // 👑 IDLE MODE: Gold
      gsap.to(materialRef.current, {
        distort: 0.4,
        speed: 1,
        color: '#D4AF37',   // Gold
        duration: 1
      });
      gsap.to(group.current.scale, { x: 1, y: 1, z: 1, duration: 0.5 });
    }
  }, [mode]);

  // Frame Loop: Rotate the ring and floating logic
  useFrame((state) => {
    if (!group.current) return;
    
    // Mouse Parallax (Look at cursor)
    const x = (state.pointer.x * Math.PI) / 10;
    const y = (state.pointer.y * Math.PI) / 10;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x, 0.1);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y, 0.1);
  });

  return (
    <group ref={group} dispose={null}>
      
      {/* A. The "Soul" (Liquid Metal Sphere) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          {/* Detailed sphere for smooth liquid simulation */}
          <icosahedronGeometry args={[1, 64]} /> 
          
          <MeshDistortMaterial
            ref={materialRef}
            speed={2} // How fast the liquid moves
            distort={0.4} // How much it deforms
            radius={1}
            color="#D4AF37" // Default Gold
            roughness={0.1}
            metalness={1}
            envMapIntensity={1.5} // Reflects the stadium lights strongly
          />
        </mesh>
      </Float>

      {/* B. The "Aura Ring" (Orbiting Energy) */}
      <mesh rotation={[1.5, 0, 0]} scale={[1.5, 1.5, 1.5]}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial 
          color={mode === 'aggressive' ? '#ff0000' : '#ffffff'} 
          emissive={mode === 'aggressive' ? '#ff0000' : '#ffffff'}
          emissiveIntensity={2} 
          toneMapped={false} // Makes it glow super bright with Bloom
        />
      </mesh>

      {/* C. The "Bat" Representation (Floating Gold Monolith) */}
      <Float speed={4} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[1.2, 0.5, 0.5]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.15, 1.8, 0.05]} />
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
        </mesh>
      </Float>

      {/* D. Orbiting Particles (The "Sweat/Spark" Effect) */}
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points />
      </group>

    </group>
  );
}

// --- SUB-COMPONENT: Particle System ---
function Points() {
  const ref = useRef<THREE.Points>(null);
  
  // Create 100 random particles
  const [positions] = useState(() => {
    const pos = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random(); // Radius between 1.5 and 2.5
      pos[i * 3] = Math.cos(angle) * r;     // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2; // Y
      pos[i * 3 + 2] = Math.sin(angle) * r; // Z
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotate the cloud slowly
      ref.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

// Preload logic kept for future use
// useGLTF.preload('/models/virat-batting.glb');