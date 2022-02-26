import React, {useState} from 'react';
import Navbar from "../../components/layouts/Navbar";
import SideBar from "../../components/layouts/SideBar";
import {Link, Route, Routes} from "react-router-dom";
import {FaChartLine} from "react-icons/fa";
import {BsListNested} from "react-icons/bs";

export const Admin = () => {
    const [curIndex, setCurIndex] = useState(0);
    // let url = useLocation();
    return (
        <div>
            <Navbar/>
            <div className={'flex h-full'}>
                <div className={'w-1/5 h-full bg-gray-200'}>
                    <div className={''}>
                        <h2 className={'text-sky-500 text-2xl font-semibold m-5'}>Danh mục</h2>
                        <div className={'bg-gray-300 h-0.5 mb-5'}></div>
                    </div>
                    <SideBar>
                        <SideBar.Element onClick={() => {
                        }}>
                            <Link to={"manage"}>
                                <div className={"flex p-4"}>
                                    <FaChartLine className={"mr-5 text-sky-500 text-xl"}/>
                                    <h1 className={"mr-5 text-sky-500"}>Thống kê</h1>
                                </div>
                            </Link>
                        </SideBar.Element>
                        <SideBar.Element>
                            <Link to={"all-service"}>
                                <div className={'flex p-4'}>
                                    <BsListNested className={"mr-5 text-sky-500 text-xl"}/>
                                    <h1 className={"mr-5 text-sky-500"}>Danh sách User</h1>
                                </div>
                            </Link>
                        </SideBar.Element>
                        <SideBar.Element>
                            <Link to={"add-service"}>
                                <div className={'flex p-4'}>
                                    <BsListNested className={"mr-5 text-sky-500 text-xl"}/>
                                    <h1 className={"mr-5 text-sky-500"}>Danh sách doanh nghiệp </h1>
                                </div>
                            </Link>
                        </SideBar.Element>
                    </SideBar>
                </div>
                <div>
                    <Routes>
                        <Route path={"/"} element={<h1>manage</h1>}/>
                        <Route path={"manage"} element={<h1>manage</h1>}/>
                        <Route path={"all-service"} element={<h1>all-service</h1>}/>
                        <Route path={"add-service"} element={<h1>add-service</h1>}/>
                        <Route path={"premium"} element={<h1>premium</h1>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}