import React, { Fragment, useRef, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Service } from "../../../apis/common/Service";
import Daypicker from "../../layouts/Daypicker";
import ScheduleCalendar from "../../layouts/ScheduleCalendar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import moment from "moment";
import TimePicker from "../../layouts/TimePicker";
import ReactCalendar from "../../layouts/ReactCalendar";
import Calendar from "react-calendar";
import CalendarModal from "./CalendarModal";
import { DateComponent } from "@fullcalendar/react";
import { addSchedule } from "../../../redux/slices/service";

interface IParam {
  open: boolean;
  setOpen: any;
  service?: Service;
}

const BookServiceModal = ({ open, setOpen, service }: IParam) => {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const userState = useSelector((state: RootState) => state.user.user);

  const [date, setDate] = useState(new Date());

  const [hour, setHour] = useState("01");

  const [min, setMin] = useState("00");

  const [AMPM, setAMPM] = useState("AM");

  const [showCalendar, setShowCalendar] = useState(false);

  const onAddSchedule = () => {
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
      serviceId: service?._id,
    };
    dispatch(addSchedule(scheduleForm));
    setOpen(false);
  };

  const onClickShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex mt-36 justify-center text-center">
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-[50rem] h-60">
              <div className="bg-white">
                <div className="h-12 border-b-2 border-gray-100 flex items-center pl-5 text-lg text-gray-700 font-medium">
                  Đặt lịch dịch vụ: {service?.name}
                </div>
                <div>
                  <div className="grid grid-cols-2 h-10 items-center pt-3">
                    <div className="pl-5">
                      <p>
                        Họ và tên:{" "}
                        {userState?.fullName !== undefined
                          ? userState?.fullName
                          : userState?.username}
                      </p>
                    </div>
                    <div className="pl-5">
                      <p>Số điện thoại: 0123456789</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 pt-3">
                  <div className="flex justify-start pl-5">
                    <div className="flex align-middle">
                      <p>Ngày: </p>
                    </div>
                    <div className="flex items-center justify-center pl-3">
                      <div
                        className="relative xl:w-96 mb-7"
                        onClick={onClickShowCalendar}
                      >
                        <input
                          type="text"
                          className="absolute w-[42%] form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Select a date"
                          value={
                            date
                              .toLocaleString("en-US", {
                                timeZone: "Asia/Ho_Chi_Minh",
                              })
                              .split(",")[0]
                          }
                        />
                        <svg
                          className="absolute h-6 w-6 text-gray-700 left-1/3 top-2"
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
                          <rect x="4" y="5" width="16" height="16" rx="2" />{" "}
                          <line x1="16" y1="3" x2="16" y2="7" />{" "}
                          <line x1="8" y1="3" x2="8" y2="7" />{" "}
                          <line x1="4" y1="11" x2="20" y2="11" />{" "}
                          <line x1="11" y1="15" x2="12" y2="15" />{" "}
                          <line x1="12" y1="15" x2="12" y2="18" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="pl-5">
                      <p>Giờ:</p>
                    </div>
                    <div className="pl-3">
                      <TimePicker
                        hour={hour}
                        setHour={setHour}
                        min={min}
                        setMin={setMin}
                        AMPM={AMPM}
                        setAMPM={setAMPM}
                      />
                    </div>
                  </div>
                </div>

                <div className="pl-5 py-5">
                  <CalendarModal
                    open={showCalendar}
                    setOpen={setShowCalendar}
                    date={date}
                    setDate={setDate}
                  />
                </div>
                <div className="border-t-2 border-t-gray-100 mt-2">
                  <div className="flex justify-end pt-1.5 pr-10">
                    <button
                      className="bg-green-500 px-5 py-1.5 rounded-sm text-gray-600"
                      onClick={onAddSchedule}
                    >
                      Xác nhận
                    </button>
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
