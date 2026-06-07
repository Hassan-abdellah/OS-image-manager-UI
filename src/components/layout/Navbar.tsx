import { authPaths, publicRoutes } from "@/data/routePaths";
import { Show, UserButton } from "@clerk/react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-gray-100 sticky z-50 top-0 left-0 right-0 w-full backdrop-blur-3xl">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* logo */}
        <h2>Logo</h2>

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
