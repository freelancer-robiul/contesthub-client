// src/Pages/Auth/Login.jsx
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../../firebase/firebase.config";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios"; // তোমার axios instance
// চাইলে react-hot-toast বা sweetalert2 use করতে পারো
// import { toast } from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [serverError, setServerError] = useState("");

  const from = location.state?.from?.pathname || "/";

  // 🟣 Email + password login
  const onSubmit = async (data) => {
    setServerError("");

    try {
      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { user, token } = res.data;
      login(user, token);

      // toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setServerError(
        err.response?.data?.message || "Login failed. Please try again."
      );
      // toast.error("Login failed");
    }
  };

  // 🟡 Google login handler
  const handleGoogleLogin = async () => {
    setServerError("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const gUser = result.user;

      const payload = {
        name: gUser.displayName,
        email: gUser.email,
        photoURL: gUser.photoURL,
      };

      const res = await api.post("/auth/google-login", payload);

      const { user, token } = res.data;
      login(user, token);

      // toast.success("Logged in with Google");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Google login failed:", err);
      setServerError("Google sign-in failed. Please try again.");
      // toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-semibold mb-1 text-center">
          Welcome back
        </h2>
        <p className="text-sm text-slate-400 mb-4 text-center">
          Log in to continue joining contests and tracking your progress.
        </p>

        {serverError && (
          <div className="mb-4 rounded-xl border border-red-500/50 bg-red-950/40 px-3 py-2 text-xs text-red-200">
            {serverError}
          </div>
        )}

        {/* Email / password form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Email address
            </label>
            <input
              type="email"
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition text-sm font-semibold py-2"
          >
            Log in
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Or
          </span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        {/* Google button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-900 transition text-sm font-medium py-2 flex items-center justify-center gap-2"
        >
          <span role="img" aria-label="lock">
            🔐
          </span>
          <span>Continue with Google</span>
        </button>

        <p className="mt-4 text-xs text-slate-400 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
