import axios from "axios";
//import { alertActions } from "./alert";
import { ProfileActions } from "./Profile";

//get the current user profile
export const get_profile = () => {
  return async (dispatch) => {
    //backend route to the api/profile/me
    const get_me = async () => {
      //calling the backend api
      const res = await axios.get("http://localhost:8000/api/profile/me");
      return res;
    };
    try {
      const res = await get_me();

      dispatch(ProfileActions.get_profile(res.data));
    } catch (err) {
      dispatch(
        ProfileActions.get_error({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  };
};

//get all the profiles
export const get_all_profiles = () => {
  return async (dispatch) => {
    //clear all the previous informations
    //dispatch(ProfileActions.clear());
    const get_all = async () => {
      //calling the backend api
      const res = await axios.get("http://localhost:8000/api/profile");
      return res;
    };
    try {
      const res = await get_all();

      dispatch(ProfileActions.get_profiles(res.data));
    } catch (err) {
      dispatch(
        ProfileActions.get_error({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  };
};

//get the profiles by id
export const get_profile_by_id = (user_id) => {
  return async (dispatch) => {
    //clear all the previous informations
    dispatch(ProfileActions.clear());
    const get_all = async () => {
      //calling the backend api
      const res = await axios.get(
        `http://localhost:8000/api/profile/user/${user_id}`
      );
      return res;
    };
    try {
      const res = await get_all();

      dispatch(ProfileActions.get_profile(res.data));
    } catch (err) {
      dispatch(
        ProfileActions.get_error({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  };
};

//get the gitub repos
export const get_github_repos = (user_name) => {
  return async (dispatch) => {
    //clear all the previous informations

    const get_all = async () => {
      //calling the backend api
      const res = await axios.get(
        `http://localhost:8000/api/profile/github/${user_name}`
      );
      return res;
    };
    try {
      const res = await get_all();
      
      dispatch(ProfileActions.get_repos(res.data));
    } catch (err) {
      dispatch(
        ProfileActions.get_error({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  };
};
