import React, {useEffect} from "react";
import {PremiumConfig} from "../../constants/common";
import {GrClose} from "react-icons/gr";
import {IoClose} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {hideWaiting, showWaiting} from "../../redux/slices/loading";
import axiosClient from "../../apis/axios";
import {toastSuccess} from "../../utils/toast";

interface OfferProps{
    id: string;
    data: PremiumConfig;
    onClick?: ()=>void;
}

export const Offer = ({id, data, onClick}: OfferProps) => {
    const state = useSelector((state: RootState)=>state.user);
    const dispatch = useDispatch();
    useEffect(()=>{

    }, [])
    const onClickBuyOffer = ()=>{
        onClick && onClick();
        // dispatch(showWaiting());
        // axiosClient.post("/enterprise/buyPremium", {id})
        //     .then((res)=>{
        //         toastSuccess("Bạn đã mua thành công");
        //     })
        //     .catch(e=>{
        //
        //     })
        //     .finally(()=>{
        //         dispatch(hideWaiting());
        //     })
    }
    return (
        <div className="relative w-full max-w-sm sm:max-w-none lg:col-span-3 xl:col-span-1">
            <div
                className="relative bg-gradient-to-b from-teal-400 to-gray-900 sm:to-teal-400/20 xl:to-gray-900 rounded-xl p-px sm:shadow-md">
                <div className="rounded-xl bg-gradient-to-b from-cyan-400 to-gray-900 pt-16 pb-10 sm:py-12 xl:pt-16 xl:pb-8">
                    <div
                        className="sm:grid sm:grid-cols-2 lg:grid-cols-[auto,1fr] sm:items-center sm:gap-x-10 md:gap-x-24 lg:gap-x-16 xl:flex xl:flex-col px-8 md:px-12 xl:px-14 text-black">
                        <div>
                            <h2 className="font-semibold uppercase tracking-wide text-center mb-2">
                              <span className="absolute -top-3 left-0 right-0">
                              <span
                                  className="inline-flex bg-yellow-400 text-gray-900 uppercase text-[0.688rem] leading-4 tracking-widest py-1 px-2 border-t border-b border-transparent rounded-lg">
                                {data.title}
                              </span>
                            </span>
                            </h2>

                            <h3 className="sr-only">Price</h3>
                            <div className="text-base font-medium mb-10 sm:mb-8 lg:mb-10">
                              <span className="flex items-center justify-center">
                                <ins className="text-5xl tracking-tight text-yellow-800 font-extrabold no-underline mx-3">${data.price}</ins>
                                <span>VND</span>
                              </span>
                            </div>

                            <div className="sm:block xl:hidden">
                                <a href="/checkout/aa651062-caee-4517-b83a-d2aed4cd00cc"
                                   className="block mx-auto text-center w-60 md:w-64 xl:w-60 bg-teal-400 text-teal-900 hover:bg-teal-300 rounded-lg font-semibold p-3 mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"></a>
                            </div>
                        </div>

                        <div className="mb-8 sm:mb-0 xl:mb-12 flex flex-col items-center sm:block">
                            <h3 className="sr-only">Features</h3>
                            <ul role="list" className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-1">
                                {data.benefit.map((e, i)=>{
                                    return(
                                        <li className="flex items-center lg:w-64 xl:w-auto" key={i}>
                                            <svg aria-hidden="true" width="12" height="8" fill="none"
                                                 className="text-teal-400 mr-3">
                                                <path d="M1.5 4.5l2.236 2.236a1 1 0 001.467-.056L10.5.5" stroke="currentColor"
                                                      strokeWidth="1.5"
                                                      strokeLinejoin="round"/>
                                            </svg>
                                            {e}
                                        </li>
                                    )
                                })}
                                {data.missing.map((e, i)=>{
                                    return(
                                        <li className="flex items-center lg:w-64 xl:w-auto" key={i}>
                                            <IoClose className={"mr-3 text-red-500 text-teal-400"}/>
                                            {e}
                                        </li>
                                    )
                                })}

                            </ul>
                        </div>

                        <div className="sm:hidden xl:block">
                            {(state.enterprise?.premium && parseInt(state.enterprise.premium) >= parseInt(id))?
                                (<span className={'block italic text-green-200 mx-auto text-center w-60 md:w-64 xl:w-60 font-semibold p-3 mb-6'}>Bạn đang sử dụng gói này</span>):
                                (<button
                                    onClick={onClickBuyOffer}
                                    className="block mx-auto text-center w-60 md:w-64 xl:w-60 bg-teal-400 text-teal-900 hover:bg-teal-300 rounded-lg font-semibold p-3 mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900">Mua ngay</button>)
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}