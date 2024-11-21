// controllers/foods.js

const express = require("express");
const router = express.Router();
const User = require("../models/user.js");


// view   get
router.get("/", async (req, res) => {
  try {
    // 这是拿到用户登录的初始的pantry，后续增加将不显示在这里，有bug
    const { pantry }= res.locals.user;
    res.render("foods/index.ejs", { pantry: pantry });
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
    console.log(todoUser);
    todoUser.deleteOne(todoUser.pantry._id == foodId);
     await todoUser.save();
    res.status(200).redirect(`/users/${req.session.user._id}/foods`);

  } catch (error) {
    console.error(error);
    res.status(418).redirect("/");
  }
});











module.exports = router;
