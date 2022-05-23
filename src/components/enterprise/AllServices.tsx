import React, { useEffect, useState } from "react";
import axiosClient from "../../apis/axios";
import { PInAllServices } from "../../apis/package/in/PInAllServices";
import { ModalEditService } from "./ModalEditService";
import { Service as ServiceType } from "../../apis/common/Service";
import { useDispatch } from "react-redux";
import { hideWaiting, showWaiting } from "../../redux/slices/loading";
import Service from "./Service";
import service from "../../redux/slices/service";

const AllServices = () => {
  const [services, setServices] = useState<ServiceType[] | undefined>();
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [curServiceEdit, setCurServiceEdit] = useState<
    ServiceType | undefined
  >();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showWaiting());
    axiosClient
      .get<PInAllServices.Data>("/enterprise/all-services")
      .then((res) => {
        console.log(res);
        setServices(res.data.services);
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(hideWaiting()));
  }, [dispatch]);

  const editService = (data: ServiceType) => {
    setCurServiceEdit(data);
    setShowModalEdit(true);
  };

  const deleteService = async (serviceId: string) => {
    setServices(
      services?.filter(
        (service: ServiceType | undefined) => service?._id !== serviceId
      )
    );
    try {
      const response = await axiosClient.post(
        `http://127.0.0.1:3007/service/${serviceId}/delete`
      );
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="bg-gray-light h-fit">
      <ModalEditService
        show={showModalEdit}
        setShow={setShowModalEdit}
        data={curServiceEdit}
      />
      <div className="h-12 bg-white 2xl:pt-10 xl:pt-8 lg:pt-0 pb-14 pl-20 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-solid font-medium 2xl:text-xl xl:text-lg">
          Tất cả dịch vụ
        </p>
      </div>
      <div className="px-10 2xl:pt-12 xl:pt-8 lg:pt-6 pb-16">
        <div className="grid grid-cols-3 gap-8 h-full">
          {services &&
            services.map((service, i) => {
              return (
                <div key={i}>
                  <Service
                    data={service}
                    onBtnClick={() => {
                      editService(service);
                    }}
                    isEnterPrisePage
                    deleteService={deleteService}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AllServices;
