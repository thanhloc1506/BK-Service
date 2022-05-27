import moment from "moment";
import React, { useEffect } from "react";
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
  defauld?: boolean
): boolean => {
  let count = 0;
  const bookTime = parseTime(date);

  var hourReal = isPM ? String(parseInt(hour) + 12) : hour;
  for (const schedule of allSchedules) {
    if (serviceId === schedule.service) {
      const timeServe = moment(schedule.timeServe as Date)
        .utcOffset("+0700")
        .format("YYYY/MM/DD HH:mm");
      var month = timeServe.split(" ")[0].split("/")[1];
      var day = timeServe.split(" ")[0].split("/")[2];
      var year = timeServe.split(" ")[0].split("/")[0];
      var hourFormat = timeServe.split(" ")[1].split(":")[0];
      var min = timeServe.split(" ")[1].split(":")[1];

      if (
        parseInt(year) == parseInt(bookTime.year) &&
        parseInt(month) == parseInt(bookTime.month) &&
        parseInt(day) == parseInt(bookTime.day) &&
        parseInt(hourFormat) == parseInt(hourReal)
      ) {
        count += 1;
      }
    }
  }

  const open = parseHour(openTime);
  const close = parseHour(closeTime);
  const isInRangeTimeOpen = checkInRangeTime(hour, isPM, open, close);

  if (defauld) return count >= 1;

  return count >= 1 || !isInRangeTimeOpen || hourReal < new Date().getHours();
};

const checkValidAMPM = () => {
  const currentHour = new Date().getHours();
  return currentHour > 12;
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
}) => {
  const serviceState = useSelector((state: RootState) => state.service);

  const onClickHour = (value: string) => {
    setHour(value);
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
        true
      )
    ) {
      console.log(idx);
      setHour(String(idx + 1));
      idx += 1;
    }
  }, []);

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
                  false
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
                    false
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
                  false
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
                    false
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
                  false
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
                    false
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
                  false
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
                    false
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
                  false
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
                    false
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
                  false
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
                    false
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
                  false
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
                    false
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
                  false
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
                    false
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
                  false
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
                    false
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
                  false
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
                    false
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
                  false
                )}
                className={
                  getCountByServeDate(
                    date,
                    serviceId,
                    serviceState.allSchedules,
                    AMPM == "PM",
                    "11",
                    openTime,
                    closeTime
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
                  false
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
                    false
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
                disabled={checkValidAMPM()}
                className={checkValidAMPM() ? "bg-gray-300" : ""}
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
