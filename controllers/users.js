// controllers/foods.js

const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// users   get
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { username: 1});
    res.render("users/index.ejs", { users:users});
  } catch (error) {
    console.error(error);
    res.status(418).redirect("/");
  }
});


// show  get
router.get("/show/:userId", async (req, res) => {
  try {
    const { _id } = req.session.user;
    const user = await User.findById(_id);
    res.render("users/show.ejs", { pantry:user.pantry});
  } catch (error) {
    console.error(error);
    res.status(418).redirect("/");
  }
});




module.exports = router;
