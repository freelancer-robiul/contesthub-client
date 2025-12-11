// src/Pages/Extra/HowItWorks.jsx

const steps = [
  {
    id: 1,
    title: "Create your account",
    text: "Sign up using your email or Google account. Complete your profile so creators and admins can recognize you easily.",
  },
  {
    id: 2,
    title: "Discover and join contests",
    text: "Browse contests by category, read the full brief and register by paying the entry fee. You can track deadlines and tasks from your dashboard.",
  },
  {
    id: 3,
    title: "Submit, wait & celebrate",
    text: "Submit your work following the contest instructions. After the deadline, creators declare winners and your achievements appear on the leaderboard.",
  },
];

const roles = [
  {
    role: "Normal user",
    description:
      "Browse contests, register, submit your work and track your winnings in a personal dashboard.",
  },
  {
    role: "Contest creator",
    description:
      "Launch new contests, manage submissions and declare winners once the deadline is over.",
  },
  {
    role: "Admin",
    description:
      "Approve contests, manage users and keep the entire ContestHub experience clean and secure.",
  },
];

const HowItWorks = () => {
  return (
    <section className="mt-6 space-y-8">
      {/* Hero */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-900 px-6 py-8 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-2">
            how contesthub works
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-2">
            Launch, join and win creative contests in one place.
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            ContestHub connects creators and participants in a structured
            contest workflow. From registration and payment to winner
            declaration and leaderboard updates – everything runs in a single
            platform.
          </p>
        </div>
        <div className="flex-1">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 px-5 py-4 text-xs text-slate-200">
            <p>
              <span className="font-semibold text-emerald-300">
                Secure payment:
              </span>{" "}
              registration fees are handled through a dedicated payment flow.
            </p>
            <p className="mt-2">
              <span className="font-semibold text-sky-300">Fair results:</span>{" "}
              only contest creators can declare winners and each contest has one
              official champion.
            </p>
            <p className="mt-2">
              <span className="font-semibold text-indigo-300">
                Transparent progress:
              </span>{" "}
              your participation history and winnings are always visible in your
              dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div>
        <h2 className="text-lg font-semibold text-slate-50 mb-2">
          Three simple steps to get started
        </h2>
        <p className="text-xs text-slate-400 mb-4 max-w-xl">
          Whether you are a designer, writer or someone with a brilliant idea –
          you can join contests in minutes.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/15 border border-indigo-500/60 flex items-center justify-center text-indigo-200 text-sm font-semibold">
                  {step.id}
                </div>
                <span className="text-[11px] text-slate-500">
                  Step {step.id}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-50 mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-slate-300">{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Roles */}
      <div className="grid md:grid-cols-[1.1fr,1fr] gap-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-50 mb-2">
            Three roles, one connected system
          </h2>
          <p className="text-xs text-slate-400 mb-4 max-w-xl">
            ContestHub is designed around three clear roles so that every action
            is secure, traceable and easy to manage.
          </p>

          <div className="space-y-3">
            {roles.map((item) => (
              <div
                key={item.role}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3"
              >
                <p className="text-xs font-semibold text-slate-50 mb-1">
                  {item.role}
                </p>
                <p className="text-[11px] text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Small FAQ style box */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-5 py-4 text-xs text-slate-200">
          <h3 className="text-sm font-semibold text-slate-50 mb-2">
            What happens after a contest ends?
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
            <li>The deadline countdown reaches zero.</li>
            <li>The contest is marked as &quot;Ended&quot;.</li>
            <li>
              The creator reviews submissions and declares one official winner.
            </li>
            <li>
              The winner&apos;s profile is updated with a new achievement and
              may appear on the leaderboard.
            </li>
            <li>
              Other participants can still see the contest and learn from the
              results.
            </li>
          </ol>
          <p className="mt-3 text-[11px] text-slate-400">
            As you build the full application, this flow will be powered by your
            backend APIs, JWT-secured routes and role-based dashboards.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
