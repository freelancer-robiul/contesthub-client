// src/Pages/Home/PopularContests.jsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Temporary dummy data – later this will come from backend using TanStack Query
const dummyPopularContests = [
  {
    id: "logo-sprint",
    name: "Fintech Logo Design Sprint",
    image:
      "https://images.pexels.com/photos/3153207/pexels-photo-3153207.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Design a modern, minimal logo for a next-generation fintech app that helps young professionals manage their savings with confidence.",
    participantsCount: 82,
  },
  {
    id: "ai-article",
    name: "AI in Education Article Challenge",
    image:
      "https://images.pexels.com/photos/4144096/pexels-photo-4144096.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Write a clear and engaging article that explains how artificial intelligence is transforming the way students learn and teachers teach.",
    participantsCount: 71,
  },
  {
    id: "indie-review",
    name: "Indie Game Review Contest",
    image:
      "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Share a detailed review of your favourite indie game. Focus on gameplay, story, art style and what makes the overall experience memorable.",
    participantsCount: 64,
  },
  {
    id: "startup-pitch",
    name: "One-Page Startup Pitch",
    image:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Present a one-page business idea for a problem you see around you. Explain the solution, target audience and how you plan to grow.",
    participantsCount: 53,
  },
  {
    id: "poster-design",
    name: "Movie Night Poster Design",
    image:
      "https://images.pexels.com/photos/799131/pexels-photo-799131.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Create a bold and eye-catching poster for a campus movie night featuring classic sci-fi films. Make it social-media friendly.",
    participantsCount: 47,
  },
];

const PopularContests = () => {
  const navigate = useNavigate();

  // TODO: replace with real auth (context) later
  const user = null;
  // const user = { _id: "123", name: "Demo User" };

  // Ensure list is sorted by highest participation count
  const sortedContests = useMemo(
    () =>
      [...dummyPopularContests].sort(
        (a, b) => b.participantsCount - a.participantsCount
      ),
    []
  );

  const handleDetailsClick = (id) => {
    if (!user) {
      // not logged in → go to login page
      navigate("/login");
      return;
    }
    // logged in → go to contest details page
    navigate(`/contests/${id}`);
  };

  const handleShowAll = () => {
    navigate("/all-contests");
  };

  return (
    <section className="mt-10">
      {/* Section header */}
      <div className="flex items-end justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-50">
            Popular Contests
          </h2>
          <p className="text-sm text-slate-400">
            Top challenges ranked by participation.
          </p>
        </div>

        <button
          onClick={handleShowAll}
          className="hidden sm:inline-flex items-center rounded-full border border-slate-700 px-4 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800/80 transition"
        >
          Show all contests
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedContests.map((contest) => {
          const shortDescription =
            contest.description.length > 120
              ? contest.description.slice(0, 120) + "..."
              : contest.description;

          return (
            <article
              key={contest.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden shadow-sm hover:border-indigo-500/70 hover:shadow-indigo-500/20 transition"
            >
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={contest.image}
                  alt={contest.name}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-slate-50 line-clamp-2">
                  {contest.name}
                </h3>

                <p className="text-xs text-slate-400 min-h-[3rem]">
                  {shortDescription}
                </p>

                <p className="text-xs font-medium text-indigo-300">
                  Participants:{" "}
                  <span className="font-semibold">
                    {contest.participantsCount}
                  </span>
                </p>

                <div className="pt-1 flex justify-between items-center">
                  <button
                    onClick={() => handleDetailsClick(contest.id)}
                    className="text-xs font-medium rounded-full bg-slate-800 px-3 py-1.5 text-slate-50 hover:bg-indigo-500 hover:text-slate-950 transition"
                  >
                    Details
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Show all button for mobile */}
      <div className="mt-5 sm:hidden">
        <button
          onClick={handleShowAll}
          className="w-full inline-flex justify-center rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600 transition"
        >
          Show All Contests
        </button>
      </div>
    </section>
  );
};

export default PopularContests;
