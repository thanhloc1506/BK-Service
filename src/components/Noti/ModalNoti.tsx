import {Popover, Transition} from "@headlessui/react";
import React, {Fragment, ReactNode, useState} from "react";
import {RiNotification3Line} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {PInNotification} from "../../apis/package/in/PInNoti";
import {NotiType} from "../../apis/common/NotiType";
import {readAllNoti} from "../../redux/slices/noti";

export const ModalNoti = () => {
    const [showing, setShowing] = useState(false);
    const state = useSelector((state: RootState)=>state.noti);
    return <Popover className="relative">
        <Popover.Button>
            <div className={""}>
                      <span className={`flex h-3 w-3 absolute right-2 top-0 ${!state.hasNewNoti? "hidden": ""}`}>
                          <span
                              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"/>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"/>
                        </span>
                <div className="flex justify-center">
                    <RiNotification3Line className={"text-xl text-white"} size={28}/>
                </div>
                <p className="text-white mt-1 text-sm font-medium flex justify-end">
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
            <Popover.Overlay className={'fixed inset-0 backdrop-blur z-[20] cursor-default'}/>
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
                <NotiContent/>
            </Popover.Panel>
        </Transition>
    </Popover>
}

const getContentNoti = (noti: PInNotification.Notification): ReactNode=>{
    switch (noti.type){
        case NotiType.FOLLOWED:
            return <p><strong>{noti.user.fullName}</strong> đã theo dõi dịch vụ <strong>{noti.service.name} </strong>của bạn</p>
        case NotiType.UNFOLLOWED:
            return <p><strong>{noti.user.fullName}</strong> đã hủy theo dõi dịch vụ <strong>{noti.service.name} </strong>của bạn</p>
    }
}

const getTimeText = (t: number)=>{
    const time = t/1000;
    const curTime = Date.now() / 1000;
    if ((curTime - time) < 60) return "Vừa xong";
    if ((curTime - time) < 3600) return `${Math.floor((curTime - time) / 60)} phút trước`
    if ((curTime - time) < 3600 * 24) return `${Math.floor((curTime - time) / 3600)} giờ trước`
    return `${Math.floor((curTime - time) / (3600 * 24))} ngày trước`
}

export const NotiContent = () => {
    const noti = useSelector((state: RootState)=>state.noti)
    const dispatch = useDispatch();
    return (
        <>
            <div className={'w-[30vw] h-[85vh] bg-white drop-shadow-xl rounded-md translate-x-[-45%] p-4 relative'}>
                <div className={'absolute top-0 left-0 flex justify-between p-2 items-end mb-3 h-[7vh] w-full p-4'}>
                    <p className={'text-2xl font-medium leading-6 text-gray-900'}>Thông báo</p>
                    <p className={'italic text-black/30 underline-offset-1'} onClick={()=>dispatch(readAllNoti())}>Đánh dấu tất cả là đã đọc</p>
                </div>

                <div className={'divide-y mt-[7vh] h-[75vh] overflow-auto'}>
                    {noti.notiData.map((n, index)=>{
                        return <NotiItem  content={getContentNoti(n)} img={n.user.avatar.url} time={getTimeText(n.date)} key={index} hadRead={n.hadRead}/>
                    })}
                </div>
            </div>
        </>
    )
}

interface INotiItem {
    readonly hadRead?: boolean;
    readonly img: string;
    readonly content: ReactNode;
    readonly time: string;
    readonly onClick?: () => void;
}

export const NotiItem = ({hadRead, content, img, time, onClick}: INotiItem) => {
    return <div>
        <div
            className={`flex justify-center items-center grid grid-cols-7 p-3 my-1 transition-all duration-500 rounded ${!hadRead ? "bg-orange-200/30 hover:bg-orange-200" : "bg-gray-200/30 hover:bg-gray-200"}`}>
            <div className={'col-span-1'}>
                <img
                    src={img}
                    className={'w-12 h-12 rounded'}
                />
            </div>
            <div className={'col-span-6'}>
                <div>
                    {content}
                </div>
                <div>
                    <p className={'text-gray-300 text-sm'}>{time}</p>
                </div>
            </div>
        </div>
    </div>
}