import React from 'react';

export default class Pagination extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(1);
        } else {
            // call change page function in parent component
            this.props.onChangePage([]);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(1);
        }
    }

    setPage(page) {
        const items = this.props.items;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) return;

        // get new pager object for specified page
        pager = this.getPager(items.length, page);
        // get new page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
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

    render() {
        const pager = this.state.pager;
        const { pages, currentPage, totalPages } = pager;

        // don't display pager if there is only 1 page
        if (!pages || pages.length <= 1) return null;

        return (
            <>
                <div className="pagination">
                    <a onClick={() => this.setPage(1)}>&laquo;</a>
                    <a onClick={() => this.setPage(currentPage - 1)}>Previous</a>
                    {pages.map((page, index) =>
                        <a key={index} className={`${currentPage === page && 'active'}`} onClick={() => this.setPage(page)} href="#">{page}</a>
                    )}
                    <a onClick={() => this.setPage(currentPage + 1)}>Next</a>
                    <a onClick={() => this.setPage(totalPages)}>&raquo;</a>
                </div>
            </>
        );
    }
}