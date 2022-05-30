import React, { useEffect } from "react";
import logo from "../../assets/bg/logo.png";
import LoginForm from "../auth/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleModalLogin, toggleModalRegister } from "../../redux/slices/auth";
import RegisterForm from "../auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import DropdownBtn from "./DropdownBtn";
import { SearchField } from "./SearchField";
import { BsBorderAll } from "react-icons/bs";
import { SiGoogletagmanager } from "react-icons/si";
import { selectPageEnterprise } from "../../redux/slices/enterprise";
import { RiNotification2Line, RiNotification3Line } from "react-icons/ri";
import { ModalNoti } from "../Noti/ModalNoti";
import { DEFAULT_AVATAR } from "../../constants/common";
import { resetFilter } from "../../redux/slices/search";

const Navbar: React.FC = () => {
  const authState = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const onClickLogin = () => {
    dispatch(toggleModalLogin(authState.showLoginForm));
  };

  const onClickRegister = () => {
    dispatch(toggleModalRegister(authState.showRegisterForm));
  };

  const navigate = useNavigate();

  const goToHomepage = () => {
    dispatch(resetFilter());
    navigate("/");
  };

  const gotoAllService = () => {
    dispatch(selectPageEnterprise("all"));
    navigate("/profile");
  };

  const gotoManage = () => {
    dispatch(selectPageEnterprise("manage"));
    navigate("/profile");
  };

  return (
    <>
      <RegisterForm />
      <LoginForm />
      <div className={"fixed z-10 w-full"}>
        <nav className="grid grid-cols-9 bg-blue-light w-full px-[10%]">
          <span
            className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 flex justify-start px-3 ml-2 cursor-pointer items-center"
            onClick={goToHomepage}
          >
            <img
              src={logo}
              alt="logo"
              className="2xl:w-16 2xl:h-16 mr-2 xl:w-14 xl:h-14 sm:w-10 sm:h-10"
            />
            <p className="text-white 2xl:text-4xl flex justify-start xl:text-2xl sm:text-xl">
              BK Service
            </p>
          </span>
          <div className="2xl:col-span-4 xl:col-span-4 lg:col-span-4 2xl:pl-16 xl:pl-12 lg:pl-10">
            <SearchField />
          </div>

          {!authState.isAuthenticated ? (
            <span className={"col-span-3 px-5 grid grid-cols-2 gap-6"}>
              <span className="col-span-1 flex justify-end items-center">
                <p
                  className="text-white font-semibold 2xl:text-2xl xl:text-xl hover:text-blue-500 transition-all duration-500 cursor-pointer"
                  onClick={onClickRegister}
                >
                  Đăng ký
                </p>
              </span>
              <span className="col-span-1 flex justify-end items-center">
                <p
                  className="text-white font-semibold 2xl:text-2xl xl:text-xl hover:text-blue-500 transition-all duration-500 cursor-pointer"
                  onClick={onClickLogin}
                >
                  Đăng nhập
                </p>
              </span>
            </span>
          ) : (
            <div className="col-span-3 grid grid-cols-6 px-5">
              <span className="col-span-3 grid grid-cols-2">
                <span className="col-span-1 cursor-pointer flex justify-center items-center flex-col">
                  <ModalNoti />
                </span>
                <span
                  className="col-span-1 cursor-pointer flex flex-col justify-center items-center xl:mt-0.5 lg:mt-1 "
                  onClick={gotoManage}
                >
                  <div className="flex justify-center">
                    <SiGoogletagmanager className={"text-xl text-white"} />
                  </div>
                  <p className="text-white 2xl:mt-3 xl:mt-1 lg:mt-1 2xl:text-sm xl:text-xs lg:text-[11.5px] font-medium flex justify-center ml-3">
                    Quản lý
                  </p>
                </span>
              </span>
              <span className="col-span-3 flex justify-end items-center pr-2">
                <div className="grid grid-cols-3">
                  <div className="col-span-1 flex justify-center rounded-full 2xl:mt-2 xl:mt-0 lg:mt-1 2xl:w-10 2xl:h-10 xl:w-8 xl:h-8 lg:h-7 lg:w-7 overflow-hidden ring-2 ring-white">
                    <img
                      src={
                        authState.enterprise?.avatar
                          ? authState.enterprise.avatar?.url
                          : DEFAULT_AVATAR
                      }
                      className={"w-full h-full rounded-full"}
                    />
                  </div>
                  <div className="col-span-2 flex justify-end items-center">
                    <DropdownBtn />
                  </div>
                </div>
              </span>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
