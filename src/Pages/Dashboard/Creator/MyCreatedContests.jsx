// src/Pages/Dashboard/Creator/MyCreatedContests.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialContests = [
  {
    id: "logo-sprint",
    name: "Fintech Logo Design Sprint",
    type: "Image Design",
    price: 10,
    prizeMoney: 150,
    status: "pending", // pending | confirmed | rejected
  },
  {
    id: "ai-article",
    name: "AI in Education Article Challenge",
    type: "Article Writing",
    price: 8,
    prizeMoney: 120,
    status: "confirmed",
  },
  {
    id: "indie-review",
    name: "Indie Game Review Contest",
    type: "Gaming Reviews",
    price: 5,
    prizeMoney: 100,
    status: "rejected",
  },
];

const statusBadgeClass = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-emerald-500/10 text-emerald-300";
    case "rejected":
      return "bg-red-500/10 text-red-300";
    default:
      return "bg-amber-500/10 text-amber-300";
  }
};

const MyCreatedContests = () => {
  const [contests, setContests] = useState(initialContests);
  const navigate = useNavigate();

  const handleDelete = (id, status) => {
    if (status !== "pending") return;

    const ok = window.confirm(
      "Are you sure you want to delete this contest? This action cannot be undone."
    );
    if (!ok) return;

    setContests((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEdit = (id, status) => {
    if (status !== "pending") return;
    navigate(`/creator-dashboard/edit/${id}`);
  };

  const handleSeeSubmissions = (id) => {
    navigate(`/creator-dashboard/submissions/${id}`);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-50 mb-1">
        My Created Contests
      </h2>
      <p className="text-xs text-slate-400 mb-4">
        You can edit or delete contests while they are still pending. Once they
        are confirmed or rejected, the details are locked.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2 pr-3">Name</th>
              <th className="py-2 pr-3">Type</th>
              <th className="py-2 pr-3">Entry Fee</th>
              <th className="py-2 pr-3">Prize</th>
              <th className="py-2 pr-3">Status</th>
              <th className="py-2 pr-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest) => {
              const isPending = contest.status === "pending";

              return (
                <tr
                  key={contest.id}
                  className="border-b border-slate-900/60 align-middle"
                >
                  <td className="py-2 pr-3 text-slate-100">{contest.name}</td>
                  <td className="py-2 pr-3 text-slate-300">{contest.type}</td>
                  <td className="py-2 pr-3 text-slate-300">${contest.price}</td>
                  <td className="py-2 pr-3 text-slate-300">
                    ${contest.prizeMoney}
                  </td>
                  <td className="py-2 pr-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${statusBadgeClass(
                        contest.status
                      )}`}
                    >
                      {contest.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-2 pr-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleSeeSubmissions(contest.id)}
                        className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-100 hover:bg-slate-800 transition"
                      >
                        See submissions
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEdit(contest.id, contest.status)}
                        disabled={!isPending}
                        className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
                          isPending
                            ? "bg-indigo-500 text-slate-950 hover:bg-indigo-600"
                            : "bg-slate-800 text-slate-500 cursor-not-allowed"
                        }`}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(contest.id, contest.status)}
                        disabled={!isPending}
                        className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
                          isPending
                            ? "bg-red-500/90 text-slate-950 hover:bg-red-600"
                            : "bg-slate-800 text-slate-500 cursor-not-allowed"
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {contests.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-center text-slate-400">
                  You haven&apos;t created any contests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCreatedContests;
