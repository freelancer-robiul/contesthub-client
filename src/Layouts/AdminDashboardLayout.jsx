// src/Layouts/AdminDashboardLayout.jsx
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  const linkBase =
    "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition border";
  const active = "bg-emerald-500 text-slate-950 border-emerald-500 shadow-sm";
  const inactive =
    "bg-slate-900/70 text-slate-300 border-slate-800 hover:bg-slate-800";

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-[260px,1fr]">
      {/* Sidebar */}
      <aside className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 h-fit">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-slate-50">
            Admin dashboard
          </h2>
          <p className="text-[11px] text-slate-400 mt-1">
            Oversee users and contests.
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-xs">
          <NavLink
            to="/admin-dashboard/users"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">
              U
            </span>
            <span>Manage users</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/contests"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px]">
              C
            </span>
            <span>Manage contests</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 min-h-[300px]">
        <Outlet />
      </section>
    </div>
  );
};

export default AdminDashboardLayout;
