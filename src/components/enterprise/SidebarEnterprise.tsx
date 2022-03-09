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
      <div className="h-[6vh] w-full border-b-2 border-b-gray-100 mb-5">
        <div className="flex justify-start ml-10 mt-8">
          <p className="text-2xl text-blue-solid">Danh mục</p>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("manage")}>
        <div
          className={`h-[7vh] w-full flex justify-start pt-3 ${
            page === "manage"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="">
            <img src={manage} alt="manage" className="w-8 h-8" />
          </div>
          <div className="mt-1 ml-5">
            <p className="text-blue-solid text-lg">Quản lý</p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("all")}>
        <div
          className={`h-[7vh] w-full flex justify-start pt-3 ${
            page === "all"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="">
            <img
              src={group}
              alt="all-services"
              className="w-8 h-8 text-blue-solid"
            />
          </div>
          <div className="mt-1 ml-5">
            <p className="text-blue-solid text-lg">Tất cả dịch vụ</p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("add")}>
        <div
          className={`h-[7vh] w-full flex justify-start pt-3 ${
            page === "add"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="">
            <img
              src={add}
              alt="Add-service"
              className="w-8 h-8 text-blue-solid"
            />
          </div>
          <div className="mt-1 ml-5">
            <p className="text-blue-solid text-lg">Thêm dịch vụ</p>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => onSelectPage("premium")}>
        <div
          className={`h-[7vh] w-full flex justify-start pt-3 ${
            page === "premium"
              ? "bg-gray-100 border-l-4 border-l-blue-solid border-y-2 border-y-gray-100 border-r-2 border-r-gray-100 pl-9"
              : "opacity-40 pl-10"
          }`}
        >
          <div className="">
            <svg
              className="h-8 w-8 text-blue-solid"
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
          <div className="mt-1 ml-5">
            <p className="text-blue-solid text-lg">Premium</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarEnterprise;
