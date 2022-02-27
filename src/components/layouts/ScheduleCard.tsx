import React from "react";
import service from "../../assets/service/service.png";

interface ISchedule {
  image: string;
  titleCard: string;
  time: string;
  address: string;
}

interface ICategory {
  isSchedule?: boolean;
  isHistory?: boolean;
  schedule: ISchedule;
}

const ScheduleCard: React.FC<ICategory> = ({
  isSchedule,
  isHistory,
  schedule,
}: ICategory) => {
  return (
    <div>
      <div className="grid grid-cols-7 rounded-xl bg-white shadow-sm border-2 border-gray-200">
        <div className="col-span-2">
          <img src={service} alt="service" className="rounded-xl p-2.5" />
        </div>
        <div className="col-span-3 pt-2 pl-6">
          <div>
            <p className="text-2xl font-medium">{schedule.titleCard}</p>
          </div>
          <div className="flex mt-1.5">
            <div>
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <circle cx="12" cy="12" r="10" />{" "}
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="pl-3 pt-0.5">
              <p className="text-sm text-gray-700">{schedule.time}</p>
            </div>
          </div>
          <div className="flex mt-1.5">
            <div>
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />{" "}
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="pl-3 pt-0.5">
              <p className="text-sm text-gray-700">{schedule.address}</p>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          {isSchedule ? (
            <div className="mt-5">
              <div className="flex justify-end mr-5">
                <button className="bg-blue-solid text-white px-8 py-2.5 rounded-lg">
                  Chi tiết
                </button>
              </div>
              <div className="flex justify-end mr-5 mt-5">
                <button className="bg-red-500 text-white px-[1.9rem] py-2.5 rounded-lg">
                  Hủy lịch
                </button>
              </div>
            </div>
          ) : null}
          {isHistory ? (
            <div className="mt-5">
              <div className="flex justify-end mr-5">
                <button className="bg-blue-solid text-white px-8 py-2.5 rounded-lg">
                  Chi tiết
                </button>
              </div>
              <div className="flex justify-end mr-5 mt-5">
                <button className="bg-orange-400 text-white px-[1.7rem] py-2.5 rounded-lg">
                  Đánh giá
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
