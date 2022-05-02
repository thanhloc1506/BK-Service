import React, { useEffect } from "react";
import { getFollowService } from "../../redux/slices/service";
import { RootState } from "../../redux/store";
import Pagination from "../layouts/Pagination/Pagination";
import Service from "../services/Service";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoveService = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getFollowService());
    };
    fetchData();
  });

  const serviceState = useSelector((state: RootState) => state.service);

  return (
    <div className="bg-gray-light h-fit">
      <div className="h-12 bg-white pt-12 pb-14 pl-20 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-solid font-medium 2xl:text-xl xl:text-lg">
          Dịch vụ yêu thích
        </p>
      </div>
      <div className="px-10 2xl:pt-12 xl:pt-8 pb-16">
        <>
          <div className="grid grid-cols-3 gap-8 mb-5">
            {serviceState.followService?.map((service: any, index: number) => (
              <div className="flex justify-center" key={index}>
                <Service
                  data={service}
                  btnText={"Truy cập"}
                  onBtnClick={() => navigate(`/detailService/${service._id}`)}
                />
              </div>
            ))}
          </div>
          {serviceState.followService &&
          serviceState.followService?.length > 9 ? (
            <div className="flex justify-end pr-20 mt-10">
              <Pagination itemsPerPage={4} />
            </div>
          ) : null}
        </>
      </div>
    </div>
  );
};

export default LoveService;
