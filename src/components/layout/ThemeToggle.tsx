import { Button } from "../ui/button";
import { useDarkMode, useTheme } from "@/store/useTheme";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const toggleTheme = useTheme((state) => state.toggleTheme);
  const isDarkMode = useDarkMode();
  return (
    <Button
      type="button"
      aria-label="toggle theme"
      className="p-0 m-0 bg-transparent border-none outline-0 cursor-pointer hover:bg-transparent text-ink-black dark:text-platinum"
      onClick={() => toggleTheme()}
    >
      {isDarkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  );
};

export default ThemeToggle;
