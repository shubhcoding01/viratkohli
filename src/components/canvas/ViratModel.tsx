// 'use client';

// import { useRef, useEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { useGLTF, useAnimations, useTexture } from '@react-three/drei';
// import * as THREE from 'three';
// import { useStore } from '@/store/useStore';

// export default function ViratModel() {
//   const group = useRef<THREE.Group>(null);
//   const { mode } = useStore();
  
//   // 1. Load the Real 3D Asset
//   const { scene, animations, materials } = useGLTF('/models/virat-batting.glb');
//   const { actions } = useAnimations(animations, group);

//   // 2. Load the Jersey Texture (The RCB Kit)
//   const rcbTexture = useTexture('/textures/jersey-rcb.jpg');
//   rcbTexture.flipY = false; // Fixes upside-down textures on GLB models

//   // 3. Apply the Jersey Texture Dynamically
//   useEffect(() => {
//     // Traverse the model to find the "TShirt" or "Body" mesh
//     // NOTE: You might need to check your GLB in Blender to find the exact mesh name
//     scene.traverse((child: any) => {
//       if (child.isMesh && (child.name.includes('TShirt') || child.name.includes('Body'))) {
//          child.material.map = rcbTexture; // Apply RCB Jersey
//          child.material.needsUpdate = true;
//       }
//     });
//   }, [scene, rcbTexture]);

//   // 4. Animation Logic
//   useEffect(() => {
//     // Reset all animations
//     Object.values(actions).forEach(action => action?.stop());
    
//     if (actions['Batting']) {
//       actions['Batting'].play(); // Assumes your GLB has an animation named 'Batting'
//     }
//   }, [actions]);

//   return <primitive ref={group} object={scene} scale={1.5} position={[0, 0, 0]} />;
// }

// useGLTF.preload('/models/virat-batting.glb');


'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

export default function ViratModel(props: any) {
  const group = useRef<THREE.Group>(null);
  
  // 1. Access Global State
  const { mode, setHoveredItem } = useStore();

  // 2. Load Assets (Model & Textures)
  // Ensure your GLB has animations named 'Idle', 'Shot', etc.
  const { nodes, materials, animations } = useGLTF('/models/virat-batting.glb') as any;
  const { actions } = useAnimations(animations, group);

  // Load High-Res Textures
  const jerseyTexture = useTexture('/textures/jersey-rcb.jpg');
  jerseyTexture.flipY = false;
  jerseyTexture.colorSpace = THREE.SRGBColorSpace;

  // 3. ADVANCED MATERIAL CONFIGURATION
  // We use useMemo so this only runs once, not every frame
  useMemo(() => {
    // Traverse the model to apply specific physical properties
    Object.values(materials).forEach((mat: any) => {
      
      // A. The Jersey (Fabric Look)
      if (mat.name.includes('Jersey') || mat.name.includes('Fabric')) {
        mat.map = jerseyTexture;
        mat.roughness = 0.8; // Fabric is not shiny
        mat.metalness = 0.0;
        mat.needsUpdate = true;
      }

      // B. The Helmet (Plastic/Shiny Look)
      if (mat.name.includes('Helmet')) {
        mat.roughness = 0.2; // Shiny
        mat.metalness = 0.6; // Slightly metallic
        mat.envMapIntensity = 1.5; // Reflects the environment
      }

      // C. The Bat (Varnished Wood)
      if (mat.name.includes('Bat')) {
        mat.roughness = 0.3;
        mat.metalness = 0.1;
      }
      
      // D. Skin (Subsurface Scattering fake)
      if (mat.name.includes('Skin') || mat.name.includes('Face')) {
        mat.roughness = 0.6;
        mat.color.setHex(0xffd1b3); // Warm tint
      }
    });
  }, [materials, jerseyTexture]);


  // 4. ANIMATION CONTROLLER (State Machine)
  useEffect(() => {
    // Default animation
    const animName = mode === 'aggressive' ? 'Shot' : 'Idle';
    const action = actions[animName] || actions['Take 001'] || Object.values(actions)[0];

    if (action) {
      // Fade out all other actions
      Object.values(actions).forEach((act) => {
        if (act !== action && act?.isRunning()) {
          act.fadeOut(0.5);
        }
      });

      // Fade in new action
      action.reset().fadeIn(0.5).play();
      
      // If aggressive shot, play once then go back to loop
      if (mode === 'aggressive') {
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
      } else {
        action.setLoop(THREE.LoopRepeat, Infinity);
      }
    }
  }, [mode, actions]);


  // 5. FRAME LOOP: HEAD TRACKING & PHYSICS
  useFrame((state, delta) => {
    if (!group.current) return;

    // A. Breathing / Floating Effect (Subtle idle movement)
    // Moves slightly up and down to simulate breathing
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      Math.sin(state.clock.elapsedTime * 2) * 0.02, 
      0.1
    );

    // B. Head Tracking (Look at Mouse)
    // Finds the Neck/Head bone and rotates it towards the cursor
    const headBone = nodes.Head || nodes.mixamorigHead || nodes.Neck;
    
    if (headBone && mode === 'idle') {
      // Create a target vector based on mouse position
      // mouse.x is -1 to 1. We scale it down so he doesn't break his neck.
      const targetRotationY = state.mouse.x * 0.5; // Look left/right
      const targetRotationX = -state.mouse.y * 0.2; // Look up/down

      // Smoothly interpolate current rotation to target rotation
      headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, targetRotationY, 0.1);
      headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, targetRotationX, 0.1);
    }
  });


  // 6. RENDER
  return (
    <group 
      ref={group} 
      {...props} 
      dispose={null}
      // Interactive Events
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
        setHoveredItem('virat');
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        setHoveredItem(null);
      }}
    >
      <primitive 
        object={nodes.Scene || nodes.root} 
        scale={1.6} 
        position={[0, -1, 0]} // Adjust to stand on floor
        castShadow 
        receiveShadow 
      />
      
      {/* 7. RIM LIGHT (Cinematic Hero Lighting) */}
      {/* Adds a gold rim light behind him to pop him out from the background */}
      <spotLight
        position={[-2, 2, -2]}
        intensity={2}
        color="#D4AF37" // VK Gold
        angle={0.5}
        penumbra={1}
        distance={5}
      />
    </group>
  );
}

// Preload to prevent popping
useGLTF.preload('/models/virat-batting.glb');