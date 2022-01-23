import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import SideBarHomePage from "../components/layouts/SideBarHomePage";
import SingleCard from "../components/services/SingleCard";

const Homepage: React.FC = () => {
  useEffect(() => {
    console.log("hello Homepage");
  }, []);
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 bg-slate-100 h-screen">
        <div className="p-5 mt-5">
          <SideBarHomePage />
        </div>
        <div className="col-span-4 mt-10 ml-20">
          <div className="grid grid-cols-3 gap-8">
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
