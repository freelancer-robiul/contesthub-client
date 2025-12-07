// src/Pages/Contests/AllContests.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import { Link } from "react-router-dom";

const TABS = [
  { id: "all", label: "All" },
  { id: "image-design", label: "Image Design" },
  { id: "article-writing", label: "Article Writing" },
  { id: "business-idea", label: "Business Ideas" },
  { id: "game-review", label: "Game Reviews" },
];

const fetchContests = async ({ queryKey }) => {
  const [_key, { tab }] = queryKey;

  const params = {};
  if (tab && tab !== "all") {
    params.type = tab;
  }
  // status approved by default in backend

  const res = await api.get("/contests", { params });
  return res.data;
};

const AllContests = () => {
  const [activeTab, setActiveTab] = useState("all");

  const {
    data: contests = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["contests", { tab: activeTab }],
    queryFn: fetchContests,
    keepPreviousData: true,
  });

  return (
    <section className="pt-6 pb-10">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">
            All Contests
          </h1>
          <p className="text-sm text-slate-400">
            Browse every approved contest and find your next challenge.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
              activeTab === tab.id
                ? "bg-indigo-500 text-slate-950 border-indigo-500"
                : "bg-slate-900/70 border-slate-700 text-slate-200 hover:bg-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading && (
        <div className="py-10 text-center text-slate-300">
          Loading contests...
        </div>
      )}

      {isError && (
        <div className="py-10 text-center text-red-300 text-sm">
          Failed to load contests: {error.message}
        </div>
      )}

      {!isLoading && !isError && contests.length === 0 && (
        <div className="py-10 text-center text-slate-400 text-sm">
          No contests found in this category.
        </div>
      )}

      {!isLoading && !isError && contests.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {contests.map((contest) => (
            <article
              key={contest._id}
              className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden flex flex-col"
            >
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={contest.image}
                  alt={contest.name}
                  className="h-full w-full object-cover hover:scale-105 transition-transform"
                />
              </div>

              <div className="p-3 flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-base font-semibold text-slate-50 line-clamp-1">
                    {contest.name}
                  </h2>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 capitalize">
                    {contest.contestType?.replace("-", " ")}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-3">
                  {contest.description?.slice(0, 120)}
                  {contest.description &&
                    contest.description.length > 120 &&
                    "..."}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span>
                    Participants:{" "}
                    <span className="text-slate-100">
                      {contest.participantsCount || 0}
                    </span>
                  </span>
                  <span>
                    Entry fee:{" "}
                    <span className="text-indigo-300">
                      ${contest.price?.toFixed(2)}
                    </span>
                  </span>
                </div>

                <div className="mt-3 flex justify-end">
                  <Link
                    to={`/contests/${contest._id}`}
                    className="rounded-full bg-indigo-500 hover:bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-slate-950"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllContests;
