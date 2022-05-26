import React, { useState } from "react";
import PreviewSchedule from "./PreviewSchedule";

interface IEventCalendar {
  isScheduleDay: boolean;
  isCurrentDay: boolean;
  value: number;
  isFirst: boolean;
  isLast: boolean;
  schedule?: any;
  idxEvent: number;
}

const EventCalendar: React.FC<IEventCalendar> = ({
  isScheduleDay,
  isCurrentDay,
  value,
  isFirst,
  isLast,
  schedule,
  idxEvent,
}) => {
  const [showEventPreview, setShowEventPreview] = useState(false);

  const onHoverEventSchedule = () => {
    setTimeout(() => {
      setShowEventPreview(true);
    }, 100);
  };

  const onOutEventSchedule = () => {
    setTimeout(() => {
      setShowEventPreview(false);
    }, 300);
  };

  if (isScheduleDay && isCurrentDay) {
    return (
      <span className="relative">
        {showEventPreview ? (
          <div className="">
            <PreviewSchedule idxEvent={idxEvent} schedules={schedule} />
          </div>
        ) : null}
        <span
          className="p-1 rounded-full bg-blue-solid text-white border-blue-400 border-2 2xl:text-sm xl:text-sm lg:text-xs"
          onMouseOver={onHoverEventSchedule}
          onMouseOut={onOutEventSchedule}
        >
          {value}
        </span>
      </span>
    );
  }

  if (isScheduleDay && !isCurrentDay) {
    return (
      <span className="relative">
        {showEventPreview ? (
          <div className="">
            <PreviewSchedule idxEvent={idxEvent} schedules={schedule} />
          </div>
        ) : null}
        <span
          className="p-1 bg-blue-400 border-2 text-white cursor-pointer 2xl:text-sm xl:text-sm lg:text-xs"
          onMouseOver={onHoverEventSchedule}
          onMouseOut={onOutEventSchedule}
        >
          {value}
        </span>
      </span>
    );
  }

  if (!isScheduleDay && isCurrentDay) {
    return (
      <span className="p-1 rounded-full border-blue-400 border-2 2xl:text-sm xl:text-sm lg:text-xs">
        {value}
      </span>
    );
  }

  return <span className="2xl:text-sm xl:text-sm lg:text-xs">{value}</span>;
};

export default EventCalendar;
