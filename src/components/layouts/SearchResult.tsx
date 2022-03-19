import React, {Fragment, useEffect, useState} from "react";
import {Menu, Transition} from '@headlessui/react'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {SearchResultItem} from "./SearchResultItem";

export const SearchResult = ({show}: any) => {
    const state = useSelector((state: RootState) => state.search);
    const [localShow, setLocalShow] = useState(true);

    return (
        <div className="text-center fixed top-24 w-1/2 max-h-[70vh] overflow-scroll" hidden={!localShow}>
            <Menu as="div" className="relative text-left inline-block w-full ">
                <Transition
                    show={state.isShowResult && state.status === "loading"}
                    as={Fragment}
                    enter="transition ease-out delay-1000"
                    enterFrom="transform opacity-0 scale-0"
                    enterTo="transform opacity-100 scale-100"
                    afterLeave={()=>{
                        if(!state.isShowResult) setLocalShow(false);
                    }}
                    beforeEnter={()=>{
                        if(state.isShowResult) setLocalShow(true);
                    }}
                >
                    <div className={'flex justify-center fixed top-[10%] left-[50%] transform -translate-x-1/2 items-center p-10 transition-all'}>
                            <svg className="animate-spin h-10 w-10 bg-gray-100 self-center" viewBox="0 0 24 24">
                            </svg>
                    </div>
                </Transition>
                <Transition
                    show={state.isShowResult && state.status !== "loading"}
                    as={Fragment}
                    enter="transition ease-out duration-500 delay-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    appear
                    afterLeave={()=>{
                        if(!state.isShowResult) setLocalShow(false);
                    }}
                    beforeEnter={()=>{
                        if(state.isShowResult) setLocalShow(true);
                    }}
                >
                    {/*<Loading show={state.status !== "loading"}/>*/}
                    <div className={'w-full transition-all duration-300'}>
                        <Menu.Items
                            className="right-0 py-2 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {state.dataSearch ? state.dataSearch.services.map((s) => {
                                return (
                                    <div>
                                        <Menu.Item>
                                            {({active}) => (
                                                <SearchResultItem data={s}/>
                                            )}
                                        </Menu.Item>
                                    </div>
                                )
                            }) : <div className={'p-16 text-center italic text-blue-400 text-2xl'}>Không tìm thấy kết
                                quả</div>}


                        </Menu.Items>
                    </div>
                </Transition>
            </Menu>
        </div>
    )
}