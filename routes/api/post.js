const express = require("express");
const Router = express.Router();
//getting the authentication and the express validator middleware
const { body, validationResult, check } = require("express-validator");
const { default: mongoose } = require("mongoose");
const auth = require("../../middlewares/auth");
//getting the user model
const UserModel = require("../../models/user");
//getting the Post model
const PostModel = require("../../models/post");

// // @route  GET api/post
// // @desc   Test Route
// // @access Public

// Router.get("/", (req, res) => {
//   res.status(200).json({ msg: "you are using the post route" });
// });

// @route  POST api/post
// @desc   creating a new post
// @access Private

Router.post(
  "/",
  [auth, [check("text", "text should be reqiured").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    //in case of errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //incase of no errors
      //getting the user from the id which is being supplied as the payload for the authentication for creating the new post

      const user = await UserModel.findById(req.user.id).select("-password");

      //creating the new post
      const newPost = new PostModel({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      //saving the new post and showing the result
      await newPost.save((err, result) => {
        if (err) {
          return res.status(500).json({ msg: "Mongoose error" });
        } else {
          return res.status(200).json({ msg: result });
        }
      });
    } catch (err) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route  GET api/post
// @desc   all the posts
// @access Public
Router.get("/", auth, async (req, res) => {
  //getting all the posts
  try {
    const post = await PostModel.find().sort({ date: -1 });

    if (!post) {
      return res.status(500).json({ msg: "Server Error" });
    }
    res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});
// @route  GET api/post/:post_id
// @desc   get the post with a specific id
// @access Public

Router.get("/:post_id", auth, async (req, res) => {
  //getting the post with the specific id
  try {
    const post = await PostModel.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post is not being found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route  DELETE api/post/:post_id
// @desc   deleting the post with a specific id
// @access Private

Router.delete("/:post_id", auth, async (req, res) => {
  //deleting the post with the specific id
  try {
    const post = await PostModel.findById(req.params.post_id);
   
    //check if the post exist
    if(!post){
      return res.status(404).json({msg:"Post not found"});
    }
    //checking for the correct user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized user" });
    }
    await post.remove();
    return res.json({ msg: "Post is being successfully deleted" });
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route  PUT api/likes/:id
// @desc   pushing a new like array
// @access Private

Router.put("/likes/:id", auth, async (req, res) => {
  try {
    //fetch the  posts
    const post = await PostModel.findById(req.params.id);
    //for checking the posts

    //check the post already been liked or not

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res
        .status(200)
        .json({ msg: "All the post are already being liked" });
    }
    //user has not been liked
    post.likes.unshift({ user: req.user.id });

    await post
      .save()
      .then((docs) => {
        console.log(docs);
      })
      .catch((err) => console.log(err));
    return res.status(200).json(post.likes);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route  PUT api/unlikes/:id
// @desc   unliking the post
// @access Private

Router.put("/unlikes/:id", auth, async (req, res) => {
  try {
    //fetch the  posts
    const post = await PostModel.findById(req.params.id);
    //for checking the posts

    //check the if there is anypost which is being liked to unlike it
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(200).json({ msg: "There are no liked post" });
    }
    //getting the use remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    await post
      .save()
      .then((docs) => {
        console.log(docs);
      })
      .catch((err) => console.log(err));
    return res.status(200).json(post.likes);
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

// @route  POST api/post/comment/:id
// @desc   creating a new comment
// @access Private

Router.post(
  "/comment/:id",
  [auth, [check("text", "text should be reqiured").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    //in case of errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //incase of no errors
      //getting the user from the id which is being supplied as the payload for the authentication for creating the new post

      const user = await UserModel.findById(req.user.id).select("-password");
      //getting the specific post from the post id in the url
      const post = await PostModel.findById(req.params.id);

      //creating the new comment
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user.id,
      };
      //adding the comment to the mongoose schema
      post.comments.unshift(newComment);
      //saving the new post and showing the result
      await post.save((err, result) => {
        if (err) {
          return res.status(500).json({ msg: "Mongoose error" });
        } else {
          return res.status(200).json({ msg: result });
        }
      });
      return res.status(200).json(post.comments);
    } catch (err) {
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route  POST api/post/comment/:post_id/:comment_id
// @desc   deleting the comment
// @access Private
Router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    //getting post by the id
    const post = await PostModel.findById(req.params.id);
    //getting the comments
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "The comment does not exists" });
    }
    //checking for the user

    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "The user does not exist" });
    }

    //if everything works fine
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    post.save();
    return res.status(200).json(post.comments);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});
module.exports = Router;
