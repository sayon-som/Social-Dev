import React,{Fragment} from 'react'
import {Link} from "react-router-dom"
import { useState } from 'react';
const Login = () => {
  const [formdata,setformdata]=useState({
   
    email:"",
    password:""
  })
  //destructuirng the form data
  const {email,password}=formdata;
  const change=(e)=>{
    setformdata({
      ...formdata,[e.target.name]:e.target.value
    });

  }
  //creating a submit function for the process to work
  const submit=async(e)=>{
     e.preventDefault();
    try{
//handling the basic logic for login
   
    }
    catch(err){
      console.log(err.response.data);
    }
  }
  return (
    <Fragment>
      
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> login to your account
        </p>
        <form className="form" onSubmit={submit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              required
              onChange={(e)=>{
                change(e)
              }}
            />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" name="password" value={password} onChange={(e)=>{
              change(e)
            }}/>
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
    
    </Fragment>
  );
}

export default Login