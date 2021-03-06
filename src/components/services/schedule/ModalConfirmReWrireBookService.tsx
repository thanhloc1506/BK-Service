import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import {
  addSchedule,
  deleteSchedule,
  deleteScheduleTmp,
} from "../../../redux/slices/service";

export interface ModalConfirmProps {
  showConfirm: boolean;
  setShowConfirm: (b: boolean) => void;
  serviceId: string;
  scheduleId: string;
  hour: any;
  min: any;
  AMPM: any;
  date: any;
}

const ModalConfirmReWrireBookService: React.FC<ModalConfirmProps> = ({
  showConfirm,
  setShowConfirm,
  serviceId,
  scheduleId,
  hour,
  min,
  AMPM,
  date,
}) => {
  const onCancle = () => {
    setTimeout(() => {
      setShowConfirm(false);
    }, 300);
  };

  const dispatch = useDispatch();

  const onClickConfirm = async () => {
    await dispatch(deleteSchedule(scheduleId));
    const dateFormat = date
      .toLocaleString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
      })
      .split(",")[0];
    const scheduleForm = {
      hour,
      min,
      AMPM,
      dateFormat,
      serviceId,
    };
    await dispatch(addSchedule(scheduleForm));

    await setTimeout(() => {
      setShowConfirm(false);
    }, 300);
  };
  const cancelButtonRef = useRef(null);
  return (
    <div>
      <Transition appear show={showConfirm} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {}}
          initialFocus={cancelButtonRef}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 blur backdrop-blur-sm" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  B???n ???? c?? l???ch h???n ??? ng??y n??y, x??c nh???n ?????t l???ch:
                </Dialog.Title>

                <div className="mt-8 flex justify-between px-16">
                  <button
                    className="text-red-900 bg-red-100 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                    onClick={onCancle}
                  >
                    H???y
                  </button>

                  <button
                    className="text-blue-900 bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                    onClick={onClickConfirm}
                  >
                    X??c nh???n
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ModalConfirmReWrireBookService;
