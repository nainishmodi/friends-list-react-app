import { useState, useEffect, memo } from 'react';

const Pagination = ({items, onChangePage}) => {
    //State for pagination
    const [ pager, setPager ] = useState({});

    useEffect(() => {
        // set page if items array isn't empty
        if (items && items.length) {
            setPage(1);
        } else {
            // call change page function in parent component
            onChangePage([]);
        }
    }, []);

    //fn to set page based on the input
    const setPage = (page) => {
        if (page < 1 || page > pager.totalPages) return;

        // get new pager object for specified page
        const _pager = getPager(items.length, page);
        // get new page of items from items array
        const pageOfItems = items.slice(_pager.startIndex, _pager.endIndex + 1);

        // update state
        setPager(_pager);

        // call change page function in parent component
        onChangePage(pageOfItems);
    };

    //Fn to prepare all the page controls that use by the view
    const getPager = (totalItems, currentPage, pageSize) => {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 4
        pageSize = pageSize || 4;

        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);
        let startPage, endPage;
      
        if (totalPages <= 5) {
          startPage = 1;
          endPage = totalPages;
        } else if (currentPage === totalPages) {
          startPage = currentPage - 4;
          endPage = totalPages;
        } else if (currentPage + 2 >= totalPages) {
          let diff = currentPage - totalPages;
          diff = (diff === -1) ? 3 : 2;
          startPage = currentPage - diff;
          endPage = totalPages;
        } else if (currentPage === 2 || currentPage === 1) {
          startPage = 1;
          endPage = 5;
        } else if (currentPage <= totalPages) {
          startPage = currentPage - 2;
          endPage = currentPage + 2;
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages in the the pager control
        const pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }

    const { pages, currentPage, totalPages } = pager;
    // don't display pager if there is only 1 page
    if (!pages || pages.length <= 1) return null;

    return (
        <>
            <div className="pagination">
                <a onClick={() => setPage(1)}>&laquo;</a>
                <a onClick={() => setPage(currentPage - 1)}>Previous</a>
                {pages.map((page, index) =>
                    <a href="" key={index} className={`${currentPage === page && 'active'}`} onClick={() => setPage(page)} href="#">{page}</a>
                )}
                <a onClick={() => setPage(currentPage + 1)}>Next</a>
                <a onClick={() => setPage(totalPages)}>&raquo;</a>
            </div>
        </>
    );
};

export default memo(Pagination);