import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Service } from "../../apis/common/Service";
import { RootState } from "../../redux/store";
import Calendar from "./calendar/Calendar";
import BookServiceModal from "./schedule/BookServiceModal";

interface ISchedule {
  service?: Service;
  schedules: any[];
}

const Schedule: React.FC<ISchedule> = ({ service, schedules }) => {
  const [open, setOpen] = useState(false);

  const userState = useSelector((state: RootState) => state.user.user);
  const onClickOpen = () => {
    setOpen(true);
  };
  return (
    <div className="py-5">
      <div className="flex justify-end mr-6">
        <BookServiceModal open={open} setOpen={setOpen} service={service} />
        <div className="shadow-xl w-fit h-fit border-2 border-gray-200 ">
          <div className="flex justify-center">
            <p className="text-2xl font-bold pt-5">Thông tin đặt lịch</p>
          </div>
          <div className="mt-5 ml-7">
            <p className="text-lg font-light">
              Họ và tên:{" "}
              {userState?.fullName !== undefined
                ? userState?.fullName
                : userState?.username}
            </p>
            <p className="mt-1 text-lg font-light">Sdt: 0123456789</p>
            <p className="mt-1 text-lg font-light">Dịch vụ: {service?.name}</p>
          </div>
          <div className="p-5">
            {useMemo(
              () => (
                <Calendar schedules={schedules} />
              ),
              []
            )}
          </div>
          <div className="px-5 pb-5 pt-2 flex justify-end">
            <button
              className="bg-blue-500 text-white rounded-sm px-5 py-2"
              onClick={onClickOpen}
            >
              Đặt lịch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
