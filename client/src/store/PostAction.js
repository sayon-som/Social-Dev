import axios from "axios";
import { alertActions } from "./alert";
import { v4 as uuidv4 } from "uuid";
import { postActions } from "./Post";


//getting all the posts for the user
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

export const addLike = (id) => {
  
  return async (dispatch) => {
    const likes = async () => {
      const res = await axios.put(`http://localhost:8000/api/post/likes/${id}`);
      return res;
    };
    try {  
      
      const res = await likes();
      
      dispatch(postActions.UPDATE_LIKES({ id, likes: res.data }));
      
      
    } catch (err) {
      dispatch(
        postActions.POST_ERROR({
          msg: "Error",
          status: err.response.status,
        })
      );
    }
  };
};

//remove likes
export const removeLike = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
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
};

//delelte post
export const deletePost = (post_id) => {
  return async (dispatch) => {
    
    const deletepost = async () => {
      const res = await axios.delete(
        `http://localhost:8000/api/post/${post_id}`
      );
      return res;
    };
    try {
      //setting alert
      const res = await deletepost();
      
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

//add post 
export const addPost = (post_data) => {
  return async (dispatch) => {
    //config for adding the post
     const config = {
       headers: {
         "Content-Type": "application/json",
       },
     };
    const add_post = async () => {
      const res = await axios.post(
        `http://localhost:8000/api/post`,post_data,config
      );
      return res;
    };
    try {
      //setting alert
      const res = await add_post();
dispatch(postActions.ADD_POST(res.data)); 
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

//get only single posts for the user
export const Get_Single_Post = (id) => {
  return async (dispatch) => {
    //asyhc
    const get_posts = async () => {
      const res = await axios.get(`http://localhost:8000/api/post/${id}`);
      return res;
    };
    try {
      const res = await get_posts();
      
      dispatch(postActions.GET_POST(res.data));
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

//add comment
export const addComment = (post_id,commentdata) => {
  return async (dispatch) => {
    //config for adding the post
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    const add_cmt = async () => {
      const res = await axios.post(
        `http://localhost:8000/api/post/comment/${post_id}`,
        commentdata,
        config
      );
      return res;
    };
    try {
      //setting alert
      const res = await add_cmt();
      dispatch(postActions.ADD_COMMENT(res.data));
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
//delete comment functionality

//add comment
export const delComment = (post_id,comment_id) => {
  return async (dispatch) => {
    //config for deleting the comments
    console.log(post_id);
    console.log(comment_id);
    const add_cmt = async () => {
      const res = await axios.delete(
        `http://localhost:8000/api/post/comment/${post_id}/${comment_id}`,
       
      //  /comment/:id/:comment_id
      );
      return res;
    };
    try {
      //setting alert
      const res = await add_cmt();
      console.log(res);
      dispatch(postActions.REMOVE_COMMENT(comment_id));
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