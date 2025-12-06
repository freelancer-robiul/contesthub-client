// src/Pages/Contests/ContestDetails.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// TEMP dummy data – later this will come from backend (TanStack Query)
const dummyContests = [
  {
    id: "logo-sprint",
    name: "Fintech Logo Design Sprint",
    image:
      "https://images.pexels.com/photos/3153207/pexels-photo-3153207.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Design a modern, minimal logo for a next-generation fintech app that helps young professionals manage their savings with confidence.",
    taskDetails:
      "Create a primary logo and one icon variation. Deliver your work in PNG and SVG formats. The logo should work on dark and light backgrounds.",
    participantsCount: 82,
    prizeMoney: 150,
    deadline: "2025-12-31T18:00:00Z",
    winner: {
      name: "Arif Hossain",
      photo:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  },
  {
    id: "ai-article",
    name: "AI in Education Article Challenge",
    image:
      "https://images.pexels.com/photos/4144096/pexels-photo-4144096.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Write a clear and engaging article that explains how artificial intelligence is transforming the way students learn and teachers teach.",
    taskDetails:
      "Write between 800–1200 words. Use at least two real examples and keep the language accessible for non-technical readers.",
    participantsCount: 71,
    prizeMoney: 120,
    deadline: "2025-11-30T18:00:00Z", // example: already ended
    winner: null,
  },
  // ... later more contests
];

// helper for countdown
const getTimeLeft = (deadline) => {
  const totalMs = new Date(deadline).getTime() - Date.now();

  if (totalMs <= 0) {
    return { ended: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { ended: false, days, hours, minutes, seconds };
};

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: later remove dummy and load from backend by id
  const contest = useMemo(() => dummyContests.find((c) => c.id === id), [id]);

  const [timeLeft, setTimeLeft] = useState(
    contest ? getTimeLeft(contest.deadline) : null
  );

  // TEMP – client-side participants count (later update from backend after payment)
  const [participantsCount, setParticipantsCount] = useState(
    contest ? contest.participantsCount : 0
  );

  useEffect(() => {
    if (!contest) return;

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(contest.deadline));
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  if (!contest) {
    return (
      <div className="pt-10 text-center text-slate-300">Contest not found.</div>
    );
  }

  const handleRegisterPay = () => {
    if (timeLeft?.ended) return;

    // TODO: After real payment success:
    // - navigate to success page
    // - update participants count from backend
    console.log("Going to payment page for contest:", contest.id);
    navigate(`/payment/${contest.id}`);
  };

  const isEnded = timeLeft?.ended;

  return (
    <section className="pt-6 pb-10">
      {/* Title */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Contest Details
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50 mt-1">
          {contest.name}
        </h1>
      </div>

      {/* Banner image */}
      <div className="mb-6 overflow-hidden rounded-3xl border border-slate-800">
        <div className="relative h-56 sm:h-72 md:h-80">
          <img
            src={contest.image}
            alt={contest.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
        </div>
      </div>

      {/* Main content layout */}
      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        {/* Left: description & task */}
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-50 mb-1">
              Contest Overview
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {contest.description}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-50 mb-1">
              Task details
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {contest.taskDetails}
            </p>
          </div>

          {contest.winner && (
            <div className="mt-4 rounded-2xl border border-emerald-600/60 bg-emerald-500/5 p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full overflow-hidden border border-emerald-500/80 shrink-0">
                <img
                  src={contest.winner.photo}
                  alt={contest.winner.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-emerald-300">
                  Winner declared
                </p>
                <p className="text-sm font-semibold text-slate-50">
                  {contest.winner.name}
                </p>
                <p className="text-xs text-slate-300">
                  Congratulations to the creator of the winning submission!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: sidebar – stats, countdown, action */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">Prize money</p>
              <p className="text-base font-semibold text-amber-300">
                ${contest.prizeMoney}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">Participants</p>
              <p className="text-base font-semibold text-indigo-300">
                {participantsCount}
              </p>
            </div>

            <div className="mt-3 border-t border-slate-800 pt-3">
              <p className="text-xs text-slate-400 mb-1">Deadline</p>
              {timeLeft && !timeLeft.ended ? (
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-50">
                  <span className="inline-flex min-w-[3rem] justify-center rounded-lg bg-slate-900 px-2 py-1 text-xs">
                    {timeLeft.days}d
                  </span>
                  <span className="inline-flex min-w-[3rem] justify-center rounded-lg bg-slate-900 px-2 py-1 text-xs">
                    {timeLeft.hours}h
                  </span>
                  <span className="inline-flex min-w-[3rem] justify-center rounded-lg bg-slate-900 px-2 py-1 text-xs">
                    {timeLeft.minutes}m
                  </span>
                  <span className="inline-flex min-w-[3rem] justify-center rounded-lg bg-slate-900 px-2 py-1 text-xs">
                    {timeLeft.seconds}s
                  </span>
                </div>
              ) : (
                <p className="inline-flex items-center rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
                  Contest Ended
                </p>
              )}
            </div>
          </div>

          {/* Register / Pay button */}
          <button
            type="button"
            onClick={handleRegisterPay}
            disabled={isEnded}
            className={`w-full rounded-full px-5 py-2.5 text-sm font-semibold shadow-md transition ${
              isEnded
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-amber-300 text-slate-950 hover:bg-amber-200"
            }`}
          >
            {isEnded ? "Registration closed" : "Register & Pay"}
          </button>

          <p className="text-[11px] text-slate-500">
            After a successful payment you will be registered for this contest
            and your participation will be added to the total count.
          </p>
        </aside>
      </div>
    </section>
  );
};

export default ContestDetails;
