// src/Layouts/CreatorDashboardLayout.jsx
import { NavLink, Outlet } from "react-router-dom";

const CreatorDashboardLayout = () => {
  const navLinkClass = ({ isActive }) =>
    [
      "block rounded-xl px-3 py-2 text-sm font-medium transition",
      isActive
        ? "bg-emerald-500 text-slate-950"
        : "text-slate-200 hover:bg-slate-800",
    ].join(" ");

  return (
    <div className="pt-6 pb-10">
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">
          Creator Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          Launch new contests and manage your existing challenges.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[220px,1fr]">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3 space-y-2">
          <p className="text-xs text-slate-400 px-1 mb-1">Creator menu</p>
          <NavLink to="/creator-dashboard/add-contest" className={navLinkClass}>
            Add Contest
          </NavLink>
          <NavLink to="/creator-dashboard/my-contests" className={navLinkClass}>
            My Created Contests
          </NavLink>
          <NavLink to="/creator-dashboard/submissions" className={navLinkClass}>
            Submissions
          </NavLink>
        </aside>

        {/* Main area */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default CreatorDashboardLayout;
