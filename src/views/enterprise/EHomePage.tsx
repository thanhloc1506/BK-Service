import React from "react";
import Navbar from "../../components/layouts/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SidebarEnterprise from "../../components/enterprise/SidebarEnterprise";
import AllServices from "../../components/enterprise/AllServices";

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
          <div className="col-span-4 pl-[20%] w-[125%] min-h-[90vh]">
            {enterprise.page === "manage" ? null : enterprise.page === "all" ? (
              <AllServices />
            ) : enterprise.page === "add" ? null : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default EHomepage;
