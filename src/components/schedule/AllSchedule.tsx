import React, { useEffect } from "react";
import { ScheduleItem } from "./ScheduleItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchSchedule } from "../../redux/slices/schedule";

export const AllSchedules = () => {
  const dispatch = useDispatch();
  const scheduleState = useSelector((state: RootState) => state.schedule);
  useEffect(() => {
    dispatch(fetchSchedule());
  }, []);
  return (
    <div>
      <div className="h-12 bg-white pt-12 pb-14 pl-20 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-solid font-medium 2xl:text-xl xl:text-lg lg:text-sm">
          Tất cả lịch hẹn
        </p>
      </div>
      {scheduleState.schedulesLoading ? (
        ""
      ) : (
        <div className={"flex flex-col gap-2 px-32 mt-10"}>
          {scheduleState.schedules.map((s, index) => (
            <ScheduleItem data={s} key={index} />
          ))}
        </div>
      )}

      <div>{/*<ScheduleItem/>*/}</div>
    </div>
  );
};