import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import Single_comment from "./Single_comment";
import { useDispatch } from "react-redux";
import { Get_Single_Post } from "../../store/PostAction";
import CommentForm from "./CommentForm";

const Single_post = () => {
  const { id } = useParams();
  const post=useSelector(state=>state.post.post)
  const loading =useSelector(state=>state.post.loading)
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(Get_Single_Post(id))
  }, [dispatch,id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
    
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <Single_comment key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </section>
  );
};

Single_post.propTypes = {
  Get_Single_Post: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { Get_Single_Post })(Single_post);
