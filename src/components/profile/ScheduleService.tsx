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
      <div className="h-12 bg-white pt-12 pb-14 pl-20 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-solid font-medium 2xl:text-xl xl:text-lg">
          Danh sách đặt lịch
        </p>
      </div>
      <div className="2xl:mb-14 xl:mb-10">
        <div className="2xl:px-64 xl:px-48 2xl:mt-10 xl:mt-8">
          <ScheduleCard isSchedule schedule={schedule} />
        </div>
        <div className="2xl:px-64 xl:px-48 2xl:mt-10 xl:mt-8">
          <ScheduleCard isSchedule schedule={schedule} />
        </div>
        <div className="2xl:px-64 xl:px-48 2xl:mt-10 xl:mt-8">
          <ScheduleCard isSchedule schedule={schedule} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleService;
