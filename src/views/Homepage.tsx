import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import SideBarHomePage from "../components/layouts/SideBarHomePage";
import SingleCard from "../components/services/SingleCard";

const Homepage: React.FC = () => {
  useEffect(() => {
    console.log("hello Homepage");
  }, []);

  const navigate = useNavigate();

  return (
    <div className="bg-slate-100 min-h-screen h-fit">
      <div className="fixed w-screen">
        <Navbar />
      </div>
      <div className="grid grid-cols-5 pb-12">
        <div className="p-5 mt-5"></div>
        <div className="p-5 mt-5 fixed w-1/5 top-24">
          <SideBarHomePage />
        </div>
        <div className="col-span-4 mt-34 ml-20">
          <div className="grid grid-cols-3 gap-8 h-full">
            <div onClick={() => navigate("/detailService")}>
              <SingleCard />
            </div>
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
