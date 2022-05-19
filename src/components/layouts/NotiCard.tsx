import { Transition } from "@headlessui/react";
import React, { Attributes, Fragment, ReactNode } from "react";
import noti from "../../assets/bg/noti.png";
import { toast, ToastContainer } from "react-toastify";

interface INoti {
  readonly hadRead?: boolean;
  readonly img: string;
  readonly content: ReactNode;
  readonly time: string;
  index: number;
}

const NotiCard: React.FC<INoti> = ({
  hadRead,
  content,
  img,
  time,
  index,
}: INoti) => {
  return (
    <Transition
      as={Fragment}
      show={true}
      enter=" transition-opacity transition transition-all duration-500"
      enterFrom="-translate-y-8 opacity-0"
      enterTo="translate-x-0 opacity-100"
      appear={true}
    >
      <div
        className="2xl:h-24 xl:h-20 lg:h-16 bg-white w-full rounded-sm"
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div
          className={`h-full items-center grid grid-cols-7 2xl:p-3 xl:p-2 lg:p-1 transition-all duration-500 ${
            !hadRead
              ? "bg-orange-200/30 hover:bg-orange-200"
              : "bg-gray-200/30 hover:bg-gray-200"
          }`}
        >
          <div className={"col-span-1"}>
            <img
              src={img}
              className={
                "2xl:w-14 2xl:h-14 xl:w-12 xl:h-12 lg:w-10 lg:h-10 rounded"
              }
            />
          </div>
          <div className={"col-span-6"}>
            <div className="2xl:text-lg xl:text-sm lg:text-[12px] 2xl:px-3 xl:px-2 lg:px-1">
              {content}
            </div>
            <div>
              <p
                className={
                  "text-gray-500 2xl:text-sm xl:text-xs lg:text-[12px] 2xl:px-3 xl:px-2 lg:px-1"
                }
              >
                {time}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default NotiCard;

// {/* <div className="grid grid-cols-8 h-full">
// <div className="col-span-2 flex justify-center items-center">
//   <div className="2xl:text-lg xl:text-sm lg:text-xs font-light mr-5 text-[#374273]">
//     <p>{date}</p>
//   </div>
//   <div className="2xl:w-12 2xl-h-12 xl:w-10 xl:h-10 lg:w-8 lg:h-8">
//     <img src={noti} alt="noti" />
//   </div>
// </div>
// <div className="col-span-5 px-5 flex justify-center items-center">
//   <p className="2xl:text-lg xl:text-sm lg:text-xs text-[#374273]">
//     {content}
//   </p>
// </div>
// <div className={"col-span-1 items-start mt-3 flex justify-end mr-3"}>
//   {/* <svg
//     className="2xl:h-[1.55rem] 2xl:w-[1.55rem] xl:h-5 xl:w-5 text-gray-500 hover:text-red-500"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     {" "}
//     <polyline points="3 6 5 6 21 6" />{" "}
//     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{" "}
//     <line x1="10" y1="11" x2="10" y2="17" />{" "}
//     <line x1="14" y1="11" x2="14" y2="17" />
//   </svg> */}
// </div>
// </div> */}
