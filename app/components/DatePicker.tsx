"use client";
import React, { useState } from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  isDisabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, isDisabled }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);

  const handleMonthSelect = (month: string) => {
    if (!isDisabled) {
      onChange(`${month} ${selectedYear}`);
      setIsOpen(false);
    }
  };

  const handleYearChange = (direction: "prev" | "next") => {
    if (!isDisabled) {
      setSelectedYear((prevYear) =>
        direction === "prev" ? prevYear - 1 : prevYear + 1
      );
    }
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        disabled={isDisabled}
        className={`border border-[#8391CC] p-2 w-full rounded text-[#00317F] bg-white focus:outline-none flex justify-between items-center ${
          isDisabled ? "cursor-not-allowed opacity-50" : "focus:bg-[#F7FCFF] focus:border-[#0061F9]"
        }`}
      >
        {value || "MM/YY"}
        <svg
          className="w-5 h-5 text-[#8391CC]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      
      {isOpen && !isDisabled && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
          <div className="flex justify-between items-center text-[#00317F] font-semibold text-lg">
            <button
              onClick={() => handleYearChange("prev")}
              disabled={isDisabled}
              className={`p-2 rounded ${
                isDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"
              }`}
            >
              <svg
                className="w-5 h-5 text-[#8391CC] transform rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <span>{selectedYear}</span>
            <button
              onClick={() => handleYearChange("next")}
              disabled={isDisabled}
              className={`p-2 rounded ${
                isDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"
              }`}
            >
              <svg
                className="w-5 h-5 text-[#8391CC] transform -rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Grid for the months */}
          <div className="grid grid-cols-3 gap-2">
            {months.map((month) => (
              <button
                key={month}
                onClick={() => handleMonthSelect(month)}
                disabled={isDisabled}
                className={`text-sm p-2 border rounded-md border-[#8391CC] ${
                  isDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
