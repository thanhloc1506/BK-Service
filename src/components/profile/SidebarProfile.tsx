import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import user, { selectPage } from "../../redux/slices/user";
import { RootState } from "../../redux/store";
import { DEFAULT_AVATAR } from "../../constants/common";

type Page = "info" | "schedule" | "love" | "noti" | "history";

interface ISelectPage {
  page: string;
}

const SidebarProfile: React.FC<ISelectPage> = ({ page }: ISelectPage) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.user.user);
  const onSelectPage = (value: Page) => {
    dispatch(selectPage(value));
  };
  return (
    <div className="bg-white h-[90vh] w-full shadow-sm border-2 border-gray-100">
      <div className="2xl:h-20 xl:h-[4.3rem] lg:h-16 w-full border-b-2 border-b-gray-100">
        <div className="flex justify-start ml-10 2xl:mt-6 xl:mt-8 lg:mt-10 items-center 2xl:mb-0 xl:mb-3">
          <div className="2xl:w-14 2xl:h-14 xl:w-10 xl:h-10 lg:w-9 lg:h-9 2xl:mt-0 xl:mt-2 rounded-full bg-gray-500">
            <img
              src={state?.avatar ? state.avatar.url : DEFAULT_AVATAR}
              className={"w-full h-full p-1 rounded-full"}
            />
          </div>
          <div>
            <p className="ml-2.5 2xl:mt-1 xl:mt-3 2xl:text-lg xl:text-sm lg:text-xs">
              Tài khoản của
            </p>
            <p className="font-medium mt-1 ml-2.5 2xl:text-lg xl:text-sm lg:text-xs">
              {state?.fullName.split(" ")[
                state?.fullName.split(" ").length - 1
              ] || ""}
            </p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("info")}>
        <div
          className={`2xl:h-14 xl:h-12 lg:h-10 w-full flex justify-start items-center ${
            page === "info"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="">
            <svg
              className="2xl:h-8 2xl:w-8 xl:h-7 xl:w-7 lg:w-6 lg:h-6 text-blue-solid"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="2xl:mt-1 xl:mt-0.5 xl:ml-5 lg:ml-3">
            <p className="text-blue-solid 2xl:text-lg xl:text-sm lg:text-xs">
              Thông tin cá nhân
            </p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("schedule")}>
        <div
          className={`2xl:h-14 xl:h-12 lg:h-10 w-full flex justify-start items-center ${
            page === "schedule"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="2xl:ml-0 xl:ml-0.5 2xl:mt-0 xl:mt-0.5">
            <svg
              className="2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 lg:w-5 lg:h-5 text-blue-solid"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />{" "}
              <line x1="16" y1="2" x2="16" y2="6" />{" "}
              <line x1="8" y1="2" x2="8" y2="6" />{" "}
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="2xl:mt-1 xl:mt-0.5 xl:ml-5 lg:ml-3">
            <p className="text-blue-solid 2xl:text-lg xl:text-sm lg:text-xs">
              Danh sách đặt lịch
            </p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("love")}>
        <div
          className={`2xl:h-14 xl:h-12 lg:h-10 w-full flex justify-start items-center ${
            page === "love"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="2xl:ml-0 xl:ml-0.5 2xl:mt-0 xl:mt-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 lg:h-5 lg:w-5 text-blue-solid"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="2xl:mt-1 xl:mt-0.5 xl:ml-5 lg:ml-3">
            <p className="text-blue-solid 2xl:text-lg xl:text-sm lg:text-xs">
              Dịch vụ yêu thích
            </p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("noti")}>
        <div
          className={`2xl:h-14 xl:h-12 lg:h-10 w-full flex justify-start items-center ${
            page === "noti"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="2xl:ml-0 xl:ml-0.5 2xl:mt-0 xl:mt-0.5">
            <svg
              className="2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 lg:h-5 lg:w-5 text-blue-solid"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />{" "}
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <div className="2xl:mt-1 xl:mt-0.5 xl:ml-5 lg:ml-3">
            <p className="text-blue-solid 2xl:text-lg xl:text-sm lg:text-xs">
              Thông báo của tôi
            </p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("history")}>
        <div
          className={`2xl:h-14 xl:h-12 lg:h-10 w-full flex justify-start items-center ${
            page === "history"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="2xl:ml-0 xl:ml-0.5 2xl:mt-0 xl:mt-0.5">
            <svg
              className="2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 lg:w-5 lg:h-5 text-blue-solid"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <circle cx="12" cy="12" r="10" />{" "}
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="2xl:mt-1 xl:mt-0.5 xl:ml-5 lg:ml-3">
            <p className="text-blue-solid 2xl:text-lg xl:text-sm lg:text-xs">
              Lịch sử
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
