import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get_Post } from "../../store/PostAction";
import {v4 as uuidv4} from "uuid";
import PostItem from "./PostItem";
const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  useEffect(() => {
    dispatch(Get_Post());
  },[dispatch]);
  
  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      {/* <PostForm /> */}
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={uuidv4} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Post;
