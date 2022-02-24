import React, {useState} from 'react';
import Navbar from "../../components/layouts/Navbar";
import SideBar from "../../components/layouts/SideBar";
import {SiGoogletagmanager} from "react-icons/si";
import {BiBorderAll} from "react-icons/bi";
import {AiOutlinePlusCircle} from "react-icons/ai";
import {IoDiamondOutline} from "react-icons/io5";
import {Link, Route, Routes} from "react-router-dom";

export const Admin = () => {
    const [curIndex, setCurIndex] = useState(0);
    // let url = useLocation();
    return (
        <div>
            <Navbar/>
            <div className={'flex h-full'}>
                <div className={'w-1/5 h-full bg-gray-200'}>
                    <SideBar>
                        <SideBar.Element onClick={() => {
                        }}>
                            <Link to={"manage"}>
                                <div className={"flex p-4"}>
                                    <SiGoogletagmanager className={"mr-5 text-sky-500 text-xl"}/>
                                    <h1 className={"mr-5 text-sky-500"}>Quản lí</h1>
                                </div>
                            </Link>
                        </SideBar.Element>
                        <SideBar.Element>
                            <Link to={"all-service"}>
                                <div className={'flex p-4'}>
                                    <BiBorderAll className={"mr-5 text-sky-500 text-xl"}/>
                                    <h1 className={"mr-5 text-sky-500"}>Tất cả dịch vụ</h1>
                                </div>
                            </Link>
                        </SideBar.Element>
                        <SideBar.Element>
                            <Link to={"add-service"}>
                                <div className={'flex p-4'}>
                                    <AiOutlinePlusCircle className={"mr-5 text-sky-500 text-xl"}/>
                                    <h1 className={"mr-5 text-sky-500"}>Thêm dịch vụ</h1>
                                </div>
                            </Link>
                        </SideBar.Element>
                        <SideBar.Element>
                            <Link to={"premium"}>
                                <div className={'flex p-4'}>
                                    <IoDiamondOutline className={"mr-5 text-sky-500 text-xl"}/>
                                    <h1 className={"mr-5 text-sky-500"}>Premium</h1>
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