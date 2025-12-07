// src/Components/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium px-3 py-1 rounded-full transition ${
      isActive
        ? "bg-indigo-500 text-slate-950"
        : theme === "dark"
        ? "text-slate-200 hover:bg-slate-800"
        : "text-slate-800 hover:bg-slate-200"
    }`;

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header
      className={
        theme === "dark"
          ? "border-b border-slate-800/80"
          : "border-b border-slate-200"
      }
    >
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
            <span className="font-semibold tracking-wide">ContestHub</span>
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

        {/* Right: theme toggle + auth */}
        <div className="flex items-center gap-2 relative">
          <button
            type="button"
            onClick={toggleTheme}
            className={`h-8 w-8 rounded-full border flex items-center justify-center text-lg ${
              theme === "dark"
                ? "border-slate-700 hover:bg-slate-800"
                : "border-slate-300 hover:bg-slate-100"
            }`}
            title="Toggle theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="h-8 w-8 rounded-full overflow-hidden border border-slate-700"
              >
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-800 bg-slate-950/95 text-xs shadow-lg z-20">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="font-semibold text-slate-50 truncate">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/dashboard");
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-900"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-red-300 hover:bg-slate-900"
                  >
                    Logout
                  </button>
                </div>
              )}
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
