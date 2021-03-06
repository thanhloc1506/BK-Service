import React, { useEffect, useState } from "react";
import {
  ParseDate,
  Schedule,
  ScheduleHistory,
} from "../../apis/common/Schedule";
import { BiTime } from "react-icons/bi";
import { BsFillStarFill, BsTelephone, BsXLg } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { getAddressContent } from "../../utils/getAddressContent";
import { useDispatch } from "react-redux";
import { hideWaiting, showWaiting } from "../../redux/slices/loading";
import { ModalConfirm } from "../common/ModalConfirm";
import { useNavigate } from "react-router-dom";
import { DEFAULT_AVATAR } from "../../constants/common";

interface ScheduleHistoryItemProps extends React.Props<any> {
  data: ScheduleHistory;
}
export const ScheduleHistoryItem: React.FC<ScheduleHistoryItemProps> = ({
  data,
}: ScheduleHistoryItemProps) => {
  const [userAddress, setUserAddress] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const [date, _sd] = useState<ParseDate>(data.date as ParseDate);

  if (!data) return null;
  return (
    <div>
      <div
        className={
          "grid grid-cols-5 overflow-y-hidden bg-white rounded shadow-xl p-4 gap-4"
        }
      >
        <div className={"col-span-1 h-32 w-32 m-auto"}>
          <img
            src={data.user?.avatar?.url ?? DEFAULT_AVATAR}
            alt=""
            className={"w-[100%] h-[100%] rounded-full border-2"}
          />
        </div>
        <div className={"col-span-3"}>
          <div className={"grid grid-cols-2 divide-x gap-2"}>
            <div className={"flex flex-col gap-2"}>
              <div>
                <p
                  className={
                    "2xl:text-xl xl:text-lg lg:text-xs font-bold tracking-tight text-gray-900"
                  }
                >
                  {data.user.fullName}
                </p>
              </div>
              <div>
                <BiTime className={"inline m-auto mr-2"} size={22} />
                <p className={"inline 2xl:text-lg xl:text-sm lg:text-xs"}>
                  {date.day}/{date.month}/{date.year} {date.hour}:{date.min}:
                  {date.sec}
                </p>
              </div>
              <div>
                <GrLocation className={"inline m-auto mr-2"} size={22} />
                <p className={"inline"}>{userAddress}</p>
              </div>
              <div>
                <BsTelephone className={"inline m-auto mr-2"} size={22} />
                <p className={"inline 2xl:text-lg xl:text-sm lg:text-xs"}>
                  {data.user.phone}
                </p>
              </div>
            </div>
            <div className={"flex flex-col gap-2 pl-3"}>
              <div>
                <p
                  className={
                    "2xl:text-xl xl:text-lg lg:text-sm font-bold tracking-tight text-gray-900"
                  }
                >
                  {data.service.name}
                </p>
              </div>
              <div>
                <GrLocation className={"inline m-auto mr-2"} size={22} />
                <p className={"inline 2xl:text-lg xl:text-sm lg:text-xs"}>
                  {serviceAddress}
                </p>
              </div>
              <div>
                <BsTelephone className={"inline m-auto mr-2"} size={22} />
                <p className={"inline 2xl:text-lg xl:text-sm lg:text-xs"}>
                  {data.service.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={"flex flex-col justify-center h-full gap-8"}>
            {1 !== 1 ? (
              <button
                className={
                  "w-3/4 text-red-500 bg-red-100 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg  text-center py-3"
                }
                onClick={() => {}}
              >
                <BsXLg className={"inline mr-2"} />
                <p className={"inline 2xl:text-lg xl:text-sm lg:text-xs"}>
                  H???y l???ch
                </p>
              </button>
            ) : (
              <button
                className={
                  "px-1 w-full text-amber-500 bg-yellow-100 hover:bg-amber-200 focus:ring-4 focus:outline-none focus:ring-amber-100 font-medium rounded-lg  text-center 2xl:py-2 xl:py-1 lg:py-0.5"
                }
                onClick={() => navigate(`/detailService/${data.service._id}`)}
              >
                <BsFillStarFill className={"inline mr-1 mt-[-5px]"} />
                <p className={"inline 2xl:text-lg xl:text-sm lg:text-xs"}>
                  ????nh gi?? ngay
                </p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
