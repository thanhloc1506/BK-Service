import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectPage } from "../../redux/slices/user";

type Page = "info" | "schedule" | "love" | "noti" | "history";

interface ISelectPage {
  page: string;
}

const SidebarProfile: React.FC<ISelectPage> = ({ page }: ISelectPage) => {
  const dispatch = useDispatch();
  const onSelectPage = (value: Page) => {
    dispatch(selectPage(value));
  };
  return (
    <div className="bg-white h-[90vh] w-full shadow-sm border-2 border-gray-100">
      <div className="h-[12vh] w-full border-b-2 border-b-gray-100">
        <div className="flex justify-start ml-10 mt-8">
          <div className="w-14 h-14 rounded-full bg-gray-500"></div>
          <div>
            <p className="text-sm ml-2.5 mt-1">Tài khoản của</p>
            <p className="text-lg font-medium mt-1.5 ml-2.5">Your name</p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("info")}>
        <div
          className={`h-[6vh] w-full flex justify-start pt-2.5 ${
            page === "info"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="">
            <svg
              className="h-8 w-8 text-blue-solid"
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
          <div className="mt-1 ml-5">
            <p className="text-blue-solid text-lg">Thông tin cá nhân</p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("schedule")}>
        <div
          className={`h-[6vh] w-full flex justify-start pt-2.5 ${
            page === "schedule"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="">
            <svg
              className="h-8 w-8 text-blue-solid"
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
          <div className="mt-1 ml-5">
            <p className="text-blue-solid text-lg">Danh sách đặt lịch</p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("love")}>
        <div
          className={`h-[6vh] w-full flex justify-start pt-2.5 ${
            page === "love"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-solid"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="mt-1 ml-5">
            <p className="text-blue-solid text-lg">Dịch vụ yêu thích</p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("noti")}>
        <div
          className={`h-[6vh] w-full flex justify-start pt-2.5 ${
            page === "noti"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="">
            <svg
              className="h-8 w-8 text-blue-solid"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />{" "}
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <div className="mt-1 ml-5">
            <p className="text-blue-solid text-lg">Thông báo của tôi</p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("history")}>
        <div
          className={`h-[6vh] w-full flex justify-start pt-2.5 ${
            page === "history"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="">
            <svg
              className="h-8 w-8 text-blue-solid"
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
          <div className="mt-1 ml-5">
            <p className="text-blue-solid text-lg">Lịch sử</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
