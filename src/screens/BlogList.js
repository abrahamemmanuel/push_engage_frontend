import React, { useState, useEffect } from "react"
import Post from "../components/Post"
import Pagination from "../components/Pagination"
import { useSelector, useDispatch } from "react-redux"
import { fetchPosts } from "../features/posts/postSlice"

function BlogList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const [postsPerPage] = useState(10)

  const dispatch = useDispatch()
  const { loading, post_data, error, post_form_res } = useSelector((state) => state.post)

  const { data: posts, pagination } = post_data

  const paginateBack = () =>
    setCurrentPage(currentPage <= 1 ? 1 : Number(currentPage) - 1)

  const paginateFront = () =>
    setCurrentPage(currentPage >= lastPage ? 1 : Number(currentPage) + 1)

  const paginateLast = () => setCurrentPage(Number(lastPage))

  const paginateFirst = () => setCurrentPage(1)

  useEffect(() => {
    dispatch(fetchPosts({ limit: postsPerPage, page: currentPage }))
  }, [dispatch, currentPage])

  useEffect(() => {
    if (pagination) {
      let curr_page = pagination?.links?.current
        ?.split("?")[1]
        ?.split("=")[1]
        .split("&")[0]
      setCurrentPage(curr_page)
      let last_page = pagination?.links?.last
        ?.split("?")[1]
        ?.split("=")[1]
        .split("&")[0]
      setLastPage(last_page)
    }
  }, [pagination])

  return (
    <div className="blog-container mt-5 ml-2 mr-2 px-10">
      <h1 className="text-xl sm:text-3xl text-zinc-700 font-semibold">Posts</h1>
      {loading && <p>Loading...</p>}
      {posts?.length >= 0
        ? posts?.map((p) => {
            return (
              <Post
                key={p?._id}
                date={p?.createdAt}
                title={p?.title}
                content={p?.content}
                id={p?._id}
              />
            )
          })
        : loading === false && <p>No posts to display</p>}

      {/* pagination */}
      {!loading && (
        <Pagination
          postsPerPage={postsPerPage}
          paginateBack={paginateBack}
          paginateFront={paginateFront}
          paginateFirst={paginateFirst}
          paginateLast={paginateLast}
          currentPage={currentPage}
          totalPosts={30}
        />
      )}
    </div>
  )
}

export default BlogList
