import React from "react";

const Statistical: React.FC = () => {
  return (
    <div className="mt-5">
      <div className="mx-24 bg-gray-100">
        <div className="flex justify-center py-5 border-b-2 border-b-gray-200">
          <p className="font-bold text-xl">122</p>
          <p className="text-xl ml-2">Bình luận đã chia sẻ</p>
        </div>
        <div className="border-b-2 border-b-gray-200">
          <div className="grid grid-cols-5 py-5">
            <p className="flex justify-end col-span-2 text-purple-500 text-2xl">
              78
            </p>
            <p className="col-span-3 ml-5 text-2xl">Tuyet voi</p>
          </div>
          <div className="grid grid-cols-5 pb-5">
            <p className="flex justify-end col-span-2 text-green-500 text-2xl">
              22
            </p>
            <p className="col-span-3 ml-5 text-2xl">Tot</p>
          </div>
          <div className="grid grid-cols-5 pb-5">
            <p className="flex justify-end col-span-2 text-2xl">22</p>
            <p className="col-span-3 ml-5 text-2xl">Trung binh</p>
          </div>
          <div className="grid grid-cols-5 pb-5">
            <p className="flex justify-end col-span-2 text-red-500 text-2xl">
              0
            </p>
            <p className="col-span-3 ml-5 text-2xl">Kem</p>
          </div>
        </div>
        <div className="flex justify-center py-5">
          <p className="font-bold text-2xl text-purple-500">9.2</p>
          <p className="text-lg mt-0.5 ml-2">diem</p>
          <p className="px-2 text-2xl">-</p>
          <p className="text-2xl">Tuyet voi</p>
        </div>
      </div>
    </div>
  );
};

export default Statistical;
