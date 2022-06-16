import { createSlice } from "@reduxjs/toolkit";

const profile_state = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};
export const ProfileSlice = createSlice({
  name: "profile",
  initialState: profile_state,
  reducers: {
    //reducers:
    get_profile(state, action) {
      state.profile = action.payload;
      state.loading = false;
    },
    get_error(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clear(state, action) {
      state.loading = false;
      state.profile = null;
      state.profiles = [];
      state.repos = [];
    },
    update_profile(state, action) {
      state.profile = action.payload;
      state.loading = false;
    },
    get_profiles(state, action) {
      state.profiles = action.payload;
      state.loading = false;
    },
    get_repos(state, action) {
      state.repos = action.payload;
      state.loading = false;
    },
  },
});
export const ProfileActions = ProfileSlice.actions;
