import React, {useEffect, useState} from 'react';
import Navbar from "../../components/layouts/Navbar";
import {useLocation} from "react-router-dom";
import axiosClient from "../../apis/axios";
import {set} from "js-cookie";
import {useDispatch} from "react-redux";
import {hideWaiting, showWaiting} from "../../redux/slices/loading";
import classes from "*.module.css";
export const PaymentResult = ()=>{
    const location = useLocation();
    const dispatch = useDispatch();
    const [success, setSuccess] = useState<boolean|null>(null);
    useEffect(()=>{
        if(location){
            dispatch(showWaiting());
            let data = Object.fromEntries(new URLSearchParams(location.search));
            axiosClient.post("/enterprise/vnp_ipn_client", {
                data: data
            })
                .then(res=>setSuccess(true))
                .catch(r=>setSuccess(false))
                .finally(() =>dispatch(hideWaiting()));
        }
    }, [location]);

    return <>
    <Navbar/>
        <div className={`pt-40 text-center text-2xl ${success? 'text-green-500': 'text-red-500'}`}>
            {success?"Thanh toán thành công":"Thanh toán thất bại"}
        </div>
    </>
}