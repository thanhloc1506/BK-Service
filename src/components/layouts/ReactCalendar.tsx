import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "../../style/calendar.css";

interface IReactCalendar {
  date: any;
  setDate: any;
  setOpen: any;
}

const ReactCalendar: React.FC<IReactCalendar> = ({
  date,
  setDate,
  setOpen,
}) => {
  const changeDate = (e: any) => {
    setDate(e);
    setOpen(false);
  };
  return (
    <div className="">
      <Calendar value={date} onChange={changeDate} />
    </div>
  );
};

export default ReactCalendar;
