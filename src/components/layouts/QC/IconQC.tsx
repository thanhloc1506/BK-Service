import React, { useState } from "react";
import logo from "../../../assets/bg/logo.png";

const IconQC = () => {
  const [show, setShow] = useState(false);

  const onHoverEvent = () => {
    setTimeout(() => {
      setShow(true);
    }, 600);
  };

  const onOutEvent = () => {
    setTimeout(() => {
      setShow(false);
    }, 600);
  };
  return (
    <div onMouseOver={onHoverEvent} onMouseOut={onOutEvent}>
      {show ? (
        <div className="absolute bg-orange-50 w-36 h-4 px-2 top-4 left-4 rounded-lg font-light">
          Đây là dịch vụ dùng QC
        </div>
      ) : (
        ""
      )}
      <div className="2xl:w-4 2xl:h-4 xl:h-3.5 xl:w-3.5 lg:w-3 lg:h-3">
        <div className="w-full h-full bg-blue-solid rounded-full flex justify-center items-center">
          <img
            src={logo}
            alt="logo"
            className="2xl:w-2.5 2xl:h-2.5 xl:h-2 xl:w-2 lg:w-2 lg:h-2"
          />
        </div>
      </div>
    </div>
  );
};

export default IconQC;
