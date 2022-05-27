import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { NotiType } from "../../apis/common/NotiType";
import { PInNotification } from "../../apis/package/in/PInNoti";
import { RootState } from "../../redux/store";
import NotiCard from "../layouts/NotiCard";
import { NotiItem } from "../noti/ModalNoti";

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

  const notiState = useSelector((state: RootState) => state.noti);

  return (
    <div>
      <div className="h-12 bg-white pt-12 pb-14 pl-20 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-solid font-medium 2xl:text-xl xl:text-lg">
          Thông báo của tôi
        </p>
      </div>
      {/* {Array.from(Array(10).keys()).map((e, index) => {
        return (
          <div
            className="2xl:px-64 xl:px-48 lg:px-36 2xl:mt-10 xl:mt-8 lg:mt-6"
            key={index}
          >
            <NotiCard
              date={noti.date}
              content={noti.content}
              index={e}
              key={e}
            />
          </div>
        );
      })} */}
      <div className="2xl:px-64 xl:px-48 lg:px-36 2xl:mt-10 xl:mt-8 lg:mt-6">
        {notiState.notiLoading
          ? ""
          : notiState.notiData.map((n, index) => {
              return (
                <div key={index} className="mb-5">
                  <NotiCard
                    content={getContentNoti(n)}
                    img={
                      n.service.images && n.service.images.length > 0
                        ? n.service.images[0].url
                        : "https://paroda.vn/media/2021/08/customer-service.jpg"
                    }
                    time={getTimeText(n.date)}
                    hadRead={n.hadRead}
                    index={index}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
};

const getContentNoti = (noti: PInNotification.Notification): ReactNode => {
  switch (noti.type) {
    case NotiType.FOLLOWED:
      return (
        <span className="2xl:text-lg xl:text-sm lg:text-xs">
          <span>Bạn đã theo dõi dịch vụ </span>
          <span className="font-semibold">{noti.service.name} </span>
        </span>
      );
    case NotiType.UNFOLLOWED:
      return (
        <span className="2xl:text-lg xl:text-sm lg:text-xs">
          <span>Bạn đã hủy theo dõi dịch vụ </span>
          <span className="font-semibold">{noti.service.name} </span>
        </span>
      );
    case NotiType.ENTERPRISE_DELETE_SCHEDULE:
      return (
        <span>
          <span className="font-semibold">{noti.service.name} </span>
          <span>đã hủy lịch hẹn với bạn</span>
        </span>
      );
    case NotiType.ENTERPRISE_DONE_SCHEDULE:
      return (
        <span className="2xl:text-lg xl:text-sm lg:text-xs">
          <span>Bạn vừa hoàn thành sử dụng dịch vụ </span>
          <span className="font-semibold">{noti.service.name} </span>
          <span>
            . Hãy cho chúng tôi biết đánh giá của bạn về chất lượng dịch vụ nhé!
          </span>
        </span>
      );
  }
};

const getTimeText = (t: number) => {
  const time = t / 1000;
  const curTime = Date.now() / 1000;
  if (curTime - time < 60) return "Vừa xong";
  if (curTime - time < 3600)
    return `${Math.floor((curTime - time) / 60)} phút trước`;
  if (curTime - time < 3600 * 24)
    return `${Math.floor((curTime - time) / 3600)} giờ trước`;
  return `${Math.floor((curTime - time) / (3600 * 24))} ngày trước`;
};

export default Notifications;
