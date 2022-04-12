import dayjs from "dayjs"
import React, { useState, useEffect } from "react"
import { HiOutlineChevronDown } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { fetchCommentReplies } from "../features/comments/commentSlice"
import AddReply from "./AddReply"
import Reply from "./Reply"

const imagURL =
  "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png"

function Comment({ replies, comment }) {
  const [showAddReply, setShowAddReply] = useState(false)
  const dispatch = useDispatch()

  const handleShowAddReply = () => setShowAddReply(!showAddReply)


  return (
    <>
      <div
        className={`reply-container px-3 py-5 rounded-md drop-shadow-xl border mb-10`}
      >
        <div className="header-section flex items-start mb-6">
          <div className="img-thumb relative w-[50px] h-[50px] overflow-hidden rounded-[50%] mr-4">
            <img src={imagURL} alt="" className="w-full h-full" />
          </div>
          <div className="name-sect">
            <p className="name text-cyan-600 font-bold ">
              {comment?.name ? comment?.name : "Anonymous"}
            </p>
            <p className="date-time text-[10px] text-neutral-400 font-semibold">
              {comment?.createdAt
                ? dayjs(comment.createdAt).format("MMMM DD, YYYY  h:mm A")
                : ""}
            </p>
          </div>
        </div>
        <div className="reply-content text-base">{comment?.comment}</div>

        <div className="reply-button mt-4" onClick={() => handleShowAddReply()}>
          <button className="reply-btn inline text-cyan-500 font-medium mr-2">
            Reply
          </button>
          <small className="inline text-cyan-500 font-medium cursor-pointer">
            (
            <HiOutlineChevronDown
              className={`inline ml-0 ${showAddReply ? "rotate-180" : ""}`}
            />
            {replies?.length})
          </small>
        </div>
      </div>

      {replies?.length >= 1 ? (
        <>
          {showAddReply && <AddReply postId={comment?.postId} parentId={comment?.parentId || comment?._id}  />}
          <main
            className={`ml-5 border-l ${
              showAddReply && replies ? "" : "hidden"
            } border-l-neutral-300 mt-[-40px] mb-2 pt-10 pb-2 pl-4`}
          >
            {replies?.length >= 1 ? (
              replies?.map((reply) => {
                return (
                  <aside key={reply}>
                    <Reply replyId={reply} replies={replies} postId={comment?.postId} commentId={comment?._id} />
                  </aside>
                )
              })
            ) : (
              <small></small>
            )}
          </main>
        </>
      ) : (
        showAddReply && <AddReply postId={comment?.postId} parentId={comment?.parentId || comment?._id} />
      )}
    </>
  )
}

export default Comment
