// controllers/foods.js

const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// router logic will go here - will be built later on in the lab
router.get("/", (req, res) => {
  res.render("foods/index.ejs");
});

router.get("/new", (req, res) => {
  res.render("new.ejs");
});



// create post
router.post("/", async (req, res) => {
  try {
  
    const { _id }= req.session.user;
    
    const todoUser = await User.findOne({ _id: _id });
    console.log(todoUser);
    const pantryData = {
      name: req.body.name
    };
    console.log(pantryData);
    todoUser.pantry.push(pantryData);
    await todoUser.save();
    console.log(todoUser);
    res.status(200).redirect(`/users/${req.session.user._id}/foods`);

  } catch (error) {
    console.error(error);
    res.status(418).redirect("/");
  }
});

module.exports = router;
