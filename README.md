<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->


# 👑 Virat Kohli 3D Portfolio - The King's Arena

A high-performance, immersive 3D portfolio website dedicated to Virat Kohli. This project pushes the boundaries of web development by combining cinematic 3D rendering with a "King-Level" user experience.

> **Status:** Active Development
> **Stack:** Next.js 15, Three.js, React Three Fiber, GSAP, Tailwind CSS

---

## 🚀 Quick Start

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/virat-portfolio.git](https://github.com/your-username/virat-portfolio.git)
    cd virat-portfolio
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to enter the arena.

---

## 🛠️ The "King's Stack" (Package Breakdown)

We carefully selected every package to balance **Visual Fidelity (Graphics)** with **High Performance (Speed)**.

### 1. Core Framework & Language
| Package | Version | Use Case in This Project |
| :--- | :--- | :--- |
| **`next`** | `Latest` | The React framework. Handles Routing, SSR (Server-Side Rendering) for SEO, and Image Optimization. |
| **`react`** | `Latest` | The UI library. |
| **`typescript`** | `Latest` | Adds static types to JavaScript. Prevents crashes by ensuring we don't pass a "text" value to a "number" math function. |

### 2. The 3D Engine (The Stadium)
| Package | Use Case |
| :--- | :--- |
| **`three`** | The raw 3D engine that draws graphics on the screen (WebGL). |
| **`@react-three/fiber`** | The bridge that lets us write Three.js code using simple React Components (e.g., `<mesh />` instead of `new THREE.Mesh()`). |
| **`@react-three/drei`** | A collection of useful helpers. We use it for **OrbitControls** (camera movement), **Environment** (lighting presets), and **useGLTF** (loading 3D models). |
| **`three-stdlib`** | Provides advanced shader materials and geometries not included in the core Three.js package. |

### 3. Animation & Cinematics (The "Motion")
| Package | Use Case |
| :--- | :--- |
| **`gsap`** | **GreenSock Animation Platform.** Used for complex "cinematic" sequences (e.g., The camera flying from the locker room to the pitch). It handles precise timing better than CSS. |
| **`@gsap/react`** | The official helper to use GSAP safely inside React components. |
| **`framer-motion`** | Used for **2D UI Animations**. It handles the "fading in" of text, menus, and buttons floating *over* the 3D scene. |

### 4. Physics & Realism (The "Feel")
| Package | Use Case |
| :--- | :--- |
| **`@react-three/rapier`** | A high-performance physics engine. It allows objects (like a cricket ball) to have gravity, bounce, and collide with the ground realistically. |

### 5. Visual Effects (The "Look")
| Package | Use Case |
| :--- | :--- |
| **`@react-three/postprocessing`** | Adds "Photoshop-like" filters to the 3D scene. |
| **`postprocessing`** | The core library powering the above. |
| *Effect: Bloom* | Makes neon lights, stadium floodlights, and golden text "glow." |
| *Effect: DepthOfField* | Blurs the background crowd to focus the user's eye on Virat (Cinematic Focus). |
| *Effect: Vignette* | Darkens the corners of the screen for a dramatic look. |

### 6. UI & Styling (The Overlay)
| Package | Use Case |
| :--- | :--- |
| **`tailwindcss`** | The industry standard for styling. Used to create the HUD (Heads-Up Display), menus, and text overlays efficiently. |
| **`clsx`** | A tiny utility to construct CSS class strings conditionally (e.g., changing button color dynamically based on state). |
| **`tailwind-merge`** | Ensures that if we pass a custom style to a component, it properly overrides the default Tailwind style without conflict. |
| **`@radix-ui/react-dialog`** | Provides accessible, unstyled "Modal/Popup" logic. Used for opening detailed stats cards when a user clicks a trophy. |
| **`@radix-ui/react-tooltip`** | Provides accessible tooltips when hovering over 3D elements. |

### 7. State & Logic (The "Brain")
| Package | Use Case |
| :--- | :--- |
| **`zustand`** | A lightweight global state manager. It acts as the "Bridge" connecting the HTML buttons to the 3D Scene. (e.g., Clicking "Aggressive Mode" in HTML -> Tells 3D Model to change animation). |

### 8. User Experience & Performance
| Package | Use Case |
| :--- | :--- |
| **`lenis`** | **Smooth Scrolling.** Normal browser scrolling is choppy. Lenis adds "momentum" scrolling, making the site feel luxurious and syncing perfectly with 3D camera moves. |
| **`react-intersection-observer`** | **Performance Saver.** Detects when a 3D section is off-screen and tells the computer to stop rendering it to save battery/GPU. |
| **`howler`** | **Audio Manager.** Handles the playback of background ambience (crowd noise) and UI sound effects (clicks) consistently across all browsers. |
| **`leva`** | **Developer Tool.** Adds a floating control panel (GUI) to the screen during development. Allows us to tweak light intensity, colors, and positions in real-time without changing code. |

---

## 📂 Project Structure

This project follows the **"Canvas vs. DOM"** separation pattern to prevent hydration errors and ensure performance.

```text
src/
├── app/                  # Next.js Pages (The Routes)
├── components/
│   ├── canvas/           # 3D Components (Must go inside <Canvas>)
│   ├── dom/              # 2D UI Components (Standard HTML)
│   └── ui/               # Reusable primitives (Buttons, Modals)
├── public/               # Static Assets (Models .glb, Textures .jpg)
└── store/                # Zustand State (The Data Layer)