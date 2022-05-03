import React, { useEffect } from "react";
import ScheduleCard from "../layouts/ScheduleCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchScheduleHistory } from "../../redux/slices/schedule-history";
import { ScheduleItem } from "../schedule/ScheduleItem";
import { ScheduleHistoryItem } from "../schedule/ScheduleHistoryItem";

interface ISchedule {
  image: string;
  titleCard: string;
  time: string;
  address: string;
}

const History = () => {
  const schedules = useSelector((state: RootState) => state.scheduleHistory);
  const dispatch = useDispatch();
  useEffect(() => {
    if (dispatch) dispatch(fetchScheduleHistory());
  }, [dispatch]);

  return (
    <div className={"pb-10"}>
      <div className="h-12 bg-white pt-12 pb-14 pl-20 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-solid font-medium 2xl:text-xl xl:text-lg">
          Lịch sử
        </p>
      </div>
      {schedules.scheduleHistoryLoading ? (
        ""
      ) : (
        <div className={"flex flex-col gap-2 px-32 mt-10"}>
          {Array.isArray(schedules.scheduleHistory) &&
            schedules.scheduleHistory.map((s, index) => (
              <ScheduleHistoryItem key={index} data={s} />
            ))}
        </div>
      )}

      <div>{/*<ScheduleItem/>*/}</div>
    </div>
  );
};

export default History;
