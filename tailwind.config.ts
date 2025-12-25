// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // 👑 The King's Palette
//         vk: {
//           black: "#050505",    // Darker than pure black for depth (OLED style)
//           gray: "#1a1a1a",     // For cards/surfaces
//           gold: "#D4AF37",     // Luxury/Trophy Gold (Text Highlights)
//           blue: "#005EB8",     // Team India Blue (Secondary Actions)
//           red: "#E31937",      // RCB Red (Aggressive Actions)
//           white: "#F5F5F5",    // Off-white for better readability on dark
//         },
//       },
//       fontFamily: {
//         // These variables will be defined in app/layout.tsx
//         heading: ["var(--font-bebas)", "sans-serif"], 
//         body: ["var(--font-inter)", "sans-serif"],
//       },
//       backgroundImage: {
//         // Cinematic Gradients
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #D4AF37 0deg, #000000 180deg)',
//         'glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.00) 100%)',
//       },
//       animation: {
//         'spin-slow': 'spin 10s linear infinite',
//         'pulse-gold': 'pulse-gold 3s ease-in-out infinite',
//       },
//       keyframes: {
//         'pulse-gold': {
//           '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
//           '50%': { opacity: '1', transform: 'scale(1.05)' },
//         }
//       }
//     },
//   },
//   plugins: [],
// };
// export default config;

// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // THE ROYAL PALETTE
//         'vk-black': '#050505',
//         'vk-gold': '#D4AF37', // Metallic Gold
//         'vk-blue': '#005CA8', // India Blue
//         'vk-red': '#E31E24',  // RCB Red
//       },
//       fontFamily: {
//         // Matches the fonts we set up in layout.tsx
//         heading: ['var(--font-bebas)'], // Bebas Neue
//         body: ['var(--font-inter)'],    // Inter
//         serif: ['var(--font-cinzel)'],  // Cinzel (Cinematic)
//       },
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//       },
//       animation: {
//         'slow-spin': 'spin 20s linear infinite',
//         'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
//       },
//       keyframes: {
//         'text-shimmer': {
//           '0%': { backgroundPosition: '200% center' },
//           '100%': { backgroundPosition: '-200% center' },
//         }
//       }
//     },
//   },
//   plugins: [
//     // If you used scrollbar-hide in layout.tsx, you might need a plugin here
//     // or just add utility in globals.css (see below)
//   ],
// };
// export default config;

import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. THE ROYAL PALETTE (Extended)
      colors: {
        'vk-black': '#050505',   // Deep Charcoal
        'vk-dark': '#0a0a0a',    // Lighter Charcoal for cards
        'vk-gold': '#D4AF37',    // Standard Metallic Gold
        'vk-gold-light': '#F3E5AB', // Highlight Gold
        'vk-gold-dark': '#AA8C2C',  // Shadow Gold
        'vk-blue': '#005CA8',    // India Blue
        'vk-red': '#E31E24',     // RCB Red
      },
      
      // 2. FONTS
      fontFamily: {
        heading: ['var(--font-bebas)'], // Bebas Neue
        body: ['var(--font-inter)'],    // Inter
        serif: ['var(--font-cinzel)'],  // Cinzel
      },

      // 3. BACKGROUNDS & GRADIENTS
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-shine': 'linear-gradient(to right, #AA8C2C, #F3E5AB, #AA8C2C)',
      },

      // 4. ANIMATION TIMINGS
      animation: {
        'slow-spin': 'spin 20s linear infinite',
        'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
        'subtle-zoom': 'subtle-zoom 20s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'beam': 'beam 2s linear infinite',
      },

      // 5. KEYFRAMES
      keyframes: {
        'text-shimmer': {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'subtle-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'beam': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        }
      },

      // 6. 3D TRANSFORMS
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      }
    },
  },
  
  // 7. CUSTOM PLUGINS (No npm install needed)
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        // Hide Scrollbar Utility
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        
        // 3D Utilities for Card Flips
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.perspective-1000': {
          'perspective': '1000px',
        },
        
        // Text Glow Utility
        '.text-glow-gold': {
          'text-shadow': '0 0 20px rgba(212, 175, 55, 0.5)',
        },
      });
    }),
  ],
};

export default config;