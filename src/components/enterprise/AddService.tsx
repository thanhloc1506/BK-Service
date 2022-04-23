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
import {toastError, toastSuccess} from "../../utils/toast";
import {ImageControl} from "./ImageControl";
import {ImageAdd} from "./ImageAdd";
import {Category} from "../../apis/common/Category";

interface DataForm {
    name?: string;
    email?: string;
    phone?: string;
    address?: Address;
    category?: string;
    openTime?: string;
    closeTime?: string;
    maxPrice?: number;
    minPrice?: number;
    images?: File[];
}

const handleAddNewService = async (data: DataForm, images: File[]|undefined) => {
    const formData = new FormData();
    data.name && formData.append("name", data.name);
    data.email && formData.append("email", data.email);
    data.phone && formData.append("phone", data.phone);
    data.address && formData.append("address", JSON.stringify(data.address));
    data.category && formData.append("category", data.category);
    data.openTime && formData.append("openTime", data.openTime);
    data.closeTime && formData.append("closeTime", data.closeTime);
    data.maxPrice && formData.append("maxPrice", data.maxPrice.toString());
    data.minPrice && formData.append("minPrice", data.minPrice.toString());
    if(images && images.length>0){
        images.map((image) =>formData.append("images", image));
    }
    // data.avatar && formData.append("avatar", data.avatar);
    return axiosClient.post("/enterprise/new-service", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${cookies.get('eToken')}`
        }
    })
    //
    // Object.keys(data).map((key)=>{
    //   formData.append(key, data.);
    // })
    // return axiosClient.post()
}

const AddService: React.FC = () => {
    const dispatch = useDispatch();
    const [showModalAddress, setShowModalAddress] = useState(false);
    const [address, setAddress] = useState<Address>();
    const [textAddress, setTextAddress] = useState<string>("");
    const [categories, setCategories] = useState<Array<Category>>();
    const [dataForm, setDataForm] = useState<DataForm>({});
    const [newImg, setNewImg] = useState<File[] | undefined>();
    useEffect(() => {
        setDataForm((pre: DataForm) => ({...pre, address: address}));
        getAddressContent(address)
            .then((addressContent) => setTextAddress(addressContent || ""));
    }, [address])

    useEffect(() => {
        dispatch(showWaiting());
        axiosClient.get<PInCategory>("/categories")
            .then((res) => {
                setCategories(res.data.categories);
            })
            .catch()
            .finally(() => {
                dispatch(hideWaiting());
            })
    }, []);


    return (
        <div className="bg-gray-light h-fit">
            <ModalAddress show={showModalAddress} setShow={setShowModalAddress}
                          onChange={(value) => setAddress(value)}/>
            <div className="h-12 bg-white py-8 pb-20 pl-20 border-b-2 border-b-gray-200 shadow-sm">
                <p className="text-blue-400 font-medium text-3xl">Thêm dịch vụ</p>
            </div>
            <div
                className="p-16 w-3/4 bg-white rounded-lg border border-gray-200 shadow-md my-6 m-auto flex flex-col gap-6">
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
                        <TimePicker defaultHour={"08"} defaultMin={"00"} defaultAP={"am"}
                                    onChange={(value) => setDataForm((pre: DataForm) => ({...pre, openTime: value}))}/>
                    </div>
                    <div className={""}>
                        <label className="block text-sm font-medium text-gray-900">Đến</label>
                        <TimePicker defaultHour={"10"} defaultMin={"00"} defaultAP={"pm"}
                                    onChange={(value: string) => setDataForm((pre: DataForm) => ({
                                        ...pre,
                                        closeTime: value
                                    }))}
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
                                minPrice: parseInt(e.target.value)
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
                                maxPrice: parseInt(e.target.value)
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
                        <label className="block mb-2 text-sm font-medium text-gray-900">Hình
                            ảnh</label>
                        <div className={'w-full'}>
                            <div className={'my-10 flex flex-wrap justify-center gap-2'}>
                                {newImg && newImg.map((data, index) => {
                                    return <ImageControl url={URL.createObjectURL(data)}
                                                         onDelete={() => {
                                                             setNewImg(pre=>{
                                                                 if(pre) return pre.filter((v)=>v!=data);
                                                             })
                                                         }}/>
                                })}
                                <ImageAdd onSelectFile={(file: File) => {
                                    setNewImg(pre => {
                                        if (pre) {
                                            return [...pre, file];
                                        }
                                        return [file];
                                    })
                                }}/>
                            </div>
                        </div>
                    </div>
                <div className={'flex justify-center'}>
                    <button
                        className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-16 py-2.5"}
                        onClick={() => {
                            dispatch(showWaiting())
                            handleAddNewService(dataForm, newImg)
                                .then(res => toastSuccess("Thêm dịch vụ thành công!"))
                                .catch((err) => toastError(err.response.data.message.toString()))
                                .finally(() => {
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
