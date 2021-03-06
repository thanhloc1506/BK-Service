import React, {
  ChangeEvent,
  Fragment,
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { BsSearch } from "react-icons/bs";
import { SearchResult } from "./SearchResult";
import { useDispatch, useSelector } from "react-redux";
import {
  clearQuickSearch,
  deepSearch,
  hideResult,
  quickSearch,
  setCurrentQuickSearchText,
  setCurrentSearchText,
  showResult,
} from "../../redux/slices/search";
import { Transition } from "@headlessui/react";
import { RootState } from "../../redux/store";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const SearchField = () => {
  const [searchText, setSearchText] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.search);
  const navigate = useNavigate();
  const onFocus = () => {
    dispatch(showResult());
  };
  const onBlur = (e: any) => {
    setTimeout(() => {
      e.target.value = "";
      dispatch(hideResult());
      dispatch(clearQuickSearch());
    }, 200);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // dispatch(search(e.target.value));
    setSearchText(e.target.value);
  };
  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === "Enter") {
      //@ts-ignore
      e.target.blur();
      // dispatch(showWaiting());
      navigate(`/?text=${searchText || ""}`);
    }
  };

  useEffect(() => {
    if (!searchText) return;
    const searchDelay = setTimeout(() => {
      dispatch(setCurrentQuickSearchText(searchText));
      dispatch(quickSearch(searchText));
    }, 2000);
    return () => clearTimeout(searchDelay);
  }, [searchText]);

  return (
    <div className="">
      <div
        className={
          "px-4 2xl:py-4 xl:py-3 lg:py-2.5 2xl:text-lg xl:text-sm lg:text-xs bg-gray-100 my-5 flex w-full justify-center items-center rounded z-10 relative"
        }
        style={{ zIndex: 10 }}
      >
        <div className={"2xl:px-4 xl:px-2 lg:px-0"}>
          <BsSearch />
        </div>
        <input
          className={
            "2xl:w-120 xl:w-[26rem] px-1 w-full outline-none bg-none bg-transparent"
          }
          type={"search"}
          placeholder="T??m ki???m..."
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          onKeyDown={onKeyPress}
        />
        <SearchResult />
      </div>
      <>
        <Transition
          show={state.isShowResult}
          as={Fragment}
          enter="transition ease-out duration-500"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100 "
          leave="transition ease-in duration-200"
          leaveFrom="transform opacity-100 "
          leaveTo="transform opacity-0"
        >
          <div
            className={
              "absolute w-full h-screen bg-black/30 top-0 left-0 backdrop-blur"
            }
            style={{ zIndex: 9 }}
          />
        </Transition>
      </>
    </div>
  );
};
