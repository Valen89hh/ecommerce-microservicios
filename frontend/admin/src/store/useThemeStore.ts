import { create } from 'zustand';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  const storedTheme = (typeof window !== 'undefined' && localStorage.getItem('theme')) as Theme | null;
  const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme: Theme = storedTheme ?? (prefersDark ? 'dark' : 'light');

  // Set the initial theme in localStorage and document
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    localStorage.setItem('theme', initialTheme);
  }

  return {
    theme: initialTheme,
    setTheme: (theme: Theme) => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
      }
      set({ theme });
    },
    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', newTheme === 'dark');
          localStorage.setItem('theme', newTheme);
        }
        return { theme: newTheme };
      }),
  };
});
