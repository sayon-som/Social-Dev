import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./alert";
import { authSlice } from "./auth";
import { ProfileSlice } from "./Profile";
import { Post } from "./Post";
//exporting the redux store

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    auth: authSlice.reducer,
    profile: ProfileSlice.reducer,
post:Post.reducer,
  },
});

export default store;
