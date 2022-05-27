import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import service from "../../assets/service/service.png";
import { RootState } from "../../redux/store";
import Breakcumb from "../layouts/Breakcumb";
import ButtonFollow from "../layouts/ButtonFollow";
import { Address } from "../../apis/common/Address";
import { getAddressContent } from "../../utils/getAddressContent";
import { Service } from "../../apis/common/Service";
import { ModalImage } from "./ModalImage";
import { Carousel } from "react-responsive-carousel";
import moment from "moment";

interface IHeaderDetail {
  data: Service;
  scores: number[];
  numOfComments: number;
}

const tieuchi = ["Tin cậy", "Đáp ứng", "Đảm bảo", "Vật chất", "Thiện cảm"];

const currentTime = moment(new Date())
  .utcOffset("+0700")
  .format("YYYY/MM/DD HH:mm");
var month = currentTime.split(" ")[0].split("/")[1];
var day = currentTime.split(" ")[0].split("/")[2];
var year = currentTime.split(" ")[0].split("/")[0];
var hourFormat = parseInt(currentTime.split(" ")[1].split(":")[0]);
var minFormat = parseInt(currentTime.split(" ")[1].split(":")[1]);

const HeaderDeatail: React.FC<IHeaderDetail> = ({
  data,
  scores,
  numOfComments,
}: IHeaderDetail) => {
  const authState = useSelector((state: RootState) => state.user);
  const miniCarousel = useRef<Carousel>(null);
  const [curIndexImage, setCurIndexImage] = useState(0);
  const [showModalImage, setShowModalImage] = useState(false);
  const [numOfComment, setNumOfComment] = useState(numOfComments);
  const [addressText, setAddressText] = useState("");

  useEffect(() => {
    getAddressContent(data.address).then((res) => {
      setAddressText(res || "");
    });
  }, [data.address]);

  const [status, setStatus] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);

  useEffect(() => {
    if (data.openTime == undefined || data.closeTime == undefined) {
      return;
    }
    let openTime = parseInt(data.openTime.split(":")[0]);
    let closeTime = parseInt(data.closeTime.split(":")[0]);
    if (data.openTime.split(" ")[1] === "pm") {
      openTime = openTime + 12;
    }
    if (data.closeTime.split(" ")[1] === "pm") {
      closeTime = closeTime + 12;
    }

    if (hourFormat > openTime && hourFormat < closeTime) {
      setStatus(true);
      setStatusLoading(false);
      return;
    }

    if (
      openTime == hourFormat &&
      parseInt(data.openTime.split(" ")[0].split(":")[1]) <= minFormat
    ) {
      setStatus(true);
      setStatusLoading(false);
      return;
    }

    if (
      closeTime == hourFormat &&
      parseInt(data.closeTime.split(" ")[0].split(":")[1]) >= minFormat
    ) {
      setStatus(true);
      setStatusLoading(false);
      return;
    }
    setStatusLoading(false);
  }, []);

  return (
    <>
      <div className="grid grid-cols-5 bg-white border-2 border-gray-50">
        <ModalImage
          defaultIndex={curIndexImage}
          listImages={data.images?.map((e) => e.url) || [""]}
          onChangeImage={(i) => {
            miniCarousel.current && miniCarousel.current.moveTo(i);
          }}
          show={showModalImage}
          setShow={setShowModalImage}
        />
        <div
          onClick={() =>
            data.images && data.images.length > 0 && setShowModalImage(true)
          }
          className={"cursor-pointer col-span-2"}
        >
          <div className="flex justify-end">
            {data.images && data.images.length > 0 ? (
              <Carousel
                ref={miniCarousel}
                onChange={(i) => setCurIndexImage(i)}
                showThumbs={false}
                showArrows={false}
                showIndicators={true}
                showStatus={false}
                autoPlay={!showModalImage}
                infiniteLoop={true}
              >
                {data.images &&
                  data.images.map((e, index) => {
                    return (
                      <div key={index} className={"overflow-hidden"}>
                        <img
                          src={e.url}
                          className={
                            "max-w-full 2xl:max-h-64 xl:max-h-56 lg:max-h-52"
                          }
                        />
                      </div>
                    );
                  })}
              </Carousel>
            ) : (
              <div>
                <img
                  src={"https://paroda.vn/media/2021/08/customer-service.jpg"}
                  className={"w-full h-full"}
                />
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-6 border-b-2 border-b-gray-50 pb-3">
            <div className="col-span-4 ml-10">
              {/*<Breakcumb addresses={[data.address.province, data.address.district]} />*/}
              <div className="flex">
                {/*<p className="font-bold text-xl">Nguyen Van A</p>*/}
                {/*<p className="font-bold text-xl mx-3">-</p>*/}
                <p className="font-bold 2xl:text-2xl xl:text-xl lg:text-lg mt-3">
                  {data.name}
                </p>
              </div>
            </div>
            {authState.isAuthenticated ? (
              <div className="flex justify-end col-span-2">
                <ButtonFollow serviceId={data._id} />
              </div>
            ) : null}
          </div>
          <div className="grid 2xl:grid-cols-8 xl:grid-cols-8 lg:grid-cols-9 border-b-2 border-b-gray-50 pb-2">
            <div className="flex justify-start ml-10 mt-2 2xl:col-span-1 xl:col-span-1 lg:col-span-2">
              <div className="bg-blue-light rounded-full overflow-hidden 2xl:h-12 2xl:w-12 xl:h-8 xl:w-8 lg:w-8 lg:h-8">
                <p className="flex justify-center 2xl:mt-2.5 xl:mt-1.5 lg:mt-1.5 2xl:text-xl xl:text-sm lg:text-sm font-semibold text-white">
                  {scores && scores.length >= 5 ? scores[5].toFixed(1) : ""}
                </p>
              </div>
            </div>
            <div className="2xl:col-span-5 xl:col-span-5 lg:col-span-6 2xl:ml-2 xl:ml-2 lg:ml-[-10px]">
              <div className="grid grid-cols-5 2xl:gap-4 xl:gap-4 lg:gap-0">
                {scores &&
                  scores.length >= 5 &&
                  scores.slice(0, 5).map((s, i) => {
                    return (
                      <div className="mt-1 text-center" key={i}>
                        <p className="2xl:text-lg xl:text-sm lg:text-sm text-blue-light font-semibold">
                          {s.toFixed(1)}
                        </p>
                        <p className="2xl:mt-1.5 xl:mt-1 2xl:text-sm xl:text-xs lg:text-[12px]">
                          {tieuchi[i]}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div>
              <div className="2xl:mt-1 xl:mt-0">
                <p className="2xl:text-xl xl:text-lg lg:text-sm font-semibold flex justify-center 2xl:pl-8">
                  {numOfComments}
                </p>
                <p className="2xl:mt-1.5 xl:mt-0 lg:mt-1 2xl:text-sm xl:text-xs lg:text-[12px] flex justify-end">
                  Bình luận
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-start 2xl:ml-12 xl:ml-11 lg:ml-11 2xl:mt-3 xl:mt-1.5">
              <svg
                className="2xl:h-7 2xl:w-7 xl:h-6 xl:w-6 lg:h-5 lg:w-5 text-gray-600"
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
              <p className="text-gray-600 2xl:text-lg lg:text-sm xl:text-xs font-semibold ml-5">
                {addressText}
              </p>
            </div>
            <div className="flex justify-start 2xl:ml-12 xl:ml-[2.9rem] lg:ml-11 mt-2">
              <svg
                className="2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 lg:h-5 lg:w-5 text-gray-600"
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
              <div className="flex xl:mt-[-1px] 2xl:mt-0 lg:mt-[-1px]">
                {statusLoading ? null : (
                  <>
                    {status ? (
                      <p className="text-green-400 2xl:ml-6 xl:ml-5 lg:ml-4 font-semibold 2xl:text-lg lg:text-sm xl:text-xs">
                        Đang mở cửa
                      </p>
                    ) : (
                      <p className="text-red-400 2xl:ml-6 xl:ml-5 lg:ml-4 font-semibold 2xl:text-lg lg:text-sm xl:text-xs">
                        Đang đóng cửa
                      </p>
                    )}

                    <p className="text-gray-600 2xl:text-lg lg:text-sm xl:text-xs font-semibold xl:mt-0 lg:mt-0.5 ml-5">
                      {data.openTime.toUpperCase()} -{" "}
                      {data.closeTime.toUpperCase()}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-start 2xl:ml-12 xl:ml-[2.9rem] lg:ml-[2.8rem] 2xl:mt-1 xl:mt-0">
              <svg
                className="2xl:h-7 2xl:w-7 xl:h-6 xl:w-6 lg:h-6 lg:w-6 text-gray-600"
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
              <p className="text-gray-600 2xl:text-lg lg:text-sm xl:text-xs font-semibold 2xl:ml-5 xl:ml-4 lg:ml-3 xl:mt-[-2px] 2xl:mt-0">
                {data.minPrice}đ - {data.maxPrice}đ
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderDeatail;
