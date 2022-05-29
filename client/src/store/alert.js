import { createSlice } from "@reduxjs/toolkit";

//defining the initial state
const alertInitial = { alert: [] };

//exporting the alert slice
export const alertSlice = createSlice({
  name: "alert",
  initialState: alertInitial,
  reducers: {
    setAlert(state, action) {
      state.alert.push(action.payload);
    },
    removeAlert(state, action) {
      state.alert.pop();
    },
  },
});

//exporting the actions
export const alertActions = alertSlice.actions;
