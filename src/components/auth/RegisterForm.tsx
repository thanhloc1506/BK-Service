import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/bg/login.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  register,
  toggleModalLogin,
  toggleModalRegister,
} from "../../redux/slices/auth";
import { Formik, Field, Form, ErrorMessage, validateYupSchema } from "formik";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { RegisterForm as IRegisterForm } from "../../redux/types";
import { hideWaiting, showWaiting } from "../../redux/slices/loading";
import * as Yup from "yup";

const RegisterForm: React.FC = () => {
  const authState = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const onClickRegister = (values: IRegisterForm) => {
    dispatch(register(values));
    toggleRegisterModal();
  };

  const toggleRegisterModal = () => {
    dispatch(toggleModalRegister(authState.showRegisterForm));
  };

  const navigate = async () => {
    dispatch(showWaiting());
    await dispatch(toggleModalRegister(authState.showRegisterForm));
    await setTimeout(async () => {
      await dispatch(toggleModalLogin(authState.showLoginForm));
      dispatch(hideWaiting());
    }, 700);
  };
  const cancelButtonRef = useRef(null);

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8, "*Mật khẩu phải có từ 8 ký tự trở lên"),
    username: Yup.string().max(50, "*Tên tài khoản không vượt quá 50 ký tự"),
    email: Yup.string().max(50, "*Email không vượt quá 50 ký tự"),
  });
  return (
    <Transition.Root show={authState.showRegisterForm} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={toggleRegisterModal}
      >
        <div className="flex 2xl:mt-14 xl:mt-12 lg:mt-10 justify-center text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-white/20 backdrop-blur" />
          </Transition.Child>

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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all duration-500 ease-in-out 2xl:w-1100 2xl:h-650 xl:w-[80vw] xl:h-[85vh] lg:h-[416px] lg:w-[820px]">
              <div className="bg-white">
                <div className="h-650 m:flex sm:items-start">
                  <div className="w-full h-full border-black bg-blue-400">
                    <div className="h-full grid grid-cols-3 gap-4">
                      <div className="">
                        <h3 className="mt-11 justify-center flex 2xl:text-5xl xl:text-3xl lg:text-2xl text-white">
                          BK Service
                        </h3>
                        <div className="flex justify-center mt-14">
                          <img
                            src={logo}
                            alt="..."
                            className="2xl:w-20 2xl:h-20 xl:w-16 xl:h-16 lg:w-14 lg:h-14"
                          />
                        </div>
                        <p className="px-14 text-white justify-center flex 2xl:mt-14 xl:mt-12 lg:mt-10 2xl:text-2xl xl:text-xl lg:text-[0.92rem]">
                          Ứng dụng kết nối hàng triệu người dùng đến tất cả nhà
                          cung cấp dịch vụ tốt nhất
                        </p>
                      </div>
                      <div className="col-span-2 bg-white rounded-l-5xl">
                        <div className="2xl:mt-24 xl:mt-16 lg:mt-16">
                          <div className="flex justify-center">
                            <p className="2xl:text-4xl xl:text-2xl lg:text-xl 2xl:mr-44 xl:mr-48 lg:mr-52">
                              Đăng ký
                            </p>
                          </div>
                          <Formik
                            initialValues={{
                              username: "",
                              password: "",
                              confirmPassword: "",
                              email: "",
                            }}
                            onSubmit={(values) => {
                              onClickRegister(values);
                            }}
                            validationSchema={validationSchema}
                          >
                            {({ values, errors, touched }) => (
                              <Form>
                                <div className="flex justify-center 2xl:mt-10 xl:mt-6 lg:mt-4">
                                  <Field
                                    className="2xl:text-lg xl:text-lg lg:text-sm border-blue-300 bg-transparent border-2 2xl:h-11 2xl:w-72 xl:w-64 xl:h-10 lg:h-8 lg:w-56 xl:mr-6 lg:mr-16 p-2 outline-none rounded-md overflow-hidden"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Tên đăng nhập"
                                    required
                                  />
                                </div>
                                {touched["username"] && errors["username"] && (
                                  <p className="2xl:text-sm xl:text-xs lg:text-[12px] text-red-500 text-center mr-16">
                                    {errors["username"]}
                                  </p>
                                )}
                                <div className="flex justify-center 2xl:mt-6 xl:mt-4 lg:mt-3">
                                  <Field
                                    className="2xl:text-lg xl:text-lg lg:text-sm border-blue-300 bg-transparent border-2 2xl:h-11 2xl:w-72 xl:w-64 xl:h-10 lg:h-8 lg:w-56 xl:mr-6 lg:mr-16 p-2 outline-none rounded-md overflow-hidden"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Mật khẩu"
                                    required
                                  />
                                </div>
                                {touched["password"] && errors["password"] && (
                                  <p className="2xl:text-sm xl:text-xs lg:text-[12px] text-red-500 text-center mr-[5.5rem]">
                                    {errors["password"]}
                                  </p>
                                )}
                                <div className="flex justify-center 2xl:mt-6 xl:mt-4 lg:mt-3">
                                  <Field
                                    className="2xl:text-lg xl:text-lg lg:text-sm border-blue-300 bg-transparent border-2 2xl:h-11 2xl:w-72 xl:w-64 xl:h-10 lg:h-8 lg:w-56 xl:mr-6 lg:mr-16 p-2 outline-none rounded-md overflow-hidden"
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Nhập lại mật khẩu"
                                    required
                                  />
                                  <ErrorMessage
                                    component="a"
                                    className=""
                                    name="confirmPassword"
                                  />
                                </div>
                                <div className="flex justify-center 2xl:mt-6 xl:mt-4 lg:mt-3">
                                  <Field
                                    className="2xl:text-lg xl:text-lg lg:text-sm border-blue-300 bg-transparent border-2 2xl:h-11 2xl:w-72 xl:w-64 xl:h-10 lg:h-8 lg:w-56 xl:mr-6 lg:mr-16 p-2 outline-none rounded-md overflow-hidden"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    required
                                  />
                                  <ErrorMessage
                                    component="a"
                                    className=""
                                    name="email"
                                  />
                                </div>
                                <div className="flex justify-center 2xl:mt-6 xl:mt-4 lg:mt-3">
                                  <button
                                    type="submit"
                                    className="bg-blue-500 2xl:w-80 xl:w-72 lg:w-64 2xl:ml-2 xl:ml-2 lg:ml-[-30px] 2xl:p-2 xl:p-1.5 lg:p-1 text-white rounded-md overflow-hidden"
                                  >
                                    Đăng ký
                                  </button>
                                </div>
                              </Form>
                            )}
                          </Formik>

                          <div className="flex justify-center 2xl:mt-6 xl:mt-4 lg:mt-3 2xl:ml-20 xl:ml-12 lg:ml-10">
                            <p className="inline-block 2xl:text-lg xl:text-sm lg:text-xs">
                              Đã có tài khoản?
                            </p>
                            <p
                              className="inline-block ml-2 text-blue-400 cursor-pointer 2xl:text-lg xl:text-sm lg:text-xs"
                              onClick={navigate}
                            >
                              Đăng nhập ngay
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

export default RegisterForm;
