import React, {useEffect, useState} from "react";
import axiosClient from "../../apis/axios";
import {PInAllServices} from "../../apis/package/in/PInAllServices";
import {ModalEditService} from "./ModalEditService";
import {Service as ServiceType} from "../../apis/common/Service";
import {useDispatch} from "react-redux";
import {hideWaiting, showWaiting} from "../../redux/slices/loading";
import Service from "./Service";

const AllServices = () => {
    const [services, setServices] = useState<ServiceType[] | undefined>();
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
    const [curServiceEdit, setCurServiceEdit] = useState<ServiceType | undefined>();
    const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(showWaiting());
    axiosClient.get<PInAllServices.Data>("/enterprise/all-services")
        .then((res)=>{
          console.log(res);
          setServices(res.data.services);
        })
        .catch((err)=>console.log(err))
        .finally(()=>dispatch(hideWaiting()));
  }, [dispatch]);

    const editService = (data: ServiceType) => {
        setCurServiceEdit(data);
        setShowModalEdit(true);
    }
  return (
    <div className="bg-gray-light h-fit">
        <ModalEditService show={showModalEdit} setShow={setShowModalEdit} data={curServiceEdit}/>
      <div className="h-12 bg-white py-8 pb-20 pl-20 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-400 font-medium text-3xl">Tất cả dịch vụ</p>
      </div>
      <div className="px-10 pt-12 pb-16">
        <div className="grid grid-cols-3 gap-8 h-full">
            {services && services.map(service =>{
                return <div>
                    <Service data={service} onBtnClick={()=>{editService(service)}}/>
                </div>
            })}
        </div>
      </div>
    </div>
  );
};

export default AllServices;
