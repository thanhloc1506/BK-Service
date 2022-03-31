import {Dialog, Listbox, Transition} from "@headlessui/react";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import axios from "axios";
import {ADDRESS_API_URL} from "../../constants/common";
import {ModalConfirm} from "./ModalConfirm";
import {Address} from "../../apis/common/Address";
import axiosClient from "../../apis/axios";
import {hideWaiting, showWaiting} from "../../redux/slices/loading";
import {toastError, toastSuccess} from "../../utils/toast";
import {updateProfile} from "../../redux/slices/auth";
import {PInProfile} from "../../apis/package/in/PInProfile";

interface Quan{
    readonly district_id: string;
    readonly district_name: string;
}
interface Phuong{
    readonly ward_name: string;
    readonly ward_id: string;
}
export interface ModalAddressProps {
    show: boolean;
    setShow: (b: boolean)=>void;
    onChange?: (value: Address) => void;
}

const fetchQuan = async () => {
    try {
        const quan = await axios.get(ADDRESS_API_URL + "/province/district/79");
        return quan.data.results;
    } catch (err) {
        throw err;
    }
}

const fetchPhuong = async (id: string) => {
    try {
        const quan = await axios.get(ADDRESS_API_URL + "/province/ward/" + id);
        return quan.data.results;
    } catch (err) {
        throw err;
    }
}

const apiChangeAddress = async (data: Address)=>{
    try {
        const res = await axiosClient.put<PInProfile>("user/update-profile", {address: data});
        return res.data.enterprise;
    }
    catch (e: any) {
        throw e.message;
    }
}

export const ModalAddress = ({show, onChange, setShow}: ModalAddressProps) => {
    const dispatch = useDispatch();
    const [openConfirm, setOpenConfirm] = useState(false);
    // const [isOpen, setOpen] = useState(false);
    const [quan, setQuan] = useState<Quan>();
    const [phuong, setPhuong] = useState<Phuong>();
    const [detail, setDetail] = useState<string>("");

    const [dataQuan, setDataQuan] = useState<Array<Quan>>([]);
    const [dataPhuong, setDataPhuong] = useState<Array<Phuong>>([]);
    // modal confirm
    const [title, setTitle] = useState("");


    const onConfirmChange = () => {

        setOpenConfirm(true);
    }

    const changeAddress = () => {
        setOpenConfirm(false);
        if (quan && phuong) {
            const data: Address = {
                province: 79,
                district: parseInt(quan.district_id),
                village: parseInt(phuong.ward_id),
                detail: detail
            };
            onChange && onChange(data);
        }
        closeModal();
    }

    // useEffect(() => {
    //     setOpen(show);
    // }, [show]);

    useEffect(() => {
        dispatch(showWaiting());
        fetchQuan().then((res) => {
            setDataQuan(res);
        }).finally(()=>dispatch(hideWaiting()));
    }, [])

    useEffect(() => {
        if (quan && quan.district_id != "") {
            fetchPhuong(quan.district_id).then(res => {
                setDataPhuong(res);
                if (res.length > 0) setPhuong(res[0]);
            })
        }
    }, [quan])

    const cancelChangeAddress = () => {
        closeModal();
        setOpenConfirm(false);
    }

    const closeModal = () => {
        setShow(false)
    }

    const openModal = () => {
        setShow(true)
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}
            >
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => {
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
                            <Dialog.Overlay className="fixed inset-0 backdrop-blur bg-white/30"/>
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
                                className="inline-block w-full max-w-md p-6 my-8 overflow-visible text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Đổi địa chỉ
                                </Dialog.Title>
                                <ModalConfirm onOk={changeAddress} onCancel={cancelChangeAddress}
                                              title={"Bạn có muốn đổi sang địa chỉ này không?"} show={openConfirm}
                                              setShow={setOpenConfirm}/>
                                <div className="mt-2 flex justify-between align-center z-10">
                                    <span className={'align-middle self-center'}>Quận</span>
                                    <div className="w-72 ">
                                        <Listbox value={quan} onChange={(e) => {
                                            setQuan(e);
                                        }}>
                                            <div className="relative mt-1">
                                                <Listbox.Button
                                                    className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                                    <span
                                                        className="block truncate">{quan ? quan.district_name : "Chọn Quận"}</span>
                                                    <span
                                                        className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
                                                    <Listbox.Options
                                                        className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10 overflow-auto">
                                                        {dataQuan.map((quan, quanIdx) => (
                                                            <Listbox.Option
                                                                key={quanIdx}
                                                                className={({active}) =>
                                                                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                                                        active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                                                                    }`
                                                                }
                                                                value={quan}
                                                            >
                                                                {({selected}) => (
                                                                    <>
                                                                          <span
                                                                              className={`block truncate ${
                                                                                  selected ? 'font-medium' : 'font-normal'
                                                                              }`}
                                                                          >
                                                                            {quan.district_name || "Quận"}
                                                                          </span>
                                                                        {selected ? (
                                                                            <span
                                                                                className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                              <CheckIcon className="w-5 h-5"
                                                                                         aria-hidden="true"/>
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
                                <div className="mt-2 flex justify-between align-center">
                                    <span className={'align-middle self-center'}>Huyện </span>
                                    <div className="w-72 ">
                                        <Listbox value={phuong} onChange={(p) => {
                                            setPhuong(p);
                                        }}>
                                            <div className="relative mt-1">
                                                <Listbox.Button
                                                    className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                                    <span
                                                        className="block truncate">{phuong ? phuong.ward_name : "Chọn Phường"}</span>
                                                    <span
                                                        className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
                                                    <Listbox.Options
                                                        className="absolute overflow-auto w-full py-1 mt-1 text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {dataPhuong.map((phuong, phuongIdx) => (
                                                            <Listbox.Option
                                                                key={phuongIdx}
                                                                className={({active}) =>
                                                                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                                                        active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                                                                    }`
                                                                }
                                                                value={phuong}
                                                            >
                                                                {({selected}) => (
                                                                    <>
                                                                          <span
                                                                              className={`block truncate ${
                                                                                  selected ? 'font-medium' : 'font-normal'
                                                                              }`}
                                                                          >
                                                                            {phuong.ward_name}
                                                                          </span>
                                                                        {selected ? (
                                                                            <span
                                                                                className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                              <CheckIcon className="w-5 h-5"
                                                                                         aria-hidden="true"/>
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
                                <div className="mt-2 flex justify-between align-center">
                                    <span className={'align-middle self-center'}>Chi tiết </span>
                                    <div className={'w-72'}>
                                        <textarea className={'float-left w-full p-2'}
                                                  onChange={(e: any) => setDetail(e.target.value)}/>
                                    </div>

                                </div>
                                <div className={'flex justify-between px-8'}>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={closeModal}
                                        >
                                            Hủy
                                        </button>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={onConfirmChange}
                                        >
                                            Cập nhật
                                        </button>
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