// src/Components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  // TODO: later replace with real auth context
  const user = null;
  // const user = {
  //   name: "Robiul Islam",
  //   photoURL: "https://i.pravatar.cc/100?u=robikul",
  // };

  const navLinkClass = ({ isActive }) =>
    [
      "px-3 py-1 rounded-full text-sm font-medium transition-colors",
      isActive
        ? "bg-slate-100 text-slate-900"
        : "text-slate-200 hover:bg-slate-800/70",
    ].join(" ");

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo + name */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-xl">
            🎯
          </div>
          <span className="font-semibold tracking-wide text-lg">
            ContestHub
          </span>
        </Link>

        {/* Menu links */}
        <nav className="hidden sm:flex items-center gap-2">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/all-contests" className={navLinkClass}>
            All Contests
          </NavLink>
          <NavLink to="/extras" className={navLinkClass}>
            Extra Section
          </NavLink>
        </nav>

        {/* Right side – auth / profile */}
        <div className="flex items-center gap-3">
          {!user && (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-medium text-slate-200 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium px-3 py-1 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                Sign Up
              </Link>
            </div>
          )}

          {user && (
            <div className="relative group">
              <button className="h-9 w-9 rounded-full border border-slate-600 overflow-hidden">
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-800 bg-slate-900/95 shadow-lg opacity-0 scale-95 origin-top-right pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-sm font-semibold text-slate-100 truncate">
                    {user.name}
                  </p>
                </div>
                <div className="py-1">
                  <Link
                    to="/dashboard"
                    className="block px-3 py-1.5 text-sm hover:bg-slate-800/80"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    className="w-full text-left px-3 py-1.5 text-sm text-red-300 hover:bg-slate-800/80"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
