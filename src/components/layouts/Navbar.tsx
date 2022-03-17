import React from "react";
import logo from "../../assets/bg/logo.png";
import LoginForm from "../auth/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {toggleModalLogin, toggleModalRegister} from "../../redux/slices/auth";
import RegisterForm from "../auth/RegisterForm";
import {useNavigate} from "react-router-dom";
import DropdownBtn from "./DropdownBtn";
import {selectPage} from "../../redux/slices/user";
import {SearchField} from "./SearchField";
import {SearchResult} from "./SearchResult";

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

  const goToNoti = () => {
    dispatch(selectPage("noti"));
    navigate("/profile");
  };

  const goToSchedule = () => {
    dispatch(selectPage("schedule"));
    navigate("/profile");
  };

  return (
    <>
      {/*{authState.showLoginForm ? <LoginForm /> : null}*/}
      {/*{authState.showRegisterForm ? <RegisterForm /> : null}*/}
      <RegisterForm />
      <LoginForm />
      <div className={"fixed z-10 w-full"}>
        <nav className="grid grid-cols-9 bg-blue-light w-full p-1">
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
            <span className={"col-span-3"}>
              <span
                className={
                  "grid-cols-4 flex justify-end items-center justify-self-center h-full"
                }
              >
                <span className="col-span-2 px-5">
                  <p
                    className="text-white font-semibold text-2xl hover:text-blue-500 transition-all duration-500 cursor-pointer"
                    onClick={onClickRegister}
                  >
                    Đăng ký
                  </p>
                </span>
                <span className="col-span-2 px-5  ">
                  <p
                    className="text-white font-semibold text-2xl hover:text-blue-500 transition-all duration-500 cursor-pointer"
                    onClick={onClickLogin}
                  >
                    Đăng nhập
                  </p>
                </span>
              </span>
            </span>
          ) : (
            <div className="col-span-3 grid grid-cols-5">
              <span className="col-span-3 grid grid-cols-2">
                <span
                  className="col-span-1 pt-5 cursor-pointer"
                  onClick={goToSchedule}
                >
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
                <span
                  className="col-span-1 pt-5 cursor-pointer"
                  onClick={goToNoti}
                >
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
      </div>
    </>
  );
};

export default Navbar;
