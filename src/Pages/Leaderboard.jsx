// src/Pages/Leaderboard.jsx
const dummyLeaderboard = [
  {
    id: "u1",
    name: "Arif Hossain",
    photoURL: "https://i.pravatar.cc/100?u=arif",
    wins: 7,
    participated: 18,
  },
  {
    id: "u2",
    name: "Mitu Akter",
    photoURL: "https://i.pravatar.cc/100?u=mitu",
    wins: 5,
    participated: 12,
  },
  {
    id: "u3",
    name: "Sajid Hasan",
    photoURL: "https://i.pravatar.cc/100?u=sajid",
    wins: 3,
    participated: 9,
  },
  {
    id: "u4",
    name: "Demo User",
    photoURL: "https://i.pravatar.cc/100?u=demo",
    wins: 1,
    participated: 6,
  },
];

const Leaderboard = () => {
  const sorted = [...dummyLeaderboard].sort((a, b) => b.wins - a.wins);

  return (
    <section className="pt-6 pb-10">
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">
          Leaderboard
        </h1>
        <p className="text-sm text-slate-400">
          Ranked by total number of contest wins.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2 px-3">Rank</th>
              <th className="py-2 px-3">User</th>
              <th className="py-2 px-3">Wins</th>
              <th className="py-2 px-3">Participated</th>
              <th className="py-2 px-3">Win rate</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((user, index) => {
              const winRate =
                user.participated > 0
                  ? Math.round((user.wins / user.participated) * 100)
                  : 0;

              return (
                <tr
                  key={user.id}
                  className="border-b border-slate-900/70 hover:bg-slate-900/60"
                >
                  <td className="py-2 px-3 text-slate-200">#{index + 1}</td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-700">
                        <img
                          src={user.photoURL}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-slate-100 font-medium">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-slate-100">{user.wins}</td>
                  <td className="py-2 px-3 text-slate-300">
                    {user.participated}
                  </td>
                  <td className="py-2 px-3 text-slate-300">{winRate}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Leaderboard;
