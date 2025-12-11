// src/Pages/Payments/PaymentPage.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const { contestId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Contest details state থেকে আসতে পারে
  const contestFromState = location.state?.contest;

  const {
    data: contest,
    isLoading,
    isError,
  } = useQuery({
    enabled: !contestFromState,
    queryKey: ["payment-contest", contestId],
    queryFn: async () => {
      const res = await api.get(`/contests/${contestId}`);
      return res.data;
    },
  });

  const finalContest = contestFromState || contest;

  if (!finalContest && isLoading) {
    return (
      <div className="py-16 text-center text-slate-300">
        Loading payment info...
      </div>
    );
  }

  if (!finalContest || isError) {
    return (
      <div className="py-16 text-center text-red-400">
        Failed to load contest for payment.
      </div>
    );
  }

  const handlePayAndJoin = async () => {
    try {
      const res = await api.post("/payments/join", {
        contestId: finalContest._id,
      });

      Swal.fire({
        icon: "success",
        title: "Payment successful!",
        text: res.data?.message || "You are now registered for this contest.",
        timer: 1800,
        showConfirmButton: false,
        background: "#020617",
        color: "#e5e7eb",
      });

      navigate("/dashboard/participated");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Payment failed. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Payment failed",
        text: msg,
        background: "#020617",
        color: "#e5e7eb",
      });
    }
  };

  return (
    <section className="py-10 grid gap-8 md:grid-cols-[2fr,1.4fr]">
      {/* Left: summary */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <h1 className="text-xl font-semibold">Complete your payment</h1>
        <p className="text-sm text-slate-400">
          You&apos;re about to join{" "}
          <span className="font-semibold text-slate-100">
            {finalContest.name}
          </span>
          .
        </p>

        <div className="flex gap-3 mt-3">
          <div className="h-20 w-28 rounded-xl overflow-hidden bg-slate-800/70">
            <img
              src={finalContest.image}
              alt={finalContest.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-slate-100">{finalContest.name}</p>
            <p className="text-slate-400 text-xs">
              Type: {finalContest.contestType}
            </p>
            {finalContest.deadline && (
              <p className="text-slate-400 text-xs">
                Deadline: {new Date(finalContest.deadline).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-400">Entry fee</span>
            <span className="font-semibold text-amber-300">
              ${finalContest.price}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Service fee</span>
            <span className="text-slate-200">$0.00</span>
          </div>
          <div className="flex justify-between border-t border-slate-800 pt-2 mt-2">
            <span className="font-semibold text-slate-100">Total</span>
            <span className="font-semibold text-slate-100">
              ${finalContest.price}
            </span>
          </div>
        </div>
      </div>

      {/* Right: fake card form + CTA */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 space-y-4 text-sm">
        <h2 className="text-base font-semibold mb-2">Card details</h2>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-slate-300 text-xs">Cardholder name</label>
            <input
              type="text"
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              placeholder="Your name"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 text-xs">Card number</label>
            <input
              type="text"
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              placeholder="4242 4242 4242 4242"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-300 text-xs">Expiry date</label>
              <input
                type="text"
                className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-indigo-500"
                placeholder="12/29"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-300 text-xs">CVC</label>
              <input
                type="text"
                className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-indigo-500"
                placeholder="123"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handlePayAndJoin}
          className="w-full mt-4 rounded-full bg-indigo-500 py-2.5 text-sm font-semibold text-slate-950 hover:bg-indigo-600"
        >
          Pay & Join Contest
        </button>

        <p className="text-[11px] text-slate-400">
          This is a demo payment. Any card details will work in this assignment.
        </p>
      </div>
    </section>
  );
};

export default PaymentPage;
