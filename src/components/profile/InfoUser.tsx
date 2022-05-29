import { Dialog, Listbox, Transition } from "@headlessui/react";
import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideWaiting, showWaiting } from "../../redux/slices/loading";
import { RootState } from "../../redux/store";
import axiosClient from "../../apis/axios";
import { updateAvatar, updateProfile } from "../../redux/slices/auth";
import { ADDRESS_API_URL, DEFAULT_AVATAR } from "../../constants/common";
import { toastError, toastSuccess } from "../../utils/toast";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import axios, { AxiosResponse } from "axios";
import { PInProfile } from "../../apis/package/in/PInProfile";
import { ModalAddress } from "../common/ModalAddress";
import { Address } from "../../apis/common/Address";
import { getAddressContent } from "../../utils/getAddressContent";

const SEX = [
  {
    name: "Nam",
    value: 0,
  },
  {
    name: "Nữ",
    value: 1,
  },
];

const InfoUser: React.FC = () => {
  const [modify, setModify] = useState<boolean>(false);
  const [phone, setPhone] = useState<any>({ active: false, value: undefined });
  const [address, setAddress] = useState<any>({
    active: false,
    value: undefined,
  });
  const [email, setEmail] = useState<any>({ active: false, value: undefined });
  const inputFile = useRef<HTMLInputElement>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>();
  const [sex, setSex] = useState(SEX[0]);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.user);

  const onToggleModify = () => {
    setModify((pre) => !pre);
  };
  useEffect(() => {
    setPhone((pre: any) => ({ ...pre, value: state.user?.phone }));
  }, [state.user?.phone]);

  useEffect(() => {
    setEmail((pre: any) => ({ ...pre, value: state.user?.email }));
  }, [state.user?.email]);
  const onClickModify = () => {
    setModify((pre) => !pre);
    dispatch(showWaiting());
    axiosClient
      .put("/user/update-profile", {
        fullName: name,
        birthday: birthday,
      })
      .then((res: AxiosResponse<PInProfile>) => {
        dispatch(updateProfile(res.data.user));
        toastSuccess("Cập nhật thành công!");
      })
      .catch((err) => {
        toastError("Cập nhật thất bại!");
      })
      .finally(() => {
        dispatch(hideWaiting());
      });
  };
  const onClickPhone = () => {
    if (phone.active && phone.value.length >= 9) {
      let realPhone: string = phone.value;
      if (phone.value[0] === "0") {
        realPhone = "+84" + realPhone.slice(1);
      }
      dispatch(showWaiting());
      axiosClient
        .put("/user/update-profile", {
          phone: realPhone,
        })
        .then((res: AxiosResponse<PInProfile>) => {
          dispatch(updateProfile(res.data.user));
          toastSuccess("Cập nhật thành công!");
        })
        .catch((err) => {
          toastError("Cập nhật thất bại!");
        })
        .finally(() => {
          setPhone({ ...phone, active: false });
          dispatch(hideWaiting());
        });
    }
    setPhone((pre: any) => {
      return { value: state.user?.phone, active: !pre.active };
    });
  };
  const onClickAddress = () => {
    // setAddress(!address);
    setAddress((pre: any) => {
      return { ...pre, active: !pre.active };
    });
  };
  const onClickEmail = () => {
    // setEmail(!email);
    if (email.active) {
      dispatch(showWaiting());
      axiosClient
        .put("/user/update-profile", {
          email: email.value,
        })
        .then((res: AxiosResponse<PInProfile>) => {
          dispatch(updateProfile(res.data.user));
          toastSuccess("Cập nhật thành công!");
        })
        .catch((err) => {
          toastError("Cập nhật thất bại!");
        })
        .finally(() => {
          dispatch(hideWaiting());
        });
    }
    setEmail((pre: any) => {
      return { ...pre, active: !pre.active };
    });
  };
  const cancleSelectAvatar = () => {
    if (inputFile.current != null) {
      inputFile.current.files = null;
    }
    setOpenConfirm(false);
  };

  const onChangeAvatarClick = () => {
    // @ts-ignore
    inputFile.current.click();
  };
  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setOpenConfirm(true);
    }
  };

  useEffect(() => {
    getAddressContent(state.user?.address).then((res) => {
      setAddress((pre: any) => ({ ...pre, value: res }));
    });
  }, [state.user?.address]);

  const _updateAvatar = () => {
    setOpenConfirm(false);
    if (
      inputFile.current &&
      inputFile.current.files &&
      inputFile.current.files.length > 0
    ) {
      const formData = new FormData();
      formData.append("image", inputFile.current.files[0]);
      dispatch(showWaiting());
      axiosClient
        .post("/user/upload-avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastSuccess("Cập nhật thành công!");
          dispatch(updateAvatar(res.data.avatar));
        })
        .catch((err) => {
          toastError("Cập nhật thất bại!");
        })
        .finally(() => {
          dispatch(hideWaiting());
        });
    }
  };
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
            <Dialog.Overlay className="fixed inset-0" />
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Bạn có muốn đặt ảnh này làm ảnh đại diện?
              </Dialog.Title>

              <div className="mt-8 flex justify-between px-16">
                <button
                  type="button"
                  className="inline-flex justify-center px-8 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
  );
  return (
    <div className="h-full">
      {dialogConfirm}
      <div className="h-12 bg-white pt-12 pb-14 pl-20 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-solid font-medium 2xl:text-xl xl:text-lg">
          Thông tin cá nhân
        </p>
      </div>
      <div className="grid grid-cols-7">
        <div className="col-span-5 border-r-2 border-r-gray-200 h-fit pt-5 pb-10">
          <div className={"flex justify-center items-center"}>
            <div
              className={
                "relative 2xl:w-32 2xl:h-32 xl:h-28 xl:w-28 lg:h-24 lg:w-24 rounded-full overflow-hidden group 2xl:ring-4 xl:ring-2 lg:ring-1 ring-blue-solid 2xl:p-2 xl:p-1 lg:p-0.5"
              }
            >
              <img
                src={
                  state.user?.avatar ? state.user.avatar.url : DEFAULT_AVATAR
                }
                className={"rounded-full w-full h-full"}
              />
              <button
                onClick={onChangeAvatarClick}
                className={
                  "text-white h-16 transition-all duration-300 absolute bg-black/70 opacity-0 top-[50%] left-0 w-full group-hover:opacity-100"
                }
              >
                Edit
              </button>
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={onChangeAvatar}
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
          </div>

          <div className={"w-2/4 h-0.5 my-4 bg-gray-400 m-auto "} />
          <div
            className={
              "bg-white rounded-lg border border-gray-200 shadow-md w-3/4 m-auto p-4"
            }
          >
            <div className="flex justify-end">
              <div onClick={onToggleModify}>
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
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                  <line x1="16" y1="5" x2="19" y2="8" />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-4 mt-10">
              <div className="col-span-1 flex justify-end">
                <p className="text-gray-500 font-medium 2xl:text-xl xl:text-lg lg:text-lg mt-3">
                  Họ và tên:
                </p>
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="rounded-xl h-10 mt-2 ml-16 w-[50vh] border-2 border-gray-200 outline-none 2xl:p-5 xl:p-4 lg:p-3 2xl:text-lg xl:text-lg lg:text-sm"
                  defaultValue={state.user?.fullName || undefined}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!modify}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 mt-10">
              <div className="col-span-1 flex justify-end">
                <p className="text-gray-500 font-medium 2xl:text-xl xl:text-lg lg:text-lg mt-3">
                  Ngày sinh:
                </p>
              </div>
              <div className="col-span-3">
                <input
                  type="date"
                  className="rounded-xl h-10 mt-2 ml-16 w-[50vh] border-2 border-gray-200 outline-none 2xl:p-5 xl:p-4 lg:p-3 2xl:text-lg xl:text-lg lg:text-sm"
                  defaultValue={
                    state.user && state.user.birthday
                      ? new Date(state.user?.birthday)
                          .toISOString()
                          .substring(0, 10)
                      : undefined
                  }
                  disabled={!modify}
                  onChange={(e) => {
                    setBirthday(new Date(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 mt-10">
              <div className="col-span-1 flex justify-end">
                <p className="text-gray-500 font-medium 2xl:text-xl xl:text-lg lg:text-lg mt-3">
                  Giới tính:
                </p>
              </div>
              <div className="col-span-3">
                <Listbox
                  value={SEX}
                  onChange={(value: any) => setSex(value)}
                  disabled={!modify}
                >
                  <div className="relative">
                    <Listbox.Button className="relative w-[50vh] h-10 px-5 mt-2 ml-16 text-left bg-white rounded-xl border-2 border-gray-200 cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                      <span className={"m-auto"}>{sex.name}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {SEX.map((s, i) => (
                          <Listbox.Option
                            key={i}
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-amber-900 bg-amber-100"
                                  : "text-gray-900"
                              }`
                            }
                            value={s}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {s.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
            <div className="grid grid-cols-4 mt-10">
              <div className="col-span-1 flex justify-end"></div>
              <div className="col-span-3">
                {modify ? (
                  <div className={"float-right"}>
                    <button
                      className="text-red-900 bg-red-100 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                      onClick={onToggleModify}
                    >
                      Hủy bỏ
                    </button>
                    <button
                      className="text-blue-900 bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                      onClick={onClickModify}
                    >
                      Cập nhật
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="p-4">
            <p className="text-gray-500 2xl:text-xl xl:text-lg lg:text-sm">
              Thông tin liên hệ
            </p>
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
                    <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <p className="text-gray-500 pl-4 2xl:text-xl xl:text-lg lg:text-sm">
                  Số điện thoại
                </p>
              </div>
              <div className="pl-10">
                <input
                  className={
                    phone.active
                      ? "text-black xl:text-sm lg:text-xs outline-none w-[12vw] bg-white px-1 py-0.5 border-2 border-gray-300 focus:outline-none"
                      : "text-gray-400 w-[12vw] xl:text-sm lg:text-xs bg-transparent outline-none"
                  }
                  // defaultValue={state.user?.phone}
                  defaultValue={state.user?.phone || ""}
                  placeholder={"Số điện thoại"}
                  disabled={!phone.active}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPhone((pre: any) => ({ ...pre, value: e.target.value }));
                  }}
                />
              </div>
            </div>
            <div className="col-span-3 border-b-2 border-b-gray-200 pb-5">
              <div className="flex justify-end w-full">
                {phone.active ? (
                  <svg
                    className="2xl:h-8 2xl:w-8 xl:h-7 xl:w-7 lg:w-6 lg:h-6 text-gray-400 hover:text-gray-700 mt-3 cursor-pointer"
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
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4" />{" "}
                    <line x1="12" y1="13" x2="12" y2="22" />{" "}
                    <polyline points="9 19 12 22 15 19" />
                  </svg>
                ) : (
                  <svg
                    className="2xl:h-8 2xl:w-8 xl:h-7 xl:w-7 lg:w-6 lg:h-6 text-gray-400 hover:text-gray-700 cursor-pointer mt-3"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={onClickPhone}
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                    <line x1="16" y1="5" x2="19" y2="8" />
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
                    className="2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 lg:w-5 lg:h-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />{" "}
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <p className="text-gray-400 2xl:text-xl xl:text-lg lg:text-sm pl-4">
                  Email
                </p>
              </div>
              <div className="pl-10">
                <textarea
                  className={
                    email.active
                      ? "text-black xl:text-sm lg:text-xs outline-none w-[12vw] bg-white px-1 py-0.5 border-2 border-gray-300 focus:outline-none resize-none"
                      : "text-gray-400 w-[12vw] xl:text-sm lg:text-xs bg-transparent h-fit outline-none resize-none"
                  }
                  defaultValue={state.user?.email}
                  placeholder={"Email"}
                  disabled={!email.active}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    setEmail((pre: any) => ({ ...pre, value: e.target.value }));
                  }}
                />
              </div>
            </div>
            <div className="col-span-3 border-b-2 border-b-gray-200 pb-5">
              <div className="flex justify-end w-full">
                {email.active ? (
                  <svg
                    className="2xl:h-8 2xl:w-8 xl:h-7 xl:w-7 lg:w-6 lg:h-6 text-gray-400 hover:text-gray-700 mt-3 cursor-pointer"
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
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4" />{" "}
                    <line x1="12" y1="13" x2="12" y2="22" />{" "}
                    <polyline points="9 19 12 22 15 19" />
                  </svg>
                ) : (
                  <svg
                    className="2xl:h-8 2xl:w-8 xl:h-7 xl:w-7 lg:w-6 lg:h-6 text-gray-400 hover:text-gray-700 cursor-pointer mt-3"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={onClickEmail}
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                    <line x1="16" y1="5" x2="19" y2="8" />
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
                    className="2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 lg:w-5 lg:h-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />{" "}
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <p className="text-gray-400 2xl:text-xl xl:text-lg lg:text-sm pl-4">
                  Địa chỉ
                </p>
              </div>
              <div className="pl-10">
                <textarea
                  className={
                    "text-gray-400 xl:text-sm lg:text-xs w-[12vw] bg-transparent outline-none resize-none break-words h-10"
                  }
                  value={address.value}
                  disabled
                />
                <ModalAddress
                  show={address.active}
                  setAddress={(value: any) => {
                    setAddress((pre: any) => ({ ...pre, value: value }));
                  }}
                  setShow={(b) =>
                    setAddress((pre: any) => ({ ...pre, active: b }))
                  }
                />
              </div>
            </div>
            <div className="col-span-3 border-b-2 border-b-gray-200 pb-5">
              <div className="flex justify-end w-full">
                <svg
                  className="2xl:h-8 2xl:w-8 xl:h-7 xl:w-7 lg:w-6 lg:h-6 text-gray-400 hover:text-gray-700 cursor-pointer mt-3"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={onClickAddress}
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                  <line x1="16" y1="5" x2="19" y2="8" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
