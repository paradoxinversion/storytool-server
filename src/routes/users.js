const express = require("express");
const passport = require("passport");
const router = express.Router();
const { createUser } = require("../mongo/dbActions/User");
const jwt = require("jsonwebtoken");
router.post("/", (req, res) => {
  console.log(req.body);
  createUser(req.body.username, req.body.password);
  res.send("Hi");
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  const token = jwt.sign(
    {
      user: req.user.id
    },
    "dev"
  );
  res.cookie("storytool-user", token).send("woo");
});

module.exports = router;
