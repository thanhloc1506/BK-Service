import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowService } from "../../redux/slices/service";
import { RootState } from "../../redux/store";
import Pagination from "../layouts/Pagination/Pagination";
import SingleCard from "../services/SingleCard";

const LoveService = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getFollowService());
    };
    fetchData();
  });

  const serviceState = useSelector((state: RootState) => state.service);

  return (
    <div className="bg-gray-light h-fit">
      <div className="h-12 bg-white py-8 pb-20 pl-20 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-400 font-medium text-3xl">Dịch vụ yêu thích</p>
      </div>
      <div className="px-10 pt-12 pb-16">
        <>
          <div className="grid grid-cols-3 gap-8 mb-5">
            {serviceState.followService?.map((service: any, index: number) => (
              <div key={index}>
                <SingleCard service={service} isLoveService />
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
