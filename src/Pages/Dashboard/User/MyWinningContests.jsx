// src/Pages/Dashboard/User/MyWinningContests.jsx

const dummyWins = [
  {
    id: "logo-sprint",
    contestName: "Fintech Logo Design Sprint",
    prize: 150,
    position: "1st place",
    date: "2025-01-20T18:00:00Z",
  },
  {
    id: "indie-review",
    contestName: "Indie Game Review Contest",
    prize: 100,
    position: "1st place",
    date: "2024-12-05T18:00:00Z",
  },
];

const formatDate = (isoString) => {
  const d = new Date(isoString);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const MyWinningContests = () => {
  const totalPrize = dummyWins.reduce((sum, win) => sum + win.prize, 0);

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-50 mb-1">
        My Winning Contests
      </h2>
      <p className="text-xs text-slate-400 mb-4">
        Celebrate your best performances and track the prize money you have
        earned.
      </p>

      {/* Highlight card */}
      <div className="mb-4 rounded-2xl border border-emerald-600/60 bg-emerald-500/5 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-emerald-300">
            Congratulations!
          </p>
          <p className="text-sm text-slate-100">
            You&apos;ve won{" "}
            <span className="font-semibold">{dummyWins.length}</span> contest so
            far.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Total prize money</p>
          <p className="text-xl font-bold text-emerald-300">
            ${totalPrize.toFixed(0)}
          </p>
        </div>
      </div>

      {/* Cards list */}
      {dummyWins.length === 0 ? (
        <p className="text-sm text-slate-300">
          You haven&apos;t won a contest yet. Keep participating, your first win
          is on the way.
        </p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {dummyWins.map((win) => (
            <article
              key={win.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4"
            >
              <p className="text-xs text-slate-400 mb-1">
                {formatDate(win.date)}
              </p>
              <h3 className="text-sm font-semibold text-slate-50 mb-1">
                {win.contestName}
              </h3>
              <p className="text-xs text-slate-300 mb-2">
                Result:{" "}
                <span className="font-semibold text-emerald-300">
                  {win.position}
                </span>
              </p>
              <p className="text-xs text-slate-300">
                Prize earned:{" "}
                <span className="font-semibold text-amber-300">
                  ${win.prize}
                </span>
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWinningContests;
