import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { auth_real_actions } from "./auth";
import { alertActions } from "./alert";
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
      console.log(res.data);
      dispatch(auth_real_actions.register_success(res.data));
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
      dispatch(auth_real_actions.register_fail());
    }
  };
};
