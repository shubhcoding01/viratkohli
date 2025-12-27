// 'use client';

// import { 
//   EffectComposer, 
//   Bloom, 
//   Vignette, 
//   Glitch, 
//   Noise, 
//   ChromaticAberration,
//   BrightnessContrast 
// } from '@react-three/postprocessing';
// // 👇 CRITICAL: Import enums from the core library
// import { GlitchMode, BlendFunction } from 'postprocessing';
// import * as THREE from 'three';
// import { useStore } from '@/store/useStore';

// export default function Effects() {
//   const { mode } = useStore();

//   return (
//     <EffectComposer disableNormalPass multisampling={4}>
      
//       {/* 1. CONTRAST (The "Netflix" Look) */}
//       <BrightnessContrast
//         brightness={0}
//         contrast={0.1} // +10% Contrast for punchy visuals
//       />

//       {/* 2. CHROMATIC ABERRATION (Lens Imperfection) */}
//       <ChromaticAberration 
//         blendFunction={BlendFunction.NORMAL}
//         offset={new THREE.Vector2(
//           mode === 'aggressive' ? 0.004 : 0.002, 
//           mode === 'aggressive' ? 0.004 : 0.002
//         )}
//         radialModulation={false}
//         modulationOffset={0}
//       />

//       {/* 3. BLOOM (The "God Aura") */}
//       <Bloom 
//         luminanceThreshold={1.1} 
//         mipmapBlur 
//         intensity={mode === 'aggressive' ? 2.0 : 1.2} 
//         radius={0.6}
//         levels={9}
//       />

//       {/* 4. VIGNETTE (Cinematic Focus) */}
//       <Vignette 
//         offset={0.3} 
//         darkness={0.6} 
//         eskil={false} 
//         blendFunction={BlendFunction.NORMAL} 
//       />

//       {/* 5. GLITCH (The "Aggression") - FIXED & STABLE */}
//       <Glitch 
//         delay={[0.5, 1.5]} 
//         duration={[0.1, 0.3]} 
//         strength={[0.2, 0.4]} 
//         mode={GlitchMode.SPORADIC} 
//         ratio={0.85} 
//         // 👇 USE 'active' PROP INSTEAD OF CONDITIONAL RENDERING
//         active={mode === 'aggressive'} 
//       />

//       {/* 6. NOISE (Film Grain) */}
//       <Noise 
//         premultiply
//         opacity={0.05} 
//         blendFunction={BlendFunction.SOFT_LIGHT} // Blends better with dark backgrounds
//       />

//     </EffectComposer>
//   );
// }

'use client';

import {
  EffectComposer,
  Bloom,
  Vignette,
  Glitch,
  Noise,
  ChromaticAberration,
  BrightnessContrast,
} from '@react-three/postprocessing';

import { GlitchMode, BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

export default function Effects() {
  const { mode } = useStore();
  const isAggressive = mode === 'aggressive';

  return (
    <EffectComposer enableNormalPass={false} multisampling={4}>
      <BrightnessContrast
        brightness={0}
        contrast={0.1}
      />

      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(
          isAggressive ? 0.004 : 0.002,
          isAggressive ? 0.004 : 0.002
        )}
        radialModulation={false}
        modulationOffset={0}
      />

      <Bloom
        luminanceThreshold={1.1}
        mipmapBlur
        intensity={isAggressive ? 2.0 : 1.2}
        radius={0.6}
        levels={9}
      />

      <Vignette
        offset={0.3}
        darkness={0.6}
        eskil={false}
        blendFunction={BlendFunction.NORMAL}
      />

      <Glitch
        delay={new THREE.Vector2(0.5, 1.5)}
        duration={new THREE.Vector2(0.1, 0.3)}
        strength={new THREE.Vector2(0.2, 0.4)}
        mode={isAggressive ? GlitchMode.SPORADIC : GlitchMode.DISABLED}
        ratio={0.85}
      />

      <Noise
        premultiply
        opacity={0.05}
        blendFunction={BlendFunction.SOFT_LIGHT}
      />
    </EffectComposer>
  );
}
