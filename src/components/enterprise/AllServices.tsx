import React, { useEffect, useState } from "react";
import axiosClient from "../../apis/axios";
import { PInAllServices } from "../../apis/package/in/PInAllServices";
import { ModalEditService } from "./ModalEditService";
import { Service as ServiceType } from "../../apis/common/Service";
import { useDispatch } from "react-redux";
import { hideWaiting, showWaiting } from "../../redux/slices/loading";
import Service from "./Service";
import service from "../../redux/slices/service";
import { PInScore } from "../../apis/package/in/PInScore";

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
      .then(async (res) => {
        let servicesRes: any = [];
        for (const service of res.data.services) {
          const enterpriseInfo = await axiosClient.get(
            `/enterprise/${service.enterprise}`
          );

          const scoresResponse = await axiosClient.get<PInScore>(
            `service/${service._id}/scores`
          );

          const scores = scoresResponse.data?.score;

          const ratingScore =
            (32 * scores[0] +
              22 * scores[1] +
              19 * scores[2] +
              11 * scores[3] +
              16 * scores[4]) /
            100;

          const rankingScore =
            (service.blogScore + (2.5 * (service.cmtScore + ratingScore)) / 2) /
            3.5;

          const sortScore =
            (service.blogScore + (2.5 * (service.cmtScore + ratingScore)) / 2) /
              3.5 +
            parseInt(enterpriseInfo.data.enterprise.premium ?? "0");

          servicesRes.push({
            ...service,
            enterprise: enterpriseInfo.data.enterprise,
            ratingScore: ratingScore.toFixed(1),
            sortScore: sortScore.toFixed(1),
            rankingScore: rankingScore.toFixed(1),
          });
        }

        setServices(servicesRes);
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
        `/service/${serviceId}/delete`
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
