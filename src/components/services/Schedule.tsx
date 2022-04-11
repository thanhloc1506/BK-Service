import React, { useState } from "react";
import Calendar from "./calendar/Calendar";
import BookServiceModal from "./schedule/BookServiceModal";

const Schedule: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onClickOpen = () => {
    setOpen(true);
  };
  return (
    <div className="py-5">
      <div className="flex justify-center">
        <BookServiceModal open={open} setOpen={setOpen} />
        <div className="shadow-xl w-fit h-fit border-2 border-gray-200 ">
          <div className="flex justify-center">
            <p className="text-2xl font-bold pt-5">Thông tin đặt lịch</p>
          </div>
          <div className="mt-5 ml-7">
            <p className="text-lg font-light">Ho va ten: Nguyen Van A</p>
            <p className="mt-1 text-lg font-light">Sdt: 0123456789</p>
            <p className="mt-1 text-lg font-light">
              Dich vu: Sua chua dien thoai
            </p>
          </div>
          <div className="p-5">
            <Calendar />
          </div>
          <div className="px-5 pb-5 pt-2 flex justify-end">
            <button
              className="bg-blue-500 text-white rounded-sm px-5 py-2"
              onClick={onClickOpen}
            >
              Đặt lịch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
