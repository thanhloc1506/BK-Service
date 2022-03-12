import React from "react";
import ScheduleCard from "../layouts/ScheduleCard";

interface ISchedule {
  image: string;
  titleCard: string;
  time: string;
  address: string;
}
const ScheduleService = () => {
  const schedule: ISchedule = {
    image: "",
    titleCard: "Sua chua dien thoai",
    time: "15:00 12/12/2021",
    address: "43 Le Duc Tho, P3, Go` Vap",
  };
  return (
    <div>
      <div className="h-12 bg-white py-8 pb-20 pl-20 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-400 font-medium text-3xl">Danh sách đặt lịch</p>
      </div>
      <div className="px-64 mt-14">
        <ScheduleCard isSchedule schedule={schedule} />
      </div>
      <div className="px-64 mt-14">
        <ScheduleCard isSchedule schedule={schedule} />
      </div>
      <div className="px-64 mt-14">
        <ScheduleCard isSchedule schedule={schedule} />
      </div>
    </div>
  );
};

export default ScheduleService;
