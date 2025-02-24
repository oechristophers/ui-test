"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const educationSchema = z.object({
  institution: z.string().min(1, "Required"),
  fieldOfStudy: z.string().min(1, "Required"),
  degree: z.string().min(1, "Required"),
  endDate: z.string().optional(),
  location: z.string().min(1, "Required"),
  isStudent: z.boolean().default(false),
});

type EducationEntry = z.infer<typeof educationSchema>;

export default function EducationForm() {
  const { control, register, handleSubmit } = useForm<EducationEntry>({
    resolver: zodResolver(educationSchema),
  });

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

  const onSubmit = (data: EducationEntry) => {
    console.log("Form Submitted:", data);
    console.log("All Entries:", entries);
  };

  const fields = [
    { name: "institution", label: "Institution Name" },
    { name: "fieldOfStudy", label: "Field of Study" },
    { name: "degree", label: "Degree" },
    { name: "endDate", label: "End date", optional: true },
    { name: "isStudent", label: "I am still a student", type: "checkbox" },
  ];

  return (
    <div className="mx-auto p-6 space-y-[10px] bg-white rounded-lg ">
      <h2 className="text-[20px] leading-[24px] text-[#001633] font-medium">
        Education
      </h2>
      <p className="text-[#333333] text-sm mb-4">
        Input your educational background, degrees earned, and academic
        achievements.
      </p>
      {entries.map((_, index) => (
        <div key={index}>
          <h3 className="text-[18px] leading-[21.6px] text-[#001633]">
            Education Entry {index + 1}
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="py-[10px] space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {fields.map(({ name, label, optional, type }) => (
                <div key={name} className="flex flex-col gap-[10px]">
                  {type !== "checkbox" && (
                    <label className="text-[14px] leading-[14.64px] text-[#002156]">
                      {label}
                    </label>
                  )}

                  {type === "checkbox" ? (
                    <Controller
                      name={`isStudent`}
                      control={control}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <div className="flex items-center gap-2 mt-2">
                          <div
                            className={`w-5 h-5 flex items-center justify-center border rounded-sm cursor-pointer border-[#8391CC] ${
                              value && "bg-[#8391CC] "
                            }`}
                            onClick={() => onChange(!value)}
                          >
                            <input
                              type="checkbox"
                              onChange={(e) => onChange(e.target.checked)}
                              onBlur={onBlur}
                              checked={value || false}
                              ref={ref}
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
                          <span className="text-[16px] text-[#002156]">
                            I am still a student
                          </span>
                        </div>
                      )}
                    />
                  ) : (
                    <input
                      {...register(name as keyof EducationEntry)}
                      className="border border-[#8391CC] p-2 w-full rounded focus:outline-none focus:bg-[#F7FCFF] text-[#00317F] focus:border-[#0061F9]  "
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-2">
              <label className="text-[14px] leading-[14.64px] text-[#002156] ">
                Location
              </label>
              <input
                {...register("location")}
                className="border border-[#8391CC] focus:bg-[#F7FCFF] text-[#00317F] p-2 w-full rounded focus:outline-none focus:border-[#0061F9]  "
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
            {/* <button type="submit" className="border border-[#8391CC] p-1 px-4 rounded-xl">Submit</button> */}
          </form>
        </div>
      ))}
    </div>
  );
}
