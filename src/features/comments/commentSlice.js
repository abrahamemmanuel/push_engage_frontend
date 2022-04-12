import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const baseUrl = "https://pushengage.herokuapp.com/api/v1"

export const fetchCommentReplies = createAsyncThunk(
 "comment/fetchCommentReplies",
 async ({postId, commentId}, thunkAPI) => {
  try {
   const {data} =  await axios.get(`${baseUrl}/posts/${postId}/comments/${commentId}?item=replies`)

   return data
  } catch (error) {
   const message = error
   ? error.response
     ? error.response.data
       ? error.response.data.message
         ? error.response.data.message
         : "failed to complete the request"
       : "error in sending request"
     : error.message || "error in sending request"
   : null
 return thunkAPI.rejectWithValue(message);
  }
 }
)

export const addReplyToComment = createAsyncThunk(
  "comment/addReplyToComment",
  async ({parentId, comment, postId}, thunkAPI) => {
   try {
    const {data} =  await axios.post(`${baseUrl}/posts/${postId}/comments`, {parentId, comment})
 
    return data
   } catch (error) {
    const message = error
    ? error.response
      ? error.response.data
        ? error.response.data.message
          ? error.response.data.message
          : "failed to complete the request"
        : "error in sending request"
      : error.message || "error in sending request"
    : null
  return thunkAPI.rejectWithValue(message);
   }
  }
 )

 export const addCommentToPost = createAsyncThunk(
  "comment/addCommentToPost",
  async ({comment, postId}, thunkAPI) => {
   try {
    const {data} =  await axios.post(`${baseUrl}/posts/${postId}/comments`, {comment})
 
    return data
   } catch (error) {
    const message = error
    ? error.response
      ? error.response.data
        ? error.response.data.message
          ? error.response.data.message
          : "failed to complete the request"
        : "error in sending request"
      : error.message || "error in sending request"
    : null
  return thunkAPI.rejectWithValue(message);
   }
  }
 )

export const commentSlice = createSlice({
 name: "comment",
 initialState: {loading: false, comment_data: {}, comment_res_loading: false, comment_res_data:{}, comment_res_error: {}, error: {}},
 extraReducers: {
  [fetchCommentReplies.pending]: (state, action) => {
   state.loading = true
  },
  [fetchCommentReplies.fulfilled]: (state, action) => {
   state.loading = false
   state.comment_data = action.payload
  },
  [fetchCommentReplies.rejected]: (state, action) => {
   state.loading = false
   state.error = action.payload
  },
  [addReplyToComment.pending]: (state, action) => {
    state.loading = true
   },
   [addReplyToComment.fulfilled]: (state, action) => {
    state.comment_res_loading = false
    state.comment_res_data = action.payload
    state.comment_data.data = [...state.comment_data.data, action.payload.data]
    state.comment_res_error = {}
   },
   [addReplyToComment.rejected]: (state, action) => {
    state.comment_res_loading = false
    state.comment_res_error = action.payload
    state.comment_res_data = {}
   },
   [addCommentToPost.pending]: (state, action) => {
    state.loading = true
   },
   [addCommentToPost.fulfilled]: (state, action) => {
    state.comment_res_loading = false
    state.comment_res_data = action.payload
    state.comment_data.data = [...state.comment_data.data, action.payload.data]
    state.comment_res_error = {}
   },
   [addCommentToPost.rejected]: (state, action) => {
    state.comment_res_loading = false
    state.comment_res_error = action.payload
    state.comment_res_data = {}
   },
 }
})


export default commentSlice.reducer