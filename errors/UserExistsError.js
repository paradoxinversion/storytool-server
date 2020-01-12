module.exports = class UserExistsError extends Error {
  constructor(username, ...args) {
    super(...args);
    console.log("Username", username);
    // this.username = username;
    this.message = `Username ${username} is unavailable.`;
    Error.captureStackTrace(this, UserExistsError);
  }
};
