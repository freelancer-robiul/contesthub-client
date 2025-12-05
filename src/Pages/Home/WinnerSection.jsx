// src/Pages/Home/WinnerSection.jsx

const winners = [
  {
    id: 1,
    name: "Arif Hossain",
    contest: "Fintech Logo Design Sprint",
    prize: "$150",
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    name: "Tanisha Rahman",
    contest: "AI in Education Article Challenge",
    prize: "$120",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    name: "Sajid Hasan",
    contest: "Indie Game Review Contest",
    prize: "$100",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const WinnerSection = () => {
  const totalPrize = "$370+";
  const totalWinners = "150+";
  const totalContests = "120+";

  return (
    <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-950/70 px-6 py-8 sm:px-10 sm:py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: text & stats */}
        <div className="flex-1 space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            🏆 Winner Spotlight
          </p>

          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
            Real creators, real rewards.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl">
            Every week, talented designers, writers and gamers turn their ideas
            into prize-winning work on ContestHub. Join a contest today and give
            your skills a chance to shine on the leaderboard.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 max-w-md pt-2">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-3 text-center">
              <p className="text-lg font-bold text-emerald-300">{totalPrize}</p>
              <p className="text-[11px] uppercase tracking-wide text-slate-400">
                Prize money awarded
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-3 text-center">
              <p className="text-lg font-bold text-amber-300">{totalWinners}</p>
              <p className="text-[11px] uppercase tracking-wide text-slate-400">
                Unique winners
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-3 text-center">
              <p className="text-lg font-bold text-indigo-300">
                {totalContests}
              </p>
              <p className="text-[11px] uppercase tracking-wide text-slate-400">
                Contests completed
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 pt-1">
            Your name could be on this list next. Pick a contest, submit your
            best work and we&apos;ll take care of the celebration.
          </p>
        </div>

        {/* Right: recent winners list */}
        <div className="flex-1 w-full">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {winners.map((winner) => (
              <article
                key={winner.id}
                className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-3"
              >
                <div className="h-14 w-14 rounded-full overflow-hidden border border-slate-700 shrink-0">
                  <img
                    src={winner.image}
                    alt={winner.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-50">
                    {winner.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    Winner of{" "}
                    <span className="font-medium text-slate-200">
                      {winner.contest}
                    </span>
                  </p>
                  <p className="text-xs font-semibold text-emerald-300">
                    Prize: {winner.prize}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WinnerSection;
