import { createSlice } from "@reduxjs/toolkit";

const auth_state = {
  //for the token
  token: localStorage.getItem('token'),
  isauth: null,
  loading: true,
  user: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: auth_state,
  reducers: {
    //reducer methods
    register_success(state, payload) {
      //for the success
      localStorage.setItem('token', payload.token);

      state.isauth = true;
      state.loading = true;
    },
    register_fail(state, payload) {
      localStorage.removeItem('token');
      state.token = null;
      state.isauth = false;
      state.loading = false;
    },
  },
});
export const auth_real_actions = authSlice.actions;
