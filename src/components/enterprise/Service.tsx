import React from "react";
import rating from "../../assets/service/rating.png";
import {useNavigate} from "react-router-dom";
import {PInAllServices} from "../../apis/package/in/PInAllServices";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
interface IService {
    data: PInAllServices.Service;
    onBtnClick?: () => void;
}

const SingleCard: React.FC<IService> = ({
                                            data,
                                            onBtnClick
                                        }: IService) => {
    return (
        <>
            <div className="w-72 h-[28rem] bg-white border-2 border-blue-200 rounded">
                <div className={'h-[40%] overflow-hidden'}>
                    <div className="flex justify-center">
                        {data.images&&data.images.length>0 ?
                            <Carousel showThumbs={false} showArrows={false} showIndicators={false} showStatus={false} autoPlay={true} infiniteLoop={true}>
                                { data.images && (data.images.map((e, index)=>{
                                    return <div key={index}>
                                        <img src={e.url} className={'w-72 h-40'}/>
                                    </div>
                                }))}
                            </Carousel>
                            : (<div>
                                <img src={'https://paroda.vn/media/2021/08/customer-service.jpg'} className={'w72 h-40'}/>
                            </div>)}
                        {/*<img src={data.avatar?.url} alt="service" className="w-72 h-40 p-3"/>*/}
                    </div>
                </div>
                <div className="grid grid-cols-6 h-[10%] overflow-hidden">
                    <div className="col-span-4 font-bold px-4">{data.name}</div>
                    <div className="flex justify-end p-1 mr-2 col-span-2">
                        <p className="px-2 bg-blue-200 rounded-2xl overflow-hidden text-blue-600 text-xs w-fit h-fit">
                            {data.category?.category}
                        </p>
                    </div>
                </div>
                <div className="px-4 h-[5%]">
                    <img src={rating} alt="rating"/>
                </div>
                <div className="px-4 py-2 h-[30%] overflow-hidden border-y-2 border-gray-200">
                    <p className="text-sm font-light" dangerouslySetInnerHTML={{__html: data.introduction || ""}}>
                    </p>
                </div>
                {/*<div className="border-b-2 border-gray-100 mt-3"></div>*/}
                {/*<div className="border-b-2 border-gray-100 mt-12"></div>*/}
                <div className="grid grid-cols-4 h-16 row-span-1 h-[25%] overflow-hidden">
                    <div className="flex justify-center h-full mt-5 ml-1">
                        <svg
                            className="h-5 w-5 text-gray-500 align-middle mt-0.5"
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
                        <p className="ml-1 font-light">122</p>
                    </div>
                    <div className="flex justify-center h-full mt-5">
                        <svg
                            className="h-5 w-5 text-gray-500 align-middle mt-0.5"
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
                        <p className="ml-1 font-light">90</p>
                    </div>
                    <div className="col-span-2 flex justify-center mt-2">
                        <button
                            className="bg-blue-500 h-10 w-fit px-5 rounded-md overflow-hidden text-white font-light"
                            onClick={onBtnClick}
                        >
                            Chỉnh sửa
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleCard;
