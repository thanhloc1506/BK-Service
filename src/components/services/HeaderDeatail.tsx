import React from "react";
import service from "../../assets/service/service.png";
import Breakcumb from "../layouts/Breakcumb";
import ButtonFollow from "../layouts/ButtonFollow";

type Address = {
  province: string;
  district: string;
  village: string;
  detail: string;
};

interface IHeaderDetail {
  name: string;
  phone: number;
  address: Address;
  serviceId: string;
  followServices: any;
}

const HeaderDeatail: React.FC<IHeaderDetail> = ({
  name,
  phone,
  address,
  serviceId,
  followServices,
}: IHeaderDetail) => {
  return (
    <>
      <div className="grid grid-cols-3">
        <div>
          <div className="pt-5 flex justify-end">
            <img src={service} alt="Service" className="h-[35vh] w-[25vw]" />
          </div>
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-5 border-b-2 border-b-gray-100 pb-5">
            <div className="col-span-4 ml-10">
              <Breakcumb addresses={[address.province, address.district]} />
              <div className="flex">
                <p className="font-bold text-xl">Nguyen Van A</p>
                <p className="font-bold text-xl mx-3">-</p>
                <p className="font-bold text-xl">{name}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <ButtonFollow serviceId={serviceId} />
            </div>
          </div>
          <div className="grid grid-cols-8 border-b-2 border-b-gray-100 pb-2">
            <div className="flex justify-start ml-10 mt-2">
              <div className="bg-blue-light rounded-full overflow-hidden h-14 w-14">
                <p className="flex justify-center mt-3 text-2xl font-bold text-white">
                  9.2
                </p>
              </div>
            </div>
            <div className="col-span-5 ml-2">
              <div className="grid grid-cols-5 gap-4">
                <div className="mt-1">
                  <p className="text-2xl text-blue-light font-semibold">9.2</p>
                  <p className="mt-1">Tieu chi 1</p>
                </div>
                <div className="mt-1">
                  <p className="text-2xl text-blue-light font-semibold">9.2</p>
                  <p className="mt-1">Tieu chi 1</p>
                </div>
                <div className="mt-1">
                  <p className="text-2xl text-blue-light font-semibold">9.2</p>
                  <p className="mt-1">Tieu chi 1</p>
                </div>
                <div className="mt-1">
                  <p className="text-2xl text-blue-light font-semibold">9.2</p>
                  <p className="mt-1">Tieu chi 1</p>
                </div>
                <div className="mt-1">
                  <p className="text-2xl text-blue-light font-semibold">9.2</p>
                  <p className="mt-1">Tieu chi 1</p>
                </div>
              </div>
            </div>
            <div>
              <div className="mt-1 ml-10">
                <p className="text-2xl font-semibold">122</p>
                <p className="mt-1">Bình luận</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-start ml-12 mt-3">
              <svg
                className="h-7 w-7 text-gray-600"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="12" cy="11" r="3" />{" "}
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
              </svg>
              <p className="text-gray-600 text-xl font-semibold ml-5">
                {address.detail},{address.village},{address.district},
                {address.province}
              </p>
            </div>
            <div className="flex justify-start ml-12 mt-2">
              <svg
                className="h-6 w-6 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <circle cx="12" cy="12" r="10" />{" "}
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <div className="flex">
                <p className="text-green-400 ml-6 font-bold text-xl">
                  Đang mở cửa
                </p>
                <p className="text-gray-600 text-xl font-semibold ml-5">
                  08h00 - 22h00
                </p>
              </div>
            </div>
            <div className="flex justify-start ml-12 mt-2">
              <svg
                className="h-7 w-7 text-gray-600"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <path d="M11 3L20 12a1.5 1.5 0 0 1 0 2L14 20a1.5 1.5 0 0 1 -2 0L3 11v-4a4 4 0 0 1 4 -4h4" />{" "}
                <circle cx="9" cy="9" r="2" />
              </svg>
              <p className="text-gray-600 text-xl font-semibold ml-5">
                20.000d - 1.000.000d
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderDeatail;
