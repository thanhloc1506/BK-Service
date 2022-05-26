import React, { Fragment, useRef, useState, useMemo } from "react";
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
import service, { addSchedule } from "../../../redux/slices/service";
import ModalConfirmReWrireBookService from "./ModalConfirmReWrireBookService";

interface IParam {
  open: boolean;
  setOpen: any;
  service?: Service;
  schedules: any[];
}

const parseTime = (date: Date) => {
  const dateFormat = date
    .toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    })
    .split(",")[0];
  const day = dateFormat.split(" ")[0];
  return {
    day: day.split("/")[1],
    month: day.split("/")[0],
    year: day.split("/")[2],
  };
};

const checkExistScheduleInDate = (
  date: any,
  schedules: any[],
  serviceId: string
) => {
  let isExist = "";
  const bookTime = parseTime(date);
  for (const schedule of schedules) {
    if (schedule.serviceId == serviceId) {
      if (
        parseInt(schedule.timeServe.year) == parseInt(bookTime.year) &&
        parseInt(schedule.timeServe.month) == parseInt(bookTime.month) &&
        parseInt(schedule.timeServe.day) == parseInt(bookTime.day)
      ) {
        isExist = schedule._id;
      }
    }
  }

  return isExist;
};

const BookServiceModal = ({ open, setOpen, service, schedules }: IParam) => {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const userState = useSelector((state: RootState) => state.user.user);

  const [date, setDate] = useState(new Date());

  const [hour, setHour] = useState(
    service?.openTime?.split(" ")[0].split(":")[0] ?? "01"
  );

  const [min, setMin] = useState("00");

  const [AMPM, setAMPM] = useState(
    service?.openTime?.split(" ")[0].toUpperCase() ?? "AM"
  );

  const [showCalendar, setShowCalendar] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [existScheduleId, setExistScheduleId] = useState("");

  const onAddSchedule = () => {
    const dateFormat = date
      .toLocaleString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
      })
      .split(",")[0];

    const isExist = checkExistScheduleInDate(
      date,
      schedules,
      service?._id as string
    );

    if (isExist == "") {
      const scheduleForm = {
        hour,
        min,
        AMPM,
        dateFormat,
        serviceId: service?._id,
      };
      dispatch(addSchedule(scheduleForm));
      setOpen(false);
    } else {
      setExistScheduleId(isExist);
      setShowConfirm(true);
    }
  };

  const onClickShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div>
      {showConfirm ? (
        <ModalConfirmReWrireBookService
          show={showConfirm}
          setShow={setShowConfirm}
          serviceId={service?._id as string}
          scheduleId={existScheduleId}
          hour={hour}
          min={min}
          AMPM={AMPM}
          date={date}
        />
      ) : null}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex 2xl:mt-36 xl:mt-28 lg:mt-24 justify-center text-center">
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
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all 2xl:w-[50rem] 2xl:h-60 xl:w-[45rem] xl:h-56 lg:w-[40rem] lg:h-56">
                <div className="bg-white">
                  <div className="2xl:h-12 xl:h-10 lg:h-10 border-b-2 border-gray-100 flex items-center pl-5 2xl:text-lg xl:text-sm lg:text-sm text-gray-700 font-medium">
                    Đặt lịch dịch vụ: {service?.name}
                  </div>
                  <div>
                    <div className="grid grid-cols-2 h-10 items-center pt-3">
                      <div className="pl-5">
                        <p className="2xl:text-lg xl:text-sm lg:text-sm">
                          Họ và tên:{" "}
                          {userState?.fullName !== undefined
                            ? userState?.fullName
                            : userState?.username}
                        </p>
                      </div>
                      <div className="pl-5">
                        <p className="2xl:text-lg xl:text-sm lg:text-sm">
                          Số điện thoại: 0123456789
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 pt-3">
                    <div className="flex justify-start pl-5">
                      <div className="flex align-middle">
                        <p className="2xl:text-lg xl:text-sm lg:text-sm">
                          Ngày:{" "}
                        </p>
                      </div>
                      <div className="flex items-center justify-center pl-3">
                        <div
                          className="relative xl:w-96 lg:w-80 2xl:mb-7 xl:mb-7 lg:mb-10"
                          onClick={onClickShowCalendar}
                        >
                          <input
                            type="text"
                            className="absolute w-[42%] form-control block 2xl:px-3 2xl:py-1.5 xl:px-2 xl:py-1 lg:px-1.5 lg:py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                            className="absolute h-6 w-6 text-gray-700 left-1/3 2xl:top-2 xl:top-2 lg:top-1"
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
                        <p className="2xl:text-lg xl:text-sm lg:text-sm">
                          Giờ:
                        </p>
                      </div>
                      <div className="pl-3">
                        <TimePicker
                          hour={hour}
                          setHour={setHour}
                          min={min}
                          setMin={setMin}
                          AMPM={AMPM}
                          setAMPM={setAMPM}
                          serviceId={service?._id as string}
                          date={date}
                          openTime={service?.openTime as string}
                          closeTime={service?.closeTime as string}
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
                        className="2xl:text-lg xl:text-sm lg:text-sm bg-green-500 2xl:px-5 2xl:py-1.5 xl:px-3 xl:py-1 lg:px-2 lg:py-1 rounded-sm text-gray-100 hover:text-gray-700"
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
    </div>
  );
};

export default BookServiceModal;
