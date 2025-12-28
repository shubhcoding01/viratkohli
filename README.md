# 👑 Virat Kohli 3D Portfolio - The King's Arena

A high-performance, cinematic portfolio website dedicated to the G.O.A.T, Virat Kohli. This project pushes the boundaries of web development by combining immersive 3D rendering with broadcast-quality motion graphics and a "King-Level" user experience.

> **Status:** Active Development
> **Stack:** Next.js 16, React 19, Three.js (R3F), Framer Motion, Tailwind CSS v4

---

## ⚡ Key Features (Implemented)

We have moved beyond standard web design to create a "Hype" experience:

### 🎬 1. "The Hype" Loading Screen
* **Video Integration:** Seamlessly loops `sign.mp4` (Virat signing the camera) as the base layer.
* **Glitch Overlay:** Rapid-fire 0.08s image cycling of historical milestones (2008-2025) mixed with a scanline overlay.
* **Time-Based Loading:** Custom 3.5s "Hype Cycle" that forces a high-energy build-up before the site reveals.
* **Liquid Gold Animation:** A custom CSS fluid fill effect on the percentage counter.

### 🌓 2. Cinematic Hero Section
* **Split-Screen Gradient:** A custom `linear-gradient` mask that renders the left side pitch-black for readability while fading the right side into the Hero Image.
* **Smart Countdown:** Real-time logic that automatically detects the *next* match date (checking against current time) and starts a countdown.
* **Parallax Watermark:** Mouse-tracking "18" background watermark that moves in opposition to the cursor.

### ⏳ 3. Sticky Career Timeline
* **Scroll-Triggered Cross-Fade:** A fixed `sticky` background layer that smoothly fades between era-specific wallpapers (Grayscale → Blur → Visible) as the user scrolls.
* **3D Flip Cards:** Interactive timeline cards that flip 180° on hover to reveal hidden stats/images.
* **Negative Margin Layering:** Advanced CSS layering using `-mt-[100vh]` to pull content over a fixed visual layer.

### 🔦 4. Spotlight Stats Grid
* **Mouse-Tracking Spotlight:** A radial gradient that follows the user's cursor across the grid, revealing the border and grid texture only where the mouse hovers.
* **3D Tilt:** Cards tilt subtly based on mouse position using `framer-motion` transforms.

---

## 🚀 How to Install & Run

### Step 1: Clone the Repository
Open your terminal and run the following command to download the code:

```bash
git clone [https://github.com/shubhcoding01/viratkohli.git](https://github.com/shubhcoding01/viratkohli.git)
cd viratkohli
Step 2: Install Required Packages
This project uses Next.js 16 and React 19. Run this command to install all dependencies listed in package.json.

Bash

npm install
Tip: If you see peer dependency errors due to React 19, run: npm install --legacy-peer-deps

Step 3: Run the Arena
Start the local development server:

Bash

npm run dev
Open http://localhost:3000 in your browser to enter the arena.

🛠️ Required Packages (Dependencies)
To run this project successfully, your package.json must include these key libraries. If you are starting from scratch, install them using the commands below.

1. The 3D Engine (Three.js & R3F)
These packages power the "Stadium" and 3D Models.

Bash

npm install three @types/three @react-three/fiber @react-three/drei
2. Cinematic Effects (Post-Processing)
Required for the Bloom (Glow), Glitch, and Vignette effects.

Bash

npm install @react-three/postprocessing postprocessing
3. Physics & Interactions
Required for realistic collisions (if adding balls/objects).

Bash

npm install @react-three/rapier
4. Animation & Motion
Framer Motion handles the UI (Loading Screen, Hero Split), while GSAP handles complex 3D camera timelines.

Bash

npm install framer-motion gsap @gsap/react
5. UI, State & Utils
Zustand manages the global state (Idle vs Aggressive mode). Lenis provides the smooth luxury scrolling.

Bash

npm install zustand lenis clsx tailwind-merge howler
📂 Project Structure
This project follows the "Canvas vs. DOM" separation pattern to prevent hydration errors and ensure performance.

Plaintext

src/
├── app/                  # Next.js App Router
│   ├── (sections)/       # Logical Sections (Hero, Stats, Career)
│   ├── layout.tsx        # Global Font & Metadata
│   └── page.tsx          # Main Entry (Composes sections)
├── components/
│   ├── canvas/           # 3D Components (Must go inside <Canvas>)
│   │   ├── Scene.tsx     # The 3D World Wrapper
│   │   ├── Effects.tsx   # Bloom, Vignette, Glitch
│   │   └── Avatar.tsx    # Virat 3D Model
│   ├── dom/              # 2D UI Components (Standard HTML)
│   │   ├── LoadingScreen # The Hype Reel
│   │   ├── Navbar.tsx    # Navigation
│   │   └── StatCard.tsx  # Spotlight Cards
│   └── ui/               # Reusable primitives
├── hooks/
│   └── useMouse.ts       # Custom hook for parallax/spotlight math
├── store/
│   └── useStore.ts       # Global Zustand State
└── public/               # Assets
    ├── images/           # Milestones (virat2011.png, viratbg1.png)
    ├── videos/           # sign.mp4
    └── models/           # .glb 3D files
🎨 Asset Credits
Font: Geist (Vercel) & Custom Sports Heading Font.

Images: Virat Kohli Official / BCCI / ICC (Used for educational/portfolio demonstration).

Video: sign.mp4 (Fan Edit / Commercial snippet).

"I don't play for records, I play for the win." — Virat Kohli