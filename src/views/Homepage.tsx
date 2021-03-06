import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/layouts/Navbar";
import Pagination from "../components/layouts/Pagination/Pagination";
import SideBarHomePage from "../components/layouts/SideBarHomePage";
import SingleCard from "../components/services/SingleCard";
import { RootState } from "../redux/store";
import { deepSearch, setCurrentSearchText } from "../redux/slices/search";
import { logout } from "../redux/slices/auth";
import cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Service from "../components/services/Service";

const Homepage: React.FC = () => {
  const searchState = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = Object.fromEntries(new URLSearchParams(location.search));
  useEffect(() => {
    console.log(params);
    dispatch(setCurrentSearchText(params["text"] || ""));
    // console.log("run")

    dispatch(deepSearch({ text: params["text"] || "" }));
    if (cookies.get("token") == undefined) {
      dispatch(logout());
    }
  }, [location]);
  return (
    <div className="bg-slate-100 min-h-screen h-fit">
      <Navbar />
      <div className="grid grid-cols-4 pb-12 h-full">
        <div className="p-5 mt-5"></div>
        <div className="p-5 2xl:mt-5 xl:mt-3 lg:mt-0 fixed flex justify-center w-full top-[3.5rem] z-[9]">
          <SideBarHomePage />
        </div>
        <div className="col-span-4 2xl:mt-40 xl:mt-32 lg:mt-28 px-[12%]">
          {searchState.status === "loading" ? (
            ""
          ) : (
            <>
              <div className="grid grid-cols-4 2xl:gap-8 xl:gap-6 lg:gap-4 mb-5">
                {searchState.dataSearch?.services?.map(
                  (service: any, index: number) => (
                    <div key={service._id} className={"flex justify-center"}>
                      <Service
                        data={service}
                        btnText={"Truy c???p"}
                        onBtnClick={() =>
                          navigate(`/detailService/${service._id}`)
                        }
                      />
                    </div>
                  )
                )}
              </div>
              {searchState.dataSearch ? (
                <div className="flex justify-end mt-10">
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
