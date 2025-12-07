// src/Layouts/AdminDashboardLayout.jsx
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  const linkBase =
    "px-4 py-2 rounded-full text-xs font-medium transition border";
  const active = "bg-emerald-500 text-slate-950 border-emerald-500 shadow-sm";
  const inactive =
    "bg-slate-900/60 text-slate-300 border-slate-700 hover:bg-slate-800";

  return (
    <div className="grid md:grid-cols-[260px,1fr] gap-6 mt-6">
      {/* Sidebar */}
      <aside className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
        <h2 className="text-base font-semibold text-slate-50 mb-1">
          Admin Dashboard
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          Manage users and control all contests across the platform.
        </p>

        <nav className="flex flex-col gap-2 text-xs">
          <NavLink
            to="/admin-dashboard/users"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Manage users
          </NavLink>
          <NavLink
            to="/admin-dashboard/contests"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Manage contests
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
        <Outlet />
      </section>
    </div>
  );
};

export default AdminDashboardLayout;
