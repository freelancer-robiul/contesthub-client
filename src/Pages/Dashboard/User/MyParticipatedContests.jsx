// src/Pages/Dashboard/User/MyParticipatedContests.jsx
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";

const MyParticipatedContests = () => {
  const {
    data: participations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-participations"],
    queryFn: async () => {
      const res = await api.get("/payments/my-participations");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-10 text-center text-slate-300">
        Loading your participated contests...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-400">
        Failed to load your participations.
      </div>
    );
  }

  if (!participations || participations.length === 0) {
    return (
      <div className="py-10 text-center text-slate-400 text-sm">
        You haven&apos;t joined any contests yet.
      </div>
    );
  }

  const sorted = participations.slice().sort((a, b) => {
    const da = a.contest?.deadline ? new Date(a.contest.deadline) : new Date(0);
    const db = b.contest?.deadline ? new Date(b.contest.deadline) : new Date(0);
    return da - db;
  });

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">My Participated Contests</h1>
        <p className="text-sm text-slate-400">
          All contests you have joined, sorted by upcoming deadline.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="text-left px-4 py-3">Contest</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Deadline</th>
              <th className="text-right px-4 py-3">Paid</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Joined at</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <tr
                key={p._id}
                className="border-t border-slate-800 hover:bg-slate-900/70"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 rounded-md overflow-hidden bg-slate-800">
                      <img
                        src={p.contest?.image}
                        alt={p.contest?.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-slate-100">
                        {p.contest?.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {p.contest?.contestType}
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {p.contest?.deadline
                    ? new Date(p.contest.deadline).toLocaleString()
                    : "N/A"}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-slate-100">
                  ${p.amountPaid}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] bg-emerald-500/15 text-emerald-300 border border-emerald-600/40">
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {new Date(p.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyParticipatedContests;
