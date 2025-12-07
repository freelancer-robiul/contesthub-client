import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      photoURL: "",
    },
  });

  const onSubmit = async (data) => {
    setAuthError("");

    try {
      const res = await axios.post(
        "http://localhost:5001/api/v1/auth/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Registration successful!");

      const { user, token } = res.data;

      if (user && token) {
        login(user, token);
      }

      navigate(from, { replace: true });
    } catch (err) {
      console.error("Register error:", err?.response?.data || err);

      const msg =
        err?.response?.data?.message ||
        "Registration failed. Please try again.";

      setAuthError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-slate-50 mb-1 text-center">
          Create an account
        </h1>
        <p className="text-sm text-slate-400 text-center mb-5">
          Sign up to host contests, join challenges and track your wins.
        </p>

        {/* Error message */}
        {authError && (
          <div className="mb-3 rounded-xl bg-red-500/10 border border-red-500/60 px-3 py-2 text-xs text-red-200">
            {authError}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
          {/* Name */}
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Full name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
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
                  message: "Enter a valid email",
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

          {/* Password */}
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
                  message: "Password must be at least 6 characters long",
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

          {/* Photo URL */}
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Photo URL
            </label>
            <input
              type="text"
              {...register("photoURL", {
                required: "Photo URL is required",
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
              placeholder="https://example.com/photo.jpg"
            />
            {errors.photoURL && (
              <p className="mt-1 text-xs text-red-400">
                {errors.photoURL.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-indigo-500 hover:bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-slate-950 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-400 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
