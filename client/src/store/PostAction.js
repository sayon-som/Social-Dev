import axios from "axios";
import { alertActions } from "./alert";
import { v4 as uuidv4 } from "uuid";
import { postActions } from "./Post";

export const Get_Post = () => {
  return async (dispatch) => {
    //asyhc
    const get_posts = async () => {
      const res = await axios.get("http://localhost:8000/api/post");
      return res;
    };
    try {
      const res = await get_posts();
      dispatch(postActions.GET_POSTS(res.data));
    } catch (err) {
      dispatch(
        postActions.POST_ERROR({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  };
};

//adding likes
// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:8000/api/post/likes/${id}`);
    dispatch(postActions.UPDATE_LIKES({ id, likes: res.data }));
  } catch (err) {
    dispatch(
      postActions.POST_ERROR({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

//remove likes
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/api/post/unlikes/${id}`
    );
    dispatch(postActions.UPDATE_LIKES({ id, likes: res.data }));
  } catch (err) {
    dispatch(
      postActions.POST_ERROR({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

//delelte post
export const deletePost = (post_id) => {
  return async (dispatch) => {
    const deletepost = async () => {
      const res = await axios.delete(
        `http://localhost:8000/api/post/unlikes/${post_id}`
      );
      return res;
    };
    try {
      //setting alert
      const res = await deletePost();
      var id = uuidv4();
      const msg = "post removed";
      const type = "success";
      dispatch(alertActions.setAlert({ id, msg, type }));
      setTimeout(() => {
        dispatch(alertActions.removeAlert({ id }));
      }, 2000);
      dispatch(postActions.DELETE_POST(res.data));
    } catch (err) {
      dispatch(
        postActions.POST_ERROR({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  };
};
