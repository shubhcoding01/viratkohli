import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// --- TYPES ---

// 1. UI STATE: HUD, Menus, Audio
interface UIState {
  currentSection: number;
  isMenuOpen: boolean;
  isAudioEnabled: boolean;
  isMuted: boolean;
  loadingProgress: number; // 0 to 100
  isLoaded: boolean;
}

// 2. WORLD STATE: 3D Scene, Lighting, Camera
interface WorldState {
  mode: 'idle' | 'aggressive' | 'classic' | 'royal';
  focusedItem: string | null; // ID of the trophy/bat being looked at
  hoveredItem: string | null; // For cursor pointer events
  cameraTarget: [number, number, number]; // [x, y, z] for GSAP to animate to
}

// 3. ACTIONS: The only way to change state
interface Actions {
  // UI Actions
  setSection: (index: number) => void;
  toggleMenu: () => void;
  setAudio: (muted: boolean) => void;
  setProgress: (value: number) => void;
  
  // World Actions
  setMode: (mode: WorldState['mode']) => void;
  setFocusedItem: (item: string | null) => void;
  setHoveredItem: (item: string | null) => void;
  updateCameraTarget: (position: [number, number, number]) => void;
}

// COMBINED STORE TYPE
type AppState = UIState & WorldState & Actions;

export const useStore = create<AppState>()(
  subscribeWithSelector((set) => ({
    
    // --- INITIAL STATE ---
    
    // UI Defaults
    currentSection: 0,
    isMenuOpen: false,
    isAudioEnabled: false, // User must interact first to enable audio
    isMuted: false,
    loadingProgress: 0,
    isLoaded: false,

    // World Defaults
    mode: 'idle',
    focusedItem: null,
    hoveredItem: null,
    cameraTarget: [0, 0, 0],

    // --- ACTIONS ---

    setSection: (index) => set({ currentSection: index }),
    
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    
    setAudio: (muted) => set({ isMuted: muted, isAudioEnabled: true }),

    // Automatically handles the "Is Loaded" boolean when progress hits 100
    setProgress: (value) => set((state) => {
      const newProgress = Math.min(100, Math.max(0, value));
      return { 
        loadingProgress: newProgress,
        isLoaded: newProgress >= 100 
      };
    }),

    setMode: (mode) => set({ mode }),
    
    setFocusedItem: (item) => set({ focusedItem: item }),
    
    setHoveredItem: (item) => set({ hoveredItem: item }),

    updateCameraTarget: (position) => set({ cameraTarget: position }),
  }))
);

// --- SELECTORS (For Performance) ---
// Use these in your components to avoid unnecessary re-renders.
// Example: const isMuted = useStore(selectIsMuted);

export const selectIsLoaded = (state: AppState) => state.isLoaded;
export const selectMode = (state: AppState) => state.mode;
export const selectSection = (state: AppState) => state.currentSection;
export const selectAudio = (state: AppState) => ({ muted: state.isMuted, enabled: state.isAudioEnabled });
export const selectProgress = (state: AppState) => state.loadingProgress;
export const selectFocusedItem = (state: AppState) => state.focusedItem;
export const selectHoveredItem = (state: AppState) => state.hoveredItem;
export const selectCameraTarget = (state: AppState) => state.cameraTarget;
export const selectIsMenuOpen = (state: AppState) => state.isMenuOpen;