import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function AdminLayout() {
  const { user } = useAuth();
  const { theme } = useTheme();

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center mt-10 text-red-400">
        Access denied. Admin only.
      </div>
    );
  }

  const menuItem =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition";

  const activeStyle = "bg-indigo-500 text-slate-950 font-semibold shadow-sm";

  const inactiveStyle =
    theme === "dark"
      ? "text-slate-300 hover:bg-slate-800"
      : "text-slate-700 hover:bg-slate-200";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`w-60 border-r ${
          theme === "dark"
            ? "border-slate-800 bg-slate-950"
            : "border-slate-200 bg-white"
        } p-4 flex flex-col`}
      >
        <div className="mb-6">
          <p className="font-bold text-lg">Admin Panel</p>
          <p className="text-xs text-slate-400 truncate">{user.email}</p>
        </div>

        <nav className="flex flex-col gap-1">
          <NavLink
            to="/admin-dashboard/users"
            className={({ isActive }) =>
              `${menuItem} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            👥 Manage Users
          </NavLink>

          <NavLink
            to="/admin-dashboard/contests"
            className={({ isActive }) =>
              `${menuItem} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            🏆 Manage Contests
          </NavLink>
        </nav>

        <div className="mt-auto text-xs text-slate-500">
          ContestHub Admin • 2025
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
