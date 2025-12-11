// src/Pages/Dashboard/User/MyProfile.jsx
import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { api } from "../../../api/axios";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const fetchMyProfile = async () => {
  const res = await api.get("/users/me");
  return res.data; // { user, stats }
};

const MyProfile = () => {
  const queryClient = useQueryClient();
  const { user: authUser, token, login } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["my-profile"],
    queryFn: fetchMyProfile,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      photoURL: "",
      bio: "",
    },
  });

  // form কে api data দিয়ে reset করা
  useEffect(() => {
    if (data?.user) {
      reset({
        name: data.user.name || "",
        photoURL: data.user.photoURL || "",
        bio: data.user.bio || "",
      });
    }
  }, [data, reset]);

  const { mutateAsync: updateProfile } = useMutation({
    mutationFn: async (payload) => {
      const res = await api.put("/users/me", payload);
      return res.data;
    },
    onSuccess: (resData) => {
      toast.success(resData?.message || "Profile updated");
      // AuthContext-এর user আপডেট করি, token একই রাখি
      if (resData.user && token) {
        login(resData.user, token);
      }
      queryClient.invalidateQueries(["my-profile"]);
      queryClient.invalidateQueries(["leaderboard"]);
    },
    onError: (err) => {
      const msg =
        err?.response?.data?.message ||
        "Failed to update profile. Please try again.";
      toast.error(msg);
    },
  });

  const onSubmit = async (formData) => {
    await updateProfile(formData);
  };

  if (isLoading) {
    return (
      <div className="mt-4 text-sm text-slate-300">Loading your profile...</div>
    );
  }

  if (isError) {
    return (
      <div className="mt-4 text-sm text-red-300">
        Failed to load profile: {error?.message}
      </div>
    );
  }

  const profile = data?.user;
  const stats = data?.stats || {};
  const participated = stats.participated ?? 0;
  const wins = stats.wins ?? 0;
  const winPercentage =
    participated === 0 ? 0 : Math.round((wins / participated) * 100);

  return (
    <section className="space-y-6">
      {/* Top: profile summary + stats */}
      <div className="grid md:grid-cols-[1.5fr,1.2fr] gap-4">
        {/* Profile card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4 flex gap-4">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={
                  profile.photoURL ||
                  "https://i.ibb.co/9GZ2ZqT/default-avatar.png"
                }
                alt={profile.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border border-slate-700"
              />
              <div className="absolute -bottom-1 -right-1 px-2 py-0.5 text-[10px] rounded-full bg-indigo-500 text-slate-950 font-semibold">
                {profile.role}
              </div>
            </div>
          </div>
          <div className="flex-1 text-xs">
            <p className="text-slate-100 text-sm font-semibold">
              {profile.name}
            </p>
            <p className="text-[11px] text-slate-400 mb-1">{profile.email}</p>
            <p className="text-[11px] text-slate-300">
              {profile.bio || "You can add a short bio about yourself."}
            </p>
          </div>
        </div>

        {/* Stats + win chart */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4 flex flex-col gap-3 text-xs">
          <p className="text-slate-200 font-semibold">
            Contest performance overview
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-700 px-3 py-2">
              <p className="text-[11px] text-slate-400 mb-1">Participated</p>
              <p className="text-lg font-semibold text-indigo-300">
                {participated}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-700 px-3 py-2">
              <p className="text-[11px] text-slate-400 mb-1">Wins</p>
              <p className="text-lg font-semibold text-emerald-300">{wins}</p>
            </div>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-700 px-3 py-2">
              <p className="text-[11px] text-slate-400 mb-1">Win rate</p>
              <p className="text-lg font-semibold text-amber-300">
                {winPercentage}%
              </p>
            </div>
          </div>

          {/* Simple win% progress bar (chart) */}
          <div className="mt-1">
            <p className="text-[11px] text-slate-400 mb-1">Win percentage</p>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-amber-300 to-indigo-400 transition-all"
                style={{
                  width: `${winPercentage}%`,
                }}
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              {participated === 0
                ? "Participate in contests to start building your win history."
                : `You have won ${wins} out of ${participated} contests.`}
            </p>
          </div>
        </div>
      </div>

      {/* Update profile form */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
        <h2 className="text-sm font-semibold text-slate-50 mb-2">
          Update your profile
        </h2>
        <p className="text-[11px] text-slate-400 mb-4">
          Update your name, profile picture, and a short bio. This information
          appears on the leaderboard and winner highlights.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-4 text-xs"
        >
          <div className="space-y-3">
            <div>
              <label className="block mb-1 text-slate-300">Full name</label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-[11px] text-red-400 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-slate-300">Photo URL</label>
              <input
                type="url"
                {...register("photoURL")}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="https://your-photo-link.com/avatar.jpg"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block mb-1 text-slate-300">
                Short bio / address
              </label>
              <textarea
                rows={4}
                {...register("bio")}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Tell others who you are, where you're from, or what you love to create."
              />
            </div>

            <div className="flex items-center justify-end mt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  isSubmitting
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-indigo-500 text-slate-950 hover:bg-indigo-600"
                }`}
              >
                {isSubmitting ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MyProfile;
