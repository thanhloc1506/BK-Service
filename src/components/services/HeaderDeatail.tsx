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

interface IHeaderDetail {
  data: Service;
  scores: number[];
  numOfComments: number;
}

const HeaderDeatail: React.FC<IHeaderDetail> = ({
  data,
  scores,
  numOfComments,
}: IHeaderDetail) => {
  const authState = useSelector((state: RootState) => state.user);
  const [addressText, setAddressText] = useState("");
  const miniCarousel = useRef<Carousel>(null);
  const [curIndexImage, setCurIndexImage] = useState(0);
  const [showModalImage, setShowModalImage] = useState(false);
  const [numOfComment, setNumOfComment] = useState(numOfComments);
  useEffect(() => {
    getAddressContent(data.address).then((res) => setAddressText(res || ""));
  }, [data.address]);
  return (
    <>
      <div className="grid grid-cols-3">
        <ModalImage
          defaultIndex={curIndexImage}
          listImages={data.images?.map((e) => e.url) || [""]}
          onChangeImage={(i) => {
            miniCarousel.current && miniCarousel.current.moveTo(i);
          }}
          show={showModalImage}
          setShow={setShowModalImage}
        />
        <div onClick={()=>(data.images&&data.images.length>0 && setShowModalImage(true))} className={'cursor-pointer'}>
          <div className="pt-5 flex justify-end">
            {data.images&&data.images.length>0 ?
                <Carousel ref={miniCarousel}
                          onChange={(i)=>setCurIndexImage(i)}
                          showThumbs={false}
                          showArrows={false}
                          showIndicators={true}
                          showStatus={false}
                          autoPlay={!showModalImage}
                          infiniteLoop={true}>
                  { data.images && (data.images.map((e, index)=>{
                    return <div key={index} className={'rounded-lg overflow-hidden'}>
                      <img src={e.url} className={'w-full h-full'}/>
                    </div>
                  }))}
                </Carousel>
                : (<div>
                  <img src={'https://paroda.vn/media/2021/08/customer-service.jpg'} className={'w-full h-full'}/>
                </div>)}
          </div>
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-5 border-b-2 border-b-gray-100 pb-5">
            <div className="col-span-4 ml-10">
              {/*<Breakcumb addresses={[data.address.province, data.address.district]} />*/}
              <div className="flex mt-10">
                {/*<p className="font-bold text-xl">Nguyen Van A</p>*/}
                {/*<p className="font-bold text-xl mx-3">-</p>*/}
                <p className="font-bold text-2xl">{data.name}</p>
              </div>
            </div>
            {authState.isAuthenticated ? (
              <div className="flex justify-center">
                <ButtonFollow serviceId={data._id} />
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-8 border-b-2 border-b-gray-100 pb-2">
            <div className="flex justify-start ml-10 mt-2">
              <div className="bg-blue-light rounded-full overflow-hidden h-14 w-14">
                <p className="flex justify-center mt-3 text-2xl font-bold text-white">
                  {scores && scores.length >= 5 ? scores[5].toFixed(2) : ""}
                </p>
              </div>
            </div>
            <div className="col-span-5 ml-2">
              <div className="grid grid-cols-5 gap-4">
                {scores &&
                  scores.length >= 5 &&
                  scores.slice(0, 5).map((s, i) => {
                    return (
                      <div className="mt-1 text-center" key={i}>
                        <p className="text-2xl text-blue-light font-semibold">
                          {s.toFixed(2)}
                        </p>
                        <p className="mt-1">Tieu chi {i + 1}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div>
              <div className="mt-1 ml-10 text-center">
                <p className="text-2xl font-semibold">{numOfComments}</p>
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
                {addressText}
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
                  {data.openTime} - {data.closeTime}
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
