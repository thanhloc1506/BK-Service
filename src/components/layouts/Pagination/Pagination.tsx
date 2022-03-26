import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ItemButton from "../Pagination/ItemButton";
import Ellipsis from "./Ellipsis";
import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";

let totalPage = 10;

const Pagination = ({ itemsPerPage }: any) => {
  const [pageNumber, setPageNumber] = useState(0);

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // dispatch(getQuestionByPage(1));
  }, [dispatch]);

  const goFirstPage = () => {
    // dispatch(getQuestionByPage(1));
    setCurrentPage(1);
  };
  const goLastPage = () => {
    // dispatch(getQuestionByPage(totalPage));
    setCurrentPage(totalPage);
  };

  const goPrePage = () => {
    if (currentPage !== 1) {
      // dispatch(getQuestionByPage(currentPage - 1));
      setCurrentPage(currentPage - 1);
    }
  };

  const goNextPage = () => {
    if (currentPage !== totalPage) {
      // dispatch(getQuestionByPage(currentPage + 1));
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPage = (page: number) => {
    // dispatch(getQuestionByPage(page));
    setCurrentPage(page);
  };

  let itemPaginations;
  if (currentPage === 1) {
    itemPaginations = [currentPage, currentPage + 1, currentPage + 2].map(
      (page, index) => (
        <span onClick={() => handleClickPage(page)} key={index}>
          <ItemButton page={page} isCurruntPage={page === currentPage} />
        </span>
      )
    );
  } else if (currentPage === totalPage) {
    itemPaginations = [currentPage - 2, currentPage - 1, currentPage].map(
      (page, index) => (
        <span onClick={() => handleClickPage(page)} key={index}>
          <ItemButton page={page} isCurruntPage={page === currentPage} />
        </span>
      )
    );
  } else {
    itemPaginations = [currentPage - 1, currentPage, currentPage + 1].map(
      (page, index) => (
        <span onClick={() => handleClickPage(page)} key={index}>
          <ItemButton page={page} isCurruntPage={page === currentPage} />
        </span>
      )
    );
  }

  let paginatePage;
  if (totalPage === 1 || totalPage === 0) {
    paginatePage = (
      <ItemButton
        page={1}
        isCurruntPage={1 === currentPage}
        onClick={() => handleClickPage(1)}
      />
    );
  } else if (totalPage === 2) {
    paginatePage = (
      <div>
        <ItemButton
          page={1}
          isCurruntPage={1 === currentPage}
          onClick={() => handleClickPage(1)}
        />
        <ItemButton
          page={2}
          isCurruntPage={2 === currentPage}
          onClick={() => handleClickPage(2)}
        />
      </div>
    );
  } else if (totalPage === 3) {
    paginatePage = { itemPaginations };
  } else {
    paginatePage = (
      <div>
        {currentPage > 2 && (
          <>
            <span onClick={goFirstPage}>
              <ItemButton page={1} isCurruntPage={false} />
            </span>
            <Ellipsis />
          </>
        )}
        {itemPaginations}
        {currentPage < totalPage - 1 && (
          <>
            <Ellipsis />
            <span onClick={goLastPage}>
              <ItemButton page={totalPage} isCurruntPage={false} />
            </span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="bg-transparent px-4 py-3 flex items-center justify-between">
      <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <span onClick={goPrePage}>
              <PreviousButton />
            </span>
            {paginatePage}
            <span onClick={goNextPage}>
              <NextButton />
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
