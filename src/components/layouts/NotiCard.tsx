import { Transition } from "@headlessui/react";
import React, { Attributes, Fragment } from "react";
import noti from "../../assets/bg/noti.png";
import { toast, ToastContainer } from "react-toastify";

interface INoti {
  date: string;
  content: string;
  index: number;
}

const NotiCard: React.FC<INoti> = ({ date, content, index }: INoti) => {
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
        className="2xl:h-24 xl:h-20 bg-white w-full"
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="grid grid-cols-8 h-full">
          <div className="col-span-2 flex justify-center items-center">
            <div className="2xl:text-lg xl:text-sm font-light mr-5 text-[#374273]">
              <p>{date}</p>
            </div>
            <div className="2xl:w-12 2xl-h-12 xl:w-10 xl:h-10">
              <img src={noti} alt="noti" />
            </div>
          </div>
          <div className="col-span-5 px-5 flex justify-center items-center">
            <p className="2xl:text-lg xl:text-sm text-[#374273]">{content}</p>
          </div>
          <div className={"col-span-1 items-start mt-3 flex justify-end mr-3"}>
            {/* <svg
              className="2xl:h-[1.55rem] 2xl:w-[1.55rem] xl:h-5 xl:w-5 text-gray-500 hover:text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <polyline points="3 6 5 6 21 6" />{" "}
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{" "}
              <line x1="10" y1="11" x2="10" y2="17" />{" "}
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg> */}
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default NotiCard;
