// src/Components/Footer.jsx
const Footer = () => {
  const year = 2025; // Fixed as per your requirement

  return (
    <footer className="mt-10 border-t border-slate-800 bg-slate-950 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo + site name */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-xl">
            🎯
          </div>
          <span className="text-slate-100 font-semibold tracking-wide text-lg">
            ContestHub
          </span>
        </div>

        {/* Copyright */}
        <p className="text-slate-400 text-sm text-center">
          © {year} ContestHub — All rights reserved.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 hover:text-white text-sm transition"
          >
            Facebook
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 hover:text-white text-sm transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
