// src/Pages/Dashboard/Admin/ManageContests.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import toast from "react-hot-toast";

const fetchContests = async (status) => {
  const res = await api.get("/contests", {
    params: { status },
  });
  return res.data;
};

const ManageContests = () => {
  const [statusFilter, setStatusFilter] = useState("pending");
  const queryClient = useQueryClient();

  const {
    data: contests = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-contests", statusFilter],
    queryFn: () => fetchContests(statusFilter),
  });

  const makeMutation = (url, method = "patch") =>
    useMutation({
      mutationFn: async (id) => {
        const res =
          method === "delete"
            ? await api.delete(url(id))
            : await api.patch(url(id));
        return res.data;
      },
      onSuccess: (data) => {
        toast.success(data?.message || "Updated successfully");
        queryClient.invalidateQueries({ queryKey: ["admin-contests"] });
        queryClient.invalidateQueries({ queryKey: ["contests"] });
      },
      onError: (err) => {
        const msg =
          err?.response?.data?.message || "Action failed. Please try again.";
        toast.error(msg);
      },
    });

  const { mutateAsync: approveContest, isPending: approving } = makeMutation(
    (id) => `/contests/${id}/approve`,
    "patch"
  );

  const { mutateAsync: rejectContest, isPending: rejecting } = makeMutation(
    (id) => `/contests/${id}/reject`,
    "patch"
  );

  const { mutateAsync: deleteContest, isPending: deleting } = makeMutation(
    (id) => `/contests/${id}`,
    "delete"
  );

  const handleApprove = async (contest) => {
    await approveContest(contest._id);
  };

  const handleReject = async (contest) => {
    await rejectContest(contest._id);
  };

  const handleDelete = async (contest) => {
    const ok = window.confirm(`Delete contest "${contest.name}" permanently?`);
    if (!ok) return;
    await deleteContest(contest._id);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">
            Manage contests
          </h2>
          <p className="text-xs text-slate-400">
            Review new contests, approve or reject them and remove any
            inappropriate content.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Filter by status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-100 outline-none focus:border-emerald-400"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {isLoading && (
        <div className="py-6 text-sm text-slate-300">Loading contests...</div>
      )}

      {isError && (
        <div className="py-6 text-sm text-red-300">
          Failed to load contests: {error?.message}
        </div>
      )}

      {!isLoading && !isError && contests.length === 0 && (
        <div className="py-6 text-sm text-slate-400">
          No contests found for this filter.
        </div>
      )}

      {!isLoading && !isError && contests.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Contest</th>
                <th className="px-3 py-2 text-left font-medium">Creator</th>
                <th className="px-3 py-2 text-left font-medium">Entry</th>
                <th className="px-3 py-2 text-left font-medium">Prize</th>
                <th className="px-3 py-2 text-left font-medium">Status</th>
                <th className="px-3 py-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((c) => (
                <tr
                  key={c._id}
                  className="border-t border-slate-800/80 hover:bg-slate-900/50"
                >
                  <td className="px-3 py-2 align-top">
                    <div className="text-slate-50 font-medium line-clamp-2">
                      {c.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Type:{" "}
                      <span className="capitalize">
                        {c.contestType?.replace("-", " ")}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 align-top text-slate-300">
                    <div className="text-xs">{c.creator?.name}</div>
                    <div className="text-[11px] text-slate-500">
                      {c.creator?.email}
                    </div>
                  </td>
                  <td className="px-3 py-2 align-top text-slate-300">
                    ${Number(c.price || 0).toFixed(2)}
                  </td>
                  <td className="px-3 py-2 align-top text-emerald-300">
                    ${Number(c.prizeMoney || 0).toFixed(2)}
                  </td>
                  <td className="px-3 py-2 align-top">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        c.status === "pending"
                          ? "bg-amber-500/10 text-amber-300 border border-amber-500/40"
                          : c.status === "approved"
                          ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                          : "bg-red-500/10 text-red-300 border border-red-500/40"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 align-top text-right">
                    <div className="inline-flex gap-1">
                      <button
                        type="button"
                        disabled={approving || c.status === "approved"}
                        onClick={() => handleApprove(c)}
                        className="px-2 py-1 rounded-full border border-emerald-500 text-[11px] text-emerald-200 hover:bg-emerald-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        disabled={rejecting || c.status === "rejected"}
                        onClick={() => handleReject(c)}
                        className="px-2 py-1 rounded-full border border-amber-500 text-[11px] text-amber-200 hover:bg-amber-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        disabled={deleting}
                        onClick={() => handleDelete(c)}
                        className="px-2 py-1 rounded-full border border-red-500 text-[11px] text-red-200 hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Delete
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

export default ManageContests;
