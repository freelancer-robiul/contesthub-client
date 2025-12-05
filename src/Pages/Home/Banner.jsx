// src/Pages/Home/Banner.jsx
import { useState } from "react";

const Banner = () => {
  const [searchTag, setSearchTag] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTag.trim()) return;

    // TODO: later call backend API with this tag
    console.log("Searching contests by tag:", searchTag);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-900 px-6 py-10 sm:px-10 sm:py-14">
      {/* subtle glow circles */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-40 w-40 rounded-full bg-indigo-400/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-40 w-40 rounded-full bg-fuchsia-400/40 blur-3xl" />

      <div className="relative max-w-3xl">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-950/30 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm">
          Live creative contests • Real prize money
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-50">
          Join contests that turn your skills
          <span className="block text-amber-300">into real rewards.</span>
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-100/80 max-w-xl">
          Explore design, writing, business ideas, gaming reviews and more. Pick
          a challenge, submit your best work, and grow your creative portfolio
          with every contest you join.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center"
        >
          <input
            type="text"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            placeholder="Search by contest tag – design, writing, gaming..."
            className="w-full rounded-full border border-white/20 bg-slate-950/20 px-4 py-2.5 text-sm text-slate-50 placeholder:text-slate-200/70 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/60"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-md hover:bg-amber-200 transition"
          >
            Search contests
          </button>
        </form>

        <p className="mt-2 text-xs sm:text-sm text-slate-100/80">
          Try tags like <span className="font-semibold">design</span>,{" "}
          <span className="font-semibold">article</span>,{" "}
          <span className="font-semibold">business</span>, or{" "}
          <span className="font-semibold">gaming</span>.
        </p>
      </div>
    </section>
  );
};

export default Banner;
