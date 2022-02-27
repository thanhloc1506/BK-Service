import React from "react";
import noti from "../../assets/bg/noti.png";

interface INoti {
  date: string;
  content: string;
}

const NotiCard: React.FC<INoti> = ({ date, content }: INoti) => {
  return (
    <div className="bg-white h-32">
      <div className="grid grid-cols-8">
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
        <div>
          <button className="bg-[#FF4757] text-white px-10 py-3 rounded-lg text-xl mt-8">
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotiCard;
