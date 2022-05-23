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
        className="2xl:h-24 xl:h-20 lg:h-16 bg-white w-full"
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="grid grid-cols-8 h-full">
          <div className="col-span-2">
            <div className="flex justify-center">
              <div className="2xl:text-lg xl:text-sm font-light mt-12 mr-5 text-[#374273]">
                <p>{date}</p>
              </div>
              <div className="2xl:w-12 2xl-h-12 xl:w-10 xl:h-10">
                <img src={noti} alt="noti" />
              </div>
            </div>
          </div>
          <div className="col-span-5 px-5 flex justify-center items-center">
            <p className="2xl:text-lg xl:text-sm text-[#374273]">{content}</p>
          </div>
          <div className={"col-span-1 items-center flex justify-end mr-3"}>
            <button
              className="bg-[#FF4757] text-white w-full px-6 py-3 rounded-lg text-xl mr-5"
              onClick={() => {
                toast.success("🦄 Wow so easy!", {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default NotiCard;
