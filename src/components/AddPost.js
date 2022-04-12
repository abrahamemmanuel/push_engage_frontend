import React, {useEffect, useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {HiX } from "react-icons/hi"
import { addPost } from '../features/posts/postSlice'

function AddPost({ setformActive, showForm}) {
 const [title, setTitle] = useState("")
 const [disabled, setDisabled] = useState(true)
 const [content, setContent] = useState("")
 const dispatch = useDispatch()

 const handleSubmit = (e) => {
  e.preventDefault()
  if(title && content) {
   dispatch(addPost({title, content}))
   setContent("")
   setTitle("")
   setformActive(!showForm)
  }
 }

 useEffect(() => {
  if(title !== ""  && content !== ""){
    setDisabled(false)
  } else {
    setDisabled(true)
  }
 }, [content, title, disabled])


  return (
   <div
   className={`add-new-post ${
     !showForm ? "hidden" : ""
   } absolute top-8 left-0 sm:right-0 z-10 mt-[40px] w-full sm:w-[50%] mx-auto bg-slate-900 flex justify-center items-center py-6`}
 >
   <form className="w-[80%] mx-auto relative" onSubmit={handleSubmit}>
     <HiX
       className="border-2 border-cyan-500 rounded w-5 hidden sm:block absolute right-[-50px] top-[-24px] cursor-pointer"
       onClick={setformActive}
     />
     <div className="input-group mb-4">
       <label className="block mb-1 font-semibold">Title</label>
       <input
         className="inline-block text-black px-2 py-2 rounded-md w-full"
         type="text"
         onChange={(e) => setTitle(e.target.value)}
         value={title}
       />
     </div>

     <div className="input-group mb-4 relative">
       <label className="block mb-1 font-semibold">Content</label>
       <textarea
        name=""
        cols="25"
        rows="5"
         id="post-content"
         className="text-black w-full px-2 py-3 min-h-full"
         value={content}
         onChange={(e) => setContent(e.target.value)}
       />
     </div>

     <div className="my-2 text-center">
       <button className="border-2 border-cyan-500 rounded-md p-2 font-bold text-zinc-300 disabled:cursor-not-allowed" disabled={disabled} >
         Add new post
       </button>
     </div>
   </form>
 </div>
  )
}

export default AddPost