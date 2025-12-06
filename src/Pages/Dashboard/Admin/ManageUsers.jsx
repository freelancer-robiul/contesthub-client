import { useState } from "react";

const initialUsers = [
  { id: "u1", name: "Arif Hossain", email: "arif@example.com", role: "user" },
  { id: "u2", name: "Mitu Akter", email: "mitu@example.com", role: "creator" },
  { id: "u3", name: "Sajid Hasan", email: "sajid@example.com", role: "admin" },
];

const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers);

  const updateRole = (id, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-slate-50">Manage Users</h2>
      <p className="text-xs text-slate-400 mb-4">
        Change user roles as needed. Admins can promote or demote any user.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-900/60">
                <td className="py-2 text-slate-100">{user.name}</td>
                <td className="py-2 text-slate-300">{user.email}</td>
                <td className="py-2 text-slate-300 capitalize">{user.role}</td>

                <td className="py-2 text-right space-x-2">
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
    </div>
  );
};

export default ManageUsers;
