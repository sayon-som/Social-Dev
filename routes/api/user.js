const express = require("express");
const Router = express.Router();
//for express validation
const { body, validationResult, check } = require("express-validator");
//getting the model
const UserModel = require("../../models/user");
//getting gravatar
const gravatar = require("gravatar");
//getting the bcrypt

const bcrypt = require("bcryptjs");

//getting the jwt

const jwt = require("jsonwebtoken");
//getting cofig
const config = require("config");

// @route  POST api/user
// @desc   Registering the user
// @access Public

Router.post(
  "/",
  [
    check("name", "Name is needed").not().notEmpty(),
    check("email", "Email not valid").isEmail(),
    check("password", "password should be more than 7 characters").isLength({
      min: 7,
    }),
  ],
  async (req, res) => {
    //   res.status(200).json({ msg: req.body });
    const errors = validationResult(req);
    //in case of errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //errors are missing

    const { name, email, password } = req.body;
    try {
      let user = await UserModel.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user exists already" }] });
      }
      //getting the gravatr
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new UserModel({
        name,
        email,
        avatar,
        password,
      });
      //encrypt the password
      const salt = await bcrypt.genSalt(10);
      //storing the hash password
      user.password = await bcrypt.hash(password, salt);
      //saving the user
      await user.save();

      //setting the payload
      const payload = {
        user: {
          id: user.id,
        },
      };
      let token;
      try {
        token = jwt.sign(payload, config.get("secret"), {
          expiresIn: "1h",
        });
        res.json({ token });
        console.log(token);
        //storing the token in the local storafe
      } catch (err) {
        throw err;
      }
    } catch (e) {
      return res.status(400).json({ msg: e });
    }
  }
);

module.exports = Router;
