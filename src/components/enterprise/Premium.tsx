import React, {useState} from "react";
import {Offer} from "./Offer";
import {PremiumConfig} from "../../constants/common";
import {ModalConfirm} from "../common/ModalConfirm";
import {useDispatch} from "react-redux";
import {hideWaiting, showWaiting} from "../../redux/slices/loading";
import axiosClient from "../../apis/axios";


const Premium = () => {
    const file: Record<string, PremiumConfig> = require("../../assets/json/premium.json");
    const [showModal, setShowModal] = useState(false);
    const [offerBuy, setOfferBuy] = useState<string|undefined>();
    const dispatch = useDispatch();
    const handleBuyOffer = (idOffer: string|undefined)=>{
        if(!idOffer) return;
        dispatch(showWaiting());
        axiosClient.post("/enterprise/payment-url", {
            idOffer: idOffer
        }).then(response=>{
            const url = response.data.url;
            window.location.href = url;
        }).finally(()=>dispatch(hideWaiting()));
    }
  return (
    <div>
      <div className="h-12 bg-white py-8 pb-20 pl-10 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-400 font-medium text-xl">
          Gói dịch vụ & bảng giá
        </p>
      </div>
        <ModalConfirm
            onOk={() => {
                handleBuyOffer(offerBuy);
                setShowModal(false);
            }}
            onCancel={() => {
                setShowModal(false)
            }}
            title={"Bạn muốn mua gói này chứ?"}
            show={showModal}
            setShow={setShowModal}/>
      <div className="p-8">
        <div className="grid grid-cols-3 gap-10">
          {/* Free */}
            {file && Object.entries(file).map((e)=>{
                return <Offer data={e[1]} key={e[0]} id={e[0]} onClick={()=> {
                    setOfferBuy(e[0]);
                    setShowModal(true);
                }}/>
            })}
        </div>
      </div>
    </div>
  );
};

export default Premium;
