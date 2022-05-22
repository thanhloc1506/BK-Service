import { ChevronLeftIcon } from "@heroicons/react/solid";
import React from "react";

const PreviousButton = () => {
  return (
    <span className="active:mt-0.5 relative inline-flex items-center 2xl:px-2 2xl:py-2 xl:px-1.5 xl:py-1.5 lg:px-1 lg:py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
      <span className="sr-only">Previous</span>
      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
    </span>
  );
};

export default PreviousButton;
