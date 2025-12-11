// src/Pages/Auth/Register.jsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    setServerError("");

    try {
      const res = await api.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        photoURL: data.photoURL,
      });

      // server থেকে user + token আসবে
      const { user, token } = res.data;
      login(user, token);

      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setServerError(msg);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl">
        <h1 className="text-xl font-semibold mb-1 text-slate-50">
          Create an account
        </h1>
        <p className="text-xs text-slate-400 mb-6">
          Sign up to host contests, join challenges and track your wins.
        </p>

        {serverError && (
          <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/70 px-3 py-2 text-xs text-red-200">
            {serverError}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="space-y-1 text-xs">
            <label className="text-slate-300">Full name</label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-[11px] text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1 text-xs">
            <label className="text-slate-300">Email address</label>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-[11px] text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1 text-xs">
            <label className="text-slate-300">Password</label>
            <input
              type="password"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-[11px] text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Photo URL */}
          <div className="space-y-1 text-xs">
            <label className="text-slate-300">Photo URL</label>
            <input
              type="url"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
              {...register("photoURL")}
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-indigo-600"
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-[11px] text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-300 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
