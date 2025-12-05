// src/Pages/Error/NotFound.jsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      {/* Big 404 */}
      <h1 className="text-6xl sm:text-8xl font-extrabold text-indigo-500 tracking-widest">
        404
      </h1>

      {/* Sub text */}
      <p className="mt-4 text-lg sm:text-xl text-slate-300">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Illustration-like shape */}
      <div className="mt-6 h-40 w-40 sm:h-48 sm:w-48 rounded-full bg-slate-800/60 border border-slate-700 shadow-inner flex items-center justify-center text-5xl">
        😕
      </div>

      {/* Back Home Button */}
      <Link
        to="/"
        className="mt-8 inline-block rounded-full bg-indigo-500 hover:bg-indigo-600 text-slate-900 font-semibold px-6 py-2.5 shadow-md transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
