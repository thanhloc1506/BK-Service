import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import service from "../../../assets/service/service.png";
import measure from "../../../assets/service/measure.png";
import rating from "../../../assets/service/rating.png";
import RCSlider from "../../layouts/RCSlider";
import { json } from "stream/consumers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { comment } from "../../../redux/slices/service";
import { toggleModalLogin } from "../../../redux/slices/auth";
import { Service } from "../../../apis/common/Service";
import { getAddressContent } from "../../../utils/getAddressContent";
import RatingStar from "../../layouts/RatingStar";
import * as Yup from "yup";

interface ICommentModal {
  score: any;
  service: Service;
  comments: any;
}
const tieuchi = ["Tin cậy", "Đáp ứng", "Đảm bảo", "Vật chất", "Thiện cảm"];

const CommentModal: React.FC<ICommentModal> = ({
  score,
  service,
  comments,
}) => {
  const { name, enterprise } = service;
  const serviceState = useSelector((state: RootState) => state.service);
  const userState = useSelector((state: RootState) => state.user);

  const cancelButtonRef = useRef(null);

  const [showModalComment, setShowModalComment] = useState(false);
  const [Image, setImage] = useState(false);
  const [Rating, setRating] = useState(false);
  const [Share, setShare] = useState(true);

  const onClickImage = () => {
    setImage(true);
    setRating(false);
    setShare(false);
  };

  const onClickRating = () => {
    setImage(false);
    setRating(true);
    setShare(false);
  };

  const onClickShare = () => {
    setImage(false);
    setRating(false);
    setShare(true);
  };

  const [score_1, setScore_1] = useState(7);
  const [score_2, setScore_2] = useState(7);
  const [score_3, setScore_3] = useState(7);
  const [score_4, setScore_4] = useState(7);
  const [score_5, setScore_5] = useState(7);

  const [selectedImages, setSelectedImage] = useState<any[]>([]);
  const [preview, setPreview] = useState([]);

  const [imgService, setImageService] = useState(
    serviceState.singleService?.images &&
      serviceState.singleService?.images?.length > 0
      ? serviceState.singleService?.images[0].url
      : "https://paroda.vn/media/2021/08/customer-service.jpg"
  );

  const [addressText, setAddressText] = useState("");

  useEffect(() => {
    if (!selectedImages[0]) {
      setPreview([]);
      return;
    }

    let objectUrls: any = [];
    let idx = 0;
    for (const selectedImage of selectedImages) {
      objectUrls[idx] = URL.createObjectURL(selectedImage);
      idx++;
    }

    setPreview(objectUrls as any);

    let result = [];
    idx = 0;
    for (const objectUrl of objectUrls) {
      result[idx] = () => URL.revokeObjectURL(objectUrl);
      idx++;
    }
    return result[0];
  }, [selectedImages]);

  const imageChange = (e: any) => {
    if (!e.target.files || e.target.files.lenght === 0) {
      console.log(e.target.files[0]);
      setSelectedImage([]);
      return;
    }

    setSelectedImage(e.target.files);
  };

  const removeImage = () => {
    setSelectedImage([]);
  };

  const deletePreviewImage = (index: number) => {
    // console.log(selectedImages[index]);
    // let newPreviewImages = [];
    // let idx = 0;
    // for (const image of selectedImages) {
    //   if (idx !== index) {
    //     newPreviewImages[idx] = image;
    //     idx++;
    //   }
    // }
    // if (selectedImages.length - 1 == newPreviewImages.length)
    //   setSelectedImage(newPreviewImages);
  };

  useEffect(() => {
    getAddressContent(service?.address).then((res) =>
      setAddressText(res || "")
    );
  }, [service?.address]);

  const dispatch = useDispatch();

  const onPostComment = (values: any, { resetForm }: any) => {
    const formData = new FormData();
    const score = JSON.stringify([score_1, score_2, score_3, score_4, score_5]);
    formData.append("title", values.title);
    formData.append("content", values.content);
    for (const image of selectedImages) {
      formData.append("images", image as any);
    }
    formData.append("score", score);
    formData.append("serviceId", serviceState.serviceId as string);
    dispatch(comment(formData));
    resetForm();
    removeImage();
    setScore_1(7);
    setScore_2(7);
    setScore_3(7);
    setScore_4(7);
    setScore_5(7);
    setShowModalComment(false);
  };

  const onClickComment = () => {
    if (userState.isAuthenticated) setShowModalComment(true);
    else dispatch(toggleModalLogin(userState.showLoginForm));
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(30, "*Tiêu đề không được vượt quá 30 ký tự"),
    content: Yup.string().max(
      1000,
      "*Nội dung đánh giá không được vượt quá 1000 ký tự"
    ),
  });

  return (
    <>
      <button
        onClick={onClickComment}
        className="bg-blue-solid w-[22vw] 2xl:py-2 xl:py-1 lg:py-1 rounded-md text-white xl:text-lg lg:text-sm outline-none hover:text-gray-700"
      >
        Viết bình luận
      </button>
      <div>
        <Transition.Root show={showModalComment} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            onClose={() => {
              setShowModalComment(false);
              removeImage();
            }}
          >
            <div className="flex 2xl:mt-16 xl:mt-10 lg:mt-6 justify-center text-center h-fit">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>
              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all duration-500 ease-in-out 2xl:w-1100 2xl:h-650 xl:w-[940px] xl:h-[540px] lg:h-[440px] lg:w-[840px]">
                  <div className="bg-gray-light">
                    <div className="2xl:h-650 xl:h-[520px] lg:h-[430px] m:flex sm:items-start">
                      <div className="w-full h-full border-black">
                        <div className="2xl:p-4 xl:p-3 lg:p-2 border-b-2 border-b-gray-300">
                          <p className="2xl:text-xl xl:text-lg lg:text-sm">
                            Viết bình luận:
                          </p>
                        </div>
                        <div className="grid grid-cols-7">
                          <div className="col-span-2 2xl:p-4 xl:p-3 lg:p-2">
                            <div className="flex justify-center">
                              <img
                                className="w-full 2xl:h-40 xl:h-32 lg:h-28"
                                src={imgService as string}
                                alt="Service"
                              />
                            </div>
                            <div className="flex 2xl:mt-5 xl:mt-3 lg:mt-2">
                              <div className="bg-blue-400 rounded-full overflow-hidden 2xl:h-10 2xl:w-10 xl:w-9 xl:h-9 lg:w-8 lg:h-8">
                                <p className="flex justify-center 2xl:mt-2.5 xl:mt-2 lg:mt-1.5 2xl:text-sm xl:text-xs lg:text-[10px] font-semibold text-white">
                                  {score &&
                                    score.length >= 6 &&
                                    score[5].toFixed(1)}
                                </p>
                              </div>
                              <div className="ml-3 2xl:mt-0 xl:mt-0 lg:mt-0">
                                <div className="flex">
                                  <p className="font-semibold 2xl:text-sm xl-text-sm lg:text-xs">
                                    {enterprise?.fullName
                                      ? enterprise.fullName + "-"
                                      : ""}
                                    {name}
                                  </p>
                                </div>
                                <div className="mt-1.5">
                                  <p className="text-gray-600 2xl:text-xs xl:text-[10px] lg:text-[9px] font-semibold">
                                    {/* 268 Ly Thuong Kiet, Quan 10, TP.HCM */}
                                    {addressText}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="2xl:mt-6 xl:mt-3 lg:mt-2">
                              <div className="border-2 border-gray-300 w-full 2xl:h-[18.5rem] xl:h-64  bg-white">
                                <div className="2xl:p-1.5 xl:p-1 lg:p-0.5 flex justify-center">
                                  <p className="font-medium 2xl:text-lg xl:text-sm lg:text-xs">
                                    {comments.length} Bình luận
                                  </p>
                                </div>
                                <div className="">
                                  <div className="grid grid-cols-4 2xl:gap-2 xl:gap-0 lg:gap-0">
                                    <div className="mt-1">
                                      <p className="2xl:text-sm xl:text-xs lg:text-[12px] font-medium flex justify-center">
                                        {
                                          comments.filter(
                                            (comment: any) =>
                                              comment.rating >= 9
                                          ).length
                                        }
                                      </p>
                                      <p className="mt-1 xl:text-xs lg:text-[12px] flex justify-center">
                                        Tuyệt vời
                                      </p>
                                    </div>
                                    <div className="mt-1">
                                      <p className="2xl:text-sm xl:text-xs lg:text-[12px] font-medium flex justify-center">
                                        {
                                          comments.filter(
                                            (comment: any) =>
                                              comment.rating >= 7.5 &&
                                              comment.rating < 9
                                          ).length
                                        }
                                      </p>
                                      <p className="mt-1 xl:text-xs lg:text-[12px] flex justify-center">
                                        Tốt
                                      </p>
                                    </div>
                                    <div className="mt-1">
                                      <p className="2xl:text-sm xl:text-xs lg:text-[12px] font-medium flex justify-center">
                                        {
                                          comments.filter(
                                            (comment: any) =>
                                              comment.rating >= 4.5 &&
                                              comment.rating < 7.5
                                          ).length
                                        }
                                      </p>
                                      <p className="xl:mt-1 lg:mt-1.5 xl:text-[11px] lg:text-[8.5px] xl:font-light lg:font-semibold flex justify-center">
                                        Bình thường
                                      </p>
                                    </div>
                                    <div className="mt-1">
                                      <p className="2xl:text-sm xl:text-xs lg:text-[12px] font-medium flex justify-center">
                                        {
                                          comments.filter(
                                            (comment: any) =>
                                              comment.rating >= 0 &&
                                              comment.rating < 4.5
                                          ).length
                                        }
                                      </p>
                                      <p className="mt-1 xl:text-xs lg:text-[12px] flex justify-center">
                                        Kém
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="2xl:mt-3 xl:mt-2 lg:mt-1">
                                  <div className="grid grid-cols-3">
                                    <div>
                                      <p className="2xl:text-sm xl:text-xs lg:text-[12px] mt-1 ml-2">
                                        Đánh giá
                                      </p>
                                    </div>
                                    <div className="col-span-2 2xl:mt-0 xl:mt-[-3px]">
                                      <img src={measure} alt="Measure" />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4">
                                    <div>
                                      <p className="2xl:text-xs xl:text-[11px] lg:text-[10px] mt-1 ml-2">
                                        {tieuchi[0]}
                                      </p>
                                    </div>
                                    <div className="col-span-2 flex justify-center ml-2">
                                      <RatingStar
                                        rating={
                                          score && score.length >= 5
                                            ? score[0].toFixed(1)
                                            : 5
                                        }
                                      />
                                    </div>
                                    <div className="flex justify-center">
                                      <p className="xl:text-sm lg:text-xs">
                                        {score && score.length >= 5
                                          ? score[0].toFixed(1)
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 mt-1">
                                    <div>
                                      <p className="2xl:text-xs xl:text-[11px] lg:text-[10px] mt-1 ml-2">
                                        {tieuchi[1]}
                                      </p>
                                    </div>
                                    <div className="col-span-2 flex justify-center ml-2 mt-1">
                                      <RatingStar
                                        rating={
                                          score && score.length >= 5
                                            ? score[0].toFixed(1)
                                            : 5
                                        }
                                      />
                                    </div>
                                    <div className="flex justify-center">
                                      <p className="xl:text-sm lg:text-xs">
                                        {score && score.length >= 5
                                          ? score[1].toFixed(1)
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 mt-1">
                                    <div>
                                      <p className="2xl:text-xs xl:text-[11px] lg:text-[10px] mt-1 ml-2">
                                        {tieuchi[2]}
                                      </p>
                                    </div>
                                    <div className="col-span-2 flex justify-center ml-2 mt-1">
                                      <RatingStar
                                        rating={
                                          score && score.length >= 5
                                            ? score[0].toFixed(1)
                                            : 5
                                        }
                                      />
                                    </div>
                                    <div className="flex justify-center">
                                      <p className="xl:text-sm lg:text-xs">
                                        {score && score.length >= 5
                                          ? score[2].toFixed(1)
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 mt-1">
                                    <div>
                                      <p className="2xl:text-xs xl:text-[11px] lg:text-[10px] mt-1 ml-2">
                                        {tieuchi[3]}
                                      </p>
                                    </div>
                                    <div className="col-span-2 flex justify-center ml-2 mt-1">
                                      <RatingStar
                                        rating={
                                          score && score.length >= 5
                                            ? score[0].toFixed(1)
                                            : 5
                                        }
                                      />
                                    </div>
                                    <div className="flex justify-center">
                                      <p className="xl:text-sm lg:text-xs">
                                        {score && score.length >= 5
                                          ? score[3].toFixed(1)
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 mt-1">
                                  <div>
                                    <p className="2xl:text-xs xl:text-[11px] lg:text-[10px] mt-1 ml-2">
                                      {tieuchi[4]}
                                    </p>
                                  </div>
                                  <div className="col-span-2 flex justify-center ml-2 mt-1">
                                    <RatingStar
                                      rating={
                                        score && score.length >= 5
                                          ? score[0].toFixed(1)
                                          : 5
                                      }
                                    />
                                  </div>
                                  <div className="flex justify-center">
                                    <p className="xl:text-sm lg:text-xs">
                                      {score && score.length >= 5
                                        ? score[4].toFixed(1)
                                        : ""}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-5 p-4 pl-0">
                            <Formik
                              initialValues={{
                                title: "",
                                content: "",
                                images: "",
                              }}
                              onSubmit={onPostComment}
                              validationSchema={validationSchema}
                            >
                              {({
                                touched,
                                errors,
                                handleChange,
                                handleBlur,
                                setFieldValue,
                              }) => (
                                <Form>
                                  {Share ? (
                                    <>
                                      {touched["title"] && errors["title"] && (
                                        <p className="2xl:text-sm xl:text-xs lg:text-[12px] text-red-500 text-center flex justify-start">
                                          {errors["title"]}
                                        </p>
                                      )}
                                      <div className="2xl:h-12 xl:h-8 lg:h-7 w-full">
                                        <Field
                                          type="text"
                                          className="w-full h-full p-3 focus:outline-none 2xl:text-lg xl:text-sm lg:text-xs"
                                          placeholder="Nhập tiêu đề: ví dụ (Dịch vụ tuyệt vời)"
                                          id="title"
                                          name="title"
                                          required
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </div>
                                      {touched["content"] &&
                                        errors["content"] && (
                                          <p className="2xl:text-sm xl:text-xs lg:text-[12px] text-red-500 text-center flex justify-start">
                                            {errors["content"]}
                                          </p>
                                        )}
                                      <div className="w-full">
                                        <Field
                                          component="textarea"
                                          className="mt-0.5 px-3 py-1.5 w-full block 2xl:pb-96 xl:pb-80 lg:pb-[15.7rem] text-gray-700 bg-clip-padding transition ease-in-out m-0 focus:text-gray-700 focus:outline-none resize-none 2xl:text-lg xl:text-sm lg:text-xs"
                                          id="content"
                                          name="content"
                                          required
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          placeholder="Nhập nội dung bình luận"
                                        />
                                      </div>
                                    </>
                                  ) : null}

                                  {Rating ? (
                                    <>
                                      <div className="2xl:h-122 xl:h-[25rem] lg:h-[20rem] w-full bg-white">
                                        <div className="px-5 2xl:pt-14 xl:pt-10 lg:pt-8 grid grid-cols-10">
                                          <div>
                                            <p className="2xl:text-[1rem] xl:text-sm lg:text-xs font-semibold">
                                              Đánh giá
                                            </p>
                                          </div>
                                        </div>
                                        <div>
                                          <RCSlider
                                            title={tieuchi[0]}
                                            score={score_1}
                                            setScore={setScore_1}
                                          />
                                        </div>
                                        <div>
                                          <RCSlider
                                            title={tieuchi[1]}
                                            score={score_2}
                                            setScore={setScore_2}
                                          />
                                        </div>
                                        <div>
                                          <RCSlider
                                            title={tieuchi[2]}
                                            score={score_3}
                                            setScore={setScore_3}
                                          />
                                        </div>
                                        <div>
                                          <RCSlider
                                            title={tieuchi[3]}
                                            score={score_4}
                                            setScore={setScore_4}
                                          />
                                        </div>
                                        <div>
                                          <RCSlider
                                            title={tieuchi[4]}
                                            score={score_5}
                                            setScore={setScore_5}
                                          />
                                        </div>
                                      </div>
                                    </>
                                  ) : null}

                                  {Image ? (
                                    <>
                                      <div className="2xl:h-122 xl:h-[25rem] lg:h-[20rem] w-full bg-white">
                                        <input
                                          type="file"
                                          className="focus:outline-none 2xl:text-lg xl:text-sm lg:text-xs w-fit h-fit cursor-pointer 2xl:p-3 xl:p-2 lg:p-1.5"
                                          id="image"
                                          name="images"
                                          onChange={imageChange}
                                          multiple
                                        />
                                        <div className="flex">
                                          {selectedImages.length > 0 &&
                                            preview.map(
                                              (srcImage: any, index) => (
                                                <div
                                                  className="pl-3 z-20"
                                                  key={index}
                                                  onClick={() =>
                                                    deletePreviewImage(index)
                                                  }
                                                >
                                                  <img
                                                    className="max-h-40 max-w-96 z-30"
                                                    src={srcImage}
                                                    alt="thumb"
                                                  />
                                                </div>
                                              )
                                            )}
                                        </div>
                                      </div>
                                    </>
                                  ) : null}

                                  <div className="grid grid-cols-4 gap-0 h-11">
                                    <div
                                      className={`flex justify-center items-center cursor-pointer ${
                                        Share === true
                                          ? "bg-slate-400 hover:bg-slate-400"
                                          : "bg-gray-medium hover:bg-slate-200"
                                      }`}
                                      onClick={onClickShare}
                                    >
                                      <div className="">
                                        <svg
                                          className="h-6 w-6"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                          />
                                        </svg>
                                      </div>
                                      <p className="pl-1.5 2xl:text-lg xl:text-sm lg:text-sm">
                                        Bình luận
                                      </p>
                                    </div>
                                    <div
                                      className={`flex justify-center items-center cursor-pointer ${
                                        Rating === true
                                          ? "bg-slate-400 hover:bg-slate-400"
                                          : "bg-gray-medium hover:bg-slate-200"
                                      }`}
                                      onClick={onClickRating}
                                    >
                                      <div className="">
                                        <svg
                                          className="h-6 w-6"
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
                                          <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                          />{" "}
                                          <path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                        </svg>
                                      </div>
                                      <p className="pl-1.5 2xl:text-lg xl:text-sm lg:text-sm">
                                        Đánh giá
                                      </p>
                                    </div>
                                    <div
                                      className={`flex justify-center items-center cursor-pointer ${
                                        Image === true
                                          ? "bg-slate-400 hover:bg-slate-400"
                                          : "bg-gray-medium hover:bg-slate-200"
                                      }`}
                                      onClick={onClickImage}
                                    >
                                      <div className="">
                                        <svg
                                          className="h-6 w-6"
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
                                      </div>
                                      <p className="pl-1.5 2xl:text-lg xl:text-sm lg:text-sm">
                                        Hình ảnh
                                      </p>
                                    </div>
                                    <div className="flex justify-center bg-gray-medium cursor-pointer">
                                      <button className="bg-green-500 text-white px-5 rounded-sm ml-3 my-1.5 2xl:text-lg xl:text-sm hover:text-gray-700">
                                        Hoàn tất
                                      </button>
                                    </div>
                                  </div>
                                </Form>
                              )}
                            </Formik>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
};

export default CommentModal;
