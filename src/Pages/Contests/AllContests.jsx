// src/Pages/Contests/AllContests.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const TABS = [
  { label: "All", value: "all" },
  { label: "Logo Design", value: "Logo Design" },
  { label: "Article Writing", value: "Article Writing" },
  { label: "Business Ideas", value: "Business Ideas" },
  { label: "Game Review", value: "Game Review" },
  { label: "Other", value: "Other" },
];

const AllContests = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);

  const limit = 10;

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["contests", { page, type, debouncedSearch }],
    queryFn: async () => {
      const res = await api.get("/contests", {
        params: {
          page,
          limit,
          type,
          search: debouncedSearch,
          status: "approved",
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const contests = data?.contests || [];
  const totalPages = data?.totalPages || 1;
  const totalItems = data?.totalItems || 0;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setDebouncedSearch(search.trim());
  };

  const handleTabChange = (value) => {
    setType(value);
    setPage(1);
  };

  return (
    <section className="space-y-6 pt-4">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">All Contests</h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse all live and upcoming contests. Use filters to find what
            matches your skills.
          </p>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full md:w-80 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Search by name or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-full bg-slate-900 border border-slate-700 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-indigo-500 text-slate-950 text-sm font-semibold hover:bg-indigo-600"
          >
            Search
          </button>
        </form>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleTabChange(tab.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
              type === tab.value
                ? "bg-indigo-500 border-indigo-500 text-slate-950"
                : "border-slate-700 text-slate-200 hover:bg-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* State messages */}
      {isLoading && (
        <div className="py-10 text-center text-sm text-slate-400">
          Loading contests...
        </div>
      )}

      {isError && (
        <div className="py-10 text-center text-sm text-red-400">
          Failed to load contests: {error?.message || "Something went wrong"}
        </div>
      )}

      {!isLoading && !isError && contests.length === 0 && (
        <div className="py-10 text-center text-sm text-slate-400">
          No contests found for this filter.
        </div>
      )}

      {/* Grid */}
      {!isLoading && !isError && contests.length > 0 && (
        <>
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
                    <h2 className="font-semibold text-sm line-clamp-2">
                      {contest.name}
                    </h2>
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

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 text-xs text-slate-400">
            <div>
              Showing{" "}
              <span className="font-semibold">{(page - 1) * limit + 1}</span> –{" "}
              <span className="font-semibold">
                {Math.min(page * limit, totalItems)}
              </span>{" "}
              of <span className="font-semibold">{totalItems}</span> contests
              {isFetching && (
                <span className="ml-2 text-[10px] text-slate-500">
                  (updating…)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`px-3 py-1 rounded-full border text-xs ${
                  page === 1
                    ? "border-slate-700 text-slate-600 cursor-not-allowed"
                    : "border-slate-600 text-slate-100 hover:bg-slate-800"
                }`}
              >
                Previous
              </button>
              <span className="text-[11px]">
                Page{" "}
                <span className="font-semibold text-slate-100">{page}</span> of{" "}
                <span className="font-semibold text-slate-100">
                  {totalPages}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded-full border text-xs ${
                  page === totalPages
                    ? "border-slate-700 text-slate-600 cursor-not-allowed"
                    : "border-slate-600 text-slate-100 hover:bg-slate-800"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default AllContests;
