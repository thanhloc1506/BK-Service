import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Category } from "../../apis/common/Category";
import {
  applyCategory,
  applyPhuong,
  applyQuan,
  deepSearch,
  fetchPhuong,
  fetchQuan,
  getAllCategory,
  resetCategory,
  resetPhuong,
  resetQuan,
  selectRating,
} from "../../redux/slices/search";
import { Phuong, Quan } from "../../apis/common/Address";

const MenuCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.search.categories);
  const filter = useSelector((state: RootState) => state.search.filter);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <div className="2xl:w-52 xl:w-44 lg:w-36">
      <Listbox
        value={categories?.find((c) => c._id === filter.category?._id) || null}
        onChange={(v: Category) => {
          if (v._id === "-1") {
            dispatch(resetCategory());
            setTimeout(() => {
              dispatch(deepSearch(undefined));
            }, 1000);
          } else {
            dispatch(applyCategory(v));
            setTimeout(() => {
              dispatch(deepSearch(undefined));
            }, 1000);
          }
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left ring rounded-lg  cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">
              {filter.category ? filter.category.category : "Chọn lĩnh vực"}
            </span>
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
            <Listbox.Options
              static
              className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {categories &&
                [{ _id: "-1", category: "Tất cả" } as Category]
                  .concat(categories)
                  .map((category, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                          active
                            ? "text-amber-900 bg-amber-100"
                            : "text-gray-900"
                        }`
                      }
                      value={category}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {category.category}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
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
    </div>
  );
};
const MenuQuan = () => {
  const quan = useSelector((state: RootState) => state.search.quan);
  const filter = useSelector((state: RootState) => state.search.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch && dispatch(fetchQuan());
  }, [dispatch]);
  return (
    <div className="2xl:w-52 xl:w-44 lg:w-36">
      <Listbox
        value={
          quan.find((v) => v.district_id === filter.quan?.district_id) || null
        }
        onChange={(v: Quan) => {
          if (v.district_id === "-1") {
            dispatch(resetQuan());
            dispatch(resetPhuong());
            setTimeout(() => {
              dispatch(deepSearch(undefined));
            }, 1000);
            return;
          }
          dispatch(applyQuan(v));
          dispatch(fetchPhuong(v.district_id));
          dispatch(resetPhuong());
          setTimeout(() => {
            dispatch(deepSearch(undefined));
          }, 1000);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left ring rounded-lg  cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">
              {filter.quan?.district_name || "Chọn quận"}
            </span>
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
            <Listbox.Options
              static
              className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {quan &&
                quan.length > 0 &&
                [{ district_id: "-1", district_name: "Tất cả" } as Quan]
                  .concat(quan)
                  .map((q, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                          active
                            ? "text-amber-900 bg-amber-100"
                            : "text-gray-900"
                        }`
                      }
                      value={q}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {q.district_name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
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
    </div>
  );
};
const MenuPhuong = () => {
  const phuong = useSelector((state: RootState) => state.search.phuong);
  const filter = useSelector((state: RootState) => state.search.filter);
  const dispatch = useDispatch();
  return (
    <div className="2xl:w-52 xl:w-44 lg:w-36">
      <Listbox
        value={phuong.find((p) => p.ward_id === filter.phuong?.ward_id) || null}
        onChange={(v: Phuong) => {
          if (v.ward_id === "-1") {
            dispatch(resetPhuong());
            // dispatch(deepSearch("Hello"));
            setTimeout(() => {
              dispatch(deepSearch(undefined));
            }, 1000);
            return;
          }
          dispatch(applyPhuong(v));
          setTimeout(() => {
            dispatch(deepSearch(undefined));
          }, 1000);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left ring rounded-lg  cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">
              {filter.phuong?.ward_name || "Chọn phường"}
            </span>
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
            <Listbox.Options
              static
              className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {phuong &&
                [{ ward_id: "-1", ward_name: "Tất cả" } as Phuong]
                  .concat(phuong)
                  .map((p, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                          active
                            ? "text-amber-900 bg-amber-100"
                            : "text-gray-900"
                        }`
                      }
                      value={p}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {p.ward_name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
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
    </div>
  );
};

const ratingStatus = ["-1", "5", "4", "3", "2", "1"];

function MenuRating() {
  const filter = useSelector((state: RootState) => state.search.filter);

  const dispatch = useDispatch();
  const onChangeRating = (rating: any) => {
    dispatch(selectRating(rating));
    setTimeout(() => {
      dispatch(deepSearch(undefined));
    }, 1000);
  };

  return (
    <div className="2xl:w-52 xl:w-44 lg:w-36">
      <Listbox value={filter.rating} onChange={onChangeRating}>
        {({ open }) => (
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left ring rounded-lg  cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">
                {filter.rating === "-1" || filter.rating === undefined
                  ? "Chọn Đánh giá"
                  : `${filter.rating} Sao`}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            {/*
            Use the Transition + open render prop argument to add transitions.
          */}
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/*
              Don't forget to add `static` to your Listbox.Options!
            */}
              <Listbox.Options
                static
                className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {ratingStatus.map((rating, index) => (
                  <Listbox.Option
                    key={index}
                    value={rating}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${
                        active ? "text-amber-900 bg-amber-100" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {rating === "-1" ? "Chọn Đánh giá" : `${rating} Sao`}
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
        )}
      </Listbox>
    </div>
  );
}

const SideBarHomePage: React.FC = () => {
  return (
    <div className="bg-white 2xl:py-6 xl:py-5 lg:py-3 w-full 2xl:mx-[10.6vw] xl:mx-[10.5vw] lg:mx-[10.2vw] shadow-md m-auto rounded relative">
      <div className={"flex justify-center items-center relative gap-2"}>
        <MenuRating />
        <MenuCategory />
        <MenuQuan />
        <MenuPhuong />
      </div>
    </div>
  );
};

export default SideBarHomePage;
