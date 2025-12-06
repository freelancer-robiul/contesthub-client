// src/Pages/Dashboard/Creator/CreatorSubmissions.jsx
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const dummySubmissions = [
  {
    id: "s1",
    contestId: "logo-sprint",
    contestName: "Fintech Logo Design Sprint",
    participantName: "Arif Hossain",
    email: "arif@example.com",
    taskInfo: "Figma link: https://example.com/fintech-logo",
    note: "Clean minimal logo with a subtle growth symbol.",
  },
  {
    id: "s2",
    contestId: "logo-sprint",
    contestName: "Fintech Logo Design Sprint",
    participantName: "Mitu Akter",
    email: "mitu@example.com",
    taskInfo: "Drive folder: https://drive.google.com/xyz",
    note: "Rounded icon with gradient background.",
  },
  {
    id: "s3",
    contestId: "ai-article",
    contestName: "AI in Education Article Challenge",
    participantName: "Sajid Hasan",
    email: "sajid@example.com",
    taskInfo: "Notion doc: https://notion.so/ai-education",
    note: "Covers three real classrooms using AI tools.",
  },
];

const CreatorSubmissions = () => {
  const { contestId } = useParams();
  const [winnerByContest, setWinnerByContest] = useState({}); // { contestId: submissionId }

  const submissions = useMemo(() => {
    if (contestId) {
      return dummySubmissions.filter((sub) => sub.contestId === contestId);
    }
    return dummySubmissions;
  }, [contestId]);

  const handleDeclareWinner = (contestId, submissionId) => {
    if (winnerByContest[contestId]) return;

    const ok = window.confirm(
      "Are you sure you want to declare this participant as the winner? This cannot be changed later."
    );
    if (!ok) return;

    setWinnerByContest((prev) => ({
      ...prev,
      [contestId]: submissionId,
    }));
  };

  if (submissions.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-semibold text-slate-50 mb-1">
          Submissions
        </h2>
        <p className="text-xs text-slate-400">
          There are no submissions for this contest yet.
        </p>
      </div>
    );
  }

  const titleContestName = contestId
    ? submissions[0].contestName
    : "All contests";

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-50 mb-1">Submissions</h2>
      <p className="text-xs text-slate-400 mb-4">
        Viewing submissions for{" "}
        <span className="font-semibold text-slate-100">{titleContestName}</span>
        . Click &quot;Declare Winner&quot; to select one winner per contest.
      </p>

      <div className="space-y-3">
        {submissions.map((sub) => {
          const hasWinner = Boolean(winnerByContest[sub.contestId]);
          const isWinner = winnerByContest[sub.contestId] === sub.id;

          return (
            <article
              key={sub.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-50">
                    {sub.participantName}
                  </p>
                  <p className="text-xs text-slate-400">{sub.email}</p>
                </div>

                <div className="text-right">
                  <p className="text-[11px] text-slate-400">Contest</p>
                  <p className="text-xs font-medium text-slate-200">
                    {sub.contestName}
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-300">
                <p className="font-semibold text-slate-200 mb-1">
                  Submitted task
                </p>
                <p>{sub.taskInfo}</p>
                {sub.note && (
                  <p className="mt-1 text-slate-400">Note: {sub.note}</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                {isWinner ? (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                    🏆 Winner declared
                  </span>
                ) : hasWinner ? (
                  <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-[11px] text-slate-400">
                    Winner already selected
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    No winner declared yet for this contest.
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => handleDeclareWinner(sub.contestId, sub.id)}
                  disabled={hasWinner}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-semibold transition ${
                    hasWinner
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                      : "bg-emerald-500 text-slate-950 hover:bg-emerald-600"
                  }`}
                >
                  Declare Winner
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default CreatorSubmissions;
