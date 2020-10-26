const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", passport.authenticate("local"), (req, res) => {
  const token = jwt.sign(
    {
      user: req.user.id
    },
    "dev"
  );
  console.log(req.user)
  res.cookie("storytool-user", token).json({ login: "success", token, username: req.user.username });
});

module.exports = router;
