import React from "react";

interface ITimePicker {
  hour: string;
  setHour: any;
  min: string;
  setMin: any;
  AMPM: string;
  setAMPM: any;
}

const TimePicker: React.FC<ITimePicker> = ({
  hour,
  setHour,
  min,
  setMin,
  AMPM,
  setAMPM,
}) => {
  const onClickHour = (value: string) => {
    setHour(value);
  };

  const onClickMin = (value: string) => {
    setMin(value);
  };

  const onClickAMPM = (value: string) => {
    setAMPM(value);
  };
  return (
    <div>
      <div className="2xl:h-[38px] xl:h-[32px] lg:h-[32px] block 2xl:px-3 xl:px-2 lg:px-1.5 rounded-sm 2xl:py-1.5 xl:py-1 lg:py-1 text-gray-700 bg-white border border-solid border-gray-300">
        <div className="flex justify-center">
          <select
            name="hours"
            className="bg-transparent appearance-none outline-none text-right 2xl:text-lg xl:text-sm lg:text-sm"
            onChange={(e: any) => onClickHour(e.target.value)}
          >
            <option value="1" selected={hour === "1"}>
              01
            </option>
            <option value="02" selected={hour === "2"}>
              02
            </option>
            <option value="03" selected={hour === "3"}>
              03
            </option>
            <option value="04" selected={hour === "4"}>
              04
            </option>
            <option value="05" selected={hour === "5"}>
              05
            </option>
            <option value="06" selected={hour === "6"}>
              06
            </option>
            <option value="07" selected={hour === "7"}>
              07
            </option>
            <option value="08" selected={hour === "8"}>
              08
            </option>
            <option value="09" selected={hour === "9"}>
              09
            </option>
            <option value="10" selected={hour === "10"}>
              10
            </option>
            <option value="11" selected={hour === "11"}>
              11
            </option>
            <option value="12" selected={hour === "12"}>
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
            <option value="AM" selected={AMPM === "AM"}>
              AM
            </option>
            <option value="PM" selected={AMPM === "PM"}>
              PM
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
