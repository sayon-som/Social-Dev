import React, { Fragment } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../store/alert";
import { register_user } from "../../store/auth_actions";

const Register = () => {
  const navigate = useNavigate();
  const isauth = useSelector((state) => state.auth.isauth);
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  //destructuring the form data
  const { name, email, password, password2 } = formdata;
  const onchange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  //submit functionality
  const submit = async (e) => {
    e.preventDefault();
    //checking  the password
    if (password !== password2) {
      // console.log("password does not match")
      //dispatching
      //set the id and dispatch the actions
      var id = uuidv4();
      const msg = "Passwords does not match";
      const type = "danger";
      dispatch(alertActions.setAlert({ id, msg, type }));
      setTimeout(() => {
        dispatch(alertActions.removeAlert({ id }));
      }, 2000);
    } else {
      //     const user_new={
      //         name,
      //         email,
      //         password
      //     }
      //     try{
      //     //sending the form data to the backend
      //     const config = {
      //       headers: {
      //         "Content-Type": "application/json",
      //       }
      //     };
      // const body=JSON.stringify(user_new);
      // const res=await axios.post("http://localhost:8000/api/user",body,config);
      // console.log(res.data);
      // }
      // catch(e){
      // console.log(e.response.data)
      // }
      //to be made with help of react redux
      //sending the data to the register user action
      dispatch(register_user({ name, email, password }));
      if (isauth) {
        navigate("/dashboard");
      }
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>

      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={submit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onchange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => onchange(e)}
            value={email}
            name="email"
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onchange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            onChange={(e) => onchange(e)}
            value={password2}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
