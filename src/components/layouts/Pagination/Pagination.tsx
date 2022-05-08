import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import ItemButton from "../Pagination/ItemButton";
import Ellipsis from "./Ellipsis";
import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";
import {deepSearch} from "../../../redux/slices/search";


const Pagination = ({itemsPerPage}: any) => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.search.page);
    const totalPage = useSelector((state: RootState) => state.search.totalPage);
    useEffect(() => {
        console.log(totalPage)
        // dispatch(getQuestionByPage(1));
    }, [dispatch]);

    const goFirstPage = () => {
        // dispatch(getQuestionByPage(1));
        // setCurrentPage(1);
        dispatch(deepSearch({page: 1}))
    };
    const goLastPage = () => {
        // dispatch(getQuestionByPage(totalPage));
        // setCurrentPage(totalPage);
        dispatch(deepSearch({page: totalPage}))
    };

    const goPrePage = () => {
        if (currentPage !== 1) {
            dispatch(deepSearch({page: currentPage-1}))
            // dispatch(getQuestionByPage(currentPage - 1));
            // setCurrentPage(currentPage - 1);
        }
    };

    const goNextPage = () => {
        if (currentPage !== totalPage) {
            dispatch(deepSearch({page: currentPage+1}))
            // dispatch(getQuestionByPage(currentPage + 1));
            // setCurrentPage(currentPage + 1);
        }
    };

    const handleClickPage = (page: number) => {
        // dispatch(getQuestionByPage(page));
        // setCurrentPage(page);
        dispatch(deepSearch({page: page}))
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
            <span  onClick={() => handleClickPage(1)}>
            <ItemButton
                page={1}
                isCurruntPage={1 === currentPage}
            />
        </span>
        );
    } else if (totalPage === 2) {
        paginatePage = (
            <div>
            <span onClick={() => handleClickPage(1)}>
                <ItemButton
                    page={1}
                    isCurruntPage={1 === currentPage}
                />
            </span>
                <span onClick={() => handleClickPage(2)}>
                <ItemButton
                    page={2}
                    isCurruntPage={2 === currentPage}
                />
            </span>
            </div>
        );
    } else if (totalPage === 3) {
        paginatePage = itemPaginations ;
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
