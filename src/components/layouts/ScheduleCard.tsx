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
    <div className="2xl:h-32 xl:h-28">
      <div className="h-full grid grid-cols-7 rounded-sm bg-white shadow-sm border-2 border-gray-200">
        <div className="col-span-2">
          <img
            src={schedule.image.length > 0 ? schedule.image[0] : service}
            alt="service"
            className="rounded-sm 2xl:p-2.5 xl:p-1.5 w-full h-full"
          />
        </div>
        <div className="col-span-3 pt-2 pl-6">
          <div>
            <p className="2xl:text-xl xl:text-lg font-medium">
              {schedule.titleCard}
            </p>
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
        <div className="col-span-2 flex justify-end">
          {isSchedule ? (
            <div className="mt-2 flex">
              <div className="mr-1.5">
                <svg
                  className="2xl:h-7 2xl:w-7 xl:h-[1.4rem] xl:w-[1.4rem] text-gray-500 hover:text-blue-solid"
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
                  <line x1="12" y1="8" x2="12.01" y2="8" />{" "}
                  <rect x="4" y="4" width="16" height="16" rx="2" />{" "}
                  <polyline points="11 12 12 12 12 16 13 16" />
                </svg>
              </div>
              <div className="mr-2 mt-[0.1rem]">
                <svg
                  className="2xl:h-[1.55rem] 2xl:w-[1.55rem] xl:h-5 xl:w-5 text-gray-500 hover:text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />{" "}
                  <line x1="9" y1="9" x2="15" y2="15" />{" "}
                  <line x1="15" y1="9" x2="9" y2="15" />
                </svg>
              </div>
            </div>
          ) : null}
          {isHistory ? (
            <div className="mt-2 flex">
              <div className="mr-1.5 mt-[0.1rem]">
                <svg
                  className="2xl:h-7 2xl:w-7 xl:h-[1.4rem] xl:w-[1.4rem] text-gray-500 hover:text-blue-solid"
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
                  <line x1="12" y1="8" x2="12.01" y2="8" />{" "}
                  <rect x="4" y="4" width="16" height="16" rx="2" />{" "}
                  <polyline points="11 12 12 12 12 16 13 16" />
                </svg>
              </div>
              <div className="mr-2">
                <svg
                  className="2xl:h-[1.55rem] 2xl:w-[1.55rem] xl:h-6 xl:w-6 text-gray-500 hover:text-black"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                  <line x1="16" y1="5" x2="19" y2="8" />
                </svg>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
