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
  res.cookie("storytool-user", token).send("woo");
});

module.exports = router;
