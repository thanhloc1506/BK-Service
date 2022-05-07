import React, { useMemo } from "react";
import Calendar from "./calendar/Calendar";

const Schedule: React.FC = () => {
  return (
    <div className="py-5">
      <div className="flex justify-end mr-0">
        {/* <BookServiceModal open={open} setOpen={setOpen} service={service} /> */}
        <div className="shadow-xl w-[22vw] h-fit border-2 border-gray-100 bg-white">
          <div className="flex justify-center">
            <p className="2xl:text-xl xl:text-lg font-semibold pt-3">
              Thông tin đặt lịch
            </p>
          </div>
          {/* <div className="mt-5 ml-7">
            <p className="text-lg font-light">
              Họ và tên:{" "}
              {userState.user?.fullName !== undefined
                ? userState.user?.fullName
                : userState.user?.username}
            </p>
            <p className="mt-1 text-lg font-light">Sdt: 0123456789</p>
            <p className="mt-1 text-lg font-light">Dịch vụ: {service?.name}</p>
          </div> */}
          <div className="p-3">
            {useMemo(
              () => (
                <Calendar />
              ),
              []
            )}
          </div>
          {/* <div className="2xl:pr-4 xl:pr-3 pb-5 pt-2 flex justify-end">
            <button
              className="bg-blue-500 text-white rounded-sm text-sm 2xl:px-3 2xl:py-1.5 xl:px-2.5 xl:py-1"
              onClick={onClickOpen}
            >
              Đặt lịch
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
