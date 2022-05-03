import React from "react";
import NotiCard from "../layouts/NotiCard";

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
      <div className="h-12 bg-white pt-12 pb-14 pl-20 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-solid font-medium 2xl:text-xl xl:text-lg">
          Thông báo của tôi
        </p>
      </div>
      {Array.from(Array(10).keys()).map((e, index) => {
        return (
          <div className="2xl:px-64 xl:px-48 2xl:mt-10 xl:mt-8" key={index}>
            <NotiCard
              date={noti.date}
              content={noti.content}
              index={e}
              key={e}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
