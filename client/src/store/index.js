import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./alert";
//exporting the redux store

const store = configureStore({
  reducer: { alert: alertSlice.reducer },
});

export default store;
