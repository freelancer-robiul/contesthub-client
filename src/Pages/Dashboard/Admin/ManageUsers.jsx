// src/Pages/Dashboard/Admin/ManageUsers.jsx
import { useMemo, useState } from "react";

const makeDummyUsers = () => {
  const base = [
    { id: "u1", name: "Arif Hossain", email: "arif@example.com", role: "user" },
    {
      id: "u2",
      name: "Mitu Akter",
      email: "mitu@example.com",
      role: "creator",
    },
    {
      id: "u3",
      name: "Sajid Hasan",
      email: "sajid@example.com",
      role: "admin",
    },
  ];
  // extra users for pagination demo
  for (let i = 4; i <= 25; i++) {
    base.push({
      id: `u${i}`,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role: i % 3 === 0 ? "admin" : i % 2 === 0 ? "creator" : "user",
    });
  }
  return base;
};

const initialUsers = makeDummyUsers();

const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(users.length / pageSize);

  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return users.slice(start, start + pageSize);
  }, [users, currentPage]);

  const updateRole = (id, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-slate-50">Manage Users</h2>
      <p className="text-xs text-slate-400 mb-4">
        Change user roles as needed. Pagination shows 10 users per page.
      </p>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Role</th>
              <th className="py-2 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedUsers.map((user) => (
              <tr key={user.id} className="border-b border-slate-900/60">
                <td className="py-2 px-3 text-slate-100">{user.name}</td>
                <td className="py-2 px-3 text-slate-300">{user.email}</td>
                <td className="py-2 px-3 text-slate-300 capitalize">
                  {user.role}
                </td>
                <td className="py-2 px-3 text-right space-x-2">
                  <button
                    onClick={() => updateRole(user.id, "user")}
                    className="px-2 py-1 rounded bg-slate-800 text-xs hover:bg-slate-700"
                  >
                    User
                  </button>
                  <button
                    onClick={() => updateRole(user.id, "creator")}
                    className="px-2 py-1 rounded bg-indigo-500 text-xs text-slate-950 hover:bg-indigo-600"
                  >
                    Creator
                  </button>
                  <button
                    onClick={() => updateRole(user.id, "admin")}
                    className="px-2 py-1 rounded bg-red-500 text-xs text-slate-950 hover:bg-red-600"
                  >
                    Admin
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-slate-400">
                  No users found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
        <span>
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded border border-slate-700 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-2 py-1 rounded border text-xs ${
                  currentPage === page
                    ? "border-indigo-500 bg-indigo-500 text-slate-950"
                    : "border-slate-700"
                }`}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded border border-slate-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
