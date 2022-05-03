import React, { useEffect, useState } from "react";
import { ParseDate, Schedule } from "../../apis/common/Schedule";
import { BiTime } from "react-icons/bi";
import { BsCheckLg, BsTelephone, BsXLg } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { getAddressContent } from "../../utils/getAddressContent";
import { useDispatch } from "react-redux";
import { hideWaiting, showWaiting } from "../../redux/slices/loading";
import { ModalConfirm } from "../common/ModalConfirm";
import { deleteSchedule } from "../../redux/slices/schedule";
import service from "../../assets/service/service.png";

interface ScheduleItemProps extends React.Props<any> {
  data: Schedule;
}
export const ScheduleItem: React.FC<ScheduleItemProps> = ({
  data,
}: ScheduleItemProps) => {
  const [userAddress, setUserAddress] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [showModalDone, setShowModalDone] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.service && data.service.address) {
      dispatch(showWaiting());
      getAddressContent(data.service.address)
        .then((res) => {
          setServiceAddress(res || "");
        })
        .catch((res) => {
          console.log(res);
        })
        .finally(() => dispatch(hideWaiting()));
    }

    if (data && data.user && data.user.address) {
      dispatch(showWaiting());
      getAddressContent(data.user.address)
        .then((res) => {
          setUserAddress(res || "");
        })
        .catch((res) => {
          console.log(res);
        })
        .finally(() => dispatch(hideWaiting()));
    }
  }, [data]);

  const [imgService, _si] = useState(
    data.service.images && data.service.images.length > 0
      ? data.service.images[0].url
      : "https://paroda.vn/media/2021/08/customer-service.jpg"
  );

  const [date, _sd] = useState<ParseDate>(data.timeServe as ParseDate);

  if (!data) return null;
  return (
    <div className="2xl:mb-5 xl:mb-4">
      <ModalConfirm
        onOk={() => {
          // dispatch(doneSchedule(data._id));
          setShowModalDone(false);
        }}
        onCancel={() => {
          setShowModalDone(false);
        }}
        title={"Xác nhận hoàn thành? "}
        show={showModalDone}
        setShow={setShowModalDone}
      />
      <ModalConfirm
        onOk={() => {
          // dispatch(deleteSchedule(data._id));
          dispatch(deleteSchedule(data._id));
          setShowModalDelete(false);
        }}
        onCancel={() => {
          setShowModalDelete(false);
        }}
        title={"Xác nhận xóa lịch hẹn này? "}
        show={showModalDelete}
        setShow={setShowModalDelete}
      />
      <div
        className={
          "grid grid-cols-5 overflow-y-hidden bg-white rounded shadow-xl p-4 gap-4"
        }
      >
        <div className={"col-span-1 2xl:h-32 2xl:w-32 xl:h-28 xl:w-28 m-auto"}>
          <img
            src={imgService as string}
            alt=""
            className={"w-full h-full rounded-full border-2"}
          />
        </div>
        <div className={"col-span-3"}>
          <div className={"grid grid-cols-2 divide-x gap-2"}>
            <div className={"flex flex-col gap-2"}>
              <div>
                <p
                  className={
                    "2xl:text-lg xl:text-sm font-bold tracking-tight text-gray-900"
                  }
                >
                  {data.user.fullName}
                </p>
              </div>
              <div>
                <BiTime className={"inline m-auto mr-2"} size={22} />
                <p className={"inline 2xl:text-lg xl:text-sm"}>
                  {date.day}/{date.month}/{date.year} {date.hour}:{date.min}:
                  {date.sec}
                </p>
              </div>
              <div>
                <GrLocation className={"inline m-auto mr-2"} size={22} />
                <p className={"inline 2xl:text-lg xl:text-sm"}>{userAddress}</p>
              </div>
              <div>
                <BsTelephone className={"inline m-auto mr-2"} size={22} />
                <p className={"inline 2xl:text-lg xl:text-sm"}>
                  {data.user.phone}
                </p>
              </div>
            </div>
            <div className={"flex flex-col gap-2 pl-3 pt-1.5"}>
              <div>
                <p
                  className={
                    "2xl:text-xl xl:text-lg font-bold tracking-tight text-gray-900"
                  }
                >
                  {data.service.name}
                </p>
              </div>
              <div>
                <GrLocation className={"inline m-auto mr-2"} size={22} />
                <p className={"inline 2xl:text-lg xl:text-sm"}>
                  {serviceAddress}
                </p>
              </div>
              <div>
                <BsTelephone className={"inline m-auto mr-2"} size={22} />
                <p className={"inline 2xl:text-lg xl:text-sm"}>
                  {data.service.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={"flex flex-col justify-center h-full gap-8"}>
            <button
              className={
                "2xl:w-3/4 xl:w-5/6 text-red-500 bg-red-100 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg  text-center 2xl:py-3 xl:py-2 xl:ml-5"
              }
              onClick={() => setShowModalDelete(true)}
            >
              <BsXLg className={"inline mr-2"} />
              <p className={"inline 2xl:text-lg xl:text-sm"}>Hủy lịch</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
