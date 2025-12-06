// src/Pages/Dashboard/Creator/EditContest.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const dummyCreatorContests = [
  {
    id: "logo-sprint",
    name: "Fintech Logo Design Sprint",
    image:
      "https://images.pexels.com/photos/3153207/pexels-photo-3153207.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Design a modern, minimal logo for a next-generation fintech app.",
    price: 10,
    prizeMoney: 150,
    taskInstruction:
      "Create a primary logo and one icon variation. Deliver PNG and SVG files.",
    contestType: "image-design",
    deadline: "2025-12-31T18:00:00Z",
  },
  {
    id: "ai-article",
    name: "AI in Education Article Challenge",
    image:
      "https://images.pexels.com/photos/4144096/pexels-photo-4144096.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Write an article on how AI is changing classrooms around the world.",
    price: 8,
    prizeMoney: 120,
    taskInstruction:
      "Write 800–1200 words with at least two real examples of AI in classrooms.",
    contestType: "article-writing",
    deadline: "2025-11-30T18:00:00Z",
  },
];

const contestTypes = [
  { value: "image-design", label: "Image Design" },
  { value: "article-writing", label: "Article Writing" },
  { value: "business-idea", label: "Business Ideas" },
  { value: "gaming-review", label: "Gaming Reviews" },
];

const EditContest = () => {
  const { contestId } = useParams();
  const [submitting, setSubmitting] = useState(false);

  const contest = useMemo(
    () => dummyCreatorContests.find((c) => c.id === contestId),
    [contestId]
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      description: "",
      price: "",
      prizeMoney: "",
      taskInstruction: "",
      contestType: "",
      deadline: null,
    },
  });

  useEffect(() => {
    if (contest) {
      reset({
        name: contest.name,
        image: contest.image,
        description: contest.description,
        price: contest.price,
        prizeMoney: contest.prizeMoney,
        taskInstruction: contest.taskInstruction,
        contestType: contest.contestType,
        deadline: new Date(contest.deadline),
      });
    }
  }, [contest, reset]);

  const onSubmit = async (data) => {
    if (!contest) return;
    setSubmitting(true);
    try {
      // TODO: later send update request to backend
      console.log("Updated contest:", {
        id: contest.id,
        ...data,
      });
      // এখানে পরে sweet alert / toast দেখানো হবে
    } catch (err) {
      console.error("Failed to update contest", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!contest) {
    return (
      <div>
        <h2 className="text-lg font-semibold text-slate-50 mb-1">
          Edit Contest
        </h2>
        <p className="text-xs text-slate-400">
          Contest not found. Please go back to your contests list.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-50 mb-1">Edit Contest</h2>
      <p className="text-xs text-slate-400 mb-4">
        Updating contest:{" "}
        <span className="font-semibold text-slate-100">{contest.name}</span>
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 md:grid-cols-2 text-sm"
      >
        {/* Name */}
        <div className="md:col-span-2">
          <label className="block text-xs text-slate-400 mb-1">
            Contest Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Contest name is required" })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
          />
          {errors.name && (
            <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Image URL</label>
          <input
            type="text"
            {...register("image", { required: "Image URL is required" })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
          />
          {errors.image && (
            <p className="text-xs text-red-400 mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Contest type */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Contest Type
          </label>
          <select
            {...register("contestType", {
              required: "Contest type is required",
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
          >
            <option value="">Select a type</option>
            {contestTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.contestType && (
            <p className="text-xs text-red-400 mt-1">
              {errors.contestType.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Entry Fee (Price)
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Entry fee is required",
              min: { value: 0, message: "Price cannot be negative" },
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
          />
          {errors.price && (
            <p className="text-xs text-red-400 mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Prize money */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Prize Money
          </label>
          <input
            type="number"
            step="0.01"
            {...register("prizeMoney", {
              required: "Prize money is required",
              min: { value: 1, message: "Prize must be at least 1" },
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
          />
          {errors.prizeMoney && (
            <p className="text-xs text-red-400 mt-1">
              {errors.prizeMoney.message}
            </p>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Deadline</label>
          <Controller
            control={control}
            name="deadline"
            rules={{ required: "Deadline is required" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                showTimeSelect
                dateFormat="dd MMM yyyy, h:mm aa"
                minDate={new Date()}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
              />
            )}
          />
          {errors.deadline && (
            <p className="text-xs text-red-400 mt-1">
              {errors.deadline.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-xs text-slate-400 mb-1">
            Short Description
          </label>
          <textarea
            rows={3}
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
          />
          {errors.description && (
            <p className="text-xs text-red-400 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Task instruction */}
        <div className="md:col-span-2">
          <label className="block text-xs text-slate-400 mb-1">
            Task Instruction
          </label>
          <textarea
            rows={4}
            {...register("taskInstruction", {
              required: "Task instruction is required",
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
          />
          {errors.taskInstruction && (
            <p className="text-xs text-red-400 mt-1">
              {errors.taskInstruction.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {submitting ? "Updating..." : "Update Contest"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContest;
