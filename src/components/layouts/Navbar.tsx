import React from "react";
import logo from "../../assets/bg/logo.png";
import LoginForm from "../auth/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleModalLogin, toggleModalRegister } from "../../redux/slices/auth";
import RegisterForm from "../auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import DropdownBtn from "./DropdownBtn";

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

  return (
    <>
      {/*{authState.showLoginForm ? <LoginForm /> : null}*/}
      {/*{authState.showRegisterForm ? <RegisterForm /> : null}*/}
      <RegisterForm />
      <LoginForm />
      <nav className="grid grid-cols-9 bg-blue-light w-full h-[10vh]">
        <span
          className="col-span-2 flex justify-start p-3 ml-2 cursor-pointer"
          onClick={goToHomepage}
        >
          <img src={logo} alt="logo" className="w-16 h-16 mr-2" />
          <p className="text-white text-4xl flex justify-start pt-3">
            BK Service
          </p>
        </span>
        <span className="col-span-4 flex justify-end mr-5 pt-5 relative">
          <svg
            className="h-7 w-7 absolute top-8 left-36 text-gray-semi-medium"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <circle cx="10" cy="10" r="7" />{" "}
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
          <input
            type="text"
            className="w-5/6 h-14 rounded-xl p-2 pl-12 text-2xl outline-none bg-gray-semi-light"
          />
          <svg
            className="h-8 w-8 absolute top-8 right-3 text-gray-semi-medium"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        {!authState.isAuthenticated ? (
          <>
            <span></span>
            <span className="col-span-1 pt-7">
              <p
                className="text-white text-2xl flex justify-center"
                onClick={onClickRegister}
              >
                Đăng ký
              </p>
            </span>
            <span className="col-span-1 pt-7">
              <p
                className="text-white text-2xl flex justify-start"
                onClick={onClickLogin}
              >
                Đăng nhập
              </p>
            </span>
          </>
        ) : (
          <div className="col-span-3 grid grid-cols-5">
            <span className="col-span-3 grid grid-cols-2">
              <span className="col-span-1 pt-5">
                <div className="flex justify-end mr-4">
                  <svg
                    className="h-8 w-8 text-white"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <rect x="4" y="5" width="16" height="16" rx="2" />{" "}
                    <line x1="16" y1="3" x2="16" y2="7" />{" "}
                    <line x1="8" y1="3" x2="8" y2="7" />{" "}
                    <line x1="4" y1="11" x2="20" y2="11" />{" "}
                    <rect x="8" y="15" width="2" height="2" />
                  </svg>
                </div>
                <p className="text-white mt-1 text-sm font-medium flex justify-end">
                  Schedule
                </p>
              </span>
              <span className="col-span-1 pt-5">
                <div className="flex justify-center ml-3">
                  <svg
                    className="h-8 w-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />{" "}
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <p className="text-white mt-1 text-sm font-medium flex justify-center ml-3">
                  Notifications
                </p>
              </span>
            </span>

            <span className="col-span-2 pt-5">
              <div className="grid grid-cols-3">
                <div className="col-span-1 ml-5 rounded-full w-12 h-12 bg-gray-500"></div>
                <div className="col-span-2 mt-2">
                  <DropdownBtn />
                </div>
              </div>
            </span>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
