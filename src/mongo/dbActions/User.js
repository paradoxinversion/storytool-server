const User = require("../models/User");
const bcrypt = require("bcrypt");
const UserExistsError = require("../../../errors/UserExistsError");
const createUser = async (username, password) => {
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
  return true;
};

module.exports = {
  createUser
};
