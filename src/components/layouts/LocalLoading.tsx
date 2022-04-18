import React from "react";

const LocalLoading = () => {
  return (
    <button type="button" className="bg-indigo-500 animate-spin" disabled>
      <svg
        className="h-8 w-8 text-gray-700"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {" "}
        <polyline points="23 4 23 10 17 10" />{" "}
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    </button>
  );
};

export default LocalLoading;
