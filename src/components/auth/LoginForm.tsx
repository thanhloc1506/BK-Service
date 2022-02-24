import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/bg/login.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  login,
  toggleModalLogin,
  toggleModalRegister,
} from "../../redux/slices/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Dialog, Transition } from "@headlessui/react";
import { LoginForm as ILoginForm } from "../../redux/types";

const LoginForm: React.FC = () => {
  const authState = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const onClickLogin = (loginForm: ILoginForm) => {
    dispatch(login(loginForm));
    toggleForm();
  };

  const toggleForm = () => {
    dispatch(toggleModalLogin(authState.showLoginForm));
  };

  const navigate = () => {
    dispatch(toggleModalLogin(authState.showLoginForm));
    dispatch(toggleModalRegister(authState.showRegisterForm));
  };
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={authState.showLoginForm} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={toggleForm}
      >
        <div className="flex mt-28 justify-center text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-1100 h-650">
              <div className="bg-white">
                <div className="">
                  <div className="w-full h-650 border-black bg-blue-400">
                    <div className="h-650 grid grid-cols-3 gap-4">
                      <div className="">
                        <h3 className="mt-11 justify-center flex text-5xl text-white">
                          BK Service
                        </h3>
                        <div className="flex justify-center mt-14">
                          <img src={logo} alt="..." className="w-20 h-20" />
                        </div>
                        <p className="px-14 text-white justify-center flex mt-14 text-2xl">
                          Ứng dụng kết nối hàng triệu người dùng đến tất cả nhà
                          cung cấp dịch vụ tốt nhất
                        </p>
                      </div>
                      <div className="col-span-2 bg-white rounded-l-5xl">
                        <div className="mt-40">
                          <div className="flex justify-center">
                            <p className="text-4xl mr-28">Đăng nhập</p>
                          </div>
                          <Formik
                            initialValues={{ username: "", password: "" }}
                            onSubmit={(values) => {
                              onClickLogin(values);
                            }}
                          >
                            <Form>
                              <div className="flex justify-center mt-10">
                                <Field
                                  className="border-blue-300 bg-transparent border-2 h-11 w-72 p-2 rounded-md overflow-hidden"
                                  type="text"
                                  id="username"
                                  name="username"
                                  placeholder="Ten dang nhap"
                                  required
                                />
                                <ErrorMessage
                                  component="a"
                                  className=""
                                  name="username"
                                />
                              </div>
                              <div className="flex justify-center mt-6">
                                <Field
                                  className="border-blue-300 bg-transparent border-2 h-11 w-72 p-2 rounded-md overflow-hidden"
                                  type="password"
                                  name="password"
                                  id="password"
                                  placeholder="Mat khau"
                                  required
                                />
                                <ErrorMessage
                                  component="a"
                                  className=""
                                  name="password"
                                />
                              </div>
                              <div className="flex justify-center mt-6">
                                <button
                                  type="submit"
                                  className="bg-blue-500 w-80 ml-8 p-2 text-white rounded-md overflow-hidden"
                                >
                                  Đăng nhập
                                </button>
                              </div>
                            </Form>
                          </Formik>

                          <div className="flex justify-center mt-6 ml-20">
                            <p className="inline-block">Chua co tai khoan?</p>
                            <p
                              className="inline-block ml-2 text-blue-400"
                              onClick={navigate}
                            >
                              Đăng ký ngay
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoginForm;
