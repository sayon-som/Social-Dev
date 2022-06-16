const express = require("express");
const Router = express.Router();
const auth = require("../../middlewares/auth");
const ProfileModel = require("../../models/profile");
const UserModel = require("../../models/user");
//preparation of the profile creation
const { body, validationResult, check } = require("express-validator");
const { route } = require("./auth");
const { compareSync } = require("bcryptjs");
//importing the config module
const config = require("config");
const request = require("request");
const post = require("../../models/post");
// @route  GET api/profile/me
// @desc   get the current users profile
// @access Private

Router.get("/me", auth, async (req, res) => {
  // res.status(200).json({ msg: "you are using the profile route" });
  //we are getting the current user id by req.user.id
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "no profile for the user" });
    }
    res.json(profile);
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

// @route  POST api/profile
// @desc   create and update profile
// @access Private

Router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //in case of errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //incase of no errors

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      //socials
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
    } = req.body;
    //creating a separate profile object

    const userProfile = {};
    //assingign the user feild with the user id which is being received from the payload sent during authentication
    userProfile.user = req.user.id;
    if (company) userProfile.company = company;
    if (website) userProfile.website = website;
    if (location) userProfile.location = location;
    if (bio) userProfile.bio = bio;
    if (status) userProfile.status = status;
    if (githubusername) userProfile.githubusername = githubusername;

    //for manipulating the skills which are comma separated

    if (skills) {
      userProfile.skills = skills.split(",").map((skills) => skills.trim());
    }

    //building the social object or the user profile
    userProfile.social = {};
    if (userProfile.social.twitter) userProfile.social.twitter = twitter;
    if (userProfile.social.linkedin) userProfile.social.linkedin = linkedin;
    if (userProfile.social.facebook) userProfile.social.facebook = facebook;
    if (userProfile.social.instagram) userProfile.social.instagram = instagram;
    if (userProfile.social.youtube) userProfile.social.youtube = youtube;

    //inserting the data
    try {
      let profile = await ProfileModel.findOne({ user: req.user.id });
      //if the profile is found
      if (profile) {
        //update the profile
        profile = await ProfileModel.findOneAndUpdate(
          { user: req.user.id },
          { $set: userProfile },
          { new: true }
        );
        return res.json({ profile });
      }
      //if the profile is not found

      //create the profile
      profile = new ProfileModel(userProfile);
      await profile
        .save()
        .then((docs) => res.status(200).json({ msg: "profile created" }))
        .catch((err) => res.status(401).json({ error: err }));
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

// @route  GET api/profile
// @desc  getting all the profiles
// @access Public
Router.get("/", async (req, res) => {
  try {
    //getting all the profiles
    const profile = await ProfileModel.find({}).populate("user", [
      "name",
      "avatar",
    ]);

    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// @route  GET api/profile/user/:userId
// @desc   getting the profile using the user id
// @access Public
Router.get("/user/:user_id", async (req, res) => {
  try {
    //getting the user id

    //getting all the profiles
    const profile = await ProfileModel.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "no profile is present" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// @route  DELETE api/profile/
// @desc   getting the profile , user and posts
// @access Private

Router.delete("/", auth, async (req, res) => {
  try {
    //@todo  also remove the user posts

    await post.deleteMany({ user: req.user.id });

    //remove the profiles
    //deleting the profiles
    const profile = await ProfileModel.findOneAndRemove({
      user: req.user.id,
    });
    if (!profile) {
      return res.status(400).json({ msg: "no profile is present" });
    }
    //deleting the users
    const user = await UserModel.findByIdAndRemove(req.user.id);
    if (!user) {
      return res.status(400).json({ msg: "no user is present" });
    }

    res.json({ msg: "user and the profile is beign removed" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// @route  PUT api/profile/experience
// @desc   add the experience
// @access Private

Router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title should be present").not().isEmpty(),
      check("company", "Company should be present").not().isEmpty(),
      check("from", "from should be present").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //in case of errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //adding the experience
    const { title, from, to, current, description, location, company } =
      req.body;

    const newexp = {
      title,
      company,
      current,
      description,
      to,
      from,
      location,
    };
    try {
      //finding the profile
      const profile = await ProfileModel.findOne({ user: req.user.id });

      if (!profile) {
        res.status(404).json({ msg: "profile does not exist" });
      }
      //if profile exist
      profile.experience.unshift(newexp);
      profile.save();
      res.json(profile);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);
// @route  DELETE api/profile/experience/:exp_id
// @desc   delete the experience
// @access Private

Router.delete("/experience/:exp_id", auth, async (req, res) => {
  //deleting the experience with the specific id
  try {
    //getting the user profile
    const profile = await ProfileModel.findOne({ user: req.user.id });
    //remove the index
    const remove_index = profile.experience
      .map((items) => items.id)
      .indexOf(req.params.id);
    profile.experience.splice(remove_index, 1);
    //saving the profile
    profile.save();
    return res.json({ profile: profile });
    if (!deleteexp) {
      return res.status(200).json({ msg: "No experience found" });
    }
    return res.send("Profile experience deleted");
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route  POST api/profile/education
// @desc   add  the education
// @access Private

Router.put(
  "/education",
  [
    auth,
    [
      check("school", " should be present").not().isEmpty(),
      check("degree", "degree should be present").not().isEmpty(),
      check("fieldofstudy", "field of study should be present").not().isEmpty(),
      check("from", "from should not be empty").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //in case of errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //adding the experience
    const { school, degree, fieldofstudy, from, to, current } = req.body;

    const newedu = {
      school,
      degree,
      fieldofstudy,
      current,
      to,
      from,
    };
    try {
      let profile = await ProfileModel.findOne({ user: req.user.id });

      if (!profile) {
        res.status(404).json({ msg: "profile not present" });
      }

      profile.education.unshift(newedu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route  DELETE api/profile/education/:ed_id
// @desc   delete the experience
// @access Private
Router.delete("/education/:ed_id", auth, async (req, res) => {
  //deleting the education with the specific id
  try {
    //getting the user profile
    const profile = await ProfileModel.findOne({ user: req.user.id });
    //remove the index
    const remove_index = profile.education
      .map((items) => items.id)
      .indexOf(req.params.ed_id);
    profile.education.splice(remove_index, 1);
    //saving the profile
    profile.save();
    return res.json({ profile: profile });
    if (!deleteexp) {
      return res.status(200).json({ msg: "No education found" });
    }
    return res.send("Profile education deleted");
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});
// @route  GET api/profile/github/:username
// @desc   access to all the github profiles of the developer with the specified user name
// @access Public
Router.get("/github/:username", (req, res) => {
  try {
    const githubrequesthandler = {
      url: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "clientid"
      )}&client_secret=${config.get("clientsecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    //parsing the request
    request(githubrequesthandler, (err, response, body) => {
      if (err) {
        console.error = err;
      }
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "github profile not found" });
      }
      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});
//halndling the post request

module.exports = Router;
