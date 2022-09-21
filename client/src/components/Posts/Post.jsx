import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get_Post } from "../../store/PostAction";
import PostForm from "./PostForm";

import PostItem from "./PostItem";
const Post = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Get_Post());
  },[dispatch]);
  const posts = useSelector((state) => state.post.posts);
 
  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
      
        {posts.map((post) => (
          <PostItem key={Math.random()*10} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Post;
