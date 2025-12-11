// src/Pages/Dashboard/Admin/ManageUsers.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

const fetchUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const { user: loggedInUser } = useAuth();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchUsers,
  });

  // 👉 Admin গুলো (বিশেষ করে নিজের row) UI থেকে hide করছি
  const visibleUsers = users.filter((u) => u.role !== "admin");

  const { mutateAsync: changeRole, isPending } = useMutation({
    mutationFn: async ({ userId, role }) => {
      const res = await api.patch(`/admin/users/${userId}/role`, { role });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Role updated");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (err) => {
      const msg =
        err?.response?.data?.message || "Failed to update role. Try again.";
      toast.error(msg);
    },
  });

  const handleRoleChange = async (userId, targetRole, currentRole) => {
    if (targetRole === currentRole) return; // একই role হলে কিছু করার দরকার নেই
    await changeRole({ userId, role: targetRole });
  };

  const roleBadgeClasses = (role) => {
    if (role === "admin")
      return "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40";
    if (role === "creator")
      return "bg-indigo-500/10 text-indigo-300 border border-indigo-500/40";
    return "bg-slate-700/40 text-slate-200 border border-slate-600";
  };

  const roleButtonClasses = (isActive, color) => {
    const base =
      "px-2 py-1 rounded-full border text-[11px] transition disabled:opacity-40 disabled:cursor-not-allowed";
    if (isActive) {
      if (color === "user")
        return (
          base + " bg-slate-200 text-slate-900 border-slate-200 cursor-default"
        );
      if (color === "creator")
        return (
          base + " bg-indigo-500 text-slate-50 border-indigo-500 cursor-default"
        );
      if (color === "admin")
        return (
          base +
          " bg-emerald-500 text-slate-950 border-emerald-500 cursor-default"
        );
    }
    if (color === "user")
      return base + " border-slate-600 text-slate-200 hover:bg-slate-800";
    if (color === "creator")
      return base + " border-indigo-500 text-indigo-200 hover:bg-indigo-500/10";
    if (color === "admin")
      return (
        base + " border-emerald-500 text-emerald-200 hover:bg-emerald-500/10"
      );
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1 text-slate-50">Manage users</h2>
      <p className="text-xs text-slate-400 mb-4">
        Promote trusted creators, assign admins and manage access.
      </p>

      {isLoading && (
        <div className="py-6 text-sm text-slate-300">Loading users...</div>
      )}

      {isError && (
        <div className="py-6 text-sm text-red-300">
          Failed to load users: {error?.message}
        </div>
      )}

      {!isLoading && !isError && visibleUsers.length === 0 && (
        <div className="py-6 text-sm text-slate-400">
          No non-admin users found.
        </div>
      )}

      {!isLoading && !isError && visibleUsers.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-3 py-2 text-left font-medium">User</th>
                <th className="px-3 py-2 text-left font-medium">Email</th>
                <th className="px-3 py-2 text-left font-medium">Role</th>
                <th className="px-3 py-2 text-left font-medium">Stats</th>
                <th className="px-3 py-2 text-right font-medium">
                  Change role
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleUsers.map((u) => (
                <tr
                  key={u._id}
                  className="border-t border-slate-800/80 hover:bg-slate-900/50"
                >
                  <td className="px-3 py-2 align-top">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          u.photoURL ||
                          "https://i.ibb.co/9GZ2ZqT/default-avatar.png"
                        }
                        alt={u.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-slate-50 text-xs font-medium">
                          {u.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 align-top text-slate-300">
                    {u.email}
                  </td>
                  <td className="px-3 py-2 align-top">
                    <span
                      className={
                        "inline-flex px-2 py-0.5 rounded-full text-[11px] capitalize " +
                        roleBadgeClasses(u.role)
                      }
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-3 py-2 align-top text-[11px] text-slate-400">
                    <div>
                      Participated:{" "}
                      <span className="text-slate-100">
                        {u.participatedCount || 0}
                      </span>
                    </div>
                    <div>
                      Wins:{" "}
                      <span className="text-emerald-300">
                        {u.winCount || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 align-top text-right">
                    <div className="inline-flex gap-1">
                      <button
                        type="button"
                        disabled={isPending || u.role === "user"}
                        onClick={() => handleRoleChange(u._id, "user", u.role)}
                        className={roleButtonClasses(u.role === "user", "user")}
                      >
                        User
                      </button>
                      <button
                        type="button"
                        disabled={isPending || u.role === "creator"}
                        onClick={() =>
                          handleRoleChange(u._id, "creator", u.role)
                        }
                        className={roleButtonClasses(
                          u.role === "creator",
                          "creator"
                        )}
                      >
                        Creator
                      </button>
                      <button
                        type="button"
                        disabled={isPending || u.role === "admin"}
                        onClick={() => handleRoleChange(u._id, "admin", u.role)}
                        className={roleButtonClasses(
                          u.role === "admin",
                          "admin"
                        )}
                      >
                        Admin
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
