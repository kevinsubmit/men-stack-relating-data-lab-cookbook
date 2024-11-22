// controllers/foods.js

const express = require("express");
const router = express.Router();
const User = require("../models/user.js");


// view   get
router.get("/", async (req, res) => {
  try {
    const { _id }= res.locals.user;
    const todoUser = await User.findById(_id);
    
    res.render("foods/index.ejs", { pantry: todoUser.pantry });
  } catch (error) {
    console.error(error);
    res.status(418).redirect("/");
  }

});

router.get("/new", (req, res) => {
  res.render("new.ejs");
});


// create post
router.post("/", async (req, res) => {
  try {
    const { _id }= req.session.user;
    const todoUser = await User.findOne({ _id: _id });

    const pantryData = {
      name: req.body.name
    };
  
    todoUser.pantry.push(pantryData);
    await todoUser.save();
    res.status(200).redirect(`/users/${req.session.user._id}/foods`);

  } catch (error) {
    console.error(error);
    res.status(418).redirect("/");
  }
});

// delete
router.delete("/:itemId", async (req, res) => {
  try {

    const foodId = req.params.itemId;
    const { _id }= req.session.user;
    const todoUser = await User.findById(_id);

    todoUser.pantry.pull(foodId);
    await todoUser.save();

    res.status(200).redirect(`/users/${req.session.user._id}/foods`);

  } catch (error) {
    console.error(error);
    res.status(418).redirect("/");
  }
});

// edit
router.get("/:itemId/edit", async (req, res) => {
  try {

    const foodId = req.params.itemId;
    const { _id }= req.session.user;

    res.render("edict.ejs", { food:foodId});;



    const todoUser = await User.findById(_id);

    todoUser.pantry.pull(foodId);
    await todoUser.save();

    res.status(200).redirect(`/users/${req.session.user._id}/foods`);

  } catch (error) {
    console.error(error);
    res.status(418).redirect("/");
  }
});











module.exports = router;
