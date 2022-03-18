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
          <div className="h-12 bg-white py-8 pb-20 pl-20 border-b-2 border-b-gray-200 shadow-sm">
              <p className="text-blue-400 font-medium text-3xl">Thông báo của tôi</p>
          </div>
          {Array.from(Array(10).keys()).map((e)=>{
              return <div className="px-[10vw] mt-8">
                  <NotiCard date={noti.date} content={noti.content} index={e} key={e}/>
              </div>
          })}
      </div>
  );
};

export default Notifications;
