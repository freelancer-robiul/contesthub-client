// src/Pages/Static/HowItWorks.jsx
const HowItWorks = () => {
  return (
    <section className="pt-6 pb-10 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50 mb-3">
        How ContestHub works
      </h1>
      <p className="text-sm text-slate-300 mb-4">
        ContestHub connects creators who want fresh ideas with participants who
        want real challenges and prize money.
      </p>

      <ol className="space-y-3 text-sm text-slate-300 list-decimal list-inside">
        <li>
          <span className="font-semibold">Browse contests:</span> Filter by
          category, prize amount and deadline to find a challenge that fits your
          skills.
        </li>
        <li>
          <span className="font-semibold">Register & pay:</span> Join a contest
          by paying a small entry fee using our secure payment system.
        </li>
        <li>
          <span className="font-semibold">Submit your work:</span> Follow the
          task instructions carefully and upload your design, article or review
          before the deadline.
        </li>
        <li>
          <span className="font-semibold">Creator reviews:</span> Contest
          creators review all submissions and declare a single winner for each
          contest.
        </li>
        <li>
          <span className="font-semibold">Grow your profile:</span> Every
          participation and win is recorded on your profile and reflected in the
          leaderboard.
        </li>
      </ol>
    </section>
  );
};

export default HowItWorks;
