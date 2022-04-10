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

const CommentModal: React.FC = () => {
  const serviceId = useSelector((state: RootState) => state.service.serviceId);
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

  const [selectedImages, setSelectedImage] = useState([]);
  const [preview, setPreview] = useState([]);

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
    formData.append("serviceId", serviceId as string);
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

  return (
    <>
      <button
        onClick={() => setShowModalComment(true)}
        className="bg-blue-500 w-full py-3 rounded-md text-white text-xl"
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
            <div className="flex mt-28 justify-center text-center min-h-screen">
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
                <div className="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all duration-500 ease-in-out  w-1100 h-630">
                  <div className="bg-gray-light">
                    <div className="h-650 m:flex sm:items-start">
                      <div className="w-full h-full border-black">
                        <div className="p-4 border-b-2 border-b-gray-300">
                          <p className="">Viết bình luận:</p>
                        </div>
                        <div className="grid grid-cols-7">
                          <div className="col-span-2 p-4">
                            <div className="flex justify-center">
                              <img
                                className="w-full h-40"
                                src={service}
                                alt="Service"
                              />
                            </div>
                            <div className="flex mt-5">
                              <div className="bg-blue-400 rounded-full overflow-hidden h-12 w-12">
                                <p className="flex justify-center mt-2.5 text-lg font-bold text-white">
                                  9.2
                                </p>
                              </div>
                              <div className="ml-3 mt-1">
                                <div className="flex">
                                  <p className="font-semibold text-sm">
                                    Nguyen Van A
                                  </p>
                                  <p className="font-semibold text-sm mx-2">
                                    -
                                  </p>
                                  <p className="font-semibold text-sm">
                                    Sua chua dien ...
                                  </p>
                                </div>
                                <div className="mt-1.5">
                                  <p className="text-gray-600 text-xs font-semibold">
                                    268 Ly Thuong Kiet, Quan 10, TP.HCM
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-6">
                              <div className="border-2 border-gray-300 w-full h-72 bg-white">
                                <div className="p-1.5 flex justify-center">
                                  <p className="font-medium text-lg">
                                    122 Bình luận
                                  </p>
                                </div>
                                <div className="mt-3">
                                  <div className="grid grid-cols-4 gap-2">
                                    <div className="mt-1">
                                      <p className="text-sm font-medium flex justify-center">
                                        78
                                      </p>
                                      <p className="mt-1 text-xs flex justify-center">
                                        Tuyệt vời
                                      </p>
                                    </div>
                                    <div className="mt-1">
                                      <p className="text-sm font-medium flex justify-center">
                                        22
                                      </p>
                                      <p className="mt-1 text-xs flex justify-center">
                                        Tốt
                                      </p>
                                    </div>
                                    <div className="mt-1">
                                      <p className="text-sm font-medium flex justify-center">
                                        22
                                      </p>
                                      <p className="mt-1 text-xs flex justify-center">
                                        Trung bình
                                      </p>
                                    </div>
                                    <div className="mt-1">
                                      <p className="text-sm font-medium flex justify-center">
                                        0
                                      </p>
                                      <p className="mt-1 text-xs flex justify-center">
                                        Kém
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <div className="grid grid-cols-3">
                                    <div>
                                      <p className="text-sm mt-1 ml-2">
                                        Đánh giá
                                      </p>
                                    </div>
                                    <div className="col-span-2">
                                      <img src={measure} alt="Measure" />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4">
                                    <div>
                                      <p className="text-xs mt-1 ml-2">
                                        Tieu chi 1
                                      </p>
                                    </div>
                                    <div className="col-span-2 flex justify-center ml-2 mt-1">
                                      <img
                                        src={rating}
                                        alt="rating"
                                        className="w-2/3 h-3"
                                      />
                                    </div>
                                    <div className="flex justify-center">
                                      <p className="text-sm">9.2</p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 mt-1">
                                    <div>
                                      <p className="text-xs mt-1 ml-2">
                                        Tieu chi 2
                                      </p>
                                    </div>
                                    <div className="col-span-2 flex justify-center ml-2 mt-1">
                                      <img
                                        src={rating}
                                        alt="rating"
                                        className="w-2/3 h-3"
                                      />
                                    </div>
                                    <div className="flex justify-center">
                                      <p className="text-sm">9.2</p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 mt-1">
                                    <div>
                                      <p className="text-xs mt-1 ml-2">
                                        Tieu chi 3
                                      </p>
                                    </div>
                                    <div className="col-span-2 flex justify-center ml-2 mt-1">
                                      <img
                                        src={rating}
                                        alt="rating"
                                        className="w-2/3 h-3"
                                      />
                                    </div>
                                    <div className="flex justify-center">
                                      <p className="text-sm">9.2</p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 mt-1">
                                    <div>
                                      <p className="text-xs mt-1 ml-2">
                                        Tieu chi 4
                                      </p>
                                    </div>
                                    <div className="col-span-2 flex justify-center ml-2 mt-1">
                                      <img
                                        src={rating}
                                        alt="rating"
                                        className="w-2/3 h-3"
                                      />
                                    </div>
                                    <div className="flex justify-center">
                                      <p className="text-sm">9.2</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 mt-1">
                                  <div>
                                    <p className="text-xs mt-1 ml-2">
                                      Tieu chi 5
                                    </p>
                                  </div>
                                  <div className="col-span-2 flex justify-center ml-2 mt-1">
                                    <img
                                      src={rating}
                                      alt="rating"
                                      className="w-2/3 h-3"
                                    />
                                  </div>
                                  <div className="flex justify-center">
                                    <p className="text-sm">9.2</p>
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
                            >
                              {({
                                errors,
                                handleChange,
                                handleBlur,
                                setFieldValue,
                              }) => (
                                <Form>
                                  {Share ? (
                                    <>
                                      <div className="h-12 w-full">
                                        <Field
                                          type="text"
                                          className="w-full h-full p-3 focus:outline-none"
                                          placeholder="Nhập tiêu đề: ví dụ (Dịch vụ tuyệt vời)"
                                          id="title"
                                          name="title"
                                          required
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </div>
                                      <div className="w-full">
                                        <textarea
                                          className="mt-0.5 px-3 py-1.5 w-full text-lg block pb-96 text-gray-700 bg-clip-padding transition ease-in-out m-0 focus:text-gray-700 focus:outline-none resize-none"
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
                                      <div className="h-122 w-full bg-white">
                                        <div className="px-5 pt-14 grid grid-cols-10">
                                          <div>
                                            <p>Đánh giá</p>
                                          </div>
                                        </div>
                                        <div>
                                          <RCSlider
                                            title="Tieu chi 1"
                                            score={score_1}
                                            setScore={setScore_1}
                                          />
                                        </div>
                                        <div>
                                          <RCSlider
                                            title="Tieu chi 2"
                                            score={score_2}
                                            setScore={setScore_2}
                                          />
                                        </div>
                                        <div>
                                          <RCSlider
                                            title="Tieu chi 3"
                                            score={score_3}
                                            setScore={setScore_3}
                                          />
                                        </div>
                                        <div>
                                          <RCSlider
                                            title="Tieu chi 4"
                                            score={score_4}
                                            setScore={setScore_4}
                                          />
                                        </div>
                                        <div>
                                          <RCSlider
                                            title="Tieu chi 5"
                                            score={score_5}
                                            setScore={setScore_5}
                                          />
                                        </div>
                                      </div>
                                    </>
                                  ) : null}

                                  {Image ? (
                                    <>
                                      <div className="h-122 w-full bg-white">
                                        <input
                                          type="file"
                                          className="w-80 h-20 p-3"
                                          id="image"
                                          name="images"
                                          onChange={imageChange}
                                          multiple
                                        />
                                        <div className="flex">
                                          {selectedImages !== [] &&
                                            preview.map(
                                              (srcImage: any, index) => (
                                                <div
                                                  className="pl-3 z-20"
                                                  key={index}
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
                                      className={`flex justify-center ${
                                        Share === true
                                          ? "bg-slate-400"
                                          : "bg-gray-medium"
                                      }`}
                                      onClick={onClickShare}
                                    >
                                      <div className="mt-2.5">
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
                                      <p className="pt-2.5 pl-1.5">Bình luận</p>
                                    </div>
                                    <div
                                      className={`flex justify-center ${
                                        Rating === true
                                          ? "bg-slate-400"
                                          : "bg-gray-medium"
                                      }`}
                                      onClick={onClickRating}
                                    >
                                      <div className="mt-2.5">
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
                                      <p className="pt-2.5 pl-1.5">Đánh giá</p>
                                    </div>
                                    <div
                                      className={`flex justify-center  ${
                                        Image === true
                                          ? "bg-slate-400"
                                          : "bg-gray-medium"
                                      }`}
                                      onClick={onClickImage}
                                    >
                                      <div className="mt-2.5">
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
                                      <p className="pt-2.5 pl-1.5">Hình ảnh</p>
                                    </div>
                                    <div className="flex justify-center bg-gray-medium">
                                      <button className="bg-green-500 text-white px-5 rounded-sm ml-3 my-1.5">
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
