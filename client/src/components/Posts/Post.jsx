import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get_Post } from "../../store/PostAction";
const Post = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Get_Post());
  }, [Get_Post]);
  return <div>post</div>;
};

export default Post;
