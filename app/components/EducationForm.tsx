"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from "./DatePicker";

const educationSchema = z.object({
  institution: z.string().min(1, "Required"),
  fieldOfStudy: z.string().min(1, "Required"),
  degree: z.string().min(1, "Required"),
  endDate: z.date().optional(),
  location: z.string().min(1, "Required"),
  isStudent: z.boolean().default(false),
});

type EducationEntry = z.infer<typeof educationSchema>;

export default function EducationForm() {
  const [entries, setEntries] = useState<EducationEntry[]>([
    {
      institution: "",
      fieldOfStudy: "",
      degree: "",
      location: "",
      isStudent: false,
    },
  ]);

  const addEntry = () => {
    setEntries([
      ...entries,
      {
        institution: "",
        fieldOfStudy: "",
        degree: "",
        location: "",
        isStudent: false,
      },
    ]);
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto p-6 space-y-[10px] bg-white rounded-lg">
      <h2 className="text-[20px] leading-[24px] text-[#001633] font-medium">Education</h2>
      <p className="text-[#333333] text-sm mb-4">
        Input your educational background, degrees earned, and academic achievements.
      </p>

      {entries.map((_, index) => (
        <EducationEntryForm
          key={index}
          index={index}
          entries={entries}
          removeEntry={removeEntry}
          addEntry={addEntry}
        />
      ))}
    </div>
  );
}

// Form per education entry
function EducationEntryForm({
  index,
  entries,
  removeEntry,
  addEntry,
}: {
  index: number;
  entries: EducationEntry[];
  removeEntry: (index: number) => void;
  addEntry: () => void;
}) {
  const {
    control,
    register,
    watch,
  } = useForm<EducationEntry>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: "",
      fieldOfStudy: "",
      degree: "",
      location: "",
      isStudent: false,
    },
  });

  const isStudent = watch("isStudent");

  return (
    <div className=" space-y-4">
      <h3 className="text-[18px] leading-[21.6px] text-[#001633]">Education Entry {index + 1}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-[#002156]">Institution Name</label>
          <input
            {...register("institution")}
            className="border border-[#8391CC] p-2 w-full rounded focus:outline-none focus:bg-[#F7FCFF] text-[#00317F] focus:border-[#0061F9]"
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-[#002156]">Field of Study</label>
          <input
            {...register("fieldOfStudy")}
            className="border border-[#8391CC] p-2 w-full rounded focus:outline-none focus:bg-[#F7FCFF] text-[#00317F] focus:border-[#0061F9]"
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-[#002156]">Degree</label>
          <input
            {...register("degree")}
            className="border border-[#8391CC] p-2 w-full rounded focus:outline-none focus:bg-[#F7FCFF] text-[#00317F] focus:border-[#0061F9]"
          />
        </div>


        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-[#002156]">End Date</label>
          <Controller
            name="endDate"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <DatePicker
                value={isStudent ? "MM/YY" : field.value?.toString() || undefined}
                onChange={(dateString) => !isStudent && field.onChange(dateString)}
                isDisabled={isStudent}
              />
            )}
          />
        </div>
      </div>


      <div className="flex items-center gap-2 mt-4">
        <Controller
          name="isStudent"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex items-center gap-2 mt-2">
              <div
                className={`w-5 h-5 flex items-center justify-center border rounded-sm cursor-pointer border-[#8391CC] ${value && "bg-[#8391CC]"}`}
                onClick={() => onChange(!value)}
              >
                <input
                  type="checkbox"
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value || false}
                  className="hidden"
                />
                {value && (
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="text-[16px] text-[#002156]">I am still a student</span>
            </div>
          )}
        />
      </div>

      <div className="mt-2">
        <label className="text-[14px] text-[#002156]">Location</label>
        <input
          {...register("location")}
          className="border border-[#8391CC] p-2 w-full rounded focus:outline-none focus:bg-[#F7FCFF] text-[#00317F] focus:border-[#0061F9]"
        />
      </div>


      <div className="flex gap-4 justify-end mt-3">
        {index === entries.length - 1 && entries.length > 1 && (
          <button
            type="button"
            onClick={() => removeEntry(index)}
            className="text-[#FF3B30] mr-2"
          >
            - Remove section
          </button>
        )}
        {index === entries.length - 1 && (
          <button
            type="button"
            onClick={addEntry}
            className="text-[#004CB4]"
          >
            + Add education
          </button>
        )}
      </div>
    </div>
  );
}
