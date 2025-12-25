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

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // THE ROYAL PALETTE
        'vk-black': '#050505',
        'vk-gold': '#D4AF37', // Metallic Gold
        'vk-blue': '#005CA8', // India Blue
        'vk-red': '#E31E24',  // RCB Red
      },
      fontFamily: {
        // Matches the fonts we set up in layout.tsx
        heading: ['var(--font-bebas)'], // Bebas Neue
        body: ['var(--font-inter)'],    // Inter
        serif: ['var(--font-cinzel)'],  // Cinzel (Cinematic)
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'slow-spin': 'spin 20s linear infinite',
        'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        'text-shimmer': {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        }
      }
    },
  },
  plugins: [
    // If you used scrollbar-hide in layout.tsx, you might need a plugin here
    // or just add utility in globals.css (see below)
  ],
};
export default config;