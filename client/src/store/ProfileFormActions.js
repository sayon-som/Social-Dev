import axios from "axios";
import { alertActions } from "./alert";
import { ProfileActions } from "./Profile";
import { v4 as uuidv4 } from "uuid";
import { auth_real_actions } from "./auth";

//create or updating
export const ProfileFormCreation = (formdata, navigate, edit = false) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const set_profile = async () => {
      //only for the async operations
      const res = await axios.post(
        "http://localhost:8000/api/profile",
        formdata,
        config
      );
      return res;
    };
    try {
      const res = await set_profile();
      dispatch(ProfileActions.get_profile(res.data));
      var id = uuidv4();
      const msg = edit ? "Profile updated" : "Profile has been created";
      const type = "success";
      dispatch(alertActions.setAlert({ id, msg, type }));
      setTimeout(() => {
        dispatch(alertActions.removeAlert({ id }));
      }, 2000);

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

//ading the education and experiences
export const AddEdu = (formdata, navigate) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const set_experince = async () => {
      //only for the async operations
      const res = await axios.put(
        "http://localhost:8000/api/profile/education",
        formdata,
        config
      );
      return res;
    };
    try {
      const res = await set_experince();
      dispatch(ProfileActions.update_profile(res.data));
      var id = uuidv4();
      const msg = "education added";
      const type = "success";
      dispatch(alertActions.setAlert({ id, msg, type }));
      setTimeout(() => {
        dispatch(alertActions.removeAlert({ id }));
      }, 2000);

      navigate("/dashboard");
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

//ading the education and experiences
export const AddEx = (formdata, navigate) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const set_experince = async () => {
      //only for the async operations
      const res = await axios.put(
        "http://localhost:8000/api/profile/experience",
        formdata,
        config
      );
      return res;
    };
    try {
      const res = await set_experince();
      dispatch(ProfileActions.update_profile(res.data));
      var id = uuidv4();
      const msg = "experience added";
      const type = "success";
      dispatch(alertActions.setAlert({ id, msg, type }));
      setTimeout(() => {
        dispatch(alertActions.removeAlert({ id }));
      }, 2000);

      navigate("/dashboard");
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

//deleting the education part
export const delete_education = (edu_id) => {
  return async (dispatch) => {
    const delete_edu_confirm = async () => {
      //delete the education with the correct edu_id
      const res = await axios.delete(
        `http://localhost:8000/api/profile/education/${edu_id}`
      );
      return res;
    };
    try {
      const res = await delete_edu_confirm();
      dispatch(ProfileActions.update_profile(res.data));
      var id = uuidv4();
      const msg = "education removed";
      const type = "success";
      dispatch(alertActions.setAlert({ id, msg, type }));
      setTimeout(() => {
        dispatch(alertActions.removeAlert({ id }));
      }, 2000);
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

//deleting the experience part
export const delete_experience = (ex_id) => {
  return async (dispatch) => {
    const delete_edu_confirm = async () => {
      //delete the education with the correct edu_id
      const res = await axios.delete(
        `http://localhost:8000/api/profile/experience/${ex_id}`
      );
      return res;
    };
    try {
      const res = await delete_edu_confirm();
      dispatch(ProfileActions.update_profile(res.data));
      var id = uuidv4();
      const msg = "experience removed";
      const type = "success";
      dispatch(alertActions.setAlert({ id, msg, type }));
      setTimeout(() => {
        dispatch(alertActions.removeAlert({ id }));
      }, 2000);
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

//delete account of the user
export const delete_account = () => {
  return async (dispatch) => {
    const delete_edu_confirm = async () => {
      //delete the education with the correct edu_id
      const res = await axios.delete(`http://localhost:8000/api/profile`);
      return res;
    };
    try {
      const res = await delete_edu_confirm();
      dispatch(ProfileActions.clear());
      dispatch(auth_real_actions.deleted_account());
      var id = uuidv4();
      const msg = "Your account has been removed";
      const type = "success";
      dispatch(alertActions.setAlert({ id, msg, type }));
      setTimeout(() => {
        dispatch(alertActions.removeAlert({ id }));
      }, 2000);
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
