// src/Components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  // TODO: replace with real auth context later
  const user = {
    name: "Demo User",
    photoURL: "https://i.pravatar.cc/40?u=demo",
    role: "creator",
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium px-3 py-1 rounded-full transition ${
      isActive
        ? "bg-indigo-500 text-slate-950"
        : "text-slate-200 hover:bg-slate-800"
    }`;

  return (
    <header className="border-b border-slate-800/80">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Left: logo */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition"
          >
            <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-xl">
              🎯
            </div>
            <span className="font-semibold tracking-wide text-slate-100">
              ContestHub
            </span>
          </Link>
        </div>

        {/* Middle: nav links */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/all-contests" className={linkClass}>
            All Contests
          </NavLink>
          <NavLink to="/leaderboard" className={linkClass}>
            Leaderboard
          </NavLink>
          <NavLink to="/how-it-works" className={linkClass}>
            How it works
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </div>

        {/* Right: theme toggle + user */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="h-8 w-8 rounded-full border border-slate-700 flex items-center justify-center text-lg hover:bg-slate-800"
            title="Toggle theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-slate-300">
                {user.name}
              </span>
              <Link
                to="/dashboard"
                className="h-8 w-8 rounded-full overflow-hidden border border-slate-700"
              >
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-indigo-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-indigo-600"
            >
              Log in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
