import React, { memo } from "react";
import rating from "../../assets/service/rating.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Service } from "../../apis/common/Service";

interface IService {
  data: Service;
  onBtnClick?: () => void;
  btnText?: string;
}

const SingleCard: React.FC<IService> = memo(
  ({ data, onBtnClick, btnText }: IService) => {
    return (
      <>
        <div className="2xl:w-72 2xl:h-[24rem] xl:w-56 xl:h-[20rem] lg:w-48 lg:h-[16rem] bg-white border-2 border-blue-200 rounded hover:drop-shadow-2xl shadow-lg shadow-cyan-500/50 transition-all duration-500 cursor-pointer">
          <div className={"2xl:h-[45%] xl:h-[41%] lg:h-[38%] overflow-hidden"}>
            <div className="flex justify-center 2xl:p-3 xl:p-2 lg:p-1">
              {data.images && data.images.length > 0 ? (
                <Carousel
                  showThumbs={false}
                  showArrows={false}
                  showIndicators={false}
                  showStatus={false}
                  autoPlay={true}
                  infiniteLoop={true}
                >
                  {data.images &&
                    data.images.map((e, index) => {
                      return (
                        <div key={index} className={"rounded overflow-hidden"}>
                          <img
                            src={e.url}
                            className={"2xl:w-72 2xl:h-40 xl:w-full xl:h-full"}
                          />
                        </div>
                      );
                    })}
                </Carousel>
              ) : (
                <div>
                  <img
                    src={"https://paroda.vn/media/2021/08/customer-service.jpg"}
                    className={
                      "2xl:w-72 2xl:h-40 xl:h-40 xl:w-72 lg:h-40 lg:w-72"
                    }
                  />
                </div>
              )}
              {/*<img src={data.avatar?.url} alt="service" className="w-72 h-40 p-3"/>*/}
            </div>
          </div>
          <div className="grid grid-cols-6 2xl:h-[10%] xl:h-[11%] lg:h-[13%] overflow-hidden">
            <div className="col-span-4 xl:text-xs lg:text-[13px] font-semibold 2xl:px-4 xl:px-3 lg:px-1 xl:mt-1">
              {data.name}
            </div>
            <div className="flex justify-end 2xl:p-1 xl:p-1 lg-p-0.5 2xl:mr-2 xl:mr-2 lg:mr-1 col-span-2">
              <p className="2xl:mt-1 xl:mt-0.5 lg:mt-0.5 2xl:px-2 xl:px-0.5 lg-px-0 lg:text-[12px] bg-blue-200 rounded-2xl overflow-hidden text-blue-600 2xl:text-xs xl:text-xs w-fit h-fit">
                {data.category?.category}
              </p>
            </div>
          </div>
          <div className="2xl:px-4 xl:px-2.5 lg:px-1 2xl:h-[5%] xl:h-[6%] lg:h-[7%] xl:mt-0.5 lg:mt-2">
            <img
              src={rating}
              alt="rating"
              className="xl:w-[40%] xl:h-[65%] lg:h-[60%%] xl:mt-[2%] lg:mt[3%]"
            />
          </div>
          <div className="px-4 py-2 2xl:h-[25%] xl:h-[25%] lg:h-[28%] overflow-hidden border-y-2 border-gray-200">
            <p
              className="text-sm font-light"
              dangerouslySetInnerHTML={{ __html: data.shortIntroduction || "" }}
            ></p>
          </div>
          <div className="grid grid-cols-4 row-span-1 xl:h-14 overflow-hidden lg:mt-1.5">
            <div className="flex justify-center h-full ml-1 2xl:mt-3 xl:mt-2">
              <svg
                className="xl:h-5 xl:w-5 lg:w-4 lg:h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="ml-0.5 font-light items-center 2xl:text-lg xl:text-sm lg:text-xs">
                {data.textCmtCount || 0}
              </p>
            </div>
            <div className="flex justify-center h-full 2xl:mt-3 xl:mt-2">
              <svg
                className="xl:h-5 xl:w-5 lg:w-4 lg:h-4 text-gray-500 align-middle"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="ml-0.5 font-light 2xl:text-lg xl:text-sm lg:text-xs">
                {data.imgCmtCount || 0}
              </p>
            </div>
            <div className="col-span-2 flex justify-end pr-3 items-center 2xl:mt-[-15px] xl:mt-[-15px] lg:mt-[-1px]">
              <button
                className="bg-blue-solid 2xl:h-8 xl:h-6 w-fit 2xl:px-4 xl:px-3 lg:px-1.5 lg:py-0.5 2xl:text-lg xl:text-sm lg:text-xs rounded-sm overflow-hidden text-white font-light hover:text-gray-700"
                onClick={onBtnClick}
              >
                {btnText || "Chỉnh sửa"}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default SingleCard;
