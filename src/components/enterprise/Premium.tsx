import React from "react";
import {Offer} from "./Offer";
import {PremiumConfig} from "../../constants/common";

const Premium = () => {
    const file: Record<string, PremiumConfig> = require("../../assets/json/premium.json");
  return (
    <div>
      <div className="h-12 bg-white py-8 pb-20 pl-10 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-400 font-medium text-xl">
          Gói dịch vụ & bảng giá
        </p>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-3 gap-10">
          {/* Free */}
            {file && Object.entries(file).map((e)=>{
                return <Offer data={e[1]} key={e[0]} id={e[0]}/>
            })}

        </div>
      </div>
    </div>
  );
};

export default Premium;
