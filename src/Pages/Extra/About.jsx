// src/Pages/Extra/About.jsx

const About = () => {
  return (
    <section className="mt-6 space-y-6">
      {/* Intro */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-6 py-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-2">
          About ContestHub
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          ContestHub is a full–stack contest management platform where people
          can create, join and manage creative competitions. The goal is to
          provide a smooth experience for participants, contest creators and
          admins – from registration and payment to winner declaration and
          leaderboard highlights.
        </p>
      </div>

      {/* Tech & features */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-50 mb-2">
            Technology stack
          </h2>
          <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
            <li>React on the client side with modern hooks and routing.</li>
            <li>
              Node.js and Express on the server side for building RESTful APIs.
            </li>
            <li>MongoDB Atlas as the main database for users and contests.</li>
            <li>JWT-based authentication for all protected API routes.</li>
            <li>
              Firebase authentication for email/password and Google sign-in.
            </li>
            <li>TanStack Query for data fetching and cache management.</li>
            <li>Tailwind CSS for a responsive and clean UI design.</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-50 mb-2">
            Core features
          </h2>
          <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
            <li>
              Public home page with popular contests, winner highlights and a
              search experience.
            </li>
            <li>
              Role-based dashboards for normal users, contest creators and
              admins.
            </li>
            <li>
              Secure registration and login with JWT and Firebase auth
              integration.
            </li>
            <li>
              Admin approval system for contests and flexible role management
              for users.
            </li>
            <li>
              Contest details page with live deadline countdown and registration
              flow.
            </li>
            <li>
              User statistics such as participation history, win count and
              leaderboard ranking.
            </li>
          </ul>
        </div>
      </div>

      {/* Vision / closing */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-50 mb-2">
          Project vision
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl">
          The idea behind ContestHub is to build a production–ready project that
          brings together multiple skills: frontend design, backend development,
          authentication, database modeling, role management, payment
          integration and deployment. As you continue developing this platform,
          you can use it as a portfolio project to demonstrate your full–stack
          capabilities.
        </p>
        <p className="mt-3 text-xs text-slate-400">
          Every meaningful Git commit, API endpoint and UI improvement brings
          this project closer to a real-world application that people could use
          to host their own creative competitions.
        </p>
      </div>
    </section>
  );
};

export default About;
