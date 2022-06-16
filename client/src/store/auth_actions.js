import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { auth_real_actions } from "./auth";
import { alertActions } from "./alert";
//loading user
import setauth from "../auth/addauthtoken";
import { useEffect } from "react";
import { ProfileActions } from "./Profile";
export const load_user = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setauth(localStorage.token);
    }
    const get_checked = async () => {
      const res = await axios.get("http://localhost:8000/api/auth");

      return res;
    };
    try {
      const res = await get_checked();

      dispatch(auth_real_actions.loaded(res.data));
    } catch (err) {
      dispatch(auth_real_actions.auth_error());
    }
  };
};

//register user
export const register_user = ({ name, email, password }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      name,
      email,
      password,
    });

    //handling the errors

    const send_req = async () => {
      //interacting with the server
      const res = await axios.post(
        "http://localhost:8000/api/user",
        body,
        config
      );

      return res;
    };

    try {
      //if the user is registered
      const res = await send_req();

      dispatch(auth_real_actions.register_success(res.data));
      dispatch(load_user());
    } catch (err) {
      //
      const errors = err.response.data.errors;
      if (errors) {
        const type = "danger";
        const id = uuidv4();
        errors.forEach((error) => {
          var msg = error.msg;
          dispatch(alertActions.setAlert({ id, msg, type }));
        });
      }

      //if there  s any error
      dispatch(auth_real_actions.register_fail());
    }
  };
};
//login action
export const login_user = ({ email, password }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,

      password,
    });

    //handling the errors

    const send_req = async () => {
      //interacting with the server
      const res = await axios.post(
        "http://localhost:8000/api/auth",
        body,
        config
      );

      return res;
    };

    try {
      //if the user is registered
      const res = await send_req();

      dispatch(auth_real_actions.login_success(res.data));
      dispatch(load_user());
    } catch (err) {
      //
      const errors = err.response.data.errors;
      if (errors) {
        const type = "danger";
        const id = uuidv4();
        errors.forEach((error) => {
          var msg = error.msg;
          dispatch(alertActions.setAlert({ id, msg, type }));
        });
      }

      //if there forms any error
      dispatch(auth_real_actions.login_fail());
    }
  };
};
//logout actions

export const logout = () => {
  return (dispatch) => {
    dispatch(auth_real_actions.Logout());
    //dispatching the clear functionality to delete the remaining users
    dispatch(ProfileActions.clear());
  };
};
