import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Service } from "../../apis/common/Service";
import { toggleModalLogin } from "../../redux/slices/auth";
import { getScheduleByServiceId } from "../../redux/slices/service";
import { RootState } from "../../redux/store";
import Calendar from "./calendar/Calendar";
import BookServiceModal from "./schedule/BookServiceModal";

interface ISchedule {
  service?: Service;
  schedules: any[];
}

const Schedule: React.FC<ISchedule> = ({ service, schedules }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const onClickOpen = () => {
    if (service?.enableSchedule) {
      if (userState.isAuthenticated) {
        dispatch(getScheduleByServiceId(service?._id as string));
        setOpen(true);
      } else {
        dispatch(toggleModalLogin(userState.showLoginForm));
      }
    }
  };

  const [showTooltip, setShowToolTip] = useState(false);

  const onHoverBtnSchedule = () => {
    setTimeout(() => {
      setShowToolTip(true);
    }, 300);
  };

  const onOutBtnSchedule = () => {
    setTimeout(() => {
      setShowToolTip(false);
    }, 300);
  };
  return (
    <div className="py-5">
      <div className="flex justify-end mr-0">
        <BookServiceModal
          open={open}
          setOpen={setOpen}
          service={service}
          schedules={schedules}
        />
        <div className="shadow-xl w-[22vw] h-fit border-2 border-gray-100 bg-white">
          <div className="flex justify-center">
            <p className="2xl:text-xl xl:text-lg font-semibold pt-3">
              Thông tin đặt lịch
            </p>
          </div>
          {/* <div className="mt-5 ml-7">
            <p className="text-lg font-light">
              Họ và tên:{" "}
              {userState.user?.fullName !== undefined
                ? userState.user?.fullName
                : userState.user?.username}
            </p>
            <p className="mt-1 text-lg font-light">Sdt: 0123456789</p>
            <p className="mt-1 text-lg font-light">Dịch vụ: {service?.name}</p>
          </div> */}
          <div className="p-3">
            {useMemo(
              () => (
                <Calendar schedules={schedules} />
              ),
              []
            )}
          </div>
          <div className="2xl:pr-4 xl:pr-3 lg:pr-2 pb-5 pt-2 flex justify-end relative">
            <button
              className="bg-blue-500 text-white hover:text-gray-700 rounded-sm 2xl:text-sm xl:text-sm lg:text-xs 2xl:px-3 2xl:py-1.5 xl:px-2.5 xl:py-1 lg:px-2 lg:py-1"
              onClick={onClickOpen}
              // disabled={!service?.enableSchedule ?? false}
              onMouseOver={onHoverBtnSchedule}
              onMouseOut={onOutBtnSchedule}
            >
              Đặt lịch
            </button>
            {showTooltip && !service?.enableSchedule ? (
              <div className="bg-orange-50 w-fit h-fit rounded-lg absolute top-12 right-0 px-1">
                <p className="2xl:text-sm xl:text-xs lg:text-[10px] font-light">
                  *Tính năng đặt lịch không khả dụng
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
