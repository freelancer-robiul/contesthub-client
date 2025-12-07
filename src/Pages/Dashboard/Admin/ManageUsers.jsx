// src/Pages/Dashboard/Admin/ManageUsers.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import toast from "react-hot-toast";

const fetchUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

const ManageUsers = () => {
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchUsers,
  });

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

  const handleRoleChange = async (userId, role) => {
    await changeRole({ userId, role });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-slate-50">Manage users</h2>
      <p className="text-xs text-slate-400 mb-4">
        Promote creators, assign admins and manage access across the platform.
      </p>

      {isLoading && (
        <div className="py-6 text-sm text-slate-300">Loading users...</div>
      )}

      {isError && (
        <div className="py-6 text-sm text-red-300">
          Failed to load users: {error?.message}
        </div>
      )}

      {!isLoading && !isError && users.length === 0 && (
        <div className="py-6 text-sm text-slate-400">No users found yet.</div>
      )}

      {!isLoading && !isError && users.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-3 py-2 text-left font-medium">User</th>
                <th className="px-3 py-2 text-left font-medium">Email</th>
                <th className="px-3 py-2 text-left font-medium">Role</th>
                <th className="px-3 py-2 text-right font-medium">
                  Change role
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
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
                  <td className="px-3 py-2 align-top text-slate-200 capitalize">
                    {u.role}
                  </td>
                  <td className="px-3 py-2 align-top text-right">
                    <div className="inline-flex gap-1">
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleRoleChange(u._id, "user")}
                        className="px-2 py-1 rounded-full border border-slate-700 text-[11px] text-slate-200 hover:bg-slate-800"
                      >
                        User
                      </button>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleRoleChange(u._id, "creator")}
                        className="px-2 py-1 rounded-full border border-indigo-500 text-[11px] text-indigo-200 hover:bg-indigo-500/10"
                      >
                        Creator
                      </button>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleRoleChange(u._id, "admin")}
                        className="px-2 py-1 rounded-full border border-emerald-500 text-[11px] text-emerald-200 hover:bg-emerald-500/10"
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
