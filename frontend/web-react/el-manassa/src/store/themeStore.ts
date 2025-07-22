import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  currentPalette: string;
  mode: 'light' | 'dark';
  direction: 'ltr' | 'rtl';
  setPalette: (palette: string) => void;
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
  setDirection: (direction: 'ltr' | 'rtl') => void;
  toggleDirection: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentPalette: 'ocean',
      mode: 'light',
      direction: 'ltr',
      
      setPalette: (palette) => set({ currentPalette: palette }),
      
      setMode: (mode) => set({ mode }),
      
      toggleMode: () => set((state) => ({
        mode: state.mode === 'light' ? 'dark' : 'light',
      })),
      
      setDirection: (direction) => set({ direction }),
      
      toggleDirection: () => set((state) => ({
        direction: state.direction === 'ltr' ? 'rtl' : 'ltr',
      })),
    }),
    {
      name: 'theme-storage',
    }
  )
);