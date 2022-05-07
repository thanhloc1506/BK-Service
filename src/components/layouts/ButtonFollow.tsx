import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followService, unFollow } from "../../redux/slices/service";
import { RootState } from "../../redux/store";
import LocalLoading from "./LocalLoading";

interface IFollow {
  serviceId: string;
}

const ButtonFollow: React.FC<IFollow> = ({ serviceId }: IFollow) => {
  const dispatch = useDispatch();

  const onClickFollow = async () => {
    await dispatch(followService(serviceId));
  };

  const onClickUnFollow = async () => {
    await dispatch(unFollow(serviceId));
  };

  const followLoading = useSelector(
    (state: RootState) => state.service.followLoading
  );

  const isFollow = useSelector((state: RootState) => state.service.isFollow);
  return (
    <div className="mt-3">
      {followLoading ? (
        <LocalLoading />
      ) : (
        <button
          className={
            isFollow
              ? "text-red-500  bg-red-100 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg 2xl:text-sm xl:text-xs 2xl:px-3 2xl:py-2 xl:px-1.5 xl:py-1 lg:px-1 lg:py-0.5 text-center inline-flex items-center mr-2 mb-2"
              : "text-green-500  bg-green-100 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg 2xl:text-sm xl:text-xs 2xl:px-3 2xl:py-2 xl:px-1.5 xl:py-1 lg:px-1 lg:py-0.5 text-center inline-flex items-center mr-2 mb-2"
          }
          onClick={isFollow ? onClickUnFollow : onClickFollow}
        >
          {isFollow ? (
            <svg
              className="2xl:h-5 2xl:w-5 xl:w-4 xl:h-4 lg:w-3 lg:h-3 text-red-500 mt-0.5"
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
              <line x1="18" y1="6" x2="6" y2="18" />{" "}
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              className="2xl:h-5 2xl:w-5 xl:w-4 xl:h-4 lg:h-3 lg:w-3 text-green-500 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          <p className="ml-2 2xl:text-lg xl:text-sm lg:text-xs">
            {isFollow ? "Hủy theo dõi" : "Theo dõi"}
          </p>
        </button>
      )}
    </div>
  );
};

export default ButtonFollow;
