import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, ReactNode, useState } from "react";
import { RiNotification3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PInNotification } from "../../apis/package/in/PInNoti";
import { NotiType } from "../../apis/common/NotiType";
import { readAllNoti } from "../../redux/slices/noti";

export const ModalNoti = () => {
  const [showing, setShowing] = useState(false);
  const state = useSelector((state: RootState) => state.noti);
  return (
    <Popover className="relative">
      <Popover.Button>
        <div className={"w-full"}>
          <span
            className={`flex h-3 w-3 absolute right-2 top-0 ${
              !state.hasNewNoti ? "hidden" : ""
            }`}
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500" />
          </span>
          <div className="flex justify-center mt-1">
            <RiNotification3Line
              className={"2xl:text-2xl xl:text-xl lg:text-xl text-white"}
              //   size={28}
            />
          </div>
          <p className="text-white 2xl:mt-2 xl:mt-1 lg:mt-1 2xl:text-sm xl:text-xs lg:text-[11.5px] font-medium flex justify-end">
            Thông báo
          </p>
        </div>
      </Popover.Button>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Overlay
          className={"fixed inset-0 backdrop-blur z-[20] cursor-default"}
        />
      </Transition.Child>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
        afterEnter={() => {
          setShowing(true);
        }}
      >
        <Popover.Panel className="absolute z-20 w-full ">
          <NotiContent />
        </Popover.Panel>
      </Transition>
    </Popover>
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

export const NotiContent = () => {
  const noti = useSelector((state: RootState) => state.noti);
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={
          "2xl:w-[460px] xl:w-[380px] 2xl:max-w-[580px] xl:max-w-[460px] lg:w-[320px] h-fit max-h-[85vh] bg-white drop-shadow-xl rounded-md translate-x-[-45%] 2xl:p-2 xl:p-2 lg:p-1.5 relative"
        }
      >
        <div className={"flex justify-between items-center h-fit w-full p-1"}>
          <p
            className={
              "font-medium leading-6 text-gray-700 2xl:text-xl xl:text-sm lg:text-xs pl-2"
            }
          >
            Thông báo
          </p>
          <p
            className={
              "italic text-black/50 underline-offset-1 2xl:text-lg xl:text-sm lg:text-xs pr-2"
            }
            onClick={() => {
              dispatch(readAllNoti());
            }}
          >
            Đánh dấu tất cả là đã đọc
          </p>
        </div>

        <div
          className={
            "divide-y 2xl:mx-3 xl:mx-2 2xl:h-[560px] xl:h-[450px] lg:h-[380px] 2xl:mt-5 xl:mt-3 overflow-y-auto overflow-y-hiden"
          }
        >
          {noti.notiLoading
            ? ""
            : noti.notiData.map((n, index) => {
                return (
                  <NotiItem
                    content={getContentNoti(n)}
                    img={
                      n.service.images && n.service.images.length > 0
                        ? n.service.images[0]?.url
                        : "https://paroda.vn/media/2021/08/customer-service.jpg"
                    }
                    time={getTimeText(n.date)}
                    key={index}
                    hadRead={n.hadRead}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
};

interface INotiItem {
  readonly hadRead?: boolean;
  readonly img: string;
  readonly content: ReactNode;
  readonly time: string;
  readonly onClick?: () => void;
}

export const NotiItem = ({
  hadRead,
  content,
  img,
  time,
  onClick,
}: INotiItem) => {
  return (
    <div>
      <div
        className={`items-center grid grid-cols-7 2xl:p-3 xl:p-2 lg:p-1 my-1 transition-all duration-500 rounded ${
          !hadRead
            ? "bg-orange-200/30 hover:bg-orange-200"
            : "bg-gray-200/30 hover:bg-gray-200"
        }`}
      >
        <div className={"col-span-1"}>
          <img
            src={img}
            className={
              "2xl:w-14 2xl:h-14 xl:w-12 xl:h-12 lg:w-10 lg:h-10 rounded"
            }
          />
        </div>
        <div className={"col-span-6"}>
          <div className="2xl:text-lg xl:text-sm lg:text-[12px] 2xl:px-3 xl:px-2 lg:px-1">
            {content}
          </div>
          <div>
            <p
              className={
                "text-gray-500 2xl:text-sm xl:text-xs lg:text-[12px] 2xl:px-3 xl:px-2 lg:px-1"
              }
            >
              {time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
