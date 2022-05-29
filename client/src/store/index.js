import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./alert";
import { authSlice } from "./auth";

//exporting the redux store

const store = configureStore({
  reducer: { alert: alertSlice.reducer, auth: authSlice.reducer },
});

export default store;
