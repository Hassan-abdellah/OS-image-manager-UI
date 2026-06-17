import { create } from "zustand";
import { persist } from "zustand/middleware";

type theme = "light" | "dark";
interface themeState {
  theme: theme;
  toggleTheme: () => void;
}
const applyTheme = (theme: theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};
export const useTheme = create<themeState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set(({ theme }) => {
          const newTheme = theme === "dark" ? "light" : "dark";
          applyTheme(newTheme);
          return {
            theme: newTheme,
          };
        }),
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        // Apply persisted theme on page load
        if (state) applyTheme(state.theme);
      },
    },
  ),
);

export const useDarkMode = () => useTheme((state) => state.theme === "dark");
export const useLightMode = () => useTheme((state) => state.theme === "light");
