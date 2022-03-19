import React from "react";
import {PInSearch} from "../../apis/package/in/PInSearch";

export interface SearchResultItemProp{
    data?: PInSearch.Service;
}

export const SearchResultItem = ({data}: SearchResultItemProp) => {
    // alert(JSON.stringify(data))
    return (
        <div className={`flex p-2 m-2 hover:bg-blue-200 transition-all duration-300 cursor-pointer rounded`}>
            <div className={''}>
                <img
                    src={"https://elead.com.vn/wp-content/uploads/2020/04/anh-dep-hoa-huong-duong-va-mat-troi_022805970-1-1181x800-6.jpg"}
                    className={'w-32 h-32 rounded'}/>
            </div>
            <div className={'ml-4'}>
                <div>
                    <h1 className={'font-bold'}>{data?.name}</h1>
                </div>
                <div>
                    <p>{data?.email}</p>
                </div>
                <div className={'italic text-sm'}>
                    <p>Địa chỉ: </p>
                </div>
                <div>
                    <p className={'italic text-sm'}>Đánh giá: </p>
                </div>
            </div>
        </div>
    )
}