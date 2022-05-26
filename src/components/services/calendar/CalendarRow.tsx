import { useEffect, useState } from "react";
import EventCalendar from "./EventCalendar";

export interface CalendarRowProps {
  firstDay: number;
  lastDayInMonth: number;
  row: number;
  currentMonth: number;
  currentYear: number;
  schedules: any[];
  currentDay?: number;
}

const CalendarRow: React.FC<CalendarRowProps> = ({
  firstDay,
  lastDayInMonth,
  row,
  currentMonth,
  currentYear,
  currentDay,
  schedules,
}) => {
  const activeDay = useState(new Date().getDate())[0];

  const [showEventPreview, setShowEventPreview] = useState(false);

  const onHoverEventSchedule = () => {
    setShowEventPreview(true);
  };

  const onOutEventSchedule = () => {
    setShowEventPreview(false);
  };

  let content = [];
  //first row with empty spaces
  if (!row) {
    for (let i = 0; i < firstDay; i++) {
      content.push(<td key={i + 30}></td>);
    }
    content.push(
      <td
        key={100}
        className="relative 2xl:py-3 xl:py-2 lg:py-1.5 2xl:px-2 xl:px-1 lg:px-0.5 text-center"
      >
        <EventCalendar
          isCurrentDay={
            1 === activeDay &&
            new Date().getMonth() === currentMonth &&
            new Date().getFullYear() === currentYear
          }
          isScheduleDay={
            schedules.filter(
              (schedule) =>
                currentMonth + 1 == schedule.timeServe.month &&
                currentYear == schedule.timeServe.year &&
                1 == schedule.timeServe.day
            ).length > 0
          }
          value={1}
          isFirst={firstDay + 1 === 1 || firstDay === 1}
          isLast={firstDay + 1 === 7}
          schedule={schedules.filter(
            (schedule) =>
              currentMonth + 1 == schedule.timeServe.month &&
              currentYear == schedule.timeServe.year &&
              1 == schedule.timeServe.day
          )}
          idxEvent={firstDay}
        />
      </td>
    );

    let len = 7 - content.length;
    for (let i = 1; i <= len; i++) {
      content.push(
        <td
          key={i}
          className="relative 2xl:py-3 xl:py-2 2xl:px-2 xl:px-1 hover:text-blue-500 text-center text-gray-800"
        >
          <EventCalendar
            isCurrentDay={
              activeDay === i + 1 &&
              new Date().getMonth() === currentMonth &&
              new Date().getFullYear() === currentYear
            }
            isScheduleDay={
              schedules.filter(
                (schedule) =>
                  currentMonth + 1 == schedule.timeServe.month &&
                  currentYear == schedule.timeServe.year &&
                  i + 1 == schedule.timeServe.day
              ).length > 0
            }
            value={i + 1}
            isFirst={i === 1 || i - 1 === 1}
            isLast={i === len}
            schedule={schedules.filter(
              (schedule) =>
                currentMonth + 1 == schedule.timeServe.month &&
                currentYear == schedule.timeServe.year &&
                i + 1 == schedule.timeServe.day
            )}
            idxEvent={i}
          />
        </td>
      );
    }
    return <>{content}</>;
  }
  //other rows
  for (let i = 1; i <= 7; i++) {
    if (i + (7 * row - firstDay) <= lastDayInMonth) {
      content.push(
        <td
          key={i}
          className="relative 2xl:py-3 xl:py-2 2xl:px-2 xl:px-1 hover:text-blue-500 text-center text-gray-800"
        >
          <EventCalendar
            isCurrentDay={
              activeDay === i + (7 * row - firstDay) &&
              new Date().getMonth() === currentMonth &&
              new Date().getFullYear() === currentYear
            }
            isScheduleDay={
              schedules.filter(
                (schedule) =>
                  currentMonth + 1 == schedule.timeServe.month &&
                  currentYear == schedule.timeServe.year &&
                  i + (7 * row - firstDay) == schedule.timeServe.day
              ).length > 0
            }
            value={i + (7 * row - firstDay)}
            isFirst={i === 1 || i - 1 === 1}
            isLast={i === 7}
            schedule={schedules.filter(
              (schedule) =>
                currentMonth + 1 == schedule.timeServe.month &&
                currentYear == schedule.timeServe.year &&
                i + (7 * row - firstDay) == schedule.timeServe.day
            )}
            idxEvent={i}
          />
        </td>
      );
    }
  }
  return <>{content}</>;
};

export default CalendarRow;
