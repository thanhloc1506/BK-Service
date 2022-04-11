import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLikeComment } from "../../../redux/slices/service";

interface IPost {
  avatar: string;
  fullName: string;
  time: string;
  rating: number;
  content: string;
  like: boolean;
  serviceName?: string;
  title: string;
  images: any;
  id: string;
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
}: IPost) => {
  const [imageIndex, setIndex] = useState(0);
  const [image, setImage] = useState(images[0]?.url);
  const dispatch = useDispatch();

  const [isLike, setIsLike] = useState(like);
  const onClickLike = () => {
    dispatch(toggleLikeComment(id));
    setIsLike(!isLike);
  };

  return (
    <>
      <div className="w-full h-fit px-20 flex justify-center">
        <div className="w-full shadow-lg pt-3  border-2 border-gray-100">
          <div className="grid grid-cols-2 border-b-2 border-b-gray-100 pb-2">
            <span className="flex ml-5">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
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
                    ? "w-12 h-12 rounded-full bg-blue-400 flex justify-center"
                    : rating > 5
                    ? "w-12 h-12 rounded-full bg-yellow-400 flex justify-center"
                    : "w-12 h-12 rounded-full bg-red-400 flex justify-center"
                }
              >
                <p className="pt-3 text-white">{rating}</p>
              </div>
            </div>
          </div>
          <div className="border-b-2 border-b-gray-100">
            <div className="my-5 ml-5 font-bold text-lg flex justify-start">
              <p>{serviceName}</p>
              <p className="mx-2">-</p>
              <p>{title}</p>
            </div>
            <div className="flex justify-start ml-5 mt-2 pb-5">
              <p className="font-light pr-5">
                {content !== "undefined" ? content : ""}
              </p>
            </div>
            <div className="flex justify-start pl-3">
              {images.length > 0 && (
                <img
                  className="max-h-80 max-w-6xl"
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
                      className="max-h-16 max-w-48 z-30 cursor-pointer"
                      src={srcImage.url}
                      alt="thumb"
                      onClick={() => setImage(images[index].url)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="py-3 ml-5">
            <div className="flex justify-start">
              <button onClick={onClickLike}>
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
              <p className="ml-2 mt-0.5">Thích</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
