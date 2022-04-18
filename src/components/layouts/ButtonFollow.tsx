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
    <div className="mt-6">
      {followLoading ? (
        <LocalLoading />
      ) : (
        <button
          className={
            isFollow
              ? "text-red-500  bg-red-100 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
              : "text-green-500  bg-green-100 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
          }
          onClick={isFollow ? onClickUnFollow : onClickFollow}
        >
          {isFollow ? (
            <svg
              className="h-6 w-6 text-red-500 mt-0.5"
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
              className="h-6 w-6 text-green-500 mt-0.5"
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
          <p className="ml-2">{isFollow ? "Hủy theo dõi" : "Theo dõi"}</p>
        </button>
      )}
    </div>
  );
};

export default ButtonFollow;
