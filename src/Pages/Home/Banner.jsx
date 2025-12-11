// src/Pages/Home/Banner.jsx
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Banner = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      q: "",
    },
  });

  const onSubmit = (data) => {
    const term = data.q?.trim();
    if (!term) {
      navigate("/all-contests");
    } else {
      navigate(`/all-contests?q=${encodeURIComponent(term)}`);
    }
    reset({ q: "" });
  };

  return (
    <section className="mt-6 mb-6 rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-600/40 via-slate-900 to-violet-700/40 px-5 py-6 md:px-8 md:py-8 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-500/30 blur-3xl pointer-events-none" />

      <div className="relative grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
            Welcome to ContestHub
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 leading-snug">
            Discover creative contests, win prizes, and grow your portfolio.
          </h1>
          <p className="text-xs md:text-sm text-indigo-100/90">
            Search by tags like <span className="font-semibold">logo</span>,{" "}
            <span className="font-semibold">UI design</span>,{" "}
            <span className="font-semibold">article</span>, or{" "}
            <span className="font-semibold">gaming review</span> and jump into
            new challenges every week.
          </p>

          {/* Search bar (react-hook-form) */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-3 flex flex-col sm:flex-row gap-2 text-xs"
          >
            <input
              type="text"
              placeholder="Search contests by tag or title..."
              className="flex-1 px-4 py-2 rounded-full bg-slate-950/80 border border-indigo-400/60 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-300 placeholder:text-slate-400"
              {...register("q")}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-full bg-slate-50 text-slate-950 font-semibold hover:bg-slate-200 disabled:opacity-60"
            >
              {isSubmitting ? "Searching…" : "Search contests"}
            </button>
          </form>
        </div>

        {/* Right side illustration */}
        <div className="hidden md:flex justify-end">
          <div className="w-52 h-52 rounded-3xl bg-slate-950/60 border border-indigo-400/40 flex flex-col items-center justify-center text-xs gap-2 shadow-xl shadow-indigo-900/40">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="text-slate-200 font-semibold">Weekly winners</p>
                <p className="text-[11px] text-slate-400">
                  Design, writing & more
                </p>
              </div>
            </div>
            <div className="w-full h-px bg-slate-800 my-1" />
            <div className="flex items-center justify-between w-full px-4 text-[11px] text-slate-300">
              <div>
                <p className="text-slate-400">Active contests</p>
                <p className="text-slate-100 font-semibold">24+</p>
              </div>
              <div>
                <p className="text-slate-400">Total creators</p>
                <p className="text-slate-100 font-semibold">15+</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-slate-400 text-center px-3">
              Join now, submit your best work, and showcase your talent to
              contest creators around the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
