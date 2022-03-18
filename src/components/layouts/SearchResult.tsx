import React, {Fragment} from "react";
import {Menu, Transition} from '@headlessui/react'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {SearchResultItem} from "./SearchResultItem";

export const SearchResult = ({show}: any) => {
    const state = useSelector((state: RootState) => state.search);

    return (
        <div className="text-center fixed top-24 w-1/2 h-3/4 overflow-scroll" hidden={!state.isShowResult}>
            <Menu as="div" className="relative text-left inline-block w-full ">
                <Transition
                    show={state.isShowResult}
                    as={Fragment}
                    enter="transition ease-out duration-500"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    appear
                >
                    {/*<Loading show={state.status !== "loading"}/>*/}
                    <div className={'w-full transition-all duration-300'}>
                        {state.status === "loading" ? <div className={'flex justify-center items-center p-10'}>
                            <svg className="animate-spin h-10 w-10 bg-gray-100 self-center" viewBox="0 0 24 24">
                            </svg>
                        </div> : (
                            <Menu.Items
                                className="right-0 py-2 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div>
                                    <Menu.Item>
                                        {({active}) => (
                                            <SearchResultItem />
                                        )}
                                    </Menu.Item>
                                </div>
                                <div>
                                    <Menu.Item>
                                        {({active}) => (
                                            <SearchResultItem/>
                                            // <button
                                            //     className={`${
                                            //         active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                            //     } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                            // >
                                            //     {active ? (
                                            //         <BiEdit
                                            //             className="w-5 h-5 mr-2"
                                            //             aria-hidden="true"
                                            //         />
                                            //     ) : (
                                            //         <BiEdit
                                            //             className="w-5 h-5 mr-2"
                                            //             aria-hidden="true"
                                            //         />
                                            //     )}
                                            //     {state.dataSearch.data}
                                            // </button>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div>
                                    <Menu.Item>
                                        {({active}) => (
                                            <SearchResultItem/>
                                            // <button
                                            //     className={`${
                                            //         active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                            //     } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                            // >
                                            //     {active ? (
                                            //         <BiEdit
                                            //             className="w-5 h-5 mr-2"
                                            //             aria-hidden="true"
                                            //         />
                                            //     ) : (
                                            //         <BiEdit
                                            //             className="w-5 h-5 mr-2"
                                            //             aria-hidden="true"
                                            //         />
                                            //     )}
                                            //     {state.dataSearch.data}
                                            // </button>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div>
                                    <Menu.Item>
                                        {({active}) => (
                                            <SearchResultItem/>

                                        )}
                                    </Menu.Item>
                                </div>
                                <Menu.Item>
                                    {({active}) => (
                                        <SearchResultItem/>

                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        )}
                    </div>
                </Transition>
            </Menu>

        </div>

    )
}