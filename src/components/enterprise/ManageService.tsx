import React, {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { RiEdit2Line } from "react-icons/ri";
import { BsCheckLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Enterprise } from "../../apis/common/Enterprise";
import { getAddressContent } from "../../utils/getAddressContent";
import { hideWaiting, showWaiting } from "../../redux/slices/loading";
import { DEFAULT_AVATAR } from "../../constants/common";
import { Dialog, Transition } from "@headlessui/react";
import axiosClient from "../../apis/axios";
import { toastError, toastSuccess } from "../../utils/toast";
import { updateAvatar } from "../../redux/slices/auth";
import { ModalAddress } from "../common/ModalAddress";
import { Address } from "../../apis/common/Address";
import { PInOverview } from "../../apis/package/in/PInOverview";

interface DialogConfirmAvatarProp {
  show: boolean;
  setShow: (b: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const DialogConfirmAvatar = ({
  show,
  setShow,
  onCancel,
  onConfirm,
}: DialogConfirmAvatarProp) => (
  <Transition appear show={show} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={() => {
        setShow(false);
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
        <span className="inline-block h-screen align-middle" aria-hidden="true">
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
                onClick={onCancel}
              >
                Hủy
              </button>

              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={onConfirm}
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

const updateProfile = async (data: Partial<Enterprise>) => {
  console.log("Update", data);
  return axiosClient.post("enterprise/update-profile", data);
};

const Profile = () => {
  const state: Enterprise | undefined = useSelector(
    (state: RootState) => state.user.enterprise
  );
  const [address, setAddress] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [showModalAddress, setShowModalAddress] = useState(false);

  const inputFile = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  let data = useRef<Partial<Enterprise>>({});
  const fetchContentAddress = useCallback((address: Address) => {
    dispatch(showWaiting());
    getAddressContent(address)
      .then((res) => setAddress(res || ""))
      .finally(() => dispatch(hideWaiting()));
  }, []);

  useEffect(() => {
    if (state && state.address) {
      fetchContentAddress(state.address);
    }
  }, [state?.address]);
  const onChangeAvatarClick = () => {
    // @ts-ignore
    inputFile.current.click();
  };
  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setOpenConfirm(true);
    }
  };
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
        .post("/enterprise/upload-avatar", formData, {
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
  const _cancelSelectAvatar = () => {
    if (inputFile.current != null) {
      inputFile.current.files = null;
    }
    setOpenConfirm(false);
  };
  const _updateProfile = useCallback((data: Partial<Enterprise>) => {
    dispatch(showWaiting());
    updateProfile(data)
      .then((res) => {
        toastSuccess("Cập nhật thành công!");
      })
      .catch((err) => {
        toastError("Cập nhật thất bại!");
      })
      .finally(() => dispatch(hideWaiting()));
  }, []);
  return (
    <div className={"flex justify-center"}>
      <div
        className={
          "flex flex-col justify-center gap-2 p-6 min-w-[50%] bg-white rounded-lg border border-gray-200 shadow-md transition-all duration-300"
        }
      >
        <div className={"flex justify-between gap-32"}>
          <p className={"mb-2 text-2xl font-bold tracking-tight text-gray-900"}>
            Thông tin doanh nghiệp
          </p>
          <p>
            <button onClick={() => setEnableEdit((pre) => !pre)}>
              <RiEdit2Line size={25} />
            </button>
          </p>
        </div>
        <div className={"flex flex-col gap-2"}>
          <div>
            <DialogConfirmAvatar
              show={openConfirm}
              setShow={setOpenConfirm}
              onConfirm={_updateAvatar}
              onCancel={_cancelSelectAvatar}
            />
            <div
              className={
                "relative w-32 h-32 rounded-full overflow-hidden group ring-4 ring-blue-300 p-2 m-auto"
              }
            >
              <img
                src={state?.avatar?.url || DEFAULT_AVATAR}
                className={"rounded-full  w-full h-full"}
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
                disabled={!enableEdit}
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={onChangeAvatar}
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Tên doanh nghiệp
            </label>
            <input
              disabled={!enableEdit}
              type="text"
              className="input"
              defaultValue={state?.fullName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                data.current.fullName = e.target.value;
              }}
            />
          </div>
          <ModalAddress
            show={showModalAddress}
            setShow={setShowModalAddress}
            onChange={(a) => {
              data.current.address = a;
              fetchContentAddress(a);
            }}
            defaultValue={state?.address}
          />
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Địa chỉ
            </label>
            <button
              disabled={!enableEdit}
              onClick={() => setShowModalAddress(true)}
              className={
                "py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
              }
            >
              {address || "Chọn địa chỉ..."}
            </button>
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              disabled={!enableEdit}
              type="text"
              className="input"
              defaultValue={state?.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                data.current.email = e.target.value;
              }}
            />
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Số điện thọai
            </label>
            <input
              disabled={!enableEdit}
              type="text"
              className="input"
              defaultValue={state?.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                data.current.phone = e.target.value;
              }}
            />
          </div>
          <div className={"mt-5"} hidden={!enableEdit}>
            <button
              onClick={() => {
                _updateProfile(data.current);
              }}
              className={
                "w-full m-auto text-green-500  bg-green-100 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-center py-3"
              }
            >
              <BsCheckLg className={"inline mr-2"} />
              <p className={"inline"}>Lưu thay đổi</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageService = () => {
  const [overView, setOverView] = useState<PInOverview | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showWaiting());
    axiosClient
      .get<PInOverview>("enterprise/get-overview-analysis")
      .then((res) => setOverView(res.data))
      .finally(() => dispatch(hideWaiting()));
  }, [dispatch]);
  return (
    <div>
      <div className="h-12 bg-white 2xl:pt-10 xl:pt-8 lg:pt-0 pb-14 pl-20 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-solid font-medium 2xl:text-xl xl:text-lg">
          Quản lý
        </p>
      </div>
      <div>
        <div className={"flex justify-center mt-3 gap-10"}>
          <div
            className={
              "block flex flex-col justify-center items-center gap-2 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
            }
          >
            <div className={"w-20 h-20"}>
              <img
                src={require("../../assets/enterprise/service.png")}
                className={"w-full h-full"}
                alt=""
              />
            </div>
            <div>
              <p className={"text-2xl font-bold tracking-tight text-gray-900"}>
                {overView?.numOfService || 0}
              </p>
            </div>
            <div>
              <p className={"text-cyan-700"}>Số lượng dịch vụ</p>
            </div>
          </div>
          <div
            className={
              "block flex flex-col justify-center items-center gap-2 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
            }
          >
            <div className={"w-20 h-20"}>
              <img
                src={require("../../assets/enterprise/user.png")}
                className={"w-full h-full"}
                alt=""
              />
            </div>
            <div>
              <p className={"text-2xl font-bold tracking-tight text-gray-900"}>
                {overView?.numOfFollow || 0}
              </p>
            </div>
            <div>
              <p className={"text-cyan-700"}>Số người theo dõi</p>
            </div>
          </div>
          <div
            className={
              "block flex flex-col justify-center items-center gap-2 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
            }
          >
            <div className={"w-20 h-20"}>
              <img
                src={require("../../assets/enterprise/trade.png")}
                className={"w-full h-full"}
                alt=""
              />
            </div>
            <div>
              <p className={"text-2xl font-bold tracking-tight text-gray-900"}>
                {overView?.numOfDoneSchedule || 0}
              </p>
            </div>
            <div>
              <p className={"text-cyan-700"}>Số lần giao dịch</p>
            </div>
          </div>
        </div>
      </div>
      <div className={"my-5"}>
        <Profile />
      </div>
    </div>
  );
};

export default ManageService;
