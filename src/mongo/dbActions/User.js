const User = require("../models/User");
const bcrypt = require("bcrypt");
const { UserExistsError, NoUserError } = require("../../../errors/index");

const createUser = async ({ username, password }) => {
  console.log(username, password);
  const user = await User.findOne({ username });
  if (user) {
    // User exists
    const error = new UserExistsError((username = username));
    throw error;
  }

  // TODO: Make salt rounds a config option
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });
  newUser.save();
  return newUser;
};

const readUser = async ({ username }) => {
  console.log(username);
  const user = await User.findOne({ username });
  if (!user) {
    const error = new NoUserError(username);
    throw error;
  }

  return user;
};
module.exports = {
  createUser,
  readUser
};
