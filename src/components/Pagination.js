import React from "react"

function Pagination({
  postsPerPage,
  paginateBack,
  paginateFront,
  totalPosts,
  currentPage,
  paginateFirst,
  paginateLast,
}) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <div className="my-10">
      <div>
        <p className="text-sm text-gray-700">
          Showing
          <span className="font-medium">
            {" "}
            {currentPage * postsPerPage - postsPerPage + 1}{" "}
          </span>
          to
          <span className="font-medium"> {currentPage * postsPerPage} </span>
          results
        </p>
      </div>
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <a
          onClick={() => {
            paginateFirst()
          }}
          href="#"
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span>First</span>
        </a>
        <a
          onClick={() => {
            paginateBack()
          }}
          href="#"
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span>Previous</span>
        </a>

        <a
          onClick={() => {
            paginateFront()
          }}
          href="#"
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span>Next</span>
        </a>

        <a
          onClick={() => {
            paginateLast()
          }}
          href="#"
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span>Last</span>
        </a>
      </nav>
    </div>
  )
}

export default Pagination
