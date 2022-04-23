import React, {Fragment, useEffect, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import {Category} from "../../apis/common/Category";

interface IDropdownItem {
  items: Category[] | undefined;
  onChange?: (v: Category | undefined) => void;
  defaultValue?: Category;
}

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

const Dropdown: React.FC<IDropdownItem> = ({ items, onChange, defaultValue }: IDropdownItem) => {
  const [selected, setSelected] = useState<Category | undefined>(defaultValue);
  useEffect(()=>{
    onChange && onChange(selected);
  }, [selected]);
  return (
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative py-2 pl-3 pr-10 text-left bg-white rounded-lg border-2 border-gray-200 cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected?.category || "Chọn..."}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
            </Listbox.Button>
            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items && items.map((item, personIdx) => (
                    <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                            }`
                        }
                        value={item}
                    >
                      {({ selected }) => (
                          <>
                      <span
                          className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {item.category}
                      </span>
                            {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                            ) : null}
                          </>
                      )}
                    </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
  );
};

export default Dropdown;
