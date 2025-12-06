import { useState } from "react";

const initialContests = [
  {
    id: "c1",
    name: "Logo Design Sprint",
    creator: "Arif",
    price: 10,
    status: "pending",
  },
  {
    id: "c2",
    name: "AI Article Contest",
    creator: "Mitu",
    price: 8,
    status: "confirmed",
  },
  {
    id: "c3",
    name: "Game Review Challenge",
    creator: "Sajid",
    price: 5,
    status: "pending",
  },
];

const statusBadge = (status) => {
  switch (status) {
    case "confirmed":
      return "text-emerald-300 bg-emerald-500/10";
    case "rejected":
      return "text-red-300 bg-red-500/10";
    default:
      return "text-amber-300 bg-amber-500/10";
  }
};

const ManageContests = () => {
  const [contests, setContests] = useState(initialContests);

  const updateStatus = (id, newStatus) => {
    setContests((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const deleteContest = (id) => {
    const ok = window.confirm("Delete this contest permanently?");
    if (!ok) return;
    setContests((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-slate-50">
        Manage Contests
      </h2>
      <p className="text-xs text-slate-400 mb-4">
        Approve or reject pending contests. You may also delete any contest.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2">Name</th>
              <th className="py-2">Creator</th>
              <th className="py-2">Price</th>
              <th className="py-2">Status</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contests.map((contest) => (
              <tr key={contest.id} className="border-b border-slate-900/60">
                <td className="py-2 text-slate-100">{contest.name}</td>
                <td className="py-2 text-slate-300">{contest.creator}</td>
                <td className="py-2 text-slate-300">${contest.price}</td>

                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(
                      contest.status
                    )}`}
                  >
                    {contest.status.toUpperCase()}
                  </span>
                </td>

                <td className="py-2 text-right space-x-2">
                  {contest.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(contest.id, "confirmed")}
                        className="px-3 py-1 rounded bg-emerald-500 text-xs text-slate-950 hover:bg-emerald-600"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => updateStatus(contest.id, "rejected")}
                        className="px-3 py-1 rounded bg-amber-500 text-xs text-slate-950 hover:bg-amber-600"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => deleteContest(contest.id)}
                    className="px-3 py-1 rounded bg-red-500 text-xs text-slate-950 hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {contests.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-slate-400">
                  No contests found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContests;
