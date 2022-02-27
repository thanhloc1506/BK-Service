import React, { useState } from "react";
import NotiCard from "../layouts/NotiCard";
import ScheduleCard from "../layouts/ScheduleCard";

interface INoti {
  date: string;
  content: string;
}

const Notifications = () => {
  const noti: INoti = {
    date: "28/1/2021",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit blandit neque rhoncus.",
  };

  return (
    <div>
      <div className="h-12 bg-white py-8 pb-20 pl-32 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-400 font-medium text-3xl">Thông báo của tôi</p>
      </div>
      <div className="px-64 mt-8">
        <NotiCard date={noti.date} content={noti.content} />
      </div>
      <div className="px-64 mt-8">
        <NotiCard date={noti.date} content={noti.content} />
      </div>
      <div className="px-64 mt-8">
        <NotiCard date={noti.date} content={noti.content} />
      </div>
      <div className="px-64 mt-8">
        <NotiCard date={noti.date} content={noti.content} />
      </div>
    </div>
  );
};

export default Notifications;
