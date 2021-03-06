import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ITimePicker {
  hour: string;
  setHour: any;
  min: string;
  setMin: any;
  AMPM: string;
  setAMPM: any;
  date: any;
  serviceId: string;
  openTime?: string;
  closeTime?: string;
  isValid: boolean;
  setIsValid: any;
  scheduleCountPerHour?: number;
}

const parseTime = (date: Date) => {
  const dateFormat = date
    .toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    })
    .split(",")[0];
  const day = dateFormat.split(" ")[0];
  return {
    day: day.split("/")[1],
    month: day.split("/")[0],
    year: day.split("/")[2],
  };
};

const parseHour = (time?: string) => {
  return {
    time: parseInt(time?.split(" ")[0].split(":")[0] as string) ?? "01",
    AMPM: time?.split(" ")[1].toUpperCase() ?? "AM",
  };
};

const checkInRangeTime = (hour: any, isPM: boolean, open: any, close: any) => {
  let isInRangeOpen = true;

  if (open.AMPM == "AM" && !isPM) {
    if (hour < open.time) {
      isInRangeOpen = false;
    }
  } else if (open.AMPM == "PM" && !isPM) {
    isInRangeOpen = false;
  } else if (open.AMPM == "PM" && isPM) {
    if (hour < open.time) {
      isInRangeOpen = false;
    }
  }

  if (close.AMPM == "AM" && !isPM) {
    if (hour > close.time) {
      isInRangeOpen = false;
    }
  } else if (close.AMPM == "AM" && isPM) {
    isInRangeOpen = false;
  } else if (close.AMPM == "PM" && isPM) {
    if (hour > close.time) {
      isInRangeOpen = false;
    }
  }
  return isInRangeOpen;
};

const getCountByServeDate = (
  date: any,
  serviceId: string,
  allSchedules: any[],
  isPM: boolean,
  hour: any,
  openTime?: string,
  closeTime?: string,
  defauld?: boolean,
  scheduleCountPerHour?: any
): boolean => {
  let count = 0;
  const bookTime = parseTime(date);

  var hourReal = isPM ? String(parseInt(hour) + 12) : hour;
  for (const schedule of allSchedules) {
    if (serviceId === schedule.service) {
      const timeServe = moment(schedule.timeServe as Date)
        // .utcOffset("+0700")
        .format("YYYY/MM/DD HH:mm");
      let month = timeServe.split(" ")[0].split("/")[1];
      let day = timeServe.split(" ")[0].split("/")[2];
      let year = timeServe.split(" ")[0].split("/")[0];
      let hourFormat = timeServe.split(" ")[1].split(":")[0];
      let min = timeServe.split(" ")[1].split(":")[1];

      if (
        parseInt(year) == parseInt(bookTime.year) &&
        parseInt(month) == parseInt(bookTime.month) &&
        parseInt(day) == parseInt(bookTime.day) &&
        parseInt(hourFormat) == parseInt(hourReal)
      ) {
        console.log(bookTime);
        count += 1;
      }
    }
  }
  const open = parseHour(openTime);
  const close = parseHour(closeTime);
  const isInRangeTimeOpen = checkInRangeTime(hour, isPM, open, close);

  const scheduleAllowedPerHour = scheduleCountPerHour ?? 5;

  if (defauld) return count >= scheduleAllowedPerHour;
  // console.log(
  //   new Date().getFullYear(),
  //   parseInt(bookTime.year),
  //   new Date().getMonth(),
  //   parseInt(bookTime.month),
  //   new Date().getDate(),
  //   parseInt(bookTime.day)
  // );
  return (
    count >= scheduleAllowedPerHour ||
    !isInRangeTimeOpen ||
    (hourReal < new Date().getHours() &&
      new Date().getFullYear() == parseInt(bookTime.year) &&
      new Date().getMonth() + 1 == parseInt(bookTime.month) &&
      new Date().getDate() == parseInt(bookTime.day))
  );
};

const checkValidAMPM = (date: any) => {
  const currentHour = new Date().getHours();
  const bookTime = parseTime(date);
  return (
    currentHour > 12 &&
    new Date().getFullYear() == parseInt(bookTime.year) &&
    new Date().getMonth() + 1 == parseInt(bookTime.month) &&
    new Date().getDate() == parseInt(bookTime.day)
  );
};

const TimePicker: React.FC<ITimePicker> = ({
  hour,
  setHour,
  min,
  setMin,
  AMPM,
  setAMPM,
  date,
  serviceId,
  openTime,
  closeTime,
  isValid,
  setIsValid,
  scheduleCountPerHour,
}) => {
  const serviceState = useSelector((state: RootState) => state.service);

  const [tmpHour, setTmpHour] = useState(hour);

  const onClickHour = (value: string) => {
    setHour(value);
    setTmpHour(value);
  };

  const onClickMin = (value: string) => {
    setMin(value);
  };

  const onClickAMPM = (value: string) => {
    setAMPM(value);
  };

  useEffect(() => {
    let idx = new Date().getHours();
    setHour(idx > 12 ? String(idx - 12) : String(idx));
    setAMPM(idx > 12 ? "PM" : "AM");
    idx = idx > 12 ? idx - 12 : idx;
    while (
      getCountByServeDate(
        date,
        serviceId,
        serviceState.allSchedules,
        AMPM == "PM",
        String(idx),
        openTime,
        closeTime,
        true,
        scheduleCountPerHour as number
      )
    ) {
      console.log(idx);
      setHour(String(idx + 1));
      idx += 1;
    }
    const realDefauldHour = AMPM == "PM" ? parseInt(hour) + 12 : parseInt(hour);
    const realCloseTime =
      parseHour(closeTime).AMPM == "PM"
        ? parseHour(closeTime).time + 12
        : parseHour(closeTime).time;
    setIsValid(true);
    // console.log(realDefauldHour, realCloseTime);

    const realBookHour =
      AMPM == "PM" ? parseInt(tmpHour) + 12 : parseInt(tmpHour);
    if (
      realDefauldHour > realCloseTime &&
      date.getDate() == new Date().getDate() &&
      date.getMonth() == new Date().getMonth() &&
      date.getFullYear() == new Date().getFullYear()
    ) {
      console.log(realDefauldHour, realCloseTime);
      setIsValid(false);
    }
    console.log(isValid);
  }, [date]);

  return (
    <div>
      {serviceState.allSchedulesLoading ? (
        ""
      ) : (
        <div className="2xl:h-[38px] xl:h-[32px] lg:h-[32px] block 2xl:px-3 xl:px-2 lg:px-1.5 rounded-sm 2xl:py-1.5 xl:py-1 lg:py-1 text-gray-700 bg-white border border-solid border-gray-300">
          <div className="flex justify-center">
            <select
              name="hours"
              className="bg-transparent appearance-none outline-none text-right 2xl:text-lg xl:text-sm lg:text-sm"
              onChange={(e: any) => onClickHour(e.target.value)}
              disabled={!isValid}
            >
              <option
                value="01"
                selected={hour === "1"}
                disabled={getCountByServeDate(
                  date,
                  serviceId,
                  serviceState.allSchedules,
                  AMPM == "PM",
                  "1",
                  openTime,
                  closeTime,
                  false,
                  scheduleCountPerHour as number
                )}
                className={
                  getCountByServeDate(
                    date,
                    serviceId,
                    serviceState.allSchedules,
                    AMPM == "PM",
                    "1",
                    openTime,
                    closeTime,
                    false,
                    scheduleCountPerHour as number
                  )
                    ? "bg-gray-300"
                    : ""
                }
              >
                01
              </option>
              <option
                value="02"
                selected={hour === "2"}
                disabled={getCountByServeDate(
                  date,
                  serviceId,
                  serviceState.allSchedules,
                  AMPM == "PM",
                  "2",
                  openTime,
                  closeTime,
                  false,
                  scheduleCountPerHour as number
                )}
                className={
                  getCountByServeDate(
                    date,
                    serviceId,
                    serviceState.allSchedules,
                    AMPM == "PM",
                    "2",
                    openTime,
                    closeTime,
                    false,
                    scheduleCountPerHour as number
                  )
                    ? "bg-gray-300"
                    : ""
                }
              >
                02
              </option>
              <option
                value="03"
                selected={hour === "3"}
                disabled={getCountByServeDate(
                  date,
                  serviceId,
                  serviceState.allSchedules,
                  AMPM == "PM",
                  "3",
                  openTime,
                  closeTime,
                  false,
                  scheduleCountPerHour as number
                )}
                className={
                  getCountByServeDate(
                    date,
                    serviceId,
                    serviceState.allSchedules,
                    AMPM == "PM",
                    "3",
                    openTime,
                    closeTime,
                    false,
                    scheduleCountPerHour as number
                  )
                    ? "bg-gray-300"
                    : ""
                }
              >
                03
              </option>
              <option
                value="04"
                selected={hour === "4"}
                disabled={getCountByServeDate(
                  date,
                  serviceId,
                  serviceState.allSchedules,
                  AMPM == "PM",
                  "4",
                  openTime,
                  closeTime,
                  false,
                  scheduleCountPerHour as number
                )}
                className={
                  getCountByServeDate(
                    date,
                    serviceId,
                    serviceState.allSchedules,
                    AMPM == "PM",
                    "4",
                    openTime,
                    closeTime,
                    false,
                    scheduleCountPerHour as number
                  )
                    ? "bg-gray-300"
                    : ""
                }
              >
                04
              </option>
              <option
                value="05"
                selected={hour === "5"}
                disabled={getCountByServeDate(
                  date,
                  serviceId,
                  serviceState.allSchedules,
                  AMPM == "PM",
                  "5",
                  openTime,
                  closeTime,
                  false,
                  scheduleCountPerHour as number
                )}
                className={
                  getCountByServeDate(
                    date,
                    serviceId,
                    serviceState.allSchedules,
                    AMPM == "PM",
                    "5",
                    openTime,
                    closeTime,
                    false,
                    scheduleCountPerHour as number
                  )
                    ? "bg-gray-300"
                    : ""
                }
              >
                05
              </option>
              <option
                value="06"
                selected={hour === "6"}
                disabled={getCountByServeDate(
                  date,
                  serviceId,
                  serviceState.allSchedules,
                  AMPM == "PM",
                  "6",
                  openTime,
                  closeTime,
                  false,
                  scheduleCountPerHour as number
                )}
                className={
                  getCountByServeDate(
                    date,
                    serviceId,
                    serviceState.allSchedules,
                    AMPM == "PM",
                    "6",
                    openTime,
                    closeTime,
                    false,
                    scheduleCountPerHour as number
                  )
                    ? "bg-gray-300"
                    : ""
                }
              >
                06
              </option>
              <option
                value="07"
                selected={hour === "7"}
                disabled={getCountByServeDate(
                  date,
                  serviceId,
                  serviceState.allSchedules,
                  AMPM == "PM",
                  "7",
                  openTime,
                  closeTime,
                  false,
                  scheduleCountPerHour as number
                )}
                className={
                  getCountByServeDate(
                    date,
                    serviceId,
                    serviceState.allSchedules,
                    AMPM == "PM",
                    "7",
                    openTime,
                    closeTime,
                    false,
                    scheduleCountPerHour as number
                  )
                    ? "bg-gray-300"
                    : ""
                }
              >
                07
              </option>
              <option
                value="08"
                selected={hour === "8"}
                disabled={getCountByServeDate(
                  date,
                  serviceId,
                  serviceState.allSchedules,
                  AMPM == "PM",
                  "8",
                  openTime,
                  closeTime,
                  false,
                  scheduleCountPerHour as number
                )}
                className={
                  getCountByServeDate(
                    date,
                    serviceId,
                    serviceState.allSchedules,
                    AMPM == "PM",
                    "8",
                    openTime,
                    closeTime,
                    false,
                    scheduleCountPerHour as number
                  )
                    ? "bg-gray-300"
                    : ""
                }
              >
                08
              </option>
              <option
                value="09"
                selected={hour === "9"}
                disabled={getCountByServeDate(
                  date,
                  serviceId,
                  serviceState.allSchedules,
                  AMPM == "PM",
                  "9",
                  openTime,
                  closeTime,
                  false,
                  scheduleCountPerHour as number
                )}
                className={
                  getCountByServeDate(
                    date,
                    serviceId,
                    serviceState.allSchedules,
                    AMPM == "PM",
                    "9",
                    openTime,
                    closeTime,
                    false,
                    scheduleCountPerHour as number
                  )
                    ? "bg-gray-300"
                    : ""
                }
              >
                09
              </option>
              <option
                value="10"
                selected={hour === "10"}
                disabled={getCountByServeDate(
                  date,
                  serviceId,
                  serviceState.allSchedules,
                  AMPM == "PM",
                  "10",
                  openTime,
                  closeTime,
                  false,
                  scheduleCountPerHour as number
                )}
                className={
                  getCountByServeDate(
                    date,
                    serviceId,
                    serviceState.allSchedules,
                    AMPM == "PM",
                    "10",
                    openTime,
                    closeTime,
                    false,
                    scheduleCountPerHour as number
                  )
                    ? "bg-gray-300"
                    : ""
                }
              >
                10
              </option>
              <option
                value="11"
                selected={hour === "11"}
                disabled={getCountByServeDate(
                  date,
                  serviceId,
                  serviceState.allSchedules,
                  AMPM == "PM",
                  "11",
                  openTime,
                  closeTime,
                  false,
                  scheduleCountPerHour as number
                )}
                className={
                  getCountByServeDate(
                    date,
                    serviceId,
                    serviceState.allSchedules,
                    AMPM == "PM",
                    "11",
                    openTime,
                    closeTime,
                    false,
                    scheduleCountPerHour as number
                  )
                    ? "bg-gray-300"
                    : ""
                }
              >
                11
              </option>
              <option
                value="12"
                selected={hour === "12"}
                disabled={getCountByServeDate(
                  date,
                  serviceId,
                  serviceState.allSchedules,
                  AMPM == "PM",
                  "12",
                  openTime,
                  closeTime,
                  false,
                  scheduleCountPerHour as number
                )}
                className={
                  getCountByServeDate(
                    date,
                    serviceId,
                    serviceState.allSchedules,
                    AMPM == "PM",
                    "12",
                    openTime,
                    closeTime,
                    false,
                    scheduleCountPerHour as number
                  )
                    ? "bg-gray-300"
                    : ""
                }
              >
                12
              </option>
            </select>
            <span className="2xl:px-2 xl:px-1.5 lg:px-1 2xl:text-lg xl:text-sm lg:text-sm">
              :
            </span>
            <select
              name="minutes"
              className="bg-transparent appearance-none outline-none mr-4 2xl:text-lg xl:text-sm lg:text-sm"
              onChange={(e: any) => onClickMin(e.target.value)}
            >
              <option value="00" selected={min === "00"}>
                00
              </option>
              <option value="30" selected={min === "30"}>
                30
              </option>
            </select>
            <select
              name="ampm"
              className="bg-transparent appearance-none outline-none 2xl:text-lg xl:text-sm lg:text-sm"
              onChange={(e: any) => onClickAMPM(e.target.value)}
            >
              <option
                value="AM"
                selected={AMPM === "AM"}
                disabled={checkValidAMPM(date)}
                className={checkValidAMPM(date) ? "bg-gray-300" : ""}
              >
                AM
              </option>
              <option value="PM" selected={AMPM === "PM"}>
                PM
              </option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
