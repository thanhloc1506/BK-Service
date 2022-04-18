import React, { useState } from "react";
import PreviewSchedule from "./PreviewSchedule";

interface IEventCalendar {
  isScheduleDay: boolean;
  isCurrentDay: boolean;
  value: number;
  isFirst: boolean;
  isLast: boolean;
  schedule?: any;
}

const EventCalendar: React.FC<IEventCalendar> = ({
  isScheduleDay,
  isCurrentDay,
  value,
  isFirst,
  isLast,
  schedule,
}) => {
  const [showEventPreview, setShowEventPreview] = useState(false);

  const onHoverEventSchedule = () => {
    setShowEventPreview(true);
  };

  const onOutEventSchedule = () => {
    setShowEventPreview(false);
  };

  if (isScheduleDay && isCurrentDay) {
    <span className="relative">
      {showEventPreview ? (
        <div className="">
          <PreviewSchedule
            isFirst={isFirst}
            isLast={isLast}
            schedule={schedule[0]}
          />
        </div>
      ) : null}
      <span
        className="p-1 rounded-full bg-blue-solid text-white border-blue-400 border-2"
        onMouseOver={onHoverEventSchedule}
        onMouseOut={onOutEventSchedule}
      >
        {value}
      </span>
    </span>;
  }

  if (isScheduleDay && !isCurrentDay) {
    return (
      <span className="relative">
        {showEventPreview ? (
          <div className="">
            <PreviewSchedule
              isFirst={isFirst}
              isLast={isLast}
              schedule={schedule[0]}
            />
          </div>
        ) : null}
        <span
          className="p-1 bg-blue-400 border-2 text-white cursor-pointer"
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
      <span className="p-1 rounded-full border-blue-400 border-2">{value}</span>
    );
  }

  return <span>{value}</span>;
};

export default EventCalendar;
