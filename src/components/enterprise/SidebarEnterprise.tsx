import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectPageEnterprise } from "../../redux/slices/enterprise";
import manage from "../../assets/enterprise/manage.png";
import group from "../../assets/enterprise/group.png";
import add from "../../assets/enterprise/add.png";
import premium from "../../assets/enterprise/premium.png";

type PageEnterprise = "manage" | "all" | "add" | "premium";

interface ISelectPage {
  page: string;
}

const SidebarEnterprise: React.FC<ISelectPage> = ({ page }: ISelectPage) => {
  const dispatch = useDispatch();
  const onSelectPage = (value: PageEnterprise) => {
    dispatch(selectPageEnterprise(value));
  };
  return (
    <div className="bg-white h-[90vh] w-full shadow-sm border-2 border-gray-100">
      <div className="2xl:h-20 xl:h-[4.3rem] w-full border-b-2 border-b-gray-100">
        <div className="flex justify-start ml-10 2xl:mt-6 xl:mt-8 items-center 2xl:mb-0 xl:mb-3">
          <p className="2xl:mt-0 xl:mt-4 2xl:text-xl xl:text-lg text-blue-solid font-semibold">
            Danh mục
          </p>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("manage")}>
        <div
          className={`2xl:h-14 xl:h-12 w-full flex justify-start items-center ${
            page === "manage"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="2xl:ml-0 xl:ml-0.5 2xl:mt-0 xl:mt-0.5">
            <img
              src={manage}
              alt="manage"
              className="2xl:h-7 2xl:w-7 xl:h-5 xl:w-5 text-blue-solid"
            />
          </div>
          <div className="2xl:mt-1 xl:mt-0.5 ml-5">
            <p className="text-blue-solid 2xl:text-lg xl:text-sm">Quản lý</p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("all")}>
        <div
          className={`2xl:h-14 xl:h-12 w-full flex justify-start items-center ${
            page === "all"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="2xl:ml-0 xl:ml-0.5 2xl:mt-0 xl:mt-0.5">
            <img
              src={group}
              alt="all-services"
              className="2xl:h-7 2xl:w-7 xl:h-5 xl:w-5 text-blue-solid"
            />
          </div>
          <div className="2xl:mt-1 xl:mt-0.5 ml-5">
            <p className="text-blue-solid 2xl:text-lg xl:text-sm">
              Tất cả dịch vụ
            </p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("add")}>
        <div
          className={`2xl:h-14 xl:h-12 w-full flex justify-start items-center ${
            page === "add"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="2xl:ml-0 xl:ml-0 2xl:mt-0 xl:mt-0.5">
            <img
              src={add}
              alt="Add-service"
              className="2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 text-blue-solid"
            />
          </div>
          <div className="2xl:mt-1 xl:mt-0.5 ml-5">
            <p className="text-blue-solid 2xl:text-lg xl:text-sm">
              Thêm dịch vụ
            </p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("premium")}>
        <div
          className={`2xl:h-14 xl:h-12 w-full flex justify-start items-center ${
            page === "premium"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="2xl:ml-0 xl:ml-0 2xl:mt-0 xl:mt-0.5">
            <svg
              className="2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 text-blue-solid"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <path d="M6 5h12l3 5l-8.5 9.5a.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5" />{" "}
              <path d="M10 12l-2 -2.2l.6 -1" />
            </svg>
          </div>
          <div className="2xl:mt-1 xl:mt-0.5 ml-5">
            <p className="text-blue-solid 2xl:text-lg xl:text-sm">Premium</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarEnterprise;
