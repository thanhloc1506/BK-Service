import React from "react";

interface IPreviewSchedule {
  idxEvent: number;
  schedules: any[];
}

const PreviewSchedule: React.FC<IPreviewSchedule> = ({
  idxEvent,
  schedules,
}) => {
  return (
    <div
      className={
        idxEvent === 1
          ? "h-fit 2xl:w-64 xl:w-52 lg:w-48 bg-white border-2 text-sm border-gray-300 absolute bottom-10 2xl:left-[0px] xl:left-[0px] lg:left-[-0px] z-1000"
          : idxEvent === 2
          ? "h-fit 2xl:w-64 xl:w-52 lg:w-48 bg-white border-2 text-sm border-gray-300 absolute bottom-10 2xl:left-[-40px] xl:left-[-30px] lg:left-[-20px] z-1000"
          : idxEvent === 3
          ? "h-fit 2xl:w-64 xl:w-52 lg:w-48 bg-white border-2 text-sm border-gray-300 absolute bottom-10 2xl:left-[-80px] xl:left-[-70px] lg:left-[-60px] z-1000"
          : idxEvent === 4
          ? "h-fit 2xl:w-64 xl:w-52 lg:w-48 bg-white border-2 text-sm border-gray-300 absolute bottom-10 2xl:left-[-120px] xl:left-[-110px] lg:left-[-100px] z-1000"
          : idxEvent === 5
          ? "h-fit 2xl:w-64 xl:w-52 lg:w-48 bg-white border-2 text-sm border-gray-300 absolute bottom-10 2xl:left-[-160px] xl:left-[-150px] lg:left-[-135px] z-1000"
          : idxEvent === 6
          ? "h-fit 2xl:w-64 xl:w-52 lg:w-48 bg-white border-2 text-sm border-gray-300 absolute bottom-10 2xl:left-[-220px] xl:left-[-170px] lg:left-[-150px] z-1000"
          : "h-fit 2xl:w-64 xl:w-52 lg:w-48 bg-white border-2 text-sm border-gray-300 absolute bottom-10 2xl:left-[-260px] xl:left-[-200px] lg:left-[-180px] z-1000"
      }
    >
      {schedules.map((schedule, index) => (
        <div key={index}>
          {index == 0 ? (
            <div className="border-b-2 border-b-gray-200 py-1">
              Sự kiện ngày:{" "}
              {schedule.timeServe.day < 10
                ? "0" + schedule.timeServe.da
                : schedule.timeServe.day}
              -
              {schedule.timeServe.month < 10
                ? "0" + schedule.timeServe.month
                : schedule.timeServe.month}
              -{schedule.timeServe.year}
            </div>
          ) : null}

          <div className="text-left px-2 my-2">
            <div className="text-black flex">
              <span className="inline-block 2xl:text-sm xl:text-xs lg:text-[10px]">
                Bạn có lịch hẹn với{" "}
                <span className="text-blue-solid">{schedule.serviceName}</span>{" "}
                vào lúc{" "}
                <span className="text-blue-solid">
                  {schedule.timeServe.hour}:{schedule.timeServe.min}:
                  {schedule.timeServe.sec}
                </span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviewSchedule;
