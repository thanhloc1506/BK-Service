import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_AVATAR } from "../../../constants/common";
// import { toggleLikeComment } from "../../../redux/slices/service";
import { RootState } from "../../../redux/store";

interface IPost {
  avatar: string;
  fullName: string;
  time: string;
  rating: number;
  content: string;
  like: any[];
  serviceName?: string;
  title: string;
  images: any;
  id: string;
  numOfUserLiked: number;
}

const Post: React.FC<IPost> = ({
  avatar,
  fullName,
  time,
  rating,
  content,
  like,
  serviceName,
  title,
  images,
  id,
  numOfUserLiked,
}: IPost) => {
  const [imageIndex, setIndex] = useState(0);
  const [image, setImage] = useState(images[0]?.url);
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);

  const [isLike, setIsLike] = useState(false);
  // const [isLike, setIsLike] = useState(
  //   Array.isArray(like)
  //     ? like.filter((like: any) => like === userState.user?._id).length > 0
  //     : false
  // );
  // const onClickLike = () => {
  //   dispatch(toggleLikeComment(id));
  //   if (userState.isAuthenticated) {
  //     if (isLike) {
  //       if (Number.isInteger(numOfLike)) setNumOfLike(numOfLike - 1);
  //       else setTmpLike(0);
  //     } else {
  //       if (Number.isInteger(numOfLike)) setNumOfLike(numOfLike + 1);
  //       else setTmpLike(1);
  //     }
  //     setIsLike(!isLike);
  //   }
  // };

  const [tmpLike, setTmpLike] = useState(0);

  const [numOfLike, setNumOfLike] = useState(numOfUserLiked);

  return (
    <>
      <div className="w-full h-fit pr-20 flex justify-center">
        <div className="w-full shadow-lg pt-3  border-2 border-gray-100 bg-white">
          <div className="grid grid-cols-2 border-b-2 border-b-gray-100 pb-2">
            <span className="flex ml-2.5">
              <div className="col-span-1 rounded-full w-12 h-12 overflow-hidden ring-2 ring-white">
                <img
                  src={
                    userState.enterprise?.avatar
                      ? userState.enterprise.avatar.url
                      : DEFAULT_AVATAR
                  }
                  className={"w-full h-full p-1 rounded-full"}
                />
              </div>
              <div>
                <p className="ml-2 text-sm font-semibold">{fullName}</p>
                <p className="ml-2 mt-1.5 text-light text-sm text-gray-500">
                  {time}
                </p>
              </div>
            </span>
            <div className="flex justify-end mr-5">
              <div
                className={
                  rating > 8
                    ? "2xl:w-10 2xl:h-10 xl:w-8 xl:h-8 rounded-full bg-blue-400 flex justify-center"
                    : rating > 5
                    ? "2xl:w-10 2xl:h-10 xl:w-8 xl:h-8 rounded-full bg-yellow-400 flex justify-center"
                    : "2xl:w-10 2xl:h-10 xl:w-8 xl:h-8 rounded-full bg-red-400 flex justify-center"
                }
              >
                <p className="flex items-center 2xl:text-lg xl:text-sm text-white">
                  {rating}
                </p>
              </div>
            </div>
          </div>
          <div className="border-b-2 border-b-gray-100">
            <div className="m-4 font-bold 2xl:text-lg xl:text-sm flex justify-start">
              <p>{serviceName}</p>
              <p className="mx-2">-</p>
              <p>{title}</p>
            </div>
            <div className="flex justify-start m-4">
              <p className="font-light pr-5 2xl:text-lg xl:text-sm">
                {content !== "undefined" ? content : ""}
              </p>
            </div>
            <div className="flex justify-start pl-3">
              {images.length > 0 && (
                <img
                  className="2xl:max-h-80 2xl:max-w-6xl xl:max-h-64 xl:max-w-5xl"
                  src={image}
                  alt="image"
                  onClick={() => {}}
                />
              )}
            </div>
            <div className="flex justify-start my-3">
              {images.length > 0 &&
                images.map((srcImage: any, index: number) => (
                  <div className="pl-3" key={index}>
                    <img
                      className="max-h-12 max-w-40 z-30 cursor-pointer"
                      src={srcImage.url}
                      alt="thumb"
                      onClick={() => setImage(images[index].url)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="py-3 ml-2.5">
            <div className="flex justify-start">
              <button onClick={() => {}}>
                {isLike ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 text-gray-700"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
                  </svg>
                )}
              </button>
              <p className="ml-1 mt-0.5 2xl:text-lg xl:text-sm">
                {Number.isInteger(numOfLike) ? numOfLike : tmpLike} Thích
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
