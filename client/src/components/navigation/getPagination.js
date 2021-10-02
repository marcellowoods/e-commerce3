import ReactPaginate from 'react-paginate';

const getPagination = ({pageCount, onPageChange}) => {
    return (
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={""}
            pageCount={pageCount}
            marginPagesDisplayed={0}
            pageRangeDisplayed={2}
            onPageChange={onPageChange}
            containerClassName={"flex justify-center mt-10"}
            subContainerClassName={"flex rounded-md"}
            previousLinkClassName={"py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white"}
            nextLinkClassName={"py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white"}
            pageLinkClassName={"py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"}
            breakLinkClassName={"py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"}
            activeLinkClassName={"bg-gray-300"}
        />
    )
}

export default getPagination;

