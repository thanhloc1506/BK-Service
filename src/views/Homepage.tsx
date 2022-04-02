import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Pagination from "../components/layouts/Pagination/Pagination";
import SideBarHomePage from "../components/layouts/SideBarHomePage";
import SingleCard from "../components/services/SingleCard";
import { getAllServices, getFollowService } from "../redux/slices/service";
import { RootState } from "../redux/store";

const Homepage: React.FC = () => {
  useEffect(() => {
    console.log("hello Homepage");
  }, []);

  const serviceState = useSelector((state: RootState) => state.service);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      // await dispatch(getAllServices());
      await dispatch(getFollowService());
    }
    fetchData();
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <div className="bg-slate-100 min-h-screen h-fit">
      <Navbar />
      <div className="grid grid-cols-5 pb-12 h-auto">
        <div className="p-5 mt-5"></div>
        <div className="p-5 mt-5 fixed w-1/5 top-24">
          <SideBarHomePage />
        </div>
        <div className="col-span-4 mt-34 ml-20">
          {serviceState.serviceLoading ? (
            "loading..."
          ) : (
            <div className="grid grid-cols-3 gap-8 mb-5">
              {serviceState.services?.map((service: any, index: number) => (
                <div key={index}>
                  <SingleCard service={service} />
                </div>
              ))}
            </div>
          )}
          {serviceState.services.lenght > 9 ? (
            <div className="flex justify-end pr-20 mt-10">
              <Pagination itemsPerPage={4} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
