const express = require("express");
const Router = express.Router();
//getting the authentication and the express validator middleware
const { body, validationResult, check } = require("express-validator");
const { default: mongoose } = require("mongoose");
const auth=require("../../middlewares/auth");
//getting the user model
const UserModel=require('../../models/user');
//getting the Post model
const PostModel=require("../../models/post");




// // @route  GET api/post
// // @desc   Test Route
// // @access Public

// Router.get("/", (req, res) => {
//   res.status(200).json({ msg: "you are using the post route" });
// });

// @route  POST api/post
// @desc   check the post route for testing
// @access Public

Router.post("/",[auth,[
  check('text',"text should be reqiured").not().isEmpty()
]],async (req, res) => {
  const errors = validationResult(req);
  //in case of errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
try{
  //incase of no errors
  //getting the user from the id which is being supplied as the payload for the authentication for creating the new post

  const user=await UserModel.findById(req.user.id).select('-password');

  //creating the new post
  const newPost= new PostModel({
    text:req.body.text,
    name:req.body.name,
    avatar:req.body.avatar,
    user:req.user.id
  });
  //saving the new post and showing the result
await newPost.save((err,result)=>{
  if(err){
    return res.status(500).json({msg:"Mongoose error"});
  }
  else{
    return res.status(200).json({msg:result});
  }
})

}catch(err){
  res.status(500).json({msg:"Server Error"});
}

  
});

// @route  GET api/post
// @desc   Test Route
// @access Public
Router.get("/",auth,async(req,res)=>{
  //getting all the posts
  try{
  const post=await PostModel.find().sort({date:-1});
  if(!post){
    return res.status(500).json({msg:"Server Error"});
  }
  res.status(200).json(post);
}
catch(err){
  return res.status(500).json({msg:"Server Error"});
}
  

})
// @route  GET api/post/:post_id
// @desc   get the post with a specific id
// @access Public

Router.get("/:post_id",auth,async(req,res)=>{
  //getting the post with the specific id
  try{
const post=await PostModel.findById(req.params.post_id);
if(!post){
 return res.status(404).json({msg:"Post is not being found"});
}
res.status(200).json(post);

  }
  catch(err){
    res.status(500).json({msg:"Server Error"});
  }


})

// @route  DELETE api/post/:post_id
// @desc   deleting the post with a specific id
// @access Private

Router.delete("/:post_id",auth,async(req,res)=>{
  //deleting the post with the specific id
  try{
      const post=await PostModel.findByIdAndDelete(req.params.post_id);
      //checking for the correct user
      if(post.user.toString()!==req.user.id){
        return res.status(401).json({msg:"Unauthorized user"});
        

      }
      await post.remove();
      res.json({msg:"Post is being successfully deleted"});
      }
  
  catch(err){
    res.status(500).json({msg:"Server error"});
  }
})

module.exports = Router;
