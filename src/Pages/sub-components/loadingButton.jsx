import React from "react";

const LoadingButton = ({ content, width }) => {
  return (
    <button
      type="button"
      disabled
      className={`${width ? width : "w-full"} flex items-center justify-center py-2 rounded-lg bg-indigo-500 text-white`}
    >
      <svg
        aria-hidden="true"
        className="w-5 h-5 mr-2 animate-spin text-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="10"
          className="opacity-25"
        />
        <path
          d="M50 5a45 45 0 0145 45"
          stroke="currentColor"
          strokeWidth="10"
          className="opacity-75"
        />
      </svg>

      {content || "Loading..."}
    </button>
  );
};

export default LoadingButton;