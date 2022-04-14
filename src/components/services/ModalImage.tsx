import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useCallback, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {Carousel} from "react-responsive-carousel";

interface ModalImageProps{
    readonly listImages: string[];
    readonly onChangeImage?: (i: number)=>void;
    readonly show?: boolean;
    readonly setShow?: (b: boolean)=>void;
    readonly defaultIndex?: number;
}

export const ModalImage = ({listImages, onChangeImage, show, setShow, defaultIndex}: ModalImageProps) => {
    const dispatch = useDispatch();
    const a = useCallback((node: Carousel)=>{
        node && node.moveTo(defaultIndex);
    }, [defaultIndex]);

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed w-full h-full inset-0 z-10"
                    onClose={() => {
                        setShow && setShow(false);
                    }}
                >
                    <div className="w-full h-screen text-center">
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
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className={'h-full flex justify-center'}>
                                <div
                                    className="w-3/4 m-auto overflow-hidden text-left align-middle transition-all transform shadow-xl">

                                    <div className={'relative bg-white/0'}>
                                        <Carousel showThumbs={false}
                                                  showArrows={true}
                                                  showIndicators={true}
                                                  showStatus={false}
                                                  infiniteLoop={true}
                                                  onChange={onChangeImage}
                                                  ref={a}
                                        >
                                            {listImages.map((e, index)=>{
                                                return <div key={index} className={'h-full rounded-lg overflow-hidden'}>
                                                    <img src={e} className={'w-full h-full rounded-lg'}/>
                                                </div>
                                            })}
                                        </Carousel>
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