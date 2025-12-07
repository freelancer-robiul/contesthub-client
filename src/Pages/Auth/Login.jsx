// src/Pages/Auth/Login.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { api } from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../../firebase/firebase.config";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [authError, setAuthError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ---------------------------
  // EMAIL / PASSWORD → BACKEND
  // ---------------------------
  const onSubmit = async (data) => {
    setAuthError("");
    try {
      const res = await api.post("/auth/login", data);
      // backend JWT + user
      login(res.data.user, res.data.token);
      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setAuthError(msg);
    }
  };

  // ---------------------------
  // GOOGLE SIGN-IN → PURE FIREBASE
  // ---------------------------
  const handleGoogleSignIn = async () => {
    setAuthError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Firebase থেকে পাওয়া ডাটাকে আমাদের AuthContext এর format এ convert করি
      const userData = {
        _id: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email?.split("@")[0],
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        role: "user", // default – চাইলে পরে backend দিয়ে update করতে পারো
      };

      // এখানে আমরা backend JWT ব্যবহার না করে,
      // একটা dummy token string ব্যবহার করছি শুধু লোকাল storage consistency এর জন্য।
      const dummyToken = "firebase-google-token";

      login(userData, dummyToken);
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Google sign-in error:", err);
      setAuthError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-slate-50 mb-1 text-center">
          Welcome back
        </h1>
        <p className="text-sm text-slate-400 text-center mb-5">
          Log in to continue joining contests and tracking your progress.
        </p>

        {authError && (
          <div className="mb-3 rounded-xl bg-red-500/10 border border-red-500/60 px-3 py-2 text-xs text-red-200">
            {authError}
          </div>
        )}

        {/* EMAIL/PASSWORD LOGIN */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Email address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-indigo-500 hover:bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-slate-950 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-[11px] text-slate-500 uppercase tracking-wide">
            or
          </span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        {/* GOOGLE SIGN-IN BUTTON */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-100 flex items-center justify-center gap-2 transition"
        >
          <span className="text-lg">🔐</span>
          <span>Continue with Google</span>
        </button>

        <p className="mt-4 text-xs text-slate-400 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
