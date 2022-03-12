import React from "react";

const Premium = () => {
  return (
    <div>
      <div className="h-12 bg-white py-8 pb-20 pl-10 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-400 font-medium text-xl">
          Gói dịch vụ & bảng giá
        </p>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-10">
          {/* Free */}
          <div className="h-[55vh] bg-blue-300 w-2/3 ml-[5vw] mt-[12vh]">
            <div className="flex justify-center pt-3">
              <p className="text-3xl">Free</p>
            </div>
            <div>
              <div className="flex justify-center pt-2">
                <div>
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <line x1="12" y1="1" x2="12" y2="23" />{" "}
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <p className="text-3xl">0</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between px-10 pr-16 pt-8">
                <div>
                  <svg
                    className="h-8 w-8 text-blue-solid mr-10"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Đăng dịch vụ</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between px-10 pr-16 pt-5">
                <div>
                  <svg
                    className="h-8 w-8 text-blue-solid"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Theo dõi dịch vụ</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between px-10 pr-16 pt-5">
                <div>
                  <svg
                    className="h-8 w-8 text-blue-solid"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Đặt lịch qua web</p>
              </div>
            </div>
            <div className="opacity-50">
              <div className="flex justify-between px-10 pr-16 pt-5">
                <div>
                  <svg
                    className="h-8 w-8 text-gray-500"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Lên xu hướng</p>
              </div>
            </div>
            <div className="opacity-50">
              <div className="flex justify-between px-10 pr-16 pt-5">
                <div>
                  <svg
                    className="h-8 w-8 text-gray-500"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Quảng cáo</p>
              </div>
            </div>
            <div className="flex justify-center pt-[6.5rem]">
              <button className="bg-blue-solid px-5 py-2 text-white">
                Dang dung
              </button>
            </div>
          </div>
          {/* Pro */}
          <div className="h-[55vh] bg-blue-300 w-2/3 ml-[3vw] mt-[6vh]">
            <div className="flex justify-center pt-3">
              <p className="text-3xl">Pro</p>
            </div>
            <div>
              <div className="flex justify-center pt-2">
                <div>
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <line x1="12" y1="1" x2="12" y2="23" />{" "}
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <p className="text-3xl">99</p>
                <p className="text-2xl mt-1.5 font-thin">/ Year</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between px-10 pr-16 pt-8">
                <div>
                  <svg
                    className="h-8 w-8 text-blue-solid mr-10"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Đăng dịch vụ</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between px-10 pr-16 pt-5">
                <div>
                  <svg
                    className="h-8 w-8 text-blue-solid"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Theo dõi dịch vụ</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between px-10 pr-16 pt-5">
                <div>
                  <svg
                    className="h-8 w-8 text-blue-solid"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Đặt lịch qua web</p>
              </div>
            </div>
            <div className="">
              <div className="flex justify-between px-10 pr-16 pt-5">
                <div>
                  <svg
                    className="h-8 w-8 text-blue-solid"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Lên xu hướng</p>
              </div>
            </div>
            <div className="">
              <div className="flex justify-between px-10 pr-16 pt-5">
                <div>
                  <svg
                    className="h-8 w-8 text-blue-solid"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Quảng cáo</p>
              </div>
            </div>
            <div className="flex justify-center pt-[6.5rem]">
              <button className="bg-blue-solid px-12 py-2 text-white">
                Chon
              </button>
            </div>
          </div>
          {/* Plus */}
          <div className="h-[55vh] bg-blue-300 w-2/3 ml-[1vw] mt-[12vh]">
            <div className="flex justify-center pt-3">
              <p className="text-3xl">Plus</p>
            </div>
            <div>
              <div className="flex justify-center pt-2">
                <div>
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <line x1="12" y1="1" x2="12" y2="23" />{" "}
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <p className="text-3xl">19</p>
                <p className="text-2xl mt-1.5">/ Month</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between px-10 pr-16 pt-8">
                <div>
                  <svg
                    className="h-8 w-8 text-blue-solid mr-10"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Đăng dịch vụ</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between px-10 pr-16 pt-5">
                <div>
                  <svg
                    className="h-8 w-8 text-blue-solid"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Theo dõi dịch vụ</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between px-10 pr-16 pt-5">
                <div>
                  <svg
                    className="h-8 w-8 text-blue-solid"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Đặt lịch qua web</p>
              </div>
            </div>
            <div className="">
              <div className="flex justify-between px-10 pr-16 pt-5">
                <div>
                  <svg
                    className="h-8 w-8 text-blue-solid"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Lên xu hướng</p>
              </div>
            </div>
            <div className="opacity-50">
              <div className="flex justify-between px-10 pr-16 pt-5">
                <div>
                  <svg
                    className="h-8 w-8 text-gray-500"
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
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
                <p className="text-xl">Quảng cáo</p>
              </div>
            </div>
            <div className="flex justify-center pt-[6.5rem]">
              <button className="bg-blue-solid px-12 py-2 text-white">
                Chon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
