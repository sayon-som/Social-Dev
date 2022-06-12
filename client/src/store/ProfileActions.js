import axios from "axios";
import { alertActions } from "./alert";
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
