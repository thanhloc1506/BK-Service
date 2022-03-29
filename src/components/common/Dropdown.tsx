import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

interface IDropdownItem {
  items: string[];
}

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

const Dropdown: React.FC<IDropdownItem> = ({ items }: IDropdownItem) => {
  return (
    <div className="w-full">
      <Menu as="div" className="relative inline-block text-left">
        <div className="w-full">
          <Menu.Button className="inline-flex py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
            Linh vuc
            <ChevronDownIcon
              className="-mr-1 ml-1 h-5 w-5"
              aria-hidden="true"
            />
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
          <Menu.Items className="origin-top-right absolute right-0 mt-7 ml-16 w-40 rounded-md shadow-lg bg-slate-100 border-2 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {items.map((item, index) => (
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm flex justify-end"
                      )}
                    >
                      {item}
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
