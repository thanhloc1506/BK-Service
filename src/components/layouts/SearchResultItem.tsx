import React, {useEffect, useState} from "react";
import {PInSearch} from "../../apis/package/in/PInSearch";
import {Service} from "../../apis/common/Service";
import {useNavigate} from "react-router-dom";
import {getAddressContent} from "../../utils/getAddressContent";
import axiosClient from "../../apis/axios";
import {AxiosResponse} from "axios";
import {PInScore} from "../../apis/package/in/PInScore";

export interface SearchResultItemProp{
    data?: Service;
}

export const SearchResultItem = ({data}: SearchResultItemProp) => {
    // alert(JSON.stringify(data))
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [score, setScore] = useState(0);
    useEffect(()=>{
        axiosClient.get<PInScore>(`service/${data?._id}/scores`)
            .then(res=>{
                setScore(res.data.score[5]);
            })
    }, [data]);
    useEffect(()=>{
        getAddressContent(data?.address).then(res=>setAddress(res||""));
    }, [data?.address])
    return (
        <div className={`flex p-2 m-2 hover:bg-blue-200 transition-all duration-300 cursor-pointer rounded`}
            onClick={()=>{
                navigate(`/detailService/${data?._id}`)}
            }
        >
            <div className={''}>
                <img
                    src={data && data.images && data.images.length>0 ? data?.images[0].url: ""}
                    className={'w-32 h-32 rounded'}/>
            </div>
            <div className={'ml-4'}>
                <div>
                    <h1 className={'font-bold'}>{data?.name}</h1>
                </div>
                <div className={'italic text-sm'}>
                    <p>Email: {data?.email}</p>
                </div>
                <div className={'italic text-sm'}>
                    <p>Điện thoại: {data?.phone}</p>
                </div>
                <div className={'italic text-sm'}>
                    <p>Địa chỉ: {address} </p>
                </div>
                <div>
                    <p className={'italic text-sm'}>Đánh giá: {score}/10.0</p>
                </div>
            </div>
        </div>
    )
}