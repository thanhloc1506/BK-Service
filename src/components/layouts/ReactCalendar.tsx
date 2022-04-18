import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "../../style/calendar.css";

const ReactCalendar = () => {
  const [dateState, setDateState] = useState(new Date());
  const changeDate = (e: any) => {
    setDateState(e);
  };
  return (
    <>
      <Calendar value={dateState} onChange={changeDate} />
      <p>
        Current selected date is{" "}
        <b>{moment(dateState).format("MMMM Do YYYY")}</b>
      </p>
    </>
  );
};

export default ReactCalendar;
