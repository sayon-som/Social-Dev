import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { addPost } from "../../store/PostAction";

import { useNavigate } from "react-router-dom";
const PostForm = () => {
  const [text, setText] = useState("");
const dispatch=useDispatch();
const navigate=useNavigate();
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Post your tech queries</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
         

            
          dispatch(addPost({text}));
          
          setText("");
          navigate("/posts")
         
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};


export default PostForm;
