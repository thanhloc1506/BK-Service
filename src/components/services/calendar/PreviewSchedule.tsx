import React from "react";

interface IPreviewSchedule {
  isFirst: boolean;
  isLast: boolean;
  schedule: any;
}

const PreviewSchedule: React.FC<IPreviewSchedule> = ({
  isFirst,
  isLast,
  schedule,
}) => {
  console.log(schedule);
  return (
    <div
      className={
        isFirst
          ? "h-fit w-52 bg-white border-2 text-sm border-gray-300 absolute bottom-10 left-[-12px] z-1000"
          : isLast
          ? "h-fit w-52 bg-white border-2 text-sm border-gray-300 absolute bottom-10 left-[-200px] z-1000"
          : "h-fit w-52 bg-white border-2 text-sm border-gray-300 absolute bottom-10 left-[-155px] z-1000"
      }
    >
      <div className="border-b-2 border-b-gray-200 py-1">
        Sự kiện ngày:{" "}
        {schedule.timeServe.day < 10
          ? "0" + schedule.timeServe.day
          : schedule.timeServe.day}
        -
        {schedule.timeServe.month < 10
          ? "0" + schedule.timeServe.month
          : schedule.timeServe.month}
        -{schedule.timeServe.year}
      </div>
      <div className="text-left px-2 my-2">
        <div className="text-black flex">
          <span className="inline-block">
            Bạn có lịch hẹn với{" "}
            <span className="text-blue-solid">{schedule.service}</span> vào lúc{" "}
            <span className="text-blue-solid">
              {schedule.timeServe.hour}:{schedule.timeServe.min}:
              {schedule.timeServe.sec}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreviewSchedule;
