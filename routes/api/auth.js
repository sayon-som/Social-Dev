const express = require("express");
const Router = express.Router();

// @route  GET api/auth
// @desc   Test Route
// @access Public

Router.get("/", (req, res) => {
  res.status(200).json({ msg: "you are using the auth route" });
});

module.exports = Router;
