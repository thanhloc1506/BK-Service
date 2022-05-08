import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PageEnterprise,
  selectPageEnterprise,
} from "../../redux/slices/enterprise";
import { MdBorderAll } from "react-icons/md";
import { RootState } from "../../redux/store";
import { DEFAULT_AVATAR } from "../../constants/common";

interface ISelectPage {
  page: string;
}

const SidebarProfile: React.FC<ISelectPage> = ({ page }: ISelectPage) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.user.enterprise);
  const onSelectPage = (value: PageEnterprise) => {
    dispatch(selectPageEnterprise(value));
  };
  return (
    <div className="bg-white  h-[90vh] w-full shadow-sm border-right-2 border-gray-100">
      <div className="2xl:h-[4.5rem] xl:h-[3.9rem] w-full border-b-2 border-b-gray-100">
        <div className="flex justify-start ml-10 2xl:mt-6 xl:mt-8 items-center 2xl:mb-0 xl:mb-3">
          <p className="2xl:mt-0 xl:mt-0 2xl:text-xl xl:text-lg text-blue-solid font-semibold">
            Danh mục
          </p>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("manage")}>
        <div
          className={`2xl:h-14 xl:h-12 w-full flex justify-start items-center relative transition-all duration-300 ${
            page === "manage" ? "bg-gray-100 pl-10" : "opacity-40 pl-10"
          }`}
        >
          <div
            className={
              "2xl:w-2 xl:w-1 lg:w-0.5 top-0 left-0 h-full absolute bg-blue-500"
            }
            hidden={page !== "manage"}
          />
          <div className="2xl:ml-0 xl:ml-0.5 2xl:mt-0 xl:mt-0">
            <svg
              className="2xl:h-8 2xl:w-8 xl:h-7 xl:w-7 text-blue-solid"
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
          <div className="ml-5">
            <p className="text-blue-solid text-lg">Quản lí</p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("all")}>
        <div
          className={`2xl:h-14 xl:h-12 w-full flex justify-start items-center relative transition-all duration-300 ${
            page === "all" ? "bg-gray-100 pl-10" : "opacity-40 pl-10"
          }`}
        >
          <div
            className={
              "2xl:w-2 xl:w-1 lg:w-0.5 top-0 left-0 h-full absolute bg-blue-500"
            }
            hidden={page !== "all"}
          />

          <div className="flex justify-center">
            <MdBorderAll
              className={"2xl:h-8 2xl:w-8 xl:h-7 xl:w-7 text-blue-solid"}
            />
          </div>
          <div className="mt-1 ml-5">
            <p className="text-blue-solid text-lg">Tất cả dịch vụ</p>
          </div>
        </div>
      </div>
      <div
        className="cursor-pointer"
        onClick={() => onSelectPage("all-schedule")}
      >
        <div
          className={`2xl:h-14 xl:h-12 w-full flex justify-start items-center relative transition-all duration-300 ${
            page === "all-schedule" ? "bg-gray-100 pl-10" : "opacity-40 pl-10"
          }`}
        >
          <div
            className={
              "2xl:w-2 xl:w-1 lg:w-0.5 top-0 left-0 h-full absolute bg-blue-500"
            }
            hidden={page !== "all-schedule"}
          />

          <div className="2xl:ml-0 xl:ml-0.5 2xl:mt-0 xl:mt-0">
            <svg
              className="2xl:h-8 2xl:w-8 xl:h-7 xl:w-7 text-blue-solid"
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
            <p className="text-blue-solid text-lg">Tất cả lịch hẹn</p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("add")}>
        <div
          className={`2xl:h-14 xl:h-12 w-full flex justify-start items-center relative transition-all duration-300 ${
            page === "add" ? "bg-gray-100 pl-10" : "opacity-40 pl-10"
          }`}
        >
          <div
            className={
              "2xl:w-2 xl:w-1 lg:w-0.5 top-0 left-0 h-full absolute h-full bg-blue-500"
            }
            hidden={page !== "add"}
          />

          <div className="2xl:ml-0 xl:ml-0.5 2xl:mt-0 xl:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="2xl:h-8 2xl:w-8 xl:h-7 xl:w-7 text-blue-solid"
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
          <div className="mt-1 ml-5">
            <p className="text-blue-solid text-lg">Thêm dịch vụ</p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("premium")}>
        <div
          className={`2xl:h-14 xl:h-12 w-full flex justify-start items-center relative transition-all duration-300 ${
            page === "premium" ? "bg-gray-100 pl-10" : "opacity-40 pl-10"
          }`}
        >
          <div
            className={
              "2xl:w-2 xl:w-1 lg:w-0.5 top-0 left-0 h-full absolute bg-blue-500"
            }
            hidden={page !== "premium"}
          />
          <div className="2xl:ml-0 xl:ml-0.5 2xl:mt-0 xl:mt-0">
            <svg
              className="2xl:h-8 2xl:w-8 xl:h-7 xl:w-7 text-blue-solid"
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
          <div className="mt-1 ml-5">
            <p className="text-blue-solid text-lg">Premium</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
