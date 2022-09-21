import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../store/PostAction";
import { useDispatch } from "react-redux";
const CommentForm = ({ postId }) => {
  const [text, setText] = useState("");
const dispatch=useDispatch();

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Please do Leave a comment ...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
           dispatch( addComment(postId, { text }));
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment the post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
