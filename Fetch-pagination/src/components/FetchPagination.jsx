import React from "react";

function FetchPagination({
  currPage,
  onSetCurrPage,
  filteredUser,
  itemsPerPage,
}) {
  let totalPage = Math.ceil(filteredUser.length / itemsPerPage);
  let pages = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <div>
      <button
        aria-label="previous page"
        className={`px-4 py-2 rounded-full bg-white ${
          currPage !== 1 ? "text-blue-500" : "text-gray-500"
        }`}
        disabled={currPage === 1}
        onClick={() => onSetCurrPage(currPage - 1)}
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          aria-label={`jump to page ${page}`}
          aria-current={currPage === page ? "page" : undefined}
          className={`px-4 py-2 rounded-full  ${
            currPage === page ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
          onClick={() => onSetCurrPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={`px-4 py-2 rounded-full bg-white ${
          currPage < totalPage ? "text-blue-500" : "text-gray-500"
        }`}
        onClick={() => onSetCurrPage(currPage + 1)}
        disabled={currPage < totalPage ? false : true}
        aria-label="next page"
      >
        &gt;
      </button>
    </div>
  );
}

export default FetchPagination;
