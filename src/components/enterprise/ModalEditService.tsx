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

interface IModalEditService {
    data: PInAllServices.Service | undefined;
    onBtnClick?: () => void;
    show: boolean;
    setShow?: (b: boolean) => void;
}

export const ModalEditService = ({data, show, setShow}: IModalEditService) => {
    const dispatch = useDispatch();
    const [editData, setEditData] = useState<PInAllServices.Service | undefined>(data);
    const [categories, setCategories] = useState<PInCategory.Category[] | undefined>();
    const [showModalAddress, setShowModalAddress] = useState(false);
    const [address, setAddress] = useState<Address | undefined>();
    const [textAddress, setTextAddress] = useState<string|undefined>("");
    useEffect(()=>{
        //fetch categories
        dispatch(showWaiting());
        axiosClient.get<PInCategory.Data>("/categories")
            .then((res)=>{
                setCategories(res.data.categories);
            })
            .catch()
            .finally(()=>dispatch(hideWaiting()))
    }, []);
   useEffect(()=>{
       setEditData(data);
       setAddress(data?.address);
   }, [data]);
    useEffect(()=>{
        dispatch(showWaiting());
        getAddressContent(address)
            .then((res)=>{
                setTextAddress(res);
            })
            .finally(()=>dispatch(hideWaiting()));
    }, [address]);
    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed w-full inset-0 z-10 overflow-y-auto"
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
                                className="inline-block w-full max-w-fit p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Thay đổi thông tin dịch vụ
                                </Dialog.Title>
                                <div className="mt-2">
                                    {/*content*/}
                                    <ModalAddress show={showModalAddress} setShow={setShowModalAddress} onChange={setAddress} defaultValue={address}/>
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
                                                <TimePicker defaultHour={"8"} defaultMin={"0"} defaultAP={"am"}
                                                            onChange={(value) => {
                                                                editData && setEditData((pre)=>{
                                                                    if(pre) return ({...pre, openTime: value});
                                                                })
                                                            }}/>
                                            </div>
                                            <div className={""}>
                                                <label className="block text-sm font-medium text-gray-900">Đến</label>
                                                <TimePicker defaultHour={"10"} defaultMin={"0"} defaultAP={"pm"}
                                                            onChange={(value: string) => {
                                                                editData && setEditData((pre)=>{
                                                                    if(pre) return ({...pre, closeTime: value});
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
                                                        editData && setEditData((pre)=>{
                                                            if(pre) return ({...pre, openPrice: parseInt(e.target.value)});
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
                                                        editData && setEditData((pre)=>{
                                                            if(pre) return ({...pre, closePrice: parseInt(e.target.value)});
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

                                        </div>
                                        <div className={'flex justify-center'}>
                                            <button
                                                className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-16 py-2.5"}
                                                onClick={() => {
                                                }
                                                }
                                            >Đăng
                                                kí
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