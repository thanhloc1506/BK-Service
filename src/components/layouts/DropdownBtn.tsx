import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { selectPage } from "../../redux/slices/user";

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

const DropdownBtn = () => {
  const authState = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickSignOut = () => {
    dispatch(logout());
  };

  const goToProfile = () => {
    dispatch(selectPage("info"));
    navigate("/profile");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md py-2 bg-transparent 2xl:text-sm xl:text-sm xl:ml-0.5 items-center font-medium text-white focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {authState.user?.fullName
            ? `${
                authState.user?.fullName.split(" ")[
                  authState.user?.fullName.split(" ").length - 1
                ]
              } `
            : `${authState.user?.username}`}
          <ChevronDownIcon className="-mr-1 ml-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-7 ml-16 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }: any) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm flex justify-end"
                  )}
                  onClick={goToProfile}
                >
                  Th??ng tin t??i kho???n
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }: any) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm flex justify-end"
                  )}
                >
                  H??? tr???
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }: any) => (
                <button
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full text-left px-4 py-2 text-sm flex justify-end"
                  )}
                  onClick={onClickSignOut}
                >
                  ????ng xu???t
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownBtn;
