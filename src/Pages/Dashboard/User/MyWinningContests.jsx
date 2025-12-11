// src/Pages/Dashboard/User/MyWinningContests.jsx
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import { format } from "date-fns";

const fetchMyWinningContests = async () => {
  const res = await api.get("/contests/my-winnings");
  return res.data; // array of contests
};

const MyWinningContests = () => {
  const {
    data: contests = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["my-winning-contests"],
    queryFn: fetchMyWinningContests,
  });

  return (
    <section className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">
            My winning contests
          </h2>
          <p className="text-xs text-slate-400">
            All contests where you have been announced as the official winner.
            Keep collecting more trophies and climb the leaderboard.
          </p>
        </div>
        {isFetching && (
          <p className="text-[11px] text-slate-400">Refreshing...</p>
        )}
      </div>

      {isLoading && (
        <div className="py-6 text-sm text-slate-300">
          Loading your winning contests...
        </div>
      )}

      {isError && (
        <div className="py-6 text-sm text-red-300">
          Failed to load winning contests: {error?.message}
        </div>
      )}

      {!isLoading && !isError && contests.length === 0 && (
        <div className="py-8 text-sm text-slate-400">
          You haven&apos;t won any contests yet. Keep participating and your
          wins will appear here with full celebration!
        </div>
      )}

      {!isLoading && !isError && contests.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contests.map((contest) => {
            const deadline = contest.deadline
              ? new Date(contest.deadline)
              : null;

            return (
              <div
                key={contest._id}
                className="relative overflow-hidden rounded-3xl border border-emerald-500/40 bg-slate-950/90"
              >
                {/* subtle gradient ribbon */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

                <div className="flex gap-3 p-4 border-b border-slate-800/80">
                  <div className="relative">
                    <img
                      src={
                        contest.image ||
                        "https://i.ibb.co/3R1YgQZ/placeholder.jpg"
                      }
                      alt={contest.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-700"
                    />
                    <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold shadow-lg">
                      🏆
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-xs text-emerald-300 font-semibold mb-1">
                      You are the winner!
                    </p>
                    <h3 className="text-sm font-semibold text-slate-50 line-clamp-2">
                      {contest.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 capitalize mt-1">
                      {contest.contestType?.replace("-", " ") || "Contest"}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400">Prize money</p>
                      <p className="text-base font-semibold text-emerald-300">
                        ৳{Number(contest.prizeMoney || 0).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400">
                        Total participants
                      </p>
                      <p className="text-base font-semibold text-slate-100">
                        {contest.participantsCount || 0}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <div>
                      <p>Deadline</p>
                      <p className="text-slate-200">
                        {deadline
                          ? format(deadline, "d MMM yyyy, h:mm a")
                          : "Not set"}
                      </p>
                    </div>
                    {contest.winner?.announcedAt && (
                      <div className="text-right">
                        <p>Winner announced</p>
                        <p className="text-slate-200">
                          {format(
                            new Date(contest.winner.announcedAt),
                            "d MMM yyyy"
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  {contest.description && (
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                      {contest.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MyWinningContests;
