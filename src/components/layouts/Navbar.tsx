import React, { useState } from "react";
import logo from "../../assets/bg/logo.png";
import { Formik, Form } from "formik";
import LoginForm from "../auth/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleModalLogin, toggleModalRegister } from "../../redux/slices/auth";
import RegisterForm from "../auth/RegisterForm";

const Navbar: React.FC = () => {
  const authState = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const onClickLogin = () => {
    dispatch(toggleModalLogin(authState.showLoginForm));
  };

  const onClickRegister = () => {
    dispatch(toggleModalRegister(authState.showRegisterForm));
  };

  return (
    <>
      {authState.showLoginForm ? <LoginForm /> : null}
      {authState.showRegisterForm ? <RegisterForm /> : null}

      <nav className="grid grid-cols-8 bg-blue-400 w-full h-24">
        <span className="col-span-2 flex justify-start p-3 ml-2">
          <img src={logo} alt="logo" className="w-16 h-16 mr-2" />
          <p className="text-white text-4xl flex justify-start pt-3">
            BK Service
          </p>
        </span>
        <span className="col-span-4 flex justify-center pt-5 relative">
          <svg
            className="h-7 w-7 absolute top-8 left-32"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <circle cx="10" cy="10" r="7" />{" "}
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
          <input
            type="text"
            className="w-3/4 h-14 rounded-xl p-2 pl-12 text-2xl"
          />
          <svg
            className="h-8 w-8 absolute top-8 right-32"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        <span className="col-span-1 pt-7">
          <p
            className="text-white text-2xl flex justify-end"
            onClick={onClickRegister}
          >
            Dang ky
          </p>
        </span>
        <span className="col-span-1 pt-7">
          <p
            className="text-white text-2xl flex justify-center"
            onClick={onClickLogin}
          >
            Dang nhap
          </p>
        </span>
      </nav>
    </>
  );
};

export default Navbar;
