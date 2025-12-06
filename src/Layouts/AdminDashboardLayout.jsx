import { NavLink, Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  const linkClass = ({ isActive }) =>
    `block rounded-xl px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-red-500 text-slate-950"
        : "text-slate-200 hover:bg-slate-800"
    }`;

  return (
    <div className="pt-6 pb-10">
      <h1 className="text-3xl font-semibold text-slate-50 mb-4">
        Admin Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-[220px,1fr]">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3 space-y-2">
          <p className="text-xs text-slate-400 px-1 mb-1">Admin Menu</p>

          <NavLink to="/admin-dashboard/users" className={linkClass}>
            Manage Users
          </NavLink>

          <NavLink to="/admin-dashboard/contests" className={linkClass}>
            Manage Contests
          </NavLink>
        </aside>

        {/* Main Content */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
