import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Loading: React.FC = () => {
  const state = useSelector((state: RootState) => state.loading);
  const authState = useSelector((state: RootState) => state.user);

  return (
    <Transition
      show={state.loading > 0}
      as={Fragment}
      enter="transition ease-out duration-500"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-200"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      appear
    >
      <div
        className={
          "fixed z-10 w-full h-full left-0 top-0 backdrop-blur-sm bg-gray-100/30"
        }
      >
        <div className={"flex justify-center items-center p-10 h-full"}>
          <svg
            className="animate-spin h-10 w-10 bg-sky-600 self-center"
            viewBox="0 0 32 32"
          ></svg>
        </div>
      </div>
    </Transition>
  );
};

export default Loading;
