import React, { useState } from "react"
import { HiOutlinePlus, HiX } from "react-icons/hi"
import AddPost from "./AddPost"
import { useNavigate } from "react-router-dom"

function Header() {
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  const setformActive = () => setShowForm(!showForm)

  return (
    <div className="header-container bg-slate-900 text-white py-2 px-10 relative">
      <div className="header-content flex justify-between items-center">
        <div className="brand-name">
          <p className="text-sky-400 font-bold text-2xl sm:text-3xl font-logo cursor-pointer" onClick={() => navigate("/")}>
            pushengage
          </p>
        </div>

        <div className="nav flex items-center">
          <button
            className="dk mr-2 text-lg hidden sm:block border border-cyan-500 rounded-md p-2"
            onClick={setformActive}
          >
            Add new post
          </button>
          {!showForm ? (
            <HiOutlinePlus
              className="border-2 border-cyan-500 rounded mt-1 h-full sm:hidden"
              onClick={setformActive}
            />
          ) : (
            <HiX
              className="border-2 border-cyan-500 rounded w-5 sm:hidden"
              onClick={setformActive}
            />
          )}
        </div>
      </div>
      
      <AddPost showForm={showForm} setformActive={setformActive} />
    </div>
  )
}

export default Header
