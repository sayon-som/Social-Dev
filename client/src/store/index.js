import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./alert";
import { authSlice } from "./auth";
import { ProfileSlice } from "./Profile";

//exporting the redux store

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    auth: authSlice.reducer,
    profile: ProfileSlice.reducer,
  },
});

export default store;
