//getting express
const express=require('express');
const app=express();
//getting the server connection
const connect=require('./config/db');
//getting the routers
const UserRouter=require('./routes/api/user');
const AuthRouter = require("./routes/api/auth");
const PostRouter = require("./routes/api/post");
const ProfileRouter = require("./routes/api/profile");

//for using the body parser functionalities
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//testing
app.get("/",(req,res)=>{
    res.status(200).json({msg:"API is running"})
})
//connecting to database
connect();


//adding the routes functionalitites
app.use("/api/user",UserRouter);
app.use("/api/post",PostRouter);
app.use("/api/auth",AuthRouter);
app.use("/api/profile",ProfileRouter);

const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`)
})