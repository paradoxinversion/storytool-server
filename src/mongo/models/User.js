const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  characters: [String],
  stories: [String],
  password: String
});

UserSchema.methods.checkPassword = async function(password) {
  console.log(password);
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
