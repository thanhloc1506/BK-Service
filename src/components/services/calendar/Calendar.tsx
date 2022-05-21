import { useEffect, useRef, useState } from "react";
import CalendarRow from "./CalendarRow";

export interface CalendarProps {
  witdh?: string;
  height?: string;
  selectedDay?: any;
  schedules: any[];
}
let rows = [0, 1, 2, 3, 4, 5];
const Calendar: React.FC<CalendarProps> = ({
  witdh,
  height,
  selectedDay,
  schedules,
}) => {
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeMonthString, setActiveMonthString] = useState(
    new Date().toDateString().split(" ")[1]
  );
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const prevMonth = useRef<number>(null);
  const [firstDayInMonth, setFirstDayInMonth] = useState<number[]>([]);

  useEffect(() => {
    let x = [];
    for (let i = 1; i <= 12; i++) {
      x.push(new Date(`${activeYear}/${i}/1`).getDay());
    }
    setFirstDayInMonth(x);
  }, [activeYear]);

  useEffect(() => {
    setActiveMonthString(
      new Date(new Date().setMonth(activeMonth)).toDateString().split(" ")[1]
    );
    //remember previous activeMonth
    //@ts-ignore
    prevMonth.current = activeMonth;
  }, [activeMonth]);

  return (
    <div
      className={`md:shadow-lg md:rounded pt-3 pb-2 px-1 bg-white w-[20vw] mx-4 md:mx-auto`}
    >
      <div className="w-[20vw] rounded px-3">
        <div className="flex items-center justify-between mb-4">
          <div className="text-left font-bold text-sm text-black">
            {`${activeMonthString} ${activeYear}`}
          </div>
          <div className="flex space-x-4">
            <button
              className="px-1 py-0.5 rounded bg-blue-400 text-white"
              onClick={() => {
                if (prevMonth.current === 0) {
                  setActiveYear(activeYear - 1);
                  setActiveMonth(11);
                } else {
                  setActiveMonth(activeMonth - 1);
                }
              }}
            >
              <svg
                width={15}
                height={15}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
                ></path>
              </svg>
            </button>
            <button
              className="px-1 py-0.5 rounded bg-blue-400 text-white"
              onClick={() => {
                if (prevMonth.current === 11) {
                  setActiveYear(activeYear + 1);
                  setActiveMonth(0);
                } else {
                  setActiveMonth(activeMonth + 1);
                }
              }}
            >
              <svg
                width={15}
                height={15}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="-mx-2">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 2xl:px-1 xl:px-1 lg:px-0.5 2xl:text-xl xl:text-lg lg:text-sm">
                  S
                </th>
                <th className="py-2 2xl:px-1 xl:px-1 lg:px-0.5 2xl:text-xl xl:text-lg lg:text-sm">
                  M
                </th>
                <th className="py-2 2xl:px-1 xl:px-1 lg:px-0.5 2xl:text-xl xl:text-lg lg:text-sm">
                  T
                </th>
                <th className="py-2 2xl:px-1 xl:px-1 lg:px-0.5 2xl:text-xl xl:text-lg lg:text-sm">
                  W
                </th>
                <th className="py-2 2xl:px-1 xl:px-1 lg:px-0.5 2xl:text-xl xl:text-lg lg:text-sm">
                  T
                </th>
                <th className="py-2 2xl:px-1 xl:px-1 lg:px-0.5 2xl:text-xl xl:text-lg lg:text-sm">
                  F
                </th>
                <th className="py-2 2xl:px-1 xl:px-1 lg:px-0.5 2xl:text-xl xl:text-lg lg:text-sm">
                  S
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <CalendarRow
                    firstDay={firstDayInMonth[activeMonth]}
                    lastDayInMonth={new Date(
                      activeYear,
                      activeMonth + 1,
                      0
                    ).getDate()}
                    row={row}
                    currentMonth={activeMonth}
                    currentYear={activeYear}
                    schedules={schedules}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
