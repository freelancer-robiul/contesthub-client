// src/Pages/Dashboard/Creator/AddContest.jsx
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const contestTypes = [
  { value: "image-design", label: "Image Design" },
  { value: "article-writing", label: "Article Writing" },
  { value: "business-idea", label: "Business Ideas" },
  { value: "gaming-review", label: "Gaming Reviews" },
];

const AddContest = () => {
  const [submitting, setSubmitting] = useState(false);

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

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      // TODO: later send to backend API
      console.log("New contest data:", data);
      // here you will show toast/sweetalert on success
      reset();
    } catch (err) {
      console.error("Failed to create contest", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-50 mb-1">
        Add New Contest
      </h2>
      <p className="text-xs text-slate-400 mb-4">
        Fill in the details below to launch a new contest. You can edit or
        delete it while it is still pending approval.
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
            placeholder="e.g. Fintech Logo Design Sprint"
          />
          {errors.name && (
            <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Image URL</label>
          <input
            type="text"
            {...register("image", { required: "Image URL is required" })}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
            placeholder="Link to contest banner image"
          />
          {errors.image && (
            <p className="text-xs text-red-400 mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Contest Type */}
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
            placeholder="e.g. 10"
          />
          {errors.price && (
            <p className="text-xs text-red-400 mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Prize Money */}
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
            placeholder="e.g. 150"
          />
          {errors.prizeMoney && (
            <p className="text-xs text-red-400 mt-1">
              {errors.prizeMoney.message}
            </p>
          )}
        </div>

        {/* Deadline (react-datepicker) */}
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
                placeholderText="Select deadline date & time"
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
            placeholder="Briefly describe what this contest is about."
          />
          {errors.description && (
            <p className="text-xs text-red-400 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Task Instruction */}
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
            placeholder="Explain exactly what participants need to deliver. You can include file formats, word limits or any other rules."
          />
          {errors.taskInstruction && (
            <p className="text-xs text-red-400 mt-1">
              {errors.taskInstruction.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {submitting ? "Creating contest..." : "Create Contest"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContest;
