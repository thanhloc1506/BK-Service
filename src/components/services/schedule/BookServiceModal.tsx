import React, { Fragment, useRef, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Service } from "../../../apis/common/Service";
import Daypicker from "../../layouts/Daypicker";

interface IParam {
  open: boolean;
  setOpen: any;
  service?: Service;
}

const BookServiceModal = ({ open, setOpen, service }: IParam) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex mt-28 justify-center text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-white/20 backdrop-blur drop-shadow-xl" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-[50rem] h-122">
              <div className="bg-white">
                <div className="h-12 border-b-2 border-gray-100 flex items-center pl-5 text-lg text-gray-700 font-medium">
                  Đặt lịch dịch vụ: {service?.name}
                </div>
                <div>
                  <div className="grid grid-cols-2 h-10 items-center">
                    <div className="pl-5">
                      <p>Họ và tên: Nguyễn Văn A</p>
                    </div>
                    <div className="pl-5">
                      <p>Số điện thoại: 0123456789</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-end">
                    <Daypicker />
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BookServiceModal;
