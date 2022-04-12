import {configureStore} from "@reduxjs/toolkit"
import commentSlice from "./features/comments/commentSlice"
import postSlice from "./features/posts/postSlice"

const store = configureStore({
 reducer: {
  post: postSlice,
  comment: commentSlice
 }
})

export default store