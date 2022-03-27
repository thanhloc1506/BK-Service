import React from "react";
import Navbar from "../components/layouts/Navbar";
import SidebarProfile from "../components/profile/SidebarProfile";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import History from "../components/profile/History";
import {PageEnterprise} from "../redux/slices/enterprise";
import {InfoEnterprise} from "../components/profile/InfoEnterprise";
import AddService from "../components/enterprise/AddService";
import ManageService from "../components/enterprise/ManageService";
import AllServices from "../components/enterprise/AllServices";
import Premium from "../components/enterprise/Premium";

const Profile: React.FC = () => {
    const enterpriseProfile = useSelector((state: RootState) => state.enterpriseProfile);
    return (
        <>
                <Navbar/>
            <div className="h-full pt-[96px]">
                <div className="grid grid-cols-5 bg-gray-light">
                    <div className="col-span-1 fixed w-1/5 h-full bg-white">
                        <SidebarProfile page={enterpriseProfile.page}/>
                    </div>
                    <div className="col-span-4 pl-[25%] w-[125%] min-h-[90vh]">
                        {enterpriseProfile.page === "manage" ? (
                            <ManageService/>
                        ) : enterpriseProfile.page === "all" ? (
                            <AllServices/>
                        ) : enterpriseProfile.page === "add" ? (
                            <AddService/>
                        ) : enterpriseProfile.page === "premium" ? (
                            <Premium/>
                        ) : (
                            <InfoEnterprise/>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
