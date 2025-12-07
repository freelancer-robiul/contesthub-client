// src/Pages/Contests/ContestDetails.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";

const fetchContest = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  const res = await api.get(`/contests/${id}`);
  return res.data;
};

const ContestDetails = () => {
  const { id } = useParams();

  const {
    data: contest,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["contest", id],
    queryFn: fetchContest,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-300">
        Loading contest details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-300 text-sm">
        Failed to load contest: {error.message}
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400">
        Contest not found.
      </div>
    );
  }

  const deadline = new Date(contest.deadline);
  const ended = deadline.getTime() < Date.now();

  return (
    <section className="pt-6 pb-10 max-w-4xl mx-auto">
      <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-950/80">
        <div className="h-56 w-full overflow-hidden">
          <img
            src={contest.image}
            alt={contest.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">
                {contest.name}
              </h1>
              <p className="text-xs text-slate-400">
                Category:{" "}
                <span className="capitalize">
                  {contest.contestType?.replace("-", " ")}
                </span>
              </p>
            </div>

            <div className="text-right text-xs text-slate-300 space-y-1">
              <p>
                Participants:{" "}
                <span className="text-slate-50">
                  {contest.participantsCount || 0}
                </span>
              </p>
              <p>
                Entry fee:{" "}
                <span className="text-indigo-300 font-semibold">
                  ${contest.price?.toFixed(2)}
                </span>
              </p>
              <p>
                Prize money:{" "}
                <span className="text-emerald-300 font-semibold">
                  ${contest.prizeMoney?.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          {/* Deadline / status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
            <div>
              <p className="text-slate-400">
                Deadline:{" "}
                <span className="text-slate-100">
                  {deadline.toLocaleString()}
                </span>
              </p>
              <p className="text-slate-400">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    ended ? "text-red-400" : "text-emerald-300"
                  }`}
                >
                  {ended ? "Contest Ended" : "Running"}
                </span>
              </p>
            </div>

            {contest.winner?.name && (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-700">
                  {contest.winner.photoURL ? (
                    <img
                      src={contest.winner.photoURL}
                      alt={contest.winner.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-slate-800 text-xs">
                      🏆
                    </div>
                  )}
                </div>
                <div className="text-xs text-slate-300">
                  <p className="font-semibold">Winner</p>
                  <p>{contest.winner.name}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-slate-800 pt-4 space-y-3 text-sm text-slate-200">
            <div>
              <h2 className="font-semibold text-slate-50 mb-1">
                Contest Description
              </h2>
              <p className="text-slate-300 whitespace-pre-line">
                {contest.description}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-slate-50 mb-1">
                Task Instructions
              </h2>
              <p className="text-slate-300 whitespace-pre-line">
                {contest.taskInstructions}
              </p>
            </div>
          </div>

          {/* Register button */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              disabled={ended}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                ended
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600 text-slate-950"
              }`}
            >
              {ended ? "Contest Ended" : "Register & Pay"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContestDetails;
