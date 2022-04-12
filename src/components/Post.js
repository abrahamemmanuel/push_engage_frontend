import React from "react"
import { HiChevronDoubleRight, HiOutlineClock } from "react-icons/hi"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"

function Post({title, content, id, date}) {
  const navigate = useNavigate()
  return (
    <>
      <div className="post-container mt-5 sm:mt-10 flex items-start w-full cursor-pointer" onClick={() => navigate(`/post/${id}`)}>
        <div className="icon-thumb mt-4 mr-2 w-[14px]">
          <HiChevronDoubleRight className="text-cyan-500" />
        </div>
        <div className="post w-[95%]">
          <h1 className="title font-semibold text-[#686868] text-xl">
            {title}
          </h1>
          <p className="date">
            {" "}
            <HiOutlineClock className="inline text-cyan-400" />{" "}
            <small className="inline text-zinc-400">{date ? dayjs(date).format("DD-MM-YYYY hh:mm A") : ""}</small>
          </p>
          <p className="p-content truncate text-zinc-500 mt-1 sm:mt-3">{content}</p>
        </div>
      </div>
      <hr className="mt-4 drop-shadow-lg text-cyan-500 border" />
    </>
  )
}

export default Post
