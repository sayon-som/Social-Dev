const express = require("express");
const Router = express.Router();
//for express validation
const { body, validationResult, check } = require("express-validator");

// @route  POST api/user
// @desc   Registering the user
// @access Public

Router.post("/", 
[
    check('name',"Name is needed").not().notEmpty(),
    check('email',"Email not valid").isEmail(),
    check('password','password should be more than 7 characters').isLength({min:7})
]
,(req, res) => {
//   res.status(200).json({ msg: req.body });
const errors=validationResult(req);
//in case of errors
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});

}
//errors are missing 
else{
    res.json({msg:"worked fine"});
}
});

module.exports = Router;
