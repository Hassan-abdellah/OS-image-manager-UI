import { authPaths, publicRoutes } from "@/data/routePaths";
import { Show, UserButton } from "@clerk/react";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { useDarkMode, useTheme } from "@/store/useTheme";

const Navbar = () => {
  const toggleTheme = useTheme((state) => state.toggleTheme);
  const isDarkMode = useDarkMode();

  return (
    <header className="bg-platinum text-ink-black dark:bg-black dark:text-platinum sticky z-50 top-0 left-0 right-0 w-full h-(--nav-height) backdrop-blur-3xl flex items-center">
      <nav className="container flex items-center justify-between">
        {/* logo */}

        <Link to={"/"} className="text-xl">
          ImgSH
        </Link>
        {/* Theme toggle */}
        <Button
          type="button"
          aria-label="toggle theme"
          className="p-0 m-0 bg-transparent border-none outline-0 cursor-pointer hover:bg-transparent dark:text-platinum"
          onClick={() => toggleTheme()}
        >
          {isDarkMode ? (
            <Sun className="size-5" />
          ) : (
            <Moon className="size-5" />
          )}
        </Button>
        {/* links */}
        <ul className="flex items-center gap-2.5">
          {/* public routes */}
          <Show when="signed-out">
            {publicRoutes.map((route) => (
              <li key={route.href}>
                <Link to={route.href}>{route.label}</Link>
              </li>
            ))}
          </Show>
          <Show when="signed-in">
            {/* @TODO: protected routes */}
            <li className="mt-1">
              <UserButton signInUrl={authPaths.login} />
            </li>
          </Show>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
