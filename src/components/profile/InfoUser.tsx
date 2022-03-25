import {Dialog, Transition} from "@headlessui/react";
import React, {ChangeEvent, Fragment, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {hideWaiting, showWaiting} from "../../redux/slices/loading";
import {RootState} from "../../redux/store";
import axiosClient from "../../apis/axios";
import {updateAvatar} from "../../redux/slices/auth";
import {DEFAULT_AVATAR} from "../../constants/common";
import {toastError, toastSuccess} from "../../utils/toast";

const InfoUser: React.FC = () => {
  const [modify, setModify] = useState(false);
  const [phone, setPhone] = useState(false);
  const [address, setAddress] = useState(false);
  const [email, setEmail] = useState(false);
  const inputFile = useRef<HTMLInputElement>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.user);
  const onClickModify = () => {
    setModify(!modify);
  };
  const onClickPhone = () => {
    setPhone(!phone);
  };
  const onClickAddress = () => {
    setAddress(!address);
  };
  const onClickEmail = () => {
    setEmail(!email);
  };
  const cancleSelectAvatar = () => {
    if (inputFile.current != null) {
      inputFile.current.files = null;
    }
    setOpenConfirm(false);
  }
  const onChangeAvatarClick = () => {
    // @ts-ignore
    inputFile.current.click();
  }
  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setOpenConfirm(true);
    }
  }

  const _updateAvatar = () => {
    setOpenConfirm(false);
    if (inputFile.current && inputFile.current.files && inputFile.current.files.length > 0) {
      const formData = new FormData();
      formData.append("image", inputFile.current.files[0]);
      dispatch(showWaiting());
      axiosClient.post("/user/upload-avatar", formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
      )
          .then(res => {
            toastSuccess("Cập nhật thành công!");
            dispatch(updateAvatar(res.data.url));
          })
          .catch((err) => {
            toastError("Cập nhật thất bại!");
            console.log(err.message);
          })
          .finally(() => {
            dispatch(hideWaiting());
          })
    }

  }
  const dialogConfirm = (
      <Transition appear show={openConfirm} as={Fragment}>
        <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={() => {
              setOpenConfirm(false);
            }}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0"/>
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
              <div
                  className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                  Bạn có muốn đặt ảnh này làm ảnh đại diện?
                </Dialog.Title>


                <div className="mt-8 flex justify-between px-16">
                  <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={cancleSelectAvatar}
                  >
                    Hủy
                  </button>

                  <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={_updateAvatar}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
  )
  return (
      <div>
        {dialogConfirm}
        <div className="h-12 bg-white py-8 pb-20 pl-20 border-b-2 border-b-gray-200 shadow-sm">
          <p className="text-blue-400 font-medium text-3xl">Thông tin cá nhân</p>
        </div>
        <div className="grid grid-cols-7">
          <div className="col-span-5 border-r-2 border-r-gray-200 h-[78vh] py-5">
            <div className={"flex justify-center items-center"}>
              <div className={"relative w-32 h-32 rounded-full overflow-hidden group ring-4 ring-blue-300 p-2"}>
                <img
                    src={state.user?.avatar ? state.user.avatar : DEFAULT_AVATAR}
                    className={"rounded-full  w-full h-full"}/>
                <button
                    onClick={onChangeAvatarClick}
                    className={"h-16 transition-all duration-300 absolute bg-black/50 opacity-0 top-[50%] left-0 w-full group-hover:opacity-100"}>
                  Edit
                </button>
                <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={onChangeAvatar}
                       accept="image/png, image/gif, image/jpeg"/>
              </div>


            </div>
            <div className="grid grid-cols-4 mt-10">
              <div className="col-span-1 flex justify-end">
                <p className="text-gray-500 font-medium text-xl mt-3">
                  Họ và tên:
                </p>
              </div>
              <div className="col-span-2">
                <input
                    type="text"
                    className="rounded-xl h-10 mt-2 ml-16 w-[50vh] border-2 border-gray-200 outline-none p-5 text-lg"
                    value="Nguyen Van A"
                    disabled={!modify}
                />
              </div>
              <div className="flex justify-center">
                <div onClick={onClickModify}>
                  <svg
                      className="h-8 w-8 text-gray-400 hover:text-gray-700 cursor-pointer mt-3"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    {" "}
                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
                    {" "}
                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
                    {" "}
                    <line x1="16" y1="5" x2="19" y2="8"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 mt-10">
              <div className="col-span-1 flex justify-end">
                <p className="text-gray-500 font-medium text-xl mt-3">
                  Ngày sinh:
                </p>
              </div>
              <div className="col-span-3">
                <input
                    type="text"
                    className="rounded-xl h-10 mt-2 ml-16 w-[50vh] border-2 border-gray-200 outline-none p-5 text-lg"
                    value="1/1/2000"
                    disabled={!modify}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 mt-10">
              <div className="col-span-1 flex justify-end">
                <p className="text-gray-500 font-medium text-xl mt-3">
                  Giới tính:
                </p>
              </div>
              <div className="col-span-3">
                <input
                    type="text"
                    className="rounded-xl h-10 mt-2 ml-16 w-[50vh] border-2 border-gray-200 outline-none p-5 text-lg"
                    value="nam"
                    disabled={!modify}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 mt-10">
              <div className="col-span-1 flex justify-end"></div>
              <div className="col-span-3">
                {modify ? (
                    <div>
                      <button
                          className="ml-16 bg-blue-solid text-white rounded-sm text-xl px-3 py-1.5"
                          onClick={onClickModify}
                      >
                        Hủy bỏ
                      </button>
                      <button
                          className="ml-3 bg-blue-solid text-white rounded-sm text-xl px-3 py-1.5"
                          onClick={onClickModify}
                      >
                        Cập nhật
                      </button>
                    </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="p-4">
              <p className="text-gray-500">Thông tin liên hệ</p>
            </div>
            <div className="grid grid-cols-8 mt-6 px-5">
              <div className="col-span-5 border-b-2 border-b-gray-200 pb-5">
                <div className="flex">
                  <div className="mt-1">
                    <svg
                        className="h-6 w-6 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                      {" "}
                      <path
                          d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <p className="text-gray-500 pl-4">Số điện thoại</p>
                </div>
                <div className="pl-10">
                  <input
                      className={
                        phone
                            ? "text-black text-sm outline-none w-[12vw] bg-white px-1 py-0.5 border-2 border-gray-300 focus:outline-none"
                            : "text-gray-400 w-[12vw] text-sm bg-transparent outline-none"
                      }
                      value="0123456789"
                      disabled={!phone}
                  />
                </div>
              </div>
              <div className="col-span-3 border-b-2 border-b-gray-200 pb-5">
                <div className="flex justify-end w-full">
                  {phone ? (
                      <svg
                          className="h-8 w-8 text-gray-400 hover:text-gray-700 mt-3"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          onClick={onClickPhone}
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        {" "}
                        <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4"/>
                        {" "}
                        <line x1="12" y1="13" x2="12" y2="22"/>
                        {" "}
                        <polyline points="9 19 12 22 15 19"/>
                      </svg>
                  ) : (
                      <svg
                          className="h-8 w-8 text-gray-400 hover:text-gray-700 cursor-pointer mt-3"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          onClick={onClickPhone}
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        {" "}
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
                        {" "}
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
                        {" "}
                        <line x1="16" y1="5" x2="19" y2="8"/>
                      </svg>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-8 mt-6 px-5">
              <div className="col-span-5 border-b-2 border-b-gray-200 pb-5">
                <div className="flex">
                  <div className="mt-1">
                    <svg
                        className="h-6 w-6 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                      {" "}
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      {" "}
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <p className="text-gray-400 text-lg pl-4">Email</p>
                </div>
                <div className="pl-10">
                <textarea
                    className={
                      email
                          ? "text-black text-sm outline-none w-[12vw] bg-white px-1 py-0.5 border-2 border-gray-300 focus:outline-none resize-none"
                          : "text-gray-400 w-[12vw] text-sm bg-transparent h-fit outline-none resize-none"
                    }
                    value="nguyenvana@gmail.com"
                    disabled={!email}
                />
                </div>
              </div>
              <div className="col-span-3 border-b-2 border-b-gray-200 pb-5">
                <div className="flex justify-end w-full">
                  {email ? (
                      <svg
                          className="h-8 w-8 text-gray-400 hover:text-gray-700 mt-3"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          onClick={onClickEmail}
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        {" "}
                        <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4"/>
                        {" "}
                        <line x1="12" y1="13" x2="12" y2="22"/>
                        {" "}
                        <polyline points="9 19 12 22 15 19"/>
                      </svg>
                  ) : (
                      <svg
                          className="h-8 w-8 text-gray-400 hover:text-gray-700 cursor-pointer mt-3"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          onClick={onClickEmail}
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        {" "}
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
                        {" "}
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
                        {" "}
                        <line x1="16" y1="5" x2="19" y2="8"/>
                      </svg>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-8 mt-6 px-5">
              <div className="col-span-5 border-b-2 border-b-gray-200 pb-5">
                <div className="flex">
                  <div className="mt-1">
                    <svg
                        className="h-6 w-6 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                      {" "}
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      {" "}
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <p className="text-gray-400 text-lg pl-4">Địa chỉ</p>
                </div>
                <div className="pl-10">
                <textarea
                    className={
                      address
                          ? "text-black text-sm outline-none w-[12vw] bg-white px-1 py-0.5 border-2 border-gray-300 focus:outline-none resize-none"
                          : "text-gray-400 text-sm w-[12vw] bg-transparent outline-none resize-none"
                    }
                    value="31 Pham Van Dong, p13, Go` Vap"
                    disabled={!address}
                />
                </div>
              </div>
              <div className="col-span-3 border-b-2 border-b-gray-200 pb-5">
                <div className="flex justify-end w-full">
                  {address ? (
                      <svg
                          className="h-8 w-8 text-gray-400 hover:text-gray-700 mt-3"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          onClick={onClickAddress}
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        {" "}
                        <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4"/>
                        {" "}
                        <line x1="12" y1="13" x2="12" y2="22"/>
                        {" "}
                        <polyline points="9 19 12 22 15 19"/>
                      </svg>
                  ) : (
                      <svg
                          className="h-8 w-8 text-gray-400 hover:text-gray-700 cursor-pointer mt-3"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          onClick={onClickAddress}
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        {" "}
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
                        {" "}
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
                        {" "}
                        <line x1="16" y1="5" x2="19" y2="8"/>
                      </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default InfoUser;
