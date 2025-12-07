// src/Pages/Dashboard/Creator/AddContest.jsx
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

const AddContest = () => {
  const { user } = useAuth();
  const [deadline, setDeadline] = useState(new Date());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      description: "",
      price: "",
      prizeMoney: "",
      taskInstructions: "",
      contestType: "image-design",
      tags: "",
    },
  });

  const queryClient = useQueryClient();

  // React Query mutation -> POST /api/v1/contests
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData) => {
      const payload = {
        name: formData.name,
        image: formData.image,
        description: formData.description,
        price: Number(formData.price),
        prizeMoney: Number(formData.prizeMoney),
        taskInstructions: formData.taskInstructions,
        contestType: formData.contestType,
        deadline: deadline.toISOString(),
        // comma separated tags -> array
        tags:
          formData.tags
            ?.split(",")
            .map((t) => t.trim())
            .filter(Boolean) || [],
      };

      const res = await api.post("/contests", payload);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Contest created successfully. Waiting for approval.");
      // All contests list refresh
      queryClient.invalidateQueries({ queryKey: ["contests"] });
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.message ||
        "Failed to create contest. Please try again.";
      toast.error(msg);
    },
  });

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("You must be logged in to add contests.");
      return;
    }

    if (user.role !== "creator" && user.role !== "admin") {
      toast.error("Only creators or admins can add contests.");
      return;
    }

    if (!deadline) {
      toast.error("Please select a deadline.");
      return;
    }

    await mutateAsync(data);
    reset();
    setDeadline(new Date());
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-slate-50">
        Add new contest
      </h2>
      <p className="text-xs text-slate-400 mb-4">
        Fill out the form to publish a new contest. Admin will review and
        approve it before it becomes public.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 text-sm max-w-xl"
      >
        {/* Contest Name */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Contest Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Contest name is required" })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
            placeholder="Creative logo design for a gaming brand"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Banner Image URL
          </label>
          <input
            type="text"
            {...register("image", {
              required: "Image URL is required",
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
            placeholder="https://example.com/contest-banner.jpg"
          />
          {errors.image && (
            <p className="mt-1 text-xs text-red-400">{errors.image.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400 resize-none"
            placeholder="Describe what you are looking for and what makes a submission successful."
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price & Prize */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Entry fee (USD)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "Entry fee is required",
                min: { value: 0, message: "Entry fee cannot be negative" },
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
              placeholder="5"
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-400">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Prize money (USD)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("prizeMoney", {
                required: "Prize money is required",
                min: { value: 1, message: "Prize money must be at least 1" },
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
              placeholder="50"
            />
            {errors.prizeMoney && (
              <p className="mt-1 text-xs text-red-400">
                {errors.prizeMoney.message}
              </p>
            )}
          </div>
        </div>

        {/* Task Instructions */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Task Instructions
          </label>
          <textarea
            rows={4}
            {...register("taskInstructions", {
              required: "Task instructions are required",
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400 resize-none"
            placeholder="Explain what exactly participants must do, format of submission, and any important rules."
          />
          {errors.taskInstructions && (
            <p className="mt-1 text-xs text-red-400">
              {errors.taskInstructions.message}
            </p>
          )}
        </div>

        {/* Contest type & Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Contest Type
            </label>
            <select
              {...register("contestType", {
                required: "Contest type is required",
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
            >
              <option value="image-design">Image Design</option>
              <option value="article-writing">Article Writing</option>
              <option value="business-idea">Business Idea</option>
              <option value="game-review">Game Review</option>
              <option value="other">Other</option>
            </select>
            {errors.contestType && (
              <p className="mt-1 text-xs text-red-400">
                {errors.contestType.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              {...register("tags")}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
              placeholder="logo, esports, minimal"
            />
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Deadline</label>
          <div className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus-within:border-indigo-400">
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date || new Date())}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMM d, yyyy h:mm aa"
              className="bg-transparent outline-none w-full text-sm"
              minDate={new Date()}
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-indigo-500 hover:bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-slate-950 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating contest..." : "Create contest"}
        </button>
      </form>
    </div>
  );
};

export default AddContest;
