import React, {ChangeEvent, useEffect, useState} from "react";
import Dropdown from "../common/Dropdown";
import TimePicker from "../layouts/TimePicker";
import {ModalAddress} from "../common/ModalAddress";
import {Address} from "../../apis/common/Address";
import {getAddressContent} from "../../utils/getAddressString";
import {useDispatch} from "react-redux";
import {hideWaiting, showWaiting} from "../../redux/slices/loading";
import axiosClient from "../../apis/axios";
import {PInCategory} from "../../apis/package/in/PInCategory";
import cookies from "js-cookie";
import axios from "axios";
import {toastError, toastSuccess} from "../../utils/toast";

interface DataForm {
  name?: string;
  email?: string;
  phone?: string;
  address?: Address;
  category?: string;
  openTime?: string;
  closeTime?: string;
  openPrice?: string;
  closePrice?: string;
  avatar?: any;
}

const handleAddNewService = async (data: DataForm) =>{
  const formData = new FormData();
  data.name && formData.append("name", data.name);
  data.email && formData.append("email", data.email);
  data.phone && formData.append("phone", data.phone);
  data.address && formData.append("address", JSON.stringify(data.address));
  data.category&&formData.append("category", data.category);
  data.openTime && formData.append("openTime", data.openTime);
  data.closeTime && formData.append("closeTime", data.closeTime);
  data.openPrice && formData.append("openPrice", data.openPrice);
  data.closePrice&&formData.append("closePrice", data.closePrice);
  data.avatar && formData.append("avatar", data.avatar);
  return axiosClient.post("/enterprise/new-service", formData, {headers: {
    'Content-Type': 'multipart/form-data',
      'Authorization' : `Bearer ${cookies.get('token')}`
  }})
  //
  // Object.keys(data).map((key)=>{
  //   formData.append(key, data.);
  // })
  // return axiosClient.post()
}

const AddService: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState();
  const [preview, setPreview] = useState();
  const [showModalAddress, setShowModalAddress] = useState(false);
  const [address, setAddress] = useState<Address>();
  const [textAddress, setTextAddress] = useState<string>("");
  const [categories, setCategories] = useState<Array<PInCategory.Category>>();
  const [dataForm, setDataForm] = useState<DataForm>({});

  useEffect(() => {
    setDataForm((pre: DataForm) => ({...pre, address: address}));
    getAddressContent(address)
        .then((addressContent) => setTextAddress(addressContent || ""));
  }, [address])
  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl as any);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);
  useEffect(() => {
    dispatch(showWaiting());
    axiosClient.get<PInCategory.Data>("/categories")
        .then((res) => {
          setCategories(res.data.categories);
        })
        .catch()
        .finally(() => {
          dispatch(hideWaiting());
        })
  }, []);
  const imageChange = (e: any) => {
    if (!e.target.files || e.target.files.lenght === 0) {
      setSelectedImage(undefined);
      setDataForm((pre)=>({...pre, avatar: undefined}));
      return;
    }
    setDataForm((pre)=>({...pre, avatar: e.target.files[0]}));
    setSelectedImage(e.target.files[0]);
  };

  const removeImage = () => {
    setSelectedImage(undefined);
  };

  return (
      <div className="bg-gray-light h-fit">
        <ModalAddress show={showModalAddress} setShow={setShowModalAddress} onChange={(value)=>setAddress(value)}/>
        <div className="h-12 bg-white py-8 pb-20 pl-20 border-b-2 border-b-gray-200 shadow-sm">
          <p className="text-blue-400 font-medium text-3xl">Thêm dịch vụ</p>
        </div>
        <div className="p-16 w-3/4 bg-white rounded-lg border border-gray-200 shadow-md my-6 m-auto flex flex-col gap-6">
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900">Tên dịch
              vụ</label>
            <input
                type="text"
                className="input"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setDataForm((pre: DataForm) => ({...pre, name: e.target.value}))
                }}
            />
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900">Địa chỉ</label>
            <button
                className={"py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"}
                onClick={() => setShowModalAddress(true)}>{textAddress || "Chọn địa chỉ..."}</button>
          </div>

          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900">Số điện thoại</label>
            <input
                type="string"
                className="input"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDataForm((pre: DataForm) => ({
                  ...pre,
                  phone: e.target.value
                }))}
            />
          </div>

          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input
                type="email"
                className="input"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDataForm((pre: DataForm) => ({
                  ...pre,
                  email: e.target.value
                }))}
            />
          </div>

          <div className="flex justify-start gap-16 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-900">Giờ hoạt động</label>
              <TimePicker defaultHour={"8"} defaultMin={"0"} defaultAP={"am"}
                          onChange={(value) => setDataForm((pre: DataForm) => ({...pre, openTime: value}))}/>
            </div>
            <div className={""}>
              <label className="block text-sm font-medium text-gray-900">Đến</label>
              <TimePicker defaultHour={"10"} defaultMin={"0"} defaultAP={"pm"}
                          onChange={(value: string) => setDataForm((pre: DataForm) => ({...pre, closeTime: value}))}
              />
            </div>

          </div>
          <div className="flex justify-start items-center gap-16">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Tầm giá</label>
              <input
                  type="number"
                  className="input"
                  step={1000}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDataForm((pre: DataForm) => ({
                    ...pre,
                    openPrice: e.target.value
                  }))}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Đến</label>
              <input
                  type="number"
                  className="input"
                  step={1000}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDataForm((pre: DataForm) => ({
                    ...pre,
                    closePrice: e.target.value
                  }))}
              />
            </div>
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900">Lĩnh vực</label>
            <div className="">
              <Dropdown items={categories}
                        onChange={(value) => {
                          value && setDataForm((pre: DataForm) => ({...pre, category: value._id}))
                        }}/>
            </div>
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900">Hình ảnh</label>
            <div>
              <div className="h-fit w-full bg-transparent">
                <input
                    type="file"
                    className="w-80 h-20"
                    id="image"
                    name="image"
                    onChange={imageChange}
                />
                {selectedImage && (
                  <div className="z-20">
                    <img
                        className="max-h-36 max-w-2xl z-30"
                        src={preview}
                        alt="thumb"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <button
                className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"}
                onClick={()=> {
                  dispatch(showWaiting())
                  handleAddNewService(dataForm)
                      .then(res=>toastSuccess("Thêm dịch vụ thành công!"))
                      .catch((err)=>toastError(err.response.data.message.toString()))
                      .finally(()=>{
                        dispatch(hideWaiting())
                      })
                }}
            >Đăng
              kí
            </button>
          </div>
        </div>
    </div>
  );
};

export default AddService;
