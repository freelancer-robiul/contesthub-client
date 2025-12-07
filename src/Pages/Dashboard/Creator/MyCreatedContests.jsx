// src/Pages/Dashboard/Creator/MyCreatedContests.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

const fetchMyContests = async () => {
  const res = await api.get("/contests/mine");
  return res.data;
};

const MyCreatedContests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: contests = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-contests"],
    queryFn: fetchMyContests,
  });

  const { mutateAsync: deleteContest, isPending: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/contests/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Contest deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["my-contests"] });
      queryClient.invalidateQueries({ queryKey: ["contests"] });
    },
    onError: (err) => {
      const msg =
        err?.response?.data?.message ||
        "Failed to delete contest. Please try again.";
      toast.error(msg);
    },
  });

  const handleDelete = async (contest) => {
    if (contest.status !== "pending") {
      toast.error("Only pending contests can be deleted.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${contest.name}"?`
    );
    if (!confirmed) return;

    await deleteContest(contest._id);
  };

  const handleEdit = (contest) => {
    if (contest.status !== "pending") {
      toast.error("Only pending contests can be edited.");
      return;
    }
    navigate(`/creator-dashboard/edit/${contest._id}`);
  };

  const handleSubmissions = (contest) => {
    navigate(`/creator-dashboard/submissions/${contest._id}`);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-slate-50">
        My created contests
      </h2>
      <p className="text-xs text-slate-400 mb-4">
        Monitor the status of your contests, update pending ones and check
        participant submissions.
      </p>

      {!user || (user.role !== "creator" && user.role !== "admin") ? (
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
          You are currently logged in as a{" "}
          <span className="font-semibold">{user?.role || "guest"}</span>. Only
          creators or admins can manage contests.
        </div>
      ) : null}

      {isLoading && (
        <div className="py-8 text-sm text-slate-300">Loading contests...</div>
      )}

      {isError && (
        <div className="py-8 text-sm text-red-300">
          Failed to load contests: {error?.message}
        </div>
      )}

      {!isLoading && !isError && contests.length === 0 && (
        <div className="py-8 text-sm text-slate-400">
          You haven't created any contests yet. Start by creating your first
          contest from the "Add contest" tab.
        </div>
      )}

      {!isLoading && !isError && contests.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Name</th>
                <th className="px-3 py-2 text-left font-medium">Type</th>
                <th className="px-3 py-2 text-left font-medium">Entry</th>
                <th className="px-3 py-2 text-left font-medium">Prize</th>
                <th className="px-3 py-2 text-left font-medium">Deadline</th>
                <th className="px-3 py-2 text-left font-medium">Status</th>
                <th className="px-3 py-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => {
                const deadline = new Date(contest.deadline);
                const isPending = contest.status === "pending";
                const isApproved = contest.status === "approved";
                const isRejected = contest.status === "rejected";

                return (
                  <tr
                    key={contest._id}
                    className="border-t border-slate-800/80 hover:bg-slate-900/50"
                  >
                    <td className="px-3 py-2 align-top">
                      <div className="text-slate-50 font-medium line-clamp-2">
                        {contest.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Participants:{" "}
                        <span className="text-slate-200">
                          {contest.participantsCount || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top text-slate-300 capitalize">
                      {contest.contestType?.replace("-", " ")}
                    </td>
                    <td className="px-3 py-2 align-top text-slate-300">
                      ${Number(contest.price || 0).toFixed(2)}
                    </td>
                    <td className="px-3 py-2 align-top text-emerald-300">
                      ${Number(contest.prizeMoney || 0).toFixed(2)}
                    </td>
                    <td className="px-3 py-2 align-top text-slate-300">
                      <div>{deadline.toLocaleDateString()}</div>
                      <div className="text-[11px] text-slate-500">
                        {deadline.toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                          isPending
                            ? "bg-amber-500/10 text-amber-300 border border-amber-500/40"
                            : isApproved
                            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                            : isRejected
                            ? "bg-red-500/10 text-red-300 border border-red-500/40"
                            : "bg-slate-700/50 text-slate-200 border border-slate-600"
                        }`}
                      >
                        {contest.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top text-right">
                      <div className="inline-flex flex-wrap gap-1 justify-end">
                        <button
                          type="button"
                          onClick={() => handleSubmissions(contest)}
                          className="px-2 py-1 rounded-full border border-slate-700 text-[11px] text-slate-200 hover:bg-slate-800"
                        >
                          See submissions
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEdit(contest)}
                          disabled={!isPending}
                          className={`px-2 py-1 rounded-full text-[11px] border ${
                            isPending
                              ? "border-indigo-500 text-indigo-200 hover:bg-indigo-500/10"
                              : "border-slate-700 text-slate-500 cursor-not-allowed"
                          }`}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(contest)}
                          disabled={!isPending || isDeleting}
                          className={`px-2 py-1 rounded-full text-[11px] border ${
                            isPending && !isDeleting
                              ? "border-red-500 text-red-200 hover:bg-red-500/10"
                              : "border-slate-700 text-slate-500 cursor-not-allowed"
                          }`}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyCreatedContests;
