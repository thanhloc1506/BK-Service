import { ChevronRightIcon } from "@heroicons/react/solid";
import React from "react";

const NextButton = () => {
  return (
    <span className="active:mt-0.5 relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
      <span className="sr-only">Next</span>
      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
    </span>
  );
};

export default NextButton;
