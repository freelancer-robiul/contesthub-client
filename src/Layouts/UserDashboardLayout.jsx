// src/Layouts/UserDashboardLayout.jsx
import { NavLink, Outlet } from "react-router-dom";

const UserDashboardLayout = () => {
  const navLinkClass = ({ isActive }) =>
    [
      "block rounded-xl px-3 py-2 text-sm font-medium transition",
      isActive
        ? "bg-indigo-500 text-slate-950"
        : "text-slate-200 hover:bg-slate-800",
    ].join(" ");

  return (
    <div className="pt-6 pb-10">
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">
          My Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          Track your contests, wins and profile from a single place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[220px,1fr]">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3 space-y-2">
          <p className="text-xs text-slate-400 px-1 mb-1">User menu</p>
          <NavLink to="/dashboard/participated" className={navLinkClass}>
            My Participated Contests
          </NavLink>
          <NavLink to="/dashboard/winnings" className={navLinkClass}>
            My Winning Contests
          </NavLink>
          <NavLink to="/dashboard/profile" className={navLinkClass}>
            My Profile
          </NavLink>
        </aside>

        {/* Main content */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
