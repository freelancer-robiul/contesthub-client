// src/Pages/Home/PopularContests.jsx
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

const PopularContests = () => {
  // React Query দিয়ে popular contests load করব
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      // backend: GET /api/v1/contests/popular -> সরাসরি array return করে
      const res = await api.get("/contests/popular");
      return res.data; // এটা একটা array
    },
  });

  // data যদি undefined হয় তাহলে empty array ধরি
  const contests = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-3">Popular Contests</h2>
        <p className="text-sm text-slate-400">Loading popular contests...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-3">Popular Contests</h2>
        <p className="text-sm text-red-400">
          Failed to load contests: {error?.message || "Something went wrong"}
        </p>
      </section>
    );
  }

  if (!contests.length) {
    return (
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-3">Popular Contests</h2>
        <p className="text-sm text-slate-400">
          No popular contests found yet. Create or join a contest to get
          started.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Popular Contests</h2>
        <Link
          to="/all-contests"
          className="text-xs font-medium text-indigo-300 hover:text-indigo-200"
        >
          Show all contests →
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {contests.map((contest) => (
          <article
            key={contest._id}
            className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={contest.image}
                alt={contest.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 flex flex-col p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-sm line-clamp-2">
                  {contest.name}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-200">
                  {contest.contestType || "Contest"}
                </span>
              </div>

              <p className="text-xs text-slate-400 line-clamp-3">
                {contest.description?.slice(0, 110)}
                {contest.description &&
                  contest.description.length > 110 &&
                  "..."}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
                <span>
                  Entry fee:{" "}
                  <span className="font-semibold text-amber-300">
                    ${contest.price}
                  </span>
                </span>
                <span>
                  Prize:{" "}
                  <span className="font-semibold text-emerald-300">
                    ${contest.prizeMoney}
                  </span>
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>
                  Participants:{" "}
                  <span className="font-semibold text-slate-100">
                    {contest.participantsCount || 0}
                  </span>
                </span>
                <span>
                  Deadline:{" "}
                  <span className="font-semibold">
                    {contest.deadline
                      ? new Date(contest.deadline).toLocaleDateString()
                      : "N/A"}
                  </span>
                </span>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <div className="flex flex-wrap gap-1">
                  {contest.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/contests/${contest._id}`}
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500 text-slate-950 hover:bg-indigo-600"
                >
                  Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PopularContests;
