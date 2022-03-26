import React from "react";

const ItemButton: React.FC<any> = ({ page, isCurruntPage }) => {
  return (
    <span
      className={
        isCurruntPage
          ? "bg-blue-300 border-gray-300 text-black hover:bg-blue-200 md:inline-flex relative items-center px-4 py-2 border text-sm font-medium cursor-pointer"
          : "bg-white border-gray-300 text-gray-500 hover:text-gray-700 hover:bg-blue-200 md:inline-flex relative items-center px-4 py-2 border text-sm font-medium cursor-pointer"
      }
    >
      {page}
    </span>
  );
};

export default ItemButton;
