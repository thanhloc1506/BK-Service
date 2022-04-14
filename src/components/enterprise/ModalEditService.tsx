import {Dialog, Transition} from "@headlessui/react";
import React, {ChangeEvent, Fragment, useEffect, useState} from "react";
import {PInAllServices} from "../../apis/package/in/PInAllServices";
import TimePicker from "../layouts/TimePicker";
import Dropdown from "../common/Dropdown";
import {PInCategory} from "../../apis/package/in/PInCategory";
import axiosClient from "../../apis/axios";
import {useDispatch} from "react-redux";
import {hideWaiting, showWaiting} from "../../redux/slices/loading";
import {ModalAddress} from "../common/ModalAddress";
import {Address} from "../../apis/common/Address";
import {getAddressContent} from "../../utils/getAddressString";
import {ImageControl} from "./ImageControl";
import {ImageAdd} from "./ImageAdd";
import cookies, {remove} from "js-cookie";
import {FileUploaded} from "../../apis/common/FileUploaded";
import {toastSuccess} from "../../utils/toast";
import {ModalIntroduction} from "./ModalIntroduction";
import {Service} from "../../apis/common/Service";

interface IModalEditService {
    data: Service | undefined;
    onBtnClick?: () => void;
    show: boolean;
    setShow?: (b: boolean) => void;
}


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
    imageDelete?: any;
    imageAdd?: any;
}

const submitChangeService = (data: Service | undefined, oldImg: FileUploaded[]|undefined, newImg: File[] | undefined, intro: string | undefined) =>{
    const formData = new FormData();
    if(!data) return;
    data.name && formData.append("name", data.name);
    data.email && formData.append("email", data.email);
    data.phone && formData.append("phone", data.phone);
    data.address && formData.append("address", JSON.stringify(data.address));
    data.category && formData.append("category", data.category._id);
    data.openTime && formData.append("openTime", data.openTime);
    data.closeTime && formData.append("closeTime", data.closeTime);
    data.maxPrice && formData.append("maxPrice", data.maxPrice.toString());
    data.minPrice && formData.append("minPrice", data.minPrice.toString());
    intro && formData.append("introduction", intro);
    let removeImg = data.images?.filter((image)=>{
        return !oldImg?.includes(image);
    }).map((e)=>e.key);

    if(removeImg && removeImg.length>0) formData.append("removeImg", JSON.stringify(removeImg));
    if(newImg && newImg.length>0){
        newImg.map((e)=>formData.append("images", e));
    }
    // data.imageAdd && formData.append("images", data.imageAdd);
    return axiosClient.put(`/service/${data._id}/modify-service`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${cookies.get('eToken')}`
        }
    })
}

export const ModalEditService = ({data, show, setShow}: IModalEditService) => {
    const dispatch = useDispatch();
    const [editData, setEditData] = useState<Service | undefined>(data);
    const [categories, setCategories] = useState<PInCategory.Category[] | undefined>();
    const [showModalAddress, setShowModalAddress] = useState(false);
    const [address, setAddress] = useState<Address | undefined>();
    const [textAddress, setTextAddress] = useState<string | undefined>("");
    const [oldImg, setOldImg] = useState<FileUploaded[]| undefined>();
    const [newImg, setNewImg] = useState<File[]>();
    const [showModalIntro, setShowModalIntro] = useState(false);
    const [intro, setIntro] = useState("");
    useEffect(() => {
        //fetch categories
        dispatch(showWaiting());
        axiosClient.get<PInCategory.Data>("/categories")
            .then((res) => {
                setCategories(res.data.categories);
            })
            .catch()
            .finally(() => dispatch(hideWaiting()))
    }, []);
    useEffect(() => {
        setEditData(data);
        setAddress(data?.address);
        setOldImg(data?.images);
        data?.introduction && setIntro(data?.introduction);
    }, [data]);
    useEffect(() => {
        dispatch(showWaiting());
        getAddressContent(address)
            .then((res) => {
                setTextAddress(res);
            })
            .finally(() => dispatch(hideWaiting()));
    }, [address]);

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed w-full inset-0 z-10"
                    onClose={() => {
                        setShow && setShow(false);
                    }}
                >
                    <div className="min-h-screen px-16 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 blur backdrop-blur-sm"/>
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
                                className=" relative inline-block w-1/2 h-[90vh] p-8 my-8 overflow-auto text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Thay đổi thông tin dịch vụ
                                </Dialog.Title>
                                <div className="mt-2">
                                    {/*content*/}
                                    <ModalAddress show={showModalAddress} setShow={setShowModalAddress}
                                                  onChange={setAddress} defaultValue={address}/>
                                    <ModalIntroduction show={showModalIntro} setShow={setShowModalIntro} onSave={setIntro} defaultData={intro}/>
                                    <div>
                                        <div className="">
                                            <label className="block mb-2 text-sm font-medium text-gray-900">Tên dịch
                                                vụ</label>
                                            <input
                                                type="text"
                                                className="input"
                                                defaultValue={editData && editData.name}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    editData && setEditData((pre) => {
                                                        if (pre) return ({...pre, name: e.target.value})
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="">
                                            <label className="block mb-2 text-sm font-medium text-gray-900">Nội dung mô tả</label>
                                            <button
                                                className={"py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"}
                                                onClick={() => {
                                                    setShowModalIntro(true);
                                                }}>{"Chỉnh sửa nội dung mô tả"}</button>
                                        </div>
                                        <div className="">
                                            <label className="block mb-2 text-sm font-medium text-gray-900">Địa
                                                chỉ</label>
                                            <button
                                                className={"py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"}
                                                onClick={() => {
                                                    setShowModalAddress(true);
                                                }}>{textAddress || "Chọn địa chỉ..."}</button>
                                        </div>

                                        <div className="">
                                            <label className="block mb-2 text-sm font-medium text-gray-900">Số điện
                                                thoại</label>
                                            <input
                                                type="string"
                                                className="input"
                                                defaultValue={editData && editData.phone}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    editData && setEditData((pre) => {
                                                        if (pre) return ({...pre, phone: e.target.value});
                                                    })
                                                }}
                                            />
                                        </div>

                                        <div className="">
                                            <label
                                                className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                            <input
                                                type="email"
                                                className="input"
                                                defaultValue={editData && editData.email}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    editData && setEditData((pre) => {
                                                        if (pre) return ({...pre, email: e.target.value});
                                                    })
                                                }}
                                            />
                                        </div>

                                        <div className="flex justify-start gap-16 items-center">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900">Giờ hoạt
                                                    động</label>
                                                <TimePicker defaultHour={"08"} defaultMin={"00"} defaultAP={"am"}
                                                            onChange={(value) => {
                                                                editData && setEditData((pre) => {
                                                                    if (pre) return ({...pre, openTime: value});
                                                                })
                                                            }}/>
                                            </div>
                                            <div className={""}>
                                                <label className="block text-sm font-medium text-gray-900">Đến</label>
                                                <TimePicker defaultHour={"10"} defaultMin={"00"} defaultAP={"pm"}
                                                            onChange={(value: string) => {
                                                                editData && setEditData((pre) => {
                                                                    if (pre) return ({...pre, closeTime: value});
                                                                })
                                                            }}
                                                />
                                            </div>

                                        </div>
                                        <div className="flex justify-start items-center gap-16">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900">Tầm
                                                    giá</label>
                                                <input
                                                    type="number"
                                                    className="input"
                                                    step={1000}
                                                    defaultValue={editData && editData.minPrice}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                        editData && setEditData((pre) => {
                                                            if (pre) return ({
                                                                ...pre,
                                                                minPrice: parseInt(e.target.value)
                                                            });
                                                        })
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    className="block mb-2 text-sm font-medium text-gray-900">Đến</label>
                                                <input
                                                    type="number"
                                                    className="input"
                                                    step={1000}
                                                    defaultValue={editData && editData.maxPrice}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                        editData && setEditData((pre) => {
                                                            if (pre) return ({
                                                                ...pre,
                                                                maxPrice: parseInt(e.target.value)
                                                            });
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="">
                                            <label className="block mb-2 text-sm font-medium text-gray-900">Lĩnh
                                                vực</label>
                                            <div className="">
                                                <Dropdown

                                                    defaultValue={editData?.category}
                                                    items={undefined}
                                                    onChange={(value) => {

                                                    }}/>
                                            </div>
                                        </div>
                                        <div className="">
                                            <label className="block mb-2 text-sm font-medium text-gray-900">Hình
                                                ảnh</label>
                                            <div className={'w-full'}>
                                                <div className={'my-10 flex flex-wrap justify-center gap-2'}>
                                                    {oldImg && oldImg.map((data, index) =>
                                                        <ImageControl key={index} url={data.url} onDelete={() => {
                                                            setOldImg((pre) => {
                                                                if(pre) return pre.filter((v) => v != data)
                                                            })
                                                        }}/>)}
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
                                                    setShow && setShow(false);
                                                    dispatch(showWaiting());
                                                    submitChangeService(editData, oldImg, newImg, intro)
                                                        ?.then((res)=>{
                                                            toastSuccess("Cập nhật thành công!");
                                                        })
                                                        .catch()
                                                        .finally(()=>dispatch(hideWaiting()))
                                                }
                                                }
                                            >
                                                Chỉnh sửa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}