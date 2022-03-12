import React from "react";
import Navbar from "../../components/layouts/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SidebarEnterprise from "../../components/enterprise/SidebarEnterprise";
import AllServices from "../../components/enterprise/AllServices";
import AddService from "../../components/enterprise/AddService";
import ManageService from "../../components/enterprise/ManageService";
import Premium from "../../components/enterprise/Premium";

const EHomepage: React.FC = () => {
  const enterprise = useSelector((state: RootState) => state.enterprise);
  return (
    <>
      <div className="fixed w-screen">
        <Navbar />
      </div>
      <div className="h-[90vh] pt-[10vh]">
        <div className="grid grid-cols-5 bg-gray-light">
          <div className="col-span-1 fixed w-1/5">
            <SidebarEnterprise page={enterprise.page} />
          </div>
          <div className="col-span-4 pl-[25%] w-[125%] min-h-[90vh]">
            {enterprise.page === "manage" ? (
              <ManageService />
            ) : enterprise.page === "all" ? (
              <AllServices />
            ) : enterprise.page === "add" ? (
              <AddService />
            ) : (
              <Premium />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EHomepage;
