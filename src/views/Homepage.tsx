import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/layouts/Navbar";
import Pagination from "../components/layouts/Pagination/Pagination";
import SideBarHomePage from "../components/layouts/SideBarHomePage";
import SingleCard from "../components/services/SingleCard";
import { RootState } from "../redux/store";
import {
  deepSearch,
  search,
  setCurrentSearchText,
} from "../redux/slices/search";
import { logout } from "../redux/slices/auth";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Service from "../components/services/Service";

const Homepage: React.FC = () => {
  const searchState = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setCurrentSearchText(""));
    dispatch(deepSearch({text: ""}));
    if (cookies.get("token") == undefined) {
      dispatch(logout());
    }
  }, []);
  return (
    <div className="bg-slate-100 min-h-screen h-fit">
      <Navbar />
      <div className="grid grid-cols-4 pb-12 h-auto">
        <div className="p-5 mt-5"></div>
        <div className="p-5 mt-5 fixed w-full top-[3.5rem] z-[9]">
          <SideBarHomePage />
        </div>
        <div className="col-span-4 mt-40 px-[12%]">
          {searchState.status === "loading" ? (
            ""
          ) : (
            <>
              <div className="grid grid-cols-4 gap-8 mb-5">
                {searchState.dataSearch?.services?.map(
                  (service: any, index: number) => (
                    <div key={index} className={"flex justify-center"}>
                      <Service
                        data={service}
                        btnText={"Truy cập"}
                        onBtnClick={() =>
                          navigate(`/detailService/${service._id}`)
                        }
                      />
                    </div>
                  )
                )}
              </div>
              {searchState.dataSearch ? (
                <div className="flex justify-end pr-20 mt-10">
                  <Pagination itemsPerPage={4} />
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
