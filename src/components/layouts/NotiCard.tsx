import React from "react";
import noti from "../../assets/bg/noti.png";

interface INoti {
  date: string;
  content: string;
}

const NotiCard: React.FC<INoti> = ({ date, content }: INoti) => {
  return (
    <div className="bg-white h-32 w-full">
      <div className="grid grid-cols-8 h-full">
        <div className="col-span-2">
          <div className="flex justify-center">
            <div className="text-2xl font-light mt-12 mr-5 text-[#374273]">
              <p>{date}</p>
            </div>
            <div className="mt-7">
              <img src={noti} alt="noti" />
            </div>
          </div>
        </div>
        <div className="col-span-5 mt-10">
          <p className="text-xl text-[#374273]">{content}</p>
        </div>
        <div className={'col-span-1 items-center flex'}>
          <button className="bg-[#FF4757] text-white w-full px-6 py-3 rounded-lg text-xl mr-5">
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotiCard;
