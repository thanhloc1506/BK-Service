import React from "react";
import serviceImg from "../../assets/service/service.png";
import rating from "../../assets/service/rating.png";
import { useNavigate } from "react-router-dom";
import {
  getServiceById,
  selectService,
  unFollow,
} from "../../redux/slices/service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Service } from "../../apis/common/Service";

interface ICategory {
  isLoveService?: boolean;
  isEnterprise?: boolean;
  service: Service;
}

const SingleCard: React.FC<ICategory> = ({
  isLoveService,
  isEnterprise,
  service,
}: ICategory) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const services = useSelector(
    (state: RootState) => state.search.dataSearch?.services
  );

  const onClickUnFollow = async () => {
    await dispatch(unFollow(service._id));
  };

  const goToSingleService = async () => {
    await navigate(`/detailService/${service._id}`);
  };
  return (
    <>
      <div className="w-72 h-96 bg-white border-2 border-blue-200 rounded">
        <div className="flex justify-center">
          <img
            src={
              (service.images &&
                service.images?.length > 0 &&
                service.images[0].url) ||
              serviceImg
            }
            alt="service"
            className="w-72 h-40 p-3"
          />
        </div>
        <div className="grid grid-cols-6">
          <div className="col-span-4 font-bold px-4">
            {service.name && service.name.length > 20
              ? service.name.slice(0, 17) + "..."
              : service.name}
          </div>
          <div className="flex justify-end p-1 mr-2 col-span-2">
            <p className="px-2 bg-blue-200 rounded-2xl overflow-hidden text-blue-600 text-xs w-fit h-fit">
              {service.category?.category}
            </p>
          </div>
        </div>
        <div className="px-4 py-2">
          <p className="text-sm font-light">
            The Receipe for its success lies in xd's long-term-forcused strategy
            on ...
          </p>
        </div>
        <div className="px-4">
          <img src={rating} alt="rating" />
        </div>
        <div className="border-b-2 border-gray-100 mt-3"></div>
        <div className="border-b-2 border-gray-100 mt-12"></div>
        {isLoveService ? (
          <div className="grid grid-cols-2 mt-3">
            <div className="flex justify-center">
              <button
                className="text-white bg-blue-solid px-3 py-2 rounded-lg"
                onClick={goToSingleService}
              >
                Xem chi tiết
              </button>
            </div>
            <div className="flex justify-center">
              <button
                className="text-white bg-orange-400 px-3 py-2 rounded-lg"
                onClick={onClickUnFollow}
              >
                Hủy theo dõi
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 h-16">
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
            {isEnterprise ? (
              <div className="col-span-2 flex justify-center mt-2">
                <button
                  className="bg-blue-500 h-10 w-fit px-5 rounded-md overflow-hidden text-white font-light"
                  onClick={() => navigate("/detailService")}
                >
                  Chỉnh sửa
                </button>
              </div>
            ) : (
              <div className="col-span-2 flex justify-center mt-2">
                <button
                  className="bg-blue-500 h-10 w-fit px-5 rounded-md overflow-hidden text-white font-light"
                  onClick={goToSingleService}
                >
                  Truy cập
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SingleCard;
