import React from "react";
import SingleCard from "../services/SingleCard";

const LoveService = () => {
  return (
    <div className="bg-gray-light h-fit">
      <div className="h-12 bg-white py-8 pb-20 pl-32 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-400 font-medium text-3xl">Dịch vụ yêu thích</p>
      </div>
      <div className="px-10 pt-12 pb-16">
        <div className="grid grid-cols-3 gap-8 h-full">
          <div className="flex justify-center ml-14">
            <SingleCard isLoveService />
          </div>
          <div className="flex justify-center ml-14">
            <SingleCard isLoveService />
          </div>
          <div className="flex justify-center ml-14">
            <SingleCard isLoveService />
          </div>
          <div className="flex justify-center ml-14">
            <SingleCard isLoveService />
          </div>
          <div className="flex justify-center ml-14">
            <SingleCard isLoveService />
          </div>
          <div className="flex justify-center ml-14">
            <SingleCard isLoveService />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveService;
