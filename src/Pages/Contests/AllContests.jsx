// src/Pages/Contests/AllContests.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy admin-approved contests (later API diye asbe)
const allApprovedContests = [
  {
    id: "logo-sprint",
    name: "Fintech Logo Design Sprint",
    image:
      "https://images.pexels.com/photos/3153207/pexels-photo-3153207.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Design a modern, minimal logo for a next-generation fintech app that helps young professionals manage their savings with confidence.",
    participantsCount: 82,
    tag: "image-design",
  },
  {
    id: "poster-night",
    name: "Movie Night Poster Design",
    image:
      "https://images.pexels.com/photos/799131/pexels-photo-799131.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Create a bold and eye-catching poster for a campus movie night featuring classic sci-fi films. Make it social-media friendly and shareable.",
    participantsCount: 51,
    tag: "image-design",
  },
  {
    id: "ai-article",
    name: "AI in Education Article Challenge",
    image:
      "https://images.pexels.com/photos/4144096/pexels-photo-4144096.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Write a clear and engaging article that explains how artificial intelligence is transforming the way students learn and teachers teach.",
    participantsCount: 71,
    tag: "article-writing",
  },
  {
    id: "productivity-blog",
    name: "Student Productivity Blog Post",
    image:
      "https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Share your best study system or productivity routine in a blog-style article that other students can apply in their daily life.",
    participantsCount: 44,
    tag: "article-writing",
  },
  {
    id: "startup-pitch",
    name: "One-Page Startup Pitch",
    image:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Present a one-page business idea for a problem you see around you. Explain the solution, target audience and how you plan to grow.",
    participantsCount: 53,
    tag: "business-idea",
  },
  {
    id: "marketing-hook",
    name: "Creative Marketing Hook Contest",
    image:
      "https://images.pexels.com/photos/7947789/pexels-photo-7947789.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Invent a short and memorable hook line for a fictional brand launch. Make it catchy enough to work on social media and billboards.",
    participantsCount: 39,
    tag: "business-idea",
  },
  {
    id: "indie-review",
    name: "Indie Game Review Contest",
    image:
      "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Share a detailed review of your favourite indie game. Focus on gameplay, story, art style and what makes the overall experience memorable.",
    participantsCount: 64,
    tag: "gaming-review",
  },
  {
    id: "mobile-game",
    name: "Mobile Game First-Impression Review",
    image:
      "https://images.pexels.com/photos/1462725/pexels-photo-1462725.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Try a new mobile game and write your honest first impressions in a short review. Talk about what hooked you and what could be improved.",
    participantsCount: 42,
    tag: "gaming-review",
  },
];

const TAGS = [
  { id: "all", label: "All Contests" },
  { id: "image-design", label: "Image Design" },
  { id: "article-writing", label: "Article Writing" },
  { id: "business-idea", label: "Business Ideas" },
  { id: "gaming-review", label: "Gaming Reviews" },
];

const AllContests = () => {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState("all");

  // TODO: later replace with real auth context
  const user = null;
  // const user = { _id: "123", name: "Demo User" };

  const sortedContests = useMemo(
    () =>
      [...allApprovedContests].sort(
        (a, b) => b.participantsCount - a.participantsCount
      ),
    []
  );

  const filteredContests = useMemo(() => {
    if (activeTag === "all") return sortedContests;
    return sortedContests.filter((contest) => contest.tag === activeTag);
  }, [activeTag, sortedContests]);

  const handleDetailsClick = (id) => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/contests/${id}`);
  };

  return (
    <section className="pt-6 pb-10">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">
          All Contests
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Browse every admin-approved challenge and pick the one that matches
          your skills.
        </p>
      </div>

      {/* Tabs by contest tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {TAGS.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => setActiveTag(tag.id)}
            className={[
              "px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition",
              activeTag === tag.id
                ? "bg-indigo-500 border-indigo-500 text-slate-950"
                : "bg-slate-900/70 border-slate-700 text-slate-200 hover:bg-slate-800",
            ].join(" ")}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Cards grid (same style as PopularContests) */}
      {filteredContests.length === 0 ? (
        <p className="text-sm text-slate-400">
          No contests found for this category yet.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredContests.map((contest) => {
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
                    <span className="inline-flex rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-400">
                      {TAGS.find((t) => t.id === contest.tag)?.label ??
                        "Contest"}
                    </span>

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
      )}
    </section>
  );
};

export default AllContests;
