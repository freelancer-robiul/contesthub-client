// src/Pages/Extra/Leaderboard.jsx
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import { format } from "date-fns";

const fetchLeaderboard = async () => {
  const res = await api.get("/users/leaderboard", {
    params: {
      limit: 20,
    },
  });
  return res.data;
};

const medalForRank = (rank) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
};

const badgeColorForRank = (rank) => {
  if (rank === 1) return "bg-amber-500/20 text-amber-200 border-amber-400/60";
  if (rank === 2) return "bg-slate-300/20 text-slate-100 border-slate-300/60";
  if (rank === 3)
    return "bg-orange-500/20 text-orange-200 border-orange-400/60";
  return "bg-slate-800 text-slate-200 border-slate-600";
};

const Leaderboard = () => {
  const {
    data: leaderboard = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
  });

  return (
    <section className="mt-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
            Leaderboard
          </h1>
          <p className="text-xs text-slate-400">
            Top creators and contestants ranked by total contest wins. Winning
            more contests boosts your rank and unlocks more recognition.
          </p>
        </div>
      </div>

      {/* Top 3 highlight */}
      {leaderboard.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {leaderboard.slice(0, 3).map((user) => (
            <div
              key={user._id}
              className="rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-4 flex flex-col items-center text-center"
            >
              <div className="mb-2 text-3xl">
                {medalForRank(user.rank) || "⭐"}
              </div>
              <img
                src={
                  user.photoURL || "https://i.ibb.co/9GZ2ZqT/default-avatar.png"
                }
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border border-slate-600 mb-2"
              />
              <p className="text-sm text-slate-50 font-semibold">{user.name}</p>
              <p className="text-[11px] text-slate-400 mb-2">
                {user.role === "creator"
                  ? "Contest creator"
                  : user.role === "admin"
                  ? "Admin"
                  : "Contest lover"}
              </p>
              <div className="flex items-center gap-4 text-[11px] text-slate-300">
                <div>
                  <p className="text-slate-400">Wins</p>
                  <p className="text-lg font-semibold text-emerald-300">
                    {user.winCount}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Participated</p>
                  <p className="text-lg font-semibold text-indigo-300">
                    {user.participatedCount}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Win rate</p>
                  <p className="text-lg font-semibold text-amber-300">
                    {user.winPercentage}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table for full leaderboard */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-x-auto">
        {isLoading && (
          <div className="py-6 text-sm text-slate-300 text-center">
            Loading leaderboard...
          </div>
        )}

        {isError && (
          <div className="py-6 text-sm text-red-300 text-center">
            Failed to load leaderboard: {error?.message}
          </div>
        )}

        {!isLoading && !isError && leaderboard.length === 0 && (
          <div className="py-6 text-sm text-slate-400 text-center">
            No users found for leaderboard yet.
          </div>
        )}

        {!isLoading && !isError && leaderboard.length > 0 && (
          <table className="min-w-full text-xs">
            <thead className="bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Rank</th>
                <th className="px-3 py-2 text-left font-medium">Participant</th>
                <th className="px-3 py-2 text-left font-medium">Wins</th>
                <th className="px-3 py-2 text-left font-medium">
                  Participated
                </th>
                <th className="px-3 py-2 text-left font-medium">Win %</th>
                <th className="px-3 py-2 text-left font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-slate-800/70 hover:bg-slate-900/60"
                >
                  <td className="px-3 py-2 align-top">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full border text-xs font-semibold ${badgeColorForRank(
                        user.rank
                      )}`}
                    >
                      {user.rank}
                    </span>
                  </td>
                  <td className="px-3 py-2 align-top">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          user.photoURL ||
                          "https://i.ibb.co/9GZ2ZqT/default-avatar.png"
                        }
                        alt={user.name}
                        className="w-8 h-8 rounded-full border border-slate-700 object-cover"
                      />
                      <div>
                        <p className="text-xs text-slate-50">{user.name}</p>
                        <p className="text-[11px] text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 align-top text-slate-200">
                    {user.winCount}
                  </td>
                  <td className="px-3 py-2 align-top text-slate-200">
                    {user.participatedCount}
                  </td>
                  <td className="px-3 py-2 align-top text-slate-200">
                    {user.winPercentage}%
                  </td>
                  <td className="px-3 py-2 align-top text-slate-300">
                    {user.joinedAt
                      ? format(new Date(user.joinedAt), "d MMM yyyy")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Leaderboard;
