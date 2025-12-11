// src/Pages/Dashboard/Creator/MyCreatedContests.jsx
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import { format } from "date-fns";
import toast from "react-hot-toast";

const fetchMyContests = async () => {
  const res = await api.get("/contests/mine");
  return res.data;
};

const MyCreatedContests = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: contests = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["creator-contests"],
    queryFn: fetchMyContests,
  });

  const { mutateAsync: deleteContest, isPending: deleting } = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/contests/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Contest deleted");
      queryClient.invalidateQueries(["creator-contests"]);
    },
    onError: (err) => {
      const msg =
        err?.response?.data?.message ||
        "Failed to delete contest. Please try again.";
      toast.error(msg);
    },
  });

  const handleEdit = (id) => {
    navigate(`/creator-dashboard/edit/${id}`);
  };

  const handleSeeSubmissions = (id) => {
    navigate(`/creator-dashboard/submissions/${id}`);
  };

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

  return (
    <section>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">
            My created contests
          </h2>
          <p className="text-xs text-slate-400">
            Manage contests you have created. Pending contests can still be
            edited or deleted.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="py-6 text-sm text-slate-300">
          Loading your contests...
        </div>
      )}

      {isError && (
        <div className="py-6 text-sm text-red-300">
          Failed to load contests: {error?.message}
        </div>
      )}

      {!isLoading && !isError && contests.length === 0 && (
        <div className="py-8 text-sm text-slate-400">
          You have not created any contests yet.
        </div>
      )}

      {!isLoading && !isError && contests.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Contest</th>
                <th className="px-3 py-2 text-left font-medium">Deadline</th>
                <th className="px-3 py-2 text-left font-medium">Status</th>
                <th className="px-3 py-2 text-left font-medium">
                  Participants
                </th>
                <th className="px-3 py-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => {
                const deadline = contest.deadline
                  ? new Date(contest.deadline)
                  : null;

                return (
                  <tr
                    key={contest._id}
                    className="border-t border-slate-800/70 hover:bg-slate-900/60"
                  >
                    <td className="px-3 py-2 align-top">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            contest.image ||
                            "https://i.ibb.co/3R1YgQZ/placeholder.jpg"
                          }
                          alt={contest.name}
                          className="w-9 h-9 rounded-lg object-cover border border-slate-700"
                        />
                        <div>
                          <p className="text-xs text-slate-50 line-clamp-2">
                            {contest.name}
                          </p>
                          <p className="text-[11px] text-slate-400 capitalize">
                            {contest.contestType?.replace("-", " ")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top text-slate-300">
                      {deadline ? (
                        <span className="text-[11px]">
                          {format(deadline, "d MMM yyyy, h:mm a")}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500">
                          No deadline
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                          contest.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                            : contest.status === "pending"
                            ? "bg-amber-500/10 text-amber-300 border border-amber-500/40"
                            : "bg-red-500/10 text-red-300 border border-red-500/40"
                        }`}
                      >
                        {contest.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top text-slate-200">
                      {contest.participantsCount || 0}
                    </td>
                    <td className="px-3 py-2 align-top">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleSeeSubmissions(contest._id)}
                          className="px-3 py-1 rounded-full border border-sky-500 text-[11px] text-sky-300 hover:bg-sky-500/10"
                        >
                          See submissions
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEdit(contest._id)}
                          disabled={contest.status !== "pending"}
                          className="px-3 py-1 rounded-full border border-indigo-500 text-[11px] text-indigo-300 hover:bg-indigo-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(contest)}
                          disabled={contest.status !== "pending" || deleting}
                          className="px-3 py-1 rounded-full border border-red-500 text-[11px] text-red-300 hover:bg-red-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Delete
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
    </section>
  );
};

export default MyCreatedContests;
