import { createSlice } from "@reduxjs/toolkit";

const auth_state = {
  //for the token
  token: localStorage.getItem("token"),
  isauth: null,
  loading: true,
  user: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: auth_state,
  reducers: {
    loaded(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isauth = true;
    },
    //reducer methods
    register_success(state, action) {
      //for the success
      state.token = localStorage.setItem("token", action.payload.token);

      state.isauth = true;
      state.loading = false;
    },
    register_fail(state, action) {
      localStorage.removeItem("token");
      state.token = null;
      state.isauth = false;
      state.loading = false;
      state.user = null;
    },
    auth_error(state, action) {
      localStorage.removeItem("token");
      state.token = null;
      state.isauth = false;
      state.loading = false;
      state.user = null;
    },
    login_success(state, action) {
      state.token = localStorage.setItem("token", action.payload.token);

      state.isauth = true;
      state.loading = false;
    },
    login_fail(state, action) {
      localStorage.removeItem("token");
      state.token = null;
      state.isauth = false;
      state.loading = false;
      state.user = null;
    },
    Logout(state, action) {
      localStorage.removeItem("token");
      state.token = null;
      state.isauth = false;
      state.loading = false;
      state.user = null;
    },
  },
});
export const auth_real_actions = authSlice.actions;
