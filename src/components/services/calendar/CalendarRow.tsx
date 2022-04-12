import { useState } from "react";

export interface CalendarRowProps {
  firstDay: number;
  lastDayInMonth: number;
  row: number;
  currentMonth: number;
  currentYear: number;
}

const CalendarRow: React.FC<CalendarRowProps> = ({
  firstDay,
  lastDayInMonth,
  row,
  currentMonth,
  currentYear,
}) => {
  const activeDay = useState(new Date().getDate())[0];

  let content = [];
  //first row with empty spaces
  if (!row) {
    for (let i = 0; i < firstDay; i++) {
      content.push(<td key={i + 30}></td>);
    }
    content.push(
      <td
        key={100}
        className="relative py-3 px-2 md:px-3  hover:text-blue-500 text-center text-gray-800"
      >
        1
      </td>
    );
    let len = 7 - content.length;
    for (let i = 1; i <= len; i++) {
      content.push(
        <td
          key={i}
          className="relative py-3 px-2 md:px-3  hover:text-blue-500 text-center text-gray-800"
        >
          {activeDay === i + 1 &&
          new Date().getMonth() === currentMonth &&
          new Date().getFullYear() === currentYear ? (
            <span className="p-1 bg-blue-200 border-blue-300 border-2">
              {i + 1}
            </span>
          ) : (
            <span>{i + 1}</span>
          )}
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
          className="relative py-3 px-2 md:px-3  hover:text-blue-500 text-center text-gray-800"
        >
          {activeDay === i + (7 * row - firstDay) &&
          new Date().getMonth() === currentMonth &&
          new Date().getFullYear() === currentYear ? (
            <span className="p-1 rounded-full border-blue-400 border-2">
              {i + (7 * row - firstDay)}
            </span>
          ) : (
            <span>{i + (7 * row - firstDay)}</span>
          )}
        </td>
      );
    }
  }
  return <>{content}</>;
};

export default CalendarRow;
