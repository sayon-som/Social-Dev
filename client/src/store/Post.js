import { createSlice } from "@reduxjs/toolkit";

//defining the initial state for the post
const psotInitial = {
  //array of the post
  posts: [],
  //single post
  post: null,
  loading: true,
  error: {},
};

//exporting the alert slice
export const Post = createSlice({
  name: "Post",
  initialState: psotInitial,
  reducers: {
    //get posts
    GET_POSTS(state, action) {
      //setting the posts
      state.loading = false;
      state.posts = action.payload;
    },
    //posts_erro
    POST_ERROR(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    UPDATE_LIKES(state, action) {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.id
          ? {
              likes: action.payload.likes,
            }
          : post
      );
      state.loading = false;
    },
    DELETE_POST(state, action) {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.loading = false;
    },
  },
});

//exporting the actions
export const postActions = Post.actions;
