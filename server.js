//getting express
const express = require("express");
const app = express();
//getting the server connection
const connect = require("./config/db");
//getting the routers
const path=require('path');
const cors = require("cors");
const UserRouter = require("./routes/api/user");
const AuthRouter = require("./routes/api/auth");
const PostRouter = require("./routes/api/post");
const ProfileRouter = require("./routes/api/profile");
app.use(cors());
//for using the body parser functionalities
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//testing
// app.get("/", (req, res) => {
//   res.status(200).json({ msg: "API is running" });
// });
//connecting to database
connect();
//enabling the use of cors

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//adding the routes functionalitites
app.use("/api/user", UserRouter);
app.use("/api/post", PostRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/profile", ProfileRouter);

//serving the static assets in production

if(process.env.NODE_ENV=='production'){
  //setting the static folders
  app.use(express.static('client/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));

  })
}


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
