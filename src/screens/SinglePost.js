import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Comment from "../components/Comment"
import { fetchPostbyId } from "../features/posts/postSlice"
import { toast } from "react-toastify"
import { addCommentToPost } from "../features/comments/commentSlice"

function SinglePost() {
  const [post, setPost] = useState({})
  const [comment, setComment] = useState("")
  const { post_data_res, post_data_loading, post_data_error } = useSelector(
    (state) => state.post
  )
  const dispatch = useDispatch()
  const {comment_data} = useSelector((state) => state.comment)
  const params = useParams()

  const { data, success } = post_data_res

  useEffect(() => {
    if (success) {
      setPost(data?.post)
    }
  }, [post_data_res, success, data])

  useEffect(() => {
    dispatch(fetchPostbyId({ id: params?.postId }))
  }, [params?.postId, comment_data])

  const handleSubmit = () => {
    if (comment) {
      dispatch(addCommentToPost({ comment, postId: params?.postId }))
    }
  }

  return (
    <div className="post-container w-[90%] sm:w-[60%] mx-auto  mt-[40px]">
      <div className="post">
        <h1 className="title font-semibold text-[#686868] text-xl mb-7">
          {post?.title}
        </h1>
        <p className="content text-sm text-[#333}">{post?.content}</p>
      </div>
      {post?.content && (
        <div className="add-comment border border-zinc-400 mt-10 px-2 py-4 drop-shadow-sm rounded-sm mb-[40px]">
          <h1 className="text-lg text-cyan-900 font-semibold">Add a comment</h1>
          <div className="input-group mt-4">
            <input
              type="text"
              placeholder="Name"
              className="border border-cyan-600 w-full inline-block px-2 py-2 rounded-md"
            />
          </div>

          <div className="input-group mt-4">
            <textarea
              name=""
              id=""
              cols="25"
              rows="5"
              placeholder="comment"
              className="border border-cyan-600 px-2 py-2 w-full rounded-md inline-block"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          <div className="input-btn mt-3">
            <button
              className="bg-cyan-700 text-white px-6 py-3 rounded-md font-semibold drop-shadow-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Comments and replies */}
      <div>
        {data?.comments?.length >= 1 ? (
          data?.comments?.map((comment) => {
            return (
              <aside key={comment?._id}>
                <Comment comment={comment} replies={comment?.children} />
              </aside>
            )
          })
        ) : (
          post?.content && <p>No comments to display</p>
        )}
      </div>
    </div>
  )
}

export default SinglePost
