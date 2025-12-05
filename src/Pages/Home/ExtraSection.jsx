// src/Pages/Home/ExtraSection.jsx

const ExtraSection = () => {
  return (
    <section className="mt-4 rounded-3xl border border-slate-800 bg-slate-950/70 px-6 py-8 sm:px-10 sm:py-10">
      <div className="max-w-4xl space-y-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
          Why creators and participants choose ContestHub
        </h2>

        <p className="text-sm sm:text-base text-slate-300">
          ContestHub is built for students, freelancers and teams who want to
          grow through real-world challenges. You can practice, build a public
          portfolio and connect with people who love the same creative work that
          you do.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-50 mb-1">
              Built for learning
            </h3>
            <p className="text-xs text-slate-400">
              Every contest comes with a clear brief, deadline and prize so you
              can treat it like a real client project and improve with every
              submission.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-50 mb-1">
              Fair & transparent
            </h3>
            <p className="text-xs text-slate-400">
              Contest creators review all submissions and declare a single
              winner. Your results, wins and participation history stay on your
              profile.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-50 mb-1">
              Flexible categories
            </h3>
            <p className="text-xs text-slate-400">
              Explore contests across logo design, writing, product ideas,
              gaming reviews and more. Pick what matches your skills and goals.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-400">
          You can start as a participant today and later become a creator to
          host your own contests when you are ready.
        </p>
      </div>
    </section>
  );
};

export default ExtraSection;
