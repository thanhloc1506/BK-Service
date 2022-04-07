import React, {useEffect} from "react";
import logo from "../../assets/bg/logo.png";
import LoginForm from "../auth/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {toggleModalLogin, toggleModalRegister} from "../../redux/slices/auth";
import RegisterForm from "../auth/RegisterForm";
import {useNavigate} from "react-router-dom";
import DropdownBtn from "./DropdownBtn";
import {SearchField} from "./SearchField";
import {BsBorderAll} from "react-icons/bs";
import {SiGoogletagmanager} from "react-icons/si";
import {selectPageEnterprise} from "../../redux/slices/enterprise";
import {RiNotification2Line, RiNotification3Line} from "react-icons/ri";
import {ModalNoti} from "../Noti/ModalNoti";

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
    navigate("/");
  };


  const gotoAllService=() => {
    dispatch(selectPageEnterprise("all"));
    navigate("/profile");
  }

  const gotoManage = ()=> {
    dispatch(selectPageEnterprise("manage"));
    navigate("/profile");
  }

  return (
    <>
      {/*{authState.showLoginForm ? <LoginForm /> : null}*/}
      {/*{authState.showRegisterForm ? <RegisterForm /> : null}*/}
      <RegisterForm />
      <LoginForm />
      <div className={"fixed z-10 w-full"}>
        <nav className="grid grid-cols-9 bg-blue-light w-full">
          <span
            className="col-span-3 flex justify-start p-3 ml-2 cursor-pointer"
            onClick={goToHomepage}
          >
            <img src={logo} alt="logo" className="w-16 h-16 mr-2" />
            <p className="text-white text-4xl flex justify-start pt-3">
              BK Service
            </p>
          </span>
          <div className="col-span-3">
            <SearchField/>
          </div>

          {!authState.isAuthenticated ? (
            <span className={"col-span-3 px-5 grid grid-cols-3 gap-6"}>
                <span className="col-start-2 flex justify-end items-center">
                  <p
                    className="text-white font-semibold text-2xl hover:text-blue-500 transition-all duration-500 cursor-pointer"
                    onClick={onClickRegister}
                  >
                    Đăng ký
                  </p>
                </span>
                <span className="col-span-1 flex justify-center items-center">
                  <p
                    className="text-white font-semibold text-2xl hover:text-blue-500 transition-all duration-500 cursor-pointer"
                    onClick={onClickLogin}
                  >
                    Đăng nhập
                  </p>
                </span>
            </span>
          ) : (
            <div className="col-span-3 grid grid-cols-6 px-5">
              <span className="col-span-3 grid grid-cols-2">
                <span
                    className="col-span-1 cursor-pointer flex justify-center items-center flex-col"
                >
                <ModalNoti/>
                </span>
                <span
                  className="col-span-1 cursor-pointer flex flex-col justify-center items-center"
                  onClick={gotoManage}
                >
                  <div className="flex justify-center">
                    <SiGoogletagmanager className={'text-xl text-white'}/>
                  </div>
                  <p className="text-white mt-1 text-sm font-medium flex justify-center ml-3">
                    Quản lí
                  </p>
                </span>
              </span>
              <span className="col-span-3 flex justify-center items-center">
                <div className="grid grid-cols-3">
                  <div className="col-span-1 rounded-full w-12 h-12 overflow-hidden ring-2 ring-white">
                    {/*<img src={authState.user?.avatar? authState.user.avatar : DEFAULT_AVATAR} className={"w-full h-full p-1 rounded-full"}/>*/}
                  </div>
                  <div className="col-span-2 flex justify-center items-center">
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
