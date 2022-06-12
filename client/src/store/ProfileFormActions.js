import axios from "axios";
import { useNavigate } from "react-router-dom";
import { alertActions } from "./alert";
import { ProfileActions } from "./Profile";
export const ProfileFormActions = ({ formdata, history, edit = false }) => {
  const navigate = useNavigate();
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const set_profile = async () => {
      //only for the async operations
      const res = await axios.post("http://localhost:8000/api/profile",formdata,config);
      return res;
    };
    try {
      const res = await set_profile();
      dispatch(ProfileActions.get_profile(res.data));
      dispatch(
        alertActions.setAlert(
          edit ? "Profile updated" : "Profile has been created"
        )
      );
      if (!edit) {
        navigate("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) =>
          dispatch(alertActions.setAlert(error.msg, "danger"))
        );
      }
    }
  };
};
