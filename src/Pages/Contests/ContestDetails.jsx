// src/Pages/Contests/ContestDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import Swal from "sweetalert2";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: contest,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await api.get(`/contests/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-16 text-center text-slate-300">
        Loading contest details...
      </div>
    );
  }

  if (isError || !contest) {
    return (
      <div className="py-16 text-center text-red-400">
        Failed to load contest.
      </div>
    );
  }

  const deadline = contest.deadline ? new Date(contest.deadline) : null;
  const now = new Date();
  const isEnded = deadline && deadline < now;

  const handleRegisterClick = () => {
    if (isEnded) {
      Swal.fire({
        icon: "info",
        title: "Contest ended",
        text: "You can no longer join this contest.",
        background: "#020617",
        color: "#e5e7eb",
      });
      return;
    }

    // Payment page e navigate করছি; state এ contest পাঠাচ্ছি
    navigate(`/payment/${contest._id}`, {
      state: { contest },
    });
  };

  return (
    <section className="py-8 space-y-6">
      {/* Banner */}
      <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60">
        <div className="h-64 w-full overflow-hidden">
          <img
            src={contest.image}
            alt={contest.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-indigo-300">
                {contest.contestType || "Creative contest"}
              </p>
              <h1 className="text-2xl font-semibold">{contest.name}</h1>
            </div>
            <div className="flex flex-col items-end gap-1 text-xs">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-200">
                Entry: ${contest.price}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-semibold">
                Prize: ${contest.prizeMoney}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-200">
                Participants: {contest.participantsCount || 0}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {contest.description}
          </p>

          <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
            {contest.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Task + deadline + CTA */}
      <div className="grid gap-6 md:grid-cols-[2fr,1.2fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 text-sm">
          <h2 className="text-base font-semibold">Task instructions</h2>
          <p className="text-slate-300 whitespace-pre-line">
            {contest.taskInstructions}
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm space-y-2">
            <p className="text-[11px] text-slate-400 uppercase tracking-[0.16em]">
              Deadline
            </p>
            <p className="text-slate-100 font-semibold">
              {deadline ? deadline.toLocaleString() : "No deadline set"}
            </p>
            <p
              className={`text-xs ${
                isEnded ? "text-red-400" : "text-emerald-300"
              }`}
            >
              {isEnded ? "Contest ended" : "You can still join this contest"}
            </p>
          </div>

          <button
            onClick={handleRegisterClick}
            disabled={isEnded}
            className={`w-full rounded-full py-2.5 text-sm font-semibold shadow-sm transition ${
              isEnded
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-indigo-500 text-slate-950 hover:bg-indigo-600"
            }`}
          >
            {isEnded ? "Contest ended" : `Register & Pay $${contest.price}`}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContestDetails;
