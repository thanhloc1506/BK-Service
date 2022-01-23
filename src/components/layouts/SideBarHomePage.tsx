import React from "react";
import ratingBar from "../../assets/service/rating-bar.png";

const SideBarHomePage: React.FC = () => {
  return (
    <div className="bg-white h-750 w-full shadow-md">
      <div className="grid grid-cols-2 border-b-2 border-b-gray-100 pb-6">
        <p className="flex justify-center text-3xl text-gray-400 font-light mt-5">
          Bo loc
        </p>
        <button className="mt-5">Reset</button>
      </div>
      <div className="mt-10">
        <p className="pl-10 font-medium text-2xl text-gray-500">Linh vuc</p>
        <div className="mt-6">
          <div className="flex justify-start items-center ml-14 mb-4">
            <input
              id="radio1"
              type="radio"
              name="radio"
              className="hidden"
              defaultChecked
            />
            <label
              htmlFor="radio1"
              className="flex items-center cursor-pointer text-xl"
            >
              <span className="w-5 h-5 inline-block mr-2 rounded-full border border-grey flex-no-shrink" />
              <p className="font-light text-lg">Lam dep</p>
            </label>
          </div>
          <div className="flex justify-start items-center ml-14 mb-4">
            <input
              id="radio2"
              type="radio"
              name="radio"
              className="hidden"
              defaultChecked
            />
            <label
              htmlFor="radio2"
              className="flex items-center cursor-pointer text-xl"
            >
              <span className="w-5 h-5 inline-block mr-2 rounded-full border border-grey flex-no-shrink" />
              <p className="font-light text-lg">Sua chua</p>
            </label>
          </div>
          <div className="flex justify-start items-center ml-14 mb-4">
            <input
              id="radio3"
              type="radio"
              name="radio"
              className="hidden"
              defaultChecked
            />
            <label
              htmlFor="radio3"
              className="flex items-center cursor-pointer text-xl"
            >
              <span className="w-5 h-5 inline-block mr-2 rounded-full border border-grey flex-no-shrink" />
              <p className="font-light text-lg">Dich vu cong</p>
            </label>
          </div>

          <div className="flex justify-start items-center ml-22 mb-4">
            <button className="flex">
              <p className="text-gray-600">Xem them</p>
              <svg
                className="h-6 w-6 ml-2 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <p className="pl-10 font-medium text-2xl text-gray-500">Danh gia</p>
        <div className="pl-14 mt-3">
          <img src={ratingBar} alt="rating-bar" />
        </div>
      </div>
    </div>
  );
};

export default SideBarHomePage;
