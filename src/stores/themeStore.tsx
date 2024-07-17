import { create } from 'zustand';

type ThemeStore = {
    isDarkMode: boolean;
    toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
    isDarkMode: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('isDarkMode') || 'false') : false,
    toggleTheme: () => set((state) => {
        localStorage.setItem('isDarkMode', JSON.stringify(!state.isDarkMode))
        return { isDarkMode: !state.isDarkMode };
    }),
}))