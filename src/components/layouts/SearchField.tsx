import React from "react";
import {BsSearch} from "react-icons/bs";

export const SearchField = ()=>{
    return <div className={'px-4 py-4 bg-gray-100 my-5 flex w-full justify-center items-center rounded'}>
        <div className={'px-4'}>
            <BsSearch/>
        </div>
        <input className={'w-120 outline-none bg-none bg-transparent'} type={'search'} placeholder="Search..."/>
    </div>
}