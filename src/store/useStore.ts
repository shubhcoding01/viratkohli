import { create } from 'zustand';

interface AppState {
  // 1. Loading State
  // Determines if the 3D model has finished loading to hide the loading screen
  isLoaded: boolean;
  setIsLoaded: (status: boolean) => void;

  // 2. The "King's Mood" (Controls 3D Lighting & Colors)
  // 'idle'       = Dark Cinematic (Default)
  // 'aggressive' = RCB Red/Gold (Fire effects/Aggressive stats)
  // 'classic'    = Team India Blue (Calm/Records)
  mode: 'idle' | 'aggressive' | 'classic';
  setMode: (mode: 'idle' | 'aggressive' | 'classic') => void;

  // 3. Navigation / Scroll Tracker
  // 0 = Hero Section
  // 1 = Stats Section
  // 2 = Career Timeline
  currentSection: number;
  setCurrentSection: (index: number) => void;

  // 4. Interaction (Zooming)
  // If user clicks a trophy or bat, we store its ID here to zoom the camera in
  focusedItem: string | null;
  setFocusedItem: (item: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial Values
  isLoaded: false,
  mode: 'idle',
  currentSection: 0,
  focusedItem: null,

  // Actions (Functions to change state)
  setIsLoaded: (status) => set({ isLoaded: status }),
  setMode: (mode) => set({ mode }),
  setCurrentSection: (index) => set({ currentSection: index }),
  setFocusedItem: (item) => set({ focusedItem: item }),
}));