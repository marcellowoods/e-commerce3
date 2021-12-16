import ReactPaginate from 'react-paginate';

const getPagination = ({ pageCount, onPageChange, curPage }) => {
    return (
        
            <ReactPaginate
                forcePage={curPage}
                previousLabel={"←"}
                previousClassName={"text-xl"}
                nextLabel={"→"}
                nextClassName={"text-xl"}
                breakLabel={"..."}
                breakClassName={""}
                pageCount={pageCount}
                marginPagesDisplayed={0}
                pageRangeDisplayed={2}
                onPageChange={onPageChange}
                containerClassName={"flex items-center justify-center mt-10"}
                subContainerClassName={"flex rounded-md"}
                previousLinkClassName={"py-2 px-4 leading-tight bg-white font-normal  border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-gray-50"}
                nextLinkClassName={"py-2 px-4 leading-tight bg-white font-normal  border-gray-200 text-blue-700 rounded-r hover:bg-gray-50"}
                pageLinkClassName={"py-2 px-4 leading-tight bg-white font-normal  border-gray-200 text-blue-700 border-r-0 hover:bg-gray-50 "}
                breakLinkClassName={"py-2 px-4 leading-tight bg-white font-normal  border-gray-200 text-blue-700 border-r-0 hover:bg-gray-50 "}
                activeLinkClassName={"font-semibold text-xl"}
            />
      
    )
}

export default getPagination;

