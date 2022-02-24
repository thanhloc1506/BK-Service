import React from "react";
import Navbar from "../components/layouts/Navbar";
import InfoUser from "../components/profile/InfoUser";
import SidebarProfile from "../components/profile/SidebarProfile";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ScheduleService from "../components/profile/ScheduleService";
import LoveService from "../components/profile/LoveService";
import Notifications from "../components/profile/Notifications";
import History from "../components/profile/History";

const Profile: React.FC = () => {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 bg-gray-light">
        <div className="col-span-1">
          <SidebarProfile page={userProfileState.page} />
        </div>
        <div className="col-span-4">
          {userProfileState.page === "info" ? (
            <InfoUser />
          ) : userProfileState.page === "schedule" ? (
            <ScheduleService />
          ) : userProfileState.page === "love" ? (
            <LoveService />
          ) : userProfileState.page === "noti" ? (
            <Notifications />
          ) : (
            <History />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
