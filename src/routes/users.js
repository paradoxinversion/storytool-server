const express = require("express");
const router = express.Router();
const { createUser } = require("../mongo/dbActions/User");

router.post("/", (req, res) => {
  console.log(req.body);
  createUser(req.body.username, req.body.password);
  res.send("Hi");
});

module.exports = router;
