import React from "react";
import UserTable from "../admin/UserTable";

const ManageService = () => {
  return (
    <div>
      <div className="bg-white p-8  border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-400 font-medium text-xl">
            Quản lí
        </p>
      </div>
      <div>
        <div className={'flex justify-center mt-3 gap-10'}>
            <div className={'block flex flex-col justify-center items-center gap-2 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300'}>
                <div className={'w-20 h-20'}>
                    <img src={require('../../assets/enterprise/service-analysis.png')} className={'w-full h-full'} alt=""/>
                </div>
                <div>
                    <p className={'text-2xl font-bold tracking-tight text-gray-900'}>1000</p>
                </div>
                <div>
                    <p className={'text-cyan-700'}>Số lượng dịch vụ</p>
                </div>
            </div>
            <div className={'block flex flex-col justify-center items-center gap-2 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300'}>
                <div className={'w-20 h-20'}>
                    <img src={require('../../assets/enterprise/follow-analysis.png')} className={'w-full h-full'} alt=""/>
                </div>
                <div>
                    <p className={'text-2xl font-bold tracking-tight text-gray-900'}>1000</p>
                </div>
                <div>
                    <p className={'text-cyan-700'}>Số người theo dõi</p>
                </div>
            </div>
            <div className={'block flex flex-col justify-center items-center gap-2 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300'}>
                <div className={'w-20 h-20'}>
                    <img src={require('../../assets/enterprise/trade-analysis.png')} className={'w-full h-full'} alt=""/>
                </div>
                <div>
                    <p className={'text-2xl font-bold tracking-tight text-gray-900'}>1000</p>
                </div>
                <div>
                    <p className={'text-cyan-700'}>Số lần giao dịch</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ManageService;
