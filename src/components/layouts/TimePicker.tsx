import React, {useEffect, useState} from "react";

export interface ITimePicker {
  readonly defaultHour?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
  readonly defaultMin?: "0" | "30";
  readonly defaultAP?: "am" | "pm";
  readonly onChange?: (value: string) => void;
}

const TimePicker = ({defaultHour, defaultAP, defaultMin, onChange}: ITimePicker) => {
  const [hour, setHour] = useState(defaultHour || "0");
  const [min, setMin] = useState(defaultMin || "0");
  const [ap, setAp] = useState(defaultAP || "am");

  useEffect(() => {
    const time = "".concat(hour).concat(":").concat(min).concat(" ").concat(ap);
    onChange && onChange(time);
    // alert(time);
  }, [hour, min, ap]);
  return (
      <div className="mt-2 p-2 w-40 bg-white rounded-lg border-2 border-gray-200">
        <div className="flex justify-center">
          <select name="hours" className="bg-transparent text-xl appearance-none outline-none text-right"
                  onChange={(e: any) => {
                    setHour(e.target.value);
                  }}>
            <option value="1" selected={hour === "1"}>1</option>
            <option value="2" selected={hour === "2"}>2</option>
            <option value="3" selected={hour === "3"}>3</option>
            <option value="4" selected={hour === "4"}>4</option>
            <option value="5" selected={hour === "5"}>5</option>
            <option value="6" selected={hour === "6"}>6</option>
            <option value="7" selected={hour === "7"}>7</option>
            <option value="8" selected={hour === "8"}>8</option>
            <option value="9" selected={hour === "9"}>9</option>
            <option value="10" selected={hour === "10"}>10</option>
            <option value="11" selected={hour === "11"}>10</option>
            <option value="12" selected={hour === "12"}>12</option>
          </select>
          <span className="text-xl mx-3">:</span>
          <select name="minutes" className="bg-transparent text-xl appearance-none outline-none mr-4"
                  onChange={(e: any) => {
                    setMin(e.target.value);
                  }}
          >
            <option value="0" selected={min === "0"}>00</option>
            <option value="30" selected={min === "30"}>30</option>
          </select>
          <select name="ampm" className="bg-transparent text-xl appearance-none outline-none"
                  onChange={(e: any) => {
                    setAp(e.target.value);
                  }}
          >
            <option value="am" selected={ap === "am"}>AM</option>
            <option value="pm" selected={ap === "pm"}>PM</option>
          </select>
        </div>
      </div>
  );
};

export default TimePicker;
