// src/Pages/Dashboard/User/MyParticipatedContests.jsx
import { useMemo } from "react";

const dummyParticipated = [
  {
    id: "logo-sprint",
    name: "Fintech Logo Design Sprint",
    deadline: "2025-12-31T18:00:00Z",
    paymentStatus: "paid",
    amount: 10,
  },
  {
    id: "ai-article",
    name: "AI in Education Article Challenge",
    deadline: "2025-11-30T18:00:00Z",
    paymentStatus: "paid",
    amount: 8,
  },
  {
    id: "indie-review",
    name: "Indie Game Review Contest",
    deadline: "2025-10-15T18:00:00Z",
    paymentStatus: "paid",
    amount: 5,
  },
  {
    id: "startup-pitch",
    name: "One-Page Startup Pitch",
    deadline: "2025-09-05T18:00:00Z",
    paymentStatus: "refunded",
    amount: 6,
  },
];

// helper to format date
const formatDate = (isoString) => {
  const d = new Date(isoString);
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const MyParticipatedContests = () => {
  // sort by upcoming deadline (nearest first)
  const sorted = useMemo(
    () =>
      [...dummyParticipated].sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      ),
    []
  );

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-50 mb-1">
        My Participated Contests
      </h2>
      <p className="text-xs text-slate-400 mb-4">
        These contests are sorted by their upcoming deadlines.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2 pr-3">Contest</th>
              <th className="py-2 pr-3">Deadline</th>
              <th className="py-2 pr-3">Payment</th>
              <th className="py-2 pr-3">Entry Fee</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c.id} className="border-b border-slate-900/60">
                <td className="py-2 pr-3 text-slate-100">{c.name}</td>
                <td className="py-2 pr-3 text-slate-300">
                  {formatDate(c.deadline)}
                </td>
                <td className="py-2 pr-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      c.paymentStatus === "paid"
                        ? "bg-emerald-500/10 text-emerald-300"
                        : c.paymentStatus === "refunded"
                        ? "bg-yellow-500/10 text-yellow-300"
                        : "bg-red-500/10 text-red-300"
                    }`}
                  >
                    {c.paymentStatus.toUpperCase()}
                  </span>
                </td>
                <td className="py-2 pr-3 text-slate-300">${c.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParticipatedContests;
