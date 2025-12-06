// src/Pages/Dashboard/User/MyProfile.jsx
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const dummyUser = {
  name: "Demo User",
  email: "demo@example.com",
  photoURL: "https://i.pravatar.cc/100?u=demo",
  address: "Dhaka, Bangladesh",
  participatedCount: 12,
  winCount: 3,
};

const MyProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: dummyUser.name,
      photoURL: dummyUser.photoURL,
      address: dummyUser.address,
    },
  });

  const stats = useMemo(() => {
    const { participatedCount, winCount } = dummyUser;
    const winPercentage =
      participatedCount > 0
        ? Math.round((winCount / participatedCount) * 100)
        : 0;
    return { participatedCount, winCount, winPercentage };
  }, []);

  const onSubmit = (data) => {
    console.log("Profile update data (client-side only for now):", data);
    // TODO: later call backend API to update profile
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr,1fr]">
      {/* Left: Profile info + chart */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-50 mb-1">My Profile</h2>
        <p className="text-xs text-slate-400">
          View your stats and update your basic information.
        </p>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
          <div className="h-14 w-14 rounded-full overflow-hidden border border-slate-700">
            <img
              src={dummyUser.photoURL}
              alt={dummyUser.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-50">
              {dummyUser.name}
            </p>
            <p className="text-xs text-slate-400">{dummyUser.email}</p>
            <p className="text-xs text-slate-300 mt-1">
              {dummyUser.address || "No address added yet"}
            </p>
          </div>
        </div>

        {/* Win percentage chart (simple progress bar) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
          <p className="text-xs text-slate-400">Performance overview</p>

          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="h-3 w-full rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-3 rounded-full bg-emerald-400"
                  style={{ width: `${stats.winPercentage}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-300">
                Win percentage:{" "}
                <span className="font-semibold text-emerald-300">
                  {stats.winPercentage}%
                </span>
              </p>
            </div>
            <div className="text-right text-xs">
              <p className="text-slate-400">Participated</p>
              <p className="text-slate-100 font-semibold">
                {stats.participatedCount}
              </p>
              <p className="text-slate-400 mt-2">Wins</p>
              <p className="text-emerald-300 font-semibold">{stats.winCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: update form */}
      <div>
        <h3 className="text-sm font-semibold text-slate-50 mb-3">
          Update profile
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Photo URL
            </label>
            <input
              type="text"
              {...register("photoURL")}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Address / City
            </label>
            <input
              type="text"
              {...register("address")}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-full bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
