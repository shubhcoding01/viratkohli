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
// import { GlitchMode, BlendFunction } from 'postprocessing'; // 👈 MUST be from 'postprocessing'
// import { useStore } from '@/store/useStore';
// import * as THREE from 'three';

// export default function PostProcessing() {
//   const { mode } = useStore();

//   return (
//     <EffectComposer disableNormalPass multisampling={4}>
      
//       {/* 1. Brightness/Contrast */}
//       <BrightnessContrast
//         brightness={0}
//         contrast={0.1}
//       />

//       {/* 2. Chromatic Aberration */}
//       <ChromaticAberration
//         blendFunction={BlendFunction.NORMAL} 
//         offset={new THREE.Vector2(
//           mode === 'aggressive' ? 0.004 : 0.002, 
//           mode === 'aggressive' ? 0.004 : 0.002
//         )}
//         radialModulation={false}
//         modulationOffset={0}
//       />

//       {/* 3. Bloom */}
//       <Bloom 
//         luminanceThreshold={1.1} 
//         mipmapBlur 
//         intensity={mode === 'aggressive' ? 2.0 : 1.2} 
//         radius={0.6}
//         levels={9}
//       />

//       {/* 4. Vignette - FIXED */}
//       <Vignette 
//         offset={0.3} 
//         darkness={0.6} 
//         eskil={false} // 👈 This prop is often required to prevent Type errors
//         blendFunction={BlendFunction.NORMAL} 
//       />

//       {/* 5. Glitch - FIXED */}
//       <Glitch 
//         delay={[0.5, 1.5]} 
//         duration={[0.1, 0.3]} 
//         strength={[0.2, 0.4]} 
//         mode={GlitchMode.SPORADIC} 
//         ratio={0.85} 
//         active={mode === 'aggressive'} 
//       />

//       {/* 6. Noise - FIXED */}
//       <Noise 
//         premultiply // 👈 Helps prevent shader errors
//         opacity={0.05}
//         blendFunction={BlendFunction.SOFT_LIGHT} // SOFT_LIGHT blends better than NORMAL for noise
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
import { useStore } from '@/store/useStore';
import * as THREE from 'three';

export default function PostProcessing() {
  const { mode } = useStore();
  const aggressive = mode === 'aggressive';

  return (
    <EffectComposer enableNormalPass={false} multisampling={4}>
      <BrightnessContrast
        brightness={0}
        contrast={0.1}
      />

      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(
          aggressive ? 0.004 : 0.002,
          aggressive ? 0.004 : 0.002
        )}
        radialModulation={false}
        modulationOffset={0}
      />

      <Bloom
        luminanceThreshold={1.1}
        mipmapBlur
        intensity={aggressive ? 2.0 : 1.2}
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
        mode={aggressive ? GlitchMode.SPORADIC : GlitchMode.DISABLED}
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
