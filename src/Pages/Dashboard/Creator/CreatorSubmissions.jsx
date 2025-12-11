// src/Pages/Dashboard/Creator/CreatorSubmissions.jsx
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import toast from "react-hot-toast";
import { format } from "date-fns";

const fetchContest = async (contestId) => {
  const res = await api.get(`/contests/${contestId}`);
  return res.data;
};

const fetchSubmissions = async (contestId) => {
  const res = await api.get(`/submissions/contest/${contestId}`);
  return res.data; // array
};

const CreatorSubmissions = () => {
  const { contestId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: contest,
    isLoading: contestLoading,
    isError: contestError,
    error: contestErr,
  } = useQuery({
    queryKey: ["contest", contestId],
    queryFn: () => fetchContest(contestId),
    enabled: !!contestId,
  });

  const {
    data: submissions = [],
    isLoading: subsLoading,
    isError: subsError,
    error: subsErr,
  } = useQuery({
    queryKey: ["creator-submissions", contestId],
    queryFn: () => fetchSubmissions(contestId),
    enabled: !!contestId,
  });

  const { mutateAsync: declareWinner, isPending } = useMutation({
    mutationFn: async (submissionId) => {
      const res = await api.patch(
        `/submissions/${submissionId}/declare-winner`
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Winner declared");
      queryClient.invalidateQueries(["creator-submissions", contestId]);
      queryClient.invalidateQueries(["contest", contestId]);
      queryClient.invalidateQueries(["my-winning-contests"]);
      queryClient.invalidateQueries(["leaderboard"]);
    },
    onError: (err) => {
      const msg =
        err?.response?.data?.message ||
        "Failed to declare winner. Please try again.";
      toast.error(msg);
    },
  });

  if (!contestId) {
    return (
      <div className="mt-4 text-sm text-slate-300">
        Select &ldquo;See submissions&rdquo; from one of your contests to view
        participant tasks and declare a winner.
      </div>
    );
  }

  if (contestLoading || subsLoading) {
    return (
      <div className="mt-4 text-sm text-slate-300">Loading submissions...</div>
    );
  }

  if (contestError) {
    return (
      <div className="mt-4 text-sm text-red-300">
        Failed to load contest info: {contestErr?.message}
      </div>
    );
  }

  if (subsError) {
    return (
      <div className="mt-4 text-sm text-red-300">
        Failed to load submissions: {subsErr?.message}
      </div>
    );
  }

  const hasWinner = contest?.winner && contest.winner.id;

  return (
    <section className="space-y-5">
      {/* Contest summary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">
            Submissions for:{" "}
            <span className="text-indigo-300">{contest?.name}</span>
          </h2>
          <p className="text-xs text-slate-400">
            Review participant tasks and declare one official winner for this
            contest.
          </p>
        </div>

        <div className="text-xs text-slate-300">
          <p>
            Total participants:{" "}
            <span className="text-slate-50">
              {contest?.participantsCount || 0}
            </span>
          </p>
          <p>
            Total submissions:{" "}
            <span className="text-slate-50">{submissions?.length || 0}</span>
          </p>
        </div>
      </div>

      {/* Winner highlight (if already declared) */}
      {hasWinner && (
        <div className="rounded-3xl border border-emerald-500/50 bg-emerald-500/5 px-4 py-3 flex items-center gap-3 text-xs">
          <div className="w-9 h-9 rounded-full border border-emerald-400 flex items-center justify-center text-lg">
            🏆
          </div>
          <div>
            <p className="text-slate-100 font-semibold">
              Winner already declared
            </p>
            <p className="text-[11px] text-emerald-200 mt-1">
              {contest.winner.name} is the official winner for this contest.
            </p>
          </div>
        </div>
      )}

      {/* Submissions table */}
      {!submissions || submissions.length === 0 ? (
        <div className="py-8 text-sm text-slate-400">
          No submissions have been received for this contest yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Participant</th>
                <th className="px-3 py-2 text-left font-medium">
                  Submitted task
                </th>
                <th className="px-3 py-2 text-left font-medium">Notes</th>
                <th className="px-3 py-2 text-left font-medium">
                  Submitted at
                </th>
                <th className="px-3 py-2 text-left font-medium">Winner</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr
                  key={sub._id}
                  className="border-t border-slate-800/70 hover:bg-slate-900/60"
                >
                  <td className="px-3 py-2 align-top">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          sub.contestant.photoURL ||
                          "https://i.ibb.co/9GZ2ZqT/default-avatar.png"
                        }
                        alt={sub.contestant.name}
                        className="w-8 h-8 rounded-full border border-slate-700 object-cover"
                      />
                      <div>
                        <p className="text-xs text-slate-50">
                          {sub.contestant.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {sub.contestant.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 align-top text-[11px] text-slate-200">
                    <a
                      href={sub.submissionLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-300 underline underline-offset-2 break-all"
                    >
                      {sub.submissionLink}
                    </a>
                  </td>
                  <td className="px-3 py-2 align-top text-[11px] text-slate-300">
                    {sub.notes || "No additional notes"}
                  </td>
                  <td className="px-3 py-2 align-top text-[11px] text-slate-300">
                    {sub.createdAt
                      ? format(new Date(sub.createdAt), "d MMM yyyy, h:mm a")
                      : "-"}
                  </td>
                  <td className="px-3 py-2 align-top">
                    {sub.status === "winner" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/40">
                        🏆 Winner
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={hasWinner || isPending}
                        onClick={() => declareWinner(sub._id)}
                        className="px-3 py-1 rounded-full border border-emerald-500 text-[11px] text-emerald-300 hover:bg-emerald-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Declare winner
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default CreatorSubmissions;
